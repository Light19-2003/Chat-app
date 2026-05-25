import supabase from "../DB/Supa.db.js";
import { sendEmail } from "../emails/emailHandlers.js";
import cloud from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

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

    try {
      await sendEmail(email, fullname, process.env.CLIENT_URL);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const Finduser = CheckEmail(email);

    if (!Finduser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const { data, error } = await supabase
      .from("UserModel")
      .select("*")
      .eq("Email", email)
      .single();

    if (error || !data) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const ismatch = await bcrypt.compare(password, data.Password);

    if (!ismatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    generateToken(data.id, res);

    return res.status(200).json({
      message: "Login successful",
      user: data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).json({
    message: "Logout successful",
  });
};

export const profileUpdate = async (req, res) => {
  try {
    const { profliepic } = req.body;

    if (!profliepic) {
      return res.status(400).json({
        message: "Profile picture is required",
      });
    }

    const userid = req.decoded.id;

 const uploadres= await cloud.uploader.upload(profliepic)

const {data,error} = await supabase.from("Usermodel").update({
  Profile_Image:uploadres.secure_url, 

}).eq("Id",userid)


if(error){

  console.log(error)

  return res.status(400).json({
    message: "Something went wrong",
  });
}
else{
  return res.status(200).json({
    message: "Profile picture updated successfully",
    data:data
  });
}


  } catch (error) {}
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
