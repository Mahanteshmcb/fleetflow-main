export type AppNotification = {
  id: string;
  category: "Critical" | "Maintenance" | "Documents" | "Inventory" | "Success";
  title: string;
  vehicleRegistration?: string;
  message: string;
  timeAgo: string;
  read: boolean;
};

export const mockNotifications: AppNotification[] = [
  { id: "n1", category: "Critical", title: "Maintenance overdue", vehicleRegistration: "KA-01-AB-1234", message: "Engine oil service is overdue.", timeAgo: "2 hours ago", read: false },
  { id: "n2", category: "Documents", title: "Document expiring", vehicleRegistration: "KA-03-EF-9876", message: "Insurance expires in 7 days.", timeAgo: "5 hours ago", read: false },
  { id: "n3", category: "Success", title: "Maintenance completed", vehicleRegistration: "KA-02-CD-5678", message: "Brake inspection completed.", timeAgo: "1 day ago", read: true },
  { id: "n4", category: "Inventory", title: "Low stock alert", message: "Air filters are running critically low.", timeAgo: "1 day ago", read: false },
  { id: "n5", category: "Maintenance", title: "Upcoming service", vehicleRegistration: "KA-05-JK-3344", message: "Engine service due in 6 days.", timeAgo: "2 days ago", read: true },
];
