"use client";
import { useState } from "react";
import { Dashboard } from "./Main-menu/dashboard/page";
import { Katalog } from "./Main-menu/katalog/page";
import { Showroom } from "./Main-menu/showroom/page";
import { CustomerService } from "./Main-menu/customerService/page";
import { Sidebar } from "./component/Sidebar";
import { Topbar } from "./component/Topbar";

const T = {
  bg: "#F5F0E8",
};

type Section = "dashboard" | "katalog" | "showroom" | "cs";

export default function CustomerPortal() {
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="portal-shell" style={{ background: T.bg }}>
      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar
        active={active}
        sidebarOpen={sidebarOpen}
        setActive={setActive}
        setSidebarOpen={setSidebarOpen}
      />
      <Topbar active={active} setSidebarOpen={setSidebarOpen} />

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
