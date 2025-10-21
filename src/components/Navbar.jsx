import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-200 dark:bg-gray-800 rounded-md shadow-md mb-8">
      {/* Top Section */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* Left Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-blue-500 font-semibold transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/tasks"
            className="hover:text-blue-500 font-semibold transition-colors duration-200"
          >
            Task Manager
          </Link>
          <Link
            to="/api"
            className="hover:text-blue-500 font-semibold transition-colors duration-200"
          >
            API Data
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">
            Toggle Theme
          </span>
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 text-gray-800 dark:text-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden flex flex-col items-center gap-4 pb-4 bg-gray-100 dark:bg-gray-700 rounded-b-md"
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-500 font-semibold"
            >
              Home
            </Link>
            <Link
              to="/tasks"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-500 font-semibold"
            >
              Task Manager
            </Link>
            <Link
              to="/api"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-500 font-semibold"
            >
              API Data
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
