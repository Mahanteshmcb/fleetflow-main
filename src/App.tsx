import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { ToastContainer } from "./components/common/Toast";
import { TyreDrawer } from "./components/tyres/TyreDrawer";
import { MyVehiclesDrawer } from "./components/vehicles/MyVehiclesDrawer";
import { AddVehicleDrawer } from "./components/vehicles/AddVehicleDrawer";
import { useAppState } from "./context/AppStateContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import Maintenance from "./pages/Maintenance";
import MaintenanceHistory from "./pages/MaintenanceHistory";
import Tyres from "./pages/Tyres";
import Inventory from "./pages/Inventory";
import Workshops from "./pages/Workshops";
import Mechanics from "./pages/Mechanics";
import Inspections from "./pages/Inspections";
import Documents from "./pages/Documents";
import Analytics from "./pages/Analytics";
import MaintenanceCosts from "./pages/MaintenanceCosts";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

export default function App() {
  const { toasts, dismissToast } = useAppState();

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:vehicleId" element={<VehicleDetails />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/maintenance/history" element={<MaintenanceHistory />} />
          <Route path="/tyres" element={<Tyres />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/inspections" element={<Inspections />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/maintenance-costs" element={<MaintenanceCosts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* Global overlays, mounted once so state persists across route changes */}
      <TyreDrawer />
      <MyVehiclesDrawer />
      <AddVehicleDrawer />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
