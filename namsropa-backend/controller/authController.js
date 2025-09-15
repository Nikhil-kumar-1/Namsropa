const User = require("../model/User");
const jwt = require("jsonwebtoken");

// Token generate function
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d", // token ek din ke liye valid
  });
};

// ✅ Signup Controller
const signup_post = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    console.log("📩 Signup request body:", req.body); // <-- Debugging

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = new User({ name, email, password });
    await user.save(); // <-- Yaha error aa sakta hai

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("❌ Signup error:", error); // <-- Debugging
    res.status(500).json({ error: "Signup failed", details: error.message });
  }
};


// ✅ Login Controller
const login_post = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // Create token
    const token = createToken(user._id);

    // Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};

// ✅ Logout Controller
const logout_get = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

module.exports = { signup_post, login_post, logout_get };
