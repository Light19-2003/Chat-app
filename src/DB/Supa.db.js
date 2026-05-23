import dotenv from "dotenv";
dotenv.config(); // ← This MUST be before createClient
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const ConntedDb = createClient(supabaseUrl, supabaseKey);

// console.log("Connected to Supabase");
export default ConntedDb;
