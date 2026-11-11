import { useState } from 'react';
import { LayoutGrid, Building2, Code2, Zap, Settings, Check } from 'lucide-react';
import TechLogo from '../ui/TechLogo';

type CategoryFilter = 'all' | 'web' | 'api' | 'performance' | 'e2e';

interface CaseStudyCardData {
  slug: string;
  title: string;
  isPrimary?: boolean;
  description: string;
  image: string;
  categories: CategoryFilter[];
  techBadges: { label: string; logoId: string }[];
  checklist: string[];
}

const SIDEBAR_FILTERS: {
  id: CategoryFilter;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'all', label: 'Todos los proyectos', icon: LayoutGrid },
  { id: 'web', label: 'Web Testing', icon: Building2 },
  { id: 'api', label: 'API Testing', icon: Code2 },
  { id: 'performance', label: 'Performance', icon: Zap },
  { id: 'e2e', label: 'Automatización E2E', icon: Settings },
];

const CASE_STUDIES: CaseStudyCardData[] = [
  {
    slug: 'hotel-asturias',
    title: 'Hotel Asturias — QA Automation',
    isPrimary: true,
    description:
      'Testing y automatización de una aplicación web basada en Next.js con WordPress Headless como CMS y consumo de APIs REST.',
    image: '/images/projects/case-hotel-asturias.png',
    categories: ['all', 'web', 'api', 'performance', 'e2e'],
    techBadges: [
      { label: 'Next.js', logoId: 'nextjs' },
      { label: 'TypeScript', logoId: 'typescript' },
      { label: 'React', logoId: 'react' },
      { label: 'WordPress', logoId: 'wordpress' },
    ],
    checklist: [
      'E2E Testing (Playwright)',
      'API Testing (REST)',
      'Regresión de contenido (CMS)',
      'Performance (JMeter)',
    ],
  },
  {
    slug: 'shoot-studio',
    title: 'Shoot Studio — Web Testing',
    description:
      'Validación funcional y de contenido en una web fotográfica desarrollada con Next.js y WordPress REST API.',
    image: '/images/projects/case-shoot-studio.png',
    categories: ['all', 'web', 'api'],
    techBadges: [
      { label: 'Next.js', logoId: 'nextjs' },
      { label: 'React', logoId: 'react' },
      { label: 'TypeScript', logoId: 'typescript' },
      { label: 'WordPress', logoId: 'wordpress' },
    ],
    checklist: [
      'Pruebas funcionales',
      'Validación de multimedia',
      'Navegación y UX',
      'Consumo de APIs REST',
    ],
  },
  {
    slug: 'supabase-auth',
    title: 'Supabase Auth — API & Functional Testing',
    description:
      'Pruebas de autenticación, registro y gestión de sesiones utilizando Supabase como backend.',
    image: '/images/projects/case-supabase-auth.png',
    categories: ['all', 'api', 'e2e'],
    techBadges: [
      { label: 'Supabase', logoId: 'supabase' },
      { label: 'TypeScript', logoId: 'typescript' },
      { label: 'Playwright', logoId: 'playwright' },
      { label: 'API REST', logoId: 'postman' },
    ],
    checklist: [
      'Flujos de autenticación',
      'Validación de formularios',
      'Casos positivos y negativos',
      'Manejo de sesiones',
    ],
  },
];

export default function ProjectsCatalog() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const visibleStudies = CASE_STUDIES.filter((cs) => cs.categories.includes(activeFilter));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left Sidebar with subtle neutral active state */}
      <aside className="lg:col-span-3">
        <div className="rounded-2xl border border-white/[0.07] bg-bg-secondary p-2.5 space-y-1">
          {SIDEBAR_FILTERS.map((filter) => {
            const Icon = filter.icon;
            const isSelected = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime/60 sm:text-sm ${
                  isSelected
                    ? 'border border-white/[0.09] bg-surface text-text-primary'
                    : 'text-text-secondary hover:bg-surface/60 hover:text-text-primary'
                }`}
              >
                {isSelected && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent-lime"
                    aria-hidden="true"
                  />
                )}
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    isSelected ? 'text-accent-lime' : 'text-text-secondary'
                  }`}
                  aria-hidden="true"
                />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Right Column: 3 Stacked Horizontal Project Cards */}
      <div className="space-y-4 lg:col-span-9">
        {visibleStudies.map((study) => (
          <article
            key={study.slug}
            className="grid grid-cols-1 items-center gap-6 rounded-2xl border border-white/[0.07] bg-bg-secondary p-4 transition duration-200 hover:border-white/[0.15] md:grid-cols-12 sm:p-5"
          >
            {/* Zone 1: Left Mockup Image */}
            <div className="md:col-span-4 overflow-hidden rounded-xl border border-white/[0.06] bg-bg-primary">
              <img
                src={study.image}
                alt={`Vista previa del proyecto ${study.title}`}
                width="400"
                height="190"
                loading="lazy"
                className="h-44 w-full object-cover opacity-90 md:h-[164px]"
              />
            </div>

            {/* Zone 2: Center Title, Description & Tech Pills */}
            <div className="space-y-3 md:col-span-5">
              {study.isPrimary && (
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-lime/30 bg-accent-lime/10 px-2.5 py-0.5 text-[11px] font-medium text-accent-lime">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" aria-hidden="true" />
                    Proyecto principal
                  </span>
                </div>
              )}

              <h2 className="text-lg font-semibold text-text-primary sm:text-xl">
                <a href={`/projects/${study.slug}`} className="hover:text-accent-lime transition-colors">
                  {study.title}
                </a>
              </h2>

              <p className="text-xs leading-relaxed text-text-secondary sm:text-[13px]">
                {study.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {study.techBadges.map((tb) => (
                  <span
                    key={tb.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-surface px-2.5 py-1 text-xs text-text-secondary"
                  >
                    <TechLogo id={tb.logoId} className="h-3.5 w-3.5 shrink-0" />
                    <span>{tb.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Zone 3: Right Checklist + Subtle Button */}
            <div className="flex flex-col justify-between space-y-4 border-t border-white/[0.06] pt-4 md:col-span-3 md:border-l md:border-t-0 md:pl-5 md:pt-0">
              <ul className="space-y-2 text-xs text-text-secondary">
                {study.checklist.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent-lime" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div>
                <a
                  href={`/projects/${study.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-surface px-4 py-2 text-xs font-medium text-text-primary transition hover:border-accent-lime/40 hover:text-accent-lime focus:outline-none"
                >
                  <span>Ver caso de estudio</span>
                  <span className="text-accent-lime" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
