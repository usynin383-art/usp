import { create } from "zustand";
import { MonitorSite, CheckResult } from "../types/monitor";

interface MonitorState {
  sites: MonitorSite[];
  addSite: (name: string, url: string) => void;
  removeSite: (id: string) => void;
  tickMetrics: () => void;
}

export const useMonitorStore = create<MonitorState>((set) => ({
  sites: [
    {
      id: "demo-1",
      name: "Основной API Стартапа",
      url: "https://mystartup.com",
      isActive: true,
      createdAt: Date.now(),
      history: Array.from({ length: 89 }, (_, i) => ({
        id: `init-${i}`,
        timestamp: Date.now() - (89 - i) * 60000,
        status: "up",
        latency: 120,
        statusCode: 200,
})),

    },
  ],

  addSite: (name, url) =>
    set((state) => {
      const newSite: MonitorSite = {
        id: `site-${Date.now()}`,
        name,
        url,
        isActive: true,
        createdAt: Date.now(),
        history: [],
      };
      return { sites: [...state.sites, newSite] };
    }),

  removeSite: (id) =>
    set((state) => ({
      sites: state.sites.filter((site) => site.id !== id),
    })),

  tickMetrics: () =>
    set((state) => ({
      sites: state.sites.map((site) => {
        if (!site.isActive) return site;

        const isUp = Math.random() > 0.04;
        const newCheck: CheckResult = {
          id: `tick-${Date.now()}-${Math.random()}`,
          timestamp: Date.now(),
          status: isUp ? "up" : "down",
          latency: isUp ? Math.floor(Math.random() * 80) + 100 : 0,
          statusCode: isUp ? 200 : 504,
          errorReason: isUp ? undefined : "Gateway Timeout",
        };

        const updatedHistory = [...site.history, newCheck];
        
        return {
          ...site,
          history: updatedHistory.length > 90 ? updatedHistory.slice(1) : updatedHistory,
        };
      }),
    })),
}));
