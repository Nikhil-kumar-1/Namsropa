import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-8xl font-extrabold text-white">404</h1>
        <p className="mt-4 text-2xl text-gray-300 font-light">
          Oops! The page you’re looking for isn’t here.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-500 transition"
          >
            Go Back Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
