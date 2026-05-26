import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListBooks() {
  const [books, setBooks] = useState([]);

  const table = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const th = {
    background: "#4f46e5",
    padding: "12px",
    fontWeight: "600",
  };

  const td = {
    padding: "12px",
    borderBottom: "1px solid #444",
  };

  const btnEdit = {
    padding: "8px 14px",
    background: "#0ea5e9",
    border: "none",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "6px",
  };

  const btnDelete = {
    padding: "8px 14px",
    background: "#dc2626",
    border: "none",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:4000/api/books");
    setBooks(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    if (!confirm("Delete this book?")) return;

    await axios.delete(`http://localhost:4000/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div>
      <h1>Book List</h1>

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Title</th>
            <th style={th}>Author</th>
            <th style={th}>Year</th>
            <th style={th}>Genre</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.length > 0 ? (
            books.map((b) => (
              <tr key={b.id}>
                <td style={td}>{b.id}</td>
                <td style={td}>{b.title}</td>
                <td style={td}>{b.author}</td>
                <td style={td}>{b.year}</td>
                <td style={td}>{b.genre}</td>
                <td style={td}>
                  <Link to={`/edit/${b.id}`}>
                    <button style={btnEdit}>Edit</button>
                  </Link>
                  <button onClick={() => deleteBook(b.id)} style={btnDelete}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={td} colSpan="6">No books found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
