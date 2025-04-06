"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "sonner";
import { gameConfig } from "@/config/game";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function CodePage() {
  const [code, setCode] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const correctCode = gameConfig.code;
  const maxAttempts = gameConfig.maxAttempts;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isBlocked) return;

    if (code === correctCode) {
      setIsSuccess(true);
      toast.success("🎉 Gefeliciteerd! Je hebt EcoSmart gered!");
      document.body.style.backgroundColor = "#22c55e";
    } else {
      const remainingAttempts = maxAttempts - (attempts + 1);
      setAttempts((prev) => prev + 1);

      if (remainingAttempts === 0) {
        setIsBlocked(true);
        toast.error("Je hebt geen pogingen meer over!");
        document.body.style.backgroundColor = "#ef4444";
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

        {!isSuccess && !isBlocked && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Code:</Label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={3}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="Voer de 3-cijferige code in..."
                required
                className="text-center text-2xl tracking-widest"
              />
            </div>
            <Button type="submit" className="w-full">
              Controleer code
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
