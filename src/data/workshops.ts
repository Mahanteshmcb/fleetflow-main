export type Workshop = {
  id: string;
  name: string;
  location: string;
  services: string[];
  mechanics: number;
  contact: string;
  rating: number;
};

export const mockWorkshops: Workshop[] = [
  { id: "w1", name: "Metro Fleet Workshop", location: "Peenya, Bengaluru", services: ["Brake", "Tyre", "Engine", "Electrical"], mechanics: 8, contact: "+91 98450 12233", rating: 4.7 },
  { id: "w2", name: "Highway Truck Care", location: "Hosur Road, Bengaluru", services: ["Engine", "Suspension", "AC"], mechanics: 5, contact: "+91 98801 44556", rating: 4.4 },
  { id: "w3", name: "Prime Commercial Garage", location: "Tumkur Road, Bengaluru", services: ["Tyre", "Electrical", "Body Work"], mechanics: 6, contact: "+91 90080 99223", rating: 4.5 },
];
