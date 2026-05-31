import http from "http";
import { Server } from "socket.io";

import express from "express";
import fs from "fs";
import path from "path";
import { ENV } from "./lib/env.js";
import { mongo } from "mongoose";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express";
import cors from "cors";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./Middleware/protectRoute.js";
import chatRoutes from "./Routes/chatRoutes.js";
import sessionRoutes from "./Routes/sessionRoutes.js";
const app = express();
const server = http.createServer(app);

const dirname = path.resolve();
console.log(ENV.PORT);
console.log(ENV.DB_URL);

//credentials:true ? meaning => server allow a browsers to include cookies on request
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware()); //this add auth filed to request : req.auth();

const io = new Server(server, {
  cors: {
    origin: ENV.CLIENT_URL,
    credentials: true,
  },
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join interview session room
  socket.on("join-session", (sessionId) => {
    socket.join(sessionId);

    console.log(`Socket ${socket.id} joined ${sessionId}`);
  });

  socket.on("language-change", ({ sessionId, language }) => {
    socket.to(sessionId).emit("receive-language", language);
  });

  // Real-time code sync
  socket.on("code-change", ({ sessionId, code }) => {
    socket.to(sessionId).emit("receive-code", code);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get("/books", (req, res) => {
  res.status(200).json({ message: "sucess from api" });
});

//when you pass an array of middleware to express ,it automatically flatten and executes then sequentially one by one
// app.get("/video-calls", protectRoute, (req, res) => {
//   res.status(200).json({ message: "this is a protected route for video calls" });
// });

const frontendDistPath = path.join(dirname, "../Frontend/dist");
const frontendIndex = path.join(frontendDistPath, "index.html");

if (fs.existsSync(frontendIndex)) {
  app.use(express.static(frontendDistPath));
  app.get("/*", (req, res) => {
    res.sendFile(frontendIndex);
  });
}

const startServer = async () => {
  try {
    await connectDB();
    server.listen(ENV.PORT, () => {
      console.log("server is running on port :", ENV.PORT);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
