"use client";

import type { SelectHTMLAttributes } from "react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
  error?: string;
};

export function Select({ label, options, error, className = "", ...props }: SelectProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-slate-300">
      {label}
      <select
        className={`h-10 rounded-md border border-border bg-surface px-3 text-sm text-foreground focus:border-accent ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  );
}
