import React from 'react'
import { useState } from 'react'
import { Button } from './Button'
import { useMonitorStore } from '../store/useMonitorStore'
import { FC } from 'react'

interface AddMonitorFormProps {
  onSuccess: () => void;
}


export const AddMonitorForm: FC<AddMonitorFormProps> = ({ onSuccess }) => {

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addSite = useMonitorStore((state) => state.addSite);

  const urlPattern = /^https?:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const urlPattern = /^https?:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?$/;

  if (!name.trim()) {
    setError("Введите название монитора");
    return;
  }

  if (!urlPattern.test(url)) {
    setError("Введите валидный URL с http:// или https://");
    return;
  }

  setError(null);
  addSite(name, url);
  setName("");
  setUrl("");
  onSuccess();
};
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Название монитора</label>
          <input 
            type="text" 
            placeholder="My Awesome API" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-panel)] px-3 py-2 text-sm outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white" 
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Ссылка (URL)</label>
          <input 
            type="text" 
            placeholder="https://example.com" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-panel)] px-3 py-2 text-sm outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white" 
          />
        </div>
      </div>

      {error && (
        <p className="text-xs font-semibold text-rose-500 animate-fade-in">{error}</p>
      )}

      <div className="flex gap-3 justify-end mt-2"> 
        <Button variant="secondary" type="button" onClick={onSuccess}>Отмена</Button>
        <Button variant="primary" type="submit">Сохранить</Button>
      </div>
    </form>
  );
}
