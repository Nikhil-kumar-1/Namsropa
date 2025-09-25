const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoute");

const cloudinary = require("cloudinary").v2;

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Allowed Origins (Frontend URLs only)
const allowedOrigins = [
  "https://namsropa.com",
  "http://localhost:5173",             // local dev
  "https://namsropa.vercel.app"        // production frontend
];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// ✅ Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/dresses", productRoutes);
app.use("/api/cart", cartRoutes);
// Root route for Hostinger availability check
app.get("/", (req, res) => {
  res.json({ status: "Backend is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Connect DB and Start Server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
