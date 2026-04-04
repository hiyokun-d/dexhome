import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";

const T = {
  bg: "#F5F0E8",
  warm: "#FDFAF5",
  card: "#fff",
  brown: "#2C1810",
  brown2: "#3D2318",
  gold: "#C9962A",
  goldL: "#E8B84B",
  goldP: "rgba(201,150,42,.10)",
  terra: "#C4572A",
  sage: "#7A8C6E",
  muted: "#8A7F74",
  border: "#E2D8C8",
  char: "#1A1A1A",
};

export function Showroom() {
  const showrooms = [
    {
      icon: "🏢",
      name: "Homera Studio — Kemang",
      loc: "Jl. Kemang Raya No. 24, Jakarta Selatan",
      dist: "1.2 km",
      status: "Buka",
      rating: "4.9",
      brands: ["Homera Studio", "LuxeLight"],
    },
    {
      icon: "🪵",
      name: "Woodcraft Co. — Cipete",
      loc: "Jl. Cipete Raya No. 88, Jakarta Selatan",
      dist: "2.4 km",
      status: "Buka",
      rating: "4.8",
      brands: ["Woodcraft", "Teak & Grain"],
    },
    {
      icon: "🍃",
      name: "Teak & Grain — Blok M",
      loc: "Jl. Sultan Hasanudin No. 12, Jakarta Selatan",
      dist: "3.1 km",
      status: "Buka",
      rating: "4.7",
      brands: ["Teak & Grain"],
    },
    {
      icon: "💡",
      name: "LuxeLight ID — Senopati",
      loc: "Jl. Senopati No. 45, Jakarta Selatan",
      dist: "3.8 km",
      status: "Tutup 21.00",
      rating: "4.6",
      brands: ["LuxeLight ID"],
    },
  ];

  return (
    <div className="fade-up">
      <SectionHeader
        label="Lokasi"
        title="Peta & Showroom"
        action={
          <Btn variant="primary" sm>
            📍 Filter Kota
          </Btn>
        }
      />

      {/* Map Placeholder */}
      <Card style={{ overflow: "hidden", marginBottom: 20 }}>
        <div
          style={{
            height: 380,
            background:
              "linear-gradient(135deg, #D4E8D0 0%, #C8D8C4 40%, #D0E0CC 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ textAlign: "center", opacity: 0.6 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🗺️</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.brown }}>
              Peta Interaktif
            </div>
            <div style={{ fontSize: 12, color: T.muted }}>
              Google Maps / Mapbox akan diintegrasikan di sini
            </div>
          </div>
          {/* Mock pins */}
          {[
            ["42%", "30%", "🏢"],
            ["60%", "50%", "🪵"],
            ["38%", "65%", "🍃"],
            ["70%", "35%", "💡"],
          ].map(([t, l, ico], i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: t,
                left: l,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: i === 0 ? T.gold : T.brown,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  boxShadow: "0 4px 12px rgba(0,0,0,.2)",
                  border: "2px solid #fff",
                }}
              >
                {ico}
              </div>
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: `8px solid ${i === 0 ? T.gold : T.brown}`,
                }}
              />
            </div>
          ))}
          {/* Map controls */}
          <div
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {["+", "−", "📍"].map((c) => (
              <button
                type="button"
                key={c}
                style={{
                  width: 34,
                  height: 34,
                  background: "#fff",
                  border: "none",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,.1)",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Showroom list */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
      >
        {showrooms.map((s) => (
          <Card
            key={s.name}
            style={{
              overflow: "hidden",
              cursor: "pointer",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "";
            }}
          >
            <div
              style={{
                height: 100,
                background: `linear-gradient(135deg, ${T.bg}, #E8D5B0)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                position: "relative",
              }}
            >
              {s.icon}
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  padding: "3px 10px",
                  borderRadius: 100,
                  background:
                    s.status === "Buka"
                      ? "rgba(122,140,110,.15)"
                      : "rgba(196,87,42,.11)",
                  color: s.status === "Buka" ? T.sage : T.terra,
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {s.status}
              </span>
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 4,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: T.brown }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 11, color: T.muted }}>
                  ⭐ {s.rating}
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: T.muted,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  marginBottom: 8,
                }}
              >
                📍 {s.loc} · {s.dist}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  marginBottom: 10,
                }}
              >
                {s.brands.map((b) => (
                  <span
                    key={b}
                    style={{
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: T.goldP,
                      color: T.gold,
                      fontSize: 10,
                      fontWeight: 600,
                      border: `1px solid ${T.gold}30`,
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn variant="primary" sm>
                  🗺️ Rute
                </Btn>
                <Btn variant="outline" sm>
                  📞 Hubungi
                </Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
