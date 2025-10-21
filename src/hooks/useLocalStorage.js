import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Initialize state from localStorage or fallback to default value
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error("🔴 Error reading from localStorage:", err);
      return initialValue;
    }
  });

  // Update localStorage whenever `value` changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("🔴 Error saving to localStorage:", err);
    }
  }, [key, value]);

  return [value, setValue];
};
