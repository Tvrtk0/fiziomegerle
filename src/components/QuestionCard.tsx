import { useState } from 'react';
import type { Question } from '../data/quiz';

interface Props {
  question: Question;
  /** Current stored answer for this question, if any. */
  answer: string | string[] | number | undefined;
  /** Called when the user picks a single-choice option (auto-advances). */
  onSelectSingle: (label: string) => void;
  /** Called on every multi-select toggle. */
  onToggleMulti: (label: string) => void;
  /** Called on slider change. */
  onSlider: (value: number) => void;
}

function painColor(value: number): string {
  // green (1) -> red (10)
  if (value <= 3) return '#22c55e';
  if (value <= 6) return '#eab308';
  if (value <= 8) return '#f97316';
  return '#ef4444';
}

export default function QuestionCard({
  question,
  answer,
  onSelectSingle,
  onToggleMulti,
  onSlider,
}: Props) {
  return (
    <div className="animate-step">
      <h2 className="text-2xl font-bold leading-snug text-olive-800 sm:text-3xl">
        {question.title}
      </h2>
      {question.subtitle && (
        <p className="mt-2 text-base text-olive-600">{question.subtitle}</p>
      )}

      <div className="mt-6">
        {question.type === 'single' && (
          <SingleChoice
            question={question}
            selected={typeof answer === 'string' ? answer : undefined}
            onSelect={onSelectSingle}
          />
        )}

        {question.type === 'multi' && (
          <MultiChoice
            question={question}
            selected={Array.isArray(answer) ? answer : []}
            onToggle={onToggleMulti}
          />
        )}

        {question.type === 'slider' && question.slider && (
          <PainSlider
            config={question.slider}
            value={typeof answer === 'number' ? answer : 5}
            onChange={onSlider}
          />
        )}
      </div>
    </div>
  );
}

function SingleChoice({
  question,
  selected,
  onSelect,
}: {
  question: Question;
  selected: string | undefined;
  onSelect: (label: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {question.options?.map((opt) => {
        const isSelected = selected === opt.label;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => onSelect(opt.label)}
            className={[
              'w-full rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-all',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-400',
              isSelected
                ? 'border-olive-600 bg-olive-600 text-white shadow-md'
                : 'border-olive-200 bg-white text-olive-800 hover:border-olive-400 hover:bg-olive-50',
            ].join(' ')}
            aria-pressed={isSelected}
          >
            <span className="flex items-center gap-3">
              <span
                className={[
                  'flex h-5 w-5 flex-none items-center justify-center rounded-full border-2',
                  isSelected
                    ? 'border-white bg-white'
                    : 'border-olive-300',
                ].join(' ')}
              >
                {isSelected && (
                  <span className="h-2.5 w-2.5 rounded-full bg-olive-600" />
                )}
              </span>
              <span>{opt.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function MultiChoice({
  question,
  selected,
  onToggle,
}: {
  question: Question;
  selected: string[];
  onToggle: (label: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {question.options?.map((opt) => {
        const isSelected = selected.includes(opt.label);
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => onToggle(opt.label)}
            className={[
              'w-full rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-all',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-400',
              isSelected
                ? 'border-olive-600 bg-olive-600 text-white shadow-md'
                : 'border-olive-200 bg-white text-olive-800 hover:border-olive-400 hover:bg-olive-50',
            ].join(' ')}
            aria-pressed={isSelected}
          >
            <span className="flex items-center gap-3">
              <span
                className={[
                  'flex h-5 w-5 flex-none items-center justify-center rounded-md border-2',
                  isSelected ? 'border-white bg-white' : 'border-olive-300',
                ].join(' ')}
              >
                {isSelected && (
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5 text-olive-600"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
              <span>{opt.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PainSlider({
  config,
  value,
  onChange,
}: {
  config: { min: number; max: number; startLabel: string; endLabel: string };
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="pt-2">
      <div className="mb-6 flex justify-center">
        <span
          className="flex h-20 w-20 items-center justify-center rounded-full text-4xl font-extrabold text-white shadow-md transition-colors"
          style={{ backgroundColor: painColor(value) }}
        >
          {value}
        </span>
      </div>

      <input
        type="range"
        className="pain-slider"
        min={config.min}
        max={config.max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Jačina boli"
      />

      <div className="mt-3 flex justify-between text-sm font-medium text-olive-600">
        <span>{config.startLabel}</span>
        <span>{config.endLabel}</span>
      </div>
    </div>
  );
}
