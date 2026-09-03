import React from "react";
import { MapPin, Star, Phone } from "lucide-react";
import { Card } from "../components/common/Card";
import { Badge } from "../components/common/Badge";
import { mockWorkshops } from "../data/workshops";

export default function Workshops() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Workshops</h1>
        <p className="mt-1 text-[14px] text-navy-500">Partner service centres for your fleet.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mockWorkshops.map((w) => (
          <Card key={w.id} className="p-5">
            <div className="mb-2 flex items-start justify-between">
              <h3 className="font-semibold text-navy-900">{w.name}</h3>
              <span className="flex items-center gap-1 text-[13px] font-semibold text-warning">
                <Star size={13} fill="currentColor" /> {w.rating}
              </span>
            </div>
            <p className="flex items-center gap-1.5 text-[13px] text-navy-500">
              <MapPin size={13} /> {w.location}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {w.services.map((s) => (
                <Badge key={s} tone="brand">{s}</Badge>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-navy-900/6 pt-3 text-[12px] text-navy-500">
              <span>{w.mechanics} mechanics</span>
              <span className="flex items-center gap-1"><Phone size={12} /> {w.contact}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
