import express from "express";
import { login, logout, SignUp } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", SignUp);


router.post("/login",login)

router.post("/logout", logout );

export default router;
