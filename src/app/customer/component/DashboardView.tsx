"use client";
import styles from "@/styles/loading.module.css";
import type { DashboardData } from "../types/dashboardData.types";
import { fmt, fmtDate, fmtRp, daysLeft } from "../function/formatter";

const TIER_NEXT: Record<string, { nextTier: string; target: number }> = {
  BRONZE: { nextTier: "SILVER", target: 3_000 },
  SILVER: { nextTier: "GOLD", target: 5_000 },
  GOLD: { nextTier: "PLATINUM", target: 10_000 },
  PLATINUM: { nextTier: "", target: 0 },
};

const TIER_CFG = {
  BRONZE: {
    grad: "linear-gradient(135deg,#6B3A2A 0%,#CD7F32 50%,#8B4513 100%)",
    label: "Bronze Member",
    accent: "#CD7F32",
    text: "#FFF8F0",
  },
  SILVER: {
    grad: "linear-gradient(135deg,#4A5568 0%,#A0AEC0 50%,#718096 100%)",
    label: "Silver Member",
    accent: "#E2E8F0",
    text: "#F7FAFC",
  },
  GOLD: {
    grad: "linear-gradient(135deg,#6B4410 0%,#C9962A 40%,#E8B84B 70%,#A8750D 100%)",
    label: "Gold Member",
    accent: "#E8B84B",
    text: "#FFFBF0",
  },
  PLATINUM: {
    grad: "linear-gradient(135deg,#1A202C 0%,#2D3748 35%,#A0AEC0 60%,#4A5568 100%)",
    label: "Platinum Member",
    accent: "#CBD5E0",
    text: "#F7FAFC",
  },
};

const STATUS_CFG: Record<string, { label: string; bg: string; color: string }> =
  {
    PENDING: { label: "Menunggu", bg: "#FEF3C7", color: "#92400E" },
    PROCESSING: { label: "Diproses", bg: "#DBEAFE", color: "#1E40AF" },
    SHIPPED: { label: "Dikirim", bg: "#FED7AA", color: "#9A3412" },
    DELIVERED: { label: "Selesai", bg: "#D1FAE5", color: "#065F46" },
    CANCELLED: { label: "Dibatal", bg: "#FEE2E2", color: "#991B1B" },
  };

interface Props {
  data: DashboardData | null;
  loading: boolean;
}

