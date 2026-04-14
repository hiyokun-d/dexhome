"use client";
import { useEffect, useState, useRef } from "react";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";

const T = {
  bg: "#F7F3EE", warm: "#FDFAF5", card: "#fff",
  brown: "#2C1810", brown2: "#3D2318", gold: "#C9962A", goldL: "#E8B84B",
  goldP: "rgba(201,150,42,.10)", terra: "#C4572A", sage: "#7A8C6E",
  blue: "#4A90D9", muted: "#8A7F74", border: "#E2D8C8", border2: "#D4C8B4",
};

type Reply = {
  id: string;
  content: string;
  createdAt: string;
  mitra: { id: string; showroomName: string; logoUrl: string | null };
};

type Post = {
  id: string;
  content: string;
  tags: string[];
  likesCount: number;
  repliesCount: number;
  createdAt: string;
  likedByMe: boolean;
  mitra: { id: string; showroomName: string; logoUrl: string | null };
  replies: Reply[];
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Baru saja";
  if (m < 60) return `${m} mnt lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

export function Community({ mitraId }: { mitraId: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<Record<string, string>>({});
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!mitraId) return;
    setLoading(true);
    fetch(`/api/mitra/community?mitraId=${mitraId}`)
      .then((r) => r.json())
      .then(({ data }) => { if (data) setPosts(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [mitraId]);

  async function submitPost() {
    if (!newContent.trim() || !mitraId) return;
    setPosting(true);
    try {
      const res = await fetch("/api/mitra/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mitraId, content: newContent.trim(), tags: [] }),
      });
      const { data } = await res.json();
      if (data) {
        setPosts((prev) => [data, ...prev]);
        setNewContent("");
      }
    } finally {
      setPosting(false);
    }
  }

  async function toggleLike(postId: string) {
    if (!mitraId) return;
    // Optimistic
    setPosts((prev) => prev.map((p) =>
      p.id === postId
        ? { ...p, likedByMe: !p.likedByMe, likesCount: p.likedByMe ? p.likesCount - 1 : p.likesCount + 1 }
        : p
    ));
    const res = await fetch(`/api/mitra/community/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mitraId }),
    });
    if (!res.ok) {
      // Revert
      setPosts((prev) => prev.map((p) =>
        p.id === postId
          ? { ...p, likedByMe: !p.likedByMe, likesCount: p.likedByMe ? p.likesCount - 1 : p.likesCount + 1 }
          : p
      ));
    }
  }

  async function submitReply(postId: string) {
    const content = replyContent[postId]?.trim();
    if (!content || !mitraId) return;
    setReplyingId(postId);
    try {
      const res = await fetch(`/api/mitra/community/${postId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mitraId, content }),
      });
      const { data } = await res.json();
      if (data) {
        setPosts((prev) => prev.map((p) =>
          p.id === postId
            ? { ...p, replies: [...p.replies, data], repliesCount: p.repliesCount + 1 }
            : p
        ));
        setReplyContent((prev) => ({ ...prev, [postId]: "" }));
      }
    } finally {
      setReplyingId(null);
    }
  }

  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: 4 }}>Forum</div>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 22, fontWeight: 700, color: T.brown }}>Komunitas Mitra</div>
        </div>
      </div>

      {/* New post */}
      <Card style={{ padding: "16px 18px", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: T.gold,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
            🏢
          </div>
          <div style={{ flex: 1 }}>
            <textarea
              ref={textareaRef}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Bagikan info, tanya, atau diskusi dengan sesama mitra..."
              style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${T.border}`,
                borderRadius: 10, fontSize: 13, outline: "none", resize: "none",
                fontFamily: "var(--font-dm-sans, sans-serif)", color: T.brown,
                background: T.bg, minHeight: 60 }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
              <Btn variant="primary" sm onClick={submitPost}>
                {posting ? "Memposting…" : "📤 Posting"}
              </Btn>
            </div>
          </div>
        </div>
      </Card>

      {/* Posts */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[1, 2, 3].map((i) => (
            <Card key={i} style={{ padding: "18px 20px", opacity: 0.4 }}>
              <div style={{ height: 12, background: T.border, borderRadius: 4, width: "50%", marginBottom: 8 }} />
              <div style={{ height: 10, background: T.border, borderRadius: 4 }} />
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: T.muted, fontSize: 13 }}>
          Belum ada postingan. Jadilah yang pertama!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {posts.map((post) => (
            <Card key={post.id} style={{ padding: "18px 20px" }}>
              {/* Author */}
              <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: T.bg,
                  border: `1px solid ${T.border}`, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 18, flexShrink: 0, overflow: "hidden" }}>
                  {post.mitra.logoUrl
                    ? <img src={post.mitra.logoUrl} alt={post.mitra.showroomName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : "🏢"}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.brown }}>{post.mitra.showroomName}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{timeAgo(post.createdAt)}</div>
                </div>
              </div>

              {/* Content */}
              <p style={{ fontSize: 13, color: T.brown, lineHeight: 1.6, marginBottom: 12 }}>{post.content}</p>

              {/* Tags */}
              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                  {(post.tags as string[]).map((t) => (
                    <span key={t} style={{ padding: "2px 9px", borderRadius: 100, background: T.goldP,
                      border: `1px solid ${T.gold}30`, color: T.gold, fontSize: 10, fontWeight: 600 }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: 14, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
                <button type="button" onClick={() => toggleLike(post.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12,
                    color: post.likedByMe ? T.terra : T.muted, display: "flex", alignItems: "center", gap: 5,
                    fontWeight: post.likedByMe ? 700 : 400 }}>
                  {post.likedByMe ? "❤️" : "👍"} {post.likesCount}
                </button>
                <button type="button" onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12,
                    color: T.muted, display: "flex", alignItems: "center", gap: 5 }}>
                  💬 {post.repliesCount} Balasan
                </button>
              </div>

              {/* Replies */}
              {expandedId === post.id && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
                  {post.replies.map((r) => (
                    <div key={r.id} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: T.bg,
                        border: `1px solid ${T.border}`, display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                        🏢
                      </div>
                      <div style={{ flex: 1, background: T.bg, borderRadius: 10, padding: "10px 14px" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.brown, marginBottom: 4 }}>
                          {r.mitra.showroomName} · <span style={{ color: T.muted, fontWeight: 400 }}>{timeAgo(r.createdAt)}</span>
                        </div>
                        <div style={{ fontSize: 12, color: T.brown }}>{r.content}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <input
                      value={replyContent[post.id] ?? ""}
                      onChange={(e) => setReplyContent((prev) => ({ ...prev, [post.id]: e.target.value }))}
                      placeholder="Tulis balasan..."
                      style={{ flex: 1, padding: "8px 12px", border: `1.5px solid ${T.border}`,
                        borderRadius: 8, fontSize: 12, outline: "none", color: T.brown, background: T.bg }}
                    />
                    <Btn variant="primary" sm onClick={() => submitReply(post.id)}>
                      {replyingId === post.id ? "…" : "Kirim"}
                    </Btn>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Community;
