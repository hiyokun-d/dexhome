"use client";
import { useState } from "react";

// ── Theme ──────────────────────────────────────────────────────────────
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

// ── Shared Components ──────────────────────────────────────────────────
function Card({ children, style, ...rest }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) {
  return (
    <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, boxShadow: "0 4px 24px rgba(44,24,16,.08)", ...style }} {...rest}>
      {children}
    </div>
  );
}

function Badge({ color, children }: { color: "gold" | "green" | "red" | "grey" | "blue"; children: React.ReactNode }) {
  const map = {
    gold: { bg: "rgba(201,150,42,.13)", color: T.gold },
    green: { bg: "rgba(122,140,110,.13)", color: T.sage },
    red: { bg: "rgba(196,87,42,.11)", color: T.terra },
    grey: { bg: T.bg, color: T.muted },
    blue: { bg: "rgba(74,144,217,.11)", color: "#4A90D9" },
  };
  return (
    <span style={{ ...map[color], display: "inline-flex", alignItems: "center", gap: 3, padding: "3px 9px", borderRadius: 100, fontSize: 10, fontWeight: 700 }}>
      {children}
    </span>
  );
}

function Btn({ variant = "primary", sm, onClick, children }: {
  variant?: "primary" | "gold" | "outline";
  sm?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const styles = {
    primary: { background: T.brown, color: "#fff" },
    gold: { background: T.gold, color: "#fff" },
    outline: { background: "none", border: `1.5px solid ${T.border}`, color: T.char },
  };
  return (
    <button
      onClick={onClick}
      style={{
        padding: sm ? "5px 13px" : "8px 18px",
        borderRadius: 9,
        fontSize: sm ? 11 : 13,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all .2s",
        border: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        ...styles[variant],
      }}
    >
      {children}
    </button>
  );
}

function SectionHeader({ label, title, action }: { label: string; title: string; action?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span style={{ width: 16, height: 2, background: T.gold, display: "inline-block" }} />
          {label}
        </div>
        <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 22, fontWeight: 700, color: T.brown }}>{title}</div>
      </div>
      {action}
    </div>
  );
}

// ── Pages ──────────────────────────────────────────────────────────────

