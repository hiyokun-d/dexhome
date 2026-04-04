export function Announcements() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Semua");
  const tabs = [
    "Semua",
    "📣 Promosi",
    "⚙️ Sistem",
    "🎪 Event",
    "🚨 Mendesak",
    "✅ Sudah Dibaca",
  ];

  const announcements = [
    {
      id: 1,
      unread: true,
      icon: "📣",
      iconColor: T.gold,
      iconBg: T.goldP,
      title: "Flash Sale April 2026 — Pastikan Stok Siap!",
      time: "Hari ini, 09.00",
      preview:
        "Flash Sale April akan mulai 1–15 April 2026. Pastikan semua produk Anda sudah update stok sebelum 25 Maret. Diskon yang berlaku: pelanggan mendapat potongan hingga 40%...",
      tags: [
        { color: "gold" as const, label: "📣 Promosi" },
        { color: "red" as const, label: "🚨 Penting" },
      ],
      target: "Semua Mitra",
      content: `Yth. Mitra Showroom DexHome,\n\nFlash Sale April 2026 akan segera dimulai! Berikut hal yang perlu Anda persiapkan:\n\n• Update stok produk paling lambat 25 Maret 2026\n• Koordinasi pengiriman — tim logistik DexHome siap membantu\n• Diskon otomatis akan diterapkan platform, tidak perlu action dari Anda\n• Estimasi peningkatan order 3–5× dari hari normal`,
    },
    {
      id: 2,
      unread: true,
      icon: "⚙️",
      iconColor: T.blue,
      iconBg: "rgba(74,144,217,.1)",
      title: "Update Sistem DexHome v2.4 — Fitur Baru untuk Mitra",
      time: "15 Mar 2026",
      preview:
        "Versi terbaru DexHome kini hadir. Panel admin baru dengan tampilan stok yang diperbarui, notifikasi order real-time, dan laporan penjualan mingguan otomatis...",
      tags: [{ color: "blue" as const, label: "⚙️ Sistem" }],
      target: "Semua Mitra",
      content:
        "Pembaruan besar untuk panel mitra DexHome:\n\n• Dashboard Stok Real-time — lihat level stok langsung\n• Notifikasi Order Instan — push notification pesanan baru\n• Laporan Penjualan Mingguan — otomatis terkirim ke email\n• Chat CS Terintegrasi — koordinasi langsung via panel\n• Galeri Foto Diperbaiki — upload hingga 12 foto produk",
    },
    {
      id: 3,
      unread: true,
      icon: "🎪",
      iconColor: T.sage,
      iconBg: "rgba(122,140,110,.1)",
      title: "DexHome Expo 2026 — Undangan Mitra Showroom",
      time: "10 Mar 2026",
      preview:
        "Anda diundang untuk berpartisipasi di DexHome Expo 2026, pameran furnitur terbesar tahun ini di Jakarta Convention Center, 20–22 Juni 2026...",
      tags: [{ color: "green" as const, label: "🎪 Event" }],
      target: "Mitra Verified",
      content:
        "DexHome Expo 2026:\n\n• Tanggal: 20–22 Juni 2026\n• Lokasi: Jakarta Convention Center, Hall A & B\n• Booth size: 6m × 4m (standar) atau 12m × 6m (premium)\n• Estimasi pengunjung: 15.000+ per hari\n• Biaya booth mitra verified: GRATIS untuk slot standar\n\nKonfirmasi partisipasi paling lambat 30 April 2026.",
    },
    {
      id: 4,
      unread: false,
      icon: "📋",
      iconColor: T.muted,
      iconBg: T.bg,
      title: "Kebijakan Pengembalian Barang — Pembaruan SOP",
      time: "01 Mar 2026",
      preview:
        "Pembaruan standar prosedur operasional pengembalian barang berlaku mulai 1 April 2026. Silakan pelajari dokumen terlampir...",
      tags: [{ color: "grey" as const, label: "📋 Kebijakan" }],
      target: "Semua Mitra",
      content:
        "SOP Pengembalian Barang diperbarui efektif 1 April 2026. Lihat dokumen terlampir untuk detail lengkap.",
    },
  ];

  return (
    <div className="fade-up">
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${T.brown}, ${T.brown2})`,
          borderRadius: 16,
          padding: "22px 26px",
          marginBottom: 22,
          display: "flex",
          alignItems: "center",
          gap: 18,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -30,
            top: -30,
            width: 160,
            height: 160,
            background: `radial-gradient(circle, ${T.goldP}, transparent 70%)`,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            background: T.gold,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          📢
        </div>
        <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 5,
            }}
          >
            Selamat Datang, Homera Studio! 👋
          </h2>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>
            Ada <strong style={{ color: T.gold }}>3 pengumuman baru</strong>{" "}
            yang perlu Anda baca hari ini
          </p>
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,.4)",
              marginTop: 4,
            }}
          >
            Terakhir login: Rabu, 18 Mar 2026 pukul 14.30 WIB
          </p>
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "right" }}>
          <div
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: 36,
              fontWeight: 700,
              color: T.gold,
              lineHeight: 1,
            }}
          >
            3
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,.4)",
              marginTop: 2,
            }}
          >
            Belum Dibaca
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "6px 16px",
              borderRadius: 100,
              fontSize: 12,
              fontWeight: activeTab === tab ? 600 : 500,
              cursor: "pointer",
              transition: "all .2s",
              border: `1.5px solid ${activeTab === tab ? T.brown : T.border}`,
              background: activeTab === tab ? T.brown : T.card,
              color: activeTab === tab ? "#fff" : T.muted,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Announcement Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {announcements.map((ann) => (
          <Card
            key={ann.id}
            style={{
              overflow: "hidden",
              opacity: ann.unread ? 1 : 0.75,
              cursor: "pointer",
            }}
          >
            {/* Header row */}
            <div
              onClick={() =>
                setExpandedId(expandedId === ann.id ? null : ann.id)
              }
              style={{
                padding: "16px 20px",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 11,
                  background: ann.iconBg,
                  border: `1px solid ${ann.iconColor}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {ann.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: T.brown,
                      lineHeight: 1.3,
                    }}
                  >
                    {ann.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: T.muted,
                      flexShrink: 0,
                      marginLeft: 12,
                    }}
                  >
                    {ann.time}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: T.muted,
                    lineHeight: 1.5,
                    marginBottom: 10,
                    display: expandedId === ann.id ? "none" : "block",
                  }}
                >
                  {ann.preview}
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {ann.tags.map((t) => (
                    <Badge key={t.label} color={t.color}>
                      {t.label}
                    </Badge>
                  ))}
                  <span style={{ fontSize: 10, color: T.muted, marginLeft: 4 }}>
                    Ditujukan ke: {ann.target}
                  </span>
                  {ann.unread && (
                    <span
                      style={{
                        marginLeft: "auto",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: T.terra,
                        display: "inline-block",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded */}
            {expandedId === ann.id && (
              <div
                style={{
                  padding: "0 20px 20px 78px",
                  borderTop: `1px solid ${T.border}`,
                }}
              >
                <div
                  style={{
                    paddingTop: 16,
                    fontSize: 13,
                    color: T.brown,
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                  }}
                >
                  {ann.content}
                </div>
                {ann.id === 1 && (
                  <div
                    style={{
                      marginTop: 14,
                      padding: "12px 14px",
                      background: T.bg,
                      borderRadius: 10,
                      border: `1px solid ${T.border}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>📄</span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: T.brown,
                        }}
                      >
                        Panduan Flash Sale April 2026.pdf
                      </div>
                      <div style={{ fontSize: 10, color: T.muted }}>
                        PDF · 2.4 MB
                      </div>
                    </div>
                    <Btn variant="outline" sm>
                      ⬇ Unduh
                    </Btn>
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
