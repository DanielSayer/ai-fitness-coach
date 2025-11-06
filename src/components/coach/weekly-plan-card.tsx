import { CalendarCheck, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { WeeklyPlan } from "./types";

type WeeklyPlanCardProps = {
  plan: WeeklyPlan;
};

export function WeeklyPlanCard({ plan }: WeeklyPlanCardProps) {
  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
              <CalendarCheck className="h-4 w-4" />
            </span>
            <CardTitle className="text-base">Weekly Recommendation</CardTitle>
          </div>
          <Badge variant="secondary">{plan.weekRangeLabel}</Badge>
        </div>
        <CardDescription className="pt-1">{plan.headline}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Target className="h-4 w-4 text-primary" />
            Key focus
          </div>
          <div className="flex flex-wrap gap-2">
            {plan.keyFocus.map((f) => (
              <Badge key={f} variant="outline" className="bg-background">
                {f}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div className="grid gap-3 md:grid-cols-3">
          {plan.sessions.map((s) => (
            <div
              key={s.title}
              className="rounded-lg border border-border bg-background p-3"
            >
              <div className="text-sm font-medium">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.detail}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
