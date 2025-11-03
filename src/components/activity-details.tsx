import {
  Activity as ActivityIcon,
  Flame,
  Footprints,
  Heart,
  Mountain,
  Ruler,
  Timer,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Activity } from "@/lib/types/activity";

interface ActivityDetailsProps {
  activity: Activity;
}

export function ActivityDetails({ activity }: ActivityDetailsProps) {
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const stats = [
    {
      icon: Timer,
      label: "Duration",
      value: formatDuration(activity.durationSeconds),
    },
    {
      icon: Ruler,
      label: "Distance",
      value: `${(activity.distanceMeters / 1000).toFixed(2)} km`,
    },
    {
      icon: ActivityIcon,
      label: "Avg Pace",
      value: `${Math.floor(1000 / 60 / activity.avgSpeedMps)}:${Math.floor(
        ((1000 / 60 / activity.avgSpeedMps) % 1) * 60,
      )
        .toString()
        .padStart(2, "0")}/km`,
    },
    {
      icon: Heart,
      label: "Avg Heart Rate",
      value: `${activity.avgHeartRateBpm} bpm`,
    },
    {
      icon: TrendingUp,
      label: "Max Heart Rate",
      value: `${activity.maxHeartRateBpm} bpm`,
    },
    {
      icon: Mountain,
      label: "Elevation Gain",
      value: `${activity.elevationGainM} m`,
    },
    {
      icon: Footprints,
      label: "Steps",
      value: activity.steps.toLocaleString(),
    },
    {
      icon: Flame,
      label: "Calories",
      value: activity.calories.toLocaleString(),
    },
  ];

  const hrZones = [
    {
      zone: "Zone 1",
      percent: activity.hrZonesPercent.zone1Pct,
      color: "bg-blue-500",
    },
    {
      zone: "Zone 2",
      percent: activity.hrZonesPercent.zone2Pct,
      color: "bg-green-500",
    },
    {
      zone: "Zone 3",
      percent: activity.hrZonesPercent.zone3Pct,
      color: "bg-yellow-500",
    },
    {
      zone: "Zone 4",
      percent: activity.hrZonesPercent.zone4Pct,
      color: "bg-orange-500",
    },
    {
      zone: "Zone 5",
      percent: activity.hrZonesPercent.zone5Pct,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="p-6 space-y-6 w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="p-4 bg-linear-to-br from-card to-muted/5"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className="font-semibold truncate">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-linear-to-br from-card to-muted/5">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Heart Rate Zones
        </h3>
        <div className="space-y-4">
          {hrZones.map((zone) => (
            <div key={zone.zone}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{zone.zone}</span>
                <span className="font-medium">{zone.percent.toFixed(2)}%</span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${zone.color} transition-all`}
                  style={{ width: `${zone.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-linear-to-br from-card to-muted/5">
        <h3 className="font-semibold text-lg mb-4">Intensity Minutes</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Moderate Intensity
            </p>
            <p className="text-2xl font-bold text-primary">
              {activity.moderateIntensityMinutes}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                min
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Vigorous Intensity
            </p>
            <p className="text-2xl font-bold text-primary">
              {activity.vigorousIntensityMinutes}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                min
              </span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
