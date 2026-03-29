"use client";
import { useState } from "react";

const T = {
  bg: "#F7F3EE",
  warm: "#FDFAF5",
  card: "#fff",
  brown: "#2C1810",
  brown2: "#3D2318",
  gold: "#C9962A",
  goldL: "#E8B84B",
  goldP: "rgba(201,150,42,.10)",
  terra: "#C4572A",
  sage: "#7A8C6E",
  blue: "#4A90D9",
  muted: "#8A7F74",
  border: "#E2D8C8",
  border2: "#D4C8B4",
};

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: T.card, borderRadius: 13, border: `1px solid ${T.border}`, boxShadow: "0 2px 16px rgba(44,24,16,.07)", ...style }}>{children}</div>;
}

function Badge({ color, children }: { color: "gold" | "green" | "red" | "grey" | "blue"; children: React.ReactNode }) {
  const map = {
    gold: { bg: "rgba(201,150,42,.12)", color: T.gold },
    green: { bg: "rgba(122,140,110,.12)", color: T.sage },
    red: { bg: "rgba(196,87,42,.10)", color: T.terra },
    grey: { bg: T.bg, color: T.muted },
    blue: { bg: "rgba(74,144,217,.10)", color: T.blue },
  };
  return <span style={{ ...map[color], display: "inline-flex", alignItems: "center", gap: 3, padding: "3px 8px", borderRadius: 100, fontSize: 10, fontWeight: 700 }}>{children}</span>;
}

function Btn({ variant = "primary", sm, onClick, children }: { variant?: "primary" | "gold" | "outline"; sm?: boolean; onClick?: () => void; children: React.ReactNode }) {
  const styles = {
    primary: { background: T.brown, color: "#fff" },
    gold: { background: T.gold, color: "#fff" },
    outline: { background: "none", border: `1.5px solid ${T.border}`, color: T.brown },
  };
  return <button type="button" onClick={onClick} style={{ padding: sm ? "5px 12px" : "8px 18px", borderRadius: 9, fontSize: sm ? 11 : 12, fontWeight: 600, cursor: "pointer", transition: "all .2s", border: "none", display: "inline-flex", alignItems: "center", gap: 6, ...styles[variant] }}>{children}</button>;
}

