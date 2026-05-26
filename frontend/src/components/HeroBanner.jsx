export default function HeroBanner() {
  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #0b63a8 0%, #61b2ff 100%)",
        padding: "60px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          color: "white",
        }}
      >
        {/* TEXT */}
        <div style={{ maxWidth: 520 }}>
          <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 15 }}>
            Temukan Buku Favoritmu Hari Ini 📚
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.5, opacity: 0.9 }}>
            Jelajahi koleksi buku terbaik, mulai dari novel, fiksi, hingga
            buku pengetahuan. Semuanya tersedia di satu tempat.
          </p>

          <a
            href="#book-list"
            style={{
              marginTop: 25,
              display: "inline-block",
              padding: "14px 26px",
              borderRadius: 10,
              background: "white",
              color: "#0b63a8",
              fontWeight: 700,
              fontSize: 18,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "0.2s",
            }}
          >
            Mulai Jelajah
          </a>
        </div>

        {/* IMAGE */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/2991/2991129.png"
          alt="Books"
          style={{
            width: 300,
            marginTop: 20,
            filter: "drop-shadow(0 8px 15px rgba(0,0,0,0.25))",
          }}
        />
      </div>
    </div>
  );
}
