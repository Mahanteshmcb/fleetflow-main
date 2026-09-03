import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  side = "right",
  widthClassName = "w-full sm:w-[460px]",
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  side?: "left" | "right";
  widthClassName?: string;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const isRight = side === "right";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy-950/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: isRight ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRight ? "100%" : "-100%" }}
            transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
            className={cn(
              "absolute top-0 bottom-0 flex flex-col bg-white shadow-pop",
              isRight ? "right-0" : "left-0",
              widthClassName
            )}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between border-b border-navy-900/8 px-6 py-5">
              <div>
                <h2 className="text-base font-semibold text-navy-900">{title}</h2>
                {subtitle && <div className="mt-1 text-sm text-navy-500">{subtitle}</div>}
              </div>
              <button aria-label="Close drawer" onClick={onClose} className="rounded-md p-1.5 text-navy-500 hover:bg-navy-900/5">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
            {footer && <div className="border-t border-navy-900/8 px-6 py-4">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
