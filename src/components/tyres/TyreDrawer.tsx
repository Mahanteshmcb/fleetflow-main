import React, { useState } from "react";
import { Drawer } from "../common/Drawer";
import { Badge, healthTone } from "../common/Badge";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { useAppState } from "../../context/AppStateContext";
import { Pencil, Wrench, AlertTriangle, RefreshCw, Trash2, Check } from "lucide-react";

export function TyreDrawer() {
  const {
    isTyreDrawerOpen,
    closeTyreDrawer,
    selectedTyreId,
    selectedVehicle,
    getTyresForVehicle,
    updateTyre,
    showToast,
    reportIssue,
    enterRotationMode,
  } = useAppState();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});

  if (!selectedVehicle) return null;
  const tyres = getTyresForVehicle(selectedVehicle.id);
  const tyre = tyres.find((t) => t.id === selectedTyreId);

  function startEdit() {
    if (!tyre) return;
    setForm({
      brand: tyre.brand,
      model: tyre.model,
      size: tyre.size,
      pressure: String(tyre.pressure),
      treadDepth: String(tyre.treadDepth),
      temperature: String(tyre.temperature),
      condition: tyre.condition,
      issue: tyre.issue ?? "",
    });
    setEditing(true);
  }

  function saveEdit() {
    if (!tyre || !selectedVehicle) return;
    updateTyre(selectedVehicle.id, tyre.id, {
      brand: form.brand,
      model: form.model,
      size: form.size,
      pressure: Number(form.pressure) || tyre.pressure,
      treadDepth: Number(form.treadDepth) || tyre.treadDepth,
      temperature: Number(form.temperature) || tyre.temperature,
      condition: form.condition as any,
      issue: form.issue || null,
    });
    setEditing(false);
    showToast("Tyre updated", "success");
  }

  function handleClose() {
    setEditing(false);
    closeTyreDrawer();
  }

  return (
    <Drawer
      open={isTyreDrawerOpen}
      onClose={handleClose}
      title="Tyre Details"
      subtitle={
        tyre && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-navy-800">{tyre.id} · {tyre.positionName}</span>
            <Badge tone={healthTone(tyre.condition)} dot>{tyre.condition}</Badge>
          </div>
        )
      }
    >
      {!tyre ? (
        <div className="text-sm text-navy-500">No tyre selected.</div>
      ) : editing ? (
        <div className="flex flex-col gap-4">
          <Input label="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
          <Input label="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
          <Input label="Size" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Pressure (PSI)" type="number" value={form.pressure} onChange={(e) => setForm({ ...form, pressure: e.target.value })} />
            <Input label="Tread Depth (mm)" type="number" value={form.treadDepth} onChange={(e) => setForm({ ...form, treadDepth: e.target.value })} />
          </div>
          <Input label="Temperature (°C)" type="number" value={form.temperature} onChange={(e) => setForm({ ...form, temperature: e.target.value })} />
          <Select
            label="Condition"
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
            options={[
              { label: "Healthy", value: "Healthy" },
              { label: "Warning", value: "Warning" },
              { label: "Critical", value: "Critical" },
            ]}
          />
          <Input label="Active Issue" placeholder="None" value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} />
          <div className="mt-2 flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => setEditing(false)}>Cancel</Button>
            <Button variant="primary" className="flex-1" icon={<Check size={16} />} onClick={saveEdit}>Save Changes</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <Section title="Overview">
            <Row label="Tyre ID" value={tyre.id} />
            <Row label="Position" value={tyre.positionName} />
            <Row label="Axle" value={`Axle ${tyre.axle}`} />
            <Row label="Side" value={tyre.side === "left" ? "Left" : "Right"} />
            <Row label="Tyre Type" value={tyre.type} />
            <Row label="Brand" value={tyre.brand} />
            <Row label="Model" value={tyre.model} />
            <Row label="Size" value={tyre.size} />
          </Section>

          <Section title="Condition">
            <Row label="Pressure" value={`${tyre.pressure} PSI`} />
            <Row label="Tread Depth" value={`${tyre.treadDepth} mm`} />
            <Row label="Temperature" value={`${tyre.temperature} °C`} />
            <Row label="Wear Percentage" value={`${tyre.wearPercentage}%`} />
            <Row label="Condition" value={<Badge tone={healthTone(tyre.condition)}>{tyre.condition}</Badge>} />
            <Row label="Active Issue" value={tyre.issue ?? "None"} />
          </Section>

          <Section title="Service">
            <Row label="Installation Date" value={tyre.installationDate} />
            <Row label="Last Service" value={tyre.lastServiceDate} />
            <Row label="Next Inspection" value={tyre.nextInspectionDate} />
            <Row label="Service Count" value={String(tyre.serviceCount)} />
            <Row label="Total Kilometres" value={`${tyre.totalKilometres.toLocaleString()} km`} />
          </Section>

          <Section title="Service History">
            <div className="flex flex-col gap-3">
              {tyre.history.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                  <div>
                    <div className="text-[13px] font-medium text-navy-900">{h.label}</div>
                    <div className="text-xs text-navy-500">{h.date} · {h.odometer.toLocaleString()} km</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Actions">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm" icon={<Pencil size={14} />} onClick={startEdit}>Edit Tyre</Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<Wrench size={14} />}
                onClick={() => {
                  updateTyre(selectedVehicle.id, tyre.id, {
                    lastServiceDate: new Date().toISOString().slice(0, 10),
                    serviceCount: tyre.serviceCount + 1,
                  });
                  showToast("Maintenance marked complete", "success");
                }}
              >
                Service Tyre
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<AlertTriangle size={14} />}
                onClick={() => reportIssue(selectedVehicle.id, "Tyre damage detected")}
              >
                Report Issue
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<RefreshCw size={14} />}
                onClick={() => {
                  handleClose();
                  enterRotationMode();
                }}
              >
                Rotate Tyre
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 size={14} />}
                className="col-span-2"
                onClick={() => showToast(`Tyre ${tyre.id} removal is disabled in this prototype`, "info")}
              >
                Remove Tyre
              </Button>
            </div>
          </Section>
        </div>
      )}
    </Drawer>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-navy-500/70">{title}</div>
      <div className="flex flex-col gap-2.5 rounded-xl border border-navy-900/8 bg-surface/60 p-3.5">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[13px]">
      <span className="text-navy-500">{label}</span>
      <span className="font-medium text-navy-900">{value}</span>
    </div>
  );
}
