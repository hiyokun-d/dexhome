"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/Badge";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";

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
  blue: "#4A90D9",
};

// Tier thresholds (cumulative points) — update when client confirms
const TIER_NEXT: Record<string, { label: string; target: number }> = {
  SILVER: { label: "Gold", target: 5000 },
  GOLD: { label: "Platinum", target: 10000 },
  PLATINUM: { label: "", target: 0 },
};

type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "COMPLETED" | "CANCELLED" | "CLAIM";
type BadgeColor = "green" | "gold" | "red" | "grey" | "blue";

function orderBadge(s: OrderStatus): { color: BadgeColor; label: string } {
  const m: Record<OrderStatus, { color: BadgeColor; label: string }> = {
    COMPLETED:  { color: "green", label: "✓ Selesai" },
    DELIVERED:  { color: "green", label: "✓ Diterima" },
    SHIPPED:    { color: "gold",  label: "🚚 Dikirim" },
    PROCESSING: { color: "gold",  label: "⚙️ Diproses" },
    PENDING:    { color: "grey",  label: "⏳ Menunggu" },
    CANCELLED:  { color: "red",   label: "✕ Dibatal" },
    CLAIM:      { color: "red",   label: "↩ Klaim" },
  };
  return m[s] ?? { color: "grey", label: s };
}

function pointIcon(type: string) {
  if (type === "BONUS")  return { ico: "🎁", bg: `rgba(74,144,217,.1)`,      color: T.blue };
  if (type === "REDEEM") return { ico: "🎫", bg: `rgba(196,87,42,.1)`,       color: T.terra };
  if (type === "EXPIRE") return { ico: "⚠️", bg: `rgba(196,87,42,.1)`,       color: T.terra };
  if (type === "REFUND") return { ico: "↩",  bg: `rgba(122,140,110,.1)`,     color: T.sage };
  return                        { ico: "⭐", bg: `rgba(201,150,42,.10)`,     color: T.sage };
}

function voucherDisplay(type: string, value: number) {
  if (type === "FIXED_DISCOUNT")   return { icon: "🎫", val: `Rp ${value.toLocaleString("id-ID")}` };
  if (type === "PERCENT_DISCOUNT") return { icon: "🏷️", val: `${value}%` };
  if (type === "FREE_SHIPPING")    return { icon: "🚚", val: "Gratis Ongkir" };
  if (type === "CASHBACK")         return { icon: "💎", val: `Cashback ${value}%` };
  return { icon: "🎫", val: String(value) };
}

function fmtRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

type DashboardData = {
  id: string;
  fullName: string;
  membershipTier: "SILVER" | "GOLD" | "PLATINUM";
  totalPoints: number;
  tierExpiresAt: string | null;
  avatarUrl: string | null;
  orders: {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    totalAmount: number;
    createdAt: string;
    mitra: { showroomName: string };
    items: { product: { name: string; images: { url: string }[] } }[];
  }[];
  voucherClaims: {
    voucher: { id: string; code: string; name: string; type: string; value: number; validUntil: string };
  }[];
  pointTransactions: {
    id: string;
    type: string;
    amount: number;
    description: string;
    createdAt: string;
  }[];
  _count: { orders: number; reviews: number; warrantyClaims: number };
};

type DevCustomer = { id: string; fullName: string; user: { email: string } };

// ── Skeleton block helper ────────────────────────────────────────────────────
function Skel({ w = "100%", h = 12 }: { w?: string | number; h?: number }) {
  return (
    <div
      style={{
        width: w,
        height: h,
        background: T.border,
        borderRadius: 4,
        animation: "pulse 1.4s ease-in-out infinite",
      }}
    />
  );
}

