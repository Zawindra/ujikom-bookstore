import { useState } from "react";
import axios from "axios";
import { getToken, getUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function UploadBook() {
  const navigate = useNavigate();

  // Cek role admin
  const role = getUser()?.role;
  if (role !== "admin") {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2 style={{ color: "red" }}>Access Forbidden</h2>
        <p>You don't have permission to upload books.</p>
      </div>
    );
  }

  // State form
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState(null);
  const [year, setYear] = useState("");
  const [discount, setDiscount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("price", price);
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("year", year);
    formData.append("discount", discount);
    if (cover) formData.append("cover", cover);

    try {
      await axios.post("http://localhost:4000/api/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      alert("Book uploaded successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to upload book.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        background: "#fff",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: 20, textAlign: "center", color: "#0b63a8" }}>
        Upload New Book
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Discount (%)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          style={inputStyle}
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select Genre</option>
          <option value="Novel">Novel</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Education">Education</option>
          <option value="Biography">Biography</option>
        </select>

        <textarea
          placeholder="Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: "100px" }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: "12px 0",
            background: "#0b63a8",
            color: "#fff",
            borderRadius: 6,
            fontSize: 16,
            cursor: "pointer",
            border: "none",
            marginTop: 10,
          }}
        >
          Upload Book
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: 6,
  border: "1px solid #d0d7e2",
};
