// Quiz data + scoring/branching logic.
//
// Scoring legend (from SPEC):
//   'M' = +1 Muscle score   (Mišićna bol)
//   'D' = +1 Disc score     (Diskus hernija)
//   'N' = 0 points          (Neutral / demographic / routing)

export type ScoreTag = 'M' | 'D' | 'N';

/** Q2 routes the flow into one of two branches. */
export type Branch = 'A' | 'B';
//  Branch A = Vrat / Srednji dio leđa
//  Branch B = Donja leđa

export type QuestionType = 'single' | 'multi' | 'slider';

export interface QuizOption {
  label: string;
  score: ScoreTag;
  /** Only used by Q2 options to select the branch. */
  branch?: Branch;
}

export interface SliderConfig {
  min: number;
  max: number;
  startLabel: string;
  endLabel: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options?: QuizOption[];
  slider?: SliderConfig;
}

/** A single answer: option label (single), labels (multi), or number (slider). */
export type Answer = string | string[] | number;
export type Answers = Record<string, Answer>;

// --- Shared questions -------------------------------------------------------

const Q1: Question = {
  id: 'q1',
  title: 'Izaberi spol',
  type: 'single',
  options: [
    { label: 'Muško', score: 'N' },
    { label: 'Žensko', score: 'N' },
  ],
};

const Q2: Question = {
  id: 'q2',
  title: 'Gdje imaš bol?',
  subtitle: 'izaberi mjesto gdje te najviše boli',
  type: 'single',
  options: [
    { label: 'Vrat', score: 'N', branch: 'A' },
    { label: 'Srednji dio leđa', score: 'N', branch: 'A' },
    { label: 'Donja leđa', score: 'N', branch: 'B' },
  ],
};

const Q3_A: Question = {
  id: 'q3a',
  title: 'Da li ti se bol spušta niz ruku?',
  type: 'single',
  options: [
    { label: 'Da', score: 'D' },
    { label: 'Ne', score: 'N' },
  ],
};

const Q3_B: Question = {
  id: 'q3b',
  title: 'Da li ti se bol spušta niz nogu?',
  type: 'single',
  options: [
    { label: 'Da', score: 'D' },
    { label: 'Ne', score: 'N' },
  ],
};

const Q4: Question = {
  id: 'q4',
  title: 'Kako bi opisao bol?',
  type: 'single',
  options: [
    { label: 'Tupa bol', score: 'M' },
    { label: 'Oštra bol', score: 'D' },
    { label: 'Osjećam kao da nosim teret na leđima, zatezanje', score: 'M' },
    { label: 'Povremena, nepravilna bol', score: 'N' },
  ],
};

const Q5: Question = {
  id: 'q5',
  title: 'Koliko često osjećaš bol?',
  type: 'single',
  options: [
    { label: 'Skoro svaki dan, ali slabijeg intenziteta', score: 'M' },
    { label: 'Povremeno, ali kad krene, boli jako', score: 'D' },
    { label: 'Nekad se pojavi, nekad potpuno nestane', score: 'N' },
  ],
};

const Q6: Question = {
  id: 'q6',
  title: 'Kolika je bol?',
  type: 'slider',
  // 1-3 -> M, 4-6 -> N, 7-10 -> D (handled in computeScores)
  slider: { min: 1, max: 10, startLabel: 'blaga', endLabel: 'neizdrživa' },
};

const Q7: Question = {
  id: 'q7',
  title: 'Koliko dugo imaš bol?',
  type: 'single',
  options: [
    { label: 'Manje od mjesec dana', score: 'M' },
    { label: '1-3 mjeseca', score: 'N' },
    { label: '6-12 mjeseci', score: 'D' },
    { label: 'Preko godinu dana', score: 'D' },
  ],
};

const Q8_A: Question = {
  id: 'q8a',
  title: 'Kada te najviše boli?',
  type: 'single',
  options: [
    {
      label: 'Nakon dugotrajnog gledanja u mobitel, sjedenja ili stajanja',
      score: 'M',
    },
    { label: 'Kad dižem nešto teško', score: 'D' },
    { label: 'Ujutro čim se ustanem', score: 'D' },
  ],
};

const Q8_B: Question = {
  id: 'q8b',
  title: 'Kada te najviše boli?',
  type: 'single',
  options: [
    { label: 'Nakon dugotrajnog sjedenja i stajanja', score: 'M' },
    { label: 'Kad se sagnem ili naglo okrenem', score: 'D' },
    { label: 'Ujutro čim ustanem', score: 'D' },
  ],
};

