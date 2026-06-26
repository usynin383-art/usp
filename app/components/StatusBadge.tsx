import React from "react";
import { MonitorStatus } from "../types/monitor";
import type { FC } from "react";

interface StatusBadgeProps {
    status: MonitorStatus;
};

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    up: {
      bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-500/20 dark:border-emerald-500/30",
      dot: "bg-emerald-500",
      label: "Operational",
      ping: false,
    },
    warning: {
      bg: "bg-amber-500/10 dark:bg-amber-500/20",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-500/20 dark:border-amber-500/30",
      dot: "bg-amber-500",
      label: "Degraded",
      ping: false,
    },
    down: {
      bg: "bg-rose-500/10 dark:bg-rose-500/20",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-500/20 dark:border-rose-500/30",
      dot: "bg-rose-500",
      label: "Down",
      ping: true,
    },
  };
  const current = config[status];

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-xs transition-colors ${current.bg} ${current.text} ${current.border}`}>
      <span className="relative flex h-2 w-2">
        {current.ping && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${current.dot}`}></span>
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${current.dot}`}></span>
      </span>
      {current.label}
    </div>
  )
};