import React from "react";

// Pure decorative schematic of a heavy truck in plan (top-down) view.
// Coordinate space matches TYRE_SLOTS: 0-320 wide, 0-900 tall.
export function TruckChassis() {
  return (
    <svg viewBox="0 0 320 900" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <defs>
        <linearGradient id="cabGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22304D" />
          <stop offset="100%" stopColor="#16223B" />
        </linearGradient>
        <linearGradient id="bodyGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#EEF1F6" />
        </linearGradient>
      </defs>

      {/* Direction indicator */}
      <text x="160" y="24" textAnchor="middle" className="fill-navy-500" fontSize="12" fontWeight="600" letterSpacing="2">
        FRONT
      </text>
      <path d="M160 32 L152 46 L168 46 Z" className="fill-navy-500/50" />

      {/* Cab */}
      <rect x="70" y="56" width="180" height="140" rx="18" fill="url(#cabGradient)" />
      <rect x="92" y="76" width="136" height="52" rx="8" fill="#5C87F5" fillOpacity="0.35" stroke="#8DAEFF" strokeWidth="1.5" />
      <text x="160" y="107" textAnchor="middle" fontSize="11" fill="#DCE7FF" fontWeight="600" letterSpacing="1">
        WINDSHIELD
      </text>
      <rect x="92" y="140" width="136" height="40" rx="6" fill="#101A2E" fillOpacity="0.5" />
      <text x="160" y="165" textAnchor="middle" fontSize="10" fill="#8DAEFF" fontWeight="500">
        CAB
      </text>

      {/* Chassis rails connecting cab to body */}
      <rect x="140" y="196" width="10" height="620" fill="#C7CEDB" fillOpacity="0.5" />
      <rect x="170" y="196" width="10" height="620" fill="#C7CEDB" fillOpacity="0.5" />

      {/* Cargo body */}
      <rect x="40" y="740" width="240" height="130" rx="10" fill="url(#bodyGradient)" stroke="#D8DEE8" strokeWidth="1.5" />
      <text x="160" y="810" textAnchor="middle" fontSize="12" fill="#4B5A7F" fontWeight="600" letterSpacing="1">
        CARGO BODY
      </text>

      {/* Axle bars (visual guides — actual axle labels are rendered by React for accessibility) */}
      {[232, 400, 540, 680].map((y, i) => (
        <rect key={i} x="18" y={y - 4} width="284" height="8" rx="4" fill="#C7CEDB" fillOpacity="0.6" />
      ))}

      <text x="160" y="895" textAnchor="middle" className="fill-navy-500" fontSize="12" fontWeight="600" letterSpacing="2">
        REAR
      </text>
    </svg>
  );
}
