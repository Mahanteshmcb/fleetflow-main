import React from "react";
import { cn } from "../../utils/cn";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, Props>(({ label, error, options, placeholder, className, id, ...rest }, ref) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-[13px] font-medium text-navy-700">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          "h-10 rounded-lg border bg-white px-3 text-sm text-navy-900 transition-colors",
          error ? "border-critical" : "border-navy-900/12 hover:border-navy-900/20 focus:border-brand-500",
          className
        )}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-critical">{error}</span>}
    </div>
  );
});
Select.displayName = "Select";
