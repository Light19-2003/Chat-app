import supabase from "../DB/Supa.db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authcheck = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provided" });

    const decoded = jwt.verify(token, process.env.jwt_key);

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - invaild token" });

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