export function DashboardView({ data, loading }: Props) {
  const tier = (data?.membershipTier ?? "SILVER") as keyof typeof TIER_CFG;
  const tierCfg = TIER_CFG[tier];
  const tierNext = TIER_NEXT[tier];
  const points = data?.totalPoints ?? 0;
  const progress =
    tierNext.target > 0 ? Math.min(1, points / tierNext.target) : 1;
  const remaining =
    tierNext.target > 0 ? Math.max(0, tierNext.target - points) : 0;

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const activeVouchers = (data?.voucherClaims ?? []).filter(
    (vc) => new Date(vc.voucher.validUntil) > new Date(),
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 400,
          color: "#8A7F74",
          fontSize: 14,
        }}
      >
        <div className={styles.loader} />{" "}
      </div>
    );
  }

  return (
    <div
      className="fade-up"
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      {/* ── Welcome ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontSize: 13, color: "#8A7F74", marginBottom: 4 }}>
            {today}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: 28,
              fontWeight: 700,
              color: "#2C1810",
              lineHeight: 1.2,
            }}
          >
            Selamat datang, {data?.fullName ?? "—"}
          </h1>
        </div>
        <div
          style={{
            padding: "6px 18px",
            borderRadius: 100,
            background: tierCfg.grad,
            fontSize: 12,
            fontWeight: 700,
            color: tierCfg.text,
            flexShrink: 0,
          }}
        >
          {tierCfg.label}
        </div>
      </div>

      {/* ── Hero row: membership card + stats ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 16,
        }}
      >
        {/* Membership card */}
        <div
          style={{
            borderRadius: 20,
            background: tierCfg.grad,
            padding: "32px 36px",
            position: "relative",
            overflow: "hidden",
            minHeight: 200,
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "rgba(255,255,255,.05)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -70,
              right: 80,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "rgba(255,255,255,.04)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Points + branding row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,.55)",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  Poin Kamu
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-playfair, serif)",
                    fontSize: 48,
                    fontWeight: 700,
                    color: tierCfg.text,
                    lineHeight: 1,
                    letterSpacing: "-1px",
                  }}
                >
                  {fmt(points)}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "var(--font-playfair, serif)",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "rgba(255,255,255,.85)",
                    lineHeight: 1.2,
                  }}
                >
                  DexHome
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,.45)",
                    marginTop: 2,
                  }}
                >
                  {tierCfg.label}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            {tierNext.target > 0 && (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 7,
                  }}
                >
                  <span
                    style={{ fontSize: 11, color: "rgba(255,255,255,.55)" }}
                  >
                    Menuju {tierNext.nextTier}
                  </span>
                  <span
                    style={{ fontSize: 11, color: "rgba(255,255,255,.55)" }}
                  >
                    {Math.round(progress * 100)}%
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    borderRadius: 100,
                    background: "rgba(255,255,255,.18)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${progress * 100}%`,
                      borderRadius: 100,
                      background: tierCfg.accent,
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,.4)",
                    marginTop: 7,
                  }}
                >
                  {remaining > 0
                    ? `${fmt(remaining)} poin lagi untuk ${tierNext.nextTier}`
                    : "Tier maksimal tercapai!"}
                </div>
              </div>
            )}

            {/* Tier expiry */}
            {data?.tierExpiresAt && (
              <div
                style={{
                  marginTop: 14,
                  fontSize: 11,
                  color: "rgba(255,255,255,.35)",
                }}
              >
                Berlaku hingga {fmtDate(data.tierExpiresAt)}
              </div>
            )}
          </div>
        </div>

        {/* Stats column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              icon: "📦",
              label: "Total Pesanan",
              value: data?._count.orders ?? 0,
              sub: "semua waktu",
              accent: "#DBEAFE",
              iconBg: "#EFF6FF",
            },
            {
              icon: "🎟️",
              label: "Voucher Aktif",
              value: activeVouchers.length,
              sub: "tersedia",
              accent: "#D1FAE5",
              iconBg: "#ECFDF5",
            },
            {
              icon: "🛡️",
              label: "Klaim Garansi",
              value: data?._count.warrantyClaims ?? 0,
              sub: "diajukan",
              accent: "#FEF3C7",
              iconBg: "#FFFBEB",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                background: "#fff",
                borderRadius: 14,
                border: "1px solid #E2D8C8",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transition: "transform .2s, box-shadow .2s",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: stat.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#8A7F74",
                    textTransform: "uppercase",
                    letterSpacing: ".05em",
                    marginBottom: 2,
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#2C1810",
                    lineHeight: 1,
                    marginBottom: 2,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 11, color: "#8A7F74" }}>{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Orders ── */}
      {(data?.orders?.length ?? 0) > 0 && (
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #E2D8C8",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "18px 24px",
              borderBottom: "1px solid #E2D8C8",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: 17,
                fontWeight: 700,
                color: "#2C1810",
              }}
            >
              Pesanan Terakhir
            </h2>
            <button
              type="button"
              style={{
                fontSize: 12,
                color: "#C9962A",
                fontWeight: 600,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Lihat Semua →
            </button>
          </div>
          <table className="data-table" style={{ color: "#2C1810" }}>
            <thead>
              <tr>
                {["Produk", "Showroom", "Tanggal", "Total", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{ borderBottomColor: "#E2D8C8", color: "#2C1810" }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {data!.orders.slice(0, 5).map((order) => {
                const sCfg = STATUS_CFG[order.status] ?? STATUS_CFG.PENDING;
                const firstItem = order.items[0]?.product.name ?? "—";
                return (
                  <tr key={order.id} style={{ borderBottomColor: "#F5F0E8" }}>
                    <td>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#2C1810",
                          fontSize: 13,
                        }}
                      >
                        {firstItem}
                      </div>
                      <div style={{ fontSize: 11, color: "#8A7F74" }}>
                        #{order.orderNumber}
                      </div>
                    </td>
                    <td style={{ color: "#8A7F74" }}>
                      {order.mitra.showroomName}
                    </td>
                    <td style={{ color: "#8A7F74" }}>
                      {fmtDate(order.createdAt)}
                    </td>
                    <td style={{ fontWeight: 600, color: "#2C1810" }}>
                      {fmtRp(order.totalAmount)}
                    </td>
                    <td>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: 100,
                          fontSize: 11,
                          fontWeight: 700,
                          background: sCfg.bg,
                          color: sCfg.color,
                        }}
                      >
                        {sCfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Bottom row: vouchers + point history ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Vouchers */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #E2D8C8",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "18px 24px",
              borderBottom: "1px solid #E2D8C8",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: 17,
                fontWeight: 700,
                color: "#2C1810",
              }}
            >
              Voucher Aktif
            </h2>
          </div>
          <div
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {activeVouchers.length === 0 ? (
              <div
                style={{
                  color: "#8A7F74",
                  fontSize: 13,
                  padding: "16px 8px",
                  textAlign: "center",
                }}
              >
                Tidak ada voucher aktif.
              </div>
            ) : (
              activeVouchers.map((vc) => {
                const days = daysLeft(vc.voucher.validUntil);
                return (
                  <div
                    key={vc.voucher.id}
                    style={{
                      padding: "12px 16px",
                      borderRadius: 10,
                      background: "#FDF5E0",
                      border: "1px dashed #C9962A",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#2C1810",
                        }}
                      >
                        {vc.voucher.name}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#8A7F74",
                          marginTop: 2,
                        }}
                      >
                        {vc.voucher.code}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "#C9962A",
                        }}
                      >
                        {vc.voucher.type === "PERCENTAGE"
                          ? `${vc.voucher.value}%`
                          : fmtRp(vc.voucher.value)}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: days <= 7 ? "#C4572A" : "#8A7F74",
                          marginTop: 2,
                          fontWeight: 600,
                        }}
                      >
                        {days <= 0 ? "Kadaluarsa" : `${days} hari lagi`}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Point history */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #E2D8C8",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "18px 24px",
              borderBottom: "1px solid #E2D8C8",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: 17,
                fontWeight: 700,
                color: "#2C1810",
              }}
            >
              Riwayat Poin
            </h2>
          </div>
          <div>
            {(data?.pointTransactions ?? []).length === 0 ? (
              <div
                style={{
                  color: "#8A7F74",
                  fontSize: 13,
                  padding: "24px 24px",
                  textAlign: "center",
                }}
              >
                Belum ada riwayat poin.
              </div>
            ) : (
              (data?.pointTransactions ?? []).slice(0, 5).map((tx) => {
                const isEarn = tx.amount > 0;
                return (
                  <div
                    key={tx.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "13px 24px",
                      borderBottom: "1px solid #F5F0E8",
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 9,
                        background: isEarn ? "#D1FAE5" : "#FEE2E2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 15,
                        fontWeight: 700,
                        color: isEarn ? "#065F46" : "#991B1B",
                        flexShrink: 0,
                      }}
                    >
                      {isEarn ? "+" : "−"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#2C1810",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {tx.description}
                      </div>
                      <div style={{ fontSize: 11, color: "#8A7F74" }}>
                        {fmtDate(tx.createdAt)}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: isEarn ? "#065F46" : "#991B1B",
                        flexShrink: 0,
                      }}
                    >
                      {isEarn ? "+" : ""}
                      {fmt(tx.amount)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
