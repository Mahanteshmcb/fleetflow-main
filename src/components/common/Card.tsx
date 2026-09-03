import React from "react";
import { cn } from "../../utils/cn";

export function Card({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-xl2 border border-navy-900/8 bg-white shadow-card", className)} {...rest}>
      {children}
    </div>
  );
}
