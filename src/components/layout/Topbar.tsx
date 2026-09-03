import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Menu, ChevronDown, LogOut, User, Settings as SettingsIcon } from "lucide-react";
import { useAppState } from "../../context/AppStateContext";
import { mockMaintenance } from "../../data/maintenance";
import { mockInventory } from "../../data/inventory";
import { mockDocuments } from "../../data/documents";
import { cn } from "../../utils/cn";

type SearchResult = {
  category: "Vehicle" | "Tyre" | "Maintenance" | "Part" | "Document";
  title: string;
  subtitle: string;
  onSelect: () => void;
};

export function Topbar({ title, onOpenMobileNav }: { title: string; onOpenMobileNav: () => void }) {
  const { vehicles, getTyresForVehicle, setSelectedVehicleId, openTyreDrawer, showToast } = useAppState();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const results: SearchResult[] = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.trim().toLowerCase();
    const out: SearchResult[] = [];

    vehicles.forEach((v) => {
      if (v.registration.toLowerCase().includes(q) || v.model.toLowerCase().includes(q)) {
        out.push({
          category: "Vehicle",
          title: v.registration,
          subtitle: `${v.manufacturer} ${v.model}`,
          onSelect: () => {
            setSelectedVehicleId(v.id);
            navigate(`/vehicles/${v.id}`);
          },
        });
      }
      getTyresForVehicle(v.id).forEach((t) => {
        if (t.id.toLowerCase().includes(q) && q.length >= 2) {
          out.push({
            category: "Tyre",
            title: t.id,
            subtitle: `${t.positionName} · ${v.registration}`,
            onSelect: () => {
              setSelectedVehicleId(v.id);
              navigate(`/vehicles/${v.id}`);
              setTimeout(() => openTyreDrawer(t.id), 250);
            },
          });
        }
      });
    });

    mockMaintenance.forEach((m) => {
      if (m.task.toLowerCase().includes(q) || m.vehicleRegistration.toLowerCase().includes(q)) {
        out.push({ category: "Maintenance", title: m.task, subtitle: m.vehicleRegistration, onSelect: () => navigate("/maintenance") });
      }
    });

    mockInventory.forEach((p) => {
      if (p.name.toLowerCase().includes(q)) {
        out.push({ category: "Part", title: p.name, subtitle: `${p.quantity} units in stock`, onSelect: () => navigate("/inventory") });
      }
    });

    mockDocuments.forEach((d) => {
      if (d.name.toLowerCase().includes(q) || d.vehicleRegistration.toLowerCase().includes(q)) {
        out.push({ category: "Document", title: d.name, subtitle: d.vehicleRegistration, onSelect: () => navigate("/documents") });
      }
    });

    return out.slice(0, 8);
  }, [query, vehicles, getTyresForVehicle, navigate, setSelectedVehicleId, openTyreDrawer]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-navy-900/8 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button onClick={onOpenMobileNav} className="rounded-lg p-2 text-navy-700 hover:bg-navy-900/5 md:hidden" aria-label="Open navigation">
        <Menu size={20} />
      </button>

      <h1 className="hidden truncate text-[15px] font-semibold text-navy-900 sm:block">{title}</h1>

      <div className="relative ml-auto flex-1 sm:max-w-xs">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-500/60" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchOpen(true);
          }}
          onFocus={() => setSearchOpen(true)}
          onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
          placeholder="Search vehicles, tyres, parts..."
          aria-label="Global search"
          className="h-9 w-full rounded-lg border border-navy-900/10 bg-surface pl-9 pr-3 text-[13px] text-navy-900 placeholder:text-navy-500/60 focus:border-brand-500 focus:bg-white"
        />
        {searchOpen && query.trim().length >= 2 && (
          <div className="absolute left-0 right-0 top-11 max-h-80 overflow-y-auto rounded-xl border border-navy-900/8 bg-white p-1.5 shadow-pop">
            {results.length === 0 ? (
              <div className="px-3 py-4 text-center text-[13px] text-navy-500">No results for "{query}"</div>
            ) : (
              results.map((r, i) => (
                <button
                  key={i}
                  onMouseDown={r.onSelect}
                  className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left hover:bg-surface"
                >
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-medium text-navy-900">{r.title}</div>
                    <div className="truncate text-xs text-navy-500">{r.subtitle}</div>
                  </div>
                  <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700">{r.category}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/notifications")}
        className="relative rounded-lg p-2 text-navy-700 hover:bg-navy-900/5"
        aria-label="Notifications"
      >
        <Bell size={19} />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-critical" />
      </button>

      <div className="relative">
        <button
          onClick={() => setProfileOpen((v) => !v)}
          onBlur={() => setTimeout(() => setProfileOpen(false), 150)}
          className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-navy-900/5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-[13px] font-semibold text-brand-700">AM</div>
          <ChevronDown size={14} className="hidden text-navy-500 sm:block" />
        </button>
        {profileOpen && (
          <div className="absolute right-0 top-11 w-48 rounded-xl border border-navy-900/8 bg-white p-1.5 shadow-pop">
            <button onMouseDown={() => { showToast("Profile is a prototype view", "info"); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] text-navy-800 hover:bg-surface">
              <User size={15} /> Profile
            </button>
            <button onMouseDown={() => navigate("/settings")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] text-navy-800 hover:bg-surface">
              <SettingsIcon size={15} /> Settings
            </button>
            <div className="my-1 h-px bg-navy-900/8" />
            <button onMouseDown={() => navigate("/login")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-critical hover:bg-critical-bg">
              <LogOut size={15} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
