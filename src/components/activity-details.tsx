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
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDuration } from "@/lib/formatters";
import type { Activity } from "@/lib/types/activity";

interface ActivityDetailsProps {
  activity: Activity;
}

export function ActivityDetails({ activity }: ActivityDetailsProps) {
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
    <div className="w-full space-y-6">
      {/* Hero header */}
      <div className="rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                {activity.activityName}
              </h2>
              <p className="text-sm opacity-85 mt-1">
                {new Date(activity.startTimeLocal).toLocaleString()}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                  <Timer className="w-4 h-4 opacity-90" />
                  {formatDuration(activity.durationSeconds)}
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                  <Ruler className="w-4 h-4 opacity-90" />
                  {(activity.distanceMeters / 1000).toFixed(2)} km
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                  <Heart className="w-4 h-4 opacity-90" />
                  {activity.avgHeartRateBpm} bpm
                </span>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end">
              <div className="text-right">
                <p className="text-sm text-white/90">Avg Pace</p>
                <p className="text-lg font-semibold">
                  {`${Math.floor(1000 / 60 / activity.avgSpeedMps)}:${Math.floor(
                    ((1000 / 60 / activity.avgSpeedMps) % 1) * 60,
                  )
                    .toString()
                    .padStart(2, "0")}/km`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* subtle gradient strip */}
        <div className="h-2 bg-linear-to-r from-indigo-500 via-purple-400 to-pink-400" />
      </div>

      {/* Main content: left summary + right stats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map / route placeholder */}
        <div className="flex-1 col-span-full min-h-[220px] bg-linear-to-br from-slate-50 to-white rounded-lg shadow-inner border border-muted/30 flex items-center justify-center">
          <div className="text-center text-sm text-muted-foreground">
            Route map placeholder
            <div className="text-xs mt-2">(Add map component later)</div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <Card className="gap-2">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            {/* Quick metrics */}
            <CardContent className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg bg-linear-to-r from-white to-muted/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground truncate">
                          {s.label}
                        </p>
                        <p className="font-medium">{s.value}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="flex gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Heart Rate Zones
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {hrZones.map((zone, idx) => (
                <div key={zone.zone}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{zone.zone}</span>
                    <span className="font-medium">
                      {zone.percent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`${zone.color} h-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${zone.percent}%` }}
                      transition={{ delay: idx * 0.04, duration: 0.6 }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="gap-2">
            <CardHeader>
              <CardTitle>Intensity Minutes</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
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
            </CardContent>
          </Card>

          <Card className="gap-2">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Type: {activity.type}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Recorded: {new Date(activity.startTimeLocal).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
