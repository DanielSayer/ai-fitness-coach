export type Metric = { label: string; value: string };

export type CoachInsight = {
  id: string;
  title: string;
  summary: string;
  icon: React.ElementType;
  tone?: "positive" | "warning" | "info";
  badge?: string;
  metrics?: Metric[];
};

export type WeeklyPlan = {
  headline: string;
  weekRangeLabel: string;
  keyFocus: string[];
  sessions: {
    title: string;
    detail: string;
  }[];
};
