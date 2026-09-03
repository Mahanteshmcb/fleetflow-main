export type DocumentRecord = {
  id: string;
  name: string;
  vehicleRegistration: string;
  expiryDate: string;
  status: "Valid" | "Expiring Soon" | "Expired";
  daysRemaining: number;
};

export const mockDocuments: DocumentRecord[] = [
  { id: "d1", name: "RC", vehicleRegistration: "KA-01-AB-1234", expiryDate: "—", status: "Valid", daysRemaining: 9999 },
  { id: "d2", name: "Insurance", vehicleRegistration: "KA-03-EF-9876", expiryDate: "2026-09-12", status: "Expiring Soon", daysRemaining: 9 },
  { id: "d3", name: "Fitness Certificate", vehicleRegistration: "KA-01-AB-1234", expiryDate: "2026-09-25", status: "Expiring Soon", daysRemaining: 22 },
  { id: "d4", name: "Permit", vehicleRegistration: "KA-02-CD-5678", expiryDate: "2027-04-15", status: "Valid", daysRemaining: 224 },
  { id: "d5", name: "PUC", vehicleRegistration: "KA-04-GH-1122", expiryDate: "2026-10-22", status: "Valid", daysRemaining: 49 },
  { id: "d6", name: "Road Tax", vehicleRegistration: "KA-05-JK-3344", expiryDate: "2027-06-30", status: "Valid", daysRemaining: 300 },
  { id: "d7", name: "Loan Documents", vehicleRegistration: "KA-05-JK-3344", expiryDate: "—", status: "Valid", daysRemaining: 9999 },
];
