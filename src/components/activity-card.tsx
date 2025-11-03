import { Clock, Flame, Heart, MapPin, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Activity } from "@/lib/types/activity";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDistance = (meters: number) => {
    return (meters / 1000).toFixed(2);
  };

  const formatPace = (mps: number) => {
    const minPerKm = 1000 / 60 / mps;
    const mins = Math.floor(minPerKm);
    const secs = Math.floor((minPerKm - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden cursor-pointer border-border/40 bg-linear-to-br from-card via-card to-muted/5 hover:shadow-lg transition-shadow">
        <div className="relative h-32 bg-linear-to-br from-primary/20 via-primary/10 to-secondary/20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">
              {formatDistance(activity.distanceMeters)}
            </div>
            <div className="text-sm text-muted-foreground">km</div>
          </div>
          <Badge
            className="absolute top-3 right-3 bg-background/80 backdrop-blur"
            variant="secondary"
          >
            {activity.type}
          </Badge>
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-lg mb-3 truncate">
            {activity.activityName}
          </h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>{formatDuration(activity.durationSeconds)}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>{formatPace(activity.avgSpeedMps)}/km</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className="w-4 h-4 text-primary" />
              <span>{activity.avgHeartRateBpm} bpm</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Flame className="w-4 h-4 text-primary" />
              <span>{activity.calories} cal</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>
              {new Date(activity.startTimeLocal).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
