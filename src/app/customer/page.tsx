"use client";

import { useEffect, useState } from "react";
import { DashboardData } from "./types/dashboardData.types";

//---CONFIG-----
const TIER_NEXT: Record<string, { nextTier: string; target: number }> = {
  BRONZE: { nextTier: "SILVER", target: 3000 },
  SILVER: { nextTier: "GOLD", target: 5000 },
  GOLD: { nextTier: "PLATINUM", target: 10000 },
  PLATINUM: { nextTier: "", target: 0 },
};
//----------------------

//! TEMP
type DevCustomer = { id: string; fullName: string; user: { email: string } };
//---------

export default function Dashboard() {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  //! TEMP
  const [devCustomer, setDevCustomer] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/dev/customers")
      .then((r) => r.json())
      .then(({ data: list }) => {
        if (list?.length) {
          setDevCustomer(list);
          setCustomerId(list[0].id);
        }
      })
      .catch(() => {});
  }, []);
  //--------------

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

  const tier = data?.membershipTier ?? "SILVER";
  const tierInfo = TIER_NEXT[tier];
  const points = data?.totalPoints ?? 0;
  const progress =
    tierInfo.target > 0 ? Math.min(1, points / tierInfo.target) : 1;
  const remaining =
    tierInfo.target > 0 ? Math.max(0, tierInfo.target - points) : 0;
  const tierLabel =
    tier === "BRONZE"
      ? "🥉BRONZE"
      : tier === "GOLD"
        ? "👑 Gold Member"
        : tier === "PLATINUM"
          ? "💎 Platinum Member"
          : "🥈 Silver Member";

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const processingCount =
    data?.orders.filter(
      (o) => o.status === "PROCESSING" || o.status === "SHIPPED",
    ).length ?? 0;

  /*
   [Log] Object (node_modules_next_dist_115brz8._.js, line 2432)
   _count: {orders: 1, reviews: 0, warrantyClaims: 0}
   avatarUrl: null
   fullName: "Ahmad Fauzi"
   id: "4c601943-55fb-4542-974b-ef6c947ffe97"
   membershipTier: "SILVER"
   orders: [Object] (1)
   pointTransactions: [Object, Object, Object] (3)
   tierExpiresAt: "2025-12-31T00:00:00.000Z"
   totalPoints: 50001050
   voucherClaims: [] (0)
 */

  return (
    <>
      {/* dashboard! */}
      <section className="bg-amber-50 w-screen h-screen">
        {/* left-side of this section */}
        <section>
          <h1>Hi {data?.fullName}</h1>
          <div>
            <div>
              <p>Your tier: {data?.membershipTier}</p>
              {/* progress bar */}
              <div className="bg-amber-950 w-5xl h-3"></div>
            </div>
            <h2>Point {data?.totalPoints}</h2>
          </div>
        </section>
      </section>
    </>
  );
}
