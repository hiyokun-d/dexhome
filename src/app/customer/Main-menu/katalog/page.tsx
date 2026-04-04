"use client";
import { useState } from "react";
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

export function Katalog() {
  const [activeChip, setActiveChip] = useState("Semua");
  const chips = [
    "Semua",
    "🛋️ Ruang Tamu",
    "🛏️ Kamar Tidur",
    "🍽️ Ruang Makan",
    "💡 Dekorasi",
    "🪴 Outdoor",
    "⭐ Rating Tinggi",
    "🏷️ Promo",
  ];

  const products = [
    {
      icon: "🛋️",
      name: "Sofa Modular Scandinavian",
      brand: "Homera Studio",
      price: "Rp 8.500.000",
      orig: "Rp 10.000.000",
      pts: "+850",
      rating: "4.9",
      reviews: "128",
      badge: "🏷️ Promo",
    },
    {
      icon: "🛏️",
      name: "Ranjang Platform Oak",
      brand: "Woodcraft Co.",
      price: "Rp 12.200.000",
      orig: null,
      pts: "+1.220",
      rating: "4.8",
      reviews: "84",
      badge: null,
    },
    {
      icon: "💡",
      name: "Lampu Rattan Wabi-Sabi",
      brand: "LuxeLight ID",
      price: "Rp 1.250.000",
      orig: "Rp 1.600.000",
      pts: "+125",
      rating: "4.7",
      reviews: "256",
      badge: "🏷️ Promo",
    },
    {
      icon: "🍽️",
      name: "Meja Makan Jati Solid",
      brand: "Teak & Grain",
      price: "Rp 5.800.000",
      orig: null,
      pts: "+580",
      rating: "4.9",
      reviews: "62",
      badge: null,
    },
    {
      icon: "🪞",
      name: "Cermin Arch Brass",
      brand: "MirrorMade",
      price: "Rp 2.100.000",
      orig: null,
      pts: "+210",
      rating: "4.6",
      reviews: "41",
      badge: null,
    },
    {
      icon: "🪴",
      name: "Pot Terracotta Minimalis",
      brand: "Greenspace",
      price: "Rp 380.000",
      orig: "Rp 450.000",
      pts: "+38",
      rating: "4.8",
      reviews: "310",
      badge: "🏷️ Promo",
    },
  ];

  return (
    <div className="fade-up">
      <SectionHeader
        label="Produk"
        title="Katalog Lengkap"
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="outline" sm>
              ⊞ Grid
            </Btn>
            <Btn variant="primary" sm>
              🗺️ Lihat Peta
            </Btn>
          </div>
        }
      />

      {/* Location Banner */}
      <div
        style={{
          background: `linear-gradient(135deg, ${T.brown}, ${T.brown2})`,
          borderRadius: 14,
          padding: "16px 22px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -20,
            top: -20,
            width: 120,
            height: 120,
            background:
              "radial-gradient(circle,rgba(201,150,42,.15),transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 11,
            background: T.gold,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            flexShrink: 0,
          }}
        >
          📍
        </div>
        <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
            Menampilkan mitra terdekat dari lokasi Anda
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,.5)",
              marginTop: 2,
            }}
          >
            Produk diurutkan dari showroom terdekat untuk estimasi pengiriman
            terbaik
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>
            🏬 4 showroom dalam 5km
          </div>
          <Btn variant="gold" sm>
            📍 Jakarta Selatan ▾
          </Btn>
        </div>
      </div>

      {/* Chips */}
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}
      >
        {chips.map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => setActiveChip(c)}
            style={{
              padding: "6px 16px",
              borderRadius: 100,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all .2s",
              border: `1.5px solid ${activeChip === c ? T.brown : T.border}`,
              background: activeChip === c ? T.brown : T.card,
              color: activeChip === c ? "#fff" : T.muted,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}
      >
        {/* Filter Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              title: "Kategori",
              items: [
                "Semua (124)",
                "Ruang Tamu (38)",
                "Kamar Tidur (29)",
                "Ruang Makan (21)",
                "Dekorasi & Lampu (36)",
              ],
            },
            {
              title: "Brand Mitra",
              items: [
                "Homera Studio (18)",
                "Woodcraft Co. (14)",
                "Teak & Grain (11)",
                "LuxeLight ID (22)",
                "MirrorMade (9)",
              ],
            },
          ].map((panel) => (
            <Card key={panel.title} style={{ padding: "14px 16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: T.brown }}>
                  {panel.title}
                </div>
                <button
                  type="button"
                  style={{
                    fontSize: 10,
                    color: T.muted,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
              </div>
              {panel.items.map((item, i) => (
                <label
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    marginBottom: 8,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      border: `1.5px solid ${i === 0 ? T.gold : T.border}`,
                      background: i === 0 ? T.gold : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      flexShrink: 0,
                      color: "#fff",
                    }}
                  >
                    {i === 0 ? "✓" : ""}
                  </div>
                  <span style={{ fontSize: 12, color: T.brown, flex: 1 }}>
                    {item.split(" (")[0]}
                  </span>
                  <span style={{ fontSize: 10, color: T.muted }}>
                    ({item.split("(")[1]?.replace(")", "")})
                  </span>
                </label>
              ))}
            </Card>
          ))}
          <Card style={{ padding: "14px 16px" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.brown,
                marginBottom: 10,
              }}
            >
              Harga
            </div>
            <div
              style={{
                display: "flex",
                gap: 6,
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <input
                defaultValue="500.000"
                style={{
                  flex: 1,
                  padding: "7px 10px",
                  border: `1.5px solid ${T.border}`,
                  borderRadius: 7,
                  fontSize: 11,
                  outline: "none",
                }}
                placeholder="Min"
              />
              <span style={{ color: T.muted, fontSize: 12 }}>—</span>
              <input
                defaultValue="20.000.000"
                style={{
                  flex: 1,
                  padding: "7px 10px",
                  border: `1.5px solid ${T.border}`,
                  borderRadius: 7,
                  fontSize: 11,
                  outline: "none",
                }}
                placeholder="Max"
              />
            </div>
            <Btn variant="primary" sm>
              Terapkan
            </Btn>
          </Card>
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {products.map((p) => (
            <Card
              key={p.name}
              style={{
                overflow: "hidden",
                cursor: "pointer",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-2px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 12px 40px rgba(44,24,16,.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
              }}
            >
              <div
                style={{
                  height: 160,
                  background: `linear-gradient(135deg, ${T.bg}, #E8D5B0)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 56,
                  position: "relative",
                }}
              >
                {p.icon}
                {p.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      padding: "2px 8px",
                      borderRadius: 100,
                      background: T.terra,
                      color: "#fff",
                      fontSize: 9,
                      fontWeight: 700,
                    }}
                  >
                    {p.badge}
                  </span>
                )}
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,.9)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  ♡
                </button>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <div style={{ fontSize: 11, color: T.muted }}>{p.brand}</div>
                  <div
                    style={{
                      fontSize: 11,
                      color: T.muted,
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    ⭐ {p.rating}{" "}
                    <span style={{ color: T.border }}>({p.reviews})</span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.brown,
                    marginBottom: 8,
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 15, fontWeight: 700, color: T.brown }}
                    >
                      {p.price}
                    </div>
                    {p.orig && (
                      <div
                        style={{
                          fontSize: 11,
                          color: T.muted,
                          textDecoration: "line-through",
                        }}
                      >
                        {p.orig}
                      </div>
                    )}
                    <div
                      style={{ fontSize: 10, color: T.sage, fontWeight: 600 }}
                    >
                      +{p.pts.replace("+", "")} poin
                    </div>
                  </div>
                  <Btn variant="primary" sm>
                    + Keranjang
                  </Btn>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
