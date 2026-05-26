// resetAdmin.js
import db from "./config/db.js";
import bcrypt from "bcryptjs";

async function resetAdmin() {
  try {
    const email = "admin@mail.com";     // 👉 Email admin
    const password = "admin123";        // 👉 Password baru
    const hash = await bcrypt.hash(password, 10);

    console.log("🔄 Resetting admin account...");

    // HAPUS ADMIN LAMA
    await db.query(`DELETE FROM users WHERE role='admin'`);

    // MASUKKAN ADMIN BARU
    const [result] = await db.query(
      `INSERT INTO users (fullname, username, email, password, role)
       VALUES (?, ?, ?, ?, 'admin')`,
      ["Administrator", "admin", email, hash]
    );

    console.log("\n✅ Admin berhasil dibuat ulang!");
    console.log("📩 Email :", email);
    console.log("🔑 Password :", password);
    console.log("🆔 User ID:", result.insertId);

    process.exit();
  } catch (err) {
    console.error("❌ Error reset admin:", err);
    process.exit(1);
  }
}

resetAdmin();
