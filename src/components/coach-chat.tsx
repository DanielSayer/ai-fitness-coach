import { Bot, Send, Sparkles, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
      content: `Great job on your ${activity.activityName}! I noticed you spent ${activity.hrZonesPercent.zone5Pct.toFixed(
        1,
      )}% of your time in Zone 5 — impressive effort. Let's review how to make that effort more sustainable.`,
    },
    {
      role: "user",
      content: "How was my pacing?",
    },
    {
      role: "assistant",
      content:
        "Your average pace was steady (~2.6 m/s). For endurance improvements focus on longer time in Zones 3–4 and controlled intervals rather than prolonged Zone 5 efforts.",
    },
  ];

  const suggestedPrompts = [
    "How can I improve my pace?",
    "What should I focus on next?",
    "Analyze my heart rate zones",
    "Recovery tips?",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] min-h-[520px] rounded-2xl overflow-hidden shadow-lg bg-linear-to-b from-white/50 to-white/30">
      {/* Header */}
      <div className="px-6 py-5 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center gap-4">
        <div className="relative">
          <div className="p-2 rounded-full bg-white/12">
            <Bot className="w-6 h-6 text-white" />
          </div>
          {/* subtle pulse */}
          <motion.span
            className="absolute -inset-1 rounded-full"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: "0 6px 18px rgba(99,102,241,0.12)" }}
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">AI Fitness Coach</h3>
          <p className="text-xs opacity-90">
            Personalized insights about your workout
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs opacity-90">Activity</p>
            <p className="text-sm font-medium truncate">
              {activity.activityName}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6 bg-linear-to-b from-white to-muted/5">
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {messages.map((message, idx) => {
              const isUser = message.role === "user";
              return (
                <motion.div
                  key={`${message.role}-${idx}-${message.content.slice(0, 24)}`}
                  initial={{ opacity: 0, y: 8, scale: 0.995 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ delay: idx * 0.06, duration: 0.28 }}
                  className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
                >
                  <Avatar
                    className={isUser ? "bg-secondary/10" : "bg-primary/10"}
                    aria-hidden
                  >
                    <AvatarFallback>
                      {isUser ? (
                        <User className="w-4 h-4 text-secondary" />
                      ) : (
                        <Bot className="w-4 h-4 text-primary" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-2xl p-4 max-w-[78%] shadow-sm ${
                      isUser
                        ? "bg-linear-to-r from-primary to-primary/90 text-white"
                        : "bg-white/95 border border-muted/30"
                    }`}
                  >
                    <p
                      className={`text-sm leading-relaxed ${isUser ? "text-primary-foreground" : "text-muted-foreground"}`}
                    >
                      {message.content}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing / assistant hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16 }}
            className="flex items-center gap-3 opacity-80"
          >
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
            <p className="text-xs text-muted-foreground">
              AI is analyzing your activity for tailored tips...
            </p>
          </motion.div>

          {/* Suggested prompts */}
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Suggested questions
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="ghost"
                  size="sm"
                  className="px-3 py-1.5 bg-linear-to-r from-indigo-50 to-purple-50 text-sm rounded-full border border-muted/20"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Composer */}
      <div className="px-4 py-3 bg-white/60 border-t backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ask your AI coach anything..."
            className="flex-1 rounded-xl"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-r from-indigo-600 to-pink-500 text-white shadow-md"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">
          AI insights based on your activity data
        </p>
      </div>
    </div>
  );
}
