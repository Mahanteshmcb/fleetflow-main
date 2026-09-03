import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Users, Pencil, Wrench, ClipboardCheck, MoreHorizontal } from "lucide-react";
import { Badge, healthTone } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { TruckVisualization } from "../components/tyres/TruckVisualization";
import { VehicleInformation } from "../components/vehicles/VehicleInformation";
import { ComplianceCards } from "../components/vehicles/ComplianceCards";
import { useAppState } from "../context/AppStateContext";

export default function VehicleDetails() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const { vehicles, selectedVehicleId, setSelectedVehicleId, openMyVehiclesDrawer, getTyresForVehicle, showToast } = useAppState();

  useEffect(() => {
    if (vehicleId && vehicleId !== selectedVehicleId) setSelectedVehicleId(vehicleId);
  }, [vehicleId, selectedVehicleId, setSelectedVehicleId]);

  const vehicle = vehicles.find((v) => v.id === (vehicleId ?? selectedVehicleId));

  if (!vehicle) {
    return (
      <div className="py-16 text-center text-sm text-navy-500">
        Vehicle not found. <button onClick={() => navigate("/vehicles")} className="font-medium text-brand-500">Back to Vehicles</button>
      </div>
    );
  }

  const tyres = getTyresForVehicle(vehicle.id);
  const criticalCount = tyres.filter((t) => t.condition === "Critical").length;
  const warningCount = tyres.filter((t) => t.condition === "Warning").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <button onClick={() => navigate("/vehicles")} className="mb-3 flex items-center gap-1 text-[13px] font-medium text-navy-500 hover:text-navy-800">
          <ChevronLeft size={15} /> Back to Vehicles
        </button>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">{vehicle.registration}</h1>
              <Badge tone={healthTone(vehicle.health)} dot>{vehicle.health}</Badge>
            </div>
            <p className="mt-1 text-[14px] text-navy-500">{vehicle.manufacturer} {vehicle.model}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" icon={<Users size={14} />} onClick={openMyVehiclesDrawer}>My Vehicles</Button>
            <Button variant="secondary" size="sm" icon={<Pencil size={14} />} onClick={() => showToast("Edit Vehicle is a prototype action", "info")}>Edit Vehicle</Button>
            <Button variant="secondary" size="sm" icon={<Wrench size={14} />} onClick={() => navigate("/maintenance")}>Maintenance</Button>
            <Button variant="secondary" size="sm" icon={<ClipboardCheck size={14} />} onClick={() => navigate("/inspections")}>Inspection</Button>
            <Button variant="ghost" size="sm" icon={<MoreHorizontal size={16} />} aria-label="More actions" onClick={() => showToast("More actions coming soon", "info")} />
          </div>
        </div>
      </div>

      {vehicle.health === "Needs Inspection" && (
        <div className="flex items-center gap-2.5 rounded-xl border border-critical/30 bg-critical-bg px-4 py-3 text-[13.5px] font-medium text-critical">
          🚨 Vehicle requires inspection
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-4 sm:p-6">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-navy-900">Tyre & Axle Visualization</h2>
            <span className="text-xs text-navy-500">16 positions</span>
          </div>
          <TruckVisualization />
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="p-5">
            <h3 className="mb-4 text-[15px] font-semibold text-navy-900">Tyre Summary</h3>
            <div className="grid grid-cols-3 gap-3">
              <SummaryStat label="Healthy" value={16 - criticalCount - warningCount} tone="healthy" />
              <SummaryStat label="Warning" value={warningCount} tone="warning" />
              <SummaryStat label="Critical" value={criticalCount} tone="critical" />
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="mb-4 text-[15px] font-semibold text-navy-900">Maintenance Summary</h3>
            <div className="flex flex-col gap-3 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-navy-500">Next Task</span>
                <span className="font-medium text-navy-900">{vehicle.nextMaintenance.task}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-navy-500">Due</span>
                <span className={`font-medium ${vehicle.nextMaintenance.isOverdue ? "text-critical" : "text-navy-900"}`}>
                  {vehicle.nextMaintenance.isOverdue ? "Overdue" : vehicle.nextMaintenance.due}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-navy-500">Monthly Cost</span>
                <span className="font-medium text-navy-900">₹{vehicle.monthlyCost.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <Button variant="secondary" size="sm" className="mt-4 w-full" onClick={() => navigate("/maintenance/history")}>
              View Maintenance History
            </Button>
          </Card>
        </div>
      </div>

      <VehicleInformation vehicle={vehicle} />
      <ComplianceCards vehicle={vehicle} />
    </div>
  );
}

function SummaryStat({ label, value, tone }: { label: string; value: number; tone: "healthy" | "warning" | "critical" }) {
  const toneClasses = {
    healthy: "text-healthy bg-healthy-bg",
    warning: "text-warning bg-warning-bg",
    critical: "text-critical bg-critical-bg",
  }[tone];
  return (
    <div className={`rounded-lg py-3 text-center ${toneClasses}`}>
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-[11px] font-medium">{label}</div>
    </div>
  );
}
