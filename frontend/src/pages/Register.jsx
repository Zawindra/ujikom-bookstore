import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/auth/register", {
        fullname,
        username, // ← DITAMBAHKAN
        email,
        password,
      });

      alert("Register success!");
      navigate("/login");
    } catch (err) {
      alert("Register failed!");
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
          maxWidth: 450,
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
          Create Account
        </h2>

        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          {/* PASSWORD */}
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ ...inputStyle, width: "100%" }}
            />

            <span onClick={() => setShowPass(!showPass)} style={eyeStyle}>
              <i
                className={
                  showPass ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                }
              ></i>
            </span>
          </div>

          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 15, color: "#555" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#0b63a8", fontWeight: 600 }}>
            Login
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
