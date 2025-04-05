// Game configuration
export const gameConfig = {
  // Code settings
  code: process.env.ADMIN_CODE || "715",
  maxAttempts: Number(process.env.MAX_ATTEMPTS) || 3,
  timerMinutes: Number(process.env.TIMER_MINUTES) || 15,

  // Puzzle settings
  puzzleAnswers: {
    puzzle1: Number(process.env.PUZZLE1_ANSWER) || 2500,
    puzzle2: process.env.PUZZLE2_ANSWER || "B",
    puzzle3: process.env.PUZZLE3_ANSWER || "B",
    puzzle4: process.env.PUZZLE4_ANSWER || "A",
  },

  // Code digits (in order)
  codeDigits: {
    puzzle2: process.env.CODE_DIGIT_2 || "7",
    puzzle3: process.env.CODE_DIGIT_3 || "1",
    puzzle4: process.env.CODE_DIGIT_4 || "5",
  },
};
