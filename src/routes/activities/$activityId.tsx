import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { ActivityDetails } from "@/components/activity-details";
import {
  buildDefaultInsights,
  buildDefaultWeeklyPlan,
  CoachOverview,
} from "@/components/coach/overview";
import { activityMock } from "@/lib/mock-data";

export const Route = createFileRoute("/activities/$activityId")({
  component: ActivityPage,
});

function ActivityPage() {
  const { activityId } = Route.useParams();
  const activity = activityMock;

  const insights = buildDefaultInsights();
  const weeklyPlan = buildDefaultWeeklyPlan();

  return (
    <div className="container mx-auto p-4 min-h-screen space-y-2">
      <Link to="/" className="flex items-center">
        <ArrowLeftIcon className="size-5 me-2 text-muted-foreground" />
        Back
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ActivityDetails activity={activity} />
        <CoachOverview insights={insights} weeklyPlan={weeklyPlan} />
      </div>
    </div>
  );
}
