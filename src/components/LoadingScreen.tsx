import { useEffect, useState } from 'react';

const MESSAGES = [
  'Analiziramo tvoje odgovore...',
  'Uspoređujemo tvoje simptome...',
  'Pripremamo tvoj rezultat...',
];

export default function LoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev < MESSAGES.length - 1 ? prev + 1 : prev));
    }, 850);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="animate-step flex flex-col items-center justify-center py-16 text-center">
      <div
        className="h-16 w-16 animate-spin rounded-full border-4 border-olive-100 border-t-olive-600"
        role="status"
        aria-label="Učitavanje"
      />
      <p className="mt-8 text-lg font-semibold text-olive-800">
        {MESSAGES[index]}
      </p>
      <p className="mt-2 text-sm text-olive-500">Samo trenutak</p>
    </div>
  );
}
