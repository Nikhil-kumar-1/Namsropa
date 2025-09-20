import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../config/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(`${backendUrl}/api/v1/auth/login`, {
        email,
        password,
      });

      if (res.data.user) {
        // Save token
        localStorage.setItem("token", res.data.token);

        // Reset form
        setEmail("");
        setPassword("");

        // Set success message
        setSuccess("✅ Login successful! Redirecting...");

        // Redirect based on role
        const role = res.data.user.role;
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin");
          } else {
            navigate("/user/home");
          }
        }, 1500);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("❌ User not found. Please sign up first.");
      } else if (err.response?.status === 400) {
        setError("❌ Invalid email or password.");
      } else {
        setError(err.response?.data?.error || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80')] bg-cover bg-center opacity-20"></div>
      
      <div className="mt-20 relative z-10 w-full max-w-md">
        <div className="glass-effect bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-yellow-500/20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-300 mt-2">Sign in to access your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-yellow-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center shadow-lg hover:shadow-yellow-500/20"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : "Login"}
            </button>
          </form>

          {/* Error message */}
          {error && (
            <div className="mt-6 p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-300 text-center font-medium">{error}</p>
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="mt-6 p-3 bg-green-900/30 border border-green-500/50 rounded-lg">
              <p className="text-green-300 text-center font-medium">{success}</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <p className="text-gray-300">
              Don't have an account?{" "}
              <Link to="/signup" className="text-yellow-400 font-semibold hover:text-yellow-300 transition duration-300">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        
       
      </div>
    </div>
  );
}