export function Dashboard() {
  // TODO: replace with session.profileId once auth is wired
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [devCustomers, setDevCustomers] = useState<DevCustomer[]>([]);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  // dev: load seeded customers
  useEffect(() => {
    fetch("/api/dev/customers")
      .then((r) => r.json())
      .then(({ data: list }) => {
        if (list?.length) { setDevCustomers(list); setCustomerId(list[0].id); }
      })
      .catch(() => {});
  }, []);

  // fetch dashboard data when customer changes
  useEffect(() => {
    if (!customerId) return;
    setLoading(true);
    fetch(`/api/customer/dashboard?customerId=${customerId}`)
      .then((r) => r.json())
      .then(({ data: d }) => { if (d) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [customerId]);

  const tier = data?.membershipTier ?? "SILVER";
  const tierInfo = TIER_NEXT[tier];
  const points = data?.totalPoints ?? 0;
  const progress = tierInfo.target > 0 ? Math.min(1, points / tierInfo.target) : 1;
  const remaining = tierInfo.target > 0 ? Math.max(0, tierInfo.target - points) : 0;
  const tierLabel = tier === "GOLD" ? "👑 Gold Member" : tier === "PLATINUM" ? "💎 Platinum Member" : "🥈 Silver Member";

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const processingCount = data?.orders.filter((o) => o.status === "PROCESSING" || o.status === "SHIPPED").length ?? 0;

  return (
    <div className="fade-up">
      {/* DEV customer picker */}
      {devCustomers.length > 0 && (
        <div
          style={{
            marginBottom: 16,
            padding: "7px 14px",
            background: T.goldP,
            border: `1px dashed ${T.gold}`,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 11,
            color: T.brown,
          }}
        >
          <span style={{ fontWeight: 700, color: T.gold }}>DEV</span>
          Customer:
          <select
            value={customerId ?? ""}
            onChange={(e) => { setCustomerId(e.target.value); setData(null); }}
            style={{ fontSize: 11, border: `1px solid ${T.border}`, borderRadius: 5, padding: "2px 6px", background: T.warm, color: T.brown }}
          >
            {devCustomers.map((c) => (
              <option key={c.id} value={c.id}>{c.fullName} ({c.user.email})</option>
            ))}
          </select>
        </div>
      )}

      {/* Greeting */}
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 28, fontWeight: 700, color: T.brown }}>
          {loading || !data ? "Selamat Datang 👋" : `Selamat Datang, ${data.fullName.split(" ")[0]}! 👋`}
        </h1>
        <p style={{ fontSize: 14, color: T.muted, marginTop: 3 }}>
          {today}{processingCount > 0 ? ` · ${processingCount} pesanan sedang diproses` : ""}
        </p>
      </div>

      {/* Membership Card */}
      <div
        style={{
          background: T.brown,
          borderRadius: 18,
          padding: "26px 28px",
          marginBottom: 22,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 20,
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", width: 220, height: 220,
            background: "radial-gradient(circle,rgba(201,150,42,.2),transparent 70%)",
            top: -60, right: -40, borderRadius: "50%", pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: T.gold, color: "#fff", fontSize: 10, fontWeight: 700,
              padding: "3px 12px", borderRadius: 100, letterSpacing: ".06em",
              textTransform: "uppercase", marginBottom: 10,
            }}
          >
            {tierLabel}
          </div>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
            {loading ? <Skel w={180} h={24} /> : (data?.fullName ?? "—")}
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.6)" }}>
            Total Poin:{" "}
            <strong style={{ fontSize: 18, color: T.gold, fontFamily: "var(--font-playfair, serif)" }}>
              {loading ? "…" : `${points.toLocaleString("id-ID")} pts`}
            </strong>
          </div>
          {tierInfo.target > 0 && (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,.45)", marginBottom: 6 }}>
                <span>{tier} → {tierInfo.label}</span>
                <span>{points.toLocaleString("id-ID")} / {tierInfo.target.toLocaleString("id-ID")} pts</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,.12)", borderRadius: 100 }}>
                <div style={{ height: "100%", width: `${(progress * 100).toFixed(1)}%`, background: T.gold, borderRadius: 100, transition: "width .6s" }} />
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 8 }}>
                Butuh <strong style={{ color: T.gold }}>{remaining.toLocaleString("id-ID")} poin</strong> lagi untuk naik ke {tierInfo.label}
              </p>
            </div>
          )}
          {tier === "PLATINUM" && (
            <p style={{ fontSize: 11, color: "rgba(255,255,255,.5)", marginTop: 12 }}>💎 Tier tertinggi — selamat!</p>
          )}
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div
            style={{
              width: 90, height: 90, borderRadius: "50%",
              border: "3px solid rgba(201,150,42,.35)",
              background: "rgba(255,255,255,.06)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              margin: "0 auto 8px",
            }}
          >
            {tierInfo.target > 0 ? (
              <>
                <div style={{ fontSize: 20, fontWeight: 700, color: T.gold }}>{Math.round(progress * 100)}%</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)" }}>Menuju {tierInfo.label}</div>
              </>
            ) : (
              <div style={{ fontSize: 28 }}>💎</div>
            )}
          </div>
          {data?.tierExpiresAt && (
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginBottom: 8 }}>
              Berlaku s.d. {fmtDate(data.tierExpiresAt)}
            </div>
          )}
          <Btn variant="gold" sm>Tukar Poin →</Btn>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
        {[
          {
            icon: "⭐", label: "Total Poin", accent: T.gold,
            value: loading ? "—" : `${points.toLocaleString("id-ID")}`,
            sub: loading ? "" : `≈ ${fmtRupiah(points * 10)} · dari ${data?._count.orders ?? 0} transaksi`,
          },
          {
            icon: "🛍️", label: "Total Pesanan", accent: T.terra,
            value: loading ? "—" : String(data?._count.orders ?? 0),
            sub: loading ? "" : `${processingCount} sedang diproses`,
          },
          {
            icon: "🎫", label: "Voucher Aktif", accent: T.blue,
            value: loading ? "—" : String(data?.voucherClaims.length ?? 0),
            sub: loading || !data?.voucherClaims.length ? "Tidak ada voucher aktif" :
              `Exp: ${fmtDate(data.voucherClaims[0].voucher.validUntil)}`,
          },
          {
            icon: "🛡️", label: "Klaim Garansi", accent: T.sage,
            value: loading ? "—" : String(data?._count.warrantyClaims ?? 0),
            sub: "Total klaim diajukan",
          },
        ].map((k) => (
          <Card key={k.label} style={{ padding: "16px 18px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: k.accent }} />
            <div style={{ fontSize: 22, marginBottom: 8 }}>{k.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 4 }}>
              {k.label}
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: T.brown, marginBottom: 5 }}>{k.value}</div>
            <div style={{ fontSize: 11, color: T.muted }}>{k.sub}</div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: "flex", gap: 12, marginBottom: 22 }}>
        {[["🛍️","Belanja"],["📦","Pesanan"],["🛡️","Garansi"],["💬","Bantuan"],["🎫","Voucher"]].map(([icon, label]) => (
          <div
            key={label}
            style={{
              flex: 1, background: T.card, border: `1px solid ${T.border}`,
              borderRadius: 12, padding: "14px 10px", textAlign: "center",
              cursor: "pointer", transition: "all .2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = T.gold; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = T.border; }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.brown }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {/* Recent Orders */}
        <Card style={{ overflow: "hidden" }}>
          <div
            style={{
              padding: "16px 20px", borderBottom: `1px solid ${T.border}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: 2 }}>
                Riwayat
              </div>
              <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 17, fontWeight: 700, color: T.brown }}>
                Pembelian Terbaru
              </div>
            </div>
            <Btn variant="outline" sm>Lihat Semua</Btn>
          </div>

          {loading ? (
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: T.border, flexShrink: 0 }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    <Skel w="70%" />
                    <Skel w="45%" h={9} />
                  </div>
                </div>
              ))}
            </div>
          ) : !data?.orders.length ? (
            <div style={{ padding: 28, textAlign: "center", color: T.muted, fontSize: 12 }}>Belum ada pesanan</div>
          ) : (
            <table className="data-table" style={{ "--border-color": T.border } as React.CSSProperties}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                  {["Produk", "Total", "Status"].map((h) => (
                    <th key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted, padding: "10px 16px", textAlign: "left" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.orders.map((o) => {
                  const product = o.items[0]?.product;
                  const img = product?.images[0]?.url;
                  const badge = orderBadge(o.status);
                  return (
                    <tr key={o.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div
                            style={{
                              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                              background: T.bg, border: `1px solid ${T.border}`,
                              overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                          >
                            {img
                              ? <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              : <span style={{ fontSize: 16 }}>📦</span>}
                          </div>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.brown }}>
                              {product?.name ?? "—"}
                            </div>
                            <div style={{ fontSize: 10, color: T.muted }}>
                              {o.mitra.showroomName} · #{o.orderNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: T.brown, whiteSpace: "nowrap" }}>
                        {fmtRupiah(o.totalAmount)}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <Badge color={badge.color}>{badge.label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Card>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Points Activity */}
          <Card style={{ padding: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: 3 }}>Poin</div>
            <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 16, fontWeight: 700, color: T.brown, marginBottom: 14 }}>
              Aktivitas Poin
            </div>
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {Array.from({ length: 3 }).map((_, i) => <Skel key={i} h={10} />)}
              </div>
            ) : !data?.pointTransactions.length ? (
              <div style={{ fontSize: 12, color: T.muted }}>Belum ada aktivitas poin</div>
            ) : (
              data.pointTransactions.map((p) => {
                const { ico, bg, color } = pointIcon(p.type);
                const isNeg = p.type === "REDEEM" || p.type === "EXPIRE";
                return (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                      {ico}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: T.brown, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {p.description}
                      </div>
                      <div style={{ fontSize: 10, color: T.muted }}>{fmtDate(p.createdAt)}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: isNeg ? T.terra : color, flexShrink: 0 }}>
                      {isNeg ? "−" : "+"}{p.amount.toLocaleString("id-ID")}
                    </div>
                  </div>
                );
              })
            )}
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

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {Array.from({ length: 2 }).map((_, i) => <Skel key={i} h={52} />)}
              </div>
            ) : !data?.voucherClaims.length ? (
              <div style={{ fontSize: 12, color: T.muted }}>Tidak ada voucher aktif</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {data.voucherClaims.map(({ voucher: v }) => {
                  const { icon, val } = voucherDisplay(v.type, v.value);
                  return (
                    <div key={v.id} style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: `1px solid ${T.border}` }}>
                      <div style={{ background: T.brown, padding: "12px 10px", display: "flex", alignItems: "center", justifyContent: "center", minWidth: 52, fontSize: 20 }}>
                        {icon}
                      </div>
                      <div style={{ padding: "10px 14px", flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.brown }}>{v.name}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: T.gold }}>{val}</div>
                        <div style={{ fontSize: 10, color: T.muted }}>Exp: {fmtDate(v.validUntil)}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", paddingRight: 12 }}>
                        <Btn variant="outline" sm>Pakai →</Btn>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
