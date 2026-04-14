"use client";
// Re-uses the same announcements API as mitra user portal
// but with the dark admin theme (purple/dark)
import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/Badge";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";

const T = {
  bg: "#13111A", surf: "#1B1825", surf2: "#221F2E", surf3: "#2A2638",
  border: "rgba(255,255,255,.07)", border2: "rgba(255,255,255,.13)",
  txt: "#EDE8F5", muted: "rgba(237,232,245,.45)", muted2: "rgba(237,232,245,.22)",
  purple: "#8B7CC8", purpleL: "#A898E0", purpleP: "rgba(139,124,200,.12)",
  gold: "#C9962A", terra: "#C4572A", sage: "#7A8C6E", blue: "#4A90D9",
};

type Announcement = {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: string;
  publishedAt: string;
  attachmentUrl: string | null;
  isRead: boolean;
};

const CATEGORY_META: Record<string, { icon: string; label: string; color: "gold" | "blue" | "green" | "red" | "grey" }> = {
  PROMO:  { icon: "📣", label: "Promosi", color: "gold" },
  SYSTEM: { icon: "⚙️", label: "Sistem",  color: "blue" },
  EVENT:  { icon: "🎪", label: "Event",   color: "green" },
  POLICY: { icon: "📋", label: "Kebijakan", color: "grey" },
  URGENT: { icon: "🚨", label: "Mendesak", color: "red" },
};

const TABS = ["Semua", "PROMO", "SYSTEM", "EVENT", "SUDAH_DIBACA"];

export function AnnouncementsAdmin({ mitraId }: { mitraId: string }) {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Semua");
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!mitraId) return;
    setLoading(true);
    const cat = activeTab === "Semua" || activeTab === "SUDAH_DIBACA" ? "" : `&category=${activeTab}`;
    fetch(`/api/mitra/announcements?mitraId=${mitraId}${cat}`)
      .then((r) => r.json())
      .then(({ data }) => { if (data) setItems(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [mitraId, activeTab]);

  useEffect(() => { load(); }, [load]);

  async function markRead(id: string) {
    if (!mitraId) return;
    await fetch(`/api/mitra/announcements/${id}/read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mitraId }),
    });
    setItems((prev) => prev.map((a) => a.id === id ? { ...a, isRead: true } : a));
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => (prev === id ? null : id));
    const item = items.find((a) => a.id === id);
    if (item && !item.isRead) markRead(id);
  }

  const displayed = activeTab === "SUDAH_DIBACA" ? items.filter((a) => a.isRead) : items;
  const unreadCount = items.filter((a) => !a.isRead).length;

  const tabLabel = (t: string) => {
    if (t === "Semua") return "Semua";
    if (t === "SUDAH_DIBACA") return "✅ Dibaca";
    return `${CATEGORY_META[t]?.icon ?? ""} ${CATEGORY_META[t]?.label ?? t}`;
  };

  return (
    <div className="fade-up">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
            color: T.purpleL, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ width: 16, height: 2, background: T.purpleL, display: "inline-block" }} />
            Info Platform
          </div>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 20, fontWeight: 700, color: T.txt }}>
            Pengumuman
          </div>
        </div>
        {!loading && unreadCount > 0 && (
          <div style={{ padding: "6px 14px", background: T.purpleP, border: `1px solid rgba(139,124,200,.3)`,
            borderRadius: 8, fontSize: 12, color: T.purpleL, fontWeight: 600 }}>
            {unreadCount} belum dibaca
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {TABS.map((t) => (
          <button type="button" key={t} onClick={() => setActiveTab(t)} style={{
            padding: "6px 14px", borderRadius: 100, fontSize: 11, cursor: "pointer", transition: "all .2s",
            fontWeight: activeTab === t ? 600 : 400,
            border: `1px solid ${activeTab === t ? T.purpleL : T.border2}`,
            background: activeTab === t ? T.purpleP : "transparent",
            color: activeTab === t ? T.purpleL : T.muted,
          }}>
            {tabLabel(t)}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ background: T.surf, border: `1px solid ${T.border}`, borderRadius: 12,
              padding: "16px 20px", opacity: 0.4, height: 70 }} />
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: T.muted, fontSize: 13 }}>
          Tidak ada pengumuman{activeTab !== "Semua" ? " di kategori ini" : ""}.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {displayed.map((ann) => {
            const meta = CATEGORY_META[ann.category] ?? { icon: "📋", label: ann.category, color: "grey" as const };
            return (
              <div key={ann.id} style={{ background: T.surf, border: `1px solid ${T.border}`,
                borderRadius: 12, overflow: "hidden", opacity: ann.isRead ? 0.7 : 1, cursor: "pointer",
                transition: "border-color .2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = T.border2; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = T.border; }}>
                <div onClick={() => toggleExpand(ann.id)}
                  style={{ padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: T.surf2,
                    border: `1px solid ${T.border2}`, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                    {meta.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: T.txt, lineHeight: 1.3 }}>{ann.title}</div>
                      <div style={{ fontSize: 10, color: T.muted, flexShrink: 0, marginLeft: 12 }}>
                        {new Date(ann.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                      </div>
                    </div>
                    {expanded !== ann.id && (
                      <div style={{ fontSize: 11, color: T.muted, lineHeight: 1.5,
                        display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {ann.content}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 6, marginTop: 6, alignItems: "center" }}>
                      <Badge color={meta.color}>{meta.icon} {meta.label}</Badge>
                      {ann.priority === "URGENT" && <Badge color="red">🚨 Mendesak</Badge>}
                      {!ann.isRead && (
                        <span style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%",
                          background: T.terra, display: "inline-block" }} />
                      )}
                    </div>
                  </div>
                </div>
                {expanded === ann.id && (
                  <div style={{ padding: "0 18px 18px 70px", borderTop: `1px solid ${T.border}` }}>
                    <div style={{ paddingTop: 14, fontSize: 13, color: T.muted, lineHeight: 1.8, whiteSpace: "pre-line" }}>
                      {ann.content}
                    </div>
                    {ann.attachmentUrl && (
                      <div style={{ marginTop: 12, padding: "10px 14px", background: T.surf2, borderRadius: 8,
                        border: `1px solid ${T.border2}`, display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 18 }}>📄</span>
                        <div style={{ flex: 1, fontSize: 12, color: T.txt }}>Lampiran</div>
                        <a href={ann.attachmentUrl} target="_blank" rel="noopener noreferrer">
                          <Btn variant="outline" sm>⬇ Unduh</Btn>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AnnouncementsAdmin;
