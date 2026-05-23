import express from "express";
import {
  createSession,
  getActiveSessions,
  getSessionById,
  getMyRecentSessions,
  joinSession,
  endSession,
} from "../Controllers/sessionController.js";
import { protectRoute } from "../Middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createSession);
router.get("/active", protectRoute, getActiveSessions);
router.get("/my-recent", protectRoute, getMyRecentSessions);
router.get("/:id", protectRoute, getSessionById);
router.post("/:id/join", protectRoute, joinSession);
router.post("/:id/end", protectRoute, endSession);

export default router;
