// src/pages/EditBook.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // STATE FIELD BARU
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState(null);

  // Ambil data lama
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/books/${id}`)
      .then((res) => {
        const data = res.data;
        setBook(data);

        // isi state
        setTitle(data.title);
        setAuthor(data.author);
        setPrice(data.price);
        setGenre(data.genre);
        setYear(data.year || "");
        setDiscount(data.discount || 0);
        setDescription(data.description);

        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load book data.");
        navigate("/");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("author", author);
    form.append("price", price);
    form.append("genre", genre);
    form.append("year", year);
    form.append("discount", discount);
    form.append("description", description);
    if (cover) form.append("cover", cover);

    try {
      await axios.put(`http://localhost:4000/api/books/${id}`, form, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book updated!");
      navigate(`/book/${id}`);
    } catch (error) {
      console.log(error);
      alert("Failed to update book.");
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading…</div>;

  return (
    <div
      style={{
        maxWidth: 550,
        margin: "40px auto",
        background: "#fff",
        padding: 25,
        borderRadius: 12,
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20, color: "#0b63a8" }}>
        Edit Book
      </h2>

      {/* COVER PREVIEW */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img
          src={
            cover
              ? URL.createObjectURL(cover)
              : `http://localhost:4000${book.cover_url}`
          }
          style={{
            width: 200,
            height: 280,
            objectFit: "cover",
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} style={input} required />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} style={input} required />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={input}
          required
        />

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={input}
        />

        <input
          type="number"
          placeholder="Discount (%)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          style={input}
        />

        <select value={genre} onChange={(e) => setGenre(e.target.value)} style={input}>
          <option value="Novel">Novel</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Education">Education</option>
          <option value="Biography">Biography</option>
        </select>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...input, height: 120 }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
          style={input}
        />

        <button
          type="submit"
          style={{
            padding: "12px 0",
            background: "#0b63a8",
            color: "#fff",
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          Update Book
        </button>
      </form>
    </div>
  );
}

const input = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid #d0d7e2",
};
