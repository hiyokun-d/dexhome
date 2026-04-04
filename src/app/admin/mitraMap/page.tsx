import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";

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

export function MitraMap() {
  const cities = [
    { city: "Jakarta Selatan", count: 38, icon: "🏙️" },
    { city: "Jakarta Pusat", count: 24, icon: "🏢" },
    { city: "Bandung", count: 18, icon: "🌆" },
    { city: "Surabaya", count: 14, icon: "🏭" },
    { city: "Yogyakarta", count: 12, icon: "🏯" },
    { city: "Bali", count: 9, icon: "🏝️" },
    { city: "Semarang", count: 8, icon: "🌃" },
    { city: "Lainnya", count: 57, icon: "📍" },
  ];

  return (
    <div className="fade-up">
      <SectionHeader label="Lokasi" title="Peta Sebaran Mitra" />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 18 }}
      >
        {/* Map */}
        <Card style={{ overflow: "hidden" }}>
          <div
            style={{
              height: 480,
              background:
                "linear-gradient(135deg, #1A2A1A 0%, #0F1F0F 40%, #162016 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div style={{ textAlign: "center", opacity: 0.5 }}>
              <div style={{ fontSize: 56, marginBottom: 8 }}>🗺️</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.txt }}>
                Peta Interaktif Indonesia
              </div>
              <div style={{ fontSize: 12, color: T.muted }}>
                Mapbox / Google Maps akan diintegrasikan
              </div>
            </div>
            {/* Mock city pins */}
            {[
              ["35%", "52%", "🟡", "Jakarta", "62"],
              ["32%", "44%", "🟡", "Bandung", "18"],
              ["62%", "38%", "🟡", "Surabaya", "14"],
              ["33%", "30%", "🟡", "Semarang", "8"],
              ["36%", "42%", "⚪", "Yogyakarta", "12"],
              ["65%", "55%", "⚪", "Bali", "9"],
            ].map(([t, l, c, city, cnt]) => (
              <div
                key={city}
                style={{
                  position: "absolute",
                  top: t,
                  left: l,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: c === "🟡" ? T.gold : T.surf2,
                    border: "2px solid rgba(255,255,255,.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                    boxShadow: "0 3px 10px rgba(0,0,0,.4)",
                    cursor: "pointer",
                  }}
                >
                  {cnt}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,.7)",
                    marginTop: 3,
                    fontWeight: 600,
                  }}
                >
                  {city}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* City Breakdown */}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: T.muted,
              marginBottom: 12,
            }}
          >
            Sebaran per Kota
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cities.map((c) => (
              <Card
                key={c.city}
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ fontSize: 18, width: 28 }}>{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>
                    {c.city}
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: T.surf3,
                      borderRadius: 100,
                      marginTop: 6,
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(c.count / 180) * 100}%`,
                        background: T.gold,
                        borderRadius: 100,
                      }}
                    />
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: T.gold,
                    flexShrink: 0,
                  }}
                >
                  {c.count}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MitraMap;
