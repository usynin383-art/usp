"use client";

import type { FC } from "react";
import { CheckResult } from "../types/monitor";

interface history {
    history: CheckResult[];
}

export const MonitorCardRow: FC<history> = ({ history }) => {
  

  return (
    <div className="rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-panel)] p-6 shadow-sm">
      <div className="flex h-8 items-end gap-[3px]">
        {history.map((item) => (
          <div
            key={item.id}
            className={`h-full flex-1 rounded-xs transition-all duration-150 cursor-pointer origin-bottom hover:scale-y-125
              ${item.status === "up" ? "bg-emerald-500 hover:bg-emerald-400" : "bg-rose-500 hover:bg-rose-400"}
            `}
          />
        ))}
      </div>
    </div>
  );
};
