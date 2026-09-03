import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { ToastItem } from "../../hooks/useToast";
import { cn } from "../../utils/cn";

const icons = {
  success: <CheckCircle2 size={18} className="text-healthy" />,
  warning: <AlertTriangle size={18} className="text-warning" />,
  error: <XCircle size={18} className="text-critical" />,
  info: <Info size={18} className="text-brand-500" />,
};

export function ToastContainer({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: string) => void }) {
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:left-auto sm:right-5 sm:translate-x-0">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            className={cn("pointer-events-auto flex items-center gap-3 rounded-xl border border-navy-900/8 bg-white px-4 py-3 shadow-pop")}
          >
            {icons[t.variant]}
            <span className="flex-1 text-[13px] font-medium text-navy-800">{t.message}</span>
            {t.actionLabel && t.onAction && (
              <button
                onClick={() => {
                  t.onAction?.();
                  onDismiss(t.id);
                }}
                className="text-[13px] font-semibold text-brand-500 hover:text-brand-600"
              >
                {t.actionLabel}
              </button>
            )}
            <button aria-label="Dismiss" onClick={() => onDismiss(t.id)} className="text-navy-400 hover:text-navy-600">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
