"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { Button } from "@/app/components/Button";
import { AuthError } from "@supabase/supabase-js";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data?.user) {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
    if (err instanceof AuthError) {
      setError(err.message);
    } else {
      setError("Произошла непредвиденная ошибка");
    }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[screen-64px] flex-col justify-center bg-slate-50 px-6 py-12 dark:bg-slate-950 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          Вход в Uptime Monitor
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Введите свои данные для доступа к панели управления
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-panel)] p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-rose-500/10 p-3 text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-500/20">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Email адрес
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="block w-full rounded-xl border border-[var(--color-border-main)] bg-white px-4 py-2.5 text-sm text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-hidden dark:bg-slate-900 dark:text-white dark:focus:border-indigo-500 disabled:opacity-50"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Пароль
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="block w-full rounded-xl border border-[var(--color-border-main)] bg-white px-4 py-2.5 text-sm text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-hidden dark:bg-slate-900 dark:text-white dark:focus:border-indigo-500 disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <Button type="submit" variant="primary" className="w-full justify-center py-2.5" disabled={isLoading}>
                {isLoading ? "Вход в систему..." : "Войти"}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Ещё нет аккаунта?{" "}
            <Link href="/register" className="font-semibold text-indigo-500 hover:text-indigo-400 transition-colors">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
