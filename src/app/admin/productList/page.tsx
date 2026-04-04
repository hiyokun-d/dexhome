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

export function ProductList() {
  const products = [
    {
      icon: "🛋️",
      name: "Sofa Modular Scandinavian",
      brand: "Homera Studio",
      category: "Ruang Tamu",
      price: "Rp 8.500.000",
      stock: 42,
      rating: "4.9",
      status: "active" as const,
    },
    {
      icon: "🛏️",
      name: "Ranjang Platform Oak",
      brand: "Woodcraft Co.",
      category: "Kamar Tidur",
      price: "Rp 12.200.000",
      stock: 18,
      rating: "4.8",
      status: "active" as const,
    },
    {
      icon: "💡",
      name: "Lampu Rattan Wabi-Sabi",
      brand: "LuxeLight ID",
      category: "Dekorasi",
      price: "Rp 1.250.000",
      stock: 84,
      rating: "4.7",
      status: "active" as const,
    },
    {
      icon: "🍽️",
      name: "Meja Makan Jati Solid",
      brand: "Teak & Grain",
      category: "Ruang Makan",
      price: "Rp 5.800.000",
      stock: 14,
      rating: "4.9",
      status: "active" as const,
    },
    {
      icon: "🪞",
      name: "Cermin Arch Brass",
      brand: "MirrorMade",
      category: "Dekorasi",
      price: "Rp 2.100.000",
      stock: 0,
      rating: "4.6",
      status: "inactive" as const,
    },
    {
      icon: "🪑",
      name: "Kursi Teras Anyaman",
      brand: "Greenspace",
      category: "Outdoor",
      price: "Rp 890.000",
      stock: 7,
      rating: "4.5",
      status: "review" as const,
    },
  ];

  return (
    <div className="fade-up">
      <SectionHeader
        label="Produk"
        title="Daftar Produk"
        action={
          <Btn variant="primary" sm>
            + Produk Baru
          </Btn>
        }
      />

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 18,
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: T.surf2,
            border: `1px solid ${T.border2}`,
            borderRadius: 100,
            padding: "7px 14px",
            flex: "0 0 280px",
          }}
        >
          <span style={{ color: T.muted, fontSize: 13 }}>🔍</span>
          <input
            placeholder="Cari nama produk, SKU, brand..."
            style={{
              border: "none",
              outline: "none",
              background: "none",
              fontSize: 12,
              color: T.txt,
              flex: 1,
            }}
          />
        </div>
        {["Semua", "Aktif", "Review", "Nonaktif"].map((f, i) => (
          <button
            type="button"
            key={f}
            style={{
              padding: "6px 14px",
              borderRadius: 100,
              fontSize: 12,
              fontWeight: i === 0 ? 600 : 500,
              cursor: "pointer",
              border: `1.5px solid ${i === 0 ? T.gold : T.border}`,
              background: i === 0 ? T.goldP : "none",
              color: i === 0 ? T.gold : T.muted,
            }}
          >
            {f}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Btn variant="dark" sm>
            ⬇ Export
          </Btn>
        </div>
      </div>

      <Card style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {[
                "Produk",
                "Brand",
                "Kategori",
                "Harga",
                "Stok",
                "Rating",
                "Status",
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
            {products.map((p) => (
              <tr
                key={p.name}
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
                      {p.icon}
                    </div>
                    <span
                      style={{ fontSize: 12, fontWeight: 600, color: T.txt }}
                    >
                      {p.name}
                    </span>
                  </div>
                </td>
                <td
                  style={{ padding: "12px 14px", fontSize: 11, color: T.muted }}
                >
                  {p.brand}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <Badge color="grey">{p.category}</Badge>
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: T.gold,
                  }}
                >
                  {p.price}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    fontWeight: 700,
                    color:
                      p.stock === 0
                        ? T.terra
                        : p.stock < 10
                          ? "#E8A020"
                          : T.sage,
                  }}
                >
                  {p.stock}
                </td>
                <td
                  style={{ padding: "12px 14px", fontSize: 12, color: T.muted }}
                >
                  ⭐ {p.rating}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <Badge
                    color={
                      p.status === "active"
                        ? "green"
                        : p.status === "review"
                          ? "gold"
                          : "grey"
                    }
                  >
                    {p.status === "active"
                      ? "● Aktif"
                      : p.status === "review"
                        ? "⏳ Review"
                        : "○ Nonaktif"}
                  </Badge>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <Btn variant="dark" sm>
                      Edit
                    </Btn>
                    <Btn variant="red" sm>
                      🗑
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

export default ProductList;
