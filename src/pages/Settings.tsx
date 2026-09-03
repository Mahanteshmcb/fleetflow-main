import React, { useState } from "react";
import { User, Building2, Truck, Bell, Palette, Check } from "lucide-react";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { useAppState, Role } from "../context/AppStateContext";
import { cn } from "../utils/cn";

const roles: Role[] = ["Fleet Owner / Admin", "Fleet Manager", "Driver", "Mechanic"];

const roleDescriptions: Record<Role, string> = {
  "Fleet Owner / Admin": "Full access to every module, vehicle and report.",
  "Fleet Manager": "Manage trucks, schedule maintenance and view costs.",
  Driver: "View assigned vehicle, run inspections and report issues.",
  Mechanic: "View assigned maintenance jobs and update repair status.",
};

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building2 },
  { id: "fleet", label: "Fleet Preferences", icon: Truck },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
] as const;

export default function Settings() {
  const { role, setRole, showToast } = useAppState();
  const [active, setActive] = useState<(typeof sections)[number]["id"]>("profile");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Settings</h1>
        <p className="mt-1 text-[14px] text-navy-500">Manage your account, fleet and preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <Card className="h-fit p-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13.5px] font-medium transition-colors",
                active === s.id ? "bg-brand-50 text-brand-700" : "text-navy-600 hover:bg-surface"
              )}
            >
              <s.icon size={16} />
              {s.label}
            </button>
          ))}
        </Card>

        <div className="flex flex-col gap-6">
          {active === "profile" && (
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-navy-900">Profile</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Full Name" defaultValue="Alex Morgan" />
                <Input label="Email" defaultValue="alex.morgan@FleetLane.com" />
                <Input label="Phone" defaultValue="+91 98765 43210" />
                <Input label="Title" defaultValue="Fleet Administrator" />
              </div>
              <Button className="mt-5" onClick={() => showToast("Profile updated", "success")}>Save Changes</Button>
            </Card>
          )}

          {active === "company" && (
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-navy-900">Company</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Company Name" defaultValue="FleetLane Logistics Pvt. Ltd." />
                <Input label="GSTIN" defaultValue="29ABCDE1234F1Z5" />
                <Input label="Headquarters" defaultValue="Bengaluru, Karnataka" />
                <Input label="Fleet Size" defaultValue="42 vehicles" />
              </div>
              <Button className="mt-5" onClick={() => showToast("Company details updated", "success")}>Save Changes</Button>
            </Card>
          )}

          {active === "fleet" && (
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-navy-900">Fleet Preferences</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Distance Unit" defaultValue="Kilometres" />
                <Input label="Currency" defaultValue="INR (₹)" />
                <Input label="Default Maintenance Buffer" defaultValue="500 km" />
                <Input label="Default Tyre Pressure Unit" defaultValue="PSI" />
              </div>
              <Button className="mt-5" onClick={() => showToast("Fleet preferences updated", "success")}>Save Changes</Button>
            </Card>
          )}

          {active === "notifications" && (
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-navy-900">Notifications</h3>
              <div className="flex flex-col gap-3">
                {["Maintenance alerts", "Document expiry alerts", "Low stock alerts", "Weekly summary email"].map((n) => (
                  <label key={n} className="flex items-center justify-between rounded-lg border border-navy-900/8 px-4 py-3">
                    <span className="text-[13.5px] text-navy-700">{n}</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-brand-500" />
                  </label>
                ))}
              </div>
              <Button className="mt-5" onClick={() => showToast("Notification preferences updated", "success")}>Save Changes</Button>
            </Card>
          )}

          {active === "appearance" && (
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-navy-900">Appearance</h3>
              <p className="text-[13.5px] text-navy-500"> currently uses a light, enterprise theme. Dark mode is coming soon.</p>
            </Card>
          )}

          <Card className="p-6">
            <h3 className="mb-1 font-semibold text-navy-900">Role</h3>
            <p className="mb-4 text-[13px] text-navy-500">Switch roles to preview how the UI adapts. This is frontend-only and does not change data access.</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    showToast(`Role switched to ${r}`, "info");
                  }}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                    role === r ? "border-brand-500 bg-brand-50/60" : "border-navy-900/8 hover:bg-surface"
                  )}
                >
                  <div className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border", role === r ? "border-brand-500 bg-brand-500 text-white" : "border-navy-900/20")}>
                    {role === r && <Check size={12} />}
                  </div>
                  <div>
                    <p className="text-[13.5px] font-medium text-navy-900">{r}</p>
                    <p className="mt-0.5 text-[12px] text-navy-500">{roleDescriptions[r]}</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
