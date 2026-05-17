import express from "express";

import dotenv from "dotenv";

import authRoutes from "../src/routes/auth.routes.js";
import MessageRoutes from "../src/routes/message.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", MessageRoutes);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server is running on port 3000" + port);
});
