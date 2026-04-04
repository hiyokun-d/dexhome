export function CSAdmin() {
  const tickets = [
    {
      id: "#TKT-0048",
      user: "Andi W.",
      issue: "Pertanyaan pengiriman sofa oversized",
      priority: "normal" as const,
      status: "open" as const,
      time: "10 mnt lalu",
      agent: "—",
    },
    {
      id: "#TKT-0045",
      user: "Siti R.",
      issue: "Klaim garansi kursi makan patah",
      priority: "high" as const,
      status: "open" as const,
      time: "1j lalu",
      agent: "—",
    },
    {
      id: "#TKT-0042",
      user: "Budi S.",
      issue: "Pertanyaan garansi Sofa Scandinavian",
      priority: "normal" as const,
      status: "answered" as const,
      time: "2j lalu",
      agent: "Rina",
    },
    {
      id: "#TKT-0040",
      user: "Maya L.",
      issue: "Konfirmasi jadwal pengiriman cermin",
      priority: "normal" as const,
      status: "answered" as const,
      time: "3j lalu",
      agent: "Dian",
    },
    {
      id: "#TKT-0038",
      user: "Deni P.",
      issue: "Aktivasi asuransi lampu rattan",
      priority: "normal" as const,
      status: "resolved" as const,
      time: "5j lalu",
      agent: "Rina",
    },
  ];

  const statusMap: Record<
    string,
    { color: "red" | "gold" | "blue" | "green" | "grey"; label: string }
  > = {
    open: { color: "red", label: "🔴 Terbuka" },
    answered: { color: "gold", label: "💬 Dijawab" },
    resolved: { color: "green", label: "✅ Selesai" },
  };

  return (
    <div className="fade-up">
      <SectionHeader label="Customer Service" title="CS Admin Panel" />

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          { label: "Tiket Terbuka", value: "47", icon: "🔴", accent: T.terra },
          {
            label: "Rata-rata Respons",
            value: "2.4j",
            icon: "⏱️",
            accent: T.gold,
          },
          {
            label: "Diselesaikan Hari Ini",
            value: "18",
            icon: "✅",
            accent: T.sage,
          },
          {
            label: "Kepuasan (CSAT)",
            value: "4.8",
            icon: "⭐",
            accent: T.blue,
          },
        ].map((k) => (
          <Card
            key={k.label}
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
                background: k.accent,
              }}
            />
            <div style={{ fontSize: 18, marginBottom: 6 }}>{k.icon}</div>
            <div
              style={{
                fontSize: 10,
                color: T.muted,
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: 2,
              }}
            >
              {k.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.txt }}>
              {k.value}
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ overflow: "hidden" }}>
        <div
          style={{
            padding: "14px 18px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: 16,
              fontWeight: 700,
              color: T.txt,
            }}
          >
            Antrian Tiket
          </div>
          <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
            {["Semua", "Terbuka", "Dijawab", "Selesai"].map((f, i) => (
              <button
                type="button"
                key={f}
                style={{
                  padding: "4px 12px",
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: i === 0 ? 600 : 500,
                  cursor: "pointer",
                  border: `1px solid ${i === 0 ? T.gold : T.border}`,
                  background: i === 0 ? T.goldP : "none",
                  color: i === 0 ? T.gold : T.muted,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {[
                "ID",
                "Customer",
                "Masalah",
                "Prioritas",
                "Status",
                "Waktu",
                "Agent",
                "Aksi",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 14px",
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
            {tickets.map((t) => (
              <tr key={t.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <td
                  style={{
                    padding: "11px 14px",
                    fontSize: 11,
                    color: T.muted,
                    fontFamily: "monospace",
                  }}
                >
                  {t.id}
                </td>
                <td
                  style={{ padding: "11px 14px", fontSize: 12, color: T.txt }}
                >
                  {t.user}
                </td>
                <td
                  style={{
                    padding: "11px 14px",
                    fontSize: 12,
                    color: T.txt,
                    maxWidth: 200,
                  }}
                >
                  {t.issue}
                </td>
                <td style={{ padding: "11px 14px" }}>
                  <Badge color={t.priority === "high" ? "red" : "grey"}>
                    {t.priority === "high" ? "🔺 Tinggi" : "Normal"}
                  </Badge>
                </td>
                <td style={{ padding: "11px 14px" }}>
                  <Badge color={statusMap[t.status].color}>
                    {statusMap[t.status].label}
                  </Badge>
                </td>
                <td
                  style={{ padding: "11px 14px", fontSize: 11, color: T.muted }}
                >
                  {t.time}
                </td>
                <td
                  style={{ padding: "11px 14px", fontSize: 12, color: T.muted }}
                >
                  {t.agent}
                </td>
                <td style={{ padding: "11px 14px" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <Btn variant="dark" sm>
                      Buka
                    </Btn>
                    {t.status === "open" && (
                      <Btn variant="green" sm>
                        Assign
                      </Btn>
                    )}
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
