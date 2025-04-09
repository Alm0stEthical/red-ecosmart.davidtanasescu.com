"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("startTime");
    localStorage.removeItem("collectedDigits");
    localStorage.removeItem("currentPuzzle");
  }, []);

  return (
    <main className="container max-w-3xl mx-auto min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">🏦 Escape Room: Red EcoSmart!</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Jullie zijn een team van jonge ondernemers en jullie bedrijf,
          EcoSmart, staat op de rand van faillissement! 🏢💸 Een cyberaanval
          heeft alle bankrekeningen vergrendeld, en jullie hebben 15 minuten om
          vier economische raadsels op te lossen om de codes te kraken en het
          bedrijf te redden.
        </p>
      </div>

      <Link href="/puzzel">
        <Button size="lg" className="text-lg">
          Start de uitdaging
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </main>
  );
}
