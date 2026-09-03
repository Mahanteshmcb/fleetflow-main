import { MaintenanceHistoryRecord, MaintenanceRecord } from "../types/maintenance";

export const mockMaintenance: MaintenanceRecord[] = [
  { id: "m1", task: "Engine Oil", vehicleId: "vehicle-001", vehicleRegistration: "KA-01-AB-1234", dueLabel: "Overdue by 500 km", status: "Overdue", intervalType: "Kilometer-based", schedule: "Every 10,000 km" },
  { id: "m2", task: "Oil Filter", vehicleId: "vehicle-003", vehicleRegistration: "KA-03-EF-9876", dueLabel: "Overdue by 430 km", status: "Critical", intervalType: "Kilometer-based", schedule: "Every 10,000 km" },
  { id: "m3", task: "Tyre Inspection", vehicleId: "vehicle-002", vehicleRegistration: "KA-02-CD-5678", dueLabel: "Due in 3 days", status: "Upcoming", intervalType: "Time-based", schedule: "Every 5,000 km" },
  { id: "m4", task: "Brake Check", vehicleId: "vehicle-002", vehicleRegistration: "KA-02-CD-5678", dueLabel: "Due in 12 days", status: "Upcoming", intervalType: "Usage-based", schedule: "Every 5,000 km" },
  { id: "m5", task: "Engine Service", vehicleId: "vehicle-005", vehicleRegistration: "KA-05-JK-3344", dueLabel: "Due in 6 days", status: "Upcoming", intervalType: "Time-based", schedule: "Every 6 months" },
  { id: "m6", task: "Coolant Flush", vehicleId: "vehicle-004", vehicleRegistration: "KA-04-GH-1122", dueLabel: "Completed 20 Aug", status: "Completed", intervalType: "Time-based", schedule: "Every 6 months" },
  { id: "m7", task: "Suspension Check", vehicleId: "vehicle-001", vehicleRegistration: "KA-01-AB-1234", dueLabel: "Completed 12 Aug", status: "Completed", intervalType: "Usage-based", schedule: "Every 20,000 km" },
];

export const mockMaintenanceHistory: MaintenanceHistoryRecord[] = [
  { id: "h1", type: "Engine Oil Change", date: "2026-08-20", odometer: 125000, partsCost: 6500, labourCost: 2000, totalCost: 8500, serviceCentre: "Metro Fleet Workshop", mechanic: "Rajesh Kumar", invoice: "INV-2026-0812", notes: "Routine service, no issues found.", nextServiceOdometer: 135000 },
  { id: "h2", type: "Brake Pad Replacement", date: "2026-07-02", odometer: 118500, partsCost: 9200, labourCost: 2500, totalCost: 11700, serviceCentre: "Highway Truck Care", mechanic: "Priya Sharma", invoice: "INV-2026-0745", notes: "Front axle pads replaced.", nextServiceOdometer: 138500 },
  { id: "h3", type: "Tyre Rotation", date: "2026-06-10", odometer: 112300, partsCost: 0, labourCost: 1200, totalCost: 1200, serviceCentre: "Metro Fleet Workshop", mechanic: "Arjun Nair", invoice: "INV-2026-0691", notes: "Standard 4-tyre rotation.", nextServiceOdometer: 122300 },
  { id: "h4", type: "Battery Replacement", date: "2026-04-28", odometer: 102000, partsCost: 8200, labourCost: 500, totalCost: 8700, serviceCentre: "Metro Fleet Workshop", mechanic: "Rajesh Kumar", invoice: "INV-2026-0533", notes: "Old battery below 40% health.", nextServiceOdometer: 152000 },
];
