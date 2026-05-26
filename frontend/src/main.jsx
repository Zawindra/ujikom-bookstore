import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

/* ===== GLOBAL RESET (FINAL VERSION) ===== */
const globalStyle = document.createElement("style");
globalStyle.innerHTML = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: #f7f8fb;
  }

  a {
    text-decoration: none !important;
    color: inherit;
  }
`;
document.head.appendChild(globalStyle);
/* ==== END GLOBAL RESET ==== */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
