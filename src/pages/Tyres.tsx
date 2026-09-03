import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/common/Card";
import { Badge, healthTone } from "../components/common/Badge";
import { StatCard } from "../components/dashboard/StatCard";
import { CircleDot, ShieldCheck, AlertTriangle, XCircle } from "lucide-react";
import { useAppState } from "../context/AppStateContext";

export default function Tyres() {
  const { vehicles, getTyresForVehicle, setSelectedVehicleId, openTyreDrawer } = useAppState();
  const navigate = useNavigate();

  const rows = useMemo(
    () =>
      vehicles.flatMap((v) =>
        getTyresForVehicle(v.id).map((t) => ({ ...t, vehicle: v }))
      ),
    [vehicles, getTyresForVehicle]
  );

  const totalTyres = 256;
  const healthy = 218;
  const warning = 27;
  const critical = 11;

  function handleRowClick(vehicleId: string, tyreId: string) {
    setSelectedVehicleId(vehicleId);
    navigate(`/vehicles/${vehicleId}`);
    setTimeout(() => openTyreDrawer(tyreId), 250);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Tyres</h1>
        <p className="mt-1 text-[14px] text-navy-500">Fleet-wide tyre health and inventory.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={<CircleDot size={19} />} label="Total Tyres" value={String(totalTyres)} tone="brand" />
        <StatCard icon={<ShieldCheck size={19} />} label="Healthy" value={String(healthy)} tone="healthy" />
        <StatCard icon={<AlertTriangle size={19} />} label="Warning" value={String(warning)} tone="warning" />
        <StatCard icon={<XCircle size={19} />} label="Critical" value={String(critical)} tone="critical" />
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead>
            <tr className="border-b border-navy-900/8 bg-surface/70 text-[12px] uppercase tracking-wide text-navy-500">
              <th className="px-5 py-3 font-medium">Tyre ID</th>
              <th className="px-5 py-3 font-medium">Vehicle</th>
              <th className="px-5 py-3 font-medium">Position</th>
              <th className="px-5 py-3 font-medium">Brand</th>
              <th className="px-5 py-3 font-medium">Size</th>
              <th className="px-5 py-3 font-medium">Pressure</th>
              <th className="px-5 py-3 font-medium">Tread</th>
              <th className="px-5 py-3 font-medium">Condition</th>
              <th className="px-5 py-3 font-medium">Last Service</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 40).map((t) => (
              <tr key={`${t.vehicle.id}-${t.id}`} onClick={() => handleRowClick(t.vehicle.id, t.id)} className="cursor-pointer border-b border-navy-900/6 last:border-0 hover:bg-surface/60">
                <td className="px-5 py-3 font-semibold text-navy-900">{t.id}</td>
                <td className="px-5 py-3 text-navy-600">{t.vehicle.registration}</td>
                <td className="px-5 py-3 text-navy-600">{t.positionName}</td>
                <td className="px-5 py-3 text-navy-600">{t.brand}</td>
                <td className="px-5 py-3 text-navy-600">{t.size}</td>
                <td className="px-5 py-3 text-navy-600">{t.pressure} PSI</td>
                <td className="px-5 py-3 text-navy-600">{t.treadDepth} mm</td>
                <td className="px-5 py-3"><Badge tone={healthTone(t.condition)} dot>{t.condition}</Badge></td>
                <td className="px-5 py-3 text-navy-600">{t.lastServiceDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
