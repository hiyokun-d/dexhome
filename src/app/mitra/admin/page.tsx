"use client";
import { useState } from "react";

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

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: T.surf, borderRadius: 12, border: `1px solid ${T.border}`, boxShadow: "0 4px 24px rgba(0,0,0,.35)", ...style }}>{children}</div>;
}

function Badge({ color, children }: { color: "pur" | "gold" | "green" | "red" | "grey" | "blue"; children: React.ReactNode }) {
  const map = {
    pur: { bg: T.purpleP, color: T.purpleL },
    gold: { bg: "rgba(201,150,42,.15)", color: T.gold },
    green: { bg: "rgba(122,140,110,.15)", color: T.sage },
    red: { bg: "rgba(196,87,42,.13)", color: T.terra },
    grey: { bg: T.surf3, color: T.muted },
    blue: { bg: "rgba(74,144,217,.13)", color: T.blue },
  };
  return <span style={{ ...map[color], display: "inline-flex", alignItems: "center", gap: 3, padding: "3px 8px", borderRadius: 100, fontSize: 10, fontWeight: 700 }}>{children}</span>;
}

function Btn({ variant = "primary", sm, onClick, children }: { variant?: "primary" | "gold" | "outline" | "danger"; sm?: boolean; onClick?: () => void; children: React.ReactNode }) {
  const styles = {
    primary: { background: T.purple, color: "#fff" },
    gold: { background: T.gold, color: "#0F0F12" },
    outline: { background: T.surf3, color: T.txt, border: `1px solid ${T.border2}` },
    danger: { background: "rgba(196,87,42,.15)", color: T.terra, border: `1px solid rgba(196,87,42,.3)` },
  };
  return <button onClick={onClick} style={{ padding: sm ? "5px 12px" : "8px 18px", borderRadius: 8, fontSize: sm ? 11 : 12, fontWeight: 600, cursor: "pointer", transition: "all .2s", border: "none", display: "inline-flex", alignItems: "center", gap: 6, ...styles[variant] }}>{children}</button>;
}

