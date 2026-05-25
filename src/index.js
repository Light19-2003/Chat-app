import express from "express";

import dotenv from "dotenv";

import authRoutes from "../src/routes/auth.routes.js";
import MessageRoutes from "../src/routes/message.routes.js";

// import Db from "../src/DB/Supa.db.js";

import db from "../src/DB/Database.js";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", MessageRoutes);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
  db();
});
