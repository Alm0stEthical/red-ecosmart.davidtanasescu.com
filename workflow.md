# Project: Escape Room – Red EcoSmart!

## Framework
Next.js (React) + TailwindCSS

## Doel
Een interactieve escape room-website waarbij leerlingen vier economische raadsels oplossen en na het correct ingeven van de uiteindelijke 4-cijferige code toegang krijgen tot een succes-scherm met animatie. Na drie foutieve pogingen wordt de input geblokkeerd.

---

## Pagina's

### 1. Startpagina (`/`)
- Titel: 🏦 Escape Room: Red EcoSmart!
- Inleidingstekst (uit PDF):
  > Jullie zijn een team van jonge ondernemers en jullie bedrijf, EcoSmart, staat op de rand van faillissement! 🏢💸 Een cyberaanval heeft alle bankrekeningen vergrendeld, en jullie hebben 15 minuten om vier economische raadsels op te lossen om de codes te kraken en het bedrijf te redden.
- Startknop ➡️ naar raadsels

---

### 2. Puzzelpagina (`/puzzel`)
- Toon de vier opdrachten, één per keer (volgende knop na juist antwoord).
- Elke opdracht bevat een raadsel + invulveld of meerkeuze-opties.
- De correcte oplossingen zijn:
  1. 2500
  2. B (Prijs stijgt) → codecijfer 7
  3. B (Monopolie) → codecijfer 1
  4. A (Inflatie) → codecijfer 5
- Eindresultaat: leerlingen verzamelen de code `715` (gevolgd door hun winst van 2500, wat een hint is naar de eerste code).

---

### 3. Code-invoerpagina (`/code`)
- Titel: Voer de geheime code in om het bedrijf te redden!
- Inputveld voor 3-cijferige code
- Na max 3 pogingen zonder juiste code (`715`) → geblokkeerde boodschap en scherm rood.
- Bij correcte code: animatie (groene achtergrond + confetti) en boodschap:
  > 🎉 YES! De bankrekening is hersteld en EcoSmart is gered! 🎊

---

## Functionaliteiten
- 3 pogingen limiet op code-invoer
- Animaties (confetti) bij correcte code
- Foutmelding bij incorrecte poging
- (Optioneel) Timer zichtbaar op puzzelpagina voor extra spanning (15 min countdown)

## Stijl
- Heldere visuals en emoji’s
- Responsief voor mobiel
- Licht spel-element, educatief maar fun

## Extra
- Voeg een simpele admin-setting toe (in code of .env) om code/limiet aan te passen voor testdoeleinden

---

## Assets
- Confetti-animatie (lib: `react-confetti`)
- Iconen van Lucide
- Tailwind voor styling

---

## Optioneel
- Video-integratie (intro door David en Fraon)

