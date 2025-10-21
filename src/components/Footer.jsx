import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mt-12 rounded-md shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left side - copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold">Dan Muturi</span>. All rights reserved.
        </p>

        {/* Right side - navigation links */}
        <div className="flex gap-4 text-sm">
          <Link to="/" className="hover:text-blue-500 transition-colors">
            Home
          </Link>
          <Link to="/tasks" className="hover:text-blue-500 transition-colors">
            Tasks
          </Link>
          <Link to="/api" className="hover:text-blue-500 transition-colors">
            API
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
