"use client";
import { useState } from "react";
import { Badge } from "@/components/Badge";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";

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

export function StockManagement() {
  const [stocks, setStocks] = useState([
    {
      icon: "🛋️",
      name: "Sofa Modular Scandinavian",
      sku: "HMS-SOFA-001",
      variants: "3 Dudukan, Krem",
      stock: 28,
      minStock: 10,
    },
    {
      icon: "🪑",
      name: "Kursi Makan Solid Oak",
      sku: "HMS-CHAIR-003",
      variants: "Natural Oak",
      stock: 4,
      minStock: 8,
    },
    {
      icon: "🛋️",
      name: "Sofa L-Shape Premium",
      sku: "HMS-SOFA-003",
      variants: "L-Shape, Abu",
      stock: 2,
      minStock: 5,
    },
    {
      icon: "🪞",
      name: "Cermin Dressing Brass",
      sku: "HMS-MIR-002",
      variants: "120cm, Brass",
      stock: 0,
      minStock: 3,
    },
    {
      icon: "💡",
      name: "Lampu Gantung Rattan",
      sku: "HMS-LMP-011",
      variants: "Natural",
      stock: 42,
      minStock: 15,
    },
    {
      icon: "🛏️",
      name: "Headboard Bouclé",
      sku: "HMS-BED-007",
      variants: "King, Cream",
      stock: 6,
      minStock: 4,
    },
  ]);

  const adjust = (idx: number, delta: number) => {
    setStocks((s) =>
      s.map((item, i) =>
        i === idx ? { ...item, stock: Math.max(0, item.stock + delta) } : item,
      ),
    );
  };

  return (
    <div className="fade-up">
      <SectionHeader
        label="Inventaris"
        title="Kelola Stok Showroom"
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="outline" sm>
              ⬇ Export CSV
            </Btn>
            <Btn variant="primary" sm>
              🔄 Sync Sistem
            </Btn>
          </div>
        }
      />

      {/* Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          { label: "Total SKU", value: "6", icon: "📦", accent: T.purple },
          { label: "Total Unit", value: "82", icon: "🔢", accent: T.gold },
          {
            label: "Stok Kritis (< min)",
            value: "3",
            icon: "⚠️",
            accent: T.terra,
          },
        ].map((s) => (
          <Card
            key={s.label}
            style={{
              padding: "14px 16px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: s.accent,
              }}
            />
            <div style={{ fontSize: 18, marginBottom: 6 }}>{s.icon}</div>
            <div
              style={{
                fontSize: 10,
                color: T.muted,
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: 2,
              }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.txt }}>
              {s.value}
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {[
                "Produk",
                "SKU",
                "Varian",
                "Stok Saat Ini",
                "Min. Stok",
                "Status",
                "Atur Stok",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "11px 16px",
                    textAlign: "left",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: T.muted2,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocks.map((item, idx) => {
              const critical = item.stock === 0 || item.stock < item.minStock;
              return (
                <tr
                  key={item.sku}
                  style={{
                    borderBottom: `1px solid ${T.border}`,
                    background: critical
                      ? "rgba(196,87,42,.03)"
                      : "transparent",
                  }}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          background: T.surf2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </div>
                      <span
                        style={{ fontSize: 12, fontWeight: 600, color: T.txt }}
                      >
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: 11,
                      color: T.muted,
                      fontFamily: "monospace",
                    }}
                  >
                    {item.sku}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: 11,
                      color: T.muted,
                    }}
                  >
                    {item.variants}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color:
                          item.stock === 0
                            ? T.terra
                            : item.stock < item.minStock
                              ? T.goldL
                              : T.sage,
                      }}
                    >
                      {item.stock}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: 12,
                      color: T.muted,
                    }}
                  >
                    {item.minStock}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <Badge
                      color={
                        item.stock === 0
                          ? "red"
                          : item.stock < item.minStock
                            ? "gold"
                            : "green"
                      }
                    >
                      {item.stock === 0
                        ? "❌ Habis"
                        : item.stock < item.minStock
                          ? "⚠️ Kritis"
                          : "✓ Aman"}
                    </Badge>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <button
                        type="button"
                        onClick={() => adjust(idx, -1)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: T.surf3,
                          border: `1px solid ${T.border2}`,
                          color: T.txt,
                          cursor: "pointer",
                          fontSize: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          width: 36,
                          textAlign: "center",
                          fontSize: 13,
                          fontWeight: 700,
                          color: T.txt,
                        }}
                      >
                        {item.stock}
                      </span>
                      <button
                        type="button"
                        onClick={() => adjust(idx, 1)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: T.surf3,
                          border: `1px solid ${T.border2}`,
                          color: T.txt,
                          cursor: "pointer",
                          fontSize: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default StockManagement;
