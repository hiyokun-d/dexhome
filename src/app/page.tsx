import Link from "next/link";

const portals = [
  {
    href: "/customer",
    icon: "👤",
    role: "Customer",
    label: "Customer Portal",
    desc: "Belanja furnitur, lacak pesanan, tukar poin, & hubungi CS",
    accent: "#C9962A",
    bg: "#2C1810",
    tags: ["Katalog", "Showroom", "Poin & Voucher", "Customer Service"],
  },
  {
    href: "/mitra",
    icon: "🏬",
    role: "Mitra Showroom",
    label: "Mitra Portal",
    desc: "Kelola showroom, pantau pengumuman platform, & terhubung dengan sesama mitra",
    accent: "#C9962A",
    bg: "#2C1810",
    tags: ["Pengumuman", "Katalog Saya", "Komunitas Mitra"],
  },
  {
    href: "/mitra/admin",
    icon: "⚙️",
    role: "Mitra Admin",
    label: "Mitra Admin Panel",
    desc: "Kelola stok showroom, input poin customer, & monitoring penjualan",
    accent: "#A898E0",
    bg: "#1B1825",
    tags: ["Dashboard", "Kelola Stok", "Input Poin", "Pengumuman"],
    dark: true,
  },
  {
    href: "/admin",
    icon: "🏛️",
    role: "Center Admin",
    label: "Admin Pusat",
    desc: "Kelola seluruh platform: produk, mitra, CS, analytics & pengumuman",
    accent: "#C9962A",
    bg: "#18181D",
    tags: ["Overview", "Produk", "Mitra", "CS Admin", "Komunitas"],
    dark: true,
  },
];

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1A0E08 0%, #2C1810 50%, #1A0E08 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1
          style={{
            fontFamily: "var(--font-playfair, serif)",
            fontSize: "48px",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-1px",
            marginBottom: "8px",
          }}
        >
          Dex<span style={{ color: "#C9962A" }}>Home</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,.45)", fontSize: "15px" }}>
          Platform Furnitur Premium Indonesia · Pilih portal Anda
        </p>
      </div>

      {/* Portal Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        {portals.map((p) => (
          <Link key={p.href} href={p.href} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: p.bg,
                border: `1px solid ${p.dark ? "rgba(255,255,255,.1)" : "rgba(201,150,42,.2)"}`,
                borderRadius: "16px",
                padding: "28px 26px",
                cursor: "pointer",
                transition: "transform .25s, box-shadow .25s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "140px",
                  height: "140px",
                  background: `radial-gradient(circle, ${p.accent}30, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Icon + Role */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `${p.accent}20`,
                    border: `1px solid ${p.accent}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: p.accent,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      marginBottom: "2px",
                    }}
                  >
                    {p.role}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair, serif)",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {p.label}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,.5)",
                  lineHeight: 1.6,
                  marginBottom: "18px",
                }}
              >
                {p.desc}
              </p>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginBottom: "20px",
                }}
              >
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "3px 10px",
                      borderRadius: "100px",
                      background: `${p.accent}15`,
                      border: `1px solid ${p.accent}30`,
                      color: p.accent,
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: p.accent,
                  }}
                >
                  Masuk ke Portal →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p
        style={{
          color: "rgba(255,255,255,.2)",
          fontSize: "11px",
          marginTop: "40px",
        }}
      >
        DexHome Platform · Prototype UI — Maret 2026
      </p>
    </main>
  );
}
