import React, { useState, useMemo } from 'react';
import {
  ARIONZ_CONCEPTS,
  ARCHIVE_CATEGORIES,
  RELATED_RESEARCH_DIRECTIONS,
  ArionzConcept,
  ConceptCategory,
} from './data/arionzConcepts';
import {
  filterConcepts,
  getCategoryCounts,
} from './utils/archiveLogic';
import { generateStandaloneSourcePreview } from './utils/exportStandaloneHtml';
import { MasterDossierModal } from './components/MasterDossierModal';
import {
  Search,
  X,
  BookOpen,
  Code2,
  Copy,
  Check,
  ArrowUpRight,
} from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<ConceptCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDossier, setActiveDossier] = useState<ArionzConcept | null>(
    null
  );
  const [showSourceSchema, setShowSourceSchema] = useState<boolean>(false);
  const [copiedSource, setCopiedSource] = useState<boolean>(false);

  const categoryCounts = useMemo(() => getCategoryCounts(ARIONZ_CONCEPTS), []);

  const filteredConcepts = useMemo(
    () => filterConcepts(ARIONZ_CONCEPTS, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  const sourcePreview = useMemo(() => generateStandaloneSourcePreview(), []);

  const handleCopySource = () => {
    navigator.clipboard?.writeText(sourcePreview);
    setCopiedSource(true);
    setTimeout(() => setCopiedSource(false), 2000);
  };

  const openConceptByCode = (code: string) => {
    const found = ARIONZ_CONCEPTS.find((c) => c.code === code);
    if (found) {
      setActiveDossier(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f2f2f7] flex flex-col">
      {/* ====================================================================
          TOP NAVIGATION BAR (Strict 3-Zone Top Bar Contract)
      ==================================================================== */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 border-b border-[#d4af37]/28 bg-[#050507]/95 px-6 py-4 backdrop-blur">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-mono text-sm sm:text-base font-bold tracking-tight text-[#f7d665] whitespace-nowrap shrink-0"
        >
          ARIONZ // MY THINGS — SCIENTIFIC &amp; ENGINEERING ARCHIVE
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-6 text-sm font-medium text-[#9a9aa8]"
        >
          <a
            href="#concept-grid"
            className="hover:text-[#f7d665] transition-colors whitespace-nowrap shrink-0"
          >
            Concept Dossiers
          </a>
          <a
            href="#comparative-matrix"
            className="hover:text-[#f7d665] transition-colors whitespace-nowrap shrink-0"
          >
            Mathematical Matrix
          </a>
          <a
            href="#related-directions"
            className="hover:text-[#f7d665] transition-colors whitespace-nowrap shrink-0"
          >
            Research Directions
          </a>
          <a
            href="#extensibility-architecture"
            className="hover:text-[#f7d665] transition-colors whitespace-nowrap shrink-0"
          >
            Master Archive Schema
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setActiveDossier(ARIONZ_CONCEPTS[0])}
            className="rounded-lg bg-[#d4af37] px-4 py-2 font-mono text-xs font-semibold text-[#050507] hover:bg-[#f7d665] transition-colors whitespace-nowrap shrink-0"
          >
            Inspect Dossier Index
          </button>
        </div>
      </header>

      {/* ====================================================================
          MAIN WORKSPACE CONTAINER
      ==================================================================== */}
      <main id="top" className="mx-auto w-full max-w-[1360px] flex-1 px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ==================================================================
            HERO SECTION & SCIENTIFIC INTEGRITY BANNER
        ================================================================== */}
        <section className="rounded-xl border border-[#d4af37]/28 bg-[#0b0b10] p-6 sm:p-8 lg:p-10">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#9a9aa8]">
              <span className="text-[#d4af37] font-semibold">
                INDEPENDENT RESEARCH &amp; SPECULATIVE ENGINEERING PORTFOLIO
              </span>
              <span aria-hidden="true">·</span>
              <span>ARCHIVE EDITION 2026</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums text-[#f7d665] font-semibold">
                {ARIONZ_CONCEPTS.length} ACTIVE DOSSIERS (9-POINT FORMAT)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#f2f2f7] leading-[1.15] [text-wrap:balance]">
              ARIONZ // MY THINGS — Global Theoretical Physics &amp; Advanced Engineering Research Archive
            </h1>

            <p className="text-base sm:text-lg text-[#f7d665] font-medium leading-relaxed">
              Speculative Hypotheses, Conceptual Architectures &amp; Theoretical Physics Formulations
            </p>
          </div>

          {/* Mandatory Scientific Integrity Banner */}
          <div
            role="note"
            aria-label="Scientific Rigor Statement"
            className="mt-6 rounded-lg border border-[#d4af37]/40 bg-[#12121a] p-4 sm:p-5"
          >
            <p className="font-mono text-xs sm:text-sm leading-relaxed text-[#f2f2f7]">
              <strong className="text-[#f7d665]">
                SCIENTIFIC RIGOR STATEMENT:
              </strong>{' '}
              All projects documented in this archive are conceptual hypotheses and theoretical research frameworks. Unproven mechanisms, open research questions, and experimental limitations are explicitly separated from established physics.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Live Search Input */}
              <div className="relative flex-1 max-w-2xl">
                <label htmlFor="archive-search-input" className="sr-only">
                  Search concepts, equations, materials, or research questions
                </label>
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d4af37]" />
                <input
                  id="archive-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search equations, materials (Graphene, Vanadium, Tungsten, Li-6), Betz, MAG-LOCK, ASPF, JEXI..."
                  className="w-full rounded-lg border border-[#d4af37]/30 bg-[#050507] py-2.5 pl-10 pr-9 font-mono text-xs sm:text-sm text-[#f2f2f7] placeholder-[#9a9aa8] focus:border-[#f7d665] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-[#9a9aa8] hover:text-[#f2f2f7]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="font-mono text-xs text-[#9a9aa8] tabular-nums shrink-0">
                Showing <span className="font-bold text-[#f7d665]">{filteredConcepts.length}</span> of{' '}
                <span className="font-bold text-[#f2f2f7]">{ARIONZ_CONCEPTS.length}</span> primary dossiers
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Category Filter Tabs"
              className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#d4af37]/20 bg-[#050507] p-1.5"
            >
              {ARCHIVE_CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                const count = categoryCounts[category] ?? 0;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-md px-2.5 py-1.5 font-mono text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#050507] font-semibold'
                        : 'text-[#9a9aa8] hover:bg-[#12121a] hover:text-[#f2f2f7]'
                    }`}
                  >
                    [{category}] <span className="opacity-75 tabular-nums">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================
            MAIN CONCEPT GRID (Interactive Dossier Cards)
        ================================================================== */}
        <section id="concept-grid" className="space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#d4af37]/25 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#f2f2f7]">
                Primary Research Dossiers (Strict 9-Point Theory Format — All {ARIONZ_CONCEPTS.length} Concepts)
              </h2>
              <p className="mt-1 text-sm text-[#9a9aa8]">
                Select any concept card below to launch its full-screen Master Research Dossier with complete verbatim mathematical derivations, ASCII system schematics, paradox analyses, and open research questions.
              </p>
            </div>
          </div>

          {filteredConcepts.length === 0 ? (
            <div className="rounded-xl border border-[#d4af37]/28 bg-[#0b0b10] p-10 text-center space-y-4">
              <div className="font-mono text-sm font-semibold text-[#f7d665]">
                No Active Dossiers Match Category [{selectedCategory}] {searchQuery ? `and Query "${searchQuery}"` : ''}
              </div>
              <p className="mx-auto max-w-xl text-sm text-[#9a9aa8]">
                Try clearing your search query or switching to [All] to view all {ARIONZ_CONCEPTS.length} Master Research Dossiers.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="rounded-lg bg-[#d4af37] px-4 py-2 font-mono text-xs font-semibold text-[#050507] hover:bg-[#f7d665] transition-colors"
                >
                  Reset Filter to [All]
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {filteredConcepts.map((concept) => (
                <article
                  key={concept.id}
                  className="group flex flex-col justify-between rounded-xl border border-[#d4af37]/28 bg-[#12121a] p-6 hover:border-[#d4af37] transition-colors"
                >
                  <div className="space-y-4">
                    {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#9a9aa8]">
                      <span className="text-base" aria-hidden="true">
                        {concept.icon}
                      </span>
                      <span className="font-bold text-[#f7d665]">
                        {concept.code}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#d4af37]">{concept.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{concept.version}</span>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#f2f2f7] group-hover:text-[#f7d665] transition-colors">
                      {concept.title}
                    </h3>

                    {/* Status Line */}
                    <div className="font-mono text-xs text-[#9a9aa8]">
                      <span className="text-[#d4af37]">STATUS:</span>{' '}
                      {concept.status}
                    </div>

                    {/* Quick Overview */}
                    <p className="text-sm leading-relaxed text-[#f2f2f7]/90">
                      {concept.quickSummary}
                    </p>

                    {/* Key Equation Preview Box */}
                    <div className="rounded-md border border-[#d4af37]/25 bg-[#050507] p-3.5">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-[#9a9aa8]">
                        Primary Mathematical Formulation ({concept.mathEquations.steps.length} Derivation Steps)
                      </div>
                      <div className="mt-1.5 overflow-x-auto font-mono text-xs font-semibold text-[#f7d665]">
                        {concept.mathEquations.steps[concept.mathEquations.steps.length - 1]?.equations[0]}
                      </div>
                    </div>

                    {/* 9-Section Verification Inventory Line */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[#9a9aa8] tabular-nums">
                      <span>9 Mandatory Sections</span>
                      <span aria-hidden="true">·</span>
                      <span>{concept.mathEquations.steps.length} Math Steps</span>
                      <span aria-hidden="true">·</span>
                      <span>{concept.advantages.length} Advantages</span>
                      <span aria-hidden="true">·</span>
                      <span>{concept.problems.length} Limitations</span>
                      <span aria-hidden="true">·</span>
                      <span>{concept.questions.length} Open Questions</span>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="mt-6 pt-4 border-t border-[#d4af37]/20 flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-[#9a9aa8]">
                      Paradox: {concept.paradox.title.slice(0, 42)}...
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveDossier(concept)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#d4af37] px-4 py-2 font-mono text-xs font-semibold text-[#050507] hover:bg-[#f7d665] transition-colors whitespace-nowrap shrink-0"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Open Master Dossier ({concept.code})
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ==================================================================
            COMPARATIVE MATHEMATICAL & ARCHITECTURAL MATRIX
        ================================================================== */}
        <section
          id="comparative-matrix"
          className="rounded-xl border border-[#d4af37]/28 bg-[#0b0b10] p-6 sm:p-8 space-y-4"
        >
          <div className="border-b border-[#d4af37]/20 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#f2f2f7]">
              Cross-Archive Theoretical Physics &amp; Engineering Matrix
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#9a9aa8]">
              Direct comparison of governing equations, physical substrates, central paradoxes, and verification requirements across all {ARIONZ_CONCEPTS.length} Master Concepts (AZ-TD-001 through AZ-MXJ-01).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#d4af37]/30 text-[#d4af37]">
                  <th className="py-3 pr-4">Code &amp; Concept</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Governing Equation / Scaling</th>
                  <th className="py-3 pr-4">Central Paradox</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4af37]/15">
                {ARIONZ_CONCEPTS.map((c) => (
                  <tr key={c.id} className="hover:bg-[#12121a]/60">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-[#f7d665]">
                        {c.icon} {c.code}
                      </div>
                      <div className="text-[#f2f2f7]">{c.shortName}</div>
                    </td>
                    <td className="py-3.5 pr-4 text-[#9a9aa8]">{c.category}</td>
                    <td className="py-3.5 pr-4 text-[#f2f2f7]">
                      {c.mathEquations.steps[0].equations[0]}
                    </td>
                    <td className="py-3.5 pr-4 text-[#9a9aa8]">
                      {c.paradox.title}
                    </td>
                    <td className="py-3.5">
                      <button
                        type="button"
                        onClick={() => setActiveDossier(c)}
                        className="inline-flex items-center gap-1 rounded border border-[#d4af37]/40 bg-[#12121a] px-2.5 py-1 text-xs text-[#f7d665] hover:bg-[#d4af37] hover:text-[#050507] transition-colors whitespace-nowrap shrink-0"
                      >
                        Inspect 9 Sections
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ==================================================================
            ARIONZ // FUNDAMENTAL PHYSICS RESEARCH DIRECTIONS (All 5 Tracks)
        ================================================================== */}
        <section
          id="related-directions"
          className="rounded-xl border border-[#d4af37]/28 bg-[#0b0b10] p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-4">
            <div>
              <div className="font-mono text-xs text-[#d4af37] font-semibold">
                CROSS-ARCHIVE FUNDAMENTAL INQUIRY TRACKS (`RELATED_RESEARCH_DIRECTIONS`)
              </div>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#f2f2f7]">
                ARIONZ // FUNDAMENTAL PHYSICS RESEARCH DIRECTIONS
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#9a9aa8]">
                Five foundational theoretical physics and materials science research directions linking all 11 ArionZ Master Dossiers. Click any linked concept code to inspect its full 9-point dossier.
              </p>
            </div>
            <button
              type="button"
              id="extensibility-architecture"
              onClick={() => setShowSourceSchema((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#d4af37]/40 bg-[#12121a] px-3.5 py-2 font-mono text-xs font-semibold text-[#f7d665] hover:border-[#f7d665] transition-colors whitespace-nowrap shrink-0"
            >
              <Code2 className="h-4 w-4" />
              {showSourceSchema
                ? 'Hide ARIONZ_CONCEPTS Source Schema'
                : 'Inspect ARIONZ_CONCEPTS Source Schema'}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {RELATED_RESEARCH_DIRECTIONS.map((dir) => (
              <article
                key={dir.id}
                className="rounded-xl border border-[#d4af37]/28 bg-[#12121a] p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-[#d4af37] transition-colors"
              >
                <div className="space-y-3">
                  {/* Track Header Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#9a9aa8]">
                    <div className="flex items-center gap-2">
                      <span className="text-base" aria-hidden="true">
                        {dir.icon}
                      </span>
                      <span className="font-bold text-[#f7d665]">
                        DIRECTION {dir.number}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#d4af37]">{dir.category}</span>
                    </div>
                    <span className="font-semibold text-[#f2f2f7]">
                      {dir.linkedToLabel}
                    </span>
                  </div>

                  {/* Direction Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#f2f2f7]">
                    {dir.number}. {dir.title}
                  </h3>

                  {/* Core Inquiry */}
                  <p className="text-sm leading-relaxed text-[#f2f2f7]/90">
                    <strong className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                      Core Inquiry:{' '}
                    </strong>
                    {dir.coreInquiry}
                  </p>

                  {/* Key Equation / Principle Highlight Box */}
                  <div className="rounded-md border border-[#d4af37]/25 bg-[#050507] p-3.5">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[#9a9aa8]">
                      {dir.keyHighlightLabel}
                    </div>
                    <div className="mt-1 font-mono text-xs font-semibold text-[#f7d665]">
                      {dir.keyHighlightValue}
                    </div>
                  </div>
                </div>

                {/* Interactive Linked Dossier Jump Buttons */}
                <div className="pt-3 border-t border-[#d4af37]/20 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[#9a9aa8]">
                    Inspect Linked Master Dossiers:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {dir.linkedCodes.map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => openConceptByCode(code)}
                        className="inline-flex items-center gap-1 rounded border border-[#d4af37]/40 bg-[#0b0b10] px-2.5 py-1 font-mono text-xs font-semibold text-[#f7d665] hover:bg-[#d4af37] hover:text-[#050507] transition-colors"
                      >
                        {code}
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {showSourceSchema && (
            <div className="rounded-lg border border-[#d4af37]/35 bg-[#050507] p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-[#f7d665]">
                  Complete Master Archive Array Schema (`ARIONZ_CONCEPTS` [11] &amp; `RELATED_RESEARCH_DIRECTIONS` [5])
                </span>
                <button
                  type="button"
                  onClick={handleCopySource}
                  className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 bg-[#12121a] px-3 py-1 font-mono text-xs text-[#f2f2f7] hover:border-[#d4af37] hover:text-[#f7d665] transition-colors"
                >
                  {copiedSource ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#f7d665]" />
                      Copied Master Arrays JSON
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#d4af37]" />
                      Copy Complete Master Arrays
                    </>
                  )}
                </button>
              </div>
              <pre className="max-h-80 overflow-auto rounded border border-[#d4af37]/20 bg-[#0b0b10] p-4 font-mono text-xs text-[#9a9aa8]">
                {`const ARIONZ_CONCEPTS = [
  { code: "AZ-TD-001", title: "Time Drive — A Consciousness-Based Approach to Temporal Information Access", ... },
  { code: "AZ-DEO-01", title: "Dark Energy Project — Φ-Field, Silent Wave & Vacuum Observation Concept", ... },
  { code: "AZ-QB-1.0", title: "ArionZ Quantum Battery — Four-Material Photonic & Collective Quantum Energy Storage", ... },
  { code: "AZ-FR-01", title: "FR — Spherical Hybrid Tokamak–Stellarator Fusion Reactor", ... },
  // === PASTE PROMPT 2 (CONCEPTS 5 TO 8) BELOW THIS LINE ===
  { code: "AZ-GEP-01", title: "ArionZ Graphene Energy Project — Graphene-Dominant Battery & Premium Powerbank", ... },
  { code: "AZ-OX-001", title: "ArionZ Obsidian-X — Perovskite Tri-Energy Weather-Adaptive Solar Panel", ... },
  { code: "AZ-AER-001", title: "ArionZ Airflow Energy Recovery Reactor — High-Speed Aerospace Energy Recovery", ... },
  { code: "AZ-MSD-1.0", title: "MSD (Master Super Disk) — Intelligent Neuromorphic & Context-Aware Storage System", ... },
  { code: "AZ-APS-001", title: "ArionZ AEGIS — Advanced Deployable Protective Shield System", ... },
  { code: "AZ-SFT-01", title: "ArionZ Space Folding Transport System (SFT) — Spacetime Geometry & ASPF Concept", ... },
  { code: "AZ-MXJ-01", title: "MXJ (Mark Xevior Joint) — Next-Generation Intelligent Hybrid Energy Tower", ... },
];

const RELATED_RESEARCH_DIRECTIONS = [
  { number: "01", title: "Consciousness & Temporal Perception", linkedCodes: ["AZ-TD-001"] },
  { number: "02", title: "Unknown Brain Signal Hypothesis", linkedCodes: ["AZ-TD-001", "AZ-MSD-1.0"] },
  { number: "03", title: "Quantum Collective Charging", linkedCodes: ["AZ-QB-1.0"] },
  { number: "04", title: "Possible Unknown Dark Energy Waves — \\"Silent Waves\\"", linkedCodes: ["AZ-DEO-01"] },
  { number: "05", title: "Dark Energy as an Anti-Gravity-Like Field", linkedCodes: ["AZ-DEO-01", "AZ-SFT-01"] },
];`}
              </pre>
            </div>
          )}
        </section>
      </main>

      {/* ====================================================================
          INSTITUTIONAL FOOTER
      ==================================================================== */}
      <footer className="mt-12 border-t border-[#d4af37]/25 bg-[#0b0b10] px-6 py-6">
        <div className="mx-auto flex max-w-[1360px] flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9a9aa8]">
          <div>
            ARIONZ // MY THINGS — Global Theoretical Physics &amp; Advanced Engineering Research Archive
          </div>
          <div>
            Strict 9-Point Theory Format · 11 Master Dossiers &amp; 5 Research Directions · Independent Research &amp; Speculative Engineering Portfolio
          </div>
        </div>
      </footer>

      {/* ====================================================================
          FULL-SCREEN MASTER RESEARCH DOSSIER MODAL
      ==================================================================== */}
      {activeDossier && (
        <MasterDossierModal
          concept={activeDossier}
          allConcepts={ARIONZ_CONCEPTS}
          onSelectConcept={(c) => setActiveDossier(c)}
          onClose={() => setActiveDossier(null)}
        />
      )}
    </div>
  );
}