function Dashboard() {
  const kpis = [
    { icon: "⭐", label: "Total Poin", value: "4.820", sub: "≈ Rp 48.200 · ↑ +320 bulan ini", accent: T.gold },
    { icon: "🛍️", label: "Total Belanja", value: "Rp 34,7jt", sub: "18 transaksi · 3 bulan ini", accent: T.terra },
    { icon: "🎫", label: "Voucher Aktif", value: "3", sub: "Exp: 31 Mar 2026", accent: "#4A90D9" },
    { icon: "🛡️", label: "Produk Diasuransikan", value: "4", sub: "Semua aktif & terlindungi", accent: T.sage },
  ];

  const orders = [
    { icon: "🛋️", name: "Sofa Scandinavian", brand: "Homera Studio · #DXH-2603-0041", price: "Rp 8.500.000", pts: "+850", status: "green" as const, statusLabel: "✓ Selesai" },
    { icon: "🪞", name: "Cermin Arch", brand: "MirrorMade · #DXH-2603-0039", price: "Rp 2.100.000", pts: "+210", status: "gold" as const, statusLabel: "🚚 Dikirim" },
    { icon: "💡", name: "Lampu Rattan", brand: "LuxeLight ID · #DXH-2602-0031", price: "Rp 1.250.000", pts: "+125", status: "green" as const, statusLabel: "✓ Selesai" },
    { icon: "🛏️", name: "Ranjang Oak King", brand: "Woodcraft Co. · #DXH-2601-0018", price: "Rp 12.200.000", pts: "+1.220", status: "green" as const, statusLabel: "✓ Selesai" },
    { icon: "🍽️", name: "Meja Makan Jati", brand: "Teak & Grain · #DXH-2512-0009", price: "Rp 5.800.000", pts: "+580", status: "red" as const, statusLabel: "↩ Klaim" },
  ];

  const points = [
    { icon: "⭐", type: "earn", title: "Pembelian Sofa Scandinavian", date: "15 Mar 2026", val: "+850" },
    { icon: "🎁", type: "bonus", title: "Bonus Check-in Bulanan", date: "01 Mar 2026", val: "+100" },
    { icon: "🎫", type: "redeem", title: "Ditukar: Voucher Rp 50rb", date: "25 Feb 2026", val: "−500" },
    { icon: "⭐", type: "earn", title: "Pembelian Cermin Arch", date: "08 Mar 2026", val: "+210" },
  ];

  const vouchers = [
    { icon: "🎫", name: "Diskon Member", val: "Rp 50.000", exp: "31 Mar 2026", code: "DHGOLD50" },
    { icon: "🚚", name: "Gratis Ongkir", val: "100%", exp: "15 Apr 2026", code: "DHFREE" },
    { icon: "💎", name: "Cashback Gold", val: "10%", exp: "30 Apr 2026", code: "DHCB10" },
  ];

  return (
    <div className="fade-up">
      {/* Greeting */}
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 28, fontWeight: 700, color: T.brown }}>Selamat Pagi, Budi! 👋</h1>
        <p style={{ fontSize: 14, color: T.muted, marginTop: 3 }}>Kamis, 19 Maret 2026 · 2 pesanan sedang diproses</p>
      </div>

      {/* Membership Card */}
      <div style={{
        background: T.brown, borderRadius: 18, padding: "26px 28px", marginBottom: 22,
        display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", width: 220, height: 220, background: "radial-gradient(circle,rgba(201,150,42,.2),transparent 70%)", top: -60, right: -40, borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: T.gold, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 12px", borderRadius: 100, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 10 }}>👑 Gold Member</div>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Budi Santoso</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.6)" }}>Total Poin: <strong style={{ fontSize: 18, color: T.gold, fontFamily: "var(--font-playfair, serif)" }}>4.820 pts</strong></div>
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,.45)", marginBottom: 6 }}>
              <span>Gold → Platinum</span><span>4.820 / 10.000 pts</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,.12)", borderRadius: 100 }}>
              <div style={{ height: "100%", width: "48.2%", background: T.gold, borderRadius: 100 }} />
            </div>
          </div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 8 }}>
            Butuh <strong style={{ color: T.gold }}>5.180 poin</strong> lagi untuk naik ke Platinum
          </p>
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", border: "3px solid rgba(201,150,42,.35)", background: "rgba(255,255,255,.06)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: T.gold }}>48%</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)" }}>Menuju Platinum</div>
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginBottom: 8 }}>Berlaku s.d. Des 2026</div>
          <Btn variant="gold" sm>Tukar Poin →</Btn>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
        {kpis.map((k) => (
          <Card key={k.label} style={{ padding: "16px 18px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: k.accent }} />
            <div style={{ fontSize: 22, marginBottom: 8 }}>{k.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: T.brown, marginBottom: 5 }}>{k.value}</div>
            <div style={{ fontSize: 11, color: T.muted }}>{k.sub}</div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: "flex", gap: 12, marginBottom: 22 }}>
        {[["🛍️","Belanja"],["📦","Pesanan"],["🛡️","Garansi"],["💬","Bantuan"],["🎫","Voucher"]].map(([icon,label]) => (
          <div key={label} style={{ flex: 1, background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 10px", textAlign: "center", cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = T.gold; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = T.border; }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.brown }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {/* Recent Orders */}
        <Card style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: 2 }}>Riwayat</div>
              <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 17, fontWeight: 700, color: T.brown }}>Pembelian Terbaru</div>
            </div>
            <Btn variant="outline" sm>Lihat Semua</Btn>
          </div>
          <table className="data-table" style={{ "--border-color": T.border } as React.CSSProperties}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {["Produk","Total","Poin","Status"].map(h => (
                  <th key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted, padding: "10px 16px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.name} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, border: `1px solid ${T.border}` }}>{o.icon}</div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.brown }}>{o.name}</div>
                        <div style={{ fontSize: 10, color: T.muted }}>{o.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: T.brown }}>{o.price}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 700, color: T.sage }}>{o.pts}</td>
                  <td style={{ padding: "12px 16px" }}><Badge color={o.status}>{o.statusLabel}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Points Activity */}
          <Card style={{ padding: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: 3 }}>Poin</div>
            <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 16, fontWeight: 700, color: T.brown, marginBottom: 14 }}>Aktivitas Poin</div>
            {points.map((p) => (
              <div key={p.title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: p.type === "redeem" ? "rgba(196,87,42,.1)" : p.type === "bonus" ? "rgba(74,144,217,.1)" : T.goldP, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{p.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: T.brown }}>{p.title}</div>
                  <div style={{ fontSize: 10, color: T.muted }}>{p.date}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: p.val.startsWith("−") ? T.terra : T.sage }}>{p.val}</div>
              </div>
            ))}
          </Card>

          {/* Vouchers */}
          <Card style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: 2 }}>Voucher</div>
                <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 16, fontWeight: 700, color: T.brown }}>Voucher Aktif</div>
              </div>
              <Btn variant="outline" sm>+ Tukar</Btn>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {vouchers.map((v) => (
                <div key={v.name} style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: `1px solid ${T.border}` }}>
                  <div style={{ background: T.brown, padding: "12px 10px", display: "flex", alignItems: "center", justifyContent: "center", minWidth: 52, fontSize: 20 }}>
                    {v.icon}
                  </div>
                  <div style={{ padding: "10px 14px", flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.brown }}>{v.name}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.gold }}>{v.val}</div>
                    <div style={{ fontSize: 10, color: T.muted }}>Exp: {v.exp}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", paddingRight: 12 }}>
                    <Btn variant="outline" sm>Pakai →</Btn>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Katalog() {
  const [activeChip, setActiveChip] = useState("Semua");
  const chips = ["Semua","🛋️ Ruang Tamu","🛏️ Kamar Tidur","🍽️ Ruang Makan","💡 Dekorasi","🪴 Outdoor","⭐ Rating Tinggi","🏷️ Promo"];

  const products = [
    { icon: "🛋️", name: "Sofa Modular Scandinavian", brand: "Homera Studio", price: "Rp 8.500.000", orig: "Rp 10.000.000", pts: "+850", rating: "4.9", reviews: "128", badge: "🏷️ Promo" },
    { icon: "🛏️", name: "Ranjang Platform Oak", brand: "Woodcraft Co.", price: "Rp 12.200.000", orig: null, pts: "+1.220", rating: "4.8", reviews: "84", badge: null },
    { icon: "💡", name: "Lampu Rattan Wabi-Sabi", brand: "LuxeLight ID", price: "Rp 1.250.000", orig: "Rp 1.600.000", pts: "+125", rating: "4.7", reviews: "256", badge: "🏷️ Promo" },
    { icon: "🍽️", name: "Meja Makan Jati Solid", brand: "Teak & Grain", price: "Rp 5.800.000", orig: null, pts: "+580", rating: "4.9", reviews: "62", badge: null },
    { icon: "🪞", name: "Cermin Arch Brass", brand: "MirrorMade", price: "Rp 2.100.000", orig: null, pts: "+210", rating: "4.6", reviews: "41", badge: null },
    { icon: "🪴", name: "Pot Terracotta Minimalis", brand: "Greenspace", price: "Rp 380.000", orig: "Rp 450.000", pts: "+38", rating: "4.8", reviews: "310", badge: "🏷️ Promo" },
  ];

  return (
    <div className="fade-up">
      <SectionHeader label="Produk" title="Katalog Lengkap" action={
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="outline" sm>⊞ Grid</Btn>
          <Btn variant="primary" sm>🗺️ Lihat Peta</Btn>
        </div>
      } />

      {/* Location Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${T.brown}, ${T.brown2})`, borderRadius: 14,
        padding: "16px 22px", display: "flex", alignItems: "center", gap: 14, marginBottom: 20,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, background: "radial-gradient(circle,rgba(201,150,42,.15),transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ width: 46, height: 46, borderRadius: 11, background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📍</div>
        <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Menampilkan mitra terdekat dari lokasi Anda</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", marginTop: 2 }}>Produk diurutkan dari showroom terdekat untuk estimasi pengiriman terbaik</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>🏬 4 showroom dalam 5km</div>
          <Btn variant="gold" sm>📍 Jakarta Selatan ▾</Btn>
        </div>
      </div>

      {/* Chips */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => setActiveChip(c)}
            style={{
              padding: "6px 16px", borderRadius: 100, fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all .2s",
              border: `1.5px solid ${activeChip === c ? T.brown : T.border}`,
              background: activeChip === c ? T.brown : T.card,
              color: activeChip === c ? "#fff" : T.muted,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
        {/* Filter Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { title: "Kategori", items: ["Semua (124)", "Ruang Tamu (38)", "Kamar Tidur (29)", "Ruang Makan (21)", "Dekorasi & Lampu (36)"] },
            { title: "Brand Mitra", items: ["Homera Studio (18)", "Woodcraft Co. (14)", "Teak & Grain (11)", "LuxeLight ID (22)", "MirrorMade (9)"] },
          ].map((panel) => (
            <Card key={panel.title} style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.brown }}>{panel.title}</div>
                <button style={{ fontSize: 10, color: T.muted, background: "none", border: "none", cursor: "pointer" }}>Reset</button>
              </div>
              {panel.items.map((item, i) => (
                <label key={item} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8, cursor: "pointer" }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${i === 0 ? T.gold : T.border}`, background: i === 0 ? T.gold : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0, color: "#fff" }}>{i === 0 ? "✓" : ""}</div>
                  <span style={{ fontSize: 12, color: T.brown, flex: 1 }}>{item.split(" (")[0]}</span>
                  <span style={{ fontSize: 10, color: T.muted }}>({item.split("(")[1]?.replace(")", "")})</span>
                </label>
              ))}
            </Card>
          ))}
          <Card style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.brown, marginBottom: 10 }}>Harga</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8 }}>
              <input defaultValue="500.000" style={{ flex: 1, padding: "7px 10px", border: `1.5px solid ${T.border}`, borderRadius: 7, fontSize: 11, outline: "none" }} placeholder="Min" />
              <span style={{ color: T.muted, fontSize: 12 }}>—</span>
              <input defaultValue="20.000.000" style={{ flex: 1, padding: "7px 10px", border: `1.5px solid ${T.border}`, borderRadius: 7, fontSize: 11, outline: "none" }} placeholder="Max" />
            </div>
            <Btn variant="primary" sm>Terapkan</Btn>
          </Card>
        </div>

        {/* Product Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {products.map((p) => (
            <Card key={p.name} style={{ overflow: "hidden", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(44,24,16,.14)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}>
              <div style={{ height: 160, background: `linear-gradient(135deg, ${T.bg}, #E8D5B0)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, position: "relative" }}>
                {p.icon}
                {p.badge && <span style={{ position: "absolute", top: 8, left: 8, padding: "2px 8px", borderRadius: 100, background: T.terra, color: "#fff", fontSize: 9, fontWeight: 700 }}>{p.badge}</span>}
                <button style={{ position: "absolute", top: 8, right: 8, width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.9)", border: "none", cursor: "pointer", fontSize: 14 }}>♡</button>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <div style={{ fontSize: 11, color: T.muted }}>{p.brand}</div>
                  <div style={{ fontSize: 11, color: T.muted, display: "flex", alignItems: "center", gap: 3 }}>⭐ {p.rating} <span style={{ color: T.border }}>({p.reviews})</span></div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.brown, marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.brown }}>{p.price}</div>
                    {p.orig && <div style={{ fontSize: 11, color: T.muted, textDecoration: "line-through" }}>{p.orig}</div>}
                    <div style={{ fontSize: 10, color: T.sage, fontWeight: 600 }}>+{p.pts.replace("+","")} poin</div>
                  </div>
                  <Btn variant="primary" sm>+ Keranjang</Btn>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Showroom() {
  const showrooms = [
    { icon: "🏢", name: "Homera Studio — Kemang", loc: "Jl. Kemang Raya No. 24, Jakarta Selatan", dist: "1.2 km", status: "Buka", rating: "4.9", brands: ["Homera Studio","LuxeLight"] },
    { icon: "🪵", name: "Woodcraft Co. — Cipete", loc: "Jl. Cipete Raya No. 88, Jakarta Selatan", dist: "2.4 km", status: "Buka", rating: "4.8", brands: ["Woodcraft","Teak & Grain"] },
    { icon: "🍃", name: "Teak & Grain — Blok M", loc: "Jl. Sultan Hasanudin No. 12, Jakarta Selatan", dist: "3.1 km", status: "Buka", rating: "4.7", brands: ["Teak & Grain"] },
    { icon: "💡", name: "LuxeLight ID — Senopati", loc: "Jl. Senopati No. 45, Jakarta Selatan", dist: "3.8 km", status: "Tutup 21.00", rating: "4.6", brands: ["LuxeLight ID"] },
  ];

  return (
    <div className="fade-up">
      <SectionHeader label="Lokasi" title="Peta & Showroom" action={<Btn variant="primary" sm>📍 Filter Kota</Btn>} />

      {/* Map Placeholder */}
      <Card style={{ overflow: "hidden", marginBottom: 20 }}>
        <div style={{ height: 380, background: "linear-gradient(135deg, #D4E8D0 0%, #C8D8C4 40%, #D0E0CC 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ textAlign: "center", opacity: .6 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🗺️</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.brown }}>Peta Interaktif</div>
            <div style={{ fontSize: 12, color: T.muted }}>Google Maps / Mapbox akan diintegrasikan di sini</div>
          </div>
          {/* Mock pins */}
          {[["42%","30%","🏢"],["60%","50%","🪵"],["38%","65%","🍃"],["70%","35%","💡"]].map(([t,l,ico],i) => (
            <div key={i} style={{ position: "absolute", top: t, left: l, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: i === 0 ? T.gold : T.brown, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 4px 12px rgba(0,0,0,.2)", border: "2px solid #fff" }}>{ico}</div>
              <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `8px solid ${i === 0 ? T.gold : T.brown}` }} />
            </div>
          ))}
          {/* Map controls */}
          <div style={{ position: "absolute", bottom: 14, right: 14, display: "flex", flexDirection: "column", gap: 4 }}>
            {["+","−","📍"].map((c) => (
              <button key={c} style={{ width: 34, height: 34, background: "#fff", border: "none", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,.1)", fontSize: 14, cursor: "pointer" }}>{c}</button>
            ))}
          </div>
        </div>
      </Card>

      {/* Showroom list */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {showrooms.map((s) => (
          <Card key={s.name} style={{ overflow: "hidden", cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; }}>
            <div style={{ height: 100, background: `linear-gradient(135deg, ${T.bg}, #E8D5B0)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, position: "relative" }}>
              {s.icon}
              <span style={{ position: "absolute", top: 8, right: 8, padding: "3px 10px", borderRadius: 100, background: s.status === "Buka" ? "rgba(122,140,110,.15)" : "rgba(196,87,42,.11)", color: s.status === "Buka" ? T.sage : T.terra, fontSize: 10, fontWeight: 700 }}>{s.status}</span>
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.brown }}>{s.name}</div>
                <div style={{ fontSize: 11, color: T.muted }}>⭐ {s.rating}</div>
              </div>
              <div style={{ fontSize: 11, color: T.muted, display: "flex", alignItems: "center", gap: 3, marginBottom: 8 }}>📍 {s.loc} · {s.dist}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                {s.brands.map(b => <span key={b} style={{ padding: "2px 8px", borderRadius: 4, background: T.goldP, color: T.gold, fontSize: 10, fontWeight: 600, border: `1px solid ${T.gold}30` }}>{b}</span>)}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn variant="primary" sm>🗺️ Rute</Btn>
                <Btn variant="outline" sm>📞 Hubungi</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CustomerService() {
  const tickets = [
    { id: "#TKT-0042", title: "Pertanyaan tentang garansi Sofa Scandinavian", status: "open" as const, priority: "normal", time: "2 jam lalu", unread: 2 },
    { id: "#TKT-0038", title: "Konfirmasi jadwal pengiriman Cermin Arch", status: "answered" as const, priority: "normal", time: "1 hari lalu", unread: 0 },
    { id: "#TKT-0031", title: "Aktivasi asuransi produk Ranjang Oak King", status: "resolved" as const, priority: "normal", time: "5 hari lalu", unread: 0 },
  ];

  const [activeTicket, setActiveTicket] = useState(tickets[0].id);
  const t = tickets.find(t => t.id === activeTicket)!;

  return (
    <div className="fade-up">
      <SectionHeader label="Dukungan" title="Customer Service" />

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 18, height: "calc(100vh - 200px)", minHeight: 500 }}>
        {/* Ticket List */}
        <Card style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 16, fontWeight: 700, color: T.brown }}>Tiket Saya</div>
            <Btn variant="primary" sm>+ Buat Tiket</Btn>
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            {tickets.map((tk) => (
              <div
                key={tk.id}
                onClick={() => setActiveTicket(tk.id)}
                style={{
                  padding: "14px 18px",
                  borderBottom: `1px solid ${T.border}`,
                  cursor: "pointer",
                  background: activeTicket === tk.id ? T.goldP : "transparent",
                  borderLeft: activeTicket === tk.id ? `3px solid ${T.gold}` : "3px solid transparent",
                  transition: "all .15s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.muted, fontFamily: "monospace" }}>{tk.id}</span>
                  <span style={{ fontSize: 10, color: T.muted }}>{tk.time}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.brown, marginBottom: 6, lineHeight: 1.4 }}>{tk.title}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <Badge color={tk.status === "open" ? "gold" : tk.status === "answered" ? "blue" : "green"}>
                    {tk.status === "open" ? "🔄 Terbuka" : tk.status === "answered" ? "💬 Dijawab" : "✅ Selesai"}
                  </Badge>
                  {tk.unread > 0 && <span style={{ marginLeft: "auto", background: T.terra, color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 100 }}>{tk.unread}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        <Card style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Chat Header */}
          <div style={{ padding: "12px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12, background: T.warm }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: T.sage, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🎧</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.brown }}>{t.title}</div>
              <div style={{ fontSize: 11, color: T.sage, display: "flex", alignItems: "center", gap: 3 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.sage, display: "inline-block" }} />
                CS Agent Online · Respons rata-rata &lt;5 menit
              </div>
            </div>
            <Badge color={t.status === "open" ? "gold" : t.status === "answered" ? "blue" : "green"}>
              {t.status === "open" ? "🔄 Terbuka" : t.status === "answered" ? "💬 Dijawab" : "✅ Selesai"}
            </Badge>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflow: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 16, background: T.bg }}>
            {/* Date separator */}
            <div style={{ textAlign: "center", fontSize: 10, color: T.muted, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 1, background: T.border }} />
              Hari ini, 15 Mar 2026
              <div style={{ flex: 1, height: 1, background: T.border }} />
            </div>

            {/* Customer message */}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <div style={{ maxWidth: "70%" }}>
                <div style={{ background: T.brown, color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 4px 12px", fontSize: 13, lineHeight: 1.5 }}>
                  Halo, saya ingin menanyakan soal garansi Sofa Scandinavian yang baru saya beli. Apakah termasuk garansi rangka?
                </div>
                <div style={{ fontSize: 10, color: T.muted, textAlign: "right", marginTop: 4 }}>09.15 · Terkirim ✓✓</div>
              </div>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0, marginTop: 2 }}>BS</div>
            </div>

            {/* CS reply */}
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: T.sage, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, marginTop: 2 }}>🎧</div>
              <div style={{ maxWidth: "70%" }}>
                <div style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>CS Agent · Rina</div>
                <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: "10px 14px", borderRadius: "4px 12px 12px 12px", fontSize: 13, lineHeight: 1.5, color: T.brown }}>
                  Halo Kak Budi! Sofa Scandinavian dari Homera Studio dilindungi garansi 24 bulan, termasuk rangka kayu dan per sofa. Untuk klaim garansi, Kak bisa langsung melalui menu Garansi &amp; Asuransi di portal ya 😊
                </div>
                <div style={{ fontSize: 10, color: T.muted, marginTop: 4 }}>09.22</div>
              </div>
            </div>

            {/* Customer follow-up */}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <div style={{ maxWidth: "70%" }}>
                <div style={{ background: T.brown, color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 4px 12px", fontSize: 13, lineHeight: 1.5 }}>
                  Baik terima kasih! Kalau sarung sofanya rusak, apakah bisa klaim juga?
                </div>
                <div style={{ fontSize: 10, color: T.muted, textAlign: "right", marginTop: 4 }}>09.25 · Terkirim ✓✓</div>
              </div>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0, marginTop: 2 }}>BS</div>
            </div>

            {/* Typing indicator */}
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: T.sage, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🎧</div>
              <div style={{ padding: "10px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: "4px 12px 12px 12px", display: "flex", gap: 4, alignItems: "center" }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: T.muted, display: "inline-block", animation: `bounce .8s ${i * .15}s infinite` }} />)}
              </div>
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${T.border}`, background: T.warm }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 12, padding: "8px 12px" }}>
              <textarea
                placeholder="Ketik pesan Anda..."
                style={{ flex: 1, border: "none", outline: "none", background: "none", resize: "none", fontSize: 13, lineHeight: 1.5, maxHeight: 100, color: T.char }}
                rows={1}
              />
              <button style={{ width: 32, height: 32, borderRadius: 8, background: T.brown, border: "none", color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>→</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── Main Portal ────────────────────────────────────────────────────────
type Section = "dashboard" | "katalog" | "showroom" | "cs";

export default function CustomerPortal() {
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: { id: Section; icon: string; label: string; badge?: number }[] = [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "katalog", icon: "🛍️", label: "Katalog" },
    { id: "showroom", icon: "🏬", label: "Showroom" },
    { id: "cs", icon: "💬", label: "Customer Service", badge: 2 },
  ];

  const comingSoon = [
    { icon: "👤", label: "Profil Saya" },
    { icon: "📦", label: "Pesanan Saya" },
    { icon: "🛡️", label: "Garansi & Asuransi" },
    { icon: "❤️", label: "Wishlist" },
    { icon: "🎪", label: "Event" },
  ];

  const titles: Record<Section, string> = {
    dashboard: "Dashboard",
    katalog: "Katalog",
    showroom: "Showroom",
    cs: "Customer Service",
  };

  return (
    <div className="portal-shell" style={{ background: T.bg }}>
      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`portal-sidebar${sidebarOpen ? " open" : ""}`} style={{ background: T.brown }}>
        {/* Logo */}
        <div style={{ padding: "22px 20px 16px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-.3px" }}>
            Dex<span style={{ color: T.gold }}>Home</span>
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 2 }}>Customer Portal</div>
        </div>

        {/* User */}
        <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0 }}>BS</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Budi Santoso</div>
            <div style={{ fontSize: 11, color: T.gold, fontWeight: 600 }}>👑 Gold Member</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 1 }}>4.820 poin aktif</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "12px 10px", flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.28)", letterSpacing: ".1em", textTransform: "uppercase", padding: "0 12px", margin: "12px 0 6px" }}>Menu Utama</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
              className="nav-item"
              style={{
                background: active === item.id ? T.gold : "none",
                color: active === item.id ? "#fff" : "rgba(255,255,255,.6)",
                fontWeight: active === item.id ? 600 : 500,
              }}
            >
              <span style={{ fontSize: 17, width: 20, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}

          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.28)", letterSpacing: ".1em", textTransform: "uppercase", padding: "0 12px", margin: "14px 0 6px" }}>Akun</div>
          {comingSoon.map((item) => (
            <button key={item.label} className="nav-item" style={{ color: "rgba(255,255,255,.5)" }}>
              <span style={{ fontSize: 17, width: 20, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
          <button className="nav-item" style={{ color: "rgba(255,255,255,.5)" }}>
            <span style={{ fontSize: 17, width: 20, textAlign: "center" }}>🚪</span>Keluar
          </button>
        </div>
      </aside>

      {/* Topbar */}
      <header className="portal-topbar" style={{ background: "rgba(253,250,245,.95)", borderBottom: `1px solid ${T.border}` }}>
        <button className="ham-btn" onClick={() => setSidebarOpen(true)} style={{ width: 36, height: 36, borderRadius: 8, background: "none", border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: T.brown }}>☰</button>
        <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 18, fontWeight: 700, color: T.brown }}>{titles[active]}</div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <div className="search-bar" style={{ background: T.bg, border: `1.5px solid ${T.border}` }}>
            <span style={{ color: T.muted, fontSize: 14 }}>🔍</span>
            <input placeholder="Cari produk, pesanan..." style={{ color: T.char, fontSize: 13 }} />
          </div>
          <button className="icon-btn" style={{ background: T.bg, border: `1.5px solid ${T.border}`, color: T.brown }}>
            🔔<div className="notif-dot" />
          </button>
          <button className="icon-btn" style={{ background: T.bg, border: `1.5px solid ${T.border}`, color: T.brown }}>🛒</button>
        </div>
      </header>

      {/* Main */}
      <main className="portal-main" style={{ padding: "28px 32px" }}>
        {active === "dashboard" && <Dashboard />}
        {active === "katalog" && <Katalog />}
        {active === "showroom" && <Showroom />}
        {active === "cs" && <CustomerService />}
      </main>
    </div>
  );
}
