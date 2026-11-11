import { technologiesData } from '../../data/skills';
import TechLogo from '../ui/TechLogo';

export default function TechGrid() {
  // Duplicate array twice for a seamless 0% -> -50% infinite loop
  const loopItems = [...technologiesData, ...technologiesData];

  return (
    <div
      className="relative w-full max-w-full overflow-hidden py-1.5 marquee-fade-mask [contain:paint]"
      aria-label="Marquesina en bucle de tecnologías que utilizo"
    >
      <div className="animate-tech-marquee gap-3 pr-3">
        {loopItems.map((tech, index) => {
          const isDuplicate = index >= technologiesData.length;
          return (
            <div
              key={`${tech.id}-${index}`}
              aria-hidden={isDuplicate ? 'true' : undefined}
              title={`${tech.name} — ${tech.description}`}
              className="group flex shrink-0 items-center justify-center gap-2.5 rounded-xl border border-white/[0.07] bg-bg-secondary px-4 py-2.5 transition duration-200 hover:border-white/[0.16] hover:bg-surface"
            >
              <TechLogo id={tech.id} className="h-4 w-4 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors whitespace-nowrap sm:text-[13px]">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
