import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatPillProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
};

export function StatPill({ label, value, icon, className }: StatPillProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-3",
        "hover:shadow-md transition-shadow",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon && (
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            {icon}
          </div>
        )}
        <span>{label}</span>
      </div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}
