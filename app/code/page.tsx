"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { gameConfig } from "@/config/game";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function CodePage() {
  const [code, setCode] = useState<string>("");
  const [attempts, setAttempts] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [collectedDigits, setCollectedDigits] = useState<string[]>([]);

  const correctCode = gameConfig.code;
  const maxAttempts = gameConfig.maxAttempts;

  useEffect(() => {
    const savedDigits = localStorage.getItem("collectedDigits");
    if (savedDigits) {
      setCollectedDigits(JSON.parse(savedDigits));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isBlocked) return;

    if (code === correctCode) {
      setIsSuccess(true);
      toast.success("🎉 Gefeliciteerd! Je hebt EcoSmart gered!");
      document.body.style.backgroundColor = "#22c55e";

      localStorage.removeItem("collectedDigits");
      localStorage.removeItem("currentPuzzle");
      localStorage.removeItem("startTime");
      localStorage.removeItem("timeLeft");
      setCollectedDigits([]);
    } else {
      const remainingAttempts = maxAttempts - (attempts + 1);
      setAttempts((prev) => prev + 1);

      if (remainingAttempts === 0) {
        setIsBlocked(true);
        toast.error("Je hebt geen pogingen meer over!");
        document.body.style.backgroundColor = "#ef4444";

        localStorage.removeItem("collectedDigits");
        localStorage.removeItem("currentPuzzle");
        localStorage.removeItem("startTime");
        localStorage.removeItem("timeLeft");
        setCollectedDigits([]);
      } else {
        toast.error(
          `Onjuiste code! Nog ${remainingAttempts} ${
            remainingAttempts === 1 ? "poging" : "pogingen"
          } over.`
        );
      }
    }

    setCode("");
  };

  const handleOTPChange = (value: string) => {
    setCode(value);
  };

  return (
    <main className="container max-w-md mx-auto min-h-screen flex flex-col items-center justify-center p-4">
      {isSuccess && <Confetti />}

      <div className="w-full space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">
            {isSuccess
              ? "🎉 YES! De bankrekening is hersteld en EcoSmart is gered! 🎊"
              : isBlocked
              ? "Toegang geblokkeerd!"
              : "Voer de geheime code in om het bedrijf te redden!"}
          </h1>
        </div>

        {!isSuccess && !isBlocked && collectedDigits.length > 0 && (
          <div className="p-4 bg-muted rounded-lg mb-4">
            <p className="text-center font-medium mb-2">
              Jouw verzamelde code cijfers:
            </p>
            <div className="flex justify-center gap-2">
              {collectedDigits.map((digit, i) => (
                <span
                  key={i}
                  className="flex w-8 h-8 bg-primary text-primary-foreground rounded-md items-center justify-center font-mono text-lg"
                >
                  {digit}
                </span>
              ))}
            </div>
          </div>
        )}

        {!isSuccess && !isBlocked && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code-input" className="text-center block">
                Code:
              </Label>
              <div className="flex justify-center">
                <InputOTP
                  id="code-input"
                  maxLength={3}
                  value={code}
                  onChange={handleOTPChange}
                  className="gap-2"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={code.length !== 3}
            >
              Controleer code
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
