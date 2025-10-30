interface BatteryIconProps {
  className?: string;
}

export default function BatteryIcon({ className = 'w-6 h-6' }: BatteryIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Battery body */}
      <rect x="2" y="6" width="18" height="12" rx="2" ry="2" />

      {/* Battery terminal */}
      <line x1="22" y1="10" x2="22" y2="14" />

      {/* Charge level bars */}
      <line x1="6" y1="9" x2="6" y2="15" />
      <line x1="10" y1="9" x2="10" y2="15" />
      <line x1="14" y1="9" x2="14" y2="15" />
    </svg>
  );
}
