"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-slate-950 hover:opacity-90",
  secondary: "bg-surface border border-border text-foreground hover:bg-surface-muted",
  danger: "bg-danger text-slate-950 hover:opacity-90",
};

export function Button({ variant = "primary", className = "", isLoading, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      className={`h-10 px-4 rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Processando..." : children}
    </button>
  );
}
