import React from "react";
import { cn } from "../../utils/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, Props>(({ label, error, className, id, ...rest }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-medium text-navy-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "h-10 rounded-lg border bg-white px-3 text-sm text-navy-900 placeholder:text-navy-500/60 transition-colors",
          error ? "border-critical" : "border-navy-900/12 hover:border-navy-900/20 focus:border-brand-500",
          className
        )}
        {...rest}
      />
      {error && <span className="text-xs text-critical">{error}</span>}
    </div>
  );
});
Input.displayName = "Input";
