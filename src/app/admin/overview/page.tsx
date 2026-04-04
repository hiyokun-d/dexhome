export function Overview() {
  const kpis = [
    {
      icon: "💰",
      label: "Total GMV",
      value: "Rp 2,4M",
      sub: "↑ +18% vs bulan lalu",
      accent: T.gold,
    },
    {
      icon: "🛍️",
      label: "Total Transaksi",
      value: "1.842",
      sub: "↑ +142 minggu ini",
      accent: T.blue,
    },
    {
      icon: "👥",
      label: "Customer Aktif",
      value: "8.294",
      sub: "↑ +320 bulan ini",
      accent: T.sage,
    },
    {
      icon: "🏬",
      label: "Mitra Showroom",
      value: "180",
      sub: "12 kota · 6 baru bulan ini",
      accent: T.purple,
    },
    {
      icon: "🎧",
      label: "Tiket CS Terbuka",
      value: "47",
      sub: "Avg. respons 2.4j",
      accent: T.terra,
    },
  ];

  const activity = [
    {
      icon: "➕",
      type: "add",
      desc: "Produk baru ditambahkan",
      sub: "Rak Buku Modular Oak · oleh Admin Rina",
      time: "5 mnt lalu",
    },
    {
      icon: "📢",
      type: "ann",
      desc: "Pengumuman dikirim",
      sub: "Flash Sale April 2026 · ke 180 mitra",
      time: "32 mnt lalu",
    },
    {
      icon: "✏️",
      type: "edit",
      desc: "Data mitra diperbarui",
      sub: "Homera Studio Kemang · foto showroom",
      time: "1j lalu",
    },
    {
      icon: "🎧",
      type: "cs",
      desc: "Tiket CS diselesaikan",
      sub: "#TKT-0031 · Aktivasi asuransi · Budi S.",
      time: "2j lalu",
    },
    {
      icon: "🏬",
      type: "add",
      desc: "Mitra baru bergabung",
      sub: "Artisan Wood Bali · Denpasar, Bali",
      time: "3j lalu",
    },
    {
      icon: "🗑️",
      type: "del",
      desc: "Produk dinonaktifkan",
      sub: "Kursi Teras Plastik · stok habis",
      time: "5j lalu",
    },
  ];

  const topMitra = [
    {
      icon: "🏢",
      name: "Homera Studio",
      code: "MTR-0001",
      gmv: "Rp 148jt",
      txn: 84,
      status: "green" as const,
    },
    {
      icon: "🏬",
      name: "Woodcraft Co.",
      code: "MTR-0002",
      gmv: "Rp 122jt",
      txn: 67,
      status: "green" as const,
    },
    {
      icon: "🏪",
      name: "Teak & Grain",
      code: "MTR-0003",
      gmv: "Rp 98jt",
      txn: 52,
      status: "green" as const,
    },
    {
      icon: "💡",
      name: "LuxeLight ID",
      code: "MTR-0004",
      gmv: "Rp 76jt",
      txn: 41,
      status: "green" as const,
    },
    {
      icon: "🪞",
      name: "MirrorMade",
      code: "MTR-0005",
      gmv: "Rp 54jt",
      txn: 29,
      status: "gold" as const,
    },
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
            <select
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                background: T.surf2,
                border: `1px solid ${T.border2}`,
                color: T.txt,
                fontSize: 11,
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option>30 Hari Terakhir</option>
              <option>7 Hari</option>
              <option>Bulan Ini</option>
              <option>Tahun Ini</option>
            </select>
            <Btn variant="dark" sm>
              ⬇ Export
            </Btn>
          </div>
        }
      />

      {/* KPI Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {kpis.map((k) => (
          <div
            key={k.label}
            style={{
              background: T.surf,
              borderRadius: 12,
              padding: "16px 18px",
              border: `1px solid ${T.border}`,
              position: "relative",
              overflow: "hidden",
              transition: "transform .2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: k.accent,
              }}
            />
            <div style={{ fontSize: 20, marginBottom: 8 }}>{k.icon}</div>
            <div
              style={{
                fontSize: 10,
                color: T.muted,
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: 4,
              }}
            >
              {k.label}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: T.txt,
                marginBottom: 5,
              }}
            >
              {k.value}
            </div>
            <div style={{ fontSize: 11, color: T.muted }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 18,
        }}
      >
        {/* Bar Chart */}
        <Card style={{ padding: 18 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: T.txt,
              marginBottom: 3,
            }}
          >
            GMV Harian (7 Hari)
          </div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 16 }}>
            Total transaksi dalam juta rupiah
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              height: 100,
            }}
          >
            {bars.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div style={{ fontSize: 9, color: T.muted }}>{vals[i]}</div>
                <div
                  style={{
                    width: "100%",
                    height: `${h}%`,
                    background: i >= 5 ? T.sage : T.gold,
                    borderRadius: "4px 4px 0 0",
                    transition: "all .3s",
                    minHeight: 4,
                  }}
                />
                <div style={{ fontSize: 9, color: T.muted }}>{days[i]}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Category Distribution */}
        <Card style={{ padding: 18 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: T.txt,
              marginBottom: 3,
            }}
          >
            Penjualan per Kategori
          </div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 16 }}>
            Distribusi produk terlaris bulan ini
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {catData.map((c) => (
              <div key={c.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: T.muted,
                    marginBottom: 4,
                  }}
                >
                  <span>{c.label}</span>
                  <span style={{ color: c.color, fontWeight: 700 }}>
                    {c.pct}%
                  </span>
                </div>
                <div
                  style={{ height: 6, background: T.surf3, borderRadius: 100 }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${c.pct}%`,
                      background: c.color,
                      borderRadius: 100,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity + Top Mitra */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card style={{ padding: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: T.gold,
                  marginBottom: 2,
                }}
              >
                Feed
              </div>
              <div
                style={{
                  fontFamily: "var(--font-playfair, serif)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: T.txt,
                }}
              >
                Aktivitas Terbaru
              </div>
            </div>
            <Btn variant="dark" sm>
              Lihat Semua
            </Btn>
          </div>
          <div>
            {activity.map((a, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "9px 0",
                  borderBottom: `1px solid ${T.border}`,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: T.surf2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    flexShrink: 0,
                  }}
                >
                  {a.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>
                    {a.desc}
                  </div>
                  <div style={{ fontSize: 11, color: T.muted }}>{a.sub}</div>
                </div>
                <div style={{ fontSize: 10, color: T.muted, flexShrink: 0 }}>
                  {a.time}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 18 }}>
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: T.gold,
                marginBottom: 2,
              }}
            >
              Status
            </div>
            <div
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: 17,
                fontWeight: 700,
                color: T.txt,
              }}
            >
              Top Mitra Bulan Ini
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {["Mitra", "GMV", "Transaksi", "Status"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 10px",
                      textAlign: "left",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: T.muted2,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topMitra.map((m) => (
                <tr
                  key={m.code}
                  style={{ borderBottom: `1px solid ${T.border}` }}
                >
                  <td style={{ padding: "10px 10px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 7,
                          background: T.surf2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          flexShrink: 0,
                        }}
                      >
                        {m.icon}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: T.txt,
                          }}
                        >
                          {m.name}
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            color: T.muted,
                            fontFamily: "monospace",
                          }}
                        >
                          {m.code}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "10px 10px",
                      fontSize: 12,
                      fontWeight: 700,
                      color: T.gold,
                    }}
                  >
                    {m.gmv}
                  </td>
                  <td
                    style={{
                      padding: "10px 10px",
                      fontSize: 12,
                      color: T.muted,
                    }}
                  >
                    {m.txn}
                  </td>
                  <td style={{ padding: "10px 10px" }}>
                    <Badge color={m.status}>
                      {m.status === "green" ? "✓ Aktif" : "● Review"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
