import React from "react";
import { ArrowDownUp } from "lucide-react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Tyre } from "../../types/tyre";

export function TyreSwapDialog({
  open,
  tyreA,
  tyreB,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  tyreA?: Tyre;
  tyreB?: Tyre;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal open={open} onClose={onCancel} title="Swap Tyres?">
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="w-full rounded-lg border border-navy-900/8 bg-surface px-4 py-3 text-center">
          <div className="text-[15px] font-semibold text-navy-900">{tyreA?.id}</div>
          <div className="text-xs text-navy-500">{tyreA?.positionName}</div>
        </div>
        <ArrowDownUp size={18} className="text-navy-400" />
        <div className="w-full rounded-lg border border-navy-900/8 bg-surface px-4 py-3 text-center">
          <div className="text-[15px] font-semibold text-navy-900">{tyreB?.id}</div>
          <div className="text-xs text-navy-500">{tyreB?.positionName}</div>
        </div>
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm Swap
        </Button>
      </div>
    </Modal>
  );
}
