"use client";

import { useMonitorStore } from "@/app/store/useMonitorStore";

export default function BuilderPage() {
  const { customization, updateCustomization, saveCustomization, isSaving } = useMonitorStore();

  const slug = customization.title
    ? customization.title.toLowerCase().replace(/[^a-z0-9]/g, "")
    : "brand";
  const fakeUrl = `https://${slug || "yourcompany"}.statuspage.io`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
      
      <div className="p-8 border-r border-[var(--color-border-main)] bg-[var(--color-bg-panel)] overflow-y-auto">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-xl font-bold text-slate-950 dark:text-white">Конструктор Страницы Статуса</h1>
            <p className="text-xs text-slate-400 mt-1">Настройте внешний вид вашей публичной страницы бренда</p>
          </div>
          
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Название компании / Сайта</label>
            <input
              type="text"
              value={customization.title}
              onChange={(e) => updateCustomization({ title: e.target.value })}
              className="block w-full rounded-xl border border-[var(--color-border-main)] bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-hidden dark:bg-slate-900 dark:text-white"
              placeholder="Например, My Company"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Цветовой режим карточки</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateCustomization({ theme: "light" })}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-semibold transition-all cursor-pointer ${
                  customization.theme === "light"
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                    : "border-[var(--color-border-main)] bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                ☀️ Светлая
              </button>
              <button
                type="button"
                onClick={() => updateCustomization({ theme: "dark" })}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-semibold transition-all cursor-pointer ${
                  customization.theme === "dark"
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                    : "border-[var(--color-border-main)] bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                🌙 Тёмная
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Фирменный цвет аптайма</label>
            <div className="flex gap-4 items-center bg-white dark:bg-slate-900 p-3 rounded-xl border border-[var(--color-border-main)]">
              <input
                type="color"
                value={customization.primaryColor}
                onChange={(e) => updateCustomization({ primaryColor: e.target.value })}
                className="w-10 h-10 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
              />
              <div className="flex flex-col">
                <span className="text-sm font-mono uppercase text-slate-900 dark:text-white">{customization.primaryColor}</span>
                <span className="text-xs text-slate-400">Нажмите на квадрат для выбора цвета</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Отображение блоков</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border-main)] bg-white dark:bg-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={customization.showHeader}
                  onChange={(e) => updateCustomization({ showHeader: e.target.checked })}
                  className="rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Показывать бейдж статуса (Operational)</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border-main)] bg-white dark:bg-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={customization.showLatency}
                  onChange={(e) => updateCustomization({ showLatency: e.target.checked })}
                  className="rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Отображать временные подписи под графиком</span>
              </label>
            </div>
          </div>

          <button
            type="button"
            disabled={isSaving}
            onClick={saveCustomization}
            className="w-full flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            {isSaving ? "Сохранение настроек..." : "✨ Сохранить настройки в базу"}
          </button>

        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 bg-slate-100 dark:bg-slate-900 select-none">
        <div className="w-full max-w-3xl flex flex-col">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4 text-center lg:text-left">
            ⚡ Живой предпросмотр реальной карточки монитора
          </p>
          
          <div className={`w-full rounded-2xl shadow-xl p-6 border transition-all duration-300 ${
            customization.theme === "dark" 
              ? "bg-[#090d16] border-slate-800 text-white" 
              : "bg-white border-slate-200 text-slate-900"
          }`}>
            
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight">{customization.title || "My Brand"}</h2>
                <p className="text-sm text-slate-400 font-mono text-xs">{fakeUrl}</p>
              </div>

              {customization.showHeader && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#10b981]/10 text-[#10b981]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                  Operational
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex gap-0.5 h-8">
                {[...Array(90)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[6px] rounded-sm transition-all duration-200 opacity-90 hover:opacity-100"
                    style={{ backgroundColor: customization.primaryColor }}
                  />
                ))}
              </div>

              {customization.showLatency && (
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>90 дней назад</span>
                  <span>Сегодня</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
