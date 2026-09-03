import React from "react";
import { IndianRupee, Gauge, Truck, Wrench } from "lucide-react";
import { Card } from "../components/common/Card";
import { MaintenanceCostChart } from "../components/charts/MaintenanceCostChart";

const metrics = [
  { label: "Monthly Maintenance Cost", value: "₹4,82,500", icon: IndianRupee },
  { label: "Average Cost / Vehicle", value: "₹11,488", icon: Gauge },
  { label: "Cost / KM", value: "₹3.85", icon: Gauge },
  { label: "Most Expensive Vehicle", value: "KA-01-AB-1234", icon: Truck },
  { label: "Most Repaired Component", value: "Brakes", icon: Wrench },
];

export default function MaintenanceCosts() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Maintenance Costs</h1>
        <p className="mt-1 text-[14px] text-navy-500">Track spend across your fleet.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((m) => (
          <Card key={m.label} className="p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <m.icon size={16} />
            </div>
            <p className="text-[18px] font-semibold text-navy-900">{m.value}</p>
            <p className="mt-0.5 text-[12.5px] text-navy-500">{m.label}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <h3 className="mb-4 font-semibold text-navy-900">Monthly Maintenance Spend</h3>
        <MaintenanceCostChart />
      </Card>
    </div>
  );
}
