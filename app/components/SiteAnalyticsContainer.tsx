"use client";

import { FC } from "react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMonitorStore } from "@/app/store/useMonitorStore";
import { Button } from "./Button";

interface ContainerProps {
  siteId: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { name: string } }>;
}

const CustomChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];

  return (
    <div className="z-50 select-none rounded-lg bg-slate-950 px-3 py-2 font-mono text-[11px] leading-relaxed text-slate-200 border border-slate-800 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-100">
      <div className="flex flex-col gap-0.5">
        <p className="font-bold text-slate-400">{data.payload.name}</p>
        <p>
          Задержка:{" "}
          <span className="text-indigo-400 font-bold">{data.value} ms</span>
        </p>
      </div>
    </div>
  );
};

export const SiteAnalyticsContainer: FC<ContainerProps> = ({ siteId }) => {
  const site = useMonitorStore((state) => 
    state.sites.find((s) => s.id === siteId)
  );

  if (!site) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 text-center">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Монитор не найден</h2>
        <p className="text-sm text-slate-400 mt-1 mb-6">Запрашиваемый ресурс не существует или был удален.</p>
        <Link href="/">
          <Button variant="primary">Вернуться на главную</Button>
        </Link>
      </div>
    );
  }

  const chartData = site.history.map((check) => ({
    name: new Date(check.timestamp).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    ping: check.latency,
  }));

  return (
    <div className="space-y-6">
      <Link href="/" className="text-xs font-medium text-slate-400 hover:text-indigo-500 transition-colors">
        ← Назад к списку
      </Link>
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          Аналитика: {site.name}
        </h1>
        <p className="text-xs text-slate-400 mt-1">{site.url}</p>
      </div>

      <div className="rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-panel)] p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6">Время отклика (мс)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-main)" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                dx={-10}
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Area 
                type="monotone" 
                dataKey="ping" 
                stroke="#6366f1" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorPing)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
