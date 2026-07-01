export const Sidebar = () => {
  return (
    <aside className="fixed bottom-0 left-0 top-16 hidden w-64 border-r border-[var(--color-border-main)] bg-[var(--color-bg-panel)] p-4 md:block">
      <nav className="flex flex-col gap-1">
        <a href="#" className="flex h-10 items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-3 text-sm font-medium">
          📊 Дашборд
        </a>
        <a href="#" className="flex h-10 items-center rounded-lg px-3 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          ⚙️ Настройки
        </a>
        <a href="#" className="flex h-10 items-center rounded-lg px-3 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          💳 Подписка
        </a>
      </nav>
    </aside>
  );
};
