import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

export const resend = new Resend(process.env.email_key);

export const sender = {
  email: process.env.email_from,
  name: process.env.email_from_name,
};
