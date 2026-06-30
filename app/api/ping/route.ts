import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  // 1. Проверяем секретный b2b-токен безопасности из заголовков запроса
  const authHeader = request.headers.get("Authorization");
  const expectedToken = `Bearer ${process.env.CRON_SECRET_KEY}`;

  if (!authHeader || authHeader !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    // 2. Инициализируем клиент Supabase с корректными пустыми методами кук
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return [];
          },
          setAll(cookiesToSet) {
            // Оставляем пустым, так как Cron-роботу куки не нужны
          },
        },
      }
    );

    // 3. Выкачиваем из базы данных только активные мониторы
    const { data: monitors, error: fetchError } = await supabase
      .from("monitors")
      .select("id, url")
      .eq("is_active", true);

    if (fetchError) throw fetchError;
    if (!monitors || monitors.length === 0) {
      return NextResponse.json({ message: "Нет активных сайтов для проверки" }, { status: 200 });
    }

    const resultsToInsert = [];

    // 4. Запускаем обход сайтов и замеряем реальный пинг наружу
    for (const monitor of monitors) {
      const startTime = performance.now();
      let statusCode = 0;
      let status: "up" | "down" = "down";
      let errorReason = null;

      try {
        // Защита «от дурака»: проверяем валидность URL-адреса
        let validatedUrl: URL;
        try {
          validatedUrl = new URL(monitor.url);
        } catch {
          throw new Error("Невалидный формат URL");
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(validatedUrl.toString(), {
          method: "GET",
          signal: controller.signal,
          next: { revalidate: 0 }, // Запрещаем кэширование сетевого пинга
        });

        clearTimeout(timeoutId);

        const endTime = performance.now();
        statusCode = response.status;

        if (statusCode >= 200 && statusCode < 400) {
          status = "up";
        } else {
          errorReason = `HTTP Error ${statusCode}`;
        }

        resultsToInsert.push({
          monitor_id: monitor.id,
          status,
          latency: Math.round(endTime - startTime),
          status_code: statusCode,
          error_reason: errorReason,
        });

      } catch (fetchErr) {
        resultsToInsert.push({
          monitor_id: monitor.id,
          status: "down",
          latency: 0,
          status_code: 0,
          error_reason: fetchErr instanceof Error ? fetchErr.message : "Network Error",
        });
      }
    }

    // 5. Массово записываем все логи пинга в таблицу check_results
    const { error: insertError } = await supabase
      .from("check_results")
      .insert(resultsToInsert);

    if (insertError) throw insertError;

    return NextResponse.json({ 
      success: true, 
      checkedCount: resultsToInsert.length,
      results: resultsToInsert 
    }, { status: 200 });

  } catch (error) {
    console.error("Ошибка в работе серверного пингера:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Internal Server Error" 
    }, { status: 500 });
  }
}
