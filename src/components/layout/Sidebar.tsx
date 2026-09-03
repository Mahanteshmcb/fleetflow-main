import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid, Truck, Wrench, CircleDot, ClipboardCheck, Package, Building2, Users,
  FileText, DollarSign, BarChart3, FileBarChart, Bell, Settings, ChevronsLeft, ChevronsRight,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { useAppState } from "../../context/AppStateContext";

const sections = [
  {
    label: "Main",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
      { to: "/vehicles", label: "Vehicles", icon: Truck },
      { to: "/maintenance", label: "Maintenance", icon: Wrench },
      { to: "/tyres", label: "Tyres", icon: CircleDot },
      { to: "/inspections", label: "Inspections", icon: ClipboardCheck },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/inventory", label: "Parts & Inventory", icon: Package },
      { to: "/workshops", label: "Workshops", icon: Building2 },
      { to: "/mechanics", label: "Mechanics", icon: Users },
      { to: "/documents", label: "Documents", icon: FileText },
    ],
  },
  {
    label: "Analytics",
    items: [
      { to: "/maintenance-costs", label: "Maintenance Costs", icon: DollarSign },
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/reports", label: "Reports", icon: FileBarChart },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/notifications", label: "Notifications", icon: Bell },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function Sidebar({
  collapsed,
  onToggleCollapse,
  onNavigate,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigate?: () => void;
}) {
  const { role, showToast } = useAppState();

  return (
    <div className="flex h-full flex-col bg-navy-950 text-white">
      <div className={cn("flex items-center gap-2.5 px-5 py-5", collapsed && "justify-center px-0")}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500 font-bold text-white">F</div>
        {!collapsed && <span className="text-[15px] font-semibold tracking-tight">FleetLane</span>}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2 no-scrollbar">
        {sections.map((section) => (
          <div key={section.label} className="mb-4">
            {!collapsed && (
              <div className="px-3 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                {section.label}
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white",
                      collapsed && "justify-center px-0",
                      isActive && "bg-brand-500/15 text-white"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon size={18} className={cn("shrink-0", isActive ? "text-brand-300" : "text-white/50 group-hover:text-white/80")} />
                      {!collapsed && <span>{item.label}</span>}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <button
        onClick={onToggleCollapse}
        className="hidden items-center gap-2 border-t border-white/10 px-5 py-3 text-[13px] text-white/50 hover:text-white md:flex"
      >
        {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        {!collapsed && <span>Collapse</span>}
      </button>

      <div className={cn("border-t border-white/10 p-4", collapsed && "flex justify-center")}>
        <button
          onClick={() => showToast("Opened profile menu (prototype)", "info")}
          className={cn("flex w-full items-center gap-3 rounded-lg p-1.5 hover:bg-white/5", collapsed && "w-auto justify-center")}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/30 text-sm font-semibold text-brand-200">
            AM
          </div>
          {!collapsed && (
            <div className="min-w-0 text-left">
              <div className="truncate text-[13px] font-medium text-white">Alex Morgan</div>
              <div className="truncate text-[11.5px] text-white/45">{role}</div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