// ── Announcements ──────────────────────────────────────────────────────
function Announcements() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Semua");
  const tabs = ["Semua", "📣 Promosi", "⚙️ Sistem", "🎪 Event", "🚨 Mendesak", "✅ Sudah Dibaca"];

  const announcements = [
    {
      id: 1, unread: true, icon: "📣", iconColor: T.gold, iconBg: T.goldP,
      title: "Flash Sale April 2026 — Pastikan Stok Siap!",
      time: "Hari ini, 09.00",
      preview: "Flash Sale April akan mulai 1–15 April 2026. Pastikan semua produk Anda sudah update stok sebelum 25 Maret. Diskon yang berlaku: pelanggan mendapat potongan hingga 40%...",
      tags: [{ color: "gold" as const, label: "📣 Promosi" }, { color: "red" as const, label: "🚨 Penting" }],
      target: "Semua Mitra",
      content: `Yth. Mitra Showroom DexHome,\n\nFlash Sale April 2026 akan segera dimulai! Berikut hal yang perlu Anda persiapkan:\n\n• Update stok produk paling lambat 25 Maret 2026\n• Koordinasi pengiriman — tim logistik DexHome siap membantu\n• Diskon otomatis akan diterapkan platform, tidak perlu action dari Anda\n• Estimasi peningkatan order 3–5× dari hari normal`,
    },
    {
      id: 2, unread: true, icon: "⚙️", iconColor: T.blue, iconBg: "rgba(74,144,217,.1)",
      title: "Update Sistem DexHome v2.4 — Fitur Baru untuk Mitra",
      time: "15 Mar 2026",
      preview: "Versi terbaru DexHome kini hadir. Panel admin baru dengan tampilan stok yang diperbarui, notifikasi order real-time, dan laporan penjualan mingguan otomatis...",
      tags: [{ color: "blue" as const, label: "⚙️ Sistem" }],
      target: "Semua Mitra",
      content: "Pembaruan besar untuk panel mitra DexHome:\n\n• Dashboard Stok Real-time — lihat level stok langsung\n• Notifikasi Order Instan — push notification pesanan baru\n• Laporan Penjualan Mingguan — otomatis terkirim ke email\n• Chat CS Terintegrasi — koordinasi langsung via panel\n• Galeri Foto Diperbaiki — upload hingga 12 foto produk",
    },
    {
      id: 3, unread: true, icon: "🎪", iconColor: T.sage, iconBg: "rgba(122,140,110,.1)",
      title: "DexHome Expo 2026 — Undangan Mitra Showroom",
      time: "10 Mar 2026",
      preview: "Anda diundang untuk berpartisipasi di DexHome Expo 2026, pameran furnitur terbesar tahun ini di Jakarta Convention Center, 20–22 Juni 2026...",
      tags: [{ color: "green" as const, label: "🎪 Event" }],
      target: "Mitra Verified",
      content: "DexHome Expo 2026:\n\n• Tanggal: 20–22 Juni 2026\n• Lokasi: Jakarta Convention Center, Hall A & B\n• Booth size: 6m × 4m (standar) atau 12m × 6m (premium)\n• Estimasi pengunjung: 15.000+ per hari\n• Biaya booth mitra verified: GRATIS untuk slot standar\n\nKonfirmasi partisipasi paling lambat 30 April 2026.",
    },
    {
      id: 4, unread: false, icon: "📋", iconColor: T.muted, iconBg: T.bg,
      title: "Kebijakan Pengembalian Barang — Pembaruan SOP",
      time: "01 Mar 2026",
      preview: "Pembaruan standar prosedur operasional pengembalian barang berlaku mulai 1 April 2026. Silakan pelajari dokumen terlampir...",
      tags: [{ color: "grey" as const, label: "📋 Kebijakan" }],
      target: "Semua Mitra",
      content: "SOP Pengembalian Barang diperbarui efektif 1 April 2026. Lihat dokumen terlampir untuk detail lengkap.",
    },
  ];

  return (
    <div className="fade-up">
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${T.brown}, ${T.brown2})`, borderRadius: 16, padding: "22px 26px", marginBottom: 22, display: "flex", alignItems: "center", gap: 18, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160, background: `radial-gradient(circle, ${T.goldP}, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ width: 54, height: 54, borderRadius: 14, background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, position: "relative", zIndex: 1 }}>📢</div>
        <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 5 }}>Selamat Datang, Homera Studio! 👋</h2>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>Ada <strong style={{ color: T.gold }}>3 pengumuman baru</strong> yang perlu Anda baca hari ini</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 4 }}>Terakhir login: Rabu, 18 Mar 2026 pukul 14.30 WIB</p>
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 36, fontWeight: 700, color: T.gold, lineHeight: 1 }}>3</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 2 }}>Belum Dibaca</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {tabs.map(tab => (
          <button type="button" key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "6px 16px", borderRadius: 100, fontSize: 12, fontWeight: activeTab === tab ? 600 : 500, cursor: "pointer", transition: "all .2s",
            border: `1.5px solid ${activeTab === tab ? T.brown : T.border}`,
            background: activeTab === tab ? T.brown : T.card,
            color: activeTab === tab ? "#fff" : T.muted,
          }}>{tab}</button>
        ))}
      </div>

      {/* Announcement Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {announcements.map(ann => (
          <Card key={ann.id} style={{ overflow: "hidden", opacity: ann.unread ? 1 : .75, cursor: "pointer" }}>
            {/* Header row */}
            <div
              onClick={() => setExpandedId(expandedId === ann.id ? null : ann.id)}
              style={{ padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 11, background: ann.iconBg, border: `1px solid ${ann.iconColor}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{ann.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.brown, lineHeight: 1.3 }}>{ann.title}</div>
                  <div style={{ fontSize: 11, color: T.muted, flexShrink: 0, marginLeft: 12 }}>{ann.time}</div>
                </div>
                <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.5, marginBottom: 10, display: expandedId === ann.id ? "none" : "block" }}>{ann.preview}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {ann.tags.map(t => <Badge key={t.label} color={t.color}>{t.label}</Badge>)}
                  <span style={{ fontSize: 10, color: T.muted, marginLeft: 4 }}>Ditujukan ke: {ann.target}</span>
                  {ann.unread && <span style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: T.terra, display: "inline-block" }} />}
                </div>
              </div>
            </div>

            {/* Expanded */}
            {expandedId === ann.id && (
              <div style={{ padding: "0 20px 20px 78px", borderTop: `1px solid ${T.border}` }}>
                <div style={{ paddingTop: 16, fontSize: 13, color: T.brown, lineHeight: 1.8, whiteSpace: "pre-line" }}>{ann.content}</div>
                {ann.id === 1 && (
                  <div style={{ marginTop: 14, padding: "12px 14px", background: T.bg, borderRadius: 10, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 20 }}>📄</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: T.brown }}>Panduan Flash Sale April 2026.pdf</div>
                      <div style={{ fontSize: 10, color: T.muted }}>PDF · 2.4 MB</div>
                    </div>
                    <Btn variant="outline" sm>⬇ Unduh</Btn>
                  </div>
                )}
                {ann.id === 3 && (
                  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                    <Btn variant="primary">✅ Konfirmasi Ikut</Btn>
                    <Btn variant="outline">Tidak Bisa Ikut</Btn>
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

// ── Katalog ────────────────────────────────────────────────────────────
function KatalogMitra() {
  const products = [
    { icon: "🛋️", name: "Sofa Modular Scandinavian", sku: "HMS-SOFA-001", price: "Rp 8.500.000", stock: 28, status: "active" as const },
    { icon: "🪑", name: "Kursi Makan Solid Oak", sku: "HMS-CHAIR-003", price: "Rp 2.800.000", stock: 15, status: "active" as const },
    { icon: "🛏️", name: "Headboard Bouclé", sku: "HMS-BED-007", price: "Rp 3.400.000", stock: 6, status: "active" as const },
    { icon: "🪞", name: "Cermin Dressing Brass", sku: "HMS-MIR-002", price: "Rp 1.900.000", stock: 0, status: "inactive" as const },
    { icon: "💡", name: "Lampu Gantung Rattan", sku: "HMS-LMP-011", price: "Rp 1.250.000", stock: 42, status: "active" as const },
    { icon: "🛋️", name: "Sofa Satu Dudukan", sku: "HMS-SOFA-005", price: "Rp 3.200.000", stock: 2, status: "active" as const },
  ];

  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: 4 }}>Produk Saya</div>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 22, fontWeight: 700, color: T.brown }}>Katalog Showroom</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="outline" sm>⬇ Export</Btn>
          <Btn variant="primary" sm>+ Ajukan Produk</Btn>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Total Produk", value: "6", icon: "📦", accent: T.gold },
          { label: "Produk Aktif", value: "5", icon: "✅", accent: T.sage },
          { label: "Stok Habis", value: "1", icon: "⚠️", accent: T.terra },
          { label: "Total Stok", value: "93", icon: "📊", accent: T.blue },
        ].map(s => (
          <Card key={s.label} style={{ padding: "14px 16px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.accent }} />
            <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: T.brown }}>{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {["Produk","SKU","Harga","Stok","Status","Aksi"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.sku} style={{ borderBottom: `1px solid ${T.border}` }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{p.icon}</div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.brown }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 11, color: T.muted, fontFamily: "monospace" }}>{p.sku}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: T.brown }}>{p.price}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: p.stock === 0 ? T.terra : p.stock <= 5 ? "#E8A020" : T.sage }}>{p.stock}</span>
                  {p.stock === 0 && <Badge color="red">Habis</Badge>}
                  {p.stock > 0 && p.stock <= 5 && <span style={{ fontSize: 10, color: "#E8A020", marginLeft: 6 }}>⚠️ Menipis</span>}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <Badge color={p.status === "active" ? "green" : "grey"}>{p.status === "active" ? "● Aktif" : "○ Nonaktif"}</Badge>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Btn variant="outline" sm>Edit</Btn>
                    <Btn variant="outline" sm>Stok</Btn>
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

// ── Community ──────────────────────────────────────────────────────────
function Community() {
  const posts = [
    { avatar: "🏢", name: "Homera Studio", time: "2 jam lalu", content: "Teman-teman mitra, ada yang sudah coba sistem notifikasi order baru? Rasanya lebih cepat ya untuk konfirmasi pesanan.", likes: 12, replies: 8, tags: ["Tips", "Sistem"] },
    { avatar: "🪵", name: "Woodcraft Co.", time: "5 jam lalu", content: "Sharing pengalaman Flash Sale Maret kemarin: order naik 4x tapi tim logistik DexHome sangat membantu. Rekomendasi untuk persiapkan stok extra minimal 2 minggu sebelum event.", likes: 28, replies: 15, tags: ["Flash Sale", "Tips"] },
    { avatar: "💡", name: "LuxeLight ID", time: "1 hari lalu", content: "Pertanyaan: untuk produk dengan berat >50kg, siapa yang handle koordinasi instalasi ke customer? Apakah dari mitra atau ada tim DexHome?", likes: 7, replies: 22, tags: ["Pertanyaan", "Logistik"] },
    { avatar: "🍃", name: "Teak & Grain", time: "2 hari lalu", content: "Update: fotografi produk kami baru selesai dikerjakan, kini stok foto sudah di-upload semua. Terima kasih tim admin DexHome yang bantu review 🙏", likes: 19, replies: 5, tags: ["Update"] },
  ];

  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: 4 }}>Forum</div>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 22, fontWeight: 700, color: T.brown }}>Komunitas Mitra</div>
        </div>
        <Btn variant="primary">+ Buat Postingan</Btn>
      </div>

      {/* New post input */}
      <Card style={{ padding: "16px 18px", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🏢</div>
          <div style={{ flex: 1 }}>
            <textarea
              placeholder="Bagikan info, tanya, atau diskusi dengan sesama mitra..."
              style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, outline: "none", resize: "none", fontFamily: "var(--font-dm-sans, sans-serif)", color: T.brown, background: T.bg, minHeight: 60 }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
              <Btn variant="primary" sm>📤 Posting</Btn>
            </div>
          </div>
        </div>
      </Card>

      {/* Posts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {posts.map((post, i) => (
          <Card key={i} style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: T.bg, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{post.avatar}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.brown }}>{post.name}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{post.time}</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: T.brown, lineHeight: 1.6, marginBottom: 12 }}>{post.content}</p>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {post.tags.map(t => <span key={t} style={{ padding: "2px 9px", borderRadius: 100, background: T.goldP, border: `1px solid ${T.gold}30`, color: T.gold, fontSize: 10, fontWeight: 600 }}>{t}</span>)}
            </div>
            <div style={{ display: "flex", gap: 14, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
              <button type="button" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: T.muted, display: "flex", alignItems: "center", gap: 5 }}>👍 {post.likes}</button>
              <button type="button" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: T.muted, display: "flex", alignItems: "center", gap: 5 }}>💬 {post.replies} Balasan</button>
              <button type="button" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: T.muted }}>🔗 Bagikan</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Main Portal ────────────────────────────────────────────────────────
type Section = "announce" | "katalog" | "community";

export default function MitraPortal() {
  const [active, setActive] = useState<Section>("announce");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: { id: Section; icon: string; label: string; badge?: number }[] = [
    { id: "announce", icon: "📢", label: "Pengumuman", badge: 3 },
    { id: "katalog", icon: "📦", label: "Katalog Saya" },
    { id: "community", icon: "💬", label: "Komunitas Mitra" },
  ];

  const titles: Record<Section, string> = {
    announce: "Pengumuman",
    katalog: "Katalog Saya",
    community: "Komunitas Mitra",
  };

  return (
    <div className="portal-shell" style={{ background: T.bg }}>
      <div className={`sidebar-overlay${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`portal-sidebar${sidebarOpen ? " open" : ""}`} style={{ background: `linear-gradient(180deg, ${T.brown} 0%, #1A0E08 100%)` }}>
        <div style={{ padding: "22px 20px 16px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 22, fontWeight: 700, color: "#fff" }}>Dex<span style={{ color: T.gold }}>Home</span></div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: T.goldP, border: `1px solid rgba(201,150,42,.3)`, borderRadius: 5, padding: "2px 8px", marginTop: 5 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: T.gold, letterSpacing: ".08em", textTransform: "uppercase" }}>Mitra Portal</span>
          </div>
        </div>

        <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🏢</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Homera Studio</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", fontFamily: "monospace" }}>MTR-0001</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: T.sage, fontWeight: 600, marginTop: 2 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.sage, display: "inline-block" }} />Aktif & Verified
            </div>
          </div>
        </div>

        <nav style={{ padding: "12px 8px", flex: 1 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.25)", letterSpacing: ".1em", textTransform: "uppercase", padding: "0 10px", margin: "12px 0 5px" }}>Menu</div>
          {navItems.map(item => (
            <button
              type="button"
              key={item.id}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
              className="nav-item"
              style={{ background: active === item.id ? T.gold : "none", color: active === item.id ? "#fff" : "rgba(255,255,255,.55)", fontWeight: active === item.id ? 700 : 500 }}
            >
              <span style={{ fontSize: 16, width: 18, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
          <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.25)", letterSpacing: ".1em", textTransform: "uppercase", padding: "0 10px", margin: "14px 0 5px" }}>Akun</div>
          {[["👤","Profil Mitra"],["📊","Laporan Penjualan"],["🎧","Hubungi Admin"]].map(([ico,lbl]) => (
            <button type="button" key={lbl} className="nav-item" style={{ color: "rgba(255,255,255,.45)" }}>
              <span style={{ fontSize: 16, width: 18, textAlign: "center" }}>{ico}</span>{lbl}
            </button>
          ))}
        </nav>

        <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
          <button type="button" className="nav-item" style={{ color: "rgba(255,255,255,.45)" }}>
            <span style={{ fontSize: 16, width: 18, textAlign: "center" }}>🚪</span>Keluar
          </button>
        </div>
      </aside>

      {/* Topbar */}
      <header className="portal-topbar" style={{ background: "rgba(253,250,245,.97)", borderBottom: `1px solid ${T.border}` }}>
        <button type="button" className="ham-btn" onClick={() => setSidebarOpen(true)} style={{ width: 36, height: 36, borderRadius: 8, background: "none", border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 17, color: T.brown }}>☰</button>
        <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 17, fontWeight: 700, color: T.brown }}>{titles[active]}</div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 9 }}>
          <div className="search-bar" style={{ background: T.bg, border: `1.5px solid ${T.border}` }}>
            <span style={{ color: T.muted, fontSize: 13 }}>🔍</span>
            <input placeholder="Cari pengumuman, produk..." style={{ color: T.brown, fontSize: 12 }} />
          </div>
          <button type="button" className="icon-btn" style={{ background: T.bg, border: `1.5px solid ${T.border}` }}>
            🔔<div className="notif-dot" />
          </button>
        </div>
      </header>

      <main className="portal-main" style={{ padding: "26px 30px" }}>
        {active === "announce" && <Announcements />}
        {active === "katalog" && <KatalogMitra />}
        {active === "community" && <Community />}
      </main>
    </div>
  );
}
