import { MonitorCardRow } from "./MonitorCardRow";
import { MonitorSite } from "../types/monitor";
import { StatusBadge } from "./StatusBadge";
import { FC } from "react";
import { useMonitorStore } from "../store/useMonitorStore";
import Link from "next/link";

interface MonitorCardProps {
    site: MonitorSite;
}

export const MonitorCard: FC<MonitorCardProps> = ({ site }) => {
    const history = useMonitorStore((state) => state.sites.find(s => s.id === site.id)?.history || []);
    const currentStatus = history[history.length - 1]?.status || "up";

    return (
    <div className="flex flex-col gap-5 p-6 rounded-xl border bg-white border-slate-100 shadow-sm transition-all dark:bg-slate-900 dark:border-slate-800 my-2">
        <div className="flex items-start justify-between gap-4">
            <div>
                <Link href={`/dashboard/${site.id}`}>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white hover:text-indigo-500 transition-colors cursor-pointer">
                        {site.name}
                    </h3>
                </Link>
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
