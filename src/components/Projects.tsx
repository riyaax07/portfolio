import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Play, Pause, RefreshCw, Layers, LayoutGrid } from 'lucide-react';
import { PROJECTS_DATA, TERMINAL_CYCLES } from '../data/portfolioData';
import { Project } from '../types';
import { ScrollReveal3D } from './ScrollReveal3D';

interface ProjectsProps {
  onSelectProjectSpec: (project: Project) => void;
  onOpenAudioDemo?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProjectSpec, onOpenAudioDemo }) => {
  // Terminal log state simulation
  const [cycleIndex, setCycleIndex] = useState(0);
  const [visibleStep, setVisibleStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');

  const activeLogs = TERMINAL_CYCLES[cycleIndex % TERMINAL_CYCLES.length];
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isPaused) return;

    if (visibleStep < activeLogs.length) {
      const timer = setTimeout(() => {
        setVisibleStep((prev) => prev + 1);
      }, visibleStep === 0 ? 350 : 500);
      return () => clearTimeout(timer);
    } else {
      const cycleTimer = setTimeout(() => {
        setCycleIndex((prev) => (prev + 1) % TERMINAL_CYCLES.length);
        setVisibleStep(0);
      }, 5000);
      return () => clearTimeout(cycleTimer);
    }
  }, [visibleStep, cycleIndex, isPaused, activeLogs.length]);

  // Track active project card as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const viewportMid = window.innerHeight * 0.45;
      projectRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
          setActiveProjectIdx(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProject = (idx: number) => {
    const target = projectRefs.current[idx];
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
    <section id="projects" className="py-16 md:py-24 border-b border-[#27272A] bg-[#0E0B08] relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 space-y-10 md:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#27272A] pb-6">
          <div>
            <span className="font-mono text-[11px] text-[#0f6bf5] tracking-wider uppercase font-semibold">
              // 02. SELECTED WORK (RAZORPAY TRACKS &amp; SYSTEMS)
            </span>
            <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-white tracking-tight mt-1">
              Engineered Systems &amp; Projects
            </h2>
            <p className="font-sans text-[15px] text-[#9CA3AF] max-w-xl mt-1">
              Production-grade implementations, local AI pipelines, and systems prototypes with zero fluff.
            </p>
          </div>

          {/* View Mode Toggle: Stack Deck vs Bento Matrix */}
          <div className="flex items-center gap-1.5 p-1 bg-[#161412] border border-[#27272A] rounded-[2px] self-start md:self-auto">
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
        </div>

        {/* STACK DECK VIEW: Razorpay Buildathon Sticky Stacking Scroll */}
        {viewMode === 'stack' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            {/* Sticky Sidebar (4 cols on desktop) */}
            <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6 self-start">
              <div className="p-5 bg-[#161412] border border-[#27272A] rounded-[2px] space-y-4">
                <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                  <span className="font-mono text-[11px] text-[#0f6bf5] tracking-wider uppercase font-semibold">
                    // TRACK INDEX
                  </span>
                  <span className="font-mono text-[11px] text-[#71717A]">
                    {String(activeProjectIdx + 1).padStart(2, '0')} / {String(PROJECTS_DATA.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {PROJECTS_DATA.map((proj, idx) => {
                    const isActive = activeProjectIdx === idx;
                    return (
                      <button
                        key={proj.id}
                        onClick={() => scrollToProject(idx)}
                        className={`w-full text-left px-3 py-2.5 rounded-[2px] font-mono text-[12px] fast-trans flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? 'bg-[#0f6bf5]/15 border border-[#0f6bf5] text-white'
                            : 'text-[#71717A] hover:text-white hover:bg-[#1A1A1A] border border-transparent'
                        }`}
                      >
                        <span className="truncate pr-2 font-medium">
                          {String(idx + 1).padStart(2, '0')}. {proj.title}
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
                  <span>Scroll down to stack cards</span>
                </div>
              </div>
            </div>

            {/* Stacking Cards Container (8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-8 md:space-y-12 pb-24">
              {PROJECTS_DATA.map((project, idx) => {
                const isFeatured = project.isFeatured;
                return (
                  <div
                    key={project.id}
                    ref={(el) => (projectRefs.current[idx] = el)}
                    className="sticky top-[108px] transition-transform duration-300"
                    style={{
                      zIndex: 10 + idx,
                    }}
                  >
                    <ScrollReveal3D enableMouseTilt={true} intensity={0.9}>
                      <div className="w-full bg-[#1A1A1A] border border-[#27272A] hover:border-[#0f6bf5] rounded-[2px] p-6 md:p-8 card-interactive group relative overflow-hidden shadow-[0_-8px_32px_rgba(0,0,0,0.85)] backdrop-blur-md">
                        {/* Header / Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[#27272A]/70 pb-4">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[13px] font-bold text-[#0f6bf5]">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <span className="font-mono text-[11px] text-[#71717A] tracking-wider font-semibold">
                              {project.sysId}
                            </span>
                            {isFeatured && (
                              <span className="px-2 py-0.5 bg-[#0f6bf5]/15 border border-[#0f6bf5]/40 text-[#0f6bf5] font-mono text-[10px] font-semibold uppercase tracking-wider">
                                PRIMARY TRACK
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2.5 font-mono text-[11px] text-[#71717A]">
                            <span className="inline-flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                              SHA: {project.sha}
                            </span>
                            <span>•</span>
                            <span className="text-[#10B981] font-semibold">{project.statusTag}</span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-4">
                          <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-white group-hover:text-[#b1c5ff] fast-trans tracking-tight">
                            {project.title}
                          </h3>
                          <p className="font-sans text-[15px] text-[#9CA3AF] leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-[#161412] border border-[#27272A] rounded-[2px] font-mono text-[11px] font-semibold tracking-wider text-[#9CA3AF]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Terminal Logs (if featured) */}
                          {isFeatured && (
                            <div className="bg-[#0E0B08] border border-[#27272A] rounded-[2px] p-4 font-mono text-xs text-[#71717A] mt-4">
                              <div className="flex items-center justify-between pb-3 border-b border-[#27272A] text-[#9CA3AF]">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]"></span>
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFA439]"></span>
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setIsPaused(!isPaused)}
                                    className="text-[#71717A] hover:text-white transition-colors"
                                    title={isPaused ? 'Resume live log' : 'Pause log'}
                                  >
                                    {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setCycleIndex((prev) => (prev + 1) % TERMINAL_CYCLES.length);
                                      setVisibleStep(0);
                                    }}
                                    className="text-[#71717A] hover:text-white transition-colors"
                                    title="Next log cycle"
                                  >
                                    <RefreshCw className="w-3 h-3" />
                                  </button>
                                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></span>
                                  <span className="text-[11px] text-[#71717A]">gpo_daemon.py [LIVE]</span>
                                </div>
                              </div>
                              <div className="pt-3 min-h-[140px] max-h-[180px] overflow-y-auto space-y-1.5 text-[#e9e1db]">
                                {activeLogs.slice(0, visibleStep).map((log, lIdx) => (
                                  <div key={lIdx} className={`${log.color} transition-opacity duration-150`}>
                                    {log.text}
                                    {log.isFinal && (
                                      <span className="term-cursor inline-block w-1.5 h-3.5 bg-[#0f6bf5] ml-1 align-middle"></span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Footer Actions & Metric */}
                          <div className="pt-4 border-t border-[#27272A] flex flex-wrap items-center justify-between gap-4">
                            <span className="font-mono text-[12px] text-[#71717A] font-semibold">
                              {project.metricLabel}
                            </span>
                            <div className="flex items-center gap-4">
                              {project.id === 'sidewalk' && onOpenAudioDemo && (
                                <button
                                  onClick={onOpenAudioDemo}
                                  className="px-2.5 py-1 bg-[#0f6bf5]/15 border border-[#0f6bf5]/40 text-[#0f6bf5] rounded-[2px] font-mono text-[11px] hover:bg-[#0f6bf5] hover:text-white transition-colors cursor-pointer"
                                >
                                  DSP Audio Demo
                                </button>
                              )}
                              <button
                                onClick={() => onSelectProjectSpec(project)}
                                className="font-mono text-[12px] text-[#71717A] hover:text-white fast-trans cursor-pointer"
                              >
                                Architecture Spec
                              </button>
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-mono text-[12px] text-white hover:text-[#b1c5ff] fast-trans group/btn"
                              >
                                <span>View Repository</span>
                                <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              </a>
                            </div>
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
            {PROJECTS_DATA.map((project, idx) => (
              <ScrollReveal3D key={project.id} delay={idx * 60}>
                <div className="h-full bg-[#1A1A1A] border border-[#27272A] hover:border-[#0f6bf5] rounded-[2px] p-6 flex flex-col justify-between card-interactive group shadow-lg">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[#71717A] font-semibold tracking-wider">
                        {project.sysId}
                      </span>
                      <span className="font-mono text-[10px] text-[#10B981] font-semibold">
                        {project.statusTag}
                      </span>
                    </div>
                    <h3 className="font-sans text-[20px] font-bold text-white group-hover:text-[#b1c5ff] fast-trans">
                      {project.title}
                    </h3>
                    <p className="font-sans text-[14px] text-[#9CA3AF] leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#161412] border border-[#27272A] rounded-[2px] font-mono text-[11px] text-[#9CA3AF] font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[#27272A] flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#71717A] font-semibold">
                      {project.metricLabel}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onSelectProjectSpec(project)}
                        className="font-mono text-[12px] text-[#71717A] hover:text-white fast-trans cursor-pointer"
                      >
                        Spec
                      </button>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[12px] text-white hover:text-[#b1c5ff] fast-trans group/btn"
                      >
                        <span>Repo</span>
                        <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
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
