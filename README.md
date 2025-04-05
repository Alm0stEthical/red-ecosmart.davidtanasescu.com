# Red EcoSmart! Escape Room

Een interactieve escape room-website waarbij leerlingen vier economische raadsels oplossen.

## Game Configuratie

Je kunt de volgende omgevingsvariabelen instellen om het spel aan te passen:

```env
# Code instellingen
ADMIN_CODE=715        # De geheime code
MAX_ATTEMPTS=3        # Maximaal aantal pogingen
TIMER_MINUTES=15      # Tijd in minuten

# Antwoorden voor de puzzels
PUZZLE1_ANSWER=2500   # Antwoord voor puzzel 1 (winst)
PUZZLE2_ANSWER=B      # Antwoord voor puzzel 2 (prijs)
PUZZLE3_ANSWER=B      # Antwoord voor puzzel 3 (monopolie)
PUZZLE4_ANSWER=A      # Antwoord voor puzzel 4 (inflatie)

# Code cijfers
CODE_DIGIT_2=7        # Code cijfer van puzzel 2
CODE_DIGIT_3=1        # Code cijfer van puzzel 3
CODE_DIGIT_4=5        # Code cijfer van puzzel 4
```

## Features

- ✅ 4 economische raadsels
- ✅ 15-minuten timer
- ✅ 3 pogingen limiet voor de code
- ✅ Confetti animatie bij succes
- ✅ Responsief ontwerp
- ✅ Configureerbare instellingen

## Technologie

- Next.js (React)
- TypeScript
- TailwindCSS
- ShadcN UI
- Sonner voor notificaties
- React Confetti
