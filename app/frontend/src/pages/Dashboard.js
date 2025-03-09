import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import TaskEditForm from "../components/TaskEditForm";
import SearchTasks from "../components/SearchTasks";
import "../styles.css";
import TaskFormComponent from "../components/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks from the backend
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:7070/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle task creation
  const handleTaskSubmit = async (taskData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:7070/api/tasks",
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Task created successfully!");
      setError("");

      // Update tasks state directly
      setTasks((prevTasks) => [response.data, ...prevTasks]);
      setFilteredTasks((prevTasks) => [response.data, ...prevTasks]);

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error creating task:", err.message);
      setError(
        err.response?.data?.message ||
          "Failed to create task. Please try again."
      );
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:7070/api/tasks/${taskId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Task updated successfully!");
      setError("");

      // Refresh the task list
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedData } : task
        )
      );
      setFilteredTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedData } : task
        )
      );

      setEditingTask(null); // Close the edit form
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error updating task:", err.message);
      setError(
        err.response?.data?.message ||
          "Failed to update task. Please try again."
      );
    }
  };

  // Handle task deletion
  const handleDeleteTask = useCallback(async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:7070/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Task deleted successfully!");
      setError("");

      // Refresh the task list
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      setFilteredTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error deleting task:", err.message);
      setError(
        err.response?.data?.message ||
          "Failed to delete task. Please try again."
      );
    }
  }, []);

  // Handle marking a task as completed
  const handleCompleteTask = useCallback(async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:7070/api/tasks/${taskId}/complete`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Task marked as completed!");
      setError("");

      // Refresh the task list
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, isCompleted: true } : task
        )
      );
      setFilteredTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, isCompleted: true } : task
        )
      );

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error marking task as completed:", err.message);
      setError(
        err.response?.data?.message ||
          "Failed to mark task as completed. Please try again."
      );
    }
  }, []);

  // Handle search functionality
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      // If the search term is empty, show all tasks
      setFilteredTasks(tasks);
    } else {
      // Filter tasks based on the search term
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      {editingTask ? (
        <TaskEditForm
          task={editingTask}
          onSubmit={(updatedData) =>
            handleUpdateTask(editingTask._id, updatedData)
          }
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <>
          <TaskFormComponent
            task={editingTask}
            onSave={(taskData) => {
              if (editingTask) {
                // Handle task update
                handleUpdateTask(editingTask._id, taskData);
              } else {
                // Handle task creation
                handleTaskSubmit(taskData);
              }
            }}
            onCancel={() => setEditingTask(null)} // Handle cancel action
          />
          <SearchTasks onSearch={handleSearch} />
          {loading ? (
            <div className="loading-message">Loading tasks...</div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onDelete={handleDeleteTask}
              onComplete={handleCompleteTask}
              onEdit={setEditingTask}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
