"use client";

type Section = "dashboard" | "katalog" | "showroom" | "cs";

const T = {
  gold: "#C9962A",
};

const navItems: { id: Section; icon: string; label: string; badge?: number }[] =
  [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "katalog", icon: "🛍️", label: "Katalog" },
    { id: "showroom", icon: "🏬", label: "Showroom" },
    { id: "cs", icon: "💬", label: "Customer Service", badge: 2 },
  ];

const comingSoon = [
  { icon: "👤", label: "Profil Saya" },
  { icon: "📦", label: "Pesanan Saya" },
  { icon: "🛡️", label: "Garansi & Asuransi" },
  { icon: "❤️", label: "Wishlist" },
  { icon: "🎪", label: "Event" },
];

export function Sidebar({
  active,
  sidebarOpen,
  setActive,
  setSidebarOpen,
}: {
  active: Section;
  sidebarOpen: boolean;
  setActive: (s: Section) => void;
  setSidebarOpen: (v: boolean) => void;
}) {
  return (
    <aside
      className={`portal-sidebar${sidebarOpen ? " open" : ""}`}
      style={{ background: "#2C1810" }}
    >
      {/* Logo */}
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
            letterSpacing: "-.3px",
          }}
        >
          Dex<span style={{ color: T.gold }}>Home</span>
        </div>
        <div
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,.35)",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            marginTop: 2,
          }}
        >
          Customer Portal
        </div>
      </div>

      {/* User */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          display: "flex",
          alignItems: "center",
          gap: 12,
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
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          BS
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
            Budi Santoso
          </div>
          <div style={{ fontSize: 11, color: T.gold, fontWeight: 600 }}>
            👑 Gold Member
          </div>
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,.4)",
              marginTop: 1,
            }}
          >
            4.820 poin aktif
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px 10px", flex: 1 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "rgba(255,255,255,.28)",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            padding: "0 12px",
            margin: "12px 0 6px",
          }}
        >
          Menu Utama
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
              color: active === item.id ? "#fff" : "rgba(255,255,255,.6)",
              fontWeight: active === item.id ? 600 : 500,
            }}
          >
            <span
              style={{
                fontSize: 17,
                width: 20,
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
            fontSize: 10,
            fontWeight: 700,
            color: "rgba(255,255,255,.28)",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            padding: "0 12px",
            margin: "14px 0 6px",
          }}
        >
          Akun
        </div>
        {comingSoon.map((item) => (
          <button
            type="button"
            key={item.label}
            className="nav-item"
            style={{ color: "rgba(255,255,255,.5)" }}
          >
            <span
              style={{
                fontSize: 17,
                width: 20,
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div
        style={{
          padding: "10px",
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <button
          type="button"
          className="nav-item"
          style={{ color: "rgba(255,255,255,.5)" }}
        >
          <span style={{ fontSize: 17, width: 20, textAlign: "center" }}>
            🚪
          </span>
          Keluar
        </button>
      </div>
    </aside>
  );
}
