import React, { useMemo, useState } from "react";
import { Camera, Video, Mic, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";
import { useAppState } from "../context/AppStateContext";

type ItemStatus = "Pass" | "Warning" | "Failed";

const checklistItems = [
  "Tyre condition",
  "Brake condition",
  "Engine oil",
  "Coolant",
  "Lights",
  "Battery",
  "Horn",
  "Fuel leakage",
  "Air pressure",
];

const initialStatuses: Record<string, ItemStatus> = {
  "Tyre condition": "Pass",
  "Brake condition": "Pass",
  "Engine oil": "Pass",
  Coolant: "Pass",
  Lights: "Pass",
  Battery: "Warning",
  Horn: "Pass",
  "Fuel leakage": "Pass",
  "Air pressure": "Failed",
};

export default function Inspections() {
  const { selectedVehicle, reportIssue, showToast } = useAppState();
  const [statuses, setStatuses] = useState<Record<string, ItemStatus>>(initialStatuses);
  const [issueOpen, setIssueOpen] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");

  const summary = useMemo(() => {
    const values = Object.values(statuses);
    return {
      passed: values.filter((v) => v === "Pass").length,
      warnings: values.filter((v) => v === "Warning").length,
      failed: values.filter((v) => v === "Failed").length,
    };
  }, [statuses]);

  const submitIssue = () => {
    if (!selectedVehicle) return;
    reportIssue(selectedVehicle.id, issueDescription || "Tyre damage detected");
    setIssueOpen(false);
    setIssueDescription("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-navy-900">Inspections</h1>
          <p className="mt-1 text-[14px] text-navy-500">Pre-trip inspection for {selectedVehicle?.registration ?? "your vehicle"}.</p>
        </div>
        <Button variant="danger" icon={<AlertTriangle size={15} />} onClick={() => setIssueOpen(true)}>
          Report Issue
        </Button>
      </div>

      {selectedVehicle?.health === "Needs Inspection" && (
        <div className="flex items-center gap-2 rounded-xl border border-critical/30 bg-critical-bg px-4 py-3 text-[13.5px] font-medium text-critical">
          <AlertTriangle size={16} /> Vehicle requires inspection
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-3 p-4">
          <CheckCircle2 size={18} className="text-healthy" />
          <div>
            <p className="text-[18px] font-semibold text-navy-900">{summary.passed}</p>
            <p className="text-[12.5px] text-navy-500">Passed</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <AlertTriangle size={18} className="text-warning" />
          <div>
            <p className="text-[18px] font-semibold text-navy-900">{summary.warnings}</p>
            <p className="text-[12.5px] text-navy-500">Warnings</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <XCircle size={18} className="text-critical" />
          <div>
            <p className="text-[18px] font-semibold text-navy-900">{summary.failed}</p>
            <p className="text-[12.5px] text-navy-500">Failed</p>
          </div>
        </Card>
      </div>

      <Card className="divide-y divide-navy-900/6">
        <div className="p-4">
          <h3 className="font-semibold text-navy-900">Pre-Trip Inspection Checklist</h3>
        </div>
        {checklistItems.map((item) => (
          <div key={item} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[13.5px] font-medium text-navy-800">{item}</span>
            <div className="flex items-center gap-4">
              {(["Pass", "Warning", "Failed"] as ItemStatus[]).map((opt) => (
                <label key={opt} className="flex cursor-pointer items-center gap-1.5 text-[12.5px] text-navy-600">
                  <input
                    type="radio"
                    name={item}
                    checked={statuses[item] === opt}
                    onChange={() => setStatuses((prev) => ({ ...prev, [item]: opt }))}
                    className={
                      opt === "Pass" ? "accent-healthy h-3.5 w-3.5" : opt === "Warning" ? "accent-warning h-3.5 w-3.5" : "accent-critical h-3.5 w-3.5"
                    }
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </Card>

      <Card className="p-5">
        <h3 className="mb-3 font-semibold text-navy-900">Attach Evidence</h3>
        <p className="mb-4 text-[13px] text-navy-500">Attach supporting media for this inspection. This is a UI-only mock — no files are uploaded.</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" icon={<Camera size={15} />} onClick={() => showToast("Photo capture is a UI-only mock", "info")}>
            Photo
          </Button>
          <Button variant="secondary" icon={<Video size={15} />} onClick={() => showToast("Video capture is a UI-only mock", "info")}>
            Video
          </Button>
          <Button variant="secondary" icon={<Mic size={15} />} onClick={() => showToast("Voice note is a UI-only mock", "info")}>
            Voice Note
          </Button>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" onClick={() => showToast("Inspection submitted", "success")}>
          Submit Inspection
        </Button>
      </div>

      <Modal open={issueOpen} onClose={() => setIssueOpen(false)} title="Report Issue">
        <div className="flex flex-col gap-4">
          <p className="text-[13.5px] text-navy-600">Describe the issue you'd like to report for {selectedVehicle?.registration}.</p>
          <textarea
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            placeholder="Tyre damage detected"
            rows={4}
            className="rounded-lg border border-navy-900/12 p-3 text-sm text-navy-900 outline-none focus:border-brand-500"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIssueOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={submitIssue}>Submit Report</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
