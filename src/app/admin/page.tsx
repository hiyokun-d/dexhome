"use client";
import { useState } from "react";

const T = {
  bg: "#0F0F12",
  surf: "#18181D",
  surf2: "#1E1E25",
  surf3: "#24242C",
  border: "rgba(255,255,255,.07)",
  border2: "rgba(255,255,255,.12)",
  txt: "#F0EDE8",
  muted: "rgba(240,237,232,.45)",
  muted2: "rgba(240,237,232,.25)",
  gold: "#C9962A",
  goldL: "#E8B84B",
  goldP: "rgba(201,150,42,.12)",
  terra: "#C4572A",
  sage: "#7A8C6E",
  blue: "#4A90D9",
  purple: "#8B7CC8",
};

// ── Main Portal ────────────────────────────────────────────────────────
type Section =
  | "overview"
  | "addprod"
  | "prodlist"
  | "mitra"
  | "announce"
  | "cs"
  | "map";

export default function AdminPortal() {
  const [active, setActive] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navGroups = [
    {
      label: "Platform",
      items: [{ id: "overview" as Section, icon: "📊", label: "Overview" }],
    },
    {
      label: "Produk",
      items: [
        { id: "addprod" as Section, icon: "➕", label: "Tambah Produk" },
        { id: "prodlist" as Section, icon: "📋", label: "Daftar Produk" },
      ],
    },
    {
      label: "Mitra & Komunikasi",
      items: [
        { id: "mitra" as Section, icon: "🏬", label: "Kelola Mitra" },
        { id: "announce" as Section, icon: "📢", label: "Pengumuman" },
        { id: "map" as Section, icon: "🗺️", label: "Peta Mitra" },
      ],
    },
    {
      label: "Customer",
      items: [
        { id: "cs" as Section, icon: "🎧", label: "CS Admin", badge: 47 },
      ],
    },
  ];

  const titles: Record<Section, string> = {
    overview: "Overview",
    addprod: "Tambah Produk",
    prodlist: "Daftar Produk",
    mitra: "Kelola Mitra",
    announce: "Pengumuman",
    cs: "CS Admin",
    map: "Peta Mitra",
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
        style={{ background: T.surf, borderRight: `1px solid ${T.border}` }}
      >
        <div
          style={{
            padding: "22px 20px 16px",
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: 22,
              fontWeight: 700,
              color: T.txt,
            }}
          >
            Dex<span style={{ color: T.gold }}>Home</span>
          </div>
          <div
            style={{
              fontSize: 9,
              color: T.muted,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            Center Admin
          </div>
        </div>

        <div
          style={{
            padding: "14px 18px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              background: `linear-gradient(135deg, ${T.gold}, ${T.terra})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            SA
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>
              Super Admin
            </div>
            <div style={{ fontSize: 10, color: T.gold, fontWeight: 600 }}>
              Center Admin
            </div>
          </div>
        </div>

        <nav style={{ padding: "12px 8px", flex: 1, overflow: "auto" }}>
          {navGroups.map((group) => (
            <div key={group.label}>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: T.muted2,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  padding: "0 10px",
                  margin: "12px 0 5px",
                }}
              >
                {group.label}
              </div>
              {group.items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    setActive(item.id);
                    setSidebarOpen(false);
                  }}
                  className="nav-item"
                  style={{
                    background: active === item.id ? T.goldP : "none",
                    color: active === item.id ? T.gold : T.muted,
                    fontWeight: active === item.id ? 600 : 500,
                    border:
                      active === item.id
                        ? `1px solid rgba(201,150,42,.2)`
                        : "1px solid transparent",
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
                  {"badge" in item && item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div
          style={{ padding: "10px 8px", borderTop: `1px solid ${T.border}` }}
        >
          <button type="button" className="nav-item" style={{ color: T.muted }}>
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
          background: `rgba(15,15,18,.95)`,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <button
          type="button"
          className="ham-btn"
          onClick={() => setSidebarOpen(true)}
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: "none",
            border: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 17,
            color: T.txt,
          }}
        >
          ☰
        </button>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: T.txt }}>
            {titles[active]}
          </div>
          <div style={{ fontSize: 11, color: T.muted }}>
            DexHome Admin <span style={{ color: T.muted2 }}>/</span>{" "}
            {titles[active]}
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            className="search-bar"
            style={{ background: T.surf2, border: `1px solid ${T.border2}` }}
          >
            <span style={{ color: T.muted, fontSize: 13 }}>🔍</span>
            <input
              placeholder="Cari produk, mitra..."
              style={{ color: T.txt, fontSize: 12 }}
            />
          </div>
          <button
            type="button"
            className="icon-btn"
            style={{
              background: T.surf2,
              border: `1px solid ${T.border}`,
              color: T.txt,
            }}
          >
            🔔
            <div className="notif-dot" />
          </button>
          <button
            type="button"
            className="icon-btn"
            style={{
              background: T.surf2,
              border: `1px solid ${T.border}`,
              color: T.txt,
            }}
          >
            📋
          </button>
          <Btn variant="primary" sm onClick={() => setActive("addprod")}>
            + Produk Baru
          </Btn>
        </div>
      </header>

      <main className="portal-main" style={{ padding: "24px 28px" }}>
        {active === "overview" && <Overview />}
        {active === "addprod" && <AddProduct />}
        {active === "prodlist" && <ProductList />}
        {active === "mitra" && <MitraManagement />}
        {active === "announce" && <SendAnnouncement />}
        {active === "cs" && <CSAdmin />}
        {active === "map" && <MitraMap />}
      </main>
    </div>
  );
}
