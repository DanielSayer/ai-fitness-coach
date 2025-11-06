import { Activity, Gauge, HeartPulse, TrendingUp, Zap } from "lucide-react";
import { InsightCard } from "./insight-card";
import type { CoachInsight, WeeklyPlan } from "./types";
import { WeeklyPlanCard } from "./weekly-plan-card";

type CoachOverviewProps = {
  insights: CoachInsight[];
  weeklyPlan: WeeklyPlan;
};

export function CoachOverview({ insights, weeklyPlan }: CoachOverviewProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-semibold tracking-tight">Coach Overview</h2>

      <WeeklyPlanCard plan={weeklyPlan} />
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((i) => (
          <InsightCard
            key={i.id}
            title={i.title}
            summary={i.summary}
            icon={i.icon}
            tone={i.tone}
            badge={i.badge}
            metrics={i.metrics}
          />
        ))}
      </div>

      <div className="space-y-4">
        <InsightCard
          title="Recovery readiness"
          summary="Consider an easy day or cross-training tomorrow if HRV is low
          or resting HR elevated. Keep easy runs truly easy."
          icon={HeartPulse}
          tone="info"
          metrics={[
            { label: "Est. recovery", value: "22-28 h" },
            { label: "Max HR", value: "203 bpm" },
            { label: "Zone 5 time", value: "28 min" },
          ]}
        />
      </div>
    </div>
  );
}

// Example helper for default insights if you want a quick start
export function buildDefaultInsights(): CoachInsight[] {
  return [
    {
      id: "pace",
      title: "Pacing",
      summary:
        "Average pace was steady (~6:25/km). For endurance gains, spend more time in Zones 3-4 with controlled intervals rather than prolonged Zone 5.",
      icon: Gauge,
      tone: "info",
      metrics: [
        { label: "Avg pace", value: "6:25/km" },
        { label: "Std dev", value: "±0:09" },
      ],
    },
    {
      id: "intensity",
      title: "Intensity mix",
      summary:
        "83% of time in Zone 5. Shift towards 60-70% easy, 20-30% steady, and a small dose of high intensity.",
      icon: Activity,
      tone: "warning",
      badge: "Skewed High",
      metrics: [
        { label: "Z3-4", value: "12%" },
        { label: "Z5", value: "83%" },
      ],
    },
    {
      id: "form",
      title: "Cadence & form",
      summary:
        "Cadence held well. Maintain relaxed shoulders and quick steps during efforts; extend warm-up to ease into target cadence.",
      icon: TrendingUp,
      tone: "positive",
      metrics: [
        { label: "Cadence", value: "176 spm" },
        { label: "Ground contact", value: "—" },
      ],
    },
    {
      id: "next",
      title: "What to focus on next",
      summary:
        "Next workout: 5 x 3 min in Zone 4 with 90 s jog recoveries. Keep last rep controlled; finish with 10 min easy.",
      icon: Zap,
      tone: "info",
      metrics: [
        { label: "Warm-up", value: "10-12 min" },
        { label: "Cool-down", value: "10 min" },
      ],
    },
  ];
}

export function buildDefaultWeeklyPlan(): WeeklyPlan {
  return {
    headline:
      "Build aerobic base with controlled tempo and plenty of easy volume.",
    weekRangeLabel: "This week",
    keyFocus: ["Endurance (Z2-Z3)", "Tempo control", "Recovery discipline"],
    sessions: [
      { title: "Easy Run", detail: "35-45 min, relaxed Z2" },
      { title: "Tempo Intervals", detail: "4 x 6 min @ Z3-Z4, 2 min easy" },
      { title: "Long Run", detail: "60-75 min comfortable Z2" },
    ],
  };
}
