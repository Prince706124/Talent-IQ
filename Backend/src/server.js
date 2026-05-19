import express from "express";
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
const app = express();

const dirname = path.resolve();
console.log(ENV.PORT);
console.log(ENV.DB_URL);

//credentials:true ? meaning => server allow a browsers to include cookies on request
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware()); //this add auth filed to request : req.auth();
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "sucess from api" });
});

//when you pass an array of middleware to express ,it automatically flatten and executes then sequentially one by one
// app.get("/video-calls", protectRoute, (req, res) => {
//   res.status(200).json({ msg: "this is a protected route for video calls" });
// });

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "../Frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(dirname, "../Frontend/dist/index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("server is running on port :", ENV.PORT);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
