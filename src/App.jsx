import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskManager from "./components/TaskManager";
import ApiData from "./components/ApiData";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

// Updated Home page component
const Home = () => (
  <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">

    {/* Hero Section */}
    <section className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        🌿 Health Insights & Wellness Tracker
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
        Empower yourself with reliable health tips, professional wellness advice, and tools to manage your daily tasks. 
        Stay informed, stay healthy, and build better habits with our interactive app.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <a
          href="/tasks"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          📝 Manage Your Tasks
        </a>
        <a
          href="/api"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          📰 Browse Health Posts
        </a>
      </div>
    </section>

    {/* Why This App Section */}
    <section className="text-center max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
        Why This App?
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-lg">
        This app combines productivity with wellness by allowing you to manage daily tasks while staying informed with 
        up-to-date health advice. Our health posts provide evidence-based tips on nutrition, exercise, mental well-being, 
        and lifestyle habits.
      </p>
    </section>

    {/* Features Section */}
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Task Management</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Organize your daily tasks efficiently. Mark tasks as active, pending, or completed, and improve your productivity.
        </p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Health Posts</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Access a curated collection of 50 professional health tips. Learn about nutrition, exercise, sleep, mental health, 
          and healthy lifestyle habits.
        </p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Wellness Guidance</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Discover actionable wellness strategies to enhance your overall well-being. Use our insights to maintain a balanced, healthy lifestyle.
        </p>
      </div>
    </section>

    {/* Benefits Section */}
    <section className="max-w-4xl mx-auto text-center space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">What You’ll Gain</h2>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-left md:text-center">
        <li>Improved productivity by tracking and completing tasks efficiently.</li>
        <li>Access to evidence-based health tips and lifestyle guidance.</li>
        <li>Better decision-making for daily health and wellness routines.</li>
        <li>Motivation to adopt long-term healthy habits.</li>
        <li>Support for mental, physical, and emotional well-being.</li>
      </ul>
    </section>

    {/* Call-to-action Section */}
    <section className="text-center mt-12">
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4">
        Ready to take control of your health and productivity? Explore the app now!
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <a
          href="/tasks"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          📝 Manage Tasks
        </a>
        <a
          href="/api"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          📰 View Health Posts
        </a>
      </div>
    </section>
  </div>
);

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col justify-between bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
          
          {/* Top Section */}
          <div>
            <Navbar />

            {/* Page Content */}
            <main className="flex-1 p-4 md:p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<TaskManager />} />
                <Route path="/api" element={<ApiData />} />
              </Routes>
            </main>
          </div>

          {/* Footer always at bottom */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
