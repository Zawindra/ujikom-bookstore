import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// FIX __dirname untuk ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware dasar
app.use(cors());
app.use(express.json());

// STATIC UPLOADS (WAJIB UNTUK MENAMPILKAN GAMBAR)
app.use("/uploads", express.static("uploads"));
app.use("/api/books", bookRoutes);

// ROUTES
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("Book Store API is running...");
});

// RUN SERVER
app.listen(4000, () =>
  console.log("🚀 Server running on http://localhost:4000")
);
