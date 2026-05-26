// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { saveAuth } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      saveAuth(res.data.token, res.data.user);

      // SWEET ALERT SUCCESS
      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${res.data.user.username}!`,
        confirmButtonColor: "#0b63a8",
      });

      navigate("/");
    } catch (err) {
      // SWEET ALERT ERROR
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Incorrect email or password",
        confirmButtonColor: "#d9534f",
      });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(135deg, #0b63a8, #e8f3ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "white",
          padding: "35px 40px",
          borderRadius: 14,
          boxShadow: "0 8px 35px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 25,
            fontSize: 28,
            color: "#0b63a8",
            fontWeight: 700,
          }}
        >
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          {/* Password + Toggle */}
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ ...inputStyle, width: "100%" }}
            />

            <span
              onClick={() => setShowPass(!showPass)}
              style={eyeStyle}
            >
              <i
                className={
                  showPass ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                }
              ></i>
            </span>
          </div>

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 15, color: "#555" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#0b63a8", fontWeight: 600 }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "14px 16px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  fontSize: 15,
  outline: "none",
};

const buttonStyle = {
  padding: "14px 0",
  background: "#0b63a8",
  color: "#fff",
  borderRadius: 10,
  fontSize: 16,
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
};

const eyeStyle = {
  position: "absolute",
  right: 14,
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: 20,
};
