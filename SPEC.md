# SPEC.md - Back Pain Lead Generation Quiz

## 1. Project Overview
Build a lead-generation interactive quiz application for a back pain specialist. The quiz helps users determine if their back pain is likely a "Muscle Pain" (Mišićna bol) or a "Disc Hernia" (Diskus hernija). 

## 2. Technology Stack
* **Framework:** Astro.js
* **UI/State Management:** React.js (via `@astrojs/react` integration) - crucial for handling the quiz state, step-by-step navigation, conditional logic, and score calculation.
* **Styling:** Tailwind CSS.

## 3. Visual Identity & Branding
* **Theme:** Olive Green and White.
* **Primary Elements (Buttons, Headers):** Olive Green (`#6B705C` or Tailwind `bg-lime-800` / `bg-emerald-700` equivalent).
* **Backgrounds:** White or very light off-white/olive tint.
* **Pain Scale Accent:** A custom slider/range input that visually transitions from Green (1, mild pain) to Red (10, severe pain).

## 4. Application Architecture
* **`src/pages/index.astro`**: Main landing page. Contains:
  * Title: "Otkrij koju vrstu boli imaš u leđima"
  * A placeholder for a hero image.
  * A "Započni kviz" (Start Quiz) button that mounts or reveals the React quiz component.
* **`src/components/QuizApp.tsx`**: Main state machine. Tracks `currentStep`, `userAnswers`, `muscleScore` (integer), and `discScore` (integer).
* **`src/components/ResultScreen.tsx`**: Calculates the final result based on scores and displays the outcome and Call-to-Action.

## 5. Quiz Data & Branching Logic
The quiz requires conditional routing based on the answer to Q2. 

### Scoring Legend for the Agent:
* `[M]` = +1 to Muscle Score
* `[D]` = +1 to Disc Score
* `[0]` = 0 points (Neutral / Demographic / Logic routing)

### Questions Flow:

**Q1: Izaberi spol**
* Muško `[0]`
* Žensko `[0]`

**Q2: Gdje imaš bol?** *(Note: Below this, put non-bold text: "izaberi mjesto gdje te najviše boli")*
* Vrat `[0]` -> *Triggers Branch A*
* Srednji dio leđa `[0]` -> *Triggers Branch A*
* Donja leđa `[0]` -> *Triggers Branch B*

**Q3 (Branch A - Vrat / Srednji dio leđa): Da li ti se bol spušta niz ruku?**
* Da `[D]`
* Ne `[0]`

**Q3 (Branch B - Donja leđa): Da li ti se bol spušta niz nogu?**
* Da `[D]`
* Ne `[0]`

**Q4: Kako bi opisao bol?**
* Tupa bol `[M]`
* Oštra bol `[D]`
* Osjećam kao da nosim teret na leđima, zatezanje `[M]`
* Povremena, nepravilna bol `[0]`

**Q5: Koliko često osjećaš bol?**
* Skoro svaki dan, ali slabijeg intenziteta `[M]`
* Povremeno, ali kad krene, boli jako `[D]`
* Nekad se pojavi, nekad potpuno nestane `[0]`

**Q6: Kolika je bol?** *(UI Note: Must be a slider from 1-10. Label start: "blaga", Label end: "neizdrživa")*
* 1-3 `[M]`
* 4-6 `[0]`
* 7-10 `[D]`

**Q7: Koliko dugo imaš bol?**
* Manje od mjesec dana `[M]`
* 1-3 mjeseca `[0]`
* 6-12 mjeseci `[D]`
* Preko godinu dana `[D]`

**Q8 (Branch B - Donja leđa): Kada te najviše boli?**
* Nakon dugotrajnog sjedenja i stajanja `[M]`
* Kad se sagnem ili naglo okrenem `[D]`
* Ujutro čim ustanem `[D]`

**Q8 (Branch A - Vrat / Srednji dio leđa): Kada te najviše boli?**
* Nakon dugotrajnog gledanja u mobitel, sjedenja ili stajanja `[M]`
* Kad dižem nešto teško `[D]`
* Ujutro čim se ustanem `[D]`

