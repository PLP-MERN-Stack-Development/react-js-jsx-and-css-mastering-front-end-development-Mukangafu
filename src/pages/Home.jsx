import React from "react";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Week 3 React Project 🚀</h1>
      <p className="text-gray-600 mb-6">Built with React + Tailwind CSS</p>
      <Button variant="primary">Get Started</Button>
    </div>
  );
};

export default Home;
