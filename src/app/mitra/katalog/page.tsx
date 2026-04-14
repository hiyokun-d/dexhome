"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/Badge";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";

const T = {
  bg: "#F7F3EE", warm: "#FDFAF5", card: "#fff",
  brown: "#2C1810", brown2: "#3D2318", gold: "#C9962A", goldL: "#E8B84B",
  goldP: "rgba(201,150,42,.10)", terra: "#C4572A", sage: "#7A8C6E",
  blue: "#4A90D9", muted: "#8A7F74", border: "#E2D8C8", border2: "#D4C8B4",
};

type Product = {
  id: string;
  sku: string;
  name: string;
  price: number;
  originalPrice: number | null;
  status: string;
  category: { name: string };
  images: { url: string }[];
  stockItems: { quantity: number; minQuantity: number }[];
  _count: { orderItems: number };
};

export function KatalogMitra({ mitraId }: { mitraId: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mitraId) return;
    setLoading(true);
    fetch(`/api/mitra/catalog?mitraId=${mitraId}`)
      .then((r) => r.json())
      .then(({ data }) => { if (data) setProducts(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [mitraId]);

  const totalStock = products.reduce((s, p) => s + (p.stockItems[0]?.quantity ?? 0), 0);
  const activeCount = products.filter((p) => p.status === "ACTIVE").length;
  const outOfStock = products.filter((p) => (p.stockItems[0]?.quantity ?? 0) === 0).length;

  function fmtRp(n: number) {
    return "Rp " + n.toLocaleString("id-ID");
  }

  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: 4 }}>
            Produk Saya
          </div>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 22, fontWeight: 700, color: T.brown }}>
            Katalog Showroom
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="outline" sm>⬇ Export</Btn>
          <Btn variant="primary" sm>+ Ajukan Produk</Btn>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Total Produk", value: loading ? "–" : String(products.length), icon: "📦", accent: T.gold },
          { label: "Produk Aktif", value: loading ? "–" : String(activeCount), icon: "✅", accent: T.sage },
          { label: "Stok Habis", value: loading ? "–" : String(outOfStock), icon: "⚠️", accent: T.terra },
          { label: "Total Stok", value: loading ? "–" : String(totalStock), icon: "📊", accent: T.blue },
        ].map((s) => (
          <Card key={s.label} style={{ padding: "14px 16px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.accent }} />
            <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: T.brown }}>{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <Card style={{ overflow: "hidden" }}>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ height: 40, background: T.border, borderRadius: 6, opacity: 0.4 }} />
            ))}
          </div>
        </Card>
      ) : products.length === 0 ? (
        <Card style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📦</div>
          <div style={{ fontSize: 13, color: T.muted }}>Belum ada produk di katalog Anda.</div>
        </Card>
      ) : (
        <Card style={{ overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {["Produk", "SKU", "Kategori", "Harga", "Stok", "Status", "Aksi"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10,
                    fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const stock = p.stockItems[0]?.quantity ?? 0;
                const minStock = p.stockItems[0]?.minQuantity ?? 5;
                const imgUrl = p.images[0]?.url;
                return (
                  <tr key={p.sku} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: T.bg,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 16, flexShrink: 0, overflow: "hidden" }}>
                          {imgUrl
                            ? <img src={imgUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : "🪑"}
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: T.brown }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 11, color: T.muted, fontFamily: "monospace" }}>{p.sku}</td>
                    <td style={{ padding: "12px 16px", fontSize: 11, color: T.muted }}>{p.category.name}</td>
                    <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: T.brown }}>
                      {fmtRp(p.price)}
                      {p.originalPrice && p.originalPrice > p.price && (
                        <div style={{ fontSize: 10, color: T.muted, textDecoration: "line-through" }}>{fmtRp(p.originalPrice)}</div>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 13, fontWeight: 700,
                        color: stock === 0 ? T.terra : stock <= minStock ? "#E8A020" : T.sage }}>
                        {stock}
                      </span>
                      {stock === 0 && <Badge color="red">Habis</Badge>}
                      {stock > 0 && stock <= minStock && (
                        <span style={{ fontSize: 10, color: "#E8A020", marginLeft: 6 }}>⚠️ Menipis</span>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <Badge color={p.status === "ACTIVE" ? "green" : p.status === "DRAFT" ? "grey" : "gold"}>
                        {p.status === "ACTIVE" ? "● Aktif" : p.status === "DRAFT" ? "○ Draft" : p.status}
                      </Badge>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Btn variant="outline" sm>Edit</Btn>
                        <Btn variant="outline" sm>Stok</Btn>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

export default KatalogMitra;
