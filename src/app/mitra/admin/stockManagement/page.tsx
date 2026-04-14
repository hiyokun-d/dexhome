"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/Badge";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";

const T = {
  bg: "#13111A", surf: "#1B1825", surf2: "#221F2E", surf3: "#2A2638",
  border: "rgba(255,255,255,.07)", border2: "rgba(255,255,255,.13)",
  txt: "#EDE8F5", muted: "rgba(237,232,245,.45)", muted2: "rgba(237,232,245,.22)",
  purple: "#8B7CC8", purpleL: "#A898E0", purpleP: "rgba(139,124,200,.12)",
  gold: "#C9962A", goldL: "#E8B84B", goldP: "rgba(201,150,42,.10)",
  terra: "#C4572A", sage: "#7A8C6E", blue: "#4A90D9",
};

type StockItem = {
  id: string;
  quantity: number;
  minQuantity: number;
  updatedAt: string;
  product: { id: string; sku: string; name: string; status: string; price: number; images: { url: string }[] };
  variant: { id: string; size: string | null; color: string | null; skuSuffix: string } | null;
};

export function StockManagement({ mitraId }: { mitraId: string }) {
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editQty, setEditQty] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!mitraId) return;
    setLoading(true);
    fetch(`/api/mitra/admin/stock?mitraId=${mitraId}`)
      .then((r) => r.json())
      .then(({ data }) => { if (data) setStocks(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [mitraId]);

  async function saveStock(stockItemId: string) {
    setSaving(true);
    try {
      const res = await fetch("/api/mitra/admin/stock", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mitraId, stockItemId, quantity: editQty }),
      });
      const { data } = await res.json();
      if (data) {
        setStocks((prev) => prev.map((s) =>
          s.id === stockItemId ? { ...s, quantity: data.quantity, updatedAt: data.updatedAt } : s
        ));
        setEditId(null);
      }
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item: StockItem) {
    setEditId(item.id);
    setEditQty(item.quantity);
  }

  const totalStock = stocks.reduce((s, i) => s + i.quantity, 0);
  const activeCount = stocks.filter((i) => i.product.status === "ACTIVE").length;
  const criticalCount = stocks.filter((i) => i.quantity <= i.minQuantity).length;

  function fmtRp(n: number) { return "Rp " + n.toLocaleString("id-ID"); }

  return (
    <div className="fade-up">
      <SectionHeader label="Inventaris" title="Kelola Stok" />

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Item", value: loading ? "–" : String(stocks.length), icon: "📦", accent: T.purple },
          { label: "Produk Aktif", value: loading ? "–" : String(activeCount), icon: "✅", accent: T.sage },
          { label: "Stok Kritis", value: loading ? "–" : String(criticalCount), icon: "⚠️", accent: T.terra },
          { label: "Total Unit", value: loading ? "–" : String(totalStock), icon: "📊", accent: T.gold },
        ].map((s) => (
          <div key={s.label} style={{ background: T.surf, borderRadius: 12, padding: "14px 16px",
            border: `1px solid ${T.border}`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.accent }} />
            <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: T.txt }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <Card style={{ overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            {[1, 2, 3, 4].map((i) => <div key={i} style={{ height: 44, background: T.surf2, borderRadius: 6, opacity: 0.4 }} />)}
          </div>
        ) : stocks.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", fontSize: 13, color: T.muted }}>Belum ada stok tercatat.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {["Produk", "SKU", "Harga", "Stok", "Min Stok", "Status", "Aksi"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10,
                    fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted2 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stocks.map((item) => {
                const isEdit = editId === item.id;
                const imgUrl = item.product.images[0]?.url;
                return (
                  <tr key={item.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: T.surf2,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 16, flexShrink: 0, overflow: "hidden" }}>
                          {imgUrl
                            ? <img src={imgUrl} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : "📦"}
                        </div>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>{item.product.name}</div>
                          {item.variant && (
                            <div style={{ fontSize: 10, color: T.muted }}>
                              {[item.variant.size, item.variant.color].filter(Boolean).join(" · ") || item.variant.skuSuffix}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 11, color: T.muted, fontFamily: "monospace" }}>
                      {item.product.sku}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 12, color: T.gold, fontWeight: 600 }}>
                      {fmtRp(item.product.price)}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {isEdit ? (
                        <input
                          type="number"
                          min={0}
                          value={editQty}
                          onChange={(e) => setEditQty(Number(e.target.value))}
                          style={{ width: 70, padding: "5px 8px", border: `1px solid ${T.border2}`,
                            borderRadius: 6, background: T.surf3, color: T.txt, fontSize: 12, outline: "none" }}
                        />
                      ) : (
                        <span style={{ fontSize: 13, fontWeight: 700,
                          color: item.quantity === 0 ? T.terra : item.quantity <= item.minQuantity ? T.gold : T.sage }}>
                          {item.quantity}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 12, color: T.muted }}>{item.minQuantity}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <Badge color={
                        item.quantity === 0 ? "red"
                          : item.quantity <= item.minQuantity ? "gold"
                          : item.product.status !== "ACTIVE" ? "grey"
                          : "green"
                      }>
                        {item.quantity === 0 ? "⚠️ Habis"
                          : item.quantity <= item.minQuantity ? "⚠️ Menipis"
                          : item.product.status !== "ACTIVE" ? item.product.status
                          : "● Aktif"}
                      </Badge>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {isEdit ? (
                        <div style={{ display: "flex", gap: 6 }}>
                          <Btn variant="primary" sm onClick={() => saveStock(item.id)}>
                            {saving ? "…" : "Simpan"}
                          </Btn>
                          <Btn variant="outline" sm onClick={() => setEditId(null)}>Batal</Btn>
                        </div>
                      ) : (
                        <Btn variant="outline" sm onClick={() => startEdit(item)}>Edit Stok</Btn>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}

export default StockManagement;
