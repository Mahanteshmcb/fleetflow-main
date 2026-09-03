import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { cn } from "../../utils/cn";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/vehicles": "Vehicles",
  "/maintenance": "Maintenance",
  "/maintenance/history": "Maintenance History",
  "/tyres": "Tyres",
  "/inventory": "Parts & Inventory",
  "/workshops": "Workshops",
  "/mechanics": "Mechanics",
  "/inspections": "Inspections",
  "/documents": "Documents",
  "/analytics": "Analytics",
  "/maintenance-costs": "Maintenance Costs",
  "/reports": "Reports",
  "/notifications": "Notifications",
  "/settings": "Settings",
};

function resolveTitle(pathname: string): string {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith("/vehicles/")) return "Vehicle Details";
  return "FleetLane";
}

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface">
      <aside className={cn("hidden shrink-0 transition-all duration-200 md:block", collapsed ? "w-[76px]" : "w-64")}>
        <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((v) => !v)} />
      </aside>

      <AnimatePresence>
        {mobileNavOpen && (
          <div className="fixed inset-0 z-[80] md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-navy-950/50" onClick={() => setMobileNavOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.2 }} className="absolute left-0 top-0 h-full w-72">
              <div className="relative h-full">
                <button aria-label="Close menu" onClick={() => setMobileNavOpen(false)} className="absolute right-3 top-4 z-10 rounded-md p-1.5 text-white/70 hover:bg-white/10">
                  <X size={18} />
                </button>
                <Sidebar collapsed={false} onToggleCollapse={() => {}} onNavigate={() => setMobileNavOpen(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={resolveTitle(location.pathname)} onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
