export function AnnouncementsAdmin() {
  const [expanded, setExpanded] = useState<number | null>(1);

  const items = [
    {
      id: 1,
      icon: "📣",
      title: "Flash Sale April 2026 — Pastikan Stok Siap!",
      time: "Hari ini, 09.00",
      unread: true,
      tag: "Promosi",
      tagColor: "gold" as const,
      preview:
        "Flash Sale April akan mulai 1–15 April 2026. Pastikan semua produk update stok sebelum 25 Maret.",
    },
    {
      id: 2,
      icon: "⚙️",
      title: "Update Sistem v2.4 — Panel Admin Baru",
      time: "15 Mar",
      unread: true,
      tag: "Sistem",
      tagColor: "blue" as const,
      preview:
        "Panel admin baru dengan tampilan stok real-time, notifikasi order instan, dan laporan otomatis.",
    },
    {
      id: 3,
      icon: "🎪",
      title: "DexHome Expo 2026 — Undangan Mitra",
      time: "10 Mar",
      unread: false,
      tag: "Event",
      tagColor: "green" as const,
      preview:
        "Jakarta Convention Center, 20–22 Juni 2026. Booth gratis untuk mitra verified.",
    },
  ];

  return (
    <div className="fade-up">
      <SectionHeader label="Info Platform" title="Pengumuman dari DexHome" />

      {/* Unread badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
          padding: "12px 16px",
          background: T.purpleP,
          borderRadius: 10,
          border: `1px solid rgba(139,124,200,.2)`,
        }}
      >
        <span style={{ fontSize: 18 }}>🔔</span>
        <span style={{ fontSize: 13, color: T.purpleL, fontWeight: 600 }}>
          2 pengumuman belum dibaca
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item) => (
          <Card
            key={item.id}
            style={{
              overflow: "hidden",
              opacity: item.unread ? 1 : 0.65,
              cursor: "pointer",
            }}
          >
            <div
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              style={{
                padding: "14px 18px",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: T.surf2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    marginBottom: 4,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.txt }}>
                    {item.title}
                  </div>
                  <span style={{ fontSize: 10, color: T.muted, flexShrink: 0 }}>
                    {item.time}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: T.muted,
                    lineHeight: 1.5,
                    marginBottom: 8,
                    display: expanded === item.id ? "none" : "block",
                  }}
                >
                  {item.preview}
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <Badge color={item.tagColor}>{item.tag}</Badge>
                  {item.unread && (
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: T.terra,
                        display: "inline-block",
                        marginLeft: "auto",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {expanded === item.id && (
              <div
                style={{
                  padding: "0 18px 16px 70px",
                  borderTop: `1px solid ${T.border}`,
                  paddingTop: 14,
                }}
              >
                <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7 }}>
                  {item.preview} Pastikan semua persiapan selesai sebelum
                  tanggal yang ditentukan.
                </p>
                {item.id === 1 && (
                  <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <Btn variant="primary" sm>
                      Tandai Sudah Baca
                    </Btn>
                    <Btn variant="outline" sm>
                      ⬇ Unduh Panduan
                    </Btn>
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
