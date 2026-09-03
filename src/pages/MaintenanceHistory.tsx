import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Card } from "../components/common/Card";
import { mockMaintenanceHistory } from "../data/maintenance";

export default function MaintenanceHistory() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <button onClick={() => navigate(-1)} className="mb-3 flex items-center gap-1 text-[13px] font-medium text-navy-500 hover:text-navy-800">
          <ChevronLeft size={15} /> Back
        </button>
        <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Maintenance History</h1>
        <p className="mt-1 text-[14px] text-navy-500">Full record of completed services across the fleet.</p>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-navy-900/8 bg-surface/70 text-[12px] uppercase tracking-wide text-navy-500">
              <th className="px-5 py-3 font-medium">Maintenance Type</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Odometer</th>
              <th className="px-5 py-3 font-medium">Parts</th>
              <th className="px-5 py-3 font-medium">Labour</th>
              <th className="px-5 py-3 font-medium">Total Cost</th>
              <th className="px-5 py-3 font-medium">Service Centre</th>
              <th className="px-5 py-3 font-medium">Mechanic</th>
              <th className="px-5 py-3 font-medium">Next Service</th>
            </tr>
          </thead>
          <tbody>
            {mockMaintenanceHistory.map((h) => (
              <tr key={h.id} className="border-b border-navy-900/6 last:border-0 hover:bg-surface/60">
                <td className="px-5 py-3.5 font-semibold text-navy-900">{h.type}</td>
                <td className="px-5 py-3.5 text-navy-600">{h.date}</td>
                <td className="px-5 py-3.5 text-navy-600">{h.odometer.toLocaleString()} km</td>
                <td className="px-5 py-3.5 text-navy-600">₹{h.partsCost.toLocaleString("en-IN")}</td>
                <td className="px-5 py-3.5 text-navy-600">₹{h.labourCost.toLocaleString("en-IN")}</td>
                <td className="px-5 py-3.5 font-medium text-navy-900">₹{h.totalCost.toLocaleString("en-IN")}</td>
                <td className="px-5 py-3.5 text-navy-600">{h.serviceCentre}</td>
                <td className="px-5 py-3.5 text-navy-600">{h.mechanic}</td>
                <td className="px-5 py-3.5 text-navy-600">{h.nextServiceOdometer.toLocaleString()} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
