import { createFileRoute } from "@tanstack/react-router";
import { ActivityDetails } from "@/components/activity-details";
import { AICoachChat } from "@/components/coach-chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { activityMock } from "@/lib/mock-data";

export const Route = createFileRoute("/activities/$activityId")({
  component: ActivityPage,
});

function ActivityPage() {
  const { activityId } = Route.useParams();

  const activity = activityMock;

  return (
    <div className="container mx-auto p-4 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="overflow-hidden h-[calc(100vh-2rem)]">
        <ScrollArea
          className="h-full box-border pr-4"
          style={{ scrollbarGutter: "stable both-edges" }} // camelCase for React style prop
        >
          <ActivityDetails activity={activity} />
        </ScrollArea>
      </div>

      <AICoachChat activity={activity} />
    </div>
  );
}
