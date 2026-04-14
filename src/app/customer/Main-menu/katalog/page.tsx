"use client";
import { useCallback, useEffect, useState } from "react";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";

const T = {
  bg: "#F5F0E8",
  warm: "#FDFAF5",
  card: "#fff",
  brown: "#2C1810",
  brown2: "#3D2318",
  gold: "#C9962A",
  goldL: "#E8B84B",
  goldP: "rgba(201,150,42,.10)",
  terra: "#C4572A",
  sage: "#7A8C6E",
  muted: "#8A7F74",
  border: "#E2D8C8",
  char: "#1A1A1A",
};

type ProductImage = { id: string; url: string; order: number };
type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  pointsPerTxn: number;
  memberDiscountPct: number;
  mitra: { showroomName: string };
  category: { name: string; icon: string };
  images: ProductImage[];
  avgRating: number | null;
  reviewCount: number;
};
type Category = { id: string; name: string; slug: string; icon: string };
type DevCustomer = { id: string; fullName: string; user: { email: string } };

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

// Special chip keys that aren't category slugs
const CHIP_ALL   = "__all__";
const CHIP_PROMO = "__promo__";
const CHIP_TOP   = "__top__";

export function Katalog() {
  // TODO: replace with session.profileId once auth is wired
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [devCustomers, setDevCustomers] = useState<DevCustomer[]>([]);

  const [activeChip, setActiveChip] = useState(CHIP_ALL);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // ── dev: seeded customer for wishlist ──────────────────────────────────────
  useEffect(() => {
    fetch("/api/dev/customers")
      .then((r) => r.json())
      .then(({ data }) => {
        if (data?.length) { setDevCustomers(data); setCustomerId(data[0].id); }
      })
      .catch(() => {});
  }, []);

  // ── fetch categories ───────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/item/category")
      .then((r) => r.json())
      .then(({ data }) => { if (data) setCategories(data); })
      .catch(() => {});
  }, []);

  // ── fetch wishlist when customer loads ────────────────────────────────────
  useEffect(() => {
    if (!customerId) return;
    fetch(`/api/customer/wishlist?customerId=${customerId}`)
      .then((r) => r.json())
      .then(({ data }) => {
        if (data) setWishlisted(new Set(data.map((item: { product: { id: string } }) => item.product.id)));
      })
      .catch(() => {});
  }, [customerId]);

  // ── fetch products ─────────────────────────────────────────────────────────
  const fetchProducts = useCallback((chip: string) => {
    setLoading(true);
    setError(false);

    let url = "/api/item?limit=24";
    // if chip is a real category slug, use it
    if (chip !== CHIP_ALL && chip !== CHIP_PROMO && chip !== CHIP_TOP) {
      url += `&category=${encodeURIComponent(chip)}`;
    }

    fetch(url)
      .then((r) => r.json())
      .then(({ data }) => {
        let items: Product[] = data ?? [];
        if (chip === CHIP_PROMO) items = items.filter((p) => p.originalPrice && p.originalPrice > p.price);
        if (chip === CHIP_TOP)   items = [...items].sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0));
        setProducts(items);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  useEffect(() => { fetchProducts(activeChip); }, [activeChip, fetchProducts]);

  // ── wishlist toggle ────────────────────────────────────────────────────────
  async function toggleWishlist(e: React.MouseEvent, productId: string) {
    e.stopPropagation();
    if (!customerId || togglingId) return;
    setTogglingId(productId);
    // optimistic
    setWishlisted((prev) => {
      const next = new Set(prev);
      next.has(productId) ? next.delete(productId) : next.add(productId);
      return next;
    });
    try {
      const res = await fetch("/api/customer/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, productId }),
      });
      const { data } = await res.json();
      if (data) {
        setWishlisted((prev) => {
          const next = new Set(prev);
          data.wishlisted ? next.add(productId) : next.delete(productId);
          return next;
        });
      }
    } catch {
      // revert optimistic
      setWishlisted((prev) => {
        const next = new Set(prev);
        next.has(productId) ? next.delete(productId) : next.add(productId);
        return next;
      });
    } finally {
      setTogglingId(null);
    }
  }

  // ── chips: Semua + real categories + Promo + Rating Tinggi ────────────────
  const chips: { key: string; label: string }[] = [
    { key: CHIP_ALL,   label: "Semua" },
    ...categories.map((c) => ({ key: c.slug, label: `${c.icon} ${c.name}` })),
    { key: CHIP_TOP,   label: "⭐ Rating Tinggi" },
    { key: CHIP_PROMO, label: "🏷️ Promo" },
  ];

  return (
    <div className="fade-up">
      {/* DEV customer picker */}
      {devCustomers.length > 0 && (
        <div
          style={{
            marginBottom: 14, padding: "7px 14px",
            background: T.goldP, border: `1px dashed ${T.gold}`,
            borderRadius: 8, display: "flex", alignItems: "center",
            gap: 10, fontSize: 11, color: T.brown,
          }}
        >
          <span style={{ fontWeight: 700, color: T.gold }}>DEV</span>
          Wishlist sebagai:
          <select
            value={customerId ?? ""}
            onChange={(e) => setCustomerId(e.target.value)}
            style={{ fontSize: 11, border: `1px solid ${T.border}`, borderRadius: 5, padding: "2px 6px", background: T.warm, color: T.brown }}
          >
            {devCustomers.map((c) => (
              <option key={c.id} value={c.id}>{c.fullName} ({c.user.email})</option>
            ))}
          </select>
        </div>
      )}

      <SectionHeader
        label="Produk"
        title="Katalog Lengkap"
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="outline" sm>⊞ Grid</Btn>
            <Btn variant="primary" sm>🗺️ Lihat Peta</Btn>
          </div>
        }
      />

      {/* Location Banner */}
      <div
        style={{
          background: `linear-gradient(135deg, ${T.brown}, ${T.brown2})`,
          borderRadius: 14, padding: "16px 22px",
          display: "flex", alignItems: "center", gap: 14,
          marginBottom: 20, position: "relative", overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, background: "radial-gradient(circle,rgba(201,150,42,.15),transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ width: 46, height: 46, borderRadius: 11, background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
          📍
        </div>
        <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Menampilkan mitra terdekat dari lokasi Anda</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", marginTop: 2 }}>Produk diurutkan dari showroom terdekat untuk estimasi pengiriman terbaik</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>
            🏬 {products.length} produk ditemukan
          </div>
          <Btn variant="gold" sm>📍 Jakarta Selatan ▾</Btn>
        </div>
      </div>

      {/* Category chips */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {chips.map((c) => (
          <button
            type="button"
            key={c.key}
            onClick={() => setActiveChip(c.key)}
            style={{
              padding: "6px 16px", borderRadius: 100, fontSize: 12, fontWeight: 500,
              cursor: "pointer", transition: "all .2s",
              border: `1.5px solid ${activeChip === c.key ? T.brown : T.border}`,
              background: activeChip === c.key ? T.brown : T.card,
              color: activeChip === c.key ? "#fff" : T.muted,
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
        {/* Filter Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Category filter */}
          <Card style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.brown }}>Kategori</div>
              <button
                type="button"
                onClick={() => setActiveChip(CHIP_ALL)}
                style={{ fontSize: 10, color: T.muted, background: "none", border: "none", cursor: "pointer" }}
              >
                Reset
              </button>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8, cursor: "pointer" }}>
              <div
                style={{
                  width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                  border: `1.5px solid ${activeChip === CHIP_ALL ? T.gold : T.border}`,
                  background: activeChip === CHIP_ALL ? T.gold : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, color: "#fff",
                }}
                onClick={() => setActiveChip(CHIP_ALL)}
              >
                {activeChip === CHIP_ALL ? "✓" : ""}
              </div>
              <span style={{ fontSize: 12, color: T.brown }}>Semua Kategori</span>
            </label>
            {categories.map((cat) => (
              <label key={cat.id} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8, cursor: "pointer" }}>
                <div
                  style={{
                    width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                    border: `1.5px solid ${activeChip === cat.slug ? T.gold : T.border}`,
                    background: activeChip === cat.slug ? T.gold : "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: "#fff",
                  }}
                  onClick={() => setActiveChip(cat.slug)}
                >
                  {activeChip === cat.slug ? "✓" : ""}
                </div>
                <span style={{ fontSize: 12, color: T.brown, flex: 1 }}>{cat.name}</span>
                <span style={{ fontSize: 10, color: T.muted }}>{cat.icon}</span>
              </label>
            ))}
          </Card>

          {/* Price filter */}
          <Card style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.brown, marginBottom: 10 }}>Harga</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8 }}>
              <input
                defaultValue="500.000"
                style={{ flex: 1, padding: "7px 10px", border: `1.5px solid ${T.border}`, borderRadius: 7, fontSize: 11, outline: "none" }}
                placeholder="Min"
              />
              <span style={{ color: T.muted, fontSize: 12 }}>—</span>
              <input
                defaultValue="20.000.000"
                style={{ flex: 1, padding: "7px 10px", border: `1.5px solid ${T.border}`, borderRadius: 7, fontSize: 11, outline: "none" }}
                placeholder="Max"
              />
            </div>
            <Btn variant="primary" sm>Terapkan</Btn>
          </Card>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} style={{ overflow: "hidden", opacity: 0.5, animation: "pulse 1.5s ease-in-out infinite" }}>
                <div style={{ height: 160, background: T.border }} />
                <div style={{ padding: "12px 14px" }}>
                  <div style={{ height: 10, background: T.border, borderRadius: 4, marginBottom: 8, width: "60%" }} />
                  <div style={{ height: 14, background: T.border, borderRadius: 4, width: "80%" }} />
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200, color: T.muted, fontSize: 14 }}>
            Gagal memuat produk. Coba refresh halaman.
          </div>
        ) : products.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200, color: T.muted, fontSize: 14 }}>
            Tidak ada produk ditemukan.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {products.map((p) => {
              const hasDiscount = p.originalPrice !== null && p.originalPrice > p.price;
              const coverImage = p.images[0]?.url ?? null;
              const isWishlisted = wishlisted.has(p.id);

              return (
                <Card
                  key={p.id}
                  style={{ overflow: "hidden", cursor: "pointer", transition: "all .2s" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(44,24,16,.14)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      height: 160, background: `linear-gradient(135deg, ${T.bg}, #E8D5B0)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 56, position: "relative", overflow: "hidden",
                    }}
                  >
                    {coverImage
                      ? <img src={coverImage} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                      : p.category.icon}

                    {hasDiscount && (
                      <span style={{ position: "absolute", top: 8, left: 8, padding: "2px 8px", borderRadius: 100, background: T.terra, color: "#fff", fontSize: 9, fontWeight: 700, zIndex: 1 }}>
                        🏷️ Promo
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => toggleWishlist(e, p.id)}
                      disabled={!customerId || togglingId === p.id}
                      style={{
                        position: "absolute", top: 8, right: 8,
                        width: 30, height: 30, borderRadius: "50%",
                        background: "rgba(255,255,255,.9)", border: "none",
                        cursor: customerId ? "pointer" : "default",
                        fontSize: 14, zIndex: 1,
                        transition: "transform .15s",
                        transform: togglingId === p.id ? "scale(.85)" : "scale(1)",
                      }}
                    >
                      {isWishlisted ? "❤️" : "🤍"}
                    </button>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                      <div style={{ fontSize: 11, color: T.muted }}>{p.mitra.showroomName}</div>
                      <div style={{ fontSize: 11, color: T.muted, display: "flex", alignItems: "center", gap: 3 }}>
                        {p.avgRating !== null
                          ? <><span>⭐</span> {p.avgRating.toFixed(1)} <span style={{ color: T.border }}>({p.reviewCount})</span></>
                          : <span style={{ color: T.border }}>Belum ada ulasan</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.brown, marginBottom: 8 }}>{p.name}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: T.brown }}>{formatRupiah(p.price)}</div>
                        {hasDiscount && p.originalPrice && (
                          <div style={{ fontSize: 11, color: T.muted, textDecoration: "line-through" }}>{formatRupiah(p.originalPrice)}</div>
                        )}
                        <div style={{ fontSize: 10, color: T.sage, fontWeight: 600 }}>+{p.pointsPerTxn} poin</div>
                      </div>
                      <Btn variant="primary" sm>+ Keranjang</Btn>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Katalog;
