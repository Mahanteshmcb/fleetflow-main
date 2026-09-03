import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Drawer } from "../common/Drawer";
import { Badge, healthTone } from "../common/Badge";
import { useAppState } from "../../context/AppStateContext";
import { cn } from "../../utils/cn";

export function MyVehiclesDrawer() {
  const { isMyVehiclesDrawerOpen, closeMyVehiclesDrawer, vehicles, selectedVehicleId, setSelectedVehicleId } = useAppState();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = vehicles.filter(
    (v) => v.registration.toLowerCase().includes(query.toLowerCase()) || v.model.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Drawer open={isMyVehiclesDrawerOpen} onClose={closeMyVehiclesDrawer} title="My Vehicles">
      <div className="relative mb-4">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-500/60" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search vehicles..."
          className="h-10 w-full rounded-lg border border-navy-900/10 bg-surface pl-9 pr-3 text-sm text-navy-900 focus:border-brand-500 focus:bg-white"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        {filtered.map((v) => (
          <button
            key={v.id}
            onClick={() => {
              setSelectedVehicleId(v.id);
              navigate(`/vehicles/${v.id}`);
              closeMyVehiclesDrawer();
            }}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors",
              v.id === selectedVehicleId ? "border-brand-300 bg-brand-50" : "border-transparent hover:bg-surface"
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "h-2.5 w-2.5 shrink-0 rounded-full",
                  v.health === "Healthy" && "bg-healthy",
                  v.health === "Warning" && "bg-warning",
                  (v.health === "Critical" || v.health === "Needs Inspection") && "bg-critical"
                )}
              />
              <div>
                <div className="text-[13.5px] font-semibold text-navy-900">{v.registration}</div>
                <div className="text-xs text-navy-500">{v.manufacturer} {v.model}</div>
              </div>
            </div>
            <Badge tone={healthTone(v.health)}>{v.health}</Badge>
          </button>
        ))}
        {filtered.length === 0 && <div className="py-8 text-center text-sm text-navy-500">No vehicles match "{query}"</div>}
      </div>
    </Drawer>
  );
}
