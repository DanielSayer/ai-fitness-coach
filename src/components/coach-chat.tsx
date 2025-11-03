import { Bot, Send, Sparkles, User } from "lucide-react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Activity } from "@/lib/types/activity";

interface AICoachChatProps {
  activity: Activity;
}

export function AICoachChat({ activity }: AICoachChatProps) {
  // Mock messages for design purposes
  const messages = [
    {
      role: "assistant",
      content: `Great job on your ${
        activity.activityName
      }! I noticed you spent ${activity.hrZonesPercent.zone5Pct.toFixed(
        1,
      )}% of your time in Zone 5. Let's talk about your performance.`,
    },
    {
      role: "user",
      content: "How was my pacing?",
    },
    {
      role: "assistant",
      content:
        "Your average pace was consistent at around 2.6 m/s. For optimal endurance training, consider maintaining more time in zones 3-4 rather than pushing into zone 5 for most of the run.",
    },
  ];

  const suggestedPrompts = [
    "How can I improve my pace?",
    "What should I focus on next?",
    "Analyze my heart rate zones",
    "Recovery tips?",
  ];

  return (
    <div className="flex flex-col h-full min-h-[500px]">
      <div className="bg-linear-to-r from-primary/10 via-secondary/10 to-primary/10 p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 rounded-full">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">AI Fitness Coach</h3>
            <p className="text-sm text-muted-foreground">
              Personalized insights about your workout
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {messages.map((message, idx) => (
            <motion.div
              // biome-ignore lint/suspicious/noArrayIndexKey: Not mock messages, replace with message id when implemented
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar
                className={
                  message.role === "assistant"
                    ? "bg-primary/10"
                    : "bg-secondary/10"
                }
              >
                <AvatarFallback>
                  {message.role === "assistant" ? (
                    <Bot className="w-4 h-4 text-primary" />
                  ) : (
                    <User className="w-4 h-4 text-secondary" />
                  )}
                </AvatarFallback>
              </Avatar>
              <Card
                className={`p-4 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            Suggested questions
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <Button
                key={prompt}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-muted/30">
        <div className="flex gap-2">
          <Input
            placeholder="Ask your AI coach anything..."
            className="flex-1"
          />
          <Button size="icon" className="shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI insights based on your activity data
        </p>
      </div>
    </div>
  );
}
