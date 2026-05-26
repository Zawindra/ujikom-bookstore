//Home.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/bookCard";
import HeroBanner from "../components/HeroBanner";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/books");
      const data = res.data.data || res.data;

      setBooks(data);
      setFiltered(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // SEARCH + GENRE FILTER
  useEffect(() => {
    let results = books;

    if (searchTerm.trim() !== "") {
      results = results.filter((book) =>
        `${book.title} ${book.author}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre !== "all") {
      results = results.filter((book) => book.genre === selectedGenre);
    }

    setFiltered(results);
  }, [searchTerm, selectedGenre, books]);

  // GET UNIQUE GENRES
  const genres = [...new Set(books.map((b) => b.genre).filter(Boolean))];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f5f7fb",
        paddingBottom: 50,
      }}
    >
      {/* HERO SECTION */}
      <HeroBanner />

      {/* SEARCH + FILTER SECTION */}
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "40px 20px",
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "14px 18px",
            borderRadius: 10,
            border: "1px solid #ddd",
            fontSize: 17,
            outline: "none",
            minWidth: 220,
          }}
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{
            width: 220,
            padding: "14px 18px",
            borderRadius: 10,
            border: "1px solid #ddd",
            fontSize: 17,
            background: "white",
          }}
        >
          <option value="all">All Genres</option>

          {genres.map((g, i) => (
            <option key={i} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* BOOK LIST GRID */}
      <div
        id="book-list"
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 25,
        }}
      >
        {filtered.length === 0 ? (
          <p style={{ fontSize: 20, color: "#777" }}>No books found.</p>
        ) : (
          filtered.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
    </div>
  );
}
