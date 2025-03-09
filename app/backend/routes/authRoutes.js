import express from "express";
import { body, validationResult } from "express-validator";
import { registerUser, loginUser } from "../controllers/authcontoller.js";

const router = express.Router();

// Register User
router.post(
  "/register",
  [
    body("username", "Username is required").not().isEmpty(),
    body("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  (req, res, next) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed to the registerUser function if validation passes
  },
  registerUser
);

// Login User
router.post(
  "/login",
  [
    body("username", "Username is required").not().isEmpty(),
    body("password", "Password is required").exists(),
  ],
  (req, res, next) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed to the loginUser function if validation passes
  },
  loginUser
);

// Export the router
export default router;
