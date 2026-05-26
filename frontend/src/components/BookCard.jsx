//BookCard.jsx

import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  const discountedPrice =
    book.discount > 0
      ? book.price - (book.price * book.discount) / 100
      : book.price;

  return (
    <Link
      to={`/book/${book.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 15,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transition: "0.2s",
          position: "relative",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {/* DISCOUNT BADGE */}
        {book.discount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "#e63946",
              padding: "5px 10px",
              color: "white",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              zIndex: 2,
            }}
          >
            -{book.discount}%
          </span>
        )}

        {/* COVER BOOK */}
        <img
          src={
            book.cover_url
              ? `http://localhost:4000${book.cover_url}`
              : "https://via.placeholder.com/200x280.png?text=No+Cover"
          }
          style={{
            width: "100%",
            height: 260,
            objectFit: "cover",
            borderRadius: 10,
          }}
        />

        {/* TITLE */}
        <h3 style={{ marginTop: 12, fontSize: 18, fontWeight: 700 }}>
          {book.title}
        </h3>

        {/* AUTHOR */}
        <p style={{ margin: "2px 0", color: "#666" }}>{book.author}</p>

        {/* PRICE */}
        {book.discount > 0 ? (
          <div style={{ marginTop: 8 }}>
            <p
              style={{
                textDecoration: "line-through",
                color: "#999",
                fontSize: 14,
              }}
            >
              Rp {parseInt(book.price).toLocaleString()}
            </p>

            <p
              style={{
                marginTop: 2,
                fontWeight: 700,
                fontSize: 18,
                color: "#1b8f3a",
              }}
            >
              Rp {parseInt(discountedPrice).toLocaleString()}
            </p>
          </div>
        ) : (
          <p style={{ marginTop: 8, fontWeight: 600 }}>
            Rp {parseInt(book.price).toLocaleString()}
          </p>
        )}
      </div>
    </Link>
  );
}
