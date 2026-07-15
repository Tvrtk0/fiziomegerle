import type { Scores } from '../data/quiz';

const BOOKING_URL = 'https://forms.gle/LpJTyotdbtYYXKH49';

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
