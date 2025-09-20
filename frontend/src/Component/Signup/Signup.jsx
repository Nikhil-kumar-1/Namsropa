import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../config/config";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    try {
      const res = await axios.post(`${backendUrl}/api/v1/auth/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        
        // Set success message
        setSuccess("✅ Account created successfully! Redirecting...");
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate("/adminDashboard");
        }, 1500);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError("❌ User already exists with this email");
      } else {
        setError(err.response?.data?.error || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80')] bg-cover bg-center opacity-20"></div>
      
      <div className="relative z-10 w-full max-w-xl mt-20 mb-20">
        <div className="glass-effect bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-yellow-500/20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-300 mt-2">Join us to get started</p>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400 transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400 transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400 transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400 transition-all duration-200"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center border border-yellow-500/30 hover:border-yellow-500/50 shadow-lg hover:shadow-yellow-500/20"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : "Sign Up"}
            </button>
          </form>
          
          {error && (
            <div className="mt-6 p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-300 text-center font-medium">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mt-6 p-3 bg-green-900/30 border border-green-500/50 rounded-lg">
              <p className="text-green-300 text-center font-medium">{success}</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <p className="text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-400 font-semibold hover:text-yellow-300 transition duration-300">
                Login
              </Link>
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">© 2023 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}