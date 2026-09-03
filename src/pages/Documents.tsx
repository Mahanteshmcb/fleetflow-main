import React from "react";
import { FileText, Eye, Download, RefreshCw } from "lucide-react";
import { Card } from "../components/common/Card";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { mockDocuments } from "../data/documents";
import { useAppState } from "../context/AppStateContext";

const statusTone: Record<string, "healthy" | "warning" | "critical"> = {
  Valid: "healthy",
  "Expiring Soon": "warning",
  Expired: "critical",
};

export default function Documents() {
  const { showToast } = useAppState();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Documents</h1>
        <p className="mt-1 text-[14px] text-navy-500">Vehicle compliance and registration documents.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mockDocuments.map((d) => (
          <Card key={d.id} className="p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900/5 text-navy-700">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900">{d.name}</h3>
                  <p className="text-[12px] text-navy-500">{d.vehicleRegistration}</p>
                </div>
              </div>
              <Badge tone={statusTone[d.status]} dot>
                {d.status === "Valid" ? "Valid" : d.status === "Expiring Soon" ? `Expires in ${d.daysRemaining}d` : "Expired"}
              </Badge>
            </div>

            <p className="text-[13px] text-navy-500">Expires: {d.expiryDate}</p>

            <div className="mt-4 flex items-center gap-2 border-t border-navy-900/6 pt-3">
              <Button size="sm" variant="ghost" icon={<Eye size={14} />} onClick={() => showToast(`Viewing ${d.name}`, "info")}>View</Button>
              <Button size="sm" variant="ghost" icon={<Download size={14} />} onClick={() => showToast(`Downloading ${d.name}`, "info")}>Download</Button>
              <Button size="sm" variant="ghost" icon={<RefreshCw size={14} />} onClick={() => showToast(`Replace ${d.name} — select a new file`, "info")}>Replace</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
