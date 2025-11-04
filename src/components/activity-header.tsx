import { Heart, Ruler, Timer } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDuration } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type Activity = {
  activityName: string;
  startTimeLocal: string | number | Date;
  durationSeconds: number;
  distanceMeters: number;
  avgHeartRateBpm?: number | null;
  avgSpeedMps?: number | null;
};

type Props = {
  activity: Activity;
  className?: string;
};

export function ActivityHeader({ activity, className }: Props) {
  const pace = pacePerKm(activity.avgSpeedMps ?? undefined);
  const km = (activity.distanceMeters ?? 0) / 1000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "overflow-hidden rounded-2xl border shadow-sm",
          className,
        )}
      >
        <div className="relative">
          {/* Soft, theme-aware gradient backdrop */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-secondary/8 to-accent/10" />
          {/* Light radial glow accent in the corner */}
          <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />

          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                  {activity.activityName}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {new Date(activity.startTimeLocal).toLocaleString()}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="gap-2 rounded-full px-3 py-1"
                  >
                    <Timer className="h-4 w-4 opacity-90" />
                    {formatDuration(activity.durationSeconds)}
                  </Badge>

                  <Badge
                    variant="secondary"
                    className="gap-2 rounded-full px-3 py-1"
                  >
                    <Ruler className="h-4 w-4 opacity-90" />
                    {km.toFixed(2)} km
                  </Badge>

                  <Badge
                    variant="secondary"
                    className="gap-2 rounded-full px-3 py-1"
                  >
                    <Heart className="h-4 w-4 opacity-90" />
                    {activity.avgHeartRateBpm
                      ? `${activity.avgHeartRateBpm} bpm`
                      : "— bpm"}
                  </Badge>
                </div>
              </div>

              <div className="hidden flex-col items-end md:flex">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Avg Pace</p>
                  <p className="text-lg font-semibold">{pace ?? "—"}</p>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Subtle animated gradient strip (theme aware, low contrast) */}
          <AnimatedStrip />
        </div>
      </Card>
    </motion.div>
  );
}

/**
/* A very thin, low-contrast gradient strip that slowly shifts.
 * Uses framer-motion to animate background position without
 * requiring Tailwind keyframes.
 */
function AnimatedStrip() {
  return (
    <motion.div
      className="h-0.5"
      style={{
        background:
          "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)",
        backgroundSize: "200% 100%",
      }}
      initial={{ backgroundPositionX: "0%" }}
      animate={{ backgroundPositionX: ["0%", "100%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "circInOut" }}
    />
  );
}

function pacePerKm(avgSpeedMps?: number | null) {
  if (!avgSpeedMps || avgSpeedMps <= 0) return null;
  const secondsPerKm = 1000 / avgSpeedMps;
  const min = Math.floor(secondsPerKm / 60);
  const sec = Math.round(secondsPerKm % 60);
  return `${min}:${String(sec).padStart(2, "0")}/km`;
}
