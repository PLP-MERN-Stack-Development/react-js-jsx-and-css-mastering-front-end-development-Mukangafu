import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import englishPosts from "../data/englishPosts.json"; // Health-related content

const statuses = ["Pending", "Active", "Completed"];

export default function ApiData() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9; // 9 cards per page

  // Add status to each post
  const addStatus = (postsArray) =>
    postsArray.map((post) => ({
      ...post,
      status: statuses[post.id % statuses.length],
    }));

  useEffect(() => {
    const fetchPosts = () => {
      try {
        setLoading(true);
        setError(null);

        const start = (page - 1) * limit;
        const end = start + limit;
        const pagePosts = englishPosts.slice(start, end);

        if (!pagePosts.length) throw new Error("No posts found for this page.");

        setPosts(addStatus(pagePosts));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = {
    Pending: "bg-yellow-200 text-yellow-800",
    Active: "bg-blue-200 text-blue-800",
    Completed: "bg-green-200 text-green-800",
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 dark:text-gray-300">
        Loading posts...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 dark:text-red-400">{error}</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          📰 Health Posts
        </h2>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredPosts.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 dark:text-gray-400 col-span-full"
            >
              No posts found.
            </motion.p>
          ) : (
            filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6 min-h-[220px] bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg line-clamp-3">
                    {post.title}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor[post.status]}`}
                  >
                    {post.status}
                  </span>
                </div>

                {/* Body */}
                <p className="text-gray-600 dark:text-gray-300 line-clamp-5">
                  {post.body}
                </p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Previous
        </button>
        <span className="text-gray-700 dark:text-gray-200">Page {page}</span>
        <button
          onClick={() =>
            setPage((prev) =>
              prev * limit < englishPosts.length ? prev + 1 : prev
            )
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
