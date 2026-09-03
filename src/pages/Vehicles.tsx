import React, { useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { VehicleTable } from "../components/vehicles/VehicleTable";
import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { useAppState } from "../context/AppStateContext";

export default function Vehicles() {
  const { vehicles, openAddVehicleDrawer } = useAppState();
  const [query, setQuery] = useState("");
  const [sortDesc, setSortDesc] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = vehicles;
    if (q) {
      list = list.filter(
        (v) => v.registration.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) || v.manufacturer.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => (sortDesc ? b.odometer - a.odometer : a.odometer - b.odometer));
  }, [vehicles, query, sortDesc]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Vehicles</h1>
          <p className="mt-1 text-[14px] text-navy-500">Manage and monitor your fleet.</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={openAddVehicleDrawer}>
          Add Vehicle
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-500/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search registration or model..."
            className="h-10 w-full rounded-lg border border-navy-900/10 bg-white pl-9 pr-3 text-sm text-navy-900 focus:border-brand-500"
          />
        </div>
        <Button variant="secondary" icon={<SlidersHorizontal size={15} />}>Filter</Button>
        <Button variant="secondary" icon={<ArrowUpDown size={15} />} onClick={() => setSortDesc((v) => !v)}>
          Sort {sortDesc ? "↓" : "↑"}
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No vehicles found"
          description={`No vehicles match "${query}". Try a different search term.`}
          actionLabel="Clear search"
          onAction={() => setQuery("")}
        />
      ) : (
        <VehicleTable vehicles={filtered} />
      )}
    </div>
  );
}
