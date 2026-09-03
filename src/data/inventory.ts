export type InventoryPart = {
  id: string;
  name: string;
  quantity: number;
  minimumStock: number;
  purchasePrice: number;
  supplier: string;
  compatibleModel: string;
  status: "Healthy" | "Low Stock" | "Critical";
};

export const mockInventory: InventoryPart[] = [
  { id: "p1", name: "Engine Oil (15W-40)", quantity: 120, minimumStock: 40, purchasePrice: 620, supplier: "Castrol Distributors", compatibleModel: "All Heavy Trucks", status: "Healthy" },
  { id: "p2", name: "Brake Pads (Front Set)", quantity: 12, minimumStock: 15, purchasePrice: 3400, supplier: "Bosch Auto Parts", compatibleModel: "Tata Prima / Signa", status: "Low Stock" },
  { id: "p3", name: "Tyres (12R22.5)", quantity: 28, minimumStock: 10, purchasePrice: 18500, supplier: "MRF Distribution", compatibleModel: "All Heavy Trucks", status: "Healthy" },
  { id: "p4", name: "Batteries (12V 150Ah)", quantity: 8, minimumStock: 6, purchasePrice: 9800, supplier: "Exide Industries", compatibleModel: "All Heavy Trucks", status: "Healthy" },
  { id: "p5", name: "Air Filters", quantity: 4, minimumStock: 10, purchasePrice: 950, supplier: "Bosch Auto Parts", compatibleModel: "Ashok Leyland 4825", status: "Critical" },
  { id: "p6", name: "Coolant (20L Drum)", quantity: 22, minimumStock: 8, purchasePrice: 2600, supplier: "Castrol Distributors", compatibleModel: "All Heavy Trucks", status: "Healthy" },
];
