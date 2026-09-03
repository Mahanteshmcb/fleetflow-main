import React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", cost: 280000 },
  { month: "Feb", cost: 320000 },
  { month: "Mar", cost: 240000 },
  { month: "Apr", cost: 410000 },
  { month: "May", cost: 370000 },
  { month: "Jun", cost: 482500 },
];

export function MaintenanceCostChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E6ED" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#4B5A7F", fontSize: 12 }} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#4B5A7F", fontSize: 12 }}
          tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
          width={56}
        />
        <Tooltip
          formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Maintenance Cost"]}
          contentStyle={{ borderRadius: 10, border: "1px solid #E2E6ED", fontSize: 13 }}
        />
        <Bar dataKey="cost" fill="#3562E0" radius={[6, 6, 0, 0]} maxBarSize={44} />
      </BarChart>
    </ResponsiveContainer>
  );
}
