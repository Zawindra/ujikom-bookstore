import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register({ fullname, username, email, password }) {
  // CEK jika field empty
  if (!fullname || !username || !email || !password) {
    throw new Error("All fields are required");
  }

  // HASH PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  // INSERT USER
  const [result] = await db.query(
    `INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)`,
    [fullname, username, email, hashedPassword]
  );

  return { id: result.insertId, fullname, username, email };
}

export async function login({ email, password }) {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

  if (rows.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = rows[0];

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
}
