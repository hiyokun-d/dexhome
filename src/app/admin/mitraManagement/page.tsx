export function MitraManagement() {
  const mitras = [
    {
      icon: "🏢",
      name: "Homera Studio",
      code: "MTR-0001",
      city: "Jakarta Selatan",
      products: 18,
      gmv: "Rp 148jt",
      status: "active",
      joined: "Jan 2024",
    },
    {
      icon: "🪵",
      name: "Woodcraft Co.",
      code: "MTR-0002",
      city: "Jakarta Selatan",
      products: 14,
      gmv: "Rp 122jt",
      status: "active",
      joined: "Feb 2024",
    },
    {
      icon: "🍃",
      name: "Teak & Grain",
      code: "MTR-0003",
      city: "Jakarta Pusat",
      products: 11,
      gmv: "Rp 98jt",
      status: "active",
      joined: "Mar 2024",
    },
    {
      icon: "💡",
      name: "LuxeLight ID",
      code: "MTR-0004",
      city: "Jakarta Selatan",
      products: 22,
      gmv: "Rp 76jt",
      status: "active",
      joined: "Apr 2024",
    },
    {
      icon: "🪞",
      name: "MirrorMade",
      code: "MTR-0005",
      city: "Surabaya",
      products: 9,
      gmv: "Rp 54jt",
      status: "review",
      joined: "Jan 2026",
    },
    {
      icon: "🌿",
      name: "Artisan Wood Bali",
      code: "MTR-0006",
      city: "Denpasar",
      products: 0,
      gmv: "—",
      status: "onboarding",
      joined: "Mar 2026",
    },
  ];

  const statusMap: Record<
    string,
    { color: "green" | "gold" | "blue" | "grey"; label: string }
  > = {
    active: { color: "green", label: "✓ Aktif" },
    review: { color: "gold", label: "⏳ Review" },
    onboarding: { color: "blue", label: "🆕 Onboarding" },
  };

  return (
    <div className="fade-up">
      <SectionHeader
        label="Mitra"
        title="Kelola Mitra Showroom"
        action={
          <Btn variant="primary" sm>
            + Daftarkan Mitra
          </Btn>
        }
      />

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          { label: "Total Mitra", value: "180", icon: "🏬", accent: T.gold },
          { label: "Aktif", value: "166", icon: "✅", accent: T.sage },
          { label: "Review", value: "9", icon: "⏳", accent: "#E8A020" },
          { label: "Kota", value: "12", icon: "📍", accent: T.blue },
        ].map((s) => (
          <Card
            key={s.label}
            style={{
              padding: "14px 16px",
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
                background: s.accent,
              }}
            />
            <div style={{ fontSize: 18, marginBottom: 6 }}>{s.icon}</div>
            <div
              style={{
                fontSize: 10,
                color: T.muted,
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: 2,
              }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.txt }}>
              {s.value}
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {[
                "Mitra",
                "Kode",
                "Kota",
                "Produk",
                "GMV Bulan Ini",
                "Status",
                "Bergabung",
                "Aksi",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "11px 14px",
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
            {mitras.map((m) => (
              <tr
                key={m.code}
                style={{ borderBottom: `1px solid ${T.border}` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background =
                    T.surf2;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background =
                    "";
                }}
              >
                <td style={{ padding: "12px 14px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        background: T.surf2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        flexShrink: 0,
                      }}
                    >
                      {m.icon}
                    </div>
                    <span
                      style={{ fontSize: 12, fontWeight: 600, color: T.txt }}
                    >
                      {m.name}
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 11,
                    color: T.muted,
                    fontFamily: "monospace",
                  }}
                >
                  {m.code}
                </td>
                <td
                  style={{ padding: "12px 14px", fontSize: 12, color: T.muted }}
                >
                  {m.city}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: T.txt,
                  }}
                >
                  {m.products}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: T.gold,
                  }}
                >
                  {m.gmv}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <Badge color={statusMap[m.status].color}>
                    {statusMap[m.status].label}
                  </Badge>
                </td>
                <td
                  style={{ padding: "12px 14px", fontSize: 11, color: T.muted }}
                >
                  {m.joined}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <Btn variant="dark" sm>
                      Detail
                    </Btn>
                    <Btn variant="dark" sm>
                      Edit
                    </Btn>
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
