# Kviz o bolovima u leđima (Back Pain Lead-Gen Quiz)

Interaktivni kviz koji korisnika vodi kroz 13 pitanja i procjenjuje radi li se
vjerojatno o **mišićnoj boli** ili **problemu s diskom (diskus hernija)**, te ga
usmjerava na zakazivanje poziva.

## Stack

- **[Astro](https://astro.build/)** — stranica / build
- **React** (`@astrojs/react`) — interaktivni kviz (state machine, grananje, bodovanje)
- **Tailwind CSS v4** (`@tailwindcss/vite`) — stilovi

## Pokretanje lokalno

```bash
npm install
npm run dev
```

Otvori `http://localhost:4321`.

Ostale naredbe:

```bash
npm run build     # produkcijski build u ./dist
npm run preview   # lokalni preview builda
```

## Struktura

| Datoteka | Uloga |
| --- | --- |
| `src/pages/index.astro` | Landing (naslov, hero, "Započni kviz") |
| `src/components/QuizApp.tsx` | State machine: `currentStep`, `answers`, bodovi, grananje |
| `src/components/QuestionCard.tsx` | Prikaz pojedinog pitanja (single / multi / slider) |
| `src/components/ResultScreen.tsx` | Izračun rezultata + poziv na akciju |
| `src/data/quiz.ts` | Podaci pitanja, logika grananja (Q2 → A/B) i bodovanja |

## Logika

- **Grananje:** Q2 određuje granu — *Vrat / Srednji dio leđa* → Grana A,
  *Donja leđa* → Grana B. Grana mijenja samo Q3 i Q8.
- **Bodovanje:** svaki odgovor nosi `[M]` (mišić), `[D]` (disk) ili `[0]` (neutralno).
  Slider (Q6): 1–3 → `M`, 4–6 → neutralno, 7–10 → `D`.
- **Rezultat:** `disc >= muscle` → Diskus hernija; inače Mišićna bol.
- **CTA:** `https://forms.gle/LpJTyotdbtYYXKH49`.
