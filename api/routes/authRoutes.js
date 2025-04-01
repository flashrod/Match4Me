import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { protectRoute } from "../middleware/auth.js";

const router = express.Router();

// Define the routes
router.post("/signup", signup);    // Signup route
router.post("/login", login);      // Login route
router.post("/logout", logout);    // Logout route

// Protected route to fetch the authenticated user
router.get("/me", protectRoute, (req, res) => {
    res.send({
        success: true,
        user: req.user,
    });
});

export default router;
