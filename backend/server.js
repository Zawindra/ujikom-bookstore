import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ROUTES
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// TEST
app.get("/", (req, res) => {
  res.send("Book Store API is running...");
});

// ❗ WAJIB UNTUK VERCEL
export default app;