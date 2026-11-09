import React, { useState, useEffect } from 'react';
import { ArionzConcept } from '../data/arionzConcepts';
import { InteractivePhysicsBench } from './InteractivePhysicsBench';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Printer,
} from 'lucide-react';

export type DossierTab =
  | 'all'
  | 'overview-concept'
  | 'how-it-works'
  | 'math-equations'
  | 'diagram'
  | 'advantages-problems-paradox'
  | 'questions-roadmap';

interface MasterDossierModalProps {
  concept: ArionzConcept;
  allConcepts: ArionzConcept[];
  onSelectConcept: (concept: ArionzConcept) => void;
  onClose: () => void;
}

export const MasterDossierModal: React.FC<MasterDossierModalProps> = ({
  concept,
  allConcepts,
  onSelectConcept,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<DossierTab>('all');
  const [copiedDiagram, setCopiedDiagram] = useState(false);

  const currentIndex = allConcepts.findIndex((c) => c.id === concept.id);
  const prevConcept =
    currentIndex > 0
      ? allConcepts[currentIndex - 1]
      : allConcepts[allConcepts.length - 1];
  const nextConcept =
    currentIndex < allConcepts.length - 1
      ? allConcepts[currentIndex + 1]
      : allConcepts[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyDiagram = () => {
    navigator.clipboard?.writeText(concept.diagram.asciiArt);
    setCopiedDiagram(true);
    setTimeout(() => setCopiedDiagram(false), 1800);
  };

  const showSection = (sectionNum: number): boolean => {
    if (activeTab === 'all') return true;
    if (activeTab === 'overview-concept') return sectionNum === 1 || sectionNum === 2;
    if (activeTab === 'how-it-works') return sectionNum === 3;
    if (activeTab === 'math-equations') return sectionNum === 4;
    if (activeTab === 'diagram') return sectionNum === 5;
    if (activeTab === 'advantages-problems-paradox')
      return sectionNum === 6 || sectionNum === 7 || sectionNum === 9;
    if (activeTab === 'questions-roadmap') return sectionNum === 8;
    return true;
  };

  const TABS: { id: DossierTab; label: string }[] = [
    { id: 'all', label: 'All 9 Sections' },
    { id: 'overview-concept', label: 'Overview & Concept' },
    { id: 'how-it-works', label: 'How It Works & Architecture' },
    { id: 'math-equations', label: 'Step-by-Step Math & Equations' },
    { id: 'diagram', label: 'System Diagram' },
    {
      id: 'advantages-problems-paradox',
      label: 'Advantages, Problems & Paradox',
    },
    { id: 'questions-roadmap', label: 'Open Questions & Roadmap' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#050507]/90 backdrop-blur-sm p-2 sm:p-4 md:p-6"
    >
      <div className="relative my-auto w-full max-w-6xl rounded-xl border border-[#d4af37]/40 bg-[#0b0b10] text-[#f2f2f7] shadow-2xl">
        {/* Top Modal Action Bar */}
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 rounded-t-xl border-b border-[#d4af37]/30 bg-[#050507]/95 px-5 py-3.5 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
              MASTER RESEARCH DOSSIER
            </span>
            <span className="text-[#9a9aa8]" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-xs font-semibold text-[#f7d665]">
              {concept.code}
            </span>
            <span className="text-[#9a9aa8]" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-xs text-[#9a9aa8]">
              9-Point Theory Format Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectConcept(prevConcept)}
              aria-label={`Previous dossier: ${prevConcept.shortName}`}
              className="inline-flex items-center gap-1 rounded border border-[#d4af37]/30 bg-[#12121a] px-2.5 py-1.5 font-mono text-xs text-[#f2f2f7] hover:border-[#d4af37] hover:text-[#f7d665] transition-colors whitespace-nowrap shrink-0"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Prev ({prevConcept.code})
            </button>
            <button
              type="button"
              onClick={() => onSelectConcept(nextConcept)}
              aria-label={`Next dossier: ${nextConcept.shortName}`}
              className="inline-flex items-center gap-1 rounded border border-[#d4af37]/30 bg-[#12121a] px-2.5 py-1.5 font-mono text-xs text-[#f2f2f7] hover:border-[#d4af37] hover:text-[#f7d665] transition-colors whitespace-nowrap shrink-0"
            >
              Next ({nextConcept.code})
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              aria-label="Print Dossier"
              className="hidden sm:inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 bg-[#12121a] px-2.5 py-1.5 font-mono text-xs text-[#9a9aa8] hover:border-[#d4af37] hover:text-[#f2f2f7] transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="h-3.5 w-3.5" />
              Print
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Master Research Dossier"
              className="inline-flex items-center gap-1.5 rounded border border-[#d4af37] bg-[#d4af37]/15 px-3 py-1.5 font-mono text-xs font-semibold text-[#f7d665] hover:bg-[#d4af37] hover:text-[#050507] transition-colors whitespace-nowrap shrink-0"
            >
              <X className="h-4 w-4" />
              Close Dossier
            </button>
          </div>
        </div>

        {/* Strict Metadata Block (Part B Mandatory Headers) */}
        <div className="border-b border-[#d4af37]/25 bg-[#12121a]/80 px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <div className="font-mono text-xs text-[#9a9aa8] space-y-1">
                <div>
                  <span className="font-semibold text-[#d4af37]">📌 ICON:</span>{' '}
                  <span className="text-base">{concept.icon}</span>
                  <span className="mx-3 text-[#9a9aa8]">·</span>
                  <span className="font-semibold text-[#d4af37]">📌 CODE:</span>{' '}
                  <span className="text-[#f7d665] font-semibold">{concept.code}</span>
                  <span className="mx-3 text-[#9a9aa8]">·</span>
                  <span className="font-semibold text-[#d4af37]">📌 CATEGORY:</span>{' '}
                  <span className="text-[#f2f2f7]">{concept.category}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#d4af37]">📌 STATUS:</span>{' '}
                  <span className="text-[#9a9aa8]">{concept.status}</span>
                </div>
              </div>

              <h2
                id="dossier-modal-title"
                className="text-xl sm:text-2xl font-bold tracking-tight text-[#f2f2f7]"
              >
                <span className="font-mono text-sm font-semibold text-[#d4af37] mr-2">
                  📌 TITLE:
                </span>
                {concept.title}
              </h2>
            </div>
          </div>

          {/* Interactive Dossier Section Tabs */}
          <div
            role="tablist"
            aria-label="Dossier Sections"
            className="mt-5 flex flex-wrap items-center gap-1.5 pt-2"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#d4af37] text-[#050507] font-semibold'
                      : 'border border-[#d4af37]/25 bg-[#0b0b10] text-[#9a9aa8] hover:border-[#d4af37]/60 hover:text-[#f2f2f7]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 9-Section Dossier Body */}
        <div className="space-y-8 p-6 sm:p-8">
          {/* ============================================================
              1. OVERVIEW
          ============================================================ */}
          {showSection(1) && (
            <section
              id="section-1-overview"
              className="rounded-lg border border-[#d4af37]/28 bg-[#12121a] p-6"
            >
              <div className="border-b border-[#d4af37]/20 pb-3">
                <h3 className="font-mono text-base font-bold text-[#f7d665]">
                  1. OVERVIEW
                </h3>
              </div>

              <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#f2f2f7]">
                {concept.overview.leadParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}

                {concept.overview.centralQuestionOrPhilosophy && (
                  <div className="rounded-md border border-[#d4af37]/35 bg-[#0b0b10] p-4">
                    <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                      {concept.overview.centralQuestionOrPhilosophy.label}
                    </div>
                    <p className="mt-1.5 text-base font-medium text-[#f7d665]">
                      {concept.overview.centralQuestionOrPhilosophy.statement}
                    </p>
                  </div>
                )}

                {concept.overview.pillarsOrObjectives && (
                  <div className="rounded-md border border-[#d4af37]/20 bg-[#0b0b10] p-4">
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                      {concept.overview.pillarsOrObjectives.heading}
                    </h4>
                    <ul className="mt-2.5 space-y-1.5 font-mono text-xs sm:text-sm text-[#f2f2f7]">
                      {concept.overview.pillarsOrObjectives.items.map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                <div className="rounded-md border border-[#d4af37]/20 bg-[#0b0b10] p-4">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                    {concept.overview.scientificBackgroundOrRules.heading}
                  </h4>
                  <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {concept.overview.scientificBackgroundOrRules.items.map(
                      (item, idx) => (
                        <div
                          key={idx}
                          className="rounded border border-[#d4af37]/15 bg-[#12121a] p-3.5"
                        >
                          <div className="font-mono text-xs font-semibold text-[#f7d665]">
                            {item.label}
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-[#9a9aa8]">
                            {item.detail}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ============================================================
              2. CONCEPT
          ============================================================ */}
          {showSection(2) && (
            <section
              id="section-2-concept"
              className="rounded-lg border border-[#d4af37]/28 bg-[#12121a] p-6"
            >
              <div className="border-b border-[#d4af37]/20 pb-3">
                <h3 className="font-mono text-base font-bold text-[#f7d665]">
                  2. CONCEPT ({concept.conceptSection.heading})
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#f2f2f7]">
                {concept.conceptSection.intro}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4">
                {concept.conceptSection.components.map((comp, idx) => (
                  <div
                    key={idx}
                    className="rounded-md border border-[#d4af37]/25 bg-[#0b0b10] p-4"
                  >
                    <h4 className="font-mono text-sm font-semibold text-[#d4af37]">
                      {comp.heading}
                    </h4>
                    <ul className="mt-2.5 space-y-1.5 text-sm text-[#f2f2f7]">
                      {comp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="font-mono text-[#d4af37]">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {comp.note && (
                      <p className="mt-2.5 rounded border border-[#d4af37]/20 bg-[#12121a] px-3 py-2 font-mono text-xs text-[#9a9aa8]">
                        {comp.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ============================================================
              3. HOW IT WORKS
          ============================================================ */}
          {showSection(3) && (
            <section
              id="section-3-how-it-works"
              className="rounded-lg border border-[#d4af37]/28 bg-[#12121a] p-6"
            >
              <div className="border-b border-[#d4af37]/20 pb-3">
                <h3 className="font-mono text-base font-bold text-[#f7d665]">
                  3. HOW IT WORKS ({concept.howItWorks.heading})
                </h3>
              </div>

              <div className="mt-4">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  {concept.howItWorks.primaryProcessTitle}
                </h4>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {concept.howItWorks.primaryPhases.map((phase, idx) => (
                    <div
                      key={idx}
                      className="rounded-md border border-[#d4af37]/20 bg-[#0b0b10] p-4"
                    >
                      <div className="font-mono text-xs font-semibold text-[#f7d665]">
                        {phase.phase} — {phase.title}
                      </div>
                      <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-[#f2f2f7]">
                        {phase.details.map((d, dIdx) => (
                          <li key={dIdx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {concept.howItWorks.secondaryMechanisms.map((mech, idx) => (
                  <div
                    key={idx}
                    className="rounded-md border border-[#d4af37]/25 bg-[#0b0b10] p-4"
                  >
                    <h4 className="font-mono text-sm font-semibold text-[#d4af37]">
                      {mech.title}
                    </h4>
                    {mech.flowChain && (
                      <div className="mt-2 overflow-x-auto rounded border border-[#d4af37]/20 bg-[#050507] p-3 font-mono text-xs text-[#f7d665]">
                        {mech.flowChain}
                      </div>
                    )}
                    <ul className="mt-2.5 space-y-1.5 text-sm text-[#f2f2f7]">
                      {mech.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="font-mono text-[#d4af37]">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {mech.scientificNuance && (
                      <p className="mt-2.5 rounded border border-[#d4af37]/30 bg-[#12121a] px-3 py-2 font-mono text-xs text-[#f7d665]">
                        {mech.scientificNuance}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {concept.howItWorks.challengeSolutionMatrix && (
                <div className="mt-6 rounded-md border border-[#d4af37]/25 bg-[#0b0b10] p-4">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                    {concept.howItWorks.challengeSolutionMatrix.heading}
                  </h4>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="border-b border-[#d4af37]/25 text-[#9a9aa8]">
                          <th className="py-2 pr-4">Industry Challenge</th>
                          <th className="py-2">ArionZ Research Solution</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#d4af37]/15">
                        {concept.howItWorks.challengeSolutionMatrix.rows.map(
                          (row, idx) => (
                            <tr key={idx}>
                              <td className="py-2 pr-4 font-semibold text-[#f2f2f7]">
                                {row.challenge}
                              </td>
                              <td className="py-2 text-[#f7d665]">
                                ──► {row.solution}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ============================================================
              4. MATH / EQUATIONS
          ============================================================ */}
          {showSection(4) && (
            <section
              id="section-4-math"
              className="rounded-lg border border-[#d4af37]/28 bg-[#12121a] p-6"
            >
              <div className="border-b border-[#d4af37]/20 pb-3">
                <h3 className="font-mono text-base font-bold text-[#f7d665]">
                  4. MATH / EQUATIONS ({concept.mathEquations.modelTitle})
                </h3>
              </div>

              <div className="mt-4 space-y-4">
                {concept.mathEquations.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-md border border-[#d4af37]/30 bg-[#0b0b10] p-4"
                  >
                    <div className="font-mono text-sm font-semibold text-[#d4af37]">
                      {step.stepNumber} ({step.title}):
                    </div>
                    <div className="mt-2 space-y-1.5 text-sm text-[#f2f2f7]">
                      {step.explanation.map((exp, eIdx) => (
                        <p key={eIdx}>{exp}</p>
                      ))}
                    </div>
                    <div className="mt-3 space-y-2">
                      {step.equations.map((eq, eqIdx) => (
                        <div
                          key={eqIdx}
                          className="overflow-x-auto rounded border border-[#d4af37]/40 bg-[#050507] px-4 py-3 font-mono text-sm font-semibold text-[#f7d665]"
                        >
                          {eq}
                        </div>
                      ))}
                    </div>
                    {step.workedNotes && step.workedNotes.length > 0 && (
                      <div className="mt-2.5 space-y-1 font-mono text-xs text-[#9a9aa8]">
                        {step.workedNotes.map((note, nIdx) => (
                          <p key={nIdx}>{note}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Variable Definitions Table */}
              <div className="mt-6 rounded-md border border-[#d4af37]/25 bg-[#0b0b10] p-4">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  Nomenclature &amp; Variable Definitions
                </h4>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-[#d4af37]/25 text-[#9a9aa8]">
                        <th className="py-2 pr-4">Symbol</th>
                        <th className="py-2 pr-4">Physical Quantity</th>
                        <th className="py-2">Definition / Units</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d4af37]/15">
                      {concept.mathEquations.variables.map((v, idx) => (
                        <tr key={idx}>
                          <td className="py-2 pr-4 font-bold text-[#f7d665]">
                            {v.symbol}
                          </td>
                          <td className="py-2 pr-4 text-[#f2f2f7]">{v.name}</td>
                          <td className="py-2 text-[#9a9aa8]">{v.unitsOrRole}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Interactive Numerical Calibration Bench */}
              <InteractivePhysicsBench conceptCode={concept.code} />
            </section>
          )}

          {/* ============================================================
              5. DIAGRAM
          ============================================================ */}
          {showSection(5) && (
            <section
              id="section-5-diagram"
              className="rounded-lg border border-[#d4af37]/28 bg-[#12121a] p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-3">
                <h3 className="font-mono text-base font-bold text-[#f7d665]">
                  5. DIAGRAM ({concept.diagram.title})
                </h3>
                <button
                  type="button"
                  onClick={handleCopyDiagram}
                  className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 bg-[#0b0b10] px-3 py-1 font-mono text-xs text-[#f2f2f7] hover:border-[#d4af37] hover:text-[#f7d665] transition-colors"
                >
                  {copiedDiagram ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#f7d665]" />
                      Copied ASCII Schematic
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#d4af37]" />
                      Copy ASCII Schematic
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 overflow-x-auto rounded-lg border border-[#d4af37]/35 bg-[#050507] p-5">
                <pre
                  aria-label={concept.diagram.title}
                  className="font-mono text-xs sm:text-sm leading-[1.35] text-[#f7d665] select-all"
                >
                  {concept.diagram.asciiArt.split('\n').map((line, lineIdx) => (
                    <div key={lineIdx} className="whitespace-pre flex">
                      {Array.from(line).map((ch, chIdx) => (
                        <span
                          key={chIdx}
                          className="inline-block w-[1ch] text-center shrink-0"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  ))}
                </pre>
              </div>
              <p className="mt-3 font-mono text-xs text-[#9a9aa8]">
                {concept.diagram.caption}
              </p>
            </section>
          )}

          {/* ============================================================
              6. ADVANTAGES & 7. PROBLEMS
          ============================================================ */}
          {(showSection(6) || showSection(7)) && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {showSection(6) && (
                <section
                  id="section-6-advantages"
                  className="rounded-lg border border-[#d4af37]/28 bg-[#12121a] p-6"
                >
                  <div className="border-b border-[#d4af37]/20 pb-3">
                    <h3 className="font-mono text-base font-bold text-[#f7d665]">
                      6. ADVANTAGES
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#f2f2f7]">
                    {concept.advantages.map((adv, idx) => (
                      <li
                        key={idx}
                        className="rounded border border-[#d4af37]/20 bg-[#0b0b10] px-3.5 py-2.5"
                      >
                        {adv}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {showSection(7) && (
                <section
                  id="section-7-problems"
                  className="rounded-lg border border-[#d4af37]/28 bg-[#12121a] p-6"
                >
                  <div className="border-b border-[#d4af37]/20 pb-3">
                    <h3 className="font-mono text-base font-bold text-[#f7d665]">
                      7. {concept.problemsHeading}
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#f2f2f7]">
                    {concept.problems.map((prob, idx) => (
                      <li
                        key={idx}
                        className="rounded border border-[#d4af37]/20 bg-[#0b0b10] px-3.5 py-2.5"
                      >
                        {prob}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}

          {/* ============================================================
              8. QUESTIONS (Plus Roadmap)
          ============================================================ */}
          {showSection(8) && (
            <section
              id="section-8-questions"
              className="rounded-lg border border-[#d4af37]/28 bg-[#12121a] p-6"
            >
              <div className="border-b border-[#d4af37]/20 pb-3">
                <h3 className="font-mono text-base font-bold text-[#f7d665]">
                  8. {concept.questionsHeading}
                </h3>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {concept.questions.map((q) => (
                  <div
                    key={q.number}
                    className="flex items-start gap-3 rounded border border-[#d4af37]/20 bg-[#0b0b10] p-3.5"
                  >
                    <span className="font-mono text-xs font-bold text-[#d4af37] tabular-nums">
                      {q.number}.
                    </span>
                    <span className="text-sm text-[#f2f2f7]">{q.question}</span>
                  </div>
                ))}
              </div>

              {concept.roadmap && (
                <div className="mt-6 rounded-md border border-[#d4af37]/25 bg-[#0b0b10] p-4">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                    {concept.roadmap.heading}
                  </h4>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {concept.roadmap.stages.map((st, idx) => (
                      <div
                        key={idx}
                        className="rounded border border-[#d4af37]/20 bg-[#12121a] p-3.5"
                      >
                        <div className="font-mono text-xs font-bold text-[#f7d665]">
                          {st.stage} — {st.title}
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#9a9aa8]">
                          {st.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ============================================================
              9. PARADOX
          ============================================================ */}
          {showSection(9) && (
            <section
              id="section-9-paradox"
              className="rounded-lg border border-[#d4af37]/40 bg-[#12121a] p-6"
            >
              <div className="border-b border-[#d4af37]/20 pb-3">
                <h3 className="font-mono text-base font-bold text-[#f7d665]">
                  9. PARADOX — {concept.paradox.title}
                </h3>
              </div>

              <div className="mt-4 space-y-4">
                <div className="rounded-md border border-[#d4af37]/30 bg-[#0b0b10] p-4">
                  <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                    Paradox Formulation
                  </div>
                  <div className="mt-2 space-y-2 text-sm leading-relaxed text-[#f2f2f7]">
                    {concept.paradox.statement.map((st, idx) => (
                      <p key={idx}>{st}</p>
                    ))}
                  </div>
                </div>

                <div className="rounded-md border border-[#d4af37]/30 bg-[#0b0b10] p-4">
                  <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#f7d665]">
                    {concept.paradox.resolutionTitle}
                  </div>
                  <div className="mt-2 space-y-2 text-sm leading-relaxed text-[#f2f2f7]">
                    {concept.paradox.resolution.map((res, idx) => (
                      <p key={idx}>{res}</p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
