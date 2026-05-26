import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    genre: "",
  });

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
    await axios.post("http://localhost:4000/api/books", form);
    navigate("/");
  };

  return (
    <div>
      <h1>Add Book</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" style={input} onChange={handleChange} />
        <input name="author" placeholder="Author" style={input} onChange={handleChange} />
        <input name="year" placeholder="Year" style={input} onChange={handleChange} />
        <input name="genre" placeholder="Genre" style={input} onChange={handleChange} />

        <button style={btn}>Save</button>
      </form>
    </div>
  );
}
