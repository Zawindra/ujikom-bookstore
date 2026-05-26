import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser, getToken, isLoggedIn } from "../utils/auth";
import Swal from "sweetalert2";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/books/${id}`);
      setBook(res.data.data || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // ADD TO CART (WITH QTY)
  // =========================
  const handleAddToCart = () => {
  if (!isLoggedIn()) {
    return Swal.fire({
      title: "Login Required",
      text: "You need an account to buy this book.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#0b63a8",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Login Now",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  }

  // If logged in → normal add to cart
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const exist = cart.find((c) => c.id === book.id);

  if (exist) {
    exist.qty += 1;
  } else {
    cart.push({
      id: book.id,
      title: book.title,
      qty: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  Swal.fire({
    icon: "success",
    title: "Added to Cart!",
    text: `"${book.title}" has been added to your cart.`,
    confirmButtonColor: "#28a745",
  });

  window.dispatchEvent(new Event("storage"));
};

  // =========================

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      alert("Book deleted!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to delete!");
    }
  };

  if (!book) return <div style={{ padding: 30 }}>Loading...</div>;

  const role = getUser()?.role;

  const discountedPrice = book.discount
    ? book.price - (book.price * book.discount) / 100
    : book.price;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#eef3f8",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: 1200,
          background: "#fff",
          padding: "40px 50px",
          borderRadius: 20,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          style={{
            marginBottom: 30,
            background: "#e6f0ff",
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid #bcd3ff",
            cursor: "pointer",
            fontWeight: 600,
            color: "#0b63a8",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </button>

        {/* CONTENT */}
        <div
          style={{
            display: "flex",
            gap: 50,
            flexWrap: "wrap",
          }}
        >
          {/* COVER */}
          <div style={{ flex: "0 0 350px" }}>
            <div style={{ position: "relative" }}>
              {book.discount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    background: "#e63946",
                    color: "#fff",
                    padding: "6px 14px",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  -{book.discount}%
                </span>
              )}

              <img
                src={
                  book.cover_url
                    ? `http://localhost:4000${book.cover_url}`
                    : "https://via.placeholder.com/300x420.png?text=No+Cover"
                }
                style={{
                  width: "100%",
                  height: 480,
                  objectFit: "cover",
                  borderRadius: 15,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                }}
              />
            </div>
          </div>

          {/* DETAIL */}
          <div style={{ flex: "1 1 500px" }}>
            <h1 style={{ fontSize: 36, fontWeight: 800 }}>{book.title}</h1>
            <p>
              By <strong>{book.author}</strong>
            </p>

            {/* PRICE */}
            <div style={{ marginTop: 20 }}>
              {book.discount > 0 ? (
                <>
                  <p
                    style={{
                      fontSize: 22,
                      textDecoration: "line-through",
                      color: "#999",
                    }}
                  >
                    Rp {parseInt(book.price).toLocaleString()}
                  </p>

                  <p
                    style={{
                      fontSize: 32,
                      fontWeight: 900,
                      color: "#1b8f3a",
                    }}
                  >
                    Rp {parseInt(discountedPrice).toLocaleString()}
                  </p>
                </>
              ) : (
                <p style={{ fontSize: 32, fontWeight: 900 }}>
                  Rp {parseInt(book.price).toLocaleString()}
                </p>
              )}
            </div>

            {/* INFO */}
            <div style={{ marginTop: 20 }}>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>Year:</strong> {book.year || "-"}
              </p>
              <p>
                <strong>Description:</strong> {book.description}
              </p>
            </div>

            {/* ACTION */}
            <div style={{ marginTop: 35 }}>
              {role === "admin" ? (
                <div style={{ display: "flex", gap: 20 }}>
                  <Link
                    to={`/edit-book/${book.id}`}
                    style={{
                      padding: "12px 30px",
                      background: "#0b63a8",
                      color: "#fff",
                      borderRadius: 10,
                      textDecoration: "none",
                    }}
                  >
                    Edit Book
                  </Link>

                  <button
                    onClick={handleDelete}
                    style={{
                      padding: "12px 30px",
                      background: "#e63946",
                      color: "#fff",
                      borderRadius: 10,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  style={{
                    padding: "16px 40px",
                    background: "#28a745",
                    color: "#fff",
                    borderRadius: 10,
                    border: "none",
                    fontSize: 20,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
