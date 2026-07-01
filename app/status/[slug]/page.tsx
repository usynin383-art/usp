import { notFound } from "next/navigation";
import { createServerClient } from "@supabase/ssr";

interface DbCheckResult {
  id: number;
  created_at: string;
  status: "up" | "down";
  latency: number;
  status_code: number;
  error_reason: string | null;
}

interface StatusPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function StatusPublicPage({ params }: StatusPageProps) {
  const resolvedParams = await params;
  const targetSlug = resolvedParams.slug;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return []; },
        setAll() {}
      }
    }
  );

  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .ilike("status_page_title", targetSlug)
    .limit(1);

  if (profileError || !profiles || profiles.length === 0) {
    notFound();
  }

  const profile = profiles[0];

  const { data: monitors } = await supabase
    .from("monitors")
    .select("*, check_results(*)")
    .eq("user_id", profile.id)
    .eq("is_active", true);

  const theme = profile.status_page_theme || "dark";
  const primaryColor = profile.status_page_primary_color || "#10b981";

  return (
    <div className={`min-h-screen font-sans p-6 md:p-12 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#090d16] text-white" : "bg-slate-50 text-slate-900"
    }`}>
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className={`p-6 rounded-2xl border flex justify-between items-center shadow-xs ${
          theme === "dark" ? "bg-[#0d1527] border-slate-800" : "bg-white border-slate-100"
        }`}>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{profile.status_page_title}</h1>
            <p className="text-xs text-slate-400">Официальная страница monitoring-а сервисов</p>
          </div>
          {profile.status_page_show_badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Все системы работают
            </span>
          )}
        </div>

        <div className="space-y-4">
          {monitors && monitors.length > 0 ? (
            monitors.map((monitor) => {
              const results = (monitor.check_results as DbCheckResult[]) || [];
              
              const sortedResults = results
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                .slice(-90);

              const fillCount = 90 - sortedResults.length;
              const emptyBars = fillCount > 0 ? [...Array(fillCount)] : [];

              return (
                <div key={monitor.id} className={`p-6 rounded-2xl border shadow-xs ${
                  theme === "dark" ? "bg-[#0d1527] border-slate-800" : "bg-white border-slate-100"
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-lg">{monitor.name}</h3>
                      <p className="text-xs text-slate-400 font-mono text-[11px]">{monitor.url}</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-500">
                      100.0% аптайм
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-0.5 h-7">
                      {emptyBars.map((_, idx) => (
                        <div key={`empty-${idx}`} className={`w-[6px] rounded-sm ${
                          theme === "dark" ? "bg-slate-900/40" : "bg-slate-200/40"
                        }`} />
                      ))}
                      {sortedResults.map((result) => (
                        <div
                          key={result.id}
                          className="w-[6px] rounded-sm opacity-90 hover:opacity-100"
                          style={{
                            backgroundColor: result.status === "up" ? primaryColor : "#ef4444"
                          }}
                          title={`Статус: ${result.status}, Пинг: ${result.latency}мс`}
                        />
                      ))}
                    </div>

                    {profile.status_page_show_latency && (
                      <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                        <span>90 дней назад</span>
                        <span>Сегодня</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-sm text-slate-400 py-8">Нет активных мониторов для отображения</p>
          )}
        </div>

      </div>
    </div>
  );
}
