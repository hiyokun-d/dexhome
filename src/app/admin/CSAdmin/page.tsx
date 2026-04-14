"use client";
import { useCallback, useEffect, useRef, useState } from "react";
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
  purpleP: "rgba(139,124,200,.12)",
};

type TicketStatus = "OPEN" | "ANSWERED" | "RESOLVED" | "CLOSED";
type Priority = "NORMAL" | "HIGH" | "URGENT";

type Ticket = {
  id: string;
  ticketNumber: string;
  subject: string;
  status: TicketStatus;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  customer: { id: string; fullName: string; membershipTier: string; avatarUrl: string | null };
  assignedAgent: { id: string; email: string } | null;
  messages: { content: string; senderRole: string; createdAt: string }[];
  _count: { messages: number };
};

type Message = {
  id: string;
  content: string;
  senderRole: "CUSTOMER" | "AGENT";
  attachmentUrl: string | null;
  createdAt: string;
  sender: { id: string; email: string };
};

type TicketDetail = Omit<Ticket, "messages" | "_count"> & {
  messages: Message[];
  resolvedAt: string | null;
  customer: Ticket["customer"] & { user: { email: string } };
};

type Agent = { id: string; email: string };

const STATUS_FILTERS = [
  { key: "", label: "Semua" },
  { key: "OPEN", label: "Terbuka" },
  { key: "ANSWERED", label: "Dijawab" },
  { key: "RESOLVED", label: "Selesai" },
  { key: "CLOSED", label: "Tutup" },
];

function statusColor(s: TicketStatus) {
  if (s === "OPEN") return "red" as const;
  if (s === "ANSWERED") return "gold" as const;
  if (s === "RESOLVED") return "green" as const;
  return "grey" as const;
}

function statusLabel(s: TicketStatus) {
  if (s === "OPEN") return "🔴 Terbuka";
  if (s === "ANSWERED") return "💬 Dijawab";
  if (s === "RESOLVED") return "✅ Selesai";
  return "🔒 Tutup";
}

function priorityColor(p: Priority) {
  if (p === "URGENT") return "red" as const;
  if (p === "HIGH") return "gold" as const;
  return "grey" as const;
}

function tierInitial(tier: string) {
  if (tier === "PLATINUM") return { label: "PLT", bg: T.purple };
  if (tier === "GOLD") return { label: "GLD", bg: T.gold };
  return { label: "SLV", bg: T.muted };
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

function fmtRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "baru saja";
  if (m < 60) return `${m}m lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}j lalu`;
  return `${Math.floor(h / 24)}h lalu`;
}

