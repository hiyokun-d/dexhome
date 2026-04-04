export function Dashboard() {
  const kpis = [
    {
      icon: "⭐",
      label: "Total Poin",
      value: "4.820",
      sub: "≈ Rp 48.200 · ↑ +320 bulan ini",
      accent: T.gold,
    },
    {
      icon: "🛍️",
      label: "Total Belanja",
      value: "Rp 34,7jt",
      sub: "18 transaksi · 3 bulan ini",
      accent: T.terra,
    },
    {
      icon: "🎫",
      label: "Voucher Aktif",
      value: "3",
      sub: "Exp: 31 Mar 2026",
      accent: "#4A90D9",
    },
    {
      icon: "🛡️",
      label: "Produk Diasuransikan",
      value: "4",
      sub: "Semua aktif & terlindungi",
      accent: T.sage,
    },
  ];

  const orders = [
    {
      icon: "🛋️",
      name: "Sofa Scandinavian",
      brand: "Homera Studio · #DXH-2603-0041",
      price: "Rp 8.500.000",
      pts: "+850",
      status: "green" as const,
      statusLabel: "✓ Selesai",
    },
    {
      icon: "🪞",
      name: "Cermin Arch",
      brand: "MirrorMade · #DXH-2603-0039",
      price: "Rp 2.100.000",
      pts: "+210",
      status: "gold" as const,
      statusLabel: "🚚 Dikirim",
    },
    {
      icon: "💡",
      name: "Lampu Rattan",
      brand: "LuxeLight ID · #DXH-2602-0031",
      price: "Rp 1.250.000",
      pts: "+125",
      status: "green" as const,
      statusLabel: "✓ Selesai",
    },
    {
      icon: "🛏️",
      name: "Ranjang Oak King",
      brand: "Woodcraft Co. · #DXH-2601-0018",
      price: "Rp 12.200.000",
      pts: "+1.220",
      status: "green" as const,
      statusLabel: "✓ Selesai",
    },
    {
      icon: "🍽️",
      name: "Meja Makan Jati",
      brand: "Teak & Grain · #DXH-2512-0009",
      price: "Rp 5.800.000",
      pts: "+580",
      status: "red" as const,
      statusLabel: "↩ Klaim",
    },
  ];

  const points = [
    {
      icon: "⭐",
      type: "earn",
      title: "Pembelian Sofa Scandinavian",
      date: "15 Mar 2026",
      val: "+850",
    },
    {
      icon: "🎁",
      type: "bonus",
      title: "Bonus Check-in Bulanan",
      date: "01 Mar 2026",
      val: "+100",
    },
    {
      icon: "🎫",
      type: "redeem",
      title: "Ditukar: Voucher Rp 50rb",
      date: "25 Feb 2026",
      val: "−500",
    },
    {
      icon: "⭐",
      type: "earn",
      title: "Pembelian Cermin Arch",
      date: "08 Mar 2026",
      val: "+210",
    },
  ];

  const vouchers = [
    {
      icon: "🎫",
      name: "Diskon Member",
      val: "Rp 50.000",
      exp: "31 Mar 2026",
      code: "DHGOLD50",
    },
    {
      icon: "🚚",
      name: "Gratis Ongkir",
      val: "100%",
      exp: "15 Apr 2026",
      code: "DHFREE",
    },
    {
      icon: "💎",
      name: "Cashback Gold",
      val: "10%",
      exp: "30 Apr 2026",
      code: "DHCB10",
    },
  ];

  return (
    <div className="fade-up">
      {/* Greeting */}
      <div style={{ marginBottom: 22 }}>
        <h1
          style={{
            fontFamily: "var(--font-playfair, serif)",
            fontSize: 28,
            fontWeight: 700,
            color: T.brown,
          }}
        >
          Selamat Pagi, Budi! 👋
        </h1>
        <p style={{ fontSize: 14, color: T.muted, marginTop: 3 }}>
          Kamis, 19 Maret 2026 · 2 pesanan sedang diproses
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
            position: "absolute",
            width: 220,
            height: 220,
            background:
              "radial-gradient(circle,rgba(201,150,42,.2),transparent 70%)",
            top: -60,
            right: -40,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: T.gold,
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              padding: "3px 12px",
              borderRadius: 100,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            👑 Gold Member
          </div>
          <div
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 6,
            }}
          >
            Budi Santoso
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.6)" }}>
            Total Poin:{" "}
            <strong
              style={{
                fontSize: 18,
                color: T.gold,
                fontFamily: "var(--font-playfair, serif)",
              }}
            >
              4.820 pts
            </strong>
          </div>
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "rgba(255,255,255,.45)",
                marginBottom: 6,
              }}
            >
              <span>Gold → Platinum</span>
              <span>4.820 / 10.000 pts</span>
            </div>
            <div
              style={{
                height: 6,
                background: "rgba(255,255,255,.12)",
                borderRadius: 100,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "48.2%",
                  background: T.gold,
                  borderRadius: 100,
                }}
              />
            </div>
          </div>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,.4)",
              marginTop: 8,
            }}
          >
            Butuh <strong style={{ color: T.gold }}>5.180 poin</strong> lagi
            untuk naik ke Platinum
          </p>
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              border: "3px solid rgba(201,150,42,.35)",
              background: "rgba(255,255,255,.06)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 8px",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, color: T.gold }}>
              48%
            </div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)" }}>
              Menuju Platinum
            </div>
          </div>
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,.35)",
              marginBottom: 8,
            }}
          >
            Berlaku s.d. Des 2026
          </div>
          <Btn variant="gold" sm>
            Tukar Poin →
          </Btn>
        </div>
      </div>

      {/* KPI Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
          marginBottom: 22,
        }}
      >
        {kpis.map((k) => (
          <Card
            key={k.label}
            style={{
              padding: "16px 18px",
              position: "relative",
              overflow: "hidden",
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
            <div style={{ fontSize: 22, marginBottom: 8 }}>{k.icon}</div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
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
                fontSize: 24,
                fontWeight: 700,
                color: T.brown,
                marginBottom: 5,
              }}
            >
              {k.value}
            </div>
            <div style={{ fontSize: 11, color: T.muted }}>{k.sub}</div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: "flex", gap: 12, marginBottom: 22 }}>
        {[
          ["🛍️", "Belanja"],
          ["📦", "Pesanan"],
          ["🛡️", "Garansi"],
          ["💬", "Bantuan"],
          ["🎫", "Voucher"],
        ].map(([icon, label]) => (
          <div
            key={label}
            style={{
              flex: 1,
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: "14px 10px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = T.gold;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = T.border;
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.brown }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {/* Recent Orders */}
        <Card style={{ overflow: "hidden" }}>
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                Riwayat
              </div>
              <div
                style={{
                  fontFamily: "var(--font-playfair, serif)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: T.brown,
                }}
              >
                Pembelian Terbaru
              </div>
            </div>
            <Btn variant="outline" sm>
              Lihat Semua
            </Btn>
          </div>
          <table
            className="data-table"
            style={{ "--border-color": T.border } as React.CSSProperties}
          >
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {["Produk", "Total", "Poin", "Status"].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: T.muted,
                      padding: "10px 16px",
                      textAlign: "left",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.name}
                  style={{ borderBottom: `1px solid ${T.border}` }}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: T.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          flexShrink: 0,
                          border: `1px solid ${T.border}`,
                        }}
                      >
                        {o.icon}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: T.brown,
                          }}
                        >
                          {o.name}
                        </div>
                        <div style={{ fontSize: 10, color: T.muted }}>
                          {o.brand}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: T.brown,
                    }}
                  >
                    {o.price}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: 12,
                      fontWeight: 700,
                      color: T.sage,
                    }}
                  >
                    {o.pts}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <Badge color={o.status}>{o.statusLabel}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Points Activity */}
          <Card style={{ padding: 18 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: T.gold,
                marginBottom: 3,
              }}
            >
              Poin
            </div>
            <div
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: 16,
                fontWeight: 700,
                color: T.brown,
                marginBottom: 14,
              }}
            >
              Aktivitas Poin
            </div>
            {points.map((p) => (
              <div
                key={p.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom: `1px solid ${T.border}`,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background:
                      p.type === "redeem"
                        ? "rgba(196,87,42,.1)"
                        : p.type === "bonus"
                          ? "rgba(74,144,217,.1)"
                          : T.goldP,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 12, fontWeight: 500, color: T.brown }}
                  >
                    {p.title}
                  </div>
                  <div style={{ fontSize: 10, color: T.muted }}>{p.date}</div>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: p.val.startsWith("−") ? T.terra : T.sage,
                  }}
                >
                  {p.val}
                </div>
              </div>
            ))}
          </Card>

          {/* Vouchers */}
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
                  Voucher
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-playfair, serif)",
                    fontSize: 16,
                    fontWeight: 700,
                    color: T.brown,
                  }}
                >
                  Voucher Aktif
                </div>
              </div>
              <Btn variant="outline" sm>
                + Tukar
              </Btn>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {vouchers.map((v) => (
                <div
                  key={v.name}
                  style={{
                    display: "flex",
                    borderRadius: 10,
                    overflow: "hidden",
                    border: `1px solid ${T.border}`,
                  }}
                >
                  <div
                    style={{
                      background: T.brown,
                      padding: "12px 10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 52,
                      fontSize: 20,
                    }}
                  >
                    {v.icon}
                  </div>
                  <div style={{ padding: "10px 14px", flex: 1 }}>
                    <div
                      style={{ fontSize: 12, fontWeight: 600, color: T.brown }}
                    >
                      {v.name}
                    </div>
                    <div
                      style={{ fontSize: 16, fontWeight: 700, color: T.gold }}
                    >
                      {v.val}
                    </div>
                    <div style={{ fontSize: 10, color: T.muted }}>
                      Exp: {v.exp}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingRight: 12,
                    }}
                  >
                    <Btn variant="outline" sm>
                      Pakai →
                    </Btn>
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
