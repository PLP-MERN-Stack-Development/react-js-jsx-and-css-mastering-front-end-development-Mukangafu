import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      
      {/* Page content */}
      <main className="flex-grow p-6">{children}</main>
      
      <Footer />
    </div>
  );
};

export default Layout;
