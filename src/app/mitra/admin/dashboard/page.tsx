export function Dashboard() {
  const kpis = [
    {
      icon: "💰",
      label: "GMV Bulan Ini",
      value: "Rp 148jt",
      sub: "↑ +22% vs bulan lalu",
      accent: T.purple,
    },
    {
      icon: "🛍️",
      label: "Total Order",
      value: "84",
      sub: "↑ +8 minggu ini",
      accent: T.gold,
    },
    {
      icon: "📦",
      label: "Stok Kritis",
      value: "3",
      sub: "Perlu restock segera",
      accent: T.terra,
    },
    {
      icon: "⭐",
      label: "Rating Toko",
      value: "4.9",
      sub: "128 ulasan · Sangat Baik",
      accent: T.sage,
    },
  ];

  const recentOrders = [
    {
      id: "#DXH-2603-0091",
      product: "Sofa Scandinavian",
      customer: "Andi Wirawan",
      time: "5 mnt lalu",
      status: "new" as const,
      amount: "Rp 8.500.000",
    },
    {
      id: "#DXH-2603-0089",
      product: "Kursi Makan Oak (×4)",
      customer: "Siti Rahayu",
      time: "2j lalu",
      status: "processing" as const,
      amount: "Rp 11.200.000",
    },
    {
      id: "#DXH-2603-0085",
      product: "Lampu Rattan",
      customer: "Deni Pratama",
      time: "3j lalu",
      status: "shipped" as const,
      amount: "Rp 1.250.000",
    },
    {
      id: "#DXH-2603-0082",
      product: "Cermin Arch Brass",
      customer: "Maya Lestari",
      time: "5j lalu",
      status: "done" as const,
      amount: "Rp 2.100.000",
    },
    {
      id: "#DXH-2603-0078",
      product: "Sofa L-Shape Premium",
      customer: "Budi Santoso",
      time: "1 hari lalu",
      status: "done" as const,
      amount: "Rp 14.800.000",
    },
  ];

  const statusMap: Record<
    string,
    { color: "pur" | "gold" | "blue" | "green"; label: string }
  > = {
    new: { color: "pur", label: "🆕 Baru" },
    processing: { color: "gold", label: "🔄 Proses" },
    shipped: { color: "blue", label: "🚚 Dikirim" },
    done: { color: "green", label: "✓ Selesai" },
  };

  return (
    <div className="fade-up">
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: T.purpleL,
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                width: 16,
                height: 2,
                background: T.purpleL,
                display: "inline-block",
              }}
            />
            Dashboard
          </div>
          <div
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: 20,
              fontWeight: 700,
              color: T.txt,
            }}
          >
            Dashboard Mitra Admin
          </div>
          <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
            Kamis, 19 Maret 2026 · Data real-time
          </p>
        </div>
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
          </select>
          <Btn variant="outline" sm>
            ⬇ Export
          </Btn>
        </div>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
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
              transition: "transform .2s, box-shadow .2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 12px 48px rgba(0,0,0,.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "";
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

      {/* Recent Orders */}
      <Card style={{ overflow: "hidden", marginBottom: 18 }}>
        <div
          style={{
            padding: "14px 18px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, color: T.txt }}>
            Order Terbaru
          </div>
          <Btn variant="outline" sm>
            Lihat Semua
          </Btn>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {[
                "Order ID",
                "Produk",
                "Customer",
                "Waktu",
                "Jumlah",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 16px",
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
            {recentOrders.map((o) => (
              <tr key={o.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 11,
                    color: T.muted,
                    fontFamily: "monospace",
                  }}
                >
                  {o.id}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: T.txt,
                  }}
                >
                  {o.product}
                </td>
                <td
                  style={{ padding: "12px 16px", fontSize: 12, color: T.muted }}
                >
                  {o.customer}
                </td>
                <td
                  style={{ padding: "12px 16px", fontSize: 11, color: T.muted }}
                >
                  {o.time}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: T.gold,
                  }}
                >
                  {o.amount}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <Badge color={statusMap[o.status].color}>
                    {statusMap[o.status].label}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Stock Alerts */}
      <Card style={{ padding: 18 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: T.txt,
            marginBottom: 14,
          }}
        >
          ⚠️ Peringatan Stok
        </div>
        {[
          {
            icon: "🛋️",
            name: "Sofa L-Shape Premium",
            sku: "HMS-SOFA-003",
            stock: 2,
          },
          {
            icon: "🪞",
            name: "Cermin Dressing Brass",
            sku: "HMS-MIR-002",
            stock: 0,
          },
          {
            icon: "🪑",
            name: "Kursi Makan Solid Oak",
            sku: "HMS-CHAIR-003",
            stock: 4,
          },
        ].map((item) => (
          <div
            key={item.sku}
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
                borderRadius: 8,
                background: T.surf2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>
                {item.name}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: T.muted,
                  fontFamily: "monospace",
                }}
              >
                {item.sku}
              </div>
            </div>
            <Badge color={item.stock === 0 ? "red" : "gold"}>
              {item.stock === 0 ? "⚠️ Habis" : `⚠️ Stok: ${item.stock}`}
            </Badge>
            <Btn variant="primary" sm>
              Update Stok
            </Btn>
          </div>
        ))}
      </Card>
    </div>
  );
}
