import React, { useState, useEffect, useCallback } from "react"; // Add useCallback
import axios from "axios";
import "../styles.css";

const SearchTasks = () => {
  const [query, setQuery] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:7070/api/tasks/search?query=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(response.data);
    } catch (err) {
      console.error(err.message);
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  // Debounce the search input
  useEffect(() => {
    if (query.trim() === "") {
      setTasks([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [query, handleSearch]);

  return (
    <div className="search-container">
      <form className="search-form">
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </form>

      {loading && <div className="loading-message">Searching...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="search-results">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              Priority:{" "}
              <span className={`badge-${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
            </p>
            <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchTasks;
