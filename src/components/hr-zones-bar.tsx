import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { HrZonesPercent } from "@/lib/types/activity";
import { cn } from "@/lib/utils";

type HrZonesBarProps = {
  zones: HrZonesPercent;
};

const zoneMeta = [
  { key: "zone1Pct", name: "Z1", bg: "from-muted to-muted/70" },
  { key: "zone2Pct", name: "Z2", bg: "from-secondary to-secondary/70" },
  { key: "zone3Pct", name: "Z3", bg: "from-accent to-accent/70" },
  { key: "zone4Pct", name: "Z4", bg: "from-primary to-primary/70" },
  { key: "zone5Pct", name: "Z5", bg: "from-destructive to-destructive/70" },
] as const;

export function HrZonesBar({ zones }: HrZonesBarProps) {
  return (
    <div className="space-y-3">
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <div className="flex h-full w-full">
          {zoneMeta.map((z) => {
            const pct = Math.max(0, Math.min(100, zones[z.key] ?? 0));
            if (!pct) return null;
            return (
              <div
                key={z.key}
                className={`h-full bg-linear-to-r ${z.bg}`}
                style={{ width: `${pct}%` }}
                title={`${z.name} ${pct.toFixed(1)}%`}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {zoneMeta.map((z) => {
          const pct = zones[z.key] ?? 0;
          return (
            <Badge
              key={z.key}
              variant="outline"
              className="bg-background/60 backdrop-blur"
            >
              <span
                className="mr-2 inline-block h-3 w-3 rounded-full bg-linear-to-br"
                style={{ backgroundImage: undefined }}
              />
              <span
                className={cn(
                  `mr-2 inline-block h-3 w-3 rounded-full bg-linear-to-r`,
                  z.bg,
                )}
              />
              {z.name} {pct.toFixed(1)}%
            </Badge>
          );
        })}
      </div>
      <Separator />
      <p className="text-sm text-muted-foreground">
        Heart rate zone distribution across the activity.
      </p>
    </div>
  );
}
