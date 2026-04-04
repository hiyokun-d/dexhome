"use client";
import { useState } from "react";
import { Dashboard } from "./dashboard/page";
import { Katalog } from "./katalog/page";
import { Showroom } from "./showroom/page";
import { CustomerService } from "./customerService/page";
import { Sidebar } from "./component/sidebar";
import { Topbar } from "./component/Topbar";

// ── Theme ──────────────────────────────────────────────────────────────
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

// ── Main Portal ────────────────────────────────────────────────────────
type Section = "dashboard" | "katalog" | "showroom" | "cs";

export default function CustomerPortal() {
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const navItems: {
  //   id: Section;
  //   icon: string;
  //   label: string;
  //   badge?: number;
  // }[] = [
  //   { id: "dashboard", icon: "🏠", label: "Dashboard" },
  //   { id: "katalog", icon: "🛍️", label: "Katalog" },
  //   { id: "showroom", icon: "🏬", label: "Showroom" },
  //   { id: "cs", icon: "💬", label: "Customer Service", badge: 2 },
  // ];
  //
  // const comingSoon = [
  //   { icon: "👤", label: "Profil Saya" },
  //   { icon: "📦", label: "Pesanan Saya" },
  //   { icon: "🛡️", label: "Garansi & Asuransi" },
  //   { icon: "❤️", label: "Wishlist" },
  //   { icon: "🎪", label: "Event" },
  // ];
  //
  // const titles: Record<Section, string> = {
  //   dashboard: "Dashboard",
  //   katalog: "Katalog",
  //   showroom: "Showroom",
  //   cs: "Customer Service",
  // };

  return (
    <div className="portal-shell" style={{ background: T.bg }}>
      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar />
      <Topbar />

      {/* Main */}
      <main className="portal-main" style={{ padding: "28px 32px" }}>
        {active === "dashboard" && <Dashboard />}
        {active === "katalog" && <Katalog />}
        {active === "showroom" && <Showroom />}
        {active === "cs" && <CustomerService />}
      </main>
    </div>
  );
}
