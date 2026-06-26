import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium tracking-tight shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700",
    secondary: "border border-[var(--color-border-main)] bg-[var(--color-bg-panel)] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800",
    danger: "bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700",
  };

  const currentVariant = variants[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${currentVariant} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
      ) : null}
      {children}
    </button>
  );
};
