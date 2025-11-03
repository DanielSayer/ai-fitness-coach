import { createFileRoute, Link } from "@tanstack/react-router";
import { ActivityCard } from "@/components/activity-card";
import { activityMock } from "@/lib/mock-data";
import type { Activity } from "@/lib/types/activity";

export const Route = createFileRoute("/")({ component: App });

const activities: Activity[] = [
  activityMock,
  { ...activityMock, activityId: 2, activityName: "Running" },
];

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Your Activities
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            {activities.map((a) => (
              <Link
                key={a.activityId}
                to="/activities/$activityId"
                params={{ activityId: `${a.activityId}` }}
              >
                <ActivityCard activity={a} />
              </Link>
            ))}
          </div>
          <div>Other stuff goes here</div>
        </div>
      </div>
    </div>
  );
}
