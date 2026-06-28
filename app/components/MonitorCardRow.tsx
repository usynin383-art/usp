"use client";

import type { FC } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CheckResult } from "../types/monitor";
import { ResultStick } from "./ResultStick";

interface MonitorCardRowProps {
  history: CheckResult[];
}

export const MonitorCardRow: FC<MonitorCardRowProps> = ({ history }) => {
  const totalBars = 90;
  const emptyBarsCount = Math.max(0, totalBars - history.length);
  const emptyBars = Array.from({ length: emptyBarsCount }, (_, i) => ({
    id: `empty-${i}`,
    isEmpty: true,
  }));

  const fullDisplayList = [...history, ...emptyBars];


  return (
    <div className="flex h-8 items-end gap-[3px] w-full">
      {fullDisplayList.map((item) => {
        if ("isEmpty" in item) {
          return (
            <div
              key={item.id}
              className="h-full flex-1 min-w-[2px] bg-slate-100 dark:bg-slate-800 rounded-xs opacity-40"
            />
          );
        }

        const isUp = item.status === "up";
        const timeString = new Date(item.timestamp).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        return (
          <div key={item.id} className="h-full flex-1 min-w-[2px]">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="h-full w-full">
                  <ResultStick item={item} />
                </div>
              </Tooltip.Trigger>

              <Tooltip.Portal>
                <Tooltip.Content
                  side="top"
                  sideOffset={6}
                  className="z-50 select-none rounded-lg bg-slate-950 px-3 py-2 font-mono text-[11px] leading-relaxed text-slate-200 border border-slate-800 shadow-2xl animate-in fade-in-0 zoom-in-95 data-[side=top]:slide-in-from-bottom-2 duration-150"
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="font-bold text-slate-400">{timeString}</p>
                    <p>
                      Статус:{" "}
                      <span className={isUp ? "text-emerald-400" : "text-rose-400"}>
                        {item.statusCode}
                      </span>
                    </p>
                    <p>
                      Задержка:{" "}
                      <span className="text-indigo-400">{item.latency} ms</span>
                    </p>
                  </div>
                  <Tooltip.Arrow className="fill-slate-950" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>
        );
      })}
    </div>
  );
};
