import db from "../config/db.js";

export async function getAllUsers() {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
}

export async function getUserById(id) {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
}

export async function addUser({ fullname, username, email, password, role }) {
  const [result] = await db.query(
    "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
    [fullname, username, email, password, role || "user"]
  );
  return result;
}

export async function updateUser(id, data) {
  const [result] = await db.query("UPDATE users SET ? WHERE id = ?", [data, id]);
  return result;
}

export async function deleteUser(id) {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result;
}
