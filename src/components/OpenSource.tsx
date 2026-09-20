import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Layers, LayoutGrid, CheckCircle2, Award, Calendar, ShieldCheck } from 'lucide-react';
import { OPEN_SOURCE_DATA, HERO_DATA } from '../data/portfolioData';
import { ScrollReveal3D } from './ScrollReveal3D';

export const OpenSource: React.FC = () => {
  const [activeExpIdx, setActiveExpIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');
  const expRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportMid = window.innerHeight * 0.45;
      expRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
          setActiveExpIdx(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToExperience = (idx: number) => {
    const target = expRefs.current[idx];
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -110, duration: 1.2 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="open-source" className="py-16 md:py-24 border-b border-[#27272A] bg-[#161412] relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 space-y-10 md:space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#27272A] pb-6">
          <div>
            <span className="font-mono text-[11px] text-[#0f6bf5] tracking-wider uppercase font-semibold">
              // 03. ENGINEERING EXPERIENCES &amp; PUBLIC TRACK RECORD
            </span>
            <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-white tracking-tight mt-1">
              Experiences &amp; Open Source
            </h2>
            <p className="font-sans text-[15px] text-[#9CA3AF] max-w-xl mt-1">
              Public open-source fellowships, peer-reviewed contributions, and enterprise software engineering programs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-[#0E0B08] border border-[#27272A] rounded-[2px]">
              <button
                onClick={() => setViewMode('stack')}
                className={`px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wider rounded-[2px] fast-trans flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'stack'
                    ? 'bg-[#0f6bf5] text-white shadow-sm'
                    : 'text-[#71717A] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>STACK DECK (SCROLL)</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wider rounded-[2px] fast-trans flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#0f6bf5] text-white shadow-sm'
                    : 'text-[#71717A] hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>GRID MATRIX</span>
              </button>
            </div>

            {/* GitHub Audit Anchor */}
            <a
              href={HERO_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#27272A] rounded-[2px] font-mono text-[12px] text-white fast-trans hover:border-[#0f6bf5] hover:shadow-[0_0_16px_rgba(15,107,245,0.15)] group"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] pulse-dot"></span>
              <span>github.com/riyaax07</span>
              <ExternalLink className="w-3 h-3 text-[#71717A] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* STACK DECK VIEW: Razorpay Buildathon Sticky Stacking Experience */}
        {viewMode === 'stack' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            {/* Sticky Experience Sidebar (4 cols on desktop) */}
            <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6 self-start">
              <div className="p-5 bg-[#0E0B08] border border-[#27272A] rounded-[2px] space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                  <span className="font-mono text-[11px] text-[#0f6bf5] tracking-wider uppercase font-semibold">
                    // EXPERIENCE TIMELINE
                  </span>
                  <span className="font-mono text-[11px] text-[#71717A]">
                    {String(activeExpIdx + 1).padStart(2, '0')} / {String(OPEN_SOURCE_DATA.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {OPEN_SOURCE_DATA.map((prog, idx) => {
                    const isActive = activeExpIdx === idx;
                    return (
                      <button
                        key={prog.id}
                        onClick={() => scrollToExperience(idx)}
                        className={`w-full text-left px-3 py-2.5 rounded-[2px] font-mono text-[12px] fast-trans flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? 'bg-[#0f6bf5]/15 border border-[#0f6bf5] text-white'
                            : 'text-[#71717A] hover:text-white hover:bg-[#161412] border border-transparent'
                        }`}
                      >
                        <span className="truncate pr-2 font-medium">
                          {prog.programNumber.split('//')[0].trim()}. {prog.name.split('(')[0].trim()}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-none shrink-0 ${
                            isActive ? 'bg-[#0f6bf5]' : 'bg-[#27272A] group-hover:bg-[#71717A]'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-[#27272A] font-mono text-[11px] text-[#71717A] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span>Scroll to stack experience cards</span>
                </div>
              </div>
            </div>

            {/* Stacking Experience Cards Container (8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-8 md:space-y-12 pb-24">
              {OPEN_SOURCE_DATA.map((prog, idx) => {
                return (
                  <div
                    key={prog.id}
                    ref={(el) => (expRefs.current[idx] = el)}
                    className="sticky top-[108px] transition-transform duration-300"
                    style={{
                      zIndex: 10 + idx,
                    }}
                  >
                    <ScrollReveal3D enableMouseTilt={true} intensity={0.9}>
                      <div className="w-full bg-[#0E0B08] border border-[#27272A] hover:border-[#0f6bf5] rounded-[2px] p-6 md:p-8 card-interactive group relative overflow-hidden shadow-[0_-8px_32px_rgba(0,0,0,0.85)] backdrop-blur-md">
                        {/* Header info */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[#27272A] pb-4">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[13px] font-bold text-[#0f6bf5]">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <span className="font-mono text-[11px] text-[#71717A] tracking-wider font-semibold">
                              {prog.programNumber}
                            </span>
                            <span
                              className="w-1.5 h-1.5 rounded-none"
                              style={{ backgroundColor: prog.accentColor }}
                            />
                          </div>
                          <div className="flex items-center gap-3 font-mono text-[11px] text-[#71717A]">
                            {prog.period && (
                              <span className="inline-flex items-center gap-1.5 text-neutral-400">
                                <Calendar className="w-3 h-3 text-[#71717A]" />
                                {prog.period}
                              </span>
                            )}
                            <span>•</span>
                            <span className="text-[#10B981] font-semibold flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                              {prog.status}
                            </span>
                          </div>
                        </div>

                        {/* Role & Name */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-white group-hover:text-[#b1c5ff] fast-trans tracking-tight">
                              {prog.name}
                            </h3>
                            {prog.role && (
                              <div className="font-mono text-[13px] text-[#0f6bf5] mt-1 font-semibold">
                                {prog.role}
                              </div>
                            )}
                          </div>

                          <p className="font-sans text-[15px] text-[#9CA3AF] leading-relaxed">
                            {prog.description}
                          </p>

                          {/* Key Deliverables */}
                          {prog.deliverables && prog.deliverables.length > 0 && (
                            <div className="bg-[#161412] border border-[#27272A] rounded-[2px] p-4 space-y-2 mt-3">
                              <div className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider font-semibold">
                                // KEY ENGINEERING DELIVERABLES
                              </div>
                              <ul className="space-y-1.5 font-sans text-[13px] text-neutral-300">
                                {prog.deliverables.map((item, dIdx) => (
                                  <li key={dIdx} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tech Tags */}
                          {prog.tags && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {prog.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 bg-[#161412] border border-[#27272A] rounded-[2px] font-mono text-[11px] font-semibold text-[#9CA3AF]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Footer Info & Metrics */}
                          <div className="pt-4 border-t border-[#27272A] flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2 font-mono text-[12px] text-[#71717A] font-semibold">
                              <Award className="w-3.5 h-3.5 text-[#FFA439]" />
                              <span>{prog.metrics || 'VERIFIED TRACK'}</span>
                            </div>

                            <a
                              href={HERO_DATA.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[12px] text-white hover:text-[#b1c5ff] fast-trans group/btn"
                            >
                              <span>View Public Commits</span>
                              <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal3D>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* GRID MATRIX VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPEN_SOURCE_DATA.map((prog, idx) => (
              <ScrollReveal3D key={prog.id} delay={idx * 60}>
                <div className="h-full bg-[#0E0B08] border border-[#27272A] hover:border-[#0f6bf5] rounded-[2px] p-6 flex flex-col justify-between card-interactive group shadow-lg">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[#0f6bf5] font-semibold tracking-wider">
                        {prog.programNumber}
                      </span>
                      <span className="font-mono text-[11px] text-[#10B981] font-semibold">
                        {prog.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-sans text-[20px] font-bold text-white group-hover:text-[#b1c5ff] fast-trans">
                        {prog.name}
                      </h3>
                      {prog.role && (
                        <div className="font-mono text-[12px] text-[#0f6bf5] mt-0.5 font-semibold">
                          {prog.role}
                        </div>
                      )}
                    </div>

                    <p className="font-sans text-[14px] text-[#9CA3AF] leading-relaxed">
                      {prog.description}
                    </p>

                    {prog.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {prog.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 bg-[#161412] border border-[#27272A] rounded-[2px] font-mono text-[10px] text-[#9CA3AF] font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#27272A] flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#71717A] font-semibold">
                      {prog.metrics || 'VERIFIED'}
                    </span>
                    <a
                      href={HERO_DATA.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[12px] text-white hover:text-[#b1c5ff] fast-trans group/btn"
                    >
                      <span>Commits</span>
                      <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </ScrollReveal3D>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
