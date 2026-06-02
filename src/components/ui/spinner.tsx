export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-300">
      <span className="h-4 w-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      {label ? <span>{label}</span> : null}
    </div>
  );
}
