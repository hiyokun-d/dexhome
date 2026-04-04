"use client";
import { useState } from "react";

const T = {
  bg: "#F7F3EE",
  warm: "#FDFAF5",
  card: "#fff",
  brown: "#2C1810",
  brown2: "#3D2318",
  gold: "#C9962A",
  goldL: "#E8B84B",
  goldP: "rgba(201,150,42,.10)",
  terra: "#C4572A",
  sage: "#7A8C6E",
  blue: "#4A90D9",
  muted: "#8A7F74",
  border: "#E2D8C8",
  border2: "#D4C8B4",
};

// ── Main Portal ────────────────────────────────────────────────────────
type Section = "announce" | "katalog" | "community";

export default function MitraPortal() {
  const [active, setActive] = useState<Section>("announce");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: {
    id: Section;
    icon: string;
    label: string;
    badge?: number;
  }[] = [
    { id: "announce", icon: "📢", label: "Pengumuman", badge: 3 },
    { id: "katalog", icon: "📦", label: "Katalog Saya" },
    { id: "community", icon: "💬", label: "Komunitas Mitra" },
  ];

  const titles: Record<Section, string> = {
    announce: "Pengumuman",
    katalog: "Katalog Saya",
    community: "Komunitas Mitra",
  };

  return (
    <div className="portal-shell" style={{ background: T.bg }}>
      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`portal-sidebar${sidebarOpen ? " open" : ""}`}
        style={{
          background: `linear-gradient(180deg, ${T.brown} 0%, #1A0E08 100%)`,
        }}
      >
        <div
          style={{
            padding: "22px 20px 16px",
            borderBottom: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Dex<span style={{ color: T.gold }}>Home</span>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              background: T.goldP,
              border: `1px solid rgba(201,150,42,.3)`,
              borderRadius: 5,
              padding: "2px 8px",
              marginTop: 5,
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: T.gold,
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              Mitra Portal
            </span>
          </div>
        </div>

        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,.07)",
            display: "flex",
            alignItems: "center",
            gap: 11,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: T.gold,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            🏢
          </div>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              Homera Studio
            </div>
            <div
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,.4)",
                fontFamily: "monospace",
              }}
            >
              MTR-0001
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 10,
                color: T.sage,
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: T.sage,
                  display: "inline-block",
                }}
              />
              Aktif & Verified
            </div>
          </div>
        </div>

        <nav style={{ padding: "12px 8px", flex: 1 }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: "rgba(255,255,255,.25)",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              padding: "0 10px",
              margin: "12px 0 5px",
            }}
          >
            Menu
          </div>
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setSidebarOpen(false);
              }}
              className="nav-item"
              style={{
                background: active === item.id ? T.gold : "none",
                color: active === item.id ? "#fff" : "rgba(255,255,255,.55)",
                fontWeight: active === item.id ? 700 : 500,
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  width: 18,
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </span>
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: "rgba(255,255,255,.25)",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              padding: "0 10px",
              margin: "14px 0 5px",
            }}
          >
            Akun
          </div>
          {[
            ["👤", "Profil Mitra"],
            ["📊", "Laporan Penjualan"],
            ["🎧", "Hubungi Admin"],
          ].map(([ico, lbl]) => (
            <button
              type="button"
              key={lbl}
              className="nav-item"
              style={{ color: "rgba(255,255,255,.45)" }}
            >
              <span style={{ fontSize: 16, width: 18, textAlign: "center" }}>
                {ico}
              </span>
              {lbl}
            </button>
          ))}
        </nav>

        <div
          style={{
            padding: "10px 8px",
            borderTop: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <button
            type="button"
            className="nav-item"
            style={{ color: "rgba(255,255,255,.45)" }}
          >
            <span style={{ fontSize: 16, width: 18, textAlign: "center" }}>
              🚪
            </span>
            Keluar
          </button>
        </div>
      </aside>

      {/* Topbar */}
      <header
        className="portal-topbar"
        style={{
          background: "rgba(253,250,245,.97)",
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
            fontSize: 17,
            color: T.brown,
          }}
        >
          ☰
        </button>
        <div
          style={{
            fontFamily: "var(--font-playfair, serif)",
            fontSize: 17,
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
            gap: 9,
          }}
        >
          <div
            className="search-bar"
            style={{ background: T.bg, border: `1.5px solid ${T.border}` }}
          >
            <span style={{ color: T.muted, fontSize: 13 }}>🔍</span>
            <input
              placeholder="Cari pengumuman, produk..."
              style={{ color: T.brown, fontSize: 12 }}
            />
          </div>
          <button
            type="button"
            className="icon-btn"
            style={{ background: T.bg, border: `1.5px solid ${T.border}` }}
          >
            🔔
            <div className="notif-dot" />
          </button>
        </div>
      </header>

      <main className="portal-main" style={{ padding: "26px 30px" }}>
        {active === "announce" && <Announcements />}
        {active === "katalog" && <KatalogMitra />}
        {active === "community" && <Community />}
      </main>
    </div>
  );
}
