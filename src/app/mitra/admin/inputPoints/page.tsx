function InputPoints() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fade-up">
      <SectionHeader label="Poin Customer" title="Input Poin Transaksi" />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}
      >
        <Card style={{ padding: 24 }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <div
                style={{
                  fontFamily: "var(--font-playfair, serif)",
                  fontSize: 22,
                  fontWeight: 700,
                  color: T.txt,
                  marginBottom: 8,
                }}
              >
                Poin Berhasil Diinput!
              </div>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 24 }}>
                850 poin telah dikreditkan ke akun Budi Santoso
              </div>
              <Btn variant="primary" onClick={() => setSubmitted(false)}>
                Input Poin Baru
              </Btn>
            </div>
          ) : (
            <>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: T.txt,
                  marginBottom: 18,
                }}
              >
                📋 Data Transaksi
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
                    No. Transaksi / Invoice *
                  </label>
                  <input
                    defaultValue="DXH-2603-0091"
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
                    Tanggal Transaksi *
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-03-19"
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
                  ID / No. HP Customer *
                </label>
                <input
                  defaultValue="08123456789"
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
                  Produk yang Dibeli *
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
                  <option>Sofa Modular Scandinavian</option>
                  <option>Kursi Makan Solid Oak</option>
                  <option>Lampu Gantung Rattan</option>
                  <option>Headboard Bouclé</option>
                </select>
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
                    Total Nilai Transaksi (Rp) *
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
                    Poin Yang Diberikan
                  </label>
                  <input
                    defaultValue="850"
                    readOnly
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

              <div style={{ marginBottom: 20 }}>
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
                  Catatan (Opsional)
                </label>
                <textarea
                  placeholder="Catatan tambahan..."
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: `1px solid ${T.border2}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: T.txt,
                    background: T.surf2,
                    outline: "none",
                    resize: "none",
                    minHeight: 70,
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="primary" onClick={() => setSubmitted(true)}>
                  ✓ Submit Poin
                </Btn>
                <Btn variant="outline">Reset Form</Btn>
              </div>
            </>
          )}
        </Card>

        {/* Guide */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card style={{ padding: 18 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.purpleL,
                marginBottom: 12,
              }}
            >
              ℹ️ Panduan Input Poin
            </div>
            {[
              ["Rasio Poin", "1 poin per Rp 10.000 transaksi"],
              ["Min. Transaksi", "Rp 500.000 untuk mendapat poin"],
              ["Batas Harian", "Maksimal 10 input per hari"],
              ["Deadline", "Input maks. 3 hari setelah transaksi"],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: `1px solid ${T.border}`,
                  fontSize: 12,
                }}
              >
                <span style={{ color: T.muted }}>{k}</span>
                <span style={{ color: T.txt, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </Card>

          <Card style={{ padding: 18 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.txt,
                marginBottom: 12,
              }}
            >
              📈 Input Hari Ini
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: T.purple,
                textAlign: "center",
                margin: "8px 0 4px",
              }}
            >
              3
            </div>
            <div
              style={{
                fontSize: 11,
                color: T.muted,
                textAlign: "center",
                marginBottom: 14,
              }}
            >
              dari 10 input hari ini
            </div>
            <div
              style={{
                height: 6,
                background: T.surf3,
                borderRadius: 100,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "30%",
                  background: T.purple,
                  borderRadius: 100,
                }}
              />
            </div>
            <div style={{ fontSize: 11, color: T.muted, textAlign: "center" }}>
              1.640 total poin dikreditkan hari ini
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
