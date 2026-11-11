import { useState, useEffect } from 'react';
import { Play, Clock, Check } from 'lucide-react';

interface SpecLine {
  file: string;
  dots: string;
  duration: string;
}

const DEMO_SPECS: SpecLine[] = [
  { file: 'login.spec.ts', dots: '......................', duration: '(2.4s)' },
  { file: 'navigation.spec.ts', dots: '.................', duration: '(3.1s)' },
  { file: 'booking.spec.ts', dots: '....................', duration: '(4.7s)' },
  { file: 'api.spec.ts', dots: '........................', duration: '(1.9s)' },
];

export default function TerminalDemo() {
  const [visibleCount, setVisibleCount] = useState<number>(DEMO_SPECS.length);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setVisibleCount(DEMO_SPECS.length);
      return;
    }

    setVisibleCount(0);
    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      setVisibleCount(current);
      if (current >= DEMO_SPECS.length) {
        window.clearInterval(interval);
      }
    }, 320);

    return () => window.clearInterval(interval);
  }, []);

  const handleReplay = () => {
    setVisibleCount(0);
    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      setVisibleCount(current);
      if (current >= DEMO_SPECS.length) {
        window.clearInterval(interval);
      }
    }, 260);
  };

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        className="rounded-2xl border border-white/[0.08] bg-bg-secondary shadow-card-subtle overflow-hidden"
        aria-label="Demostración interactiva de terminal ejecutando Playwright"
      >
        {/* Top Window Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
          </div>

          <button
            type="button"
            onClick={handleReplay}
            title="Simulación visual demostrativa — Clic para repetir animación"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition"
          >
            <Play className="h-3 w-3 text-accent-lime" aria-hidden="true" />
            <span>Ejecución de pruebas (Playwright)</span>
            <span className="sr-only">Simulación Visual Demo</span>
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-6 font-mono text-xs sm:text-[13px] space-y-4 bg-bg-primary/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-text-primary">
              <span className="text-text-secondary">$</span>
              <span className="font-medium">npx playwright test</span>
            </div>
            <span className="rounded border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 text-[10px] text-text-secondary">
              Simulación Demo
            </span>
          </div>

          <div className="space-y-2.5 py-1" role="log" aria-live="polite">
            {DEMO_SPECS.map((spec, index) => {
              const visible = index < visibleCount;
              return (
                <div
                  key={spec.file}
                  className={`flex items-center justify-between gap-2 transition-opacity duration-200 ${
                    visible ? 'opacity-100' : 'opacity-20'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-emerald-400 font-bold" aria-hidden="true">
                      ✓
                    </span>
                    <span className="text-text-primary truncate">{spec.file}</span>
                    <span className="hidden sm:inline text-white/[0.15] tracking-widest">
                      {spec.dots}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-medium text-emerald-400">passed</span>
                    <span className="text-text-secondary">{spec.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-white/[0.06] pt-3.5 flex flex-wrap items-center justify-between gap-2">
            <p className="text-text-primary text-xs">
              Test Results:{' '}
              <span className="font-medium text-emerald-400">4 passed, 0 failed</span>
            </p>
            <p className="flex items-center gap-1.5 text-text-secondary text-xs">
              <Clock className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              <span>All tests passed in 12.1s</span>
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Check Badge */}
      <div
        aria-hidden="true"
        className="hidden sm:flex absolute -right-3 bottom-5 h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-surface shadow-card-subtle"
      >
        <Check className="h-5 w-5 stroke-[2.5] text-accent-lime" />
      </div>
    </div>
  );
}
