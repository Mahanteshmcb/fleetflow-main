import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Vehicle } from "../../types/vehicle";
import { Badge, healthTone } from "../common/Badge";
import { useAppState } from "../../context/AppStateContext";

export function VehicleTable({ vehicles }: { vehicles: Vehicle[] }) {
  const navigate = useNavigate();
  const { getTyresForVehicle, setSelectedVehicleId } = useAppState();

  function goTo(v: Vehicle) {
    setSelectedVehicleId(v.id);
    navigate(`/vehicles/${v.id}`);
  }

  return (
    <div className="overflow-hidden rounded-xl2 border border-navy-900/8 bg-white shadow-card">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-navy-900/8 bg-surface/70 text-[12px] uppercase tracking-wide text-navy-500">
              <th className="px-5 py-3 font-medium">Registration</th>
              <th className="px-5 py-3 font-medium">Vehicle</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Capacity</th>
              <th className="px-5 py-3 font-medium">Odometer</th>
              <th className="px-5 py-3 font-medium">Health</th>
              <th className="px-5 py-3 font-medium">Tyres</th>
              <th className="px-5 py-3 font-medium">Next Service</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => {
              const tyres = getTyresForVehicle(v.id);
              const warningTyres = tyres.filter((t) => t.condition !== "Healthy").length;
              return (
                <tr
                  key={v.id}
                  onClick={() => goTo(v)}
                  className="cursor-pointer border-b border-navy-900/6 transition-colors last:border-0 hover:bg-surface/70"
                >
                  <td className="px-5 py-3.5 font-semibold text-navy-900">{v.registration}</td>
                  <td className="px-5 py-3.5 text-navy-700">{v.manufacturer} {v.model}</td>
                  <td className="px-5 py-3.5 text-navy-600">{v.vehicleType}</td>
                  <td className="px-5 py-3.5 text-navy-600">{v.capacity}</td>
                  <td className="px-5 py-3.5 text-navy-600">{v.odometer.toLocaleString()} km</td>
                  <td className="px-5 py-3.5"><Badge tone={healthTone(v.health)} dot>{v.health}</Badge></td>
                  <td className="px-5 py-3.5 text-navy-600">{warningTyres > 0 ? `${warningTyres} Warning` : "16 Good"}</td>
                  <td className="px-5 py-3.5 text-navy-600">{v.nextMaintenance.isOverdue ? "Overdue" : v.nextMaintenance.due}</td>
                  <td className="px-5 py-3.5 text-right"><ChevronRight size={16} className="text-navy-400" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile / tablet cards */}
      <div className="divide-y divide-navy-900/6 lg:hidden">
        {vehicles.map((v) => (
          <button key={v.id} onClick={() => goTo(v)} className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left hover:bg-surface/70">
            <div className="min-w-0">
              <div className="font-semibold text-navy-900">{v.registration}</div>
              <div className="truncate text-[13px] text-navy-600">{v.manufacturer} {v.model} · {v.odometer.toLocaleString()} km</div>
              <div className="mt-1.5"><Badge tone={healthTone(v.health)} dot>{v.health}</Badge></div>
            </div>
            <ChevronRight size={18} className="shrink-0 text-navy-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
