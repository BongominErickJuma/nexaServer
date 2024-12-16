import db from "./connect.js"; // Your database connection
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config(); // Load .env variables

const saltRounds = 10;

async function createAdmin() {
  try {
    // Extract admin data from environment variables
    const {
      ADMIN_NAME,
      ADMIN_EMAIL,
      ADMIN_PHONE,
      ADMIN_IMAGE,
      ADMIN_PASSWORD,
      ADMIN_ROLE,
      ADMIN_STATUS,
    } = process.env;

    // Check if the admin already exists
    const checkAdmin = await db.query(
      "SELECT * FROM teachers WHERE role = $1",
      [ADMIN_ROLE]
    );
    if (checkAdmin.rows.length > 0) {
      console.log("Admin user already exists.");
      return;
    }

    // Hash the admin password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

    // Insert the admin user into the database
    const result = await db.query(
      "INSERT INTO teachers (name, email, phone, image, password, role, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        ADMIN_NAME,
        ADMIN_EMAIL,
        ADMIN_PHONE,
        ADMIN_IMAGE,
        hashedPassword,
        ADMIN_ROLE,
        ADMIN_STATUS,
      ]
    );

    console.log("Admin user created successfully:", result.rows[0]);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

// Call the function to create admin
export default createAdmin;