export function CSAdmin() {
  // TODO: replace with session.userId once auth is wired
  const [agentUserId, setAgentUserId] = useState<string | null>(null);
  const [devAgents, setDevAgents] = useState<Agent[]>([]);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [detail, setDetail] = useState<TicketDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [msgText, setMsgText] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // kpi counts derived from loaded tickets
  const openCount = tickets.filter((t) => t.status === "OPEN").length;
  const answeredCount = tickets.filter((t) => t.status === "ANSWERED").length;

  // ── dev: load agent users ─────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/dev/agents")
      .then((r) => r.json())
      .then(({ data }) => {
        if (data?.length) { setDevAgents(data); setAgentUserId(data[0].id); }
      })
      .catch(() => {});
  }, []);

  // ── fetch ticket list ─────────────────────────────────────────────────────
  const fetchTickets = useCallback(async () => {
    setTicketsLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/cs?${params}`);
      const { data } = await res.json();
      setTickets(data ?? []);
      if (!activeId && data?.length) setActiveId(data[0].id);
    } catch {
      /* silently fail */
    } finally {
      setTicketsLoading(false);
    }
  }, [statusFilter, search, activeId]);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  // ── fetch ticket detail ───────────────────────────────────────────────────
  useEffect(() => {
    if (!activeId) return;
    setDetailLoading(true);
    setDetail(null);
    fetch(`/api/admin/cs/${activeId}`)
      .then((r) => r.json())
      .then(({ data }) => { if (data) setDetail(data); })
      .catch(() => {})
      .finally(() => setDetailLoading(false));
  }, [activeId]);

  // ── auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [detail?.messages.length]);

  // ── send reply ────────────────────────────────────────────────────────────
  async function sendReply() {
    if (!activeId || !agentUserId || !msgText.trim() || sending) return;
    const text = msgText.trim();
    setSending(true);
    setMsgText("");

    const optimistic: Message = {
      id: `opt-${Date.now()}`,
      content: text,
      senderRole: "AGENT",
      attachmentUrl: null,
      createdAt: new Date().toISOString(),
      sender: { id: agentUserId, email: devAgents.find((a) => a.id === agentUserId)?.email ?? "" },
    };
    setDetail((prev) => prev ? { ...prev, messages: [...prev.messages, optimistic] } : prev);

    try {
      const res = await fetch(`/api/admin/cs/${activeId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentUserId, content: text }),
      });
      const { data } = await res.json();
      if (data) {
        setDetail((prev) =>
          prev ? { ...prev, messages: prev.messages.map((m) => m.id === optimistic.id ? data : m) } : prev,
        );
        // update ticket status in list
        setTickets((prev) => prev.map((t) => t.id === activeId ? { ...t, status: "ANSWERED" } : t));
      }
    } catch {
      setDetail((prev) =>
        prev ? { ...prev, messages: prev.messages.filter((m) => m.id !== optimistic.id) } : prev,
      );
      setMsgText(text);
    } finally {
      setSending(false);
      textareaRef.current?.focus();
    }
  }

  // ── update ticket status ─────────────────────────────────────────────────
  async function updateStatus(newStatus: TicketStatus) {
    if (!activeId) return;
    try {
      await fetch(`/api/admin/cs/${activeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setDetail((prev) => prev ? { ...prev, status: newStatus } : prev);
      setTickets((prev) => prev.map((t) => t.id === activeId ? { ...t, status: newStatus } : t));
    } catch { /* silently fail */ }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); }
  }

  const activeTicket = tickets.find((t) => t.id === activeId);

  return (
    <div className="fade-up">
      <SectionHeader label="Customer Service" title="CS Admin Panel" />

      {/* DEV agent picker */}
      {devAgents.length > 0 && (
        <div
          style={{
            marginBottom: 14,
            padding: "7px 14px",
            background: T.purpleP,
            border: `1px dashed ${T.purple}`,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 11,
            color: T.txt,
          }}
        >
          <span style={{ fontWeight: 700, color: T.purple }}>DEV</span>
          Agent:
          <select
            value={agentUserId ?? ""}
            onChange={(e) => setAgentUserId(e.target.value)}
            style={{
              fontSize: 11,
              border: `1px solid ${T.border2}`,
              borderRadius: 5,
              padding: "2px 6px",
              background: T.surf2,
              color: T.txt,
            }}
          >
            {devAgents.map((a) => (
              <option key={a.id} value={a.id}>{a.email}</option>
            ))}
          </select>
        </div>
      )}

      {/* KPIs */}
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 18 }}
      >
        {[
          { label: "Tiket Terbuka", value: String(openCount), icon: "🔴", accent: T.terra },
          { label: "Menunggu Balasan", value: String(answeredCount), icon: "💬", accent: T.gold },
          { label: "Total Tiket", value: String(tickets.length), icon: "🎫", accent: T.blue },
          { label: "Agent Aktif", value: String(devAgents.length), icon: "🎧", accent: T.purple },
        ].map((k) => (
          <Card key={k.label} style={{ padding: "14px 16px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: k.accent }} />
            <div style={{ fontSize: 18, marginBottom: 6 }}>{k.icon}</div>
            <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 2 }}>
              {k.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.txt }}>{k.value}</div>
          </Card>
        ))}
      </div>

      {/* Chat Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: 16,
          height: "calc(100vh - 280px)",
          minHeight: 480,
        }}
      >
        {/* ── Ticket Queue ──────────────────────────────────────────────── */}
        <Card style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Search */}
          <div style={{ padding: "12px 14px", borderBottom: `1px solid ${T.border}` }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari tiket / customer…"
              style={{
                width: "100%",
                padding: "7px 12px",
                border: `1px solid ${T.border2}`,
                borderRadius: 7,
                background: T.surf3,
                color: T.txt,
                fontSize: 12,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Status filters */}
          <div
            style={{
              padding: "8px 10px",
              borderBottom: `1px solid ${T.border}`,
              display: "flex",
              gap: 5,
              flexWrap: "wrap",
            }}
          >
            {STATUS_FILTERS.map((f) => (
              <button
                type="button"
                key={f.key}
                onClick={() => setStatusFilter(f.key)}
                style={{
                  padding: "3px 10px",
                  borderRadius: 100,
                  fontSize: 10,
                  fontWeight: statusFilter === f.key ? 700 : 500,
                  cursor: "pointer",
                  border: `1px solid ${statusFilter === f.key ? T.gold : T.border}`,
                  background: statusFilter === f.key ? T.goldP : "none",
                  color: statusFilter === f.key ? T.gold : T.muted,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* List */}
          <div style={{ flex: 1, overflow: "auto" }}>
            {ticketsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ padding: "12px 14px", borderBottom: `1px solid ${T.border}`, opacity: 0.3 }}>
                  <div style={{ height: 9, background: T.border2, borderRadius: 3, width: "40%", marginBottom: 7 }} />
                  <div style={{ height: 11, background: T.border2, borderRadius: 3, width: "85%", marginBottom: 7 }} />
                  <div style={{ height: 9, background: T.border2, borderRadius: 3, width: "55%" }} />
                </div>
              ))
            ) : tickets.length === 0 ? (
              <div style={{ padding: 28, textAlign: "center", color: T.muted, fontSize: 12 }}>
                Tidak ada tiket
              </div>
            ) : (
              tickets.map((tk) => {
                const lastMsg = tk.messages[0];
                const ti = tierInitial(tk.customer.membershipTier);
                return (
                  <div
                    key={tk.id}
                    onClick={() => setActiveId(tk.id)}
                    style={{
                      padding: "12px 14px",
                      borderBottom: `1px solid ${T.border}`,
                      cursor: "pointer",
                      background: activeId === tk.id ? T.purpleP : "transparent",
                      borderLeft: activeId === tk.id ? `3px solid ${T.purple}` : "3px solid transparent",
                      transition: "all .15s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, alignItems: "flex-start" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: ti.bg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 8,
                            fontWeight: 700,
                            color: "#fff",
                            flexShrink: 0,
                          }}
                        >
                          {ti.label}
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>
                          {tk.customer.fullName}
                        </span>
                      </div>
                      <span style={{ fontSize: 10, color: T.muted2, flexShrink: 0 }}>
                        {fmtRelative(tk.updatedAt)}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: T.muted,
                        marginBottom: 6,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {tk.subject}
                    </div>
                    {lastMsg && (
                      <div
                        style={{
                          fontSize: 10,
                          color: T.muted2,
                          marginBottom: 6,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {lastMsg.senderRole === "AGENT" ? "🎧 " : "👤 "}
                        {lastMsg.content}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 5 }}>
                      <Badge color={statusColor(tk.status)}>{statusLabel(tk.status)}</Badge>
                      {tk.priority !== "NORMAL" && (
                        <Badge color={priorityColor(tk.priority)}>
                          {tk.priority === "URGENT" ? "🚨" : "🔺"} {tk.priority}
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* ── Chat Panel ────────────────────────────────────────────────── */}
        <Card style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {!activeTicket ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: T.muted, fontSize: 13 }}>
              Pilih tiket untuk membalas
            </div>
          ) : (
            <>
              {/* Header */}
              <div
                style={{
                  padding: "12px 18px",
                  borderBottom: `1px solid ${T.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: T.surf,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span
                      style={{
                        fontSize: 10,
                        color: T.muted2,
                        fontFamily: "monospace",
                        background: T.surf3,
                        padding: "2px 7px",
                        borderRadius: 4,
                      }}
                    >
                      #{activeTicket.ticketNumber}
                    </span>
                    <Badge color={statusColor(activeTicket.status)}>
                      {statusLabel(activeTicket.status)}
                    </Badge>
                    {activeTicket.priority !== "NORMAL" && (
                      <Badge color={priorityColor(activeTicket.priority)}>
                        {activeTicket.priority === "URGENT" ? "🚨" : "🔺"} {activeTicket.priority}
                      </Badge>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: T.txt,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {activeTicket.subject}
                  </div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
                    {activeTicket.customer.fullName}
                    {detail?.customer.user.email ? ` · ${detail.customer.user.email}` : ""}
                    {activeTicket.assignedAgent ? ` · 🎧 ${activeTicket.assignedAgent.email}` : " · Belum di-assign"}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 7, flexShrink: 0 }}>
                  {activeTicket.status !== "RESOLVED" && activeTicket.status !== "CLOSED" && (
                    <Btn variant="green" sm onClick={() => updateStatus("RESOLVED")}>
                      ✅ Selesai
                    </Btn>
                  )}
                  {activeTicket.status !== "CLOSED" && (
                    <Btn variant="dark" sm onClick={() => updateStatus("CLOSED")}>
                      🔒 Tutup
                    </Btn>
                  )}
                  {activeTicket.status === "CLOSED" && (
                    <Btn variant="dark" sm onClick={() => updateStatus("OPEN")}>
                      Buka Kembali
                    </Btn>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflow: "auto",
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  background: T.bg,
                }}
              >
                {detailLoading ? (
                  <div style={{ textAlign: "center", color: T.muted, fontSize: 12, paddingTop: 40 }}>
                    Memuat percakapan…
                  </div>
                ) : !detail || detail.messages.length === 0 ? (
                  <div style={{ textAlign: "center", color: T.muted, fontSize: 12, paddingTop: 40 }}>
                    Belum ada pesan dalam tiket ini.
                  </div>
                ) : (
                  detail.messages.map((msg, idx) => {
                    const isAgent = msg.senderRole === "AGENT";
                    const prevMsg = detail.messages[idx - 1];
                    const showDate =
                      idx === 0 ||
                      new Date(msg.createdAt).toDateString() !== new Date(prevMsg.createdAt).toDateString();

                    return (
                      <div key={msg.id}>
                        {showDate && (
                          <div
                            style={{
                              textAlign: "center",
                              fontSize: 10,
                              color: T.muted2,
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 14,
                            }}
                          >
                            <div style={{ flex: 1, height: 1, background: T.border }} />
                            {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                              weekday: "long", day: "numeric", month: "long", year: "numeric",
                            })}
                            <div style={{ flex: 1, height: 1, background: T.border }} />
                          </div>
                        )}

                        <div
                          style={{
                            display: "flex",
                            gap: 10,
                            justifyContent: isAgent ? "flex-end" : "flex-start",
                          }}
                        >
                          {!isAgent && (
                            <div
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 8,
                                background: T.surf3,
                                border: `1px solid ${T.border2}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 13,
                                flexShrink: 0,
                                marginTop: 2,
                              }}
                            >
                              👤
                            </div>
                          )}

                          <div style={{ maxWidth: "72%" }}>
                            {!isAgent && (
                              <div style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>
                                {activeTicket.customer.fullName}
                              </div>
                            )}
                            <div
                              style={{
                                background: isAgent ? T.purple : T.surf2,
                                color: T.txt,
                                border: isAgent ? "none" : `1px solid ${T.border2}`,
                                padding: "10px 14px",
                                borderRadius: isAgent ? "12px 12px 4px 12px" : "4px 12px 12px 12px",
                                fontSize: 13,
                                lineHeight: 1.6,
                                wordBreak: "break-word",
                              }}
                            >
                              {msg.content}
                            </div>
                            {msg.attachmentUrl && (
                              <a
                                href={msg.attachmentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: "block", marginTop: 5, fontSize: 11, color: T.gold }}
                              >
                                📎 Lampiran
                              </a>
                            )}
                            <div
                              style={{
                                fontSize: 10,
                                color: T.muted2,
                                textAlign: isAgent ? "right" : "left",
                                marginTop: 4,
                              }}
                            >
                              {fmtTime(msg.createdAt)}
                              {isAgent && " · Anda"}
                            </div>
                          </div>

                          {isAgent && (
                            <div
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 8,
                                background: T.purple,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 14,
                                flexShrink: 0,
                                marginTop: 2,
                              }}
                            >
                              🎧
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Input */}
              <div style={{ padding: "12px 16px", borderTop: `1px solid ${T.border}`, background: T.surf }}>
                {activeTicket.status === "CLOSED" ? (
                  <div style={{ textAlign: "center", fontSize: 12, color: T.muted, padding: "8px 0" }}>
                    Tiket ini ditutup. Klik "Buka Kembali" untuk membalas.
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 8,
                      background: T.surf3,
                      border: `1.5px solid ${T.border2}`,
                      borderRadius: 12,
                      padding: "8px 12px",
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        background: T.purple,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        flexShrink: 0,
                        marginBottom: 4,
                      }}
                    >
                      🎧
                    </div>
                    <textarea
                      ref={textareaRef}
                      value={msgText}
                      onChange={(e) => setMsgText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Balas sebagai CS Agent… (Enter kirim, Shift+Enter baris baru)"
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        background: "none",
                        resize: "none",
                        fontSize: 13,
                        lineHeight: 1.5,
                        maxHeight: 100,
                        color: T.txt,
                      }}
                      rows={1}
                    />
                    <button
                      type="button"
                      onClick={sendReply}
                      disabled={sending || !msgText.trim()}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: sending || !msgText.trim() ? T.surf2 : T.purple,
                        border: `1px solid ${T.border2}`,
                        color: sending || !msgText.trim() ? T.muted : "#fff",
                        fontSize: 14,
                        cursor: sending || !msgText.trim() ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all .15s",
                      }}
                    >
                      {sending ? "…" : "→"}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default CSAdmin;
