"use client";
import { useState } from "react";
import { Dashboard } from "./dashboard/page";
import { StockManagement } from "./stockManagement/page";
import { InputPoints } from "./inputPoints/page";
import { AnnouncementsAdmin } from "./readAnnouncements/page";

const T = {
  bg: "#13111A",
  surf: "#1B1825",
  surf2: "#221F2E",
  surf3: "#2A2638",
  border: "rgba(255,255,255,.07)",
  border2: "rgba(255,255,255,.13)",
  txt: "#EDE8F5",
  muted: "rgba(237,232,245,.45)",
  muted2: "rgba(237,232,245,.22)",
  purple: "#8B7CC8",
  purpleL: "#A898E0",
  purpleP: "rgba(139,124,200,.12)",
  gold: "#C9962A",
  goldL: "#E8B84B",
  goldP: "rgba(201,150,42,.10)",
  terra: "#C4572A",
  sage: "#7A8C6E",
  blue: "#4A90D9",
};

type Section = "dashboard" | "stock" | "inputpts" | "announce";

export default function MitraAdminPortal() {
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: {
    id: Section;
    icon: string;
    label: string;
    badge?: number;
  }[] = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "stock", icon: "📦", label: "Kelola Stok" },
    { id: "inputpts", icon: "⭐", label: "Input Poin" },
    { id: "announce", icon: "📢", label: "Pengumuman", badge: 2 },
  ];

  const titles: Record<Section, string> = {
    dashboard: "Dashboard",
    stock: "Kelola Stok",
    inputpts: "Input Poin",
    announce: "Pengumuman",
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
            Dex<span style={{ color: T.purpleL }}>Home</span>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: T.purpleP,
              border: `1px solid rgba(139,124,200,.3)`,
              borderRadius: 5,
              padding: "2px 10px",
              marginTop: 5,
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: T.purpleL,
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              Mitra Admin
            </span>
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
              width: 38,
              height: 38,
              borderRadius: 9,
              background: `linear-gradient(135deg, ${T.purple}, #6B5AB8)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            🏢
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.txt }}>
              Homera Studio
            </div>
            <div
              style={{ fontSize: 10, color: T.muted, fontFamily: "monospace" }}
            >
              MTR-0001
            </div>
            <div
              style={{
                fontSize: 10,
                color: T.purpleL,
                fontWeight: 600,
                marginTop: 1,
              }}
            >
              Admin Mode
            </div>
          </div>
        </div>

        <nav style={{ padding: "12px 8px", flex: 1 }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: T.muted2,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              padding: "0 10px",
              margin: "10px 0 5px",
            }}
          >
            Manajemen
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
                background: active === item.id ? T.purpleP : "none",
                color: active === item.id ? T.purpleL : T.muted,
                fontWeight: active === item.id ? 600 : 500,
                border:
                  active === item.id
                    ? `1px solid rgba(139,124,200,.2)`
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
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
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
            Akun
          </div>
          {[
            ["👤", "Profil Admin"],
            ["📊", "Laporan"],
          ].map(([ico, lbl]) => (
            <button
              type="button"
              key={lbl}
              className="nav-item"
              style={{ color: T.muted }}
            >
              <span style={{ fontSize: 16, width: 18, textAlign: "center" }}>
                {ico}
              </span>
              {lbl}
            </button>
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
          background: `rgba(19,17,26,.95)`,
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
            fontSize: 16,
            color: T.txt,
          }}
        >
          ☰
        </button>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.txt }}>
            {titles[active]}
          </div>
          <div style={{ fontSize: 11, color: T.muted }}>
            Homera Studio · Admin Panel
          </div>
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
            style={{ background: T.surf2, border: `1px solid ${T.border2}` }}
          >
            <span style={{ color: T.muted, fontSize: 13 }}>🔍</span>
            <input
              placeholder="Cari order, produk..."
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
        </div>
      </header>

      <main className="portal-main" style={{ padding: "24px 28px" }}>
        {active === "dashboard" && <Dashboard />}
        {active === "stock" && <StockManagement />}
        {active === "inputpts" && <InputPoints />}
        {active === "announce" && <AnnouncementsAdmin />}
      </main>
    </div>
  );
}
