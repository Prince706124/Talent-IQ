import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { mongo } from "mongoose";
import { connectDB } from "./lib/db.js";
const app = express();

const dirname = path.resolve();
console.log(ENV.PORT);
console.log(ENV.DB_URL);

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "sucess from api" });
});

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
