"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./component/Navbar";
import { DashboardView } from "./component/DashboardView";
import type { DashboardData } from "./types/dashboardData.types";

type Section = "dashboard" | "katalog" | "showroom" | "cs";

export default function CustomerPortal() {
  const [section, setSection] = useState<Section>("dashboard");
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  //! TEMP: pick first seeded customer
  useEffect(() => {
    fetch("/api/dev/customers")
      .then((r) => r.json())
      .then(({ data: list }) => {
        if (list?.length) setCustomerId(list[0].id);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!customerId) return;
    setLoading(true);
    fetch(`/api/customer/dashboard?customerId=${customerId}`)
      .then((r) => r.json())
      .then(({ data: d }) => {
        if (d) setData(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [customerId]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F0E8",
        fontFamily: "var(--font-dm-sans, sans-serif)",
      }}
    >
      <Navbar
        active={section}
        setActive={setSection}
        userName={data?.fullName}
        tier={data?.membershipTier}
      />
      <main
        style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}
      >
        {section === "dashboard" && (
          <DashboardView data={data} loading={loading} />
        )}
        {section === "katalog" && <Placeholder label="Katalog" />}
        {section === "showroom" && <Placeholder label="Showroom" />}
        {section === "cs" && <Placeholder label="Customer Service" />}
      </main>
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 320,
        color: "#8A7F74",
        fontSize: 14,
      }}
    >
      {label} — belum tersedia
    </div>
  );
}
