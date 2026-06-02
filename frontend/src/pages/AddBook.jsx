import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function AddBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
    year: "",
    discount: "",
    description: "",
  });

  const [cover, setCover] = useState(null);

  const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    background: "#2b2b2b",
    border: "1px solid #555",
    borderRadius: "6px",
    color: "white",
  };

  const btn = {
    padding: "10px 18px",
    background: "#4f46e5",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", form.title);
      data.append("author", form.author);
      data.append("price", form.price);
      data.append("genre", form.genre);
      data.append("year", form.year);
      data.append("discount", form.discount);
      data.append("description", form.description);

      if (cover) {
        data.append("cover", cover);
      }

      await axios.post(`${API}/api/books`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to add book");
    }
  };

  return (
    <div>
      <h1>Add Book</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" style={input} onChange={handleChange} />
        <input name="author" placeholder="Author" style={input} onChange={handleChange} />
        <input name="price" placeholder="Price" style={input} onChange={handleChange} />
        <input name="year" placeholder="Year" style={input} onChange={handleChange} />
        <input name="discount" placeholder="Discount" style={input} onChange={handleChange} />
        <input name="genre" placeholder="Genre" style={input} onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Description"
          style={input}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          style={input}
          onChange={(e) => setCover(e.target.files[0])}
        />

        <button style={btn}>Save</button>
      </form>
    </div>
  );
}