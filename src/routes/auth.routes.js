import express from "express";
import {
  login,
  logout,
  profileUpdate,
  SignUp,
} from "../controller/auth.controller.js";
import { authcheck } from "../middleware/uth.middleware.js";
import { arcjectMiddleware } from "../middleware/arcject.middleware.js";

const router = express.Router();

router.use(arcjectMiddleware);

router.post("/signup", SignUp);

router.post("/login", login);

router.post("/logout", logout);

router.post("/profile-update", authcheck, profileUpdate);
router.get("/check", authcheck, (req, res) =>
  res.status(200).json({ message: "Authorized", user: req.user }),
);

export default router;
