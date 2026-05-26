// backend/controllers/bookController.js

import * as bookService from "../services/bookService.js";

export async function getBooks(req, res, next) {
  try {
    const books = await bookService.getBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
}

export async function getBookById(req, res, next) {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.json(book);
  } catch (error) {
    next(error);
  }
}

export async function createBook(req, res, next) {
  try {
    const { title, author, price, genre, year, discount, description } =
      req.body;

    let cover_url = null;
    if (req.file) {
      cover_url = `/uploads/${req.file.filename}`;
    }

    const newBook = await bookService.createBook({
      title,
      author,
      price,
      genre,
      year,
      discount,
      description,
      cover_url,
    });

    res.json({
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBook(req, res, next) {
  try {
    const id = req.params.id;

    const { title, author, price, genre, year, discount, description } =
      req.body;

    let cover_url = req.body.cover_url || null;

    // Jika upload file baru
    if (req.file) {
      cover_url = `/uploads/${req.file.filename}`;
    }

    const updatedBook = await bookService.updateBook(id, {
      title,
      author,
      price,
      genre,
      year,
      discount,
      description,
      cover_url,
    });

    res.json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const id = req.params.id;

    await bookService.deleteBook(id);

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
}
