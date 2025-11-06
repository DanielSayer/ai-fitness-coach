import { cva } from "class-variance-authority";
import { type Easing, motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MetricPill } from "./metric-pill";

type InsightCardProps = {
  title: string;
  summary: string;
  icon: React.ElementType;
  tone?: "positive" | "warning" | "info";
  badge?: string;
  metrics?: { label: string; value: string }[];
};

const cardVariants = cva("", {
  variants: {
    variant: {
      positive: "border-primary/40 bg-primary/5",
      warning: "border-destructive/40 bg-destructive/5",
      info: "border-border bg-card",
    },
  },
});

const iconVariants = cva("", {
  variants: {
    variant: {
      positive: "text-primary",
      warning: "text-destructive",
      info: "text-muted-foreground",
    },
  },
});

export function InsightCard({
  title,
  summary,
  icon: Icon,
  tone = "info",
  badge,
  metrics = [],
}: InsightCardProps) {
  const container = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.06,
        ease: "easeOut" as Easing,
        duration: 0.28,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.28, ease: "easeOut" as Easing },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, dur: 0.5 }}
      variants={container}
      className="w-full"
    >
      <Card className={cn("border", cardVariants({ variant: tone }))}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <motion.span
                variants={item}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md",
                  "bg-muted/40",
                  iconVariants({ variant: tone }),
                )}
              >
                <Icon className="h-4 w-4" />
              </motion.span>
              <motion.div variants={item}>
                <CardTitle className="text-base">{title}</CardTitle>
              </motion.div>
            </div>
            {badge ? (
              <motion.div variants={item}>
                <Badge variant="secondary">{badge}</Badge>
              </motion.div>
            ) : null}
          </div>
          <motion.div variants={item}>
            <CardDescription className="pt-2 text-sm">
              {summary}
            </CardDescription>
          </motion.div>
        </CardHeader>
        {metrics.length ? (
          <CardContent className="pt-0">
            <motion.div className="flex flex-wrap gap-2" variants={item}>
              {metrics.map((m) => (
                <motion.div key={m.label} variants={item}>
                  <MetricPill label={m.label} value={m.value} />
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        ) : null}
      </Card>
    </motion.div>
  );
}
