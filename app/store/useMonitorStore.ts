import { create } from "zustand";
import { MonitorSite } from "../types/monitor";

interface MonitorState {
  sites: MonitorSite[];
  addSite: (name: string, url: string) => void;
  removeSite: (id: string) => void;
}

export const useMonitorStore = create<MonitorState>((set) => ({
  sites: [
    {
      id: "demo-1",
      name: "Основной API Стартапа",
      url: "https://mystartup.com",
      isActive: true,
      createdAt: Date.now(),
      history: [
        {
          id: "h-1",
          timestamp: Date.now() - 60000,
          status: "up",
          latency: 124,
          statusCode: 200,
        },
        {
          id: "h-2",
          timestamp: Date.now(),
          status: "up",
          latency: 142,
          statusCode: 200,
        },
      ],
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
}));