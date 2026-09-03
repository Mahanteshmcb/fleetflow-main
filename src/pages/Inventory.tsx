import React from "react";
import { Package } from "lucide-react";
import { Card } from "../components/common/Card";
import { Badge } from "../components/common/Badge";
import { mockInventory } from "../data/inventory";

const statusTone = { Healthy: "healthy", "Low Stock": "warning", Critical: "critical" } as const;

export default function Inventory() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Parts & Inventory</h1>
        <p className="mt-1 text-[14px] text-navy-500">Track stock levels across your workshops.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mockInventory.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Package size={18} />
              </div>
              <Badge tone={statusTone[p.status]}>{p.status}</Badge>
            </div>
            <h3 className="font-semibold text-navy-900">{p.name}</h3>
            <p className="mt-1 text-[13px] text-navy-500">{p.quantity} units · min {p.minimumStock}</p>
            <div className="mt-3 flex flex-col gap-1.5 border-t border-navy-900/6 pt-3 text-[12px] text-navy-500">
              <div className="flex justify-between"><span>Purchase Price</span><span className="font-medium text-navy-800">₹{p.purchasePrice.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span>Supplier</span><span className="font-medium text-navy-800">{p.supplier}</span></div>
              <div className="flex justify-between"><span>Compatible</span><span className="font-medium text-navy-800">{p.compatibleModel}</span></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
