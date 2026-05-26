// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/footer";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import UploadBook from "./pages/UploadBook";
import BookDetail from "./pages/BookDetail";
import EditBook from "./pages/EditBook";  // <-- ⚡ ADD THIS

import { isAdmin } from "./utils/auth";

function Layout() {
  const location = useLocation();

  // Halaman yang tidak menampilkan Navbar & Footer
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Navbar />}

      <div style={{ minHeight: hideLayout ? "100vh" : "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* BOOK DETAIL */}
          <Route path="/book/:id" element={<BookDetail />} />

          {/* ADMIN ONLY */}
          <Route
            path="/upload"
            element={isAdmin() ? <UploadBook /> : <Login />}
          />

          {/* ⚡⚡ NEW ROUTE: EDIT BOOK (ADMIN ONLY) */}
          <Route
            path="/edit-book/:id"
            element={isAdmin() ? <EditBook /> : <Login />}
          />
        </Routes>
      </div>

      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
