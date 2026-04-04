import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";

const T = {
  bg: "#F7F3EE",
  warm: "#FDFAF5",
  card: "#fff",
  brown: "#2C1810",
  brown2: "#3D2318",
  gold: "#C9962A",
  goldL: "#E8B84B",
  goldP: "rgba(201,150,42,.10)",
  terra: "#C4572A",
  sage: "#7A8C6E",
  blue: "#4A90D9",
  muted: "#8A7F74",
  border: "#E2D8C8",
  border2: "#D4C8B4",
};

export function Community() {
  const posts = [
    {
      avatar: "🏢",
      name: "Homera Studio",
      time: "2 jam lalu",
      content:
        "Teman-teman mitra, ada yang sudah coba sistem notifikasi order baru? Rasanya lebih cepat ya untuk konfirmasi pesanan.",
      likes: 12,
      replies: 8,
      tags: ["Tips", "Sistem"],
    },
    {
      avatar: "🪵",
      name: "Woodcraft Co.",
      time: "5 jam lalu",
      content:
        "Sharing pengalaman Flash Sale Maret kemarin: order naik 4x tapi tim logistik DexHome sangat membantu. Rekomendasi untuk persiapkan stok extra minimal 2 minggu sebelum event.",
      likes: 28,
      replies: 15,
      tags: ["Flash Sale", "Tips"],
    },
    {
      avatar: "💡",
      name: "LuxeLight ID",
      time: "1 hari lalu",
      content:
        "Pertanyaan: untuk produk dengan berat >50kg, siapa yang handle koordinasi instalasi ke customer? Apakah dari mitra atau ada tim DexHome?",
      likes: 7,
      replies: 22,
      tags: ["Pertanyaan", "Logistik"],
    },
    {
      avatar: "🍃",
      name: "Teak & Grain",
      time: "2 hari lalu",
      content:
        "Update: fotografi produk kami baru selesai dikerjakan, kini stok foto sudah di-upload semua. Terima kasih tim admin DexHome yang bantu review 🙏",
      likes: 19,
      replies: 5,
      tags: ["Update"],
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
            Forum
          </div>
          <div
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: 22,
              fontWeight: 700,
              color: T.brown,
            }}
          >
            Komunitas Mitra
          </div>
        </div>
        <Btn variant="primary">+ Buat Postingan</Btn>
      </div>

      {/* New post input */}
      <Card style={{ padding: "16px 18px", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: T.gold,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            🏢
          </div>
          <div style={{ flex: 1 }}>
            <textarea
              placeholder="Bagikan info, tanya, atau diskusi dengan sesama mitra..."
              style={{
                width: "100%",
                padding: "10px 14px",
                border: `1.5px solid ${T.border}`,
                borderRadius: 10,
                fontSize: 13,
                outline: "none",
                resize: "none",
                fontFamily: "var(--font-dm-sans, sans-serif)",
                color: T.brown,
                background: T.bg,
                minHeight: 60,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 8,
              }}
            >
              <Btn variant="primary" sm>
                📤 Posting
              </Btn>
            </div>
          </div>
        </div>
      </Card>

      {/* Posts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {posts.map((post, i) => (
          <Card key={i} style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: T.bg,
                  border: `1px solid ${T.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {post.avatar}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.brown }}>
                  {post.name}
                </div>
                <div style={{ fontSize: 11, color: T.muted }}>{post.time}</div>
              </div>
            </div>
            <p
              style={{
                fontSize: 13,
                color: T.brown,
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              {post.content}
            </p>
            <div
              style={{
                display: "flex",
                gap: 6,
                marginBottom: 14,
                flexWrap: "wrap",
              }}
            >
              {post.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "2px 9px",
                    borderRadius: 100,
                    background: T.goldP,
                    border: `1px solid ${T.gold}30`,
                    color: T.gold,
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                gap: 14,
                paddingTop: 10,
                borderTop: `1px solid ${T.border}`,
              }}
            >
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  color: T.muted,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                👍 {post.likes}
              </button>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  color: T.muted,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                💬 {post.replies} Balasan
              </button>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  color: T.muted,
                }}
              >
                🔗 Bagikan
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Community;
