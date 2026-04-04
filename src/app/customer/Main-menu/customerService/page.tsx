"use client";
import { useState } from "react";
import { Badge } from "@/components/Badge";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";

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

export function CustomerService() {
  const tickets = [
    {
      id: "#TKT-0042",
      title: "Pertanyaan tentang garansi Sofa Scandinavian",
      status: "open" as const,
      priority: "normal",
      time: "2 jam lalu",
      unread: 2,
    },
    {
      id: "#TKT-0038",
      title: "Konfirmasi jadwal pengiriman Cermin Arch",
      status: "answered" as const,
      priority: "normal",
      time: "1 hari lalu",
      unread: 0,
    },
    {
      id: "#TKT-0031",
      title: "Aktivasi asuransi produk Ranjang Oak King",
      status: "resolved" as const,
      priority: "normal",
      time: "5 hari lalu",
      unread: 0,
    },
  ];

  const [activeTicket, setActiveTicket] = useState(tickets[0].id);
  const t = tickets.find((t) => t.id === activeTicket)!;

  return (
    <div className="fade-up">
      <SectionHeader label="Dukungan" title="Customer Service" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 18,
          height: "calc(100vh - 200px)",
          minHeight: 500,
        }}
      >
        {/* Ticket List */}
        <Card
          style={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "14px 18px",
              borderBottom: `1px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: 16,
                fontWeight: 700,
                color: T.brown,
              }}
            >
              Tiket Saya
            </div>
            <Btn variant="primary" sm>
              + Buat Tiket
            </Btn>
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
                  borderLeft:
                    activeTicket === tk.id
                      ? `3px solid ${T.gold}`
                      : "3px solid transparent",
                  transition: "all .15s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: T.muted,
                      fontFamily: "monospace",
                    }}
                  >
                    {tk.id}
                  </span>
                  <span style={{ fontSize: 10, color: T.muted }}>
                    {tk.time}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: T.brown,
                    marginBottom: 6,
                    lineHeight: 1.4,
                  }}
                >
                  {tk.title}
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <Badge
                    color={
                      tk.status === "open"
                        ? "gold"
                        : tk.status === "answered"
                          ? "blue"
                          : "green"
                    }
                  >
                    {tk.status === "open"
                      ? "🔄 Terbuka"
                      : tk.status === "answered"
                        ? "💬 Dijawab"
                        : "✅ Selesai"}
                  </Badge>
                  {tk.unread > 0 && (
                    <span
                      style={{
                        marginLeft: "auto",
                        background: T.terra,
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "1px 7px",
                        borderRadius: 100,
                      }}
                    >
                      {tk.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        <Card
          style={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: "12px 20px",
              borderBottom: `1px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: T.warm,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: T.sage,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              🎧
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.brown }}>
                {t.title}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: T.sage,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: T.sage,
                    display: "inline-block",
                  }}
                />
                CS Agent Online · Respons rata-rata &lt;5 menit
              </div>
            </div>
            <Badge
              color={
                t.status === "open"
                  ? "gold"
                  : t.status === "answered"
                    ? "blue"
                    : "green"
              }
            >
              {t.status === "open"
                ? "🔄 Terbuka"
                : t.status === "answered"
                  ? "💬 Dijawab"
                  : "✅ Selesai"}
            </Badge>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              background: T.bg,
            }}
          >
            {/* Date separator */}
            <div
              style={{
                textAlign: "center",
                fontSize: 10,
                color: T.muted,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ flex: 1, height: 1, background: T.border }} />
              Hari ini, 15 Mar 2026
              <div style={{ flex: 1, height: 1, background: T.border }} />
            </div>

            {/* Customer message */}
            <div
              style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
            >
              <div style={{ maxWidth: "70%" }}>
                <div
                  style={{
                    background: T.brown,
                    color: "#fff",
                    padding: "10px 14px",
                    borderRadius: "12px 12px 4px 12px",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  Halo, saya ingin menanyakan soal garansi Sofa Scandinavian
                  yang baru saya beli. Apakah termasuk garansi rangka?
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: T.muted,
                    textAlign: "right",
                    marginTop: 4,
                  }}
                >
                  09.15 · Terkirim ✓✓
                </div>
              </div>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: T.gold,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                BS
              </div>
            </div>

            {/* CS reply */}
            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: T.sage,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                🎧
              </div>
              <div style={{ maxWidth: "70%" }}>
                <div style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>
                  CS Agent · Rina
                </div>
                <div
                  style={{
                    background: T.card,
                    border: `1px solid ${T.border}`,
                    padding: "10px 14px",
                    borderRadius: "4px 12px 12px 12px",
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: T.brown,
                  }}
                >
                  Halo Kak Budi! Sofa Scandinavian dari Homera Studio dilindungi
                  garansi 24 bulan, termasuk rangka kayu dan per sofa. Untuk
                  klaim garansi, Kak bisa langsung melalui menu Garansi &amp;
                  Asuransi di portal ya 😊
                </div>
                <div style={{ fontSize: 10, color: T.muted, marginTop: 4 }}>
                  09.22
                </div>
              </div>
            </div>

            {/* Customer follow-up */}
            <div
              style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
            >
              <div style={{ maxWidth: "70%" }}>
                <div
                  style={{
                    background: T.brown,
                    color: "#fff",
                    padding: "10px 14px",
                    borderRadius: "12px 12px 4px 12px",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  Baik terima kasih! Kalau sarung sofanya rusak, apakah bisa
                  klaim juga?
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: T.muted,
                    textAlign: "right",
                    marginTop: 4,
                  }}
                >
                  09.25 · Terkirim ✓✓
                </div>
              </div>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: T.gold,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                BS
              </div>
            </div>

            {/* Typing indicator */}
            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: T.sage,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                🎧
              </div>
              <div
                style={{
                  padding: "10px 14px",
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: "4px 12px 12px 12px",
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: T.muted,
                      display: "inline-block",
                      animation: `bounce .8s ${i * 0.15}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: `1px solid ${T.border}`,
              background: T.warm,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 8,
                background: T.bg,
                border: `1.5px solid ${T.border}`,
                borderRadius: 12,
                padding: "8px 12px",
              }}
            >
              <textarea
                placeholder="Ketik pesan Anda..."
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "none",
                  resize: "none",
                  fontSize: 13,
                  lineHeight: 1.5,
                  maxHeight: 100,
                  color: T.char,
                }}
                rows={1}
              />
              <button
                type="button"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: T.brown,
                  border: "none",
                  color: "#fff",
                  fontSize: 14,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                →
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
