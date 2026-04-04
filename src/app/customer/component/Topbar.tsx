"use client";

type Section = "dashboard" | "katalog" | "showroom" | "cs";

const T = {
  bg: "#F5F0E8",
  brown: "#2C1810",
  muted: "#8A7F74",
  border: "#E2D8C8",
  char: "#1A1A1A",
};

const titles: Record<Section, string> = {
  dashboard: "Dashboard",
  katalog: "Katalog",
  showroom: "Showroom",
  cs: "Customer Service",
};

export function Topbar({
  active,
  setSidebarOpen,
}: {
  active: Section;
  setSidebarOpen: (v: boolean) => void;
}) {
  return (
    <header
      className="portal-topbar"
      style={{
        background: "rgba(253,250,245,.95)",
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <button
        type="button"
        className="ham-btn"
        onClick={() => setSidebarOpen(true)}
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "none",
          border: `1.5px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 18,
          color: T.brown,
        }}
      >
        ☰
      </button>
      <div
        style={{
          fontFamily: "var(--font-playfair, serif)",
          fontSize: 18,
          fontWeight: 700,
          color: T.brown,
        }}
      >
        {titles[active]}
      </div>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          className="search-bar"
          style={{ background: T.bg, border: `1.5px solid ${T.border}` }}
        >
          <span style={{ color: T.muted, fontSize: 14 }}>🔍</span>
          <input
            placeholder="Cari produk, pesanan..."
            style={{ color: T.char, fontSize: 13 }}
          />
        </div>
        <button
          type="button"
          className="icon-btn"
          style={{
            background: T.bg,
            border: `1.5px solid ${T.border}`,
            color: T.brown,
          }}
        >
          🔔
          <div className="notif-dot" />
        </button>
        <button
          type="button"
          className="icon-btn"
          style={{
            background: T.bg,
            border: `1.5px solid ${T.border}`,
            color: T.brown,
          }}
        >
          🛒
        </button>
      </div>
    </header>
  );
}
