import { MonitorCardRow } from "./MonitorCardRow";
import { MonitorSite } from "../types/monitor";
import { StatusBadge } from "./StatusBadge";
import { FC } from "react";
import { useMonitorStore } from "../store/useMonitorStore";

interface MonitorCardProps {
    site: MonitorSite;
}

export const MonitorCard: FC<MonitorCardProps> = ({ site }) => {
    const history = useMonitorStore((state) => state.sites.find(s => s.id === site.id)?.history || []);
    const currentStatus = history[history.length - 1]?.status || "up";

    return (
    <div className="flex flex-col gap-5 p-6 rounded-xl border bg-white border-slate-100 shadow-sm transition-all dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-start justify-between gap-4">
            <div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                    {site.name}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {site.url}
                </p>
            </div>
            <StatusBadge status={currentStatus} />
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
  <MonitorCardRow history={history} />
  <div className="flex items-center justify-between text-[10px] font-medium text-slate-400 font-mono">
    <span>90 дней назад</span>
    <span>Сегодня</span>
  </div>
</div>
    </div>
    )
}
