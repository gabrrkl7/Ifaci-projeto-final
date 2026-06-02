"use client";

import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-slate-300">
      {label}
      <input
        className={`h-10 rounded-md border border-border bg-surface px-3 text-sm text-foreground placeholder:text-slate-500 focus:border-accent ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  );
}
