import Product from '../model/productModel.js';
export const createProduct = async (req, res) => {
  try {
    const { name, description, basePrice, imageGroups, categories, tags, stock, isActive } = req.body;
    const parsedImageGroups = typeof imageGroups === 'string' ? JSON.parse(imageGroups) : imageGroups;
    const parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;
    const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    const product = new Product({
      name,
      description,
      basePrice,
      imageGroups: parsedImageGroups || [],
      categories: parsedCategories || [],
      tags: parsedTags || [],
      stock: stock || 0,
      isActive: isActive !== undefined ? isActive : true
    });
    await product.save();
    res.status(201).json({ success: true, message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};