const Q9: Question = {
  id: 'q9',
  title: 'Što ti obično pomaže smanjiti bol?',
  type: 'single',
  options: [
    { label: 'Kad se razgibam ili istegnem', score: 'M' },
    { label: 'Kad legnem i nađem odgovarajući položaj', score: 'D' },
    { label: 'Ništa posebno, bol mi se ne smanjuje', score: 'N' },
  ],
};

const Q10: Question = {
  id: 'q10',
  title: 'Što ti najviše pogoršava bol?',
  type: 'single',
  options: [
    { label: 'Dugotrajno sjedenje ili stajanje', score: 'M' },
    { label: 'Saginjanje i dizanje teških predmeta', score: 'D' },
    { label: 'Manjak sna i stres', score: 'N' },
  ],
};

const Q11: Question = {
  id: 'q11',
  title: 'Koji osjećaj još imaš u tijelu osim boli?',
  type: 'single',
  options: [
    { label: 'Ukočenost i zakočenost u mišićima', score: 'M' },
    { label: 'Trnjenje ili slabost u rukama ili nogama', score: 'D' },
    { label: 'Osjećam se umorno i napeto', score: 'N' },
  ],
};

const Q12: Question = {
  id: 'q12',
  title: 'Je si li već probao nešto da riješiš problem?',
  type: 'single',
  options: [
    { label: 'Da, vježbe mi pomažu', score: 'M' },
    { label: 'Da, ali nikad nisam bio konstantan', score: 'N' },
    { label: 'Ne, čekao sam da prođe samo od sebe', score: 'N' },
  ],
};

const Q13: Question = {
  id: 'q13',
  title: 'Koji ti je cilj?',
  subtitle:
    'ako imaš cilj, veće su šanse da se budeš dosljedan u procesu.',
  type: 'multi',
  options: [
    { label: 'Probuditi se bez boli', score: 'N' },
    { label: 'Vratiti se tjelesnim aktivnostima', score: 'N' },
    { label: 'Igrati se sa djecom bez boli', score: 'N' },
    { label: 'Popraviti držanje i vratiti samopouzdanje', score: 'N' },
    { label: 'Smršaviti', score: 'N' },
    { label: 'Dobiti mišićnu masu', score: 'N' },
    {
      label: 'Riješiti se boli bez operacije i ovisnosti o lijekovima',
      score: 'N',
    },
  ],
};

/**
 * Build the ordered question list for a branch.
 * Both branches produce 13 questions; only Q3 and Q8 differ.
 */
export function buildQuestions(branch: Branch): Question[] {
  return [
    Q1,
    Q2,
    branch === 'A' ? Q3_A : Q3_B,
    Q4,
    Q5,
    Q6,
    Q7,
    branch === 'A' ? Q8_A : Q8_B,
    Q9,
    Q10,
    Q11,
    Q12,
    Q13,
  ];
}

/** Derive the active branch from the Q2 answer (defaults to 'A'). */
export function branchFromAnswers(answers: Answers): Branch {
  const q2 = answers['q2'];
  if (typeof q2 === 'string') {
    const opt = Q2.options?.find((o) => o.label === q2);
    if (opt?.branch) return opt.branch;
  }
  return 'A';
}

export interface Scores {
  muscle: number;
  disc: number;
}

/**
 * Recompute scores from scratch over the currently active questions.
 * Recomputing (vs. incrementing) keeps scores correct when the user
 * goes back and changes an answer or switches branch.
 */
export function computeScores(answers: Answers, questions: Question[]): Scores {
  let muscle = 0;
  let disc = 0;

  for (const q of questions) {
    const a = answers[q.id];
    if (a == null) continue;

    if (q.type === 'slider') {
      const v = typeof a === 'number' ? a : Number(a);
      if (v >= 1 && v <= 3) muscle++;
      else if (v >= 7 && v <= 10) disc++;
      // 4-6 -> neutral
    } else if (q.type === 'single') {
      const opt = q.options?.find((o) => o.label === a);
      if (opt?.score === 'M') muscle++;
      else if (opt?.score === 'D') disc++;
    }
    // 'multi' (Q13) options are all neutral -> no scoring
  }

  return { muscle, disc };
}
