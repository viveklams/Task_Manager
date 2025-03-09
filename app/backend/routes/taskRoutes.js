import express from "express";
import { body, validationResult } from "express-validator";
import {
  createTask,
  deleteTask,
  getTasks,
  searchTasks,
  updateTask,
  completeTask,
} from "../controllers/taskcontroller.js";

import authMiddleware from "../middleware/authmiddlware.js";
const router = express.Router();

// Create Task
router.post(
  "/",
  authMiddleware,

  [
    body("title", "Title is required").not().isEmpty(),
    body("priority", "Priority must be High, Medium, or Low").isIn([
      "High",
      "Medium",
      "Low",
    ]),
  ],
  createTask
);

router.get("/", authMiddleware, getTasks);
router.get("/search", authMiddleware, searchTasks);

router.put(
  "/:id",
  authMiddleware,
  [
    body("title", "Title is required").optional().not().isEmpty(),
    body("priority", "Priority must be High, Medium, or Low")
      .optional()
      .isIn(["High", "Medium", "Low"]),
  ],
  updateTask
);

// Delete Task
router.delete("/:id", authMiddleware, deleteTask);

// Mark Task as Completed
router.patch("/:id/complete", authMiddleware, completeTask);

export default router;
