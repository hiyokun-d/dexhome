"use client";
import { useState } from "react";

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

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: T.surf, borderRadius: 12, border: `1px solid ${T.border}`, boxShadow: "0 4px 24px rgba(0,0,0,.3)", ...style }}>{children}</div>;
}

function Badge({ color, children }: { color: "gold" | "green" | "red" | "grey" | "blue" | "purple"; children: React.ReactNode }) {
  const map = {
    gold: { bg: "rgba(201,150,42,.15)", color: T.gold },
    green: { bg: "rgba(122,140,110,.15)", color: T.sage },
    red: { bg: "rgba(196,87,42,.13)", color: T.terra },
    grey: { bg: T.surf3, color: T.muted },
    blue: { bg: "rgba(74,144,217,.13)", color: T.blue },
    purple: { bg: "rgba(139,124,200,.13)", color: T.purple },
  };
  return <span style={{ ...map[color], display: "inline-flex", alignItems: "center", gap: 3, padding: "3px 8px", borderRadius: 100, fontSize: 10, fontWeight: 700 }}>{children}</span>;
}

function Btn({ variant = "primary", sm, onClick, children }: { variant?: "primary" | "dark" | "red" | "green"; sm?: boolean; onClick?: () => void; children: React.ReactNode }) {
  const styles = {
    primary: { background: T.gold, color: "#0F0F12" },
    dark: { background: T.surf3, color: T.txt, border: `1px solid ${T.border2}` },
    red: { background: "rgba(196,87,42,.15)", color: T.terra, border: `1px solid rgba(196,87,42,.3)` },
    green: { background: "rgba(122,140,110,.15)", color: T.sage, border: `1px solid rgba(122,140,110,.3)` },
  };
  return <button type="button" onClick={onClick} style={{ padding: sm ? "5px 12px" : "8px 18px", borderRadius: 8, fontSize: sm ? 11 : 12, fontWeight: 600, cursor: "pointer", transition: "all .2s", border: "none", display: "inline-flex", alignItems: "center", gap: 6, ...styles[variant] }}>{children}</button>;
}

