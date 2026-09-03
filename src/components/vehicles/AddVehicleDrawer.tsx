import React, { useState } from "react";
import { Drawer } from "../common/Drawer";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import { useAppState } from "../../context/AppStateContext";
import { isNonEmpty } from "../../utils/validators";

const initialForm = {
  registration: "",
  manufacturer: "",
  model: "",
  vehicleType: "",
  capacity: "",
  manufacturingYear: "",
  chassisNumber: "",
  engineNumber: "",
  fuelType: "Diesel",
  odometer: "",
  purchaseDate: "",
  insuranceExpiry: "",
  fitnessExpiry: "",
  permitExpiry: "",
  pucExpiry: "",
  roadTaxExpiry: "",
  gpsDeviceId: "",
  gpsProvider: "",
};

type FormState = typeof initialForm;

export function AddVehicleDrawer() {
  const { isAddVehicleDrawerOpen, closeAddVehicleDrawer, addVehicle } = useAppState();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!isNonEmpty(form.registration)) next.registration = "Registration number is required.";
    if (!isNonEmpty(form.manufacturer)) next.manufacturer = "Manufacturer is required.";
    if (!isNonEmpty(form.model)) next.model = "Model is required.";
    if (!isNonEmpty(form.vehicleType)) next.vehicleType = "Vehicle type is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    addVehicle(form);
    setForm(initialForm);
    setErrors({});
  }

  function handleClose() {
    setForm(initialForm);
    setErrors({});
    closeAddVehicleDrawer();
  }

  return (
    <Drawer
      open={isAddVehicleDrawerOpen}
      onClose={handleClose}
      title="Add Vehicle"
      footer={
        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" className="flex-1" onClick={handleSubmit}>Add Vehicle</Button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <FormSection title="Basic Information">
          <Input label="Registration Number" placeholder="KA-06-LM-7788" value={form.registration} error={errors.registration} onChange={(e) => set("registration", e.target.value)} />
          <Input label="Manufacturer" placeholder="Tata" value={form.manufacturer} error={errors.manufacturer} onChange={(e) => set("manufacturer", e.target.value)} />
          <Input label="Model" placeholder="Signa 4825" value={form.model} error={errors.model} onChange={(e) => set("model", e.target.value)} />
          <Select
            label="Vehicle Type"
            value={form.vehicleType}
            error={errors.vehicleType}
            placeholder="Select type"
            onChange={(e) => set("vehicleType", e.target.value)}
            options={[
              { label: "Heavy Truck", value: "Heavy Truck" },
              { label: "Trailer", value: "Trailer" },
              { label: "Tanker", value: "Tanker" },
              { label: "Container Truck", value: "Container Truck" },
            ]}
          />
          <Input label="Capacity" placeholder="48 Ton" value={form.capacity} onChange={(e) => set("capacity", e.target.value)} />
          <Input label="Manufacturing Year" placeholder="2024" value={form.manufacturingYear} onChange={(e) => set("manufacturingYear", e.target.value)} />
        </FormSection>

        <FormSection title="Identification">
          <Input label="Chassis Number" value={form.chassisNumber} onChange={(e) => set("chassisNumber", e.target.value)} />
          <Input label="Engine Number" value={form.engineNumber} onChange={(e) => set("engineNumber", e.target.value)} />
        </FormSection>

        <FormSection title="Operations">
          <Select
            label="Fuel Type"
            value={form.fuelType}
            onChange={(e) => set("fuelType", e.target.value)}
            options={[
              { label: "Diesel", value: "Diesel" },
              { label: "CNG", value: "CNG" },
              { label: "Electric", value: "Electric" },
            ]}
          />
          <Input label="Odometer (km)" type="number" value={form.odometer} onChange={(e) => set("odometer", e.target.value)} />
          <Input label="Purchase Date" type="date" value={form.purchaseDate} onChange={(e) => set("purchaseDate", e.target.value)} />
        </FormSection>

        <FormSection title="Compliance">
          <Input label="Insurance Expiry" type="date" value={form.insuranceExpiry} onChange={(e) => set("insuranceExpiry", e.target.value)} />
          <Input label="Fitness Expiry" type="date" value={form.fitnessExpiry} onChange={(e) => set("fitnessExpiry", e.target.value)} />
          <Input label="Permit Expiry" type="date" value={form.permitExpiry} onChange={(e) => set("permitExpiry", e.target.value)} />
          <Input label="PUC Expiry" type="date" value={form.pucExpiry} onChange={(e) => set("pucExpiry", e.target.value)} />
          <Input label="Road Tax Expiry" type="date" value={form.roadTaxExpiry} onChange={(e) => set("roadTaxExpiry", e.target.value)} />
        </FormSection>

        <FormSection title="GPS">
          <Input label="GPS Device ID" value={form.gpsDeviceId} onChange={(e) => set("gpsDeviceId", e.target.value)} />
          <Input label="GPS Provider" value={form.gpsProvider} onChange={(e) => set("gpsProvider", e.target.value)} />
        </FormSection>
      </div>
    </Drawer>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-navy-500/70">{title}</div>
      <div className="flex flex-col gap-3.5">{children}</div>
    </div>
  );
}
