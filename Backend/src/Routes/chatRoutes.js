import express from "express";
import { getStreamToken } from "../Controllers/chatController.js";
import { protectRoute } from "../Middleware/protectRoute.js";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken);

export default router;
