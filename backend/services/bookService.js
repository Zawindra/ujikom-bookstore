// backend/services/bookService.js

import db from "../config/db.js";
import fs from "fs";
import path from "path";

export const getBooks = async () => {
  const [rows] = await db.query("SELECT * FROM books ORDER BY id DESC");
  return rows;
};

export const getBookById = async (id) => {
  const [rows] = await db.query("SELECT * FROM books WHERE id=?", [id]);
  return rows[0] || null;
};

export const createBook = async (data) => {
  const {
    title,
    author,
    price,
    genre,
    year,
    discount,
    description,
    cover_url,
  } = data;

  const [result] = await db.query(
    `INSERT INTO books 
      (title, author, price, genre, year, discount, description, cover_url, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [title, author, price, genre, year, discount, description, cover_url]
  );

  const [rows] = await db.query("SELECT * FROM books WHERE id=?", [
    result.insertId,
  ]);

  return rows[0];
};

export const updateBook = async (id, data) => {
  const {
    title,
    author,
    price,
    genre,
    year,
    discount,
    description,
    cover_url,
  } = data;

  // Ambil cover lama
  const [oldRows] = await db.query("SELECT cover_url FROM books WHERE id=?", [
    id,
  ]);
  if (oldRows.length === 0) return null;

  const oldCover = oldRows[0].cover_url;

  // Hapus file lama jika ada cover baru
  if (cover_url && oldCover) {
    const oldPath = path.join(
      process.cwd(),
      "uploads",
      path.basename(oldCover)
    );

    try {
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    } catch (err) {
      console.log("⚠ Failed to delete old cover:", err.message);
    }
  }

  // Update DB
  await db.query(
    `UPDATE books 
     SET title=?, author=?, price=?, genre=?, year=?, discount=?, description=?, cover_url=?, updated_at=NOW()
     WHERE id=?`,
    [title, author, price, genre, year, discount, description, cover_url, id]
  );

  const [rows] = await db.query("SELECT * FROM books WHERE id=?", [id]);
  return rows[0];
};

export const deleteBook = async (id) => {
  const [rows] = await db.query("SELECT cover_url FROM books WHERE id=?", [id]);
  if (rows.length === 0) return null;

  const oldCover = rows[0].cover_url;

  if (oldCover) {
    const oldPath = path.join(
      process.cwd(),
      "uploads",
      path.basename(oldCover)
    );

    try {
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    } catch (err) {
      console.log("⚠ Delete failed:", err.message);
    }
  }

  await db.query("DELETE FROM books WHERE id=?", [id]);
  return true;
};
