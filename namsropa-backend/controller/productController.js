const Dress = require("../model/Product");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper: parse string or array fields
const parseList = (val) => {
  if (!val) return [];
  if (Array.isArray(val))
    return val.map((v) => String(v).trim()).filter(Boolean);
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed))
        return parsed.map((v) => String(v).trim()).filter(Boolean);
    } catch {}
    return val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

// Helper: convert to number
const toNumber = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

// Generate Cloudinary signature for frontend direct upload
const getUploadSignature = (req, res) => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: "dresses" },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (err) {
    console.error("Signature error:", err);
    res.status(500).json({ error: "Failed to generate signature" });
  }
};

// GET all dresses with filters, pagination, sorting
const getAllDresses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = "-createdAt",
      minPrice,
      maxPrice,
      category,
      brand,
      search,
    } = req.query;

    let filter = {};
    if (category && category !== "all") filter.category = category;
    if (brand) filter.brand = { $regex: brand, $options: "i" };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = toNumber(minPrice);
      if (maxPrice) filter.price.$lte = toNumber(maxPrice);
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const dresses = await Dress.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));
    const total = await Dress.countDocuments(filter);

    res.json({
      dresses,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single dress by ID
const getDressById = async (req, res) => {
  try {
    const dress = await Dress.findById(req.params.id);
    if (!dress) return res.status(404).json({ message: "Dress not found" });
    res.json(dress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new dress (images sent as {url, publicId} array)
const createDress = async (req, res) => {
  try {
    const {
      brand,
      title,
      description,
      category,
      price,
      originalPrice,
      sizes,
      colors,
      images,
    } = req.body;

    if (!images || !images.length)
      return res.status(400).json({ message: "No images provided" });

    const imageObjects = images.map((img) => ({
      url: img.url,
      publicId: img.publicId,
    }));

    const dress = new Dress({
      brand,
      title,
      description,
      category,
      price: toNumber(price),
      originalPrice: toNumber(originalPrice),
      sizes: parseList(sizes),
      colors: parseList(colors),
      images: imageObjects,
      image: imageObjects[0], // ✅ ab object save hoga { url, publicId }
    });

    const savedDress = await dress.save();
    res.status(201).json(savedDress);
  } catch (err) {
    console.error("createDress error:", err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE existing dress
const updateDress = async (req, res) => {
  try {
    const {
      brand,
      title,
      description,
      category,
      price,
      originalPrice,
      sizes,
      colors,
      images,
    } = req.body;
    const updates = {};

    if (brand) updates.brand = brand;
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (category) updates.category = category;
    if (price !== undefined) updates.price = toNumber(price);
    if (originalPrice !== undefined)
      updates.originalPrice = toNumber(originalPrice);
    if (sizes) updates.sizes = parseList(sizes);
    if (colors) updates.colors = parseList(colors);

    if (images && images.length) {
      updates.images = images; // [{url, publicId}]
      updates.image = images[0]; // ✅ poora object save karna hai
    }

    const dress = await Dress.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!dress) return res.status(404).json({ message: "Dress not found" });

    res.json(dress);
  } catch (err) {
    console.error("updateDress error:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE dress (also delete images from Cloudinary)
const deleteDress = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const dress = await Dress.findById(req.params.id);
    if (!dress) return res.status(404).json({ message: "Dress not found" });

    await Dress.findByIdAndDelete(req.params.id);
    res.json({ message: "Dress deleted successfully" });
  } catch (err) {
    console.error("deleteDress error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET featured dresses
const getFeaturedDresses = async (req, res) => {
  try {
    const dresses = await Dress.find({ featured: true }).limit(8);
    res.json(dresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET trending dresses
const getTrendingDresses = async (req, res) => {
  try {
    const dresses = await Dress.find({ trending: true }).limit(8);
    res.json(dresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get category by id

// GET unique categories from dresses
// GET unique categories from dresses
// GET unique categories from dresses
const getCategories = async (req, res) => {
  try {
    const categories = await Dress.distinct("category");

    const formatted = categories
      .filter((cat) => typeof cat === "string" && cat.trim() !== "") // null/undefined hatao
      .map((cat) => ({
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        slug: cat.toLowerCase().replace(/\s+/g, "-"),
      }));

    res.json({ categories: formatted });
  } catch (err) {
    console.error("getCategories error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET dresses by category
const getDressesByCategory = async (req, res) => {
  try {
    const slug = req.params.category; // ex: "jumpsuits"

    // Pehle category list lao
    const categories = await Dress.distinct("category");

    // Slug match karke original category name nikaalo
    const matchedCategory = categories.find(
      (cat) => cat && cat.toLowerCase().replace(/\s+/g, "-") === slug
    );

    if (!matchedCategory) {
      return res.json([]); // agar category nahi mili
    }

    const dresses = await Dress.find({ category: matchedCategory });
    res.json(dresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SEARCH dresses
const searchDresses = async (req, res) => {
  try {
    const { q } = req.query;
    const dresses = await Dress.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });
    res.json(dresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUploadSignature,
  getAllDresses,
  getDressById,
  createDress,
  updateDress,
  deleteDress,
  getFeaturedDresses,
  getTrendingDresses,
  getDressesByCategory,
  searchDresses,
  getCategories,
};
