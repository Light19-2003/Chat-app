import jwt from "jsonwebtoken";

export const generateToken = (UserId, res) => {
  const token = jwt.sign({ UserId: UserId }, process.env.jwt_key, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
