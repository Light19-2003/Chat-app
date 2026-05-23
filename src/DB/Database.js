import postgres from "postgres";

async function DbConnted() {
  try {
    const connectionString = process.env.DB_URL;

    const sql = await postgres(connectionString, {
      ssl: "require", // ✅ VERY IMPORTANT for Supabase
      max: 10,
    });

    console.log("Connected to DB");

    return sql;
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
}

export default DbConnted;
