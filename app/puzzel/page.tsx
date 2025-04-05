"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gameConfig } from "@/config/game";

interface PuzzleProps {
  id: number;
  question: string;
  type: "input" | "choice";
  choices?: { id: string; text: string }[];
  correctAnswer: string | number;
  codeDigit?: string;
}

const puzzles: PuzzleProps[] = [
  {
    id: 1,
    question: "Bereken de winst: Omzet €10.000 - Kosten €7.500 = ?",
    type: "input",
    correctAnswer: gameConfig.puzzleAnswers.puzzle1,
  },
  {
    id: 2,
    question:
      "Als de vraag groter is dan het aanbod, wat gebeurt er met de prijs?",
    type: "choice",
    choices: [
      { id: "A", text: "Prijs daalt" },
      { id: "B", text: "Prijs stijgt" },
      { id: "C", text: "Prijs blijft gelijk" },
    ],
    correctAnswer: gameConfig.puzzleAnswers.puzzle2,
    codeDigit: gameConfig.codeDigits.puzzle2,
  },
  {
    id: 3,
    question: "Welke marktvorm heeft maar één aanbieder?",
    type: "choice",
    choices: [
      { id: "A", text: "Oligopolie" },
      { id: "B", text: "Monopolie" },
      { id: "C", text: "Volledige mededinging" },
    ],
    correctAnswer: gameConfig.puzzleAnswers.puzzle3,
    codeDigit: gameConfig.codeDigits.puzzle3,
  },
  {
    id: 4,
    question: "Als prijzen over de hele linie stijgen, spreken we van:",
    type: "choice",
    choices: [
      { id: "A", text: "Inflatie" },
      { id: "B", text: "Deflatie" },
      { id: "C", text: "Stagnatie" },
    ],
    correctAnswer: gameConfig.puzzleAnswers.puzzle4,
    codeDigit: gameConfig.codeDigits.puzzle4,
  },
];

const TIMER_MINUTES = gameConfig.timerMinutes;

export default function PuzzlePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [answer, setAnswer] = useState("");
  const [collectedDigits, setCollectedDigits] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();

  // Initialize timer and load saved state
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("timeLeft");
    const startTime = localStorage.getItem("startTime");

    let initialTime = TIMER_MINUTES * 60;

    if (saved && startTime) {
      const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      initialTime = Math.max(0, parseInt(saved) - elapsed);
    } else {
      localStorage.setItem("startTime", Date.now().toString());
      localStorage.setItem("timeLeft", initialTime.toString());
    }

    setTimeLeft(initialTime);

    // Load saved puzzle progress
    const savedPuzzle = localStorage.getItem("currentPuzzle");
    const savedDigits = localStorage.getItem("collectedDigits");

    if (savedPuzzle) {
      setCurrentPuzzle(parseInt(savedPuzzle));
    }
    if (savedDigits) {
      setCollectedDigits(JSON.parse(savedDigits));
    }

    setIsLoading(false);
  }, []);

  // Handle timer
  useEffect(() => {
    if (isLoading) return;

    if (timeLeft <= 0) {
      localStorage.removeItem("timeLeft");
      localStorage.removeItem("startTime");
      localStorage.removeItem("collectedDigits");
      localStorage.removeItem("currentPuzzle");
      toast.error("De tijd is om! Je moet opnieuw beginnen.");
      router.push("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem("timeLeft", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router, isLoading]);

  // Persist puzzle progress
  useEffect(() => {
    if (isLoading) return;

    localStorage.setItem("currentPuzzle", currentPuzzle.toString());
    localStorage.setItem("collectedDigits", JSON.stringify(collectedDigits));
  }, [currentPuzzle, collectedDigits, isLoading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isCorrect =
      String(puzzle.correctAnswer).toLowerCase() === answer.toLowerCase();

    if (isCorrect) {
      toast.success("Correct! Op naar de volgende vraag.");
      if (puzzle.codeDigit) {
        const newDigits = [...collectedDigits, puzzle.codeDigit];
        setCollectedDigits(newDigits);
      }

      const nextPuzzle = currentPuzzle + 1;
      if (nextPuzzle === puzzles.length) {
        router.push("/code");
      } else {
        setCurrentPuzzle(nextPuzzle);
        setAnswer("");
      }
    } else {
      toast.error("Dat is niet het juiste antwoord. Probeer het nog eens!");
    }
  };

  const puzzle = puzzles[currentPuzzle];

  return (
    <main className="container max-w-2xl mx-auto min-h-screen flex flex-col items-center justify-center p-4">
      {isLoading ? (
        <div className="text-center">Laden...</div>
      ) : (
        <div className="w-full space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                Raadsel {currentPuzzle + 1} van {puzzles.length}
              </h1>
              <div
                className={`text-xl font-mono ${
                  timeLeft <= 60 ? "text-red-500 animate-pulse" : ""
                }`}
              >
                ⏱️ {formatTime(timeLeft)}
              </div>
            </div>
            <p className="text-lg text-center">{puzzle.question}</p>

            {/* Show collected code digits */}
            {collectedDigits.length > 0 && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-center font-medium">
                  Verzamelde code cijfers:
                </p>
                <div className="flex justify-center gap-2 mt-2">
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
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {puzzle.type === "input" ? (
              <div className="space-y-2">
                <Label htmlFor="answer">Jouw antwoord:</Label>
                <Input
                  id="answer"
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Voer je antwoord in..."
                  required
                />
              </div>
            ) : (
              <div className="grid gap-4">
                {puzzle.choices?.map((choice) => (
                  <Button
                    key={choice.id}
                    type="button"
                    variant={answer === choice.id ? "default" : "outline"}
                    className="justify-start text-left"
                    onClick={() => setAnswer(choice.id)}
                  >
                    {choice.id}. {choice.text}
                  </Button>
                ))}
              </div>
            )}

            <Button type="submit" className="w-full">
              Controleer antwoord
            </Button>
          </form>
        </div>
      )}
    </main>
  );
}
