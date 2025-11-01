import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useState } from "react";
import { login } from "@/server/actions/auth";
import PasswordInput from "../password-input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login({ data: { username: email, password } });

    console.log(res);
  };

  return (
    <MotionConfig
      transition={{
        type: "tween",
        duration: 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="flex w-full max-w-sm flex-col gap-6 md:max-w-md">
        <Card className="bg-card gap-4 overflow-hidden border-2 pt-3 pb-5 inset-shadow-sm">
          <CardHeader className="flex justify-center border-b-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`title`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <CardTitle className="text-xl">Sign into Garmin</CardTitle>
              </motion.div>
            </AnimatePresence>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="space-y-1"
              >
                <Label>Email</Label>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="hello@saydn.chat"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="space-y-1"
              >
                <Label>Password</Label>
                <PasswordInput
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </motion.div>
              <motion.div
                className="mt-6 w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Button className="h-10 w-full">Sign in</Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MotionConfig>
  );
}

export { SignIn };
