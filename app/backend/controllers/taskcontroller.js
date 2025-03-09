import Task from "../models/Task.js";
import { validationResult } from "express-validator";

// Create Task
const createTask = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, category, priority } = req.body;

  try {
    // Create a new task
    const task = new Task({
      title,
      description,
      category,
      priority,
      user: req.user.id, // Attach the task to the logged-in user
    });

    await task.save();

    res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Tasks for the Logged-in User
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Search Tasks by Title
const searchTasks = async (req, res) => {
  const { query } = req.query;

  try {
    const tasks = await Task.find({
      user: req.user.id,
      title: { $regex: query, $options: "i" }, // Case-insensitive search
    });

    res.json(tasks);
  } catch (err) {
    console.error("Error searching tasks:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Task
const updateTask = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, category, priority, isCompleted } = req.body;

  try {
    // Find the task by ID
    let task = await Task.findById(req.params.id);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the task belongs to the logged-in user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Update task fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.category = category || task.category;
    task.priority = priority || task.priority;
    task.isCompleted = isCompleted || task.isCompleted;

    // Save the updated task
    await task.save();

    // Send success response
    res.json(task);
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    // Find the task by ID
    const task = await Task.findById(req.params.id);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the task belongs to the logged-in user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Delete the task
    await task.deleteOne();

    // Send success response
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark Task as Completed
const completeTask = async (req, res) => {
  try {
    // Find the task by ID
    const task = await Task.findById(req.params.id);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the task belongs to the logged-in user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Mark the task as completed
    task.isCompleted = true;

    // Save the updated task
    await task.save();

    // Send success response
    res.json(task);
  } catch (err) {
    console.error("Error marking task as completed:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  createTask,
  getTasks,
  searchTasks,
  updateTask,
  deleteTask,
  completeTask,
};
