import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { Card } from "../components/common/Card";
import { MaintenanceCostChart } from "../components/charts/MaintenanceCostChart";

const healthData = [
  { name: "Healthy", value: 28, color: "#1AA36A" },
  { name: "Warning", value: 9, color: "#E8871E" },
  { name: "Critical", value: 5, color: "#E5484D" },
];

const tyreData = [
  { name: "Healthy", value: 218, color: "#1AA36A" },
  { name: "Warning", value: 27, color: "#E8871E" },
  { name: "Critical", value: 11, color: "#E5484D" },
];

const frequencyData = [
  { month: "Jan", count: 12 },
  { month: "Feb", count: 15 },
  { month: "Mar", count: 9 },
  { month: "Apr", count: 18 },
  { month: "May", count: 14 },
  { month: "Jun", count: 21 },
];

const utilizationData = [
  { month: "Jan", utilization: 78 },
  { month: "Feb", utilization: 82 },
  { month: "Mar", utilization: 74 },
  { month: "Apr", utilization: 88 },
  { month: "May", utilization: 85 },
  { month: "Jun", utilization: 91 },
];

function DonutCard({ title, data }: { title: string; data: typeof healthData }) {
  return (
    <Card className="p-5">
      <h3 className="mb-4 font-semibold text-navy-900">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2E6ED", fontSize: 13 }} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default function Analytics() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Analytics</h1>
        <p className="mt-1 text-[14px] text-navy-500">Fleet-wide performance at a glance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DonutCard title="Vehicle Health Distribution" data={healthData} />
        <DonutCard title="Tyre Condition Distribution" data={tyreData} />
      </div>

      <Card className="p-5">
        <h3 className="mb-4 font-semibold text-navy-900">Maintenance Cost Trend</h3>
        <MaintenanceCostChart />
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 font-semibold text-navy-900">Maintenance Frequency</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={frequencyData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E6ED" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#4B5A7F", fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "#4B5A7F", fontSize: 12 }} width={30} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2E6ED", fontSize: 13 }} />
              <Bar dataKey="count" fill="#3562E0" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 font-semibold text-navy-900">Fleet Utilization</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={utilizationData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E6ED" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#4B5A7F", fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "#4B5A7F", fontSize: 12 }} width={36} unit="%" />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2E6ED", fontSize: 13 }} />
              <Line type="monotone" dataKey="utilization" stroke="#3562E0" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="border-brand-200 bg-brand-50/40 p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">Prediction</span>
          <h3 className="font-semibold text-navy-900">Predictive Insight</h3>
        </div>
        <p className="mt-2 text-[14px] font-medium text-warning">⚠ Brake maintenance likely — KA-01-AB-1234</p>
        <p className="mt-2 text-[13px] text-navy-500">Based on:</p>
        <ul className="mt-1 list-disc pl-5 text-[13px] text-navy-600">
          <li>Previous brake repairs</li>
          <li>Current mileage</li>
          <li>Vehicle age</li>
          <li>Breakdown frequency</li>
        </ul>
        <p className="mt-3 text-[13px] font-medium text-navy-900">Estimated maintenance: within next 2,000 km</p>
      </Card>
    </div>
  );
}