function SectionHeader({ label, title, action }: { label: string; title: string; action?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.purpleL, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span style={{ width: 16, height: 2, background: T.purpleL, display: "inline-block" }} />{label}
        </div>
        <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 20, fontWeight: 700, color: T.txt }}>{title}</div>
      </div>
      {action}
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────
function Dashboard() {
  const kpis = [
    { icon: "💰", label: "GMV Bulan Ini", value: "Rp 148jt", sub: "↑ +22% vs bulan lalu", accent: T.purple },
    { icon: "🛍️", label: "Total Order", value: "84", sub: "↑ +8 minggu ini", accent: T.gold },
    { icon: "📦", label: "Stok Kritis", value: "3", sub: "Perlu restock segera", accent: T.terra },
    { icon: "⭐", label: "Rating Toko", value: "4.9", sub: "128 ulasan · Sangat Baik", accent: T.sage },
  ];

  const recentOrders = [
    { id: "#DXH-2603-0091", product: "Sofa Scandinavian", customer: "Andi Wirawan", time: "5 mnt lalu", status: "new" as const, amount: "Rp 8.500.000" },
    { id: "#DXH-2603-0089", product: "Kursi Makan Oak (×4)", customer: "Siti Rahayu", time: "2j lalu", status: "processing" as const, amount: "Rp 11.200.000" },
    { id: "#DXH-2603-0085", product: "Lampu Rattan", customer: "Deni Pratama", time: "3j lalu", status: "shipped" as const, amount: "Rp 1.250.000" },
    { id: "#DXH-2603-0082", product: "Cermin Arch Brass", customer: "Maya Lestari", time: "5j lalu", status: "done" as const, amount: "Rp 2.100.000" },
    { id: "#DXH-2603-0078", product: "Sofa L-Shape Premium", customer: "Budi Santoso", time: "1 hari lalu", status: "done" as const, amount: "Rp 14.800.000" },
  ];

  const statusMap: Record<string, { color: "pur" | "gold" | "blue" | "green"; label: string }> = {
    new: { color: "pur", label: "🆕 Baru" },
    processing: { color: "gold", label: "🔄 Proses" },
    shipped: { color: "blue", label: "🚚 Dikirim" },
    done: { color: "green", label: "✓ Selesai" },
  };

  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.purpleL, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ width: 16, height: 2, background: T.purpleL, display: "inline-block" }} />Dashboard
          </div>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 20, fontWeight: 700, color: T.txt }}>Dashboard Mitra Admin</div>
          <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>Kamis, 19 Maret 2026 · Data real-time</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={{ padding: "6px 12px", borderRadius: 8, background: T.surf2, border: `1px solid ${T.border2}`, color: T.txt, fontSize: 11, outline: "none", cursor: "pointer" }}>
            <option>30 Hari Terakhir</option><option>7 Hari</option><option>Bulan Ini</option>
          </select>
          <Btn variant="outline" sm>⬇ Export</Btn>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: T.surf, borderRadius: 12, padding: "16px 18px", border: `1px solid ${T.border}`, position: "relative", overflow: "hidden", transition: "transform .2s, box-shadow .2s", cursor: "default" }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 48px rgba(0,0,0,.45)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}>
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
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.txt }}>Order Terbaru</div>
          <Btn variant="outline" sm>Lihat Semua</Btn>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {["Order ID","Produk","Customer","Waktu","Jumlah","Status"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(o => (
              <tr key={o.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <td style={{ padding: "12px 16px", fontSize: 11, color: T.muted, fontFamily: "monospace" }}>{o.id}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: T.txt }}>{o.product}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: T.muted }}>{o.customer}</td>
                <td style={{ padding: "12px 16px", fontSize: 11, color: T.muted }}>{o.time}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 700, color: T.gold }}>{o.amount}</td>
                <td style={{ padding: "12px 16px" }}><Badge color={statusMap[o.status].color}>{statusMap[o.status].label}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Stock Alerts */}
      <Card style={{ padding: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.txt, marginBottom: 14 }}>⚠️ Peringatan Stok</div>
        {[
          { icon: "🛋️", name: "Sofa L-Shape Premium", sku: "HMS-SOFA-003", stock: 2 },
          { icon: "🪞", name: "Cermin Dressing Brass", sku: "HMS-MIR-002", stock: 0 },
          { icon: "🪑", name: "Kursi Makan Solid Oak", sku: "HMS-CHAIR-003", stock: 4 },
        ].map(item => (
          <div key={item.sku} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: T.surf2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>{item.name}</div>
              <div style={{ fontSize: 10, color: T.muted, fontFamily: "monospace" }}>{item.sku}</div>
            </div>
            <Badge color={item.stock === 0 ? "red" : "gold"}>{item.stock === 0 ? "⚠️ Habis" : `⚠️ Stok: ${item.stock}`}</Badge>
            <Btn variant="primary" sm>Update Stok</Btn>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── Stock Management ───────────────────────────────────────────────────
function StockManagement() {
  const [stocks, setStocks] = useState([
    { icon: "🛋️", name: "Sofa Modular Scandinavian", sku: "HMS-SOFA-001", variants: "3 Dudukan, Krem", stock: 28, minStock: 10 },
    { icon: "🪑", name: "Kursi Makan Solid Oak", sku: "HMS-CHAIR-003", variants: "Natural Oak", stock: 4, minStock: 8 },
    { icon: "🛋️", name: "Sofa L-Shape Premium", sku: "HMS-SOFA-003", variants: "L-Shape, Abu", stock: 2, minStock: 5 },
    { icon: "🪞", name: "Cermin Dressing Brass", sku: "HMS-MIR-002", variants: "120cm, Brass", stock: 0, minStock: 3 },
    { icon: "💡", name: "Lampu Gantung Rattan", sku: "HMS-LMP-011", variants: "Natural", stock: 42, minStock: 15 },
    { icon: "🛏️", name: "Headboard Bouclé", sku: "HMS-BED-007", variants: "King, Cream", stock: 6, minStock: 4 },
  ]);

  const adjust = (idx: number, delta: number) => {
    setStocks(s => s.map((item, i) => i === idx ? { ...item, stock: Math.max(0, item.stock + delta) } : item));
  };

  return (
    <div className="fade-up">
      <SectionHeader label="Inventaris" title="Kelola Stok Showroom" action={
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="outline" sm>⬇ Export CSV</Btn>
          <Btn variant="primary" sm>🔄 Sync Sistem</Btn>
        </div>
      } />

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total SKU", value: "6", icon: "📦", accent: T.purple },
          { label: "Total Unit", value: "82", icon: "🔢", accent: T.gold },
          { label: "Stok Kritis (< min)", value: "3", icon: "⚠️", accent: T.terra },
        ].map(s => (
          <Card key={s.label} style={{ padding: "14px 16px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.accent }} />
            <div style={{ fontSize: 18, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.txt }}>{s.value}</div>
          </Card>
        ))}
      </div>

      <Card style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {["Produk","SKU","Varian","Stok Saat Ini","Min. Stok","Status","Atur Stok"].map(h => (
                <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocks.map((item, idx) => {
              const critical = item.stock === 0 || item.stock < item.minStock;
              return (
                <tr key={item.sku} style={{ borderBottom: `1px solid ${T.border}`, background: critical ? "rgba(196,87,42,.03)" : "transparent" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: T.surf2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 11, color: T.muted, fontFamily: "monospace" }}>{item.sku}</td>
                  <td style={{ padding: "12px 16px", fontSize: 11, color: T.muted }}>{item.variants}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: item.stock === 0 ? T.terra : item.stock < item.minStock ? T.goldL : T.sage }}>{item.stock}</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: T.muted }}>{item.minStock}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <Badge color={item.stock === 0 ? "red" : item.stock < item.minStock ? "gold" : "green"}>
                      {item.stock === 0 ? "❌ Habis" : item.stock < item.minStock ? "⚠️ Kritis" : "✓ Aman"}
                    </Badge>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <button onClick={() => adjust(idx, -1)} style={{ width: 28, height: 28, borderRadius: 6, background: T.surf3, border: `1px solid ${T.border2}`, color: T.txt, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ width: 36, textAlign: "center", fontSize: 13, fontWeight: 700, color: T.txt }}>{item.stock}</span>
                      <button onClick={() => adjust(idx, 1)} style={{ width: 28, height: 28, borderRadius: 6, background: T.surf3, border: `1px solid ${T.border2}`, color: T.txt, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
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

// ── Input Points ───────────────────────────────────────────────────────
function InputPoints() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fade-up">
      <SectionHeader label="Poin Customer" title="Input Poin Transaksi" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        <Card style={{ padding: 24 }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 22, fontWeight: 700, color: T.txt, marginBottom: 8 }}>Poin Berhasil Diinput!</div>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 24 }}>850 poin telah dikreditkan ke akun Budi Santoso</div>
              <Btn variant="primary" onClick={() => setSubmitted(false)}>Input Poin Baru</Btn>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.txt, marginBottom: 18 }}>📋 Data Transaksi</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>No. Transaksi / Invoice *</label>
                  <input defaultValue="DXH-2603-0091" style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Tanggal Transaksi *</label>
                  <input type="date" defaultValue="2026-03-19" style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none" }} />
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>ID / No. HP Customer *</label>
                <input defaultValue="08123456789" style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none" }} />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Produk yang Dibeli *</label>
                <select style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none", cursor: "pointer" }}>
                  <option>Sofa Modular Scandinavian</option>
                  <option>Kursi Makan Solid Oak</option>
                  <option>Lampu Gantung Rattan</option>
                  <option>Headboard Bouclé</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Total Nilai Transaksi (Rp) *</label>
                  <input defaultValue="8.500.000" style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Poin Yang Diberikan</label>
                  <input defaultValue="850" readOnly style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.gold, background: T.surf2, outline: "none", fontWeight: 700 }} />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Catatan (Opsional)</label>
                <textarea placeholder="Catatan tambahan..." style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none", resize: "none", minHeight: 70 }} />
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="primary" onClick={() => setSubmitted(true)}>✓ Submit Poin</Btn>
                <Btn variant="outline">Reset Form</Btn>
              </div>
            </>
          )}
        </Card>

        {/* Guide */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card style={{ padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.purpleL, marginBottom: 12 }}>ℹ️ Panduan Input Poin</div>
            {[
              ["Rasio Poin", "1 poin per Rp 10.000 transaksi"],
              ["Min. Transaksi", "Rp 500.000 untuk mendapat poin"],
              ["Batas Harian", "Maksimal 10 input per hari"],
              ["Deadline", "Input maks. 3 hari setelah transaksi"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.border}`, fontSize: 12 }}>
                <span style={{ color: T.muted }}>{k}</span>
                <span style={{ color: T.txt, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </Card>

          <Card style={{ padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.txt, marginBottom: 12 }}>📈 Input Hari Ini</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: T.purple, textAlign: "center", margin: "8px 0 4px" }}>3</div>
            <div style={{ fontSize: 11, color: T.muted, textAlign: "center", marginBottom: 14 }}>dari 10 input hari ini</div>
            <div style={{ height: 6, background: T.surf3, borderRadius: 100, marginBottom: 8 }}>
              <div style={{ height: "100%", width: "30%", background: T.purple, borderRadius: 100 }} />
            </div>
            <div style={{ fontSize: 11, color: T.muted, textAlign: "center" }}>1.640 total poin dikreditkan hari ini</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── Announcements (Read) ───────────────────────────────────────────────
function AnnouncementsAdmin() {
  const [expanded, setExpanded] = useState<number | null>(1);

  const items = [
    { id: 1, icon: "📣", title: "Flash Sale April 2026 — Pastikan Stok Siap!", time: "Hari ini, 09.00", unread: true, tag: "Promosi", tagColor: "gold" as const, preview: "Flash Sale April akan mulai 1–15 April 2026. Pastikan semua produk update stok sebelum 25 Maret." },
    { id: 2, icon: "⚙️", title: "Update Sistem v2.4 — Panel Admin Baru", time: "15 Mar", unread: true, tag: "Sistem", tagColor: "blue" as const, preview: "Panel admin baru dengan tampilan stok real-time, notifikasi order instan, dan laporan otomatis." },
    { id: 3, icon: "🎪", title: "DexHome Expo 2026 — Undangan Mitra", time: "10 Mar", unread: false, tag: "Event", tagColor: "green" as const, preview: "Jakarta Convention Center, 20–22 Juni 2026. Booth gratis untuk mitra verified." },
  ];

  return (
    <div className="fade-up">
      <SectionHeader label="Info Platform" title="Pengumuman dari DexHome" />

      {/* Unread badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "12px 16px", background: T.purpleP, borderRadius: 10, border: `1px solid rgba(139,124,200,.2)` }}>
        <span style={{ fontSize: 18 }}>🔔</span>
        <span style={{ fontSize: 13, color: T.purpleL, fontWeight: 600 }}>2 pengumuman belum dibaca</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map(item => (
          <Card key={item.id} style={{ overflow: "hidden", opacity: item.unread ? 1 : .65, cursor: "pointer" }}>
            <div onClick={() => setExpanded(expanded === item.id ? null : item.id)} style={{ padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: T.surf2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.txt }}>{item.title}</div>
                  <span style={{ fontSize: 10, color: T.muted, flexShrink: 0 }}>{item.time}</span>
                </div>
                <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.5, marginBottom: 8, display: expanded === item.id ? "none" : "block" }}>{item.preview}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <Badge color={item.tagColor}>{item.tag}</Badge>
                  {item.unread && <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.terra, display: "inline-block", marginLeft: "auto" }} />}
                </div>
              </div>
            </div>
            {expanded === item.id && (
              <div style={{ padding: "0 18px 16px 70px", borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
                <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7 }}>{item.preview} Pastikan semua persiapan selesai sebelum tanggal yang ditentukan.</p>
                {item.id === 1 && (
                  <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <Btn variant="primary" sm>Tandai Sudah Baca</Btn>
                    <Btn variant="outline" sm>⬇ Unduh Panduan</Btn>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Main Portal ────────────────────────────────────────────────────────
type Section = "dashboard" | "stock" | "inputpts" | "announce";

export default function MitraAdminPortal() {
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: { id: Section; icon: string; label: string; badge?: number }[] = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "stock", icon: "📦", label: "Kelola Stok" },
    { id: "inputpts", icon: "⭐", label: "Input Poin" },
    { id: "announce", icon: "📢", label: "Pengumuman", badge: 2 },
  ];

  const titles: Record<Section, string> = {
    dashboard: "Dashboard",
    stock: "Kelola Stok",
    inputpts: "Input Poin",
    announce: "Pengumuman",
  };

  return (
    <div className="portal-shell" style={{ background: T.bg }}>
      <div className={`sidebar-overlay${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`portal-sidebar${sidebarOpen ? " open" : ""}`} style={{ background: T.surf, borderRight: `1px solid ${T.border}` }}>
        <div style={{ padding: "22px 20px 16px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 22, fontWeight: 700, color: T.txt }}>Dex<span style={{ color: T.purpleL }}>Home</span></div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: T.purpleP, border: `1px solid rgba(139,124,200,.3)`, borderRadius: 5, padding: "2px 10px", marginTop: 5 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: T.purpleL, letterSpacing: ".08em", textTransform: "uppercase" }}>Mitra Admin</span>
          </div>
        </div>

        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: `linear-gradient(135deg, ${T.purple}, #6B5AB8)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🏢</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.txt }}>Homera Studio</div>
            <div style={{ fontSize: 10, color: T.muted, fontFamily: "monospace" }}>MTR-0001</div>
            <div style={{ fontSize: 10, color: T.purpleL, fontWeight: 600, marginTop: 1 }}>Admin Mode</div>
          </div>
        </div>

        <nav style={{ padding: "12px 8px", flex: 1 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: T.muted2, letterSpacing: ".1em", textTransform: "uppercase", padding: "0 10px", margin: "10px 0 5px" }}>Manajemen</div>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
              className="nav-item"
              style={{
                background: active === item.id ? T.purpleP : "none",
                color: active === item.id ? T.purpleL : T.muted,
                fontWeight: active === item.id ? 600 : 500,
                border: active === item.id ? `1px solid rgba(139,124,200,.2)` : "1px solid transparent",
              }}
            >
              <span style={{ fontSize: 16, width: 18, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
          <div style={{ fontSize: 9, fontWeight: 700, color: T.muted2, letterSpacing: ".1em", textTransform: "uppercase", padding: "0 10px", margin: "12px 0 5px" }}>Akun</div>
          {[["👤","Profil Admin"],["📊","Laporan"]].map(([ico,lbl]) => (
            <button key={lbl} className="nav-item" style={{ color: T.muted }}>
              <span style={{ fontSize: 16, width: 18, textAlign: "center" }}>{ico}</span>{lbl}
            </button>
          ))}
        </nav>

        <div style={{ padding: "10px 8px", borderTop: `1px solid ${T.border}` }}>
          <button className="nav-item" style={{ color: T.muted }}>
            <span style={{ fontSize: 16, width: 18, textAlign: "center" }}>🚪</span>Keluar
          </button>
        </div>
      </aside>

      {/* Topbar */}
      <header className="portal-topbar" style={{ background: `rgba(19,17,26,.95)`, borderBottom: `1px solid ${T.border}` }}>
        <button className="ham-btn" onClick={() => setSidebarOpen(true)} style={{ width: 34, height: 34, borderRadius: 8, background: "none", border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, color: T.txt }}>☰</button>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.txt }}>{titles[active]}</div>
          <div style={{ fontSize: 11, color: T.muted }}>Homera Studio · Admin Panel</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 9 }}>
          <div className="search-bar" style={{ background: T.surf2, border: `1px solid ${T.border2}` }}>
            <span style={{ color: T.muted, fontSize: 13 }}>🔍</span>
            <input placeholder="Cari order, produk..." style={{ color: T.txt, fontSize: 12 }} />
          </div>
          <button className="icon-btn" style={{ background: T.surf2, border: `1px solid ${T.border}`, color: T.txt }}>
            🔔<div className="notif-dot" />
          </button>
        </div>
      </header>

      <main className="portal-main" style={{ padding: "24px 28px" }}>
        {active === "dashboard" && <Dashboard />}
        {active === "stock" && <StockManagement />}
        {active === "inputpts" && <InputPoints />}
        {active === "announce" && <AnnouncementsAdmin />}
      </main>
    </div>
  );
}
