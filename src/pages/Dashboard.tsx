import React from "react";
import { Truck, ShieldCheck, Wrench, AlertTriangle, CalendarClock, DollarSign } from "lucide-react";
import { StatCard } from "../components/dashboard/StatCard";
import { VehicleHealthTable } from "../components/dashboard/VehicleHealthTable";
import { useAppState } from "../context/AppStateContext";

export default function Dashboard() {
  const { vehicles } = useAppState();

  const healthy = vehicles.filter((v) => v.health === "Healthy").length;
  const critical = vehicles.filter((v) => v.health === "Critical" || v.health === "Needs Inspection").length;
  const warning = vehicles.filter((v) => v.health === "Warning").length;
  const overdue = vehicles.filter((v) => v.nextMaintenance.isOverdue).length;
  const monthlyCost = vehicles.reduce((sum, v) => sum + v.monthlyCost, 0) + 296400;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Good morning, Alex</h1>
        <p className="mt-1 text-[14px] text-navy-500">Here's what's happening with your fleet today.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard icon={<Truck size={19} />} label="Total Vehicles" value={String(vehicles.length + 37)} trend="+3 this month" tone="brand" />
        <StatCard icon={<ShieldCheck size={19} />} label="Healthy Vehicles" value={String(healthy + 26)} trend="66.7%" tone="healthy" />
        <StatCard icon={<Wrench size={19} />} label="Under Maintenance" value={String(warning + 5)} tone="warning" />
        <StatCard icon={<AlertTriangle size={19} />} label="Overdue Maintenance" value={String(overdue + 2)} tone="critical" />
        <StatCard icon={<CalendarClock size={19} />} label="Upcoming Maintenance" value="9" tone="brand" />
        <StatCard icon={<DollarSign size={19} />} label="Monthly Maintenance Cost" value={`₹${monthlyCost.toLocaleString("en-IN")}`} tone="neutral" />
      </div>

      <VehicleHealthTable vehicles={vehicles} />
    </div>
  );
}
