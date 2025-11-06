import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MetricPill } from "./metric-pill";

type InsightCardProps = {
  title: string;
  summary: string;
  icon: React.ElementType;
  tone?: "positive" | "warning" | "info";
  badge?: string;
  metrics?: { label: string; value: string }[];
};

export function InsightCard({
  title,
  summary,
  icon: Icon,
  tone = "info",
  badge,
  metrics = [],
}: InsightCardProps) {
  const toneClasses =
    tone === "positive"
      ? "border-primary/40 bg-primary/5"
      : tone === "warning"
        ? "border-destructive/40 bg-destructive/5"
        : "border-border bg-card";

  const iconTone =
    tone === "positive"
      ? "text-primary"
      : tone === "warning"
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <Card className={cn("border", toneClasses)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md",
                "bg-muted/40",
                iconTone,
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          {badge ? <Badge variant="secondary">{badge}</Badge> : null}
        </div>
        <CardDescription className="pt-2 text-sm">{summary}</CardDescription>
      </CardHeader>
      {metrics.length ? (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {metrics.map((m) => (
              <MetricPill key={m.label} label={m.label} value={m.value} />
            ))}
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
}
