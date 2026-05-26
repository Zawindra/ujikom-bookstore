export default function Footer() {
  return (
    <footer style={{
      background: "#ffffff",
      borderTop: "1px solid #e6e9ef",
      padding: "28px",
      marginTop: 40
    }}>
      <div style={{ width: "90%", maxWidth: 1100, margin: "0 auto", color: "#6b7280" }}>
        © {new Date().getFullYear()} BookStore — SAS project
      </div>
    </footer>
  );
}
