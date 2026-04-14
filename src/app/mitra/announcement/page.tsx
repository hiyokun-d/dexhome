"use client";
import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/Badge";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";

const T = {
  bg: "#F7F3EE", warm: "#FDFAF5", card: "#fff",
  brown: "#2C1810", brown2: "#3D2318", gold: "#C9962A", goldL: "#E8B84B",
  goldP: "rgba(201,150,42,.10)", terra: "#C4572A", sage: "#7A8C6E",
  blue: "#4A90D9", muted: "#8A7F74", border: "#E2D8C8", border2: "#D4C8B4",
};

type Announcement = {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: string;
  target: string;
  attachmentUrl: string | null;
  publishedAt: string;
  isRead: boolean;
};

const CATEGORY_META: Record<string, { icon: string; label: string; color: "gold" | "blue" | "green" | "red" | "grey" }> = {
  PROMO:  { icon: "📣", label: "Promosi", color: "gold" },
  SYSTEM: { icon: "⚙️", label: "Sistem",  color: "blue" },
  EVENT:  { icon: "🎪", label: "Event",   color: "green" },
  POLICY: { icon: "📋", label: "Kebijakan", color: "grey" },
  URGENT: { icon: "🚨", label: "Mendesak", color: "red" },
};

const TABS = ["Semua", "PROMO", "SYSTEM", "EVENT", "POLICY", "URGENT", "SUDAH_DIBACA"];

export function Announcements({ mitraId }: { mitraId: string }) {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Semua");
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
    setExpandedId((prev) => (prev === id ? null : id));
    const item = items.find((a) => a.id === id);
    if (item && !item.isRead) markRead(id);
  }

  const displayed = activeTab === "SUDAH_DIBACA"
    ? items.filter((a) => a.isRead)
    : items;
  const unreadCount = items.filter((a) => !a.isRead).length;

  const tabLabel = (t: string) => {
    if (t === "Semua") return "Semua";
    if (t === "SUDAH_DIBACA") return "✅ Sudah Dibaca";
    return `${CATEGORY_META[t]?.icon ?? ""} ${CATEGORY_META[t]?.label ?? t}`;
  };

  return (
    <div className="fade-up">
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${T.brown}, ${T.brown2})`,
        borderRadius: 16, padding: "22px 26px", marginBottom: 22,
        display: "flex", alignItems: "center", gap: 18, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160,
          background: `radial-gradient(circle, ${T.goldP}, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ width: 54, height: 54, borderRadius: 14, background: T.gold,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, position: "relative", zIndex: 1 }}>
          📢
        </div>
        <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 5 }}>
            Pengumuman DexHome
          </h2>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>
            {loading ? "Memuat…" : (
              <>Ada <strong style={{ color: T.gold }}>{unreadCount} pengumuman baru</strong> untuk Anda</>
            )}
          </p>
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 36, fontWeight: 700, color: T.gold, lineHeight: 1 }}>
            {loading ? "–" : unreadCount}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 2 }}>Belum Dibaca</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="filter-tabs" style={{ marginBottom: 16 }}>
        {TABS.map((t) => (
          <button type="button" key={t} onClick={() => setActiveTab(t)} style={{
            padding: "6px 16px", borderRadius: 100, fontSize: 12, cursor: "pointer", transition: "all .2s",
            fontWeight: activeTab === t ? 600 : 500,
            border: `1.5px solid ${activeTab === t ? T.brown : T.border}`,
            background: activeTab === t ? T.brown : T.card,
            color: activeTab === t ? "#fff" : T.muted,
          }}>
            {tabLabel(t)}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1, 2, 3].map((i) => (
            <Card key={i} style={{ padding: "16px 20px", opacity: 0.4 }}>
              <div style={{ height: 12, background: T.border, borderRadius: 4, width: "60%", marginBottom: 8 }} />
              <div style={{ height: 10, background: T.border, borderRadius: 4, width: "40%" }} />
            </Card>
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: T.muted, fontSize: 13 }}>
          Tidak ada pengumuman{activeTab !== "Semua" ? " di kategori ini" : ""}.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {displayed.map((ann) => {
            const meta = CATEGORY_META[ann.category] ?? { icon: "📋", label: ann.category, color: "grey" as const };
            return (
              <Card key={ann.id} style={{ overflow: "hidden", opacity: ann.isRead ? 0.75 : 1, cursor: "pointer" }}>
                <div onClick={() => toggleExpand(ann.id)}
                  style={{ padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: T.goldP,
                    border: `1px solid ${T.gold}30`, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                    {meta.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: T.brown, lineHeight: 1.3 }}>{ann.title}</div>
                      <div style={{ fontSize: 11, color: T.muted, flexShrink: 0, marginLeft: 12 }}>
                        {new Date(ann.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                      </div>
                    </div>
                    {expandedId !== ann.id && (
                      <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.5, marginBottom: 10,
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {ann.content}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <Badge color={meta.color}>{meta.icon} {meta.label}</Badge>
                      {ann.priority === "URGENT" && <Badge color="red">🚨 Mendesak</Badge>}
                      {!ann.isRead && (
                        <span style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%",
                          background: T.terra, display: "inline-block" }} />
                      )}
                    </div>
                  </div>
                </div>
                {expandedId === ann.id && (
                  <div style={{ padding: "0 20px 20px 78px", borderTop: `1px solid ${T.border}` }}>
                    <div style={{ paddingTop: 16, fontSize: 13, color: T.brown, lineHeight: 1.8, whiteSpace: "pre-line" }}>
                      {ann.content}
                    </div>
                    {ann.attachmentUrl && (
                      <div style={{ marginTop: 14, padding: "12px 14px", background: T.bg, borderRadius: 10,
                        border: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 20 }}>📄</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: T.brown }}>Lampiran</div>
                        </div>
                        <a href={ann.attachmentUrl} target="_blank" rel="noopener noreferrer">
                          <Btn variant="outline" sm>⬇ Unduh</Btn>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Announcements;
