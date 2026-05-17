import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
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

app.listen(ENV.PORT, () => console.log("server is running on port 3000"));
