export type Mechanic = {
  id: string;
  name: string;
  specialty: string;
  openJobs: number;
  completedJobs: number;
  status: "Open" | "In Progress" | "Waiting for Parts" | "Completed";
};

export const mockMechanics: Mechanic[] = [
  { id: "mc1", name: "Rajesh Kumar", specialty: "Brake Specialist", openJobs: 3, completedJobs: 128, status: "In Progress" },
  { id: "mc2", name: "Priya Sharma", specialty: "Electrical Specialist", openJobs: 2, completedJobs: 94, status: "Open" },
  { id: "mc3", name: "Arjun Nair", specialty: "Tyre & Suspension", openJobs: 1, completedJobs: 76, status: "Waiting for Parts" },
  { id: "mc4", name: "Deepak Verma", specialty: "Engine Specialist", openJobs: 4, completedJobs: 152, status: "In Progress" },
];