**Q9: Što ti obično pomaže smanjiti bol?**
* Kad se razgibam ili istegnem `[M]`
* Kad legnem i nađem odgovarajući položaj `[D]`
* Ništa posebno, bol mi se ne smanjuje `[0]`

**Q10: Što ti najviše pogoršava bol?**
* Dugotrajno sjedenje ili stajanje `[M]`
* Saginjanje i dizanje teških predmeta `[D]`
* Manjak sna i stres `[0]`

**Q11: Koji osjećaj još imaš u tijelu osim boli?**
* Ukočenost i zakočenost u mišićima `[M]`
* Trnjenje ili slabost u rukama ili nogama `[D]`
* Osjećam se umorno i napeto `[0]`

**Q12: Je si li već probao nešto da riješiš problem?**
* Da, vježbe mi pomažu `[M]`
* Da, ali nikad nisam bio konstantan `[0]`
* Ne, čekao sam da prođe samo od sebe `[0]`

**Q13: Koji ti je cilj?** *(Note: Multiple choice allowed. Subtitle: "ako imaš cilj, veće su šanse da se budeš dosljedan u procesu.")*
* Probuditi se bez boli `[0]`
* Vratiti se tjelesnim aktivnostima `[0]`
* Igrati se sa djecom bez boli `[0]`
* Popraviti držanje i vratiti samopouzdanje `[0]`
* Smršaviti `[0]`
* Dobiti mišićnu masu `[0]`
* Riješiti se boli bez operacije i ovisnosti o lijekovima `[0]`

## 6. Results Logic & Text
After Q13, compare `muscleScore` and `discScore`. 
Prefix the result with: "Na osnovu tvojih odgovora vjerojatno se radi o:"

### Condition A: If `discScore` >= `muscleScore` (Diskus hernija)
**Title:** Diskus hernija/problemi s diskom (Color this green in UI)
**Text:** 
Hernija diska nastaje kada meki, gelasti unutarnji dio intervertebralnog diska (nucleus pulposus) prodre kroz vanjski, čvršći sloj (annulus fibrosus). To može pritisnuti obližnje živce u kralježničnom kanalu.
U većini slučajeva ovo stanje **nije za operaciju**, može se riješiti **fizikalnom terapijom i vježbama**. Ako odgađaš rehabilitaciju, stanje se može samo **pogoršati**.
**Karakteristike:** oštra, probadajuća bol, koja se širi niz ruke ili noge, trnjenje ili slabost, bol se povećava prilikom pokreta i prilikom dugotrajnog mirovanja i sjedenja.

### Condition B: If `muscleScore` > `discScore` (Mišićna bol)
**Title:** Bol u mišićima (Color this red in UI)
**Text:** 
Mišićna bol je osjećaj boli, napetosti ili nelagode u jednom ili više mišića u tijelu. Može biti blaga i prolazna ili jaka i dugotrajna, ovisno o uzroku.
Problem ne zahtjeva operaciju, te se može potpuno riješiti uz primjerenu rehabilitaciju.
**Karakteristike:** tupa bol, osjećaj napetosti, lokalizirana bol, poboljšanje s vježbom i istezanjem, pogoršanje sa dugotrajnim statičkim opterećenjem.

## 7. Final Call to Action (Appears on both results)
* Text above button: "Kreni ka životu bez boli"
* Button Text: "Zakaži poziv"
* Button Action: Redirect to `https://forms.gle/LpJTyotdbtYYXKH49`

## Instructions for Agent Execution
1. Set up Astro with Tailwind and React.
2. Create the exact data structure reflecting the questions, options, and logic defined above.
3. Build a fully functional React state machine for the quiz flow. Ensure branching (Q2 -> Q3 & Q8) works flawlessly.
4. Implement the UI paying close attention to mobile responsiveness.
5. Provide all the files necessary to run this web app locally.
