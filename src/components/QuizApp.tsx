import { useEffect, useMemo, useRef, useState } from 'react';
import {
  branchFromAnswers,
  buildQuestions,
  computeScores,
  type Answers,
} from '../data/quiz';
import QuestionCard from './QuestionCard';
import LoadingScreen from './LoadingScreen';
import ResultScreen from './ResultScreen';

// How long the "analyzing" screen shows before the result (ms).
const RESULT_DELAY = 2600;

export default function QuizApp() {
  const [answers, setAnswers] = useState<Answers>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [resultReady, setResultReady] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const branch = branchFromAnswers(answers);
  const questions = useMemo(() => buildQuestions(branch), [branch]);
  const total = questions.length;

  const isResult = currentStep >= total;
  const question = isResult ? null : questions[currentStep];

  // When the quiz completes, show a brief loading step before the result.
  useEffect(() => {
    if (!isResult) {
      setResultReady(false);
      return;
    }
    setResultReady(false);
    const t = setTimeout(() => setResultReady(true), RESULT_DELAY);
    return () => clearTimeout(t);
  }, [isResult]);

  const goNext = () =>
    setCurrentStep((s) => Math.min(s + 1, total));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSelectSingle = (label: string) => {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: label }));
    // Small delay so the selection highlight is visible before advancing.
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(goNext, 220);
  };

  const handleToggleMulti = (label: string) => {
    if (!question) return;
    setAnswers((prev) => {
      const current = Array.isArray(prev[question.id])
        ? (prev[question.id] as string[])
        : [];
      const next = current.includes(label)
        ? current.filter((l) => l !== label)
        : [...current, label];
      return { ...prev, [question.id]: next };
    });
  };

  const handleSlider = (value: number) => {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const restart = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setAnswers({});
    setCurrentStep(0);
  };

  // Is the current question answered enough to continue?
  const currentAnswer = question ? answers[question.id] : undefined;
  const canContinue = (() => {
    if (!question) return false;
    if (question.type === 'slider') return true; // always has a value
    if (question.type === 'multi')
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    return typeof currentAnswer === 'string';
  })();

  if (isResult) {
    const scores = computeScores(answers, questions);
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-14">
        <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-olive-100 sm:p-10">
          {resultReady ? (
            <ResultScreen scores={scores} onRestart={restart} />
          ) : (
            <LoadingScreen />
          )}
        </div>
      </div>
    );
  }

  const progress = Math.round(((currentStep + 1) / total) * 100);
  // Slider and multi need an explicit continue button; single auto-advances.
  const showContinue =
    question?.type === 'slider' || question?.type === 'multi';

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-12">
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-olive-600">
          <span>
            Pitanje {currentStep + 1} / {total}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-olive-100">
          <div
            className="h-full rounded-full bg-olive-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-olive-100 sm:p-8">
        {question && (
          <QuestionCard
            key={question.id}
            question={question}
            answer={currentAnswer}
            onSelectSingle={handleSelectSingle}
            onToggleMulti={handleToggleMulti}
            onSlider={handleSlider}
          />
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={currentStep === 0}
            className="rounded-xl px-5 py-3 text-base font-semibold text-olive-600 transition-colors hover:bg-olive-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Nazad
          </button>

          {showContinue && (
            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue}
              className="rounded-xl bg-olive-600 px-8 py-3 text-base font-semibold text-white shadow transition-all hover:bg-olive-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentStep === total - 1 ? 'Prikaži rezultat' : 'Nastavi'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
