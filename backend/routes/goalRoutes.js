import express from "express";
import {
  getGoals,
  postGoals,
  putGoals,
  deleteGoals,
} from "../controllers/goalsControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getGoals).post(protect, postGoals);
router.route("/:id").put(protect, putGoals).delete(protect, deleteGoals);

export default router;
