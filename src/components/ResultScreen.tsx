import type { Scores } from '../data/quiz';

const BOOKING_URL = 'https://forms.gle/LpJTyotdbtYYXKH49';
const INSTAGRAM_URL = 'https://www.instagram.com/patrik_megerle/';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.7a2.1 2.1 0 0 0-.68-1.06 2.1 2.1 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32-1.24-.06-1.6-.07-4.74-.07Zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92Zm0 1.62a3.84 3.84 0 1 0 0 7.68 3.84 3.84 0 0 0 0-7.68Zm5.65-2.91a1.28 1.28 0 1 1 0 2.56 1.28 1.28 0 0 1 0-2.56Z" />
    </svg>
  );
}

interface Props {
  scores: Scores;
  onRestart: () => void;
}

export default function ResultScreen({ scores, onRestart }: Props) {
  // Per SPEC: disc wins ties.
  const isDisc = scores.disc >= scores.muscle;

  return (
    <div className="animate-step">
      <p className="text-center text-base font-medium text-olive-600">
        Na osnovu tvojih odgovora vjerojatno se radi o:
      </p>

      {isDisc ? <DiscResult /> : <MuscleResult />}

      {/* Call to action (both results) */}
      <div className="mt-10 rounded-2xl bg-olive-600 px-6 py-8 text-center shadow-md">
        <p className="text-xl font-semibold text-white sm:text-2xl">
          Kreni ka životu bez boli
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-xl bg-white px-8 py-4 text-lg font-bold text-olive-700 shadow transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Zakaži poziv
        </a>
      </div>

      {/* Instagram follow */}
      <div className="mt-6 text-center">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-olive-200 px-5 py-3 text-sm font-semibold text-olive-700 transition-colors hover:bg-olive-50"
        >
          <InstagramIcon className="h-5 w-5" />
          Prati Patrika na Instagramu
        </a>
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onRestart}
          className="text-sm font-medium text-olive-500 underline underline-offset-4 hover:text-olive-700"
        >
          Ponovi kviz
        </button>
      </div>
    </div>
  );
}

function DiscResult() {
  return (
    <section className="mt-4">
      <h2 className="text-center text-3xl font-extrabold text-emerald-600 sm:text-4xl">
        Diskus hernija/problemi s diskom
      </h2>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-olive-800">
        <p>
          Hernija diska nastaje kada meki, gelasti unutarnji dio
          intervertebralnog diska (nucleus pulposus) prodre kroz vanjski,
          čvršći sloj (annulus fibrosus). To može pritisnuti obližnje živce u
          kralježničnom kanalu.
        </p>
        <p>
          U većini slučajeva ovo stanje <strong>nije za operaciju</strong>,
          može se riješiti{' '}
          <strong>fizikalnom terapijom i vježbama</strong>. Ako odgađaš
          rehabilitaciju, stanje se može samo <strong>pogoršati</strong>.
        </p>
        <p>
          <strong>Karakteristike:</strong> oštra, probadajuća bol, koja se širi
          niz ruke ili noge, trnjenje ili slabost, bol se povećava prilikom
          pokreta i prilikom dugotrajnog mirovanja i sjedenja.
        </p>
      </div>
    </section>
  );
}

function MuscleResult() {
  return (
    <section className="mt-4">
      <h2 className="text-center text-3xl font-extrabold text-red-600 sm:text-4xl">
        Bol u mišićima
      </h2>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-olive-800">
        <p>
          Mišićna bol je osjećaj boli, napetosti ili nelagode u jednom ili više
          mišića u tijelu. Može biti blaga i prolazna ili jaka i dugotrajna,
          ovisno o uzroku.
        </p>
        <p>
          Problem ne zahtjeva operaciju, te se može potpuno riješiti uz
          primjerenu rehabilitaciju.
        </p>
        <p>
          <strong>Karakteristike:</strong> tupa bol, osjećaj napetosti,
          lokalizirana bol, poboljšanje s vježbom i istezanjem, pogoršanje sa
          dugotrajnim statičkim opterećenjem.
        </p>
      </div>
    </section>
  );
}
