"use client";
import { useEffect, useState } from "react";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { haversineKm } from "@/lib/geo";

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
};

type Showroom = {
  id: string;
  showroomName: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  logoUrl: string | null;
  _count: { products: number };
  distanceKm?: number;
};

export function Showroom() {
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("");
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<"idle" | "requesting" | "granted" | "denied">("idle");

  // fetch showrooms
  useEffect(() => {
    setLoading(true);
    const params = cityFilter ? `?city=${encodeURIComponent(cityFilter)}` : "";
    fetch(`/api/showrooms${params}`)
      .then((r) => r.json())
      .then(({ data }) => { if (data) setShowrooms(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [cityFilter]);

  // request geolocation once on mount
  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    setGeoStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoStatus("granted");
      },
      () => setGeoStatus("denied"),
      { timeout: 8000 },
    );
  }, []);

  // compute distance + sort when position or showrooms change
  const displayShowrooms = (() => {
    if (!userPos) return showrooms;
    return [...showrooms]
      .map((s) => ({
        ...s,
        distanceKm: haversineKm(userPos.lat, userPos.lng, s.latitude, s.longitude),
      }))
      .sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999));
  })();

  // unique cities for filter
  const cities = Array.from(new Set(showrooms.map((s) => s.city))).sort();

  function directionsUrl(s: Showroom) {
    return `https://maps.google.com/?q=${s.latitude},${s.longitude}`;
  }

  return (
    <div className="fade-up">
      <SectionHeader
        label="Lokasi"
        title="Peta & Showroom"
        action={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {geoStatus === "granted" && (
              <span style={{ fontSize: 11, color: T.sage }}>📍 Diurutkan dari lokasi Anda</span>
            )}
            {geoStatus === "denied" && (
              <span style={{ fontSize: 11, color: T.muted }}>Lokasi dinonaktifkan</span>
            )}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              style={{
                fontSize: 11, padding: "5px 10px",
                border: `1.5px solid ${T.border}`, borderRadius: 7,
                background: T.warm, color: T.brown, cursor: "pointer",
              }}
            >
              <option value="">🏙️ Semua Kota</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        }
      />

      {/* Map placeholder — pending map provider decision */}
      <Card style={{ overflow: "hidden", marginBottom: 20 }}>
        <div
          style={{
            height: 340,
            background: "linear-gradient(135deg, #D4E8D0 0%, #C8D8C4 40%, #D0E0CC 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ textAlign: "center", opacity: 0.6 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🗺️</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.brown }}>Peta Interaktif</div>
            <div style={{ fontSize: 12, color: T.muted }}>
              {displayShowrooms.length > 0
                ? `${displayShowrooms.length} showroom aktif ditemukan`
                : "Memuat showroom…"}
            </div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>
              Integrasi peta akan ditambahkan setelah provider dipilih
            </div>
          </div>

          {/* Mock pins for loaded showrooms */}
          {displayShowrooms.slice(0, 6).map((s, i) => {
            const positions = [["42%","30%"],["60%","50%"],["38%","65%"],["70%","35%"],["28%","45%"],["55%","70%"]];
            const [top, left] = positions[i] ?? ["50%","50%"];
            return (
              <div key={s.id} style={{ position: "absolute", top, left, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                <div
                  style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: i === 0 ? T.gold : T.brown,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, boxShadow: "0 4px 12px rgba(0,0,0,.2)", border: "2px solid #fff",
                  }}
                  title={s.showroomName}
                >
                  🏢
                </div>
                <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `8px solid ${i === 0 ? T.gold : T.brown}` }} />
              </div>
            );
          })}

          {/* Controls */}
          <div style={{ position: "absolute", bottom: 14, right: 14, display: "flex", flexDirection: "column", gap: 4 }}>
            {["+","−","📍"].map((c) => (
              <button type="button" key={c} style={{ width: 34, height: 34, background: "#fff", border: "none", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,.1)", fontSize: 14, cursor: "pointer" }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Showroom list */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} style={{ overflow: "hidden", opacity: 0.45 }}>
              <div style={{ height: 100, background: T.border }} />
              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ height: 12, background: T.border, borderRadius: 4, width: "60%" }} />
                <div style={{ height: 10, background: T.border, borderRadius: 4 }} />
                <div style={{ height: 10, background: T.border, borderRadius: 4, width: "40%" }} />
              </div>
            </Card>
          ))}
        </div>
      ) : displayShowrooms.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: T.muted, fontSize: 13 }}>
          Tidak ada showroom aktif{cityFilter ? ` di ${cityFilter}` : ""}.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {displayShowrooms.map((s, i) => (
            <Card
              key={s.id}
              style={{ overflow: "hidden", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; }}
            >
              {/* Header */}
              <div
                style={{
                  height: 100,
                  background: `linear-gradient(135deg, ${T.bg}, #E8D5B0)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 40, position: "relative",
                }}
              >
                {s.logoUrl
                  ? <img src={s.logoUrl} alt={s.showroomName} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                  : "🏢"}
                {i === 0 && userPos && (
                  <span style={{ position: "absolute", top: 8, left: 8, padding: "3px 8px", borderRadius: 100, background: T.gold, color: "#fff", fontSize: 9, fontWeight: 700 }}>
                    📍 Terdekat
                  </span>
                )}
              </div>

              <div style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.brown, flex: 1, marginRight: 8 }}>
                    {s.showroomName}
                  </div>
                  <div style={{ fontSize: 11, color: T.muted, flexShrink: 0 }}>
                    {s.distanceKm !== undefined ? `${s.distanceKm.toFixed(1)} km` : s.city}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: T.muted, display: "flex", alignItems: "center", gap: 3, marginBottom: 6 }}>
                  📍 {s.address} · {s.city}
                </div>
                <div style={{ fontSize: 11, color: T.muted, marginBottom: 10 }}>
                  🪑 {s._count.products} produk tersedia
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <a href={directionsUrl(s)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <Btn variant="primary" sm>🗺️ Rute</Btn>
                  </a>
                  <Btn variant="outline" sm>📞 Hubungi</Btn>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Showroom;
