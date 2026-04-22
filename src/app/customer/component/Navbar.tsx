"use client";

type Section = "dashboard" | "katalog" | "showroom" | "cs";

const NAV: { id: Section; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "katalog", label: "Katalog" },
  { id: "showroom", label: "Showroom" },
  { id: "cs", label: "Customer Service" },
];

const TIER_COLOR: Record<string, string> = {
  BRONZE: "#CD7F32",
  SILVER: "#718096",
  GOLD: "#C9962A",
  PLATINUM: "#4A5568",
};

interface Props {
  active: Section;
  setActive: (s: Section) => void;
  userName?: string;
  tier?: string;
}

export function Navbar({ active, setActive, userName, tier }: Props) {
  const initials = userName
    ? userName.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";
  const tierColor = tier ? (TIER_COLOR[tier] ?? "#C9962A") : "#C9962A";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 300,
        background: "#fff",
        borderBottom: "1px solid #E2D8C8",
        height: 64,
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        gap: 0,
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: "var(--font-playfair, serif)",
          fontSize: 22,
          fontWeight: 700,
          color: "#2C1810",
          letterSpacing: "-.3px",
          flexShrink: 0,
          marginRight: 32,
          lineHeight: 1,
        }}
      >
        Dex<span style={{ color: "#C9962A" }}>Home</span>
      </span>

      {/* Nav pills */}
      <nav style={{ display: "flex", gap: 2, flex: 1 }}>
        {NAV.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                background: isActive ? "#FDF5E0" : "transparent",
                color: isActive ? "#2C1810" : "#8A7F74",
                transition: "all .15s",
                fontFamily: "inherit",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right: notification + user chip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          className="icon-btn"
          style={{
            background: "#F5F0E8",
            border: "1.5px solid #E2D8C8",
            color: "#2C1810",
          }}
        >
          🔔
          <div className="notif-dot" />
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "5px 12px 5px 5px",
            borderRadius: 10,
            border: "1.5px solid #E2D8C8",
            background: "#F5F0E8",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: tierColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#2C1810",
                lineHeight: 1.3,
              }}
            >
              {userName ?? "—"}
            </div>
            <div
              style={{
                fontSize: 11,
                color: tierColor,
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {tier ?? "Silver"} Member
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
