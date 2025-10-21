import React, { useState, useEffect } from "react";

// Sample initial tasks
const initialTasks = [
  { id: 1, title: "Morning Run", status: "Active", startTime: "2025-10-21T08:00", endTime: "2025-10-21T08:30" },
  { id: 2, title: "Read Health Article", status: "Pending", startTime: "2025-10-21T09:00", endTime: "2025-10-21T09:45" },
  { id: 3, title: "Meditation", status: "Completed", startTime: "2025-10-20T20:00", endTime: "2025-10-20T20:30" },
];

const statusColors = {
  Pending: "bg-gray-300 text-gray-800",
  Active: "bg-blue-500 text-white",
  Completed: "bg-green-500 text-white",
};

// Function to calculate countdown string
const getCountdown = (currentTime, start, end, status) => {
  let diff = 0;
  if (status === "Pending") diff = new Date(start) - currentTime;
  if (status === "Active") diff = new Date(end) - currentTime;
  if (status === "Completed") return "Completed ✅";

  if (diff <= 0) return status === "Pending" ? "Starting soon..." : "Ending soon...";

  const hrs = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  return `${hrs}h ${mins}m ${secs}s`;
};

const TaskManager = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alerts, setAlerts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    status: "Pending",
  });

  // Request notification permission
  useEffect(() => { if ("Notification" in window) Notification.requestPermission(); }, []);

  // Live time update
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Update task status dynamically & trigger alerts
  useEffect(() => {
    setTasks(prev =>
      prev.map(task => {
        const start = new Date(task.startTime);
        const end = new Date(task.endTime);

        if (currentTime >= start && currentTime <= end && task.status !== "Active") {
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification(`Task Started: ${task.title}`, { body: `Time to start "${task.title}"!` });
          }
          setAlerts(prev => [...prev, `Task Started: ${task.title}`]);
          return { ...task, status: "Active" };
        }
        if (currentTime > end) return { ...task, status: "Completed" };
        if (currentTime < start) return { ...task, status: "Pending" };
        return task;
      })
    );
  }, [currentTime]);

  // Modal handlers
  const openModal = (task = null) => {
    setEditTask(task);
    setFormData(task ? { ...task } : { title: "", startTime: "", endTime: "", status: "Pending" });
    setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); setEditTask(null); };
  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    if (editTask) setTasks(prev => prev.map(t => t.id === editTask.id ? { ...formData, id: editTask.id } : t));
    else setTasks(prev => [...prev, { ...formData, id: Date.now() }]);
    closeModal();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-8">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">🗓️ Task Manager</h2>

      <button onClick={() => openModal()} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        ➕ Add New Task
      </button>

      {/* Alerts */}
      <div className="space-y-2">
        {alerts.map((alert, idx) => <div key={idx} className="p-2 bg-red-100 text-red-700 rounded">{alert}</div>)}
      </div>

      {/* Sidebar: Task Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {["Pending", "Active", "Completed"].map(status => (
          <div key={status} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">{status} Tasks</h3>
            {tasks.filter(t => t.status === status).length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No {status.toLowerCase()} tasks</p>
            ) : (
              tasks.filter(t => t.status === status).map(task => (
                <p key={task.id} className="text-sm text-gray-700 dark:text-gray-200">
                  {task.title} <br />
                  {new Date(task.startTime).toLocaleString()} - {new Date(task.endTime).toLocaleString()} <br />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {getCountdown(currentTime, task.startTime, task.endTime, task.status)}
                  </span>
                </p>
              ))
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4">{editTask ? "Edit Task" : "Add New Task"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" placeholder="Task Title" value={formData.title} onChange={handleChange}
                     className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900" required />
              <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange}
                     className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900" required />
              <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange}
                     className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900" required />
              <select name="status" value={formData.status} onChange={handleChange}
                      className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">{editTask ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
