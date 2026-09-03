import React from "react";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "../../types/vehicle";
import { Badge, healthTone } from "../common/Badge";
import { Card } from "../common/Card";
import { useAppState } from "../../context/AppStateContext";

export function VehicleHealthTable({ vehicles }: { vehicles: Vehicle[] }) {
  const navigate = useNavigate();
  const { setSelectedVehicleId } = useAppState();

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-navy-900/8 px-5 py-4">
        <h3 className="text-[15px] font-semibold text-navy-900">Vehicle Health</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-navy-900/8 bg-surface/70 text-[12px] uppercase tracking-wide text-navy-500">
              <th className="px-5 py-3 font-medium">Vehicle</th>
              <th className="px-5 py-3 font-medium">Model</th>
              <th className="px-5 py-3 font-medium">Health</th>
              <th className="px-5 py-3 font-medium">Next Maintenance</th>
              <th className="px-5 py-3 font-medium">Due</th>
              <th className="px-5 py-3 font-medium">Cost</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr
                key={v.id}
                onClick={() => {
                  setSelectedVehicleId(v.id);
                  navigate(`/vehicles/${v.id}`);
                }}
                className="cursor-pointer border-b border-navy-900/6 last:border-0 hover:bg-surface/70"
              >
                <td className="px-5 py-3.5 font-semibold text-navy-900">{v.registration}</td>
                <td className="px-5 py-3.5 text-navy-600">{v.manufacturer} {v.model}</td>
                <td className="px-5 py-3.5"><Badge tone={healthTone(v.health)} dot>{v.health}</Badge></td>
                <td className="px-5 py-3.5 text-navy-600">{v.nextMaintenance.task}</td>
                <td className="px-5 py-3.5 text-navy-600">{v.nextMaintenance.isOverdue ? "Overdue" : v.nextMaintenance.due}</td>
                <td className="px-5 py-3.5 font-medium text-navy-800">₹{v.monthlyCost.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
