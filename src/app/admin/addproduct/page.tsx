export function AddProduct() {
  return (
    <div className="fade-up">
      <SectionHeader
        label="Produk"
        title="Tambah Produk Baru"
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="dark" sm>
              💾 Simpan Draft
            </Btn>
            <Btn variant="primary" sm>
              🚀 Publikasikan
            </Btn>
          </div>
        }
      />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Basic Info */}
          <Card style={{ padding: 20 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: T.txt,
                marginBottom: 14,
              }}
            >
              📝 Informasi Dasar
            </div>
            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 10,
                  fontWeight: 700,
                  color: T.muted,
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Nama Produk *
              </label>
              <input
                defaultValue="Sofa Modular Scandinavian 3 Dudukan"
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: `1px solid ${T.border2}`,
                  borderRadius: 8,
                  fontSize: 12,
                  color: T.txt,
                  background: T.surf2,
                  outline: "none",
                }}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                marginBottom: 14,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: T.muted,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Brand / Mitra *
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: `1px solid ${T.border2}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: T.txt,
                    background: T.surf2,
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option>Homera Studio</option>
                  <option>Woodcraft Co.</option>
                  <option>Teak & Grain</option>
                  <option>LuxeLight ID</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: T.muted,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Kategori *
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: `1px solid ${T.border2}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: T.txt,
                    background: T.surf2,
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option>Ruang Tamu</option>
                  <option>Kamar Tidur</option>
                  <option>Ruang Makan</option>
                  <option>Dekorasi & Lampu</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 10,
                  fontWeight: 700,
                  color: T.muted,
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Deskripsi *
              </label>
              <textarea
                placeholder="Deskripsikan produk secara lengkap..."
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: `1px solid ${T.border2}`,
                  borderRadius: 8,
                  fontSize: 12,
                  color: T.txt,
                  background: T.surf2,
                  outline: "none",
                  resize: "vertical",
                  minHeight: 90,
                }}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 14,
              }}
            >
              {[
                ["SKU", "HMS-SOFA-001"],
                ["Berat (kg)", "48"],
                ["Dimensi (cm)", "240×90×80"],
              ].map(([lbl, val]) => (
                <div key={lbl}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 10,
                      fontWeight: 700,
                      color: T.muted,
                      letterSpacing: ".05em",
                      textTransform: "uppercase",
                      marginBottom: 5,
                    }}
                  >
                    {lbl}
                  </label>
                  <input
                    defaultValue={val}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      border: `1px solid ${T.border2}`,
                      borderRadius: 8,
                      fontSize: 12,
                      color: T.txt,
                      background: T.surf2,
                      outline: "none",
                    }}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Pricing */}
          <Card style={{ padding: 20 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: T.txt,
                marginBottom: 14,
              }}
            >
              💰 Harga & Promo
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                marginBottom: 14,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: T.muted,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Harga Normal (Rp) *
                </label>
                <input
                  defaultValue="8.500.000"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: `1px solid ${T.border2}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: T.txt,
                    background: T.surf2,
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: T.muted,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Harga Coret (Rp)
                </label>
                <input
                  defaultValue="10.000.000"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: `1px solid ${T.border2}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: T.txt,
                    background: T.surf2,
                    outline: "none",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: T.muted,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Diskon Member (%)
                </label>
                <input
                  defaultValue="10"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: `1px solid ${T.border2}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: T.txt,
                    background: T.surf2,
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: T.muted,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Poin per Transaksi
                </label>
                <input
                  defaultValue="850"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: `1px solid ${T.border2}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: T.gold,
                    background: T.surf2,
                    outline: "none",
                    fontWeight: 700,
                  }}
                />
              </div>
            </div>
          </Card>

          {/* Photos */}
          <Card style={{ padding: 20 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: T.txt,
                marginBottom: 4,
              }}
            >
              📸 Foto Produk
            </div>
            <p style={{ fontSize: 11, color: T.muted, marginBottom: 12 }}>
              Minimal 3 foto · JPG/PNG/WEBP · Maks 5MB/foto · Rasio 1:1
              direkomendasikan
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 10,
              }}
            >
              {["🛋️", "📐", "🎨", "📷", "📷", "📷"].map((ico, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 10,
                    border: `1.5px ${i < 3 ? "solid" : "dashed"} ${i < 3 ? T.gold : T.border}`,
                    background: i < 3 ? T.goldP : T.surf2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: i < 3 ? 24 : 16,
                    color: i < 3 ? T.gold : T.muted,
                  }}
                >
                  {ico}
                  {i >= 3 && (
                    <span style={{ fontSize: 9, marginTop: 4 }}>Upload</span>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Warranty */}
          <Card style={{ padding: 20 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: T.txt,
                marginBottom: 14,
              }}
            >
              🛡️ Garansi & Asuransi
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                marginBottom: 14,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: T.muted,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Garansi (bulan)
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: `1px solid ${T.border2}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: T.txt,
                    background: T.surf2,
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option>12 bulan</option>
                  <option>24 bulan</option>
                  <option>36 bulan</option>
                  <option>60 bulan</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: T.muted,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Jenis Garansi
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: `1px solid ${T.border2}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: T.txt,
                    background: T.surf2,
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option>Garansi Toko</option>
                  <option>Garansi Resmi Pabrik</option>
                  <option>Garansi DexHome</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {["Ya, tersedia", "Tidak"].map((opt, i) => (
                <label
                  key={opt}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: T.muted,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="insurance"
                    defaultChecked={i === 0}
                    style={{ accentColor: T.gold }}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </Card>
        </div>

        {/* Preview */}
        <div style={{ position: "sticky", top: 80 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: T.muted,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Preview Produk
          </div>
          <div
            style={{
              background: T.surf2,
              borderRadius: 12,
              border: `1px solid ${T.border}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 160,
                background: `linear-gradient(135deg, ${T.surf3}, #2A2420)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 56,
              }}
            >
              🛋️
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 11, color: T.muted, marginBottom: 4 }}>
                Homera Studio
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: T.txt,
                  marginBottom: 8,
                }}
              >
                Sofa Modular Scandinavian 3 Dudukan
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: T.gold,
                  marginBottom: 4,
                }}
              >
                Rp 8.500.000
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: T.muted,
                  textDecoration: "line-through",
                  marginBottom: 8,
                }}
              >
                Rp 10.000.000
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Badge color="gold">+850 poin</Badge>
                <Badge color="green">✓ Garansi 24bln</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
