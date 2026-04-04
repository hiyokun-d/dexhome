"use client";
import { useState } from "react";
import { Badge } from "@/components/Badge";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";

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

export function SendAnnouncement() {
  const [sent, setSent] = useState(false);
  const past = [
    {
      title: "Flash Sale April 2026 — Pastikan Stok Siap!",
      time: "Hari ini, 09.00",
      target: "Semua Mitra (180)",
      reads: 72,
      tags: ["Promosi", "Penting"],
    },
    {
      title: "Update Sistem DexHome v2.4",
      time: "15 Mar 2026",
      target: "Semua Mitra (180)",
      reads: 156,
      tags: ["Sistem"],
    },
    {
      title: "DexHome Expo 2026 — Undangan Mitra",
      time: "10 Mar 2026",
      target: "Mitra Verified (142)",
      reads: 138,
      tags: ["Event"],
    },
  ];

  return (
    <div className="fade-up">
      <SectionHeader label="Komunikasi" title="Kirim Pengumuman" />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}
      >
        {/* Compose */}
        <Card style={{ padding: 22 }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>📢</div>
              <div
                style={{
                  fontFamily: "var(--font-playfair, serif)",
                  fontSize: 22,
                  fontWeight: 700,
                  color: T.txt,
                  marginBottom: 8,
                }}
              >
                Pengumuman Terkirim!
              </div>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 24 }}>
                Dikirim ke 180 mitra showroom · Flash Sale April 2026
              </div>
              <Btn variant="primary" onClick={() => setSent(false)}>
                Buat Pengumuman Baru
              </Btn>
            </div>
          ) : (
            <>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: T.txt,
                  marginBottom: 18,
                }}
              >
                📝 Tulis Pengumuman
              </div>
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: T.muted,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Judul Pengumuman *
                </label>
                <input
                  defaultValue="Flash Sale April 2026 — Pastikan Stok Siap!"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: `1px solid ${T.border2}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: T.txt,
                    background: T.surf2,
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: T.muted,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Isi Pengumuman *
                </label>
                <textarea
                  defaultValue="Yth. Mitra Showroom DexHome,&#10;&#10;Flash Sale April 2026 akan segera dimulai! Pastikan stok produk Anda sudah diperbarui sebelum 25 Maret 2026.&#10;&#10;Terima kasih atas kerja sama Anda!"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: `1px solid ${T.border2}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: T.txt,
                    background: T.surf2,
                    outline: "none",
                    resize: "vertical",
                    minHeight: 160,
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 10,
                      fontWeight: 700,
                      color: T.muted,
                      letterSpacing: ".05em",
                      textTransform: "uppercase",
                      marginBottom: 5,
                    }}
                  >
                    Kategori
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      border: `1px solid ${T.border2}`,
                      borderRadius: 8,
                      fontSize: 12,
                      color: T.txt,
                      background: T.surf2,
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option>📣 Promosi</option>
                    <option>⚙️ Sistem</option>
                    <option>🎪 Event</option>
                    <option>📋 Kebijakan</option>
                    <option>🚨 Mendesak</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 10,
                      fontWeight: 700,
                      color: T.muted,
                      letterSpacing: ".05em",
                      textTransform: "uppercase",
                      marginBottom: 5,
                    }}
                  >
                    Prioritas
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      border: `1px solid ${T.border2}`,
                      borderRadius: 8,
                      fontSize: 12,
                      color: T.txt,
                      background: T.surf2,
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option>Normal</option>
                    <option>Penting</option>
                    <option>Sangat Mendesak</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: T.muted,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Tujuan
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    "Semua Mitra (180)",
                    "Mitra Verified (142)",
                    "Mitra Spesifik",
                  ].map((opt, i) => (
                    <label
                      key={opt}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        color: T.muted,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name="target"
                        defaultChecked={i === 0}
                        style={{ accentColor: T.gold }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="primary" onClick={() => setSent(true)}>
                  📢 Kirim Sekarang
                </Btn>
                <Btn variant="dark">💾 Simpan Draft</Btn>
              </div>
            </>
          )}
        </Card>

        {/* Past Announcements */}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: T.muted,
              marginBottom: 12,
            }}
          >
            Pengumuman Terdahulu
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {past.map((p, i) => (
              <Card key={i} style={{ padding: 14 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: T.txt,
                    marginBottom: 6,
                  }}
                >
                  {p.title}
                </div>
                <div style={{ fontSize: 10, color: T.muted, marginBottom: 8 }}>
                  {p.time} · {p.target}
                </div>
                <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
                  {p.tags.map((t) => (
                    <Badge key={t} color="grey">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: T.sage }}>
                  👁 {p.reads} / 180 sudah baca
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendAnnouncement;
