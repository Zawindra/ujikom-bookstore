import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import authenticateToken, { requireAdmin } from "../middlewares/authMiddleware.js";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

// PUBLIC
router.get("/", getBooks);
router.get("/:id", getBookById);

// ADMIN ONLY
router.post("/", authenticateToken, requireAdmin, upload.single("cover"), createBook);
router.put("/:id", authenticateToken, requireAdmin, upload.single("cover"), updateBook);
router.delete("/:id", authenticateToken, requireAdmin, deleteBook);

export default router;
