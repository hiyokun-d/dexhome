"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/Badge";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";

const T = {
  bg: "#13111A", surf: "#1B1825", surf2: "#221F2E", surf3: "#2A2638",
  border: "rgba(255,255,255,.07)", border2: "rgba(255,255,255,.13)",
  txt: "#EDE8F5", muted: "rgba(237,232,245,.45)", muted2: "rgba(237,232,245,.22)",
  purple: "#8B7CC8", purpleL: "#A898E0", purpleP: "rgba(139,124,200,.12)",
  gold: "#C9962A", goldL: "#E8B84B", goldP: "rgba(201,150,42,.10)",
  terra: "#C4572A", sage: "#7A8C6E", blue: "#4A90D9",
};

type StockAlert = { quantity: number; minQuantity: number; product: { id: string; name: string; sku: string } };
type RecentOrder = {
  id: string; orderNumber: string; totalAmount: number; status: string; createdAt: string;
  customer: { fullName: string };
  items: { product: { name: string }; quantity: number; unitPrice: number }[];
};
type DashData = {
  gmv: number; totalOrders: number; avgRating: number; reviewCount: number;
  todayPointInputs: number; stockAlerts: StockAlert[]; recentOrders: RecentOrder[];
};

const statusMap: Record<string, { color: "pur" | "gold" | "blue" | "green" | "red" | "grey"; label: string }> = {
  PENDING:    { color: "grey",  label: "⏳ Pending" },
  PROCESSING: { color: "gold",  label: "🔄 Proses" },
  SHIPPED:    { color: "blue",  label: "🚚 Dikirim" },
  DELIVERED:  { color: "pur",   label: "📦 Tiba" },
  COMPLETED:  { color: "green", label: "✓ Selesai" },
  CANCELLED:  { color: "red",   label: "✕ Batal" },
};

function fmtRp(n: number) {
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`;
  return "Rp " + n.toLocaleString("id-ID");
}

export function Dashboard({ mitraId }: { mitraId: string }) {
  const [data, setData] = useState<DashData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (!mitraId) return;
    setLoading(true);
    fetch(`/api/mitra/admin/dashboard?mitraId=${mitraId}&days=${days}`)
      .then((r) => r.json())
      .then(({ data: d }) => { if (d) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [mitraId, days]);

  const kpis = data ? [
    { icon: "💰", label: "GMV Periode Ini", value: fmtRp(data.gmv),
      sub: `${data.totalOrders} total order`, accent: T.purple },
    { icon: "🛍️", label: "Total Order", value: String(data.totalOrders),
      sub: `${days} hari terakhir`, accent: T.gold },
    { icon: "📦", label: "Stok Kritis", value: String(data.stockAlerts.length),
      sub: data.stockAlerts.length > 0 ? "Perlu restock segera" : "Semua stok aman", accent: T.terra },
    { icon: "⭐", label: "Rating Toko", value: data.avgRating ? data.avgRating.toFixed(1) : "–",
      sub: `${data.reviewCount} ulasan`, accent: T.sage },
  ] : [];

  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
            color: T.purpleL, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ width: 16, height: 2, background: T.purpleL, display: "inline-block" }} />
            Dashboard
          </div>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 20, fontWeight: 700, color: T.txt }}>
            Dashboard Mitra Admin
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            style={{ padding: "6px 12px", borderRadius: 8, background: T.surf2,
              border: `1px solid ${T.border2}`, color: T.txt, fontSize: 11, outline: "none", cursor: "pointer" }}
          >
            <option value={7}>7 Hari</option>
            <option value={30}>30 Hari Terakhir</option>
            <option value={90}>3 Bulan</option>
          </select>
          <Btn variant="outline" sm>⬇ Export</Btn>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {loading
          ? [1, 2, 3, 4].map((i) => (
            <div key={i} style={{ background: T.surf, borderRadius: 12, padding: "16px 18px",
              border: `1px solid ${T.border}`, opacity: 0.4, height: 100 }} />
          ))
          : kpis.map((k) => (
            <div key={k.label} style={{ background: T.surf, borderRadius: 12, padding: "16px 18px",
              border: `1px solid ${T.border}`, position: "relative", overflow: "hidden",
              transition: "transform .2s, box-shadow .2s", cursor: "default" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 48px rgba(0,0,0,.45)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: k.accent }} />
              <div style={{ fontSize: 22, marginBottom: 8 }}>{k.icon}</div>
              <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 4 }}>{k.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: T.txt, marginBottom: 5 }}>{k.value}</div>
              <div style={{ fontSize: 11, color: T.muted }}>{k.sub}</div>
            </div>
          ))}
      </div>

      {/* Recent Orders */}
      <Card style={{ overflow: "hidden", marginBottom: 18 }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.txt }}>Order Terbaru</div>
          <Btn variant="outline" sm>Lihat Semua</Btn>
        </div>
        {loading ? (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            {[1, 2, 3].map((i) => <div key={i} style={{ height: 36, background: T.surf2, borderRadius: 6, opacity: 0.4 }} />)}
          </div>
        ) : !data || data.recentOrders.length === 0 ? (
          <div style={{ padding: 24, textAlign: "center", fontSize: 13, color: T.muted }}>Belum ada order.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {["Order ID", "Produk", "Customer", "Waktu", "Jumlah", "Status"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10,
                    fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted2 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((o) => {
                const sm = statusMap[o.status] ?? { color: "grey" as const, label: o.status };
                return (
                  <tr key={o.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <td style={{ padding: "12px 16px", fontSize: 11, color: T.muted, fontFamily: "monospace" }}>
                      {o.orderNumber}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: T.txt }}>
                      {o.items[0]?.product.name ?? "–"}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 12, color: T.muted }}>{o.customer.fullName}</td>
                    <td style={{ padding: "12px 16px", fontSize: 11, color: T.muted }}>
                      {new Date(o.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 700, color: T.gold }}>
                      {fmtRp(o.totalAmount)}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <Badge color={sm.color}>{sm.label}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>

      {/* Stock Alerts */}
      {data && data.stockAlerts.length > 0 && (
        <Card style={{ padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.txt, marginBottom: 14 }}>⚠️ Peringatan Stok</div>
          {data.stockAlerts.map((item) => (
            <div key={item.product.id} style={{ display: "flex", alignItems: "center", gap: 12,
              padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: T.surf2,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                📦
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>{item.product.name}</div>
                <div style={{ fontSize: 10, color: T.muted, fontFamily: "monospace" }}>{item.product.sku}</div>
              </div>
              <Badge color={item.quantity === 0 ? "red" : "gold"}>
                {item.quantity === 0 ? "⚠️ Habis" : `⚠️ Stok: ${item.quantity}`}
              </Badge>
              <Btn variant="primary" sm>Update Stok</Btn>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

export default Dashboard;