function SectionHeader({ label, title, sub, action }: { label: string; title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span style={{ width: 16, height: 2, background: T.gold, display: "inline-block" }} />{label}
        </div>
        <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 20, fontWeight: 700, color: T.txt }}>{title}</div>
        {sub && <p style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ── Overview ───────────────────────────────────────────────────────────
function Overview() {
  const kpis = [
    { icon: "💰", label: "Total GMV", value: "Rp 2,4M", sub: "↑ +18% vs bulan lalu", accent: T.gold },
    { icon: "🛍️", label: "Total Transaksi", value: "1.842", sub: "↑ +142 minggu ini", accent: T.blue },
    { icon: "👥", label: "Customer Aktif", value: "8.294", sub: "↑ +320 bulan ini", accent: T.sage },
    { icon: "🏬", label: "Mitra Showroom", value: "180", sub: "12 kota · 6 baru bulan ini", accent: T.purple },
    { icon: "🎧", label: "Tiket CS Terbuka", value: "47", sub: "Avg. respons 2.4j", accent: T.terra },
  ];

  const activity = [
    { icon: "➕", type: "add", desc: "Produk baru ditambahkan", sub: "Rak Buku Modular Oak · oleh Admin Rina", time: "5 mnt lalu" },
    { icon: "📢", type: "ann", desc: "Pengumuman dikirim", sub: "Flash Sale April 2026 · ke 180 mitra", time: "32 mnt lalu" },
    { icon: "✏️", type: "edit", desc: "Data mitra diperbarui", sub: "Homera Studio Kemang · foto showroom", time: "1j lalu" },
    { icon: "🎧", type: "cs", desc: "Tiket CS diselesaikan", sub: "#TKT-0031 · Aktivasi asuransi · Budi S.", time: "2j lalu" },
    { icon: "🏬", type: "add", desc: "Mitra baru bergabung", sub: "Artisan Wood Bali · Denpasar, Bali", time: "3j lalu" },
    { icon: "🗑️", type: "del", desc: "Produk dinonaktifkan", sub: "Kursi Teras Plastik · stok habis", time: "5j lalu" },
  ];

  const topMitra = [
    { icon: "🏢", name: "Homera Studio", code: "MTR-0001", gmv: "Rp 148jt", txn: 84, status: "green" as const },
    { icon: "🏬", name: "Woodcraft Co.", code: "MTR-0002", gmv: "Rp 122jt", txn: 67, status: "green" as const },
    { icon: "🏪", name: "Teak & Grain", code: "MTR-0003", gmv: "Rp 98jt", txn: 52, status: "green" as const },
    { icon: "💡", name: "LuxeLight ID", code: "MTR-0004", gmv: "Rp 76jt", txn: 41, status: "green" as const },
    { icon: "🪞", name: "MirrorMade", code: "MTR-0005", gmv: "Rp 54jt", txn: 29, status: "gold" as const },
  ];

  const catData = [
    { label: "🛋️ Ruang Tamu", pct: 38, color: T.gold },
    { label: "🛏️ Kamar Tidur", pct: 24, color: T.blue },
    { label: "🍽️ Ruang Makan", pct: 19, color: T.sage },
    { label: "💡 Dekorasi & Lampu", pct: 12, color: T.terra },
    { label: "🪴 Lainnya", pct: 7, color: T.purple },
  ];

  const bars = [65, 80, 55, 90, 100, 72, 45];
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const vals = [312, 384, 264, 432, 480, 346, 216];

  return (
    <div className="fade-up">
      <SectionHeader
        label="Dashboard"
        title="Overview Platform"
        sub="Kamis, 19 Maret 2026 · Data real-time"
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <select style={{ padding: "6px 12px", borderRadius: 8, background: T.surf2, border: `1px solid ${T.border2}`, color: T.txt, fontSize: 11, outline: "none", cursor: "pointer" }}>
              <option>30 Hari Terakhir</option><option>7 Hari</option><option>Bulan Ini</option><option>Tahun Ini</option>
            </select>
            <Btn variant="dark" sm>⬇ Export</Btn>
          </div>
        }
      />

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: T.surf, borderRadius: 12, padding: "16px 18px", border: `1px solid ${T.border}`, position: "relative", overflow: "hidden", transition: "transform .2s", cursor: "default" }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: k.accent }} />
            <div style={{ fontSize: 20, marginBottom: 8 }}>{k.icon}</div>
            <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.txt, marginBottom: 5 }}>{k.value}</div>
            <div style={{ fontSize: 11, color: T.muted }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
        {/* Bar Chart */}
        <Card style={{ padding: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.txt, marginBottom: 3 }}>GMV Harian (7 Hari)</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 16 }}>Total transaksi dalam juta rupiah</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ fontSize: 9, color: T.muted }}>{vals[i]}</div>
                <div style={{ width: "100%", height: `${h}%`, background: i >= 5 ? T.sage : T.gold, borderRadius: "4px 4px 0 0", transition: "all .3s", minHeight: 4 }} />
                <div style={{ fontSize: 9, color: T.muted }}>{days[i]}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Category Distribution */}
        <Card style={{ padding: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.txt, marginBottom: 3 }}>Penjualan per Kategori</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 16 }}>Distribusi produk terlaris bulan ini</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {catData.map(c => (
              <div key={c.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.muted, marginBottom: 4 }}>
                  <span>{c.label}</span><span style={{ color: c.color, fontWeight: 700 }}>{c.pct}%</span>
                </div>
                <div style={{ height: 6, background: T.surf3, borderRadius: 100 }}>
                  <div style={{ height: "100%", width: `${c.pct}%`, background: c.color, borderRadius: 100 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity + Top Mitra */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: 2 }}>Feed</div>
              <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 17, fontWeight: 700, color: T.txt }}>Aktivitas Terbaru</div>
            </div>
            <Btn variant="dark" sm>Lihat Semua</Btn>
          </div>
          <div>
            {activity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: T.surf2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>{a.desc}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{a.sub}</div>
                </div>
                <div style={{ fontSize: 10, color: T.muted, flexShrink: 0 }}>{a.time}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 18 }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: 2 }}>Status</div>
            <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 17, fontWeight: 700, color: T.txt }}>Top Mitra Bulan Ini</div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {["Mitra","GMV","Transaksi","Status"].map(h => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted2 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topMitra.map(m => (
                <tr key={m.code} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <td style={{ padding: "10px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 7, background: T.surf2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{m.icon}</div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>{m.name}</div>
                        <div style={{ fontSize: 9, color: T.muted, fontFamily: "monospace" }}>{m.code}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "10px 10px", fontSize: 12, fontWeight: 700, color: T.gold }}>{m.gmv}</td>
                  <td style={{ padding: "10px 10px", fontSize: 12, color: T.muted }}>{m.txn}</td>
                  <td style={{ padding: "10px 10px" }}><Badge color={m.status}>{m.status === "green" ? "✓ Aktif" : "● Review"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

// ── Add Product ────────────────────────────────────────────────────────
function AddProduct() {
  return (
    <div className="fade-up">
      <SectionHeader label="Produk" title="Tambah Produk Baru" action={
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="dark" sm>💾 Simpan Draft</Btn>
          <Btn variant="primary" sm>🚀 Publikasikan</Btn>
        </div>
      } />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Basic Info */}
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.txt, marginBottom: 14 }}>📝 Informasi Dasar</div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Nama Produk *</label>
              <input defaultValue="Sofa Modular Scandinavian 3 Dudukan" style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Brand / Mitra *</label>
                <select style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none", cursor: "pointer" }}>
                  <option>Homera Studio</option><option>Woodcraft Co.</option><option>Teak & Grain</option><option>LuxeLight ID</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Kategori *</label>
                <select style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none", cursor: "pointer" }}>
                  <option>Ruang Tamu</option><option>Kamar Tidur</option><option>Ruang Makan</option><option>Dekorasi & Lampu</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Deskripsi *</label>
              <textarea placeholder="Deskripsikan produk secara lengkap..." style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none", resize: "vertical", minHeight: 90 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              {[["SKU", "HMS-SOFA-001"], ["Berat (kg)", "48"], ["Dimensi (cm)", "240×90×80"]].map(([lbl, val]) => (
                <div key={lbl}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>{lbl}</label>
                  <input defaultValue={val} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none" }} />
                </div>
              ))}
            </div>
          </Card>

          {/* Pricing */}
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.txt, marginBottom: 14 }}>💰 Harga & Promo</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Harga Normal (Rp) *</label>
                <input defaultValue="8.500.000" style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Harga Coret (Rp)</label>
                <input defaultValue="10.000.000" style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Diskon Member (%)</label>
                <input defaultValue="10" style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Poin per Transaksi</label>
                <input defaultValue="850" style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.gold, background: T.surf2, outline: "none", fontWeight: 700 }} />
              </div>
            </div>
          </Card>

          {/* Photos */}
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.txt, marginBottom: 4 }}>📸 Foto Produk</div>
            <p style={{ fontSize: 11, color: T.muted, marginBottom: 12 }}>Minimal 3 foto · JPG/PNG/WEBP · Maks 5MB/foto · Rasio 1:1 direkomendasikan</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
              {["🛋️","📐","🎨","📷","📷","📷"].map((ico, i) => (
                <div key={i} style={{ aspectRatio: "1", borderRadius: 10, border: `1.5px ${i < 3 ? "solid" : "dashed"} ${i < 3 ? T.gold : T.border}`, background: i < 3 ? T.goldP : T.surf2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: i < 3 ? 24 : 16, color: i < 3 ? T.gold : T.muted }}>
                  {ico}
                  {i >= 3 && <span style={{ fontSize: 9, marginTop: 4 }}>Upload</span>}
                </div>
              ))}
            </div>
          </Card>

          {/* Warranty */}
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.txt, marginBottom: 14 }}>🛡️ Garansi & Asuransi</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Garansi (bulan)</label>
                <select style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none", cursor: "pointer" }}>
                  <option>12 bulan</option><option>24 bulan</option><option>36 bulan</option><option>60 bulan</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Jenis Garansi</label>
                <select style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none", cursor: "pointer" }}>
                  <option>Garansi Toko</option><option>Garansi Resmi Pabrik</option><option>Garansi DexHome</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {["Ya, tersedia", "Tidak"].map((opt, i) => (
                <label key={opt} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.muted, cursor: "pointer" }}>
                  <input type="radio" name="insurance" defaultChecked={i === 0} style={{ accentColor: T.gold }} />
                  {opt}
                </label>
              ))}
            </div>
          </Card>
        </div>

        {/* Preview */}
        <div style={{ position: "sticky", top: 80 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 12 }}>Preview Produk</div>
          <div style={{ background: T.surf2, borderRadius: 12, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            <div style={{ height: 160, background: `linear-gradient(135deg, ${T.surf3}, #2A2420)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>🛋️</div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 11, color: T.muted, marginBottom: 4 }}>Homera Studio</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.txt, marginBottom: 8 }}>Sofa Modular Scandinavian 3 Dudukan</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: T.gold, marginBottom: 4 }}>Rp 8.500.000</div>
              <div style={{ fontSize: 11, color: T.muted, textDecoration: "line-through", marginBottom: 8 }}>Rp 10.000.000</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Badge color="gold">+850 poin</Badge>
                <Badge color="green">✓ Garansi 24bln</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Product List ───────────────────────────────────────────────────────
function ProductList() {
  const products = [
    { icon: "🛋️", name: "Sofa Modular Scandinavian", brand: "Homera Studio", category: "Ruang Tamu", price: "Rp 8.500.000", stock: 42, rating: "4.9", status: "active" as const },
    { icon: "🛏️", name: "Ranjang Platform Oak", brand: "Woodcraft Co.", category: "Kamar Tidur", price: "Rp 12.200.000", stock: 18, rating: "4.8", status: "active" as const },
    { icon: "💡", name: "Lampu Rattan Wabi-Sabi", brand: "LuxeLight ID", category: "Dekorasi", price: "Rp 1.250.000", stock: 84, rating: "4.7", status: "active" as const },
    { icon: "🍽️", name: "Meja Makan Jati Solid", brand: "Teak & Grain", category: "Ruang Makan", price: "Rp 5.800.000", stock: 14, rating: "4.9", status: "active" as const },
    { icon: "🪞", name: "Cermin Arch Brass", brand: "MirrorMade", category: "Dekorasi", price: "Rp 2.100.000", stock: 0, rating: "4.6", status: "inactive" as const },
    { icon: "🪑", name: "Kursi Teras Anyaman", brand: "Greenspace", category: "Outdoor", price: "Rp 890.000", stock: 7, rating: "4.5", status: "review" as const },
  ];

  return (
    <div className="fade-up">
      <SectionHeader label="Produk" title="Daftar Produk" action={<Btn variant="primary" sm>+ Produk Baru</Btn>} />

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, background: T.surf2, border: `1px solid ${T.border2}`, borderRadius: 100, padding: "7px 14px", flex: "0 0 280px" }}>
          <span style={{ color: T.muted, fontSize: 13 }}>🔍</span>
          <input placeholder="Cari nama produk, SKU, brand..." style={{ border: "none", outline: "none", background: "none", fontSize: 12, color: T.txt, flex: 1 }} />
        </div>
        {["Semua","Aktif","Review","Nonaktif"].map((f, i) => (
          <button type="button" key={f} style={{ padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: i === 0 ? 600 : 500, cursor: "pointer", border: `1.5px solid ${i === 0 ? T.gold : T.border}`, background: i === 0 ? T.goldP : "none", color: i === 0 ? T.gold : T.muted }}>
            {f}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Btn variant="dark" sm>⬇ Export</Btn>
        </div>
      </div>

      <Card style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {["Produk","Brand","Kategori","Harga","Stok","Rating","Status","Aksi"].map(h => (
                <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.name} style={{ borderBottom: `1px solid ${T.border}` }}
                onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = T.surf2; }}
                onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = ""; }}>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: T.surf2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{p.icon}</div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 11, color: T.muted }}>{p.brand}</td>
                <td style={{ padding: "12px 14px" }}><Badge color="grey">{p.category}</Badge></td>
                <td style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: T.gold }}>{p.price}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: p.stock === 0 ? T.terra : p.stock < 10 ? "#E8A020" : T.sage }}>{p.stock}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: T.muted }}>⭐ {p.rating}</td>
                <td style={{ padding: "12px 14px" }}>
                  <Badge color={p.status === "active" ? "green" : p.status === "review" ? "gold" : "grey"}>
                    {p.status === "active" ? "● Aktif" : p.status === "review" ? "⏳ Review" : "○ Nonaktif"}
                  </Badge>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <Btn variant="dark" sm>Edit</Btn>
                    <Btn variant="red" sm>🗑</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ── Mitra Management ───────────────────────────────────────────────────
function MitraManagement() {
  const mitras = [
    { icon: "🏢", name: "Homera Studio", code: "MTR-0001", city: "Jakarta Selatan", products: 18, gmv: "Rp 148jt", status: "active", joined: "Jan 2024" },
    { icon: "🪵", name: "Woodcraft Co.", code: "MTR-0002", city: "Jakarta Selatan", products: 14, gmv: "Rp 122jt", status: "active", joined: "Feb 2024" },
    { icon: "🍃", name: "Teak & Grain", code: "MTR-0003", city: "Jakarta Pusat", products: 11, gmv: "Rp 98jt", status: "active", joined: "Mar 2024" },
    { icon: "💡", name: "LuxeLight ID", code: "MTR-0004", city: "Jakarta Selatan", products: 22, gmv: "Rp 76jt", status: "active", joined: "Apr 2024" },
    { icon: "🪞", name: "MirrorMade", code: "MTR-0005", city: "Surabaya", products: 9, gmv: "Rp 54jt", status: "review", joined: "Jan 2026" },
    { icon: "🌿", name: "Artisan Wood Bali", code: "MTR-0006", city: "Denpasar", products: 0, gmv: "—", status: "onboarding", joined: "Mar 2026" },
  ];

  const statusMap: Record<string, { color: "green" | "gold" | "blue" | "grey"; label: string }> = {
    active: { color: "green", label: "✓ Aktif" },
    review: { color: "gold", label: "⏳ Review" },
    onboarding: { color: "blue", label: "🆕 Onboarding" },
  };

  return (
    <div className="fade-up">
      <SectionHeader label="Mitra" title="Kelola Mitra Showroom" action={<Btn variant="primary" sm>+ Daftarkan Mitra</Btn>} />

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Mitra", value: "180", icon: "🏬", accent: T.gold },
          { label: "Aktif", value: "166", icon: "✅", accent: T.sage },
          { label: "Review", value: "9", icon: "⏳", accent: "#E8A020" },
          { label: "Kota", value: "12", icon: "📍", accent: T.blue },
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
              {["Mitra","Kode","Kota","Produk","GMV Bulan Ini","Status","Bergabung","Aksi"].map(h => (
                <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mitras.map(m => (
              <tr key={m.code} style={{ borderBottom: `1px solid ${T.border}` }}
                onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = T.surf2; }}
                onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = ""; }}>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: T.surf2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{m.icon}</div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>{m.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 11, color: T.muted, fontFamily: "monospace" }}>{m.code}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: T.muted }}>{m.city}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: T.txt }}>{m.products}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, fontWeight: 700, color: T.gold }}>{m.gmv}</td>
                <td style={{ padding: "12px 14px" }}><Badge color={statusMap[m.status].color}>{statusMap[m.status].label}</Badge></td>
                <td style={{ padding: "12px 14px", fontSize: 11, color: T.muted }}>{m.joined}</td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <Btn variant="dark" sm>Detail</Btn>
                    <Btn variant="dark" sm>Edit</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ── Announcements (Send) ───────────────────────────────────────────────
function SendAnnouncement() {
  const [sent, setSent] = useState(false);
  const past = [
    { title: "Flash Sale April 2026 — Pastikan Stok Siap!", time: "Hari ini, 09.00", target: "Semua Mitra (180)", reads: 72, tags: ["Promosi", "Penting"] },
    { title: "Update Sistem DexHome v2.4", time: "15 Mar 2026", target: "Semua Mitra (180)", reads: 156, tags: ["Sistem"] },
    { title: "DexHome Expo 2026 — Undangan Mitra", time: "10 Mar 2026", target: "Mitra Verified (142)", reads: 138, tags: ["Event"] },
  ];

  return (
    <div className="fade-up">
      <SectionHeader label="Komunikasi" title="Kirim Pengumuman" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        {/* Compose */}
        <Card style={{ padding: 22 }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>📢</div>
              <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 22, fontWeight: 700, color: T.txt, marginBottom: 8 }}>Pengumuman Terkirim!</div>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 24 }}>Dikirim ke 180 mitra showroom · Flash Sale April 2026</div>
              <Btn variant="primary" onClick={() => setSent(false)}>Buat Pengumuman Baru</Btn>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.txt, marginBottom: 18 }}>📝 Tulis Pengumuman</div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Judul Pengumuman *</label>
                <input defaultValue="Flash Sale April 2026 — Pastikan Stok Siap!" style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none" }} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Isi Pengumuman *</label>
                <textarea defaultValue="Yth. Mitra Showroom DexHome,&#10;&#10;Flash Sale April 2026 akan segera dimulai! Pastikan stok produk Anda sudah diperbarui sebelum 25 Maret 2026.&#10;&#10;Terima kasih atas kerja sama Anda!" style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none", resize: "vertical", minHeight: 160 }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Kategori</label>
                  <select style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none", cursor: "pointer" }}>
                    <option>📣 Promosi</option><option>⚙️ Sistem</option><option>🎪 Event</option><option>📋 Kebijakan</option><option>🚨 Mendesak</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Prioritas</label>
                  <select style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`, borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none", cursor: "pointer" }}>
                    <option>Normal</option><option>Penting</option><option>Sangat Mendesak</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>Tujuan</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {["Semua Mitra (180)", "Mitra Verified (142)", "Mitra Spesifik"].map((opt, i) => (
                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.muted, cursor: "pointer" }}>
                      <input type="radio" name="target" defaultChecked={i === 0} style={{ accentColor: T.gold }} />{opt}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="primary" onClick={() => setSent(true)}>📢 Kirim Sekarang</Btn>
                <Btn variant="dark">💾 Simpan Draft</Btn>
              </div>
            </>
          )}
        </Card>

        {/* Past Announcements */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, marginBottom: 12 }}>Pengumuman Terdahulu</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {past.map((p, i) => (
              <Card key={i} style={{ padding: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.txt, marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 10, color: T.muted, marginBottom: 8 }}>{p.time} · {p.target}</div>
                <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
                  {p.tags.map(t => <Badge key={t} color="grey">{t}</Badge>)}
                </div>
                <div style={{ fontSize: 11, color: T.sage }}>👁 {p.reads} / 180 sudah baca</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CS Admin ───────────────────────────────────────────────────────────
function CSAdmin() {
  const tickets = [
    { id: "#TKT-0048", user: "Andi W.", issue: "Pertanyaan pengiriman sofa oversized", priority: "normal" as const, status: "open" as const, time: "10 mnt lalu", agent: "—" },
    { id: "#TKT-0045", user: "Siti R.", issue: "Klaim garansi kursi makan patah", priority: "high" as const, status: "open" as const, time: "1j lalu", agent: "—" },
    { id: "#TKT-0042", user: "Budi S.", issue: "Pertanyaan garansi Sofa Scandinavian", priority: "normal" as const, status: "answered" as const, time: "2j lalu", agent: "Rina" },
    { id: "#TKT-0040", user: "Maya L.", issue: "Konfirmasi jadwal pengiriman cermin", priority: "normal" as const, status: "answered" as const, time: "3j lalu", agent: "Dian" },
    { id: "#TKT-0038", user: "Deni P.", issue: "Aktivasi asuransi lampu rattan", priority: "normal" as const, status: "resolved" as const, time: "5j lalu", agent: "Rina" },
  ];

  const statusMap: Record<string, { color: "red" | "gold" | "blue" | "green" | "grey"; label: string }> = {
    open: { color: "red", label: "🔴 Terbuka" },
    answered: { color: "gold", label: "💬 Dijawab" },
    resolved: { color: "green", label: "✅ Selesai" },
  };

  return (
    <div className="fade-up">
      <SectionHeader label="Customer Service" title="CS Admin Panel" />

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Tiket Terbuka", value: "47", icon: "🔴", accent: T.terra },
          { label: "Rata-rata Respons", value: "2.4j", icon: "⏱️", accent: T.gold },
          { label: "Diselesaikan Hari Ini", value: "18", icon: "✅", accent: T.sage },
          { label: "Kepuasan (CSAT)", value: "4.8", icon: "⭐", accent: T.blue },
        ].map(k => (
          <Card key={k.label} style={{ padding: "14px 16px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: k.accent }} />
            <div style={{ fontSize: 18, marginBottom: 6 }}>{k.icon}</div>
            <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 2 }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.txt }}>{k.value}</div>
          </Card>
        ))}
      </div>

      <Card style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 16, fontWeight: 700, color: T.txt }}>Antrian Tiket</div>
          <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
            {["Semua","Terbuka","Dijawab","Selesai"].map((f, i) => (
              <button type="button" key={f} style={{ padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: i === 0 ? 600 : 500, cursor: "pointer", border: `1px solid ${i === 0 ? T.gold : T.border}`, background: i === 0 ? T.goldP : "none", color: i === 0 ? T.gold : T.muted }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {["ID","Customer","Masalah","Prioritas","Status","Waktu","Agent","Aksi"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <td style={{ padding: "11px 14px", fontSize: 11, color: T.muted, fontFamily: "monospace" }}>{t.id}</td>
                <td style={{ padding: "11px 14px", fontSize: 12, color: T.txt }}>{t.user}</td>
                <td style={{ padding: "11px 14px", fontSize: 12, color: T.txt, maxWidth: 200 }}>{t.issue}</td>
                <td style={{ padding: "11px 14px" }}><Badge color={t.priority === "high" ? "red" : "grey"}>{t.priority === "high" ? "🔺 Tinggi" : "Normal"}</Badge></td>
                <td style={{ padding: "11px 14px" }}><Badge color={statusMap[t.status].color}>{statusMap[t.status].label}</Badge></td>
                <td style={{ padding: "11px 14px", fontSize: 11, color: T.muted }}>{t.time}</td>
                <td style={{ padding: "11px 14px", fontSize: 12, color: T.muted }}>{t.agent}</td>
                <td style={{ padding: "11px 14px" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <Btn variant="dark" sm>Buka</Btn>
                    {t.status === "open" && <Btn variant="green" sm>Assign</Btn>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ── Mitra Map ──────────────────────────────────────────────────────────
function MitraMap() {
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 18 }}>
        {/* Map */}
        <Card style={{ overflow: "hidden" }}>
          <div style={{ height: 480, background: "linear-gradient(135deg, #1A2A1A 0%, #0F1F0F 40%, #162016 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ textAlign: "center", opacity: .5 }}>
              <div style={{ fontSize: 56, marginBottom: 8 }}>🗺️</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.txt }}>Peta Interaktif Indonesia</div>
              <div style={{ fontSize: 12, color: T.muted }}>Mapbox / Google Maps akan diintegrasikan</div>
            </div>
            {/* Mock city pins */}
            {[
              ["35%","52%","🟡","Jakarta","62"],
              ["32%","44%","🟡","Bandung","18"],
              ["62%","38%","🟡","Surabaya","14"],
              ["33%","30%","🟡","Semarang","8"],
              ["36%","42%","⚪","Yogyakarta","12"],
              ["65%","55%","⚪","Bali","9"],
            ].map(([t,l,c,city,cnt]) => (
              <div key={city} style={{ position: "absolute", top: t, left: l, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: c === "🟡" ? T.gold : T.surf2, border: "2px solid rgba(255,255,255,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,.4)", cursor: "pointer" }}>{cnt}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.7)", marginTop: 3, fontWeight: 600 }}>{city}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* City Breakdown */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, marginBottom: 12 }}>Sebaran per Kota</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cities.map(c => (
              <Card key={c.city} style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 18, width: 28 }}>{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>{c.city}</div>
                  <div style={{ height: 4, background: T.surf3, borderRadius: 100, marginTop: 6 }}>
                    <div style={{ height: "100%", width: `${(c.count / 180) * 100}%`, background: T.gold, borderRadius: 100 }} />
                  </div>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: T.gold, flexShrink: 0 }}>{c.count}</span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Portal ────────────────────────────────────────────────────────
type Section = "overview" | "addprod" | "prodlist" | "mitra" | "announce" | "cs" | "map";

export default function AdminPortal() {
  const [active, setActive] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navGroups = [
    {
      label: "Platform",
      items: [
        { id: "overview" as Section, icon: "📊", label: "Overview" },
      ],
    },
    {
      label: "Produk",
      items: [
        { id: "addprod" as Section, icon: "➕", label: "Tambah Produk" },
        { id: "prodlist" as Section, icon: "📋", label: "Daftar Produk" },
      ],
    },
    {
      label: "Mitra & Komunikasi",
      items: [
        { id: "mitra" as Section, icon: "🏬", label: "Kelola Mitra" },
        { id: "announce" as Section, icon: "📢", label: "Pengumuman" },
        { id: "map" as Section, icon: "🗺️", label: "Peta Mitra" },
      ],
    },
    {
      label: "Customer",
      items: [
        { id: "cs" as Section, icon: "🎧", label: "CS Admin", badge: 47 },
      ],
    },
  ];

  const titles: Record<Section, string> = {
    overview: "Overview",
    addprod: "Tambah Produk",
    prodlist: "Daftar Produk",
    mitra: "Kelola Mitra",
    announce: "Pengumuman",
    cs: "CS Admin",
    map: "Peta Mitra",
  };

  return (
    <div className="portal-shell" style={{ background: T.bg }}>
      <div className={`sidebar-overlay${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`portal-sidebar${sidebarOpen ? " open" : ""}`} style={{ background: T.surf, borderRight: `1px solid ${T.border}` }}>
        <div style={{ padding: "22px 20px 16px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 22, fontWeight: 700, color: T.txt }}>Dex<span style={{ color: T.gold }}>Home</span></div>
          <div style={{ fontSize: 9, color: T.muted, letterSpacing: ".1em", textTransform: "uppercase", marginTop: 2 }}>Center Admin</div>
        </div>

        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: `linear-gradient(135deg, ${T.gold}, ${T.terra})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0 }}>SA</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>Super Admin</div>
            <div style={{ fontSize: 10, color: T.gold, fontWeight: 600 }}>Center Admin</div>
          </div>
        </div>

        <nav style={{ padding: "12px 8px", flex: 1, overflow: "auto" }}>
          {navGroups.map(group => (
            <div key={group.label}>
              <div style={{ fontSize: 9, fontWeight: 700, color: T.muted2, letterSpacing: ".1em", textTransform: "uppercase", padding: "0 10px", margin: "12px 0 5px" }}>{group.label}</div>
              {group.items.map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                  className="nav-item"
                  style={{
                    background: active === item.id ? T.goldP : "none",
                    color: active === item.id ? T.gold : T.muted,
                    fontWeight: active === item.id ? 600 : 500,
                    border: active === item.id ? `1px solid rgba(201,150,42,.2)` : "1px solid transparent",
                  }}
                >
                  <span style={{ fontSize: 16, width: 18, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                  {item.label}
                  {"badge" in item && item.badge && <span className="nav-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div style={{ padding: "10px 8px", borderTop: `1px solid ${T.border}` }}>
          <button type="button" className="nav-item" style={{ color: T.muted }}>
            <span style={{ fontSize: 16, width: 18, textAlign: "center" }}>🚪</span>Keluar
          </button>
        </div>
      </aside>

      {/* Topbar */}
      <header className="portal-topbar" style={{ background: `rgba(15,15,18,.95)`, borderBottom: `1px solid ${T.border}` }}>
        <button type="button" className="ham-btn" onClick={() => setSidebarOpen(true)} style={{ width: 34, height: 34, borderRadius: 8, background: "none", border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 17, color: T.txt }}>☰</button>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: T.txt }}>{titles[active]}</div>
          <div style={{ fontSize: 11, color: T.muted }}>DexHome Admin <span style={{ color: T.muted2 }}>/</span> {titles[active]}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <div className="search-bar" style={{ background: T.surf2, border: `1px solid ${T.border2}` }}>
            <span style={{ color: T.muted, fontSize: 13 }}>🔍</span>
            <input placeholder="Cari produk, mitra..." style={{ color: T.txt, fontSize: 12 }} />
          </div>
          <button type="button" className="icon-btn" style={{ background: T.surf2, border: `1px solid ${T.border}`, color: T.txt }}>
            🔔<div className="notif-dot" />
          </button>
          <button type="button" className="icon-btn" style={{ background: T.surf2, border: `1px solid ${T.border}`, color: T.txt }}>📋</button>
          <Btn variant="primary" sm onClick={() => setActive("addprod")}>+ Produk Baru</Btn>
        </div>
      </header>

      <main className="portal-main" style={{ padding: "24px 28px" }}>
        {active === "overview" && <Overview />}
        {active === "addprod" && <AddProduct />}
        {active === "prodlist" && <ProductList />}
        {active === "mitra" && <MitraManagement />}
        {active === "announce" && <SendAnnouncement />}
        {active === "cs" && <CSAdmin />}
        {active === "map" && <MitraMap />}
      </main>
    </div>
  );
}
