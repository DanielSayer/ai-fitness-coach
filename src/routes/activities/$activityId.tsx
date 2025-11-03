import { createFileRoute } from "@tanstack/react-router";
import { ActivityDetails } from "@/components/activity-details";
import { AICoachChat } from "@/components/coach-chat";
import { activityMock } from "@/lib/mock-data";

export const Route = createFileRoute("/activities/$activityId")({
  component: ActivityPage,
});

function ActivityPage() {
  const { activityId } = Route.useParams();

  // Replace with real data fetching as needed
  const activity = activityMock;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ActivityDetails activity={activity} />
      <AICoachChat activity={activity} />
    </div>
  );
}
