"use client";
import { useEffect, useState } from "react";
import { Btn } from "@/components/Btn";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";

const T = {
  bg: "#13111A", surf: "#1B1825", surf2: "#221F2E", surf3: "#2A2638",
  border: "rgba(255,255,255,.07)", border2: "rgba(255,255,255,.13)",
  txt: "#EDE8F5", muted: "rgba(237,232,245,.45)", muted2: "rgba(237,232,245,.22)",
  purple: "#8B7CC8", purpleL: "#A898E0", purpleP: "rgba(139,124,200,.12)",
  gold: "#C9962A", goldL: "#E8B84B", goldP: "rgba(201,150,42,.10)",
  terra: "#C4572A", sage: "#7A8C6E", blue: "#4A90D9",
};

type CustomerDev = { id: string; fullName: string; totalPoints: number; user: { email: string } };
type PointSummary = { todayCount: number; todayPoints: number; dailyLimit: number };
type SubmitResult = { id: string; pointsAwarded: number; amount: number };

export function InputPoints({ mitraId }: { mitraId: string }) {
  const [customers, setCustomers] = useState<CustomerDev[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState<PointSummary | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [error, setError] = useState("");

  // Load dev customers
  useEffect(() => {
    fetch("/api/dev/customers")
      .then((r) => r.json())
      .then(({ data }) => {
        if (data?.length) {
          setCustomers(data);
          setCustomerId(data[0].id);
        }
      })
      .catch(() => {});
  }, []);

  // Load today's summary
  useEffect(() => {
    if (!mitraId) return;
    fetch(`/api/mitra/admin/points?mitraId=${mitraId}`)
      .then((r) => r.json())
      .then(({ data }) => { if (data) setSummary(data); })
      .catch(() => {});
  }, [mitraId, result]);

  const amount = Number(transactionAmount.replace(/\D/g, ""));
  const points = amount >= 500_000 ? Math.floor(amount / 10_000) : 0;

  async function submit() {
    if (!mitraId || !customerId || amount < 500_000) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/mitra/admin/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mitraId,
          customerId,
          transactionAmount: amount,
          description: description || `Transaksi dari mitra`,
        }),
      });
      const { data, error: e } = await res.json();
      if (e) { setError(e); return; }
      if (data) setResult(data);
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setResult(null);
    setTransactionAmount("");
    setDescription("");
    setError("");
  }

  const selectedCustomer = customers.find((c) => c.id === customerId);

  return (
    <div className="fade-up">
      <SectionHeader label="Poin Customer" title="Input Poin Transaksi" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        <Card style={{ padding: 24 }}>
          {result ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <div style={{ fontFamily: "var(--font-playfair, serif)", fontSize: 22, fontWeight: 700,
                color: T.txt, marginBottom: 8 }}>
                Poin Berhasil Diinput!
              </div>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 6 }}>
                <span style={{ color: T.gold, fontWeight: 700 }}>{result.pointsAwarded} poin</span> dikreditkan ke{" "}
                <span style={{ color: T.txt }}>{selectedCustomer?.fullName ?? "customer"}</span>
              </div>
              <Btn variant="primary" onClick={reset}>Input Poin Baru</Btn>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.txt, marginBottom: 18 }}>📋 Data Transaksi</div>

              {error && (
                <div style={{ padding: "10px 14px", background: "rgba(196,87,42,.15)", border: `1px solid ${T.terra}30`,
                  borderRadius: 8, fontSize: 12, color: T.terra, marginBottom: 14 }}>
                  {error}
                </div>
              )}

              {/* Customer picker */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted,
                  letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>
                  Customer *
                </label>
                {customers.length === 0 ? (
                  <div style={{ fontSize: 12, color: T.muted }}>Memuat data customer…</div>
                ) : (
                  <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`,
                      borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none", cursor: "pointer" }}
                  >
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.fullName} · {c.user.email} · {c.totalPoints} poin
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Amount */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted,
                  letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>
                  Total Nilai Transaksi (Rp) *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  placeholder="Contoh: 8500000"
                  style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`,
                    borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2, outline: "none" }}
                />
                {amount > 0 && amount < 500_000 && (
                  <div style={{ fontSize: 10, color: T.terra, marginTop: 4 }}>Minimum transaksi Rp 500.000</div>
                )}
              </div>

              {/* Points preview */}
              <div style={{ marginBottom: 14, padding: "12px 16px", background: T.surf2,
                borderRadius: 10, border: `1px solid ${T.border2}`, display: "flex",
                alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 12, color: T.muted }}>Poin yang akan diberikan</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: points > 0 ? T.gold : T.muted }}>
                  {points > 0 ? `⭐ ${points}` : "–"}
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted,
                  letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 5 }}>
                  Catatan (Opsional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Catatan tambahan..."
                  style={{ width: "100%", padding: "9px 12px", border: `1px solid ${T.border2}`,
                    borderRadius: 8, fontSize: 12, color: T.txt, background: T.surf2,
                    outline: "none", resize: "none", minHeight: 70 }}
                />
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <Btn
                  variant="primary"
                  onClick={submit}
                  disabled={!customerId || amount < 500_000 || submitting}
                >
                  {submitting ? "Memproses…" : "✓ Submit Poin"}
                </Btn>
                <Btn variant="outline" onClick={reset}>Reset Form</Btn>
              </div>
            </>
          )}
        </Card>

        {/* Guide + Today summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card style={{ padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.purpleL, marginBottom: 12 }}>
              ℹ️ Panduan Input Poin
            </div>
            {[
              ["Rasio Poin", "1 poin per Rp 10.000"],
              ["Min. Transaksi", "Rp 500.000"],
              ["Batas Harian", "Maks. 10 input/hari"],
              ["Deadline", "Maks. 3 hari setelah transaksi"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between",
                padding: "8px 0", borderBottom: `1px solid ${T.border}`, fontSize: 12 }}>
                <span style={{ color: T.muted }}>{k}</span>
                <span style={{ color: T.txt, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </Card>

          <Card style={{ padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.txt, marginBottom: 12 }}>📈 Input Hari Ini</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: T.purple, textAlign: "center", margin: "8px 0 4px" }}>
              {summary?.todayCount ?? "–"}
            </div>
            <div style={{ fontSize: 11, color: T.muted, textAlign: "center", marginBottom: 14 }}>
              dari {summary?.dailyLimit ?? 10} input hari ini
            </div>
            <div style={{ height: 6, background: T.surf3, borderRadius: 100, marginBottom: 8 }}>
              <div style={{ height: "100%", borderRadius: 100, background: T.purple,
                width: summary ? `${Math.min(100, (summary.todayCount / summary.dailyLimit) * 100)}%` : "0%" }} />
            </div>
            <div style={{ fontSize: 11, color: T.muted, textAlign: "center" }}>
              {summary ? `${summary.todayPoints.toLocaleString("id-ID")} total poin dikreditkan hari ini` : "Memuat…"}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default InputPoints;
