export function KatalogMitra() {
  const products = [
    {
      icon: "🛋️",
      name: "Sofa Modular Scandinavian",
      sku: "HMS-SOFA-001",
      price: "Rp 8.500.000",
      stock: 28,
      status: "active" as const,
    },
    {
      icon: "🪑",
      name: "Kursi Makan Solid Oak",
      sku: "HMS-CHAIR-003",
      price: "Rp 2.800.000",
      stock: 15,
      status: "active" as const,
    },
    {
      icon: "🛏️",
      name: "Headboard Bouclé",
      sku: "HMS-BED-007",
      price: "Rp 3.400.000",
      stock: 6,
      status: "active" as const,
    },
    {
      icon: "🪞",
      name: "Cermin Dressing Brass",
      sku: "HMS-MIR-002",
      price: "Rp 1.900.000",
      stock: 0,
      status: "inactive" as const,
    },
    {
      icon: "💡",
      name: "Lampu Gantung Rattan",
      sku: "HMS-LMP-011",
      price: "Rp 1.250.000",
      stock: 42,
      status: "active" as const,
    },
    {
      icon: "🛋️",
      name: "Sofa Satu Dudukan",
      sku: "HMS-SOFA-005",
      price: "Rp 3.200.000",
      stock: 2,
      status: "active" as const,
    },
  ];

  return (
    <div className="fade-up">
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 18,
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
              marginBottom: 4,
            }}
          >
            Produk Saya
          </div>
          <div
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: 22,
              fontWeight: 700,
              color: T.brown,
            }}
          >
            Katalog Showroom
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="outline" sm>
            ⬇ Export
          </Btn>
          <Btn variant="primary" sm>
            + Ajukan Produk
          </Btn>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
          marginBottom: 22,
        }}
      >
        {[
          { label: "Total Produk", value: "6", icon: "📦", accent: T.gold },
          { label: "Produk Aktif", value: "5", icon: "✅", accent: T.sage },
          { label: "Stok Habis", value: "1", icon: "⚠️", accent: T.terra },
          { label: "Total Stok", value: "93", icon: "📊", accent: T.blue },
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
            <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
            <div
              style={{
                fontSize: 11,
                color: T.muted,
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: 2,
              }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: T.brown }}>
              {s.value}
            </div>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {["Produk", "SKU", "Harga", "Stok", "Status", "Aksi"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: T.muted,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.sku} style={{ borderBottom: `1px solid ${T.border}` }}>
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
                      }}
                    >
                      {p.icon}
                    </div>
                    <span
                      style={{ fontSize: 12, fontWeight: 600, color: T.brown }}
                    >
                      {p.name}
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 11,
                    color: T.muted,
                    fontFamily: "monospace",
                  }}
                >
                  {p.sku}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: T.brown,
                  }}
                >
                  {p.price}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color:
                        p.stock === 0
                          ? T.terra
                          : p.stock <= 5
                            ? "#E8A020"
                            : T.sage,
                    }}
                  >
                    {p.stock}
                  </span>
                  {p.stock === 0 && <Badge color="red">Habis</Badge>}
                  {p.stock > 0 && p.stock <= 5 && (
                    <span
                      style={{ fontSize: 10, color: "#E8A020", marginLeft: 6 }}
                    >
                      ⚠️ Menipis
                    </span>
                  )}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <Badge color={p.status === "active" ? "green" : "grey"}>
                    {p.status === "active" ? "● Aktif" : "○ Nonaktif"}
                  </Badge>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Btn variant="outline" sm>
                      Edit
                    </Btn>
                    <Btn variant="outline" sm>
                      Stok
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
