import express from "express";
import {
  getMe,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import { protect } from "./../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.post("/", registerUser);
router.post("/login", loginUser);

export default router;
