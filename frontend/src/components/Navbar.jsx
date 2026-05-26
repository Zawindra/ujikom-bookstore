import { Link, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, getUser, logout } from "../utils/auth";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [openCart, setOpenCart] = useState(false);
  const cartRef = useRef(null);

  const [cart, setCart] = useState([]);

  // LOAD CART AT START
  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(c);
  }, []);

  // UPDATE CART IF STORAGE UPDATED
  useEffect(() => {
    const handler = () => {
      const c = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(c);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // TOTAL ITEM COUNT
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // CLOSE DROPDOWNS //
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setOpenCart(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // LOGOUT //
  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
      }
    });
  };

  // CART FUNCTIONS //
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    saveCart(updated);
  };

  const decreaseQty = (id) => {
    let updated = cart
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);

    saveCart(updated);
  };

  // HIDE NAVBAR AT LOGIN/REGISTER //
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const user = getUser();
  const role = user?.role;

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>
          BookStore
        </Link>
      </div>

      <div style={styles.right}>
        {!isLoggedIn() ? (
          <>
            <Link to="/login" style={styles.btnWhite}>
              Login
            </Link>
            <Link to="/register" style={styles.btnBlue}>
              Register
            </Link>
          </>
        ) : (
          <>
            {role === "admin" && (
              <Link to="/upload" style={styles.btnBlue}>
                Upload Book
              </Link>
            )}

            {/* CART BUTTON */}
            {role !== "admin" && (
              <div style={{ position: "relative" }} ref={cartRef}>
                <button
                  onClick={() => setOpenCart(!openCart)}
                  style={styles.cartButton}
                >
                  <i
                    className="fa-solid fa-cart-shopping"
                    style={{ fontSize: 22, color: "#0b63a8" }}
                  ></i>

                  {cartCount > 0 && (
                    <span style={styles.cartBadge}>{cartCount}</span>
                  )}
                </button>

                {/* CART POPUP */}
                {openCart && (
                  <div style={styles.cartDropdown}>
                    <h4 style={{ marginBottom: 10 }}>Your Cart</h4>

                    {cart.length === 0 ? (
                      <p style={{ color: "#777" }}>Cart is empty.</p>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item.id}
                          style={styles.cartItem}
                        >
                          <span style={{ flex: 1 }}>{item.title}</span>

                          <div style={styles.qtyWrapper}>
                            <button
                              onClick={() => decreaseQty(item.id)}
                              style={styles.qtyBtn}
                            >
                              –
                            </button>
                            <span>{item.qty}</span>
                            <button
                              onClick={() => increaseQty(item.id)}
                              style={styles.qtyBtn}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ACCOUNT DROPDOWN */}
            <div style={styles.accountWrapper} ref={dropdownRef}>
              <div
                style={styles.userInfo}
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                <div style={styles.avatar}>
                  {user.username?.charAt(0)?.toUpperCase()}
                </div>
                <span style={styles.username}>{user.username}</span>
                <span style={styles.caret}>▼</span>
              </div>

              {openDropdown && (
                <div style={styles.dropdown}>
                  <button onClick={handleLogout} style={styles.dropdownItem}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: "100%",
    height: "70px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  brand: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0b63a8",
    textDecoration: "none",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  btnWhite: {
    padding: "10px 18px",
    borderRadius: 8,
    background: "#fff",
    border: "1px solid #0b63a8",
    color: "#0b63a8",
    fontSize: 14,
    textDecoration: "none",
    cursor: "pointer",
  },

  btnBlue: {
    padding: "10px 18px",
    borderRadius: 8,
    background: "#0b63a8",
    color: "#fff",
    fontSize: 14,
    textDecoration: "none",
    cursor: "pointer",
  },

  cartButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    position: "relative",
  },

  cartBadge: {
    position: "absolute",
    top: -6,
    right: -10,
    background: "#e63946",
    color: "#fff",
    borderRadius: "50%",
    padding: "3px 7px",
    fontSize: 12,
    fontWeight: "700",
  },

  cartDropdown: {
    position: "absolute",
    top: 45,
    right: 0,
    width: 280,
    background: "#fff",
    borderRadius: 12,
    padding: 15,
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: 30,
  },

  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },

  qtyWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    border: "1px solid #ccc",
    background: "#f1f1f1",
    cursor: "pointer",
    fontWeight: 700,
  },

  accountWrapper: {
    position: "relative",
  },

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: 8,
    background: "#f1f5f9",
    border: "1px solid #dce3eb",
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#0b63a8",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 16,
  },

  username: {
    fontSize: 14,
    fontWeight: 600,
    color: "#333",
  },

  caret: {
    fontSize: 12,
    marginLeft: 4,
  },

  dropdown: {
    position: "absolute",
    top: 55,
    right: 0,
    background: "#ffffff",
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    padding: "10px 0",
    minWidth: 160,
    zIndex: 20,
  },

  dropdownItem: {
    background: "none",
    border: "none",
    width: "100%",
    textAlign: "left",
    padding: "10px 20px",
    fontSize: 14,
    cursor: "pointer",
    color: "#d9534f",
    fontWeight: 600,
  },
};
