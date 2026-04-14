"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Badge } from "@/components/Badge";
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

type DevCustomer = { id: string; fullName: string; membershipTier: string; user: { email: string } };

type TicketStatus = "OPEN" | "ANSWERED" | "RESOLVED" | "CLOSED";

type Ticket = {
  id: string;
  ticketNumber: string;
  subject: string;
  status: TicketStatus;
  priority: string;
  createdAt: string;
  updatedAt: string;
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
  assignedAgent: { id: string; email: string } | null;
};

function statusBadgeColor(s: TicketStatus) {
  if (s === "OPEN") return "gold" as const;
  if (s === "ANSWERED") return "blue" as const;
  if (s === "RESOLVED") return "green" as const;
  return "grey" as const;
}

function statusLabel(s: TicketStatus) {
  if (s === "OPEN") return "🔄 Terbuka";
  if (s === "ANSWERED") return "💬 Dijawab";
  if (s === "RESOLVED") return "✅ Selesai";
  return "🔒 Tutup";
}

function fmtTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

function fmtRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "baru saja";
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

// ─── New Ticket Modal ────────────────────────────────────────────────────────
function NewTicketModal({
  customerId,
  onClose,
  onCreated,
}: {
  customerId: string;
  onClose: () => void;
  onCreated: (t: Ticket) => void;
}) {
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (subject.trim().length < 5) {
      setError("Judul minimal 5 karakter");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/customer/cs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, subject: subject.trim() }),
      });
      const { data, error: apiErr } = await res.json();
      if (apiErr) { setError(apiErr); return; }
      onCreated(data);
      onClose();
    } catch {
      setError("Gagal membuat tiket. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <Card
        style={{ width: 440, padding: 28 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div
          style={{
            fontFamily: "var(--font-playfair, serif)",
            fontSize: 18,
            fontWeight: 700,
            color: T.brown,
            marginBottom: 6,
          }}
        >
          Buat Tiket Baru
        </div>
        <div style={{ fontSize: 12, color: T.muted, marginBottom: 20 }}>
          Deskripsikan masalah Anda secara singkat.
        </div>

        <form onSubmit={handleSubmit}>
          <label
            style={{ fontSize: 12, fontWeight: 600, color: T.brown, display: "block", marginBottom: 6 }}
          >
            Subjek / Judul Tiket
          </label>
          <input
            autoFocus
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Contoh: Pertanyaan tentang garansi sofa"
            style={{
              width: "100%",
              padding: "10px 14px",
              border: `1.5px solid ${error ? T.terra : T.border}`,
              borderRadius: 9,
              fontSize: 13,
              outline: "none",
              color: T.char,
              marginBottom: 8,
              boxSizing: "border-box",
            }}
          />
          {error && (
            <div style={{ fontSize: 11, color: T.terra, marginBottom: 10 }}>{error}</div>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
            <Btn variant="outline" sm onClick={onClose} type="button">
              Batal
            </Btn>
            <Btn variant="primary" sm type="submit" disabled={loading}>
              {loading ? "Membuat…" : "Buat Tiket"}
            </Btn>
          </div>
        </form>
      </Card>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function CustomerService() {
  // TODO: replace with session.profileId once auth is wired
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [devCustomers, setDevCustomers] = useState<DevCustomer[]>([]);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [detail, setDetail] = useState<TicketDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [msgText, setMsgText] = useState("");
  const [sending, setSending] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── dev: load real customer IDs from seed ─────────────────────────────────
  useEffect(() => {
    fetch("/api/dev/customers")
      .then((r) => r.json())
      .then(({ data }) => {
        if (data?.length) {
          setDevCustomers(data);
          setCustomerId(data[0].id);
        }
      })
      .catch(() => {});
  }, []);

  // ── fetch ticket list ──────────────────────────────────────────────────────
  const fetchTickets = useCallback(async () => {
    if (!customerId) return;
    setTicketsLoading(true);
    try {
      const res = await fetch(`/api/customer/cs?customerId=${customerId}`);
      const { data } = await res.json();
      setTickets(data ?? []);
      if (!activeId && data?.length) setActiveId(data[0].id);
    } catch {
      // silently fail — list stays empty
    } finally {
      setTicketsLoading(false);
    }
  }, [customerId, activeId]);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  // ── fetch ticket detail + messages ────────────────────────────────────────
  useEffect(() => {
    if (!activeId || !customerId) return;
    setDetailLoading(true);
    setDetail(null);
    fetch(`/api/customer/cs/${activeId}?customerId=${customerId}`)
      .then((r) => r.json())
      .then(({ data }) => { if (data) setDetail(data); })
      .catch(() => {})
      .finally(() => setDetailLoading(false));
  }, [activeId, customerId]);

  // ── auto-scroll to bottom when messages change ─────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [detail?.messages.length]);

  // ── send message ──────────────────────────────────────────────────────────
  async function sendMessage() {
    if (!activeId || !customerId || !msgText.trim() || sending) return;
    const text = msgText.trim();
    setSending(true);
    setMsgText("");
    // optimistic update
    const optimistic: Message = {
      id: `opt-${Date.now()}`,
      content: text,
      senderRole: "CUSTOMER",
      attachmentUrl: null,
      createdAt: new Date().toISOString(),
      sender: { id: customerId, email: "" },
    };
    setDetail((prev) => prev ? { ...prev, messages: [...prev.messages, optimistic] } : prev);

    try {
      const res = await fetch(`/api/customer/cs/${activeId}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, content: text }),
      });
      const { data } = await res.json();
      if (data) {
        // replace optimistic with real message
        setDetail((prev) =>
          prev
            ? { ...prev, messages: prev.messages.map((m) => m.id === optimistic.id ? data : m) }
            : prev,
        );
        // refresh ticket list to update snippet + updatedAt
        fetchTickets();
      }
    } catch {
      // revert optimistic
      setDetail((prev) =>
        prev ? { ...prev, messages: prev.messages.filter((m) => m.id !== optimistic.id) } : prev,
      );
      setMsgText(text);
    } finally {
      setSending(false);
      textareaRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const activeTicket = tickets.find((t) => t.id === activeId);

  return (
    <div className="fade-up">
      <SectionHeader label="Dukungan" title="Customer Service" />

      {/* DEV ONLY — remove when auth is wired */}
      {devCustomers.length > 0 && (
        <div
          style={{
            marginBottom: 12,
            padding: "8px 14px",
            background: "rgba(201,150,42,.08)",
            border: `1px dashed ${T.gold}`,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 11,
            color: T.brown,
          }}
        >
          <span style={{ fontWeight: 700, color: T.gold }}>DEV</span>
          Customer:
          <select
            value={customerId ?? ""}
            onChange={(e) => {
              setCustomerId(e.target.value);
              setTickets([]);
              setActiveId(null);
              setDetail(null);
            }}
            style={{
              fontSize: 11,
              border: `1px solid ${T.border}`,
              borderRadius: 5,
              padding: "2px 6px",
              background: T.warm,
              color: T.brown,
            }}
          >
            {devCustomers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.fullName} ({c.user.email})
              </option>
            ))}
          </select>
        </div>
      )}

      {showNewModal && customerId && (
        <NewTicketModal
          customerId={customerId}
          onClose={() => setShowNewModal(false)}
          onCreated={(t) => {
            // normalise: newly created ticket has no messages yet
            const normalised: Ticket = {
              ...(t as unknown as Ticket),
              messages: [],
              _count: { messages: 0 },
              updatedAt: t.createdAt,
            };
            setTickets((prev) => [normalised, ...prev]);
            setActiveId(t.id);
          }}
        />
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 18,
          height: "calc(100vh - 200px)",
          minHeight: 500,
        }}
      >
        {/* ── Ticket List ─────────────────────────────────────────────────── */}
        <Card style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "14px 18px",
              borderBottom: `1px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: 16,
                fontWeight: 700,
                color: T.brown,
              }}
            >
              Tiket Saya
            </div>
            <Btn variant="primary" sm onClick={() => setShowNewModal(true)}>
              + Buat Tiket
            </Btn>
          </div>

          <div style={{ flex: 1, overflow: "auto" }}>
            {ticketsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 18px",
                    borderBottom: `1px solid ${T.border}`,
                    opacity: 0.4,
                  }}
                >
                  <div style={{ height: 10, background: T.border, borderRadius: 4, width: "40%", marginBottom: 8 }} />
                  <div style={{ height: 12, background: T.border, borderRadius: 4, width: "80%", marginBottom: 8 }} />
                  <div style={{ height: 10, background: T.border, borderRadius: 4, width: "30%" }} />
                </div>
              ))
            ) : tickets.length === 0 ? (
              <div
                style={{
                  padding: 32,
                  textAlign: "center",
                  color: T.muted,
                  fontSize: 12,
                }}
              >
                Belum ada tiket.
                <br />
                <button
                  type="button"
                  onClick={() => setShowNewModal(true)}
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: T.gold,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Buat tiket pertama →
                </button>
              </div>
            ) : (
              tickets.map((tk) => {
                const lastMsg = tk.messages[0];
                const unread =
                  tk.status === "ANSWERED" ? 1 : 0; // simplified: badge when agent replied
                return (
                  <div
                    key={tk.id}
                    onClick={() => setActiveId(tk.id)}
                    style={{
                      padding: "14px 18px",
                      borderBottom: `1px solid ${T.border}`,
                      cursor: "pointer",
                      background: activeId === tk.id ? T.goldP : "transparent",
                      borderLeft:
                        activeId === tk.id
                          ? `3px solid ${T.gold}`
                          : "3px solid transparent",
                      transition: "all .15s",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: T.muted,
                          fontFamily: "monospace",
                        }}
                      >
                        #{tk.ticketNumber}
                      </span>
                      <span style={{ fontSize: 10, color: T.muted }}>
                        {fmtRelative(tk.updatedAt)}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: T.brown,
                        marginBottom: 4,
                        lineHeight: 1.4,
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
                          fontSize: 11,
                          color: T.muted,
                          marginBottom: 6,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {lastMsg.senderRole === "AGENT" ? "🎧 " : "Anda: "}
                        {lastMsg.content}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <Badge color={statusBadgeColor(tk.status)}>
                        {statusLabel(tk.status)}
                      </Badge>
                      {unread > 0 && (
                        <span
                          style={{
                            marginLeft: "auto",
                            background: T.terra,
                            color: "#fff",
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "1px 7px",
                            borderRadius: 100,
                          }}
                        >
                          {unread}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* ── Chat Window ─────────────────────────────────────────────────── */}
        <Card style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {!activeTicket ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: T.muted,
                fontSize: 13,
              }}
            >
              Pilih tiket untuk melihat percakapan
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div
                style={{
                  padding: "12px 20px",
                  borderBottom: `1px solid ${T.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: T.warm,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: T.sage,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  🎧
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: T.brown,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {activeTicket.subject}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: T.sage,
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: T.sage,
                        display: "inline-block",
                      }}
                    />
                    {detail?.assignedAgent
                      ? `Ditangani CS Agent`
                      : "Menunggu CS Agent"}{" "}
                    · #{activeTicket.ticketNumber}
                  </div>
                </div>
                <Badge color={statusBadgeColor(activeTicket.status)}>
                  {statusLabel(activeTicket.status)}
                </Badge>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflow: "auto",
                  padding: "20px",
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
                    Belum ada pesan. Mulai percakapan di bawah.
                  </div>
                ) : (
                  detail.messages.map((msg, idx) => {
                    const isCustomer = msg.senderRole === "CUSTOMER";
                    const prevMsg = detail.messages[idx - 1];
                    const showDate =
                      idx === 0 ||
                      new Date(msg.createdAt).toDateString() !==
                        new Date(prevMsg.createdAt).toDateString();

                    return (
                      <div key={msg.id}>
                        {showDate && (
                          <div
                            style={{
                              textAlign: "center",
                              fontSize: 10,
                              color: T.muted,
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 14,
                            }}
                          >
                            <div style={{ flex: 1, height: 1, background: T.border }} />
                            {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                            <div style={{ flex: 1, height: 1, background: T.border }} />
                          </div>
                        )}

                        <div
                          style={{
                            display: "flex",
                            gap: 10,
                            justifyContent: isCustomer ? "flex-end" : "flex-start",
                          }}
                        >
                          {!isCustomer && (
                            <div
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 8,
                                background: T.sage,
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

                          <div style={{ maxWidth: "70%" }}>
                            {!isCustomer && (
                              <div style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>
                                CS Agent
                              </div>
                            )}
                            <div
                              style={{
                                background: isCustomer ? T.brown : T.card,
                                color: isCustomer ? "#fff" : T.brown,
                                border: isCustomer ? "none" : `1px solid ${T.border}`,
                                padding: "10px 14px",
                                borderRadius: isCustomer
                                  ? "12px 12px 4px 12px"
                                  : "4px 12px 12px 12px",
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
                                style={{
                                  display: "block",
                                  marginTop: 6,
                                  fontSize: 11,
                                  color: T.gold,
                                  textDecoration: "none",
                                }}
                              >
                                📎 Lampiran
                              </a>
                            )}
                            <div
                              style={{
                                fontSize: 10,
                                color: T.muted,
                                textAlign: isCustomer ? "right" : "left",
                                marginTop: 4,
                              }}
                            >
                              {fmtTime(msg.createdAt)}
                              {isCustomer && " · Terkirim"}
                            </div>
                          </div>

                          {isCustomer && (
                            <div
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 8,
                                background: T.gold,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 12,
                                fontWeight: 700,
                                color: "#fff",
                                flexShrink: 0,
                                marginTop: 2,
                              }}
                            >
                              Sy
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                style={{
                  padding: "12px 16px",
                  borderTop: `1px solid ${T.border}`,
                  background: T.warm,
                }}
              >
                {activeTicket.status === "CLOSED" || activeTicket.status === "RESOLVED" ? (
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: T.muted,
                      padding: "10px 0",
                    }}
                  >
                    Tiket ini telah {activeTicket.status === "CLOSED" ? "ditutup" : "diselesaikan"}.
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 8,
                      background: T.bg,
                      border: `1.5px solid ${T.border}`,
                      borderRadius: 12,
                      padding: "8px 12px",
                    }}
                  >
                    <textarea
                      ref={textareaRef}
                      value={msgText}
                      onChange={(e) => setMsgText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ketik pesan Anda… (Enter kirim, Shift+Enter baris baru)"
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        background: "none",
                        resize: "none",
                        fontSize: 13,
                        lineHeight: 1.5,
                        maxHeight: 100,
                        color: T.char,
                      }}
                      rows={1}
                    />
                    <button
                      type="button"
                      onClick={sendMessage}
                      disabled={sending || !msgText.trim()}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background:
                          sending || !msgText.trim()
                            ? T.border
                            : T.brown,
                        border: "none",
                        color: sending || !msgText.trim() ? T.muted : "#fff",
                        fontSize: 14,
                        cursor:
                          sending || !msgText.trim() ? "not-allowed" : "pointer",
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

export default CustomerService;
