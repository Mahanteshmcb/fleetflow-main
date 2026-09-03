import React from "react";
import { Card } from "../common/Card";
import { Vehicle } from "../../types/vehicle";

export function VehicleInformation({ vehicle }: { vehicle: Vehicle }) {
  const rows: [string, string][] = [
    ["Manufacturer", vehicle.manufacturer],
    ["Model", vehicle.model],
    ["Vehicle Type", vehicle.vehicleType],
    ["Capacity", vehicle.capacity],
    ["Manufacturing Year", vehicle.manufacturingYear],
    ["Fuel", vehicle.fuelType],
    ["Odometer", `${vehicle.odometer.toLocaleString()} km`],
    ["Chassis Number", vehicle.chassisNumber],
    ["Engine Number", vehicle.engineNumber],
  ];

  return (
    <Card className="p-5">
      <h3 className="mb-4 text-[15px] font-semibold text-navy-900">Vehicle Information</h3>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between border-b border-navy-900/6 pb-2.5 text-[13px] sm:border-none sm:pb-0">
            <dt className="text-navy-500">{label}</dt>
            <dd className="font-medium text-navy-900">{value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
