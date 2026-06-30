import { create } from "zustand";
import { MonitorSite, CheckResult } from "../types/monitor";
import { supabase } from "../lib/supabase";

interface MonitorState {
  sites: MonitorSite[];
  isLoading: boolean;
  fetchSites: () => Promise<void>;
  addSite: (name: string, url: string) => Promise<void>;
  removeSite: (id: string) => Promise<void>;
  tickMetrics: () => void;
}

export const useMonitorStore = create<MonitorState>((set, get) => ({
  sites: [],
  isLoading: false,

  fetchSites: async () => {
    set({ isLoading: true });
    try {
      const { data: monitors, error: monitorsError } = await supabase
        .from("monitors")
        .select("*, check_results(*)");

  


      if (monitorsError) throw monitorsError;

      interface DbCheckResult {
        id: number;
        created_at: string;
        status: "up" | "down";
        latency: number;
        status_code: number;
        error_reason?: string | null;
      }

      interface DbMonitor {
        id: string;
        name: string;
        url: string;
        is_active: boolean;
        created_at: string;
        check_results?: DbCheckResult[];
      }

      const formattedSites: MonitorSite[] = ((monitors as unknown as DbMonitor[]) || []).map((m) => ({
        id: m.id,
        name: m.name,
        url: m.url,
        isActive: m.is_active,
        createdAt: new Date(m.created_at).getTime(),
        history: (m.check_results || [])
          .map((c) => ({
            id: c.id.toString(),
            timestamp: new Date(c.created_at).getTime(),
            status: c.status,
            latency: c.latency,
            statusCode: c.status_code,
            errorReason: c.error_reason || undefined,
          }))
          .sort((a, b) => a.timestamp - b.timestamp),
      }));

      set({ sites: formattedSites });
    } catch (error) {
      console.error("Error fetching sites:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addSite: async (name, url) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error("Пользователь не авторизован");
      }

      const { data, error } = await supabase
        .from("monitors")
        .insert([{ name, url, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      const newSite: MonitorSite = {
        id: data.id,
        name: data.name,
        url: data.url,
        isActive: data.is_active,
        createdAt: new Date(data.created_at).getTime(),
        history: [],
      };

      set((state) => ({ sites: [...state.sites, newSite] }));
    } catch (error) {
      console.error("Error adding site:", error);
    }
  },

  removeSite: async (id) => {
    try {
      const { error } = await supabase.from("monitors").delete().eq("id", id);
      if (error) throw error;
      set((state) => ({ sites: state.sites.filter((site) => site.id !== id) }));
    } catch (error) {
      console.error("Error removing site:", error);
    }
  },

  tickMetrics: async () => {
    try {
      const fetchSites = get().fetchSites;
      await fetchSites();
    } catch (error) {
      console.error("Error ticking metrics:", error);
    }
},
}));
