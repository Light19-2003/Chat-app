import supabase from "../DB/Supa.db.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";

export const SignUp = async (req, res) => {
  const { fullname, password, email } = req.body;

  try {
    if (!fullname || !password || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    // check existing email
    const findUser = await CheckEmail(email);

    if (findUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // insert user
    const { data, error } = await supabase
      .from("UserModel")
      .insert([
        {
          Email: email,
          Full_Name: fullname,
          Password: hashedPassword,
        },
      ])
      .select();

    if (error) {
      console.log(error);

      return res.status(400).json({
        message: error.message,
      });
    }

    // inserted user
    const user = data[0];

    // token
    generateToken(user.id, res);

    return res.status(201).json({
      message: "Successfully created user",

      data: {
        id: user.id,
        Email: user.Email,
        Full_Name: user.Full_Name,
        Profile_Image: user.Profile_Image,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const CheckEmail = async (email) => {
  const { data, error } = await supabase
    .from("UserModel")
    .select("*")
    .eq("Email", email);

  if (error) {
    console.log(error);

    return false;
  }

  return data.length > 0;
};
