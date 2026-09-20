import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowDown, Layers, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { HERO_DATA, HOME_PILLARS_DATA } from '../data/portfolioData';
import { ScrollReveal3D } from './ScrollReveal3D';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Canvas radar animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 800);

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const spacing = 28;
    let frame = 0;
    let animationId: number;

    const draw = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;
      frame++;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const intensity = 1 - dist / 140;
            ctx.fillStyle = `rgba(15, 107, 245, ${intensity * 0.45})`;
            ctx.fillRect(x - 1, y - 1, 3, 3);
          } else if ((i + j) % 6 === 0) {
            const pulse = (Math.sin(frame * 0.02 + i + j) + 1) * 0.5;
            ctx.fillStyle = `rgba(63, 63, 70, ${0.15 + pulse * 0.15})`;
            ctx.fillRect(x, y, 1.5, 1.5);
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Track active pillar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const viewportMid = window.innerHeight * 0.45;
      pillarRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
          setActivePillarIdx(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPillar = (idx: number) => {
    const target = pillarRefs.current[idx];
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
    <section
      id="hero"
      className="relative border-b border-[#27272A] bg-[#0E0B08] py-16 md:py-24 overflow-hidden"
    >
      {/* Interactive Background Canvas & Scanner */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-[650px] pointer-events-none opacity-40 z-0"
      />
      <div
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-[#0f6bf5]/5 to-transparent pointer-events-none radar-line z-0"
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10 space-y-16 md:space-y-20">
        {/* HERO INTRO BLOCK */}
        <div className="max-w-3xl space-y-6 pt-4">
          {/* Terminal Flag / Eyebrow */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#161412]/90 backdrop-blur-sm border border-[#27272A] rounded-[2px] shadow-sm">
            <span className="w-1.5 h-1.5 bg-[#0f6bf5] rounded-none"></span>
            <span className="font-mono text-[11px] text-[#0f6bf5] uppercase tracking-wider font-semibold">
              {HERO_DATA.tagline}
            </span>
          </div>

          {/* Title Block */}
          <div className="space-y-2">
            <h1 className="font-sans text-[42px] sm:text-[56px] font-extrabold text-white tracking-tight leading-none">
              {HERO_DATA.name}
            </h1>
            <p className="font-sans text-[18px] sm:text-[20px] font-semibold text-[#9CA3AF]">
              {HERO_DATA.role}
            </p>
          </div>

          {/* Positioning Statement */}
          <p className="font-sans text-[17px] sm:text-[18px] text-[#e9e1db] max-w-2xl leading-relaxed">
            {HERO_DATA.positioning}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="bg-[#0f6bf5] text-white px-7 sm:px-8 py-3.5 rounded-[2px] font-mono text-[13px] uppercase tracking-wider fast-trans hover:ring-4 hover:ring-[#0f6bf5]/30 hover:shadow-[0_0_24px_rgba(15,107,245,0.35)] active:scale-[0.98] inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>VIEW SELECTED WORK</span>
              <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>

            <a
              href={HERO_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#27272A] bg-[#161412]/60 backdrop-blur-sm text-white px-7 sm:px-8 py-3.5 rounded-[2px] font-mono text-[13px] uppercase tracking-wider fast-trans hover:border-[#0f6bf5] hover:bg-[#1A1A1A] hover:shadow-[0_0_16px_rgba(15,107,245,0.15)] active:scale-[0.98] inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>GITHUB PROFILE</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#71717A] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Metrics Micro-Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-5 border-t border-[#27272A]/80 max-w-xl">
            <div>
              <div className="font-mono text-[12px] text-[#71717A] mb-0.5">// PRIMARY FOCUS</div>
              <div className="font-sans text-[16px] font-semibold text-white">
                {HERO_DATA.primaryFocus}
              </div>
            </div>
            <div>
              <div className="font-mono text-[12px] text-[#71717A] mb-0.5">// OPEN SOURCE</div>
              <div className="font-sans text-[16px] font-semibold text-white">
                {HERO_DATA.openSource}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-mono text-[12px] text-[#71717A] mb-0.5">// STATUS</div>
              <div className="inline-flex items-center gap-2 font-sans text-[16px] font-semibold text-[#10B981]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                </span>
                <span>{HERO_DATA.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* HOME SECTION: Razorpay Buildathon Sticky Stacking Specializations */}
        <div className="space-y-8 pt-6 border-t border-[#27272A]">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#27272A] pb-6">
            <div>
              <span className="font-mono text-[11px] text-[#0f6bf5] tracking-wider uppercase font-semibold">
                // 00. HOME FOCUS &amp; CAPABILITIES
              </span>
              <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-white tracking-tight mt-1">
                Core Systems &amp; Engineering Pillars
              </h2>
              <p className="font-sans text-[15px] text-[#9CA3AF] max-w-xl mt-1">
                The technical primitives that define my software engineering focus across offline AI, networks, and edge inference.
              </p>
            </div>

            {/* View Mode Switcher */}
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

          {/* STACK DECK VIEW: Razorpay Buildathon Sticky Stacking for Home */}
          {viewMode === 'stack' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
              {/* Sticky Left Sidebar (4 cols on desktop) */}
              <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6 self-start">
                <div className="p-5 bg-[#161412] border border-[#27272A] rounded-[2px] space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                    <span className="font-mono text-[11px] text-[#0f6bf5] tracking-wider uppercase font-semibold">
                      // SPECIALIZATIONS
                    </span>
                    <span className="font-mono text-[11px] text-[#71717A]">
                      {String(activePillarIdx + 1).padStart(2, '0')} / {String(HOME_PILLARS_DATA.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {HOME_PILLARS_DATA.map((pillar, idx) => {
                      const isActive = activePillarIdx === idx;
                      return (
                        <button
                          key={pillar.id}
                          onClick={() => scrollToPillar(idx)}
                          className={`w-full text-left px-3 py-2.5 rounded-[2px] font-mono text-[12px] fast-trans flex items-center justify-between group cursor-pointer ${
                            isActive
                              ? 'bg-[#0f6bf5]/15 border border-[#0f6bf5] text-white'
                              : 'text-[#71717A] hover:text-white hover:bg-[#1A1A1A] border border-transparent'
                          }`}
                        >
                          <span className="truncate pr-2 font-medium">
                            {pillar.num.split('//')[0].trim()}. {pillar.title.split('&')[0].trim()}
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
                    <span>Scroll to stack focus cards</span>
                  </div>
                </div>
              </div>

              {/* Stacking Cards Container (8 cols on desktop) */}
              <div className="lg:col-span-8 space-y-8 md:space-y-12 pb-12">
                {HOME_PILLARS_DATA.map((pillar, idx) => {
                  return (
                    <div
                      key={pillar.id}
                      ref={(el) => (pillarRefs.current[idx] = el)}
                      className="sticky top-[108px] transition-transform duration-300"
                      style={{
                        zIndex: 10 + idx,
                      }}
                    >
                      <ScrollReveal3D enableMouseTilt={true} intensity={0.9}>
                        <div className="w-full bg-[#1A1A1A] border border-[#27272A] hover:border-[#0f6bf5] rounded-[2px] p-6 md:p-8 card-interactive group relative overflow-hidden shadow-[0_-8px_32px_rgba(0,0,0,0.85)] backdrop-blur-md">
                          {/* Top Tag & Status */}
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[#27272A] pb-4">
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono text-[13px] font-bold text-[#0f6bf5]">
                                {String(idx + 1).padStart(2, '0')}.
                              </span>
                              <span className="font-mono text-[11px] text-[#71717A] tracking-wider font-semibold">
                                {pillar.num}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] font-mono text-[10px] font-semibold uppercase tracking-wider">
                              {pillar.statusTag}
                            </span>
                          </div>

                          {/* Title & Description */}
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-white group-hover:text-[#b1c5ff] fast-trans tracking-tight">
                                {pillar.title}
                              </h3>
                              <div className="font-mono text-[13px] text-[#0f6bf5] mt-1 font-semibold">
                                {pillar.subtitle}
                              </div>
                            </div>

                            <p className="font-sans text-[15px] text-[#9CA3AF] leading-relaxed">
                              {pillar.description}
                            </p>

                            {/* Metrics Checklist */}
                            <div className="bg-[#161412] border border-[#27272A] rounded-[2px] p-4 space-y-2">
                              <div className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider font-semibold">
                                // PROVABLE METRICS
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                                {pillar.metrics.map((m, mIdx) => (
                                  <div key={mIdx} className="flex items-center gap-2 font-mono text-[12px] text-white">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                                    <span>{m}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {pillar.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 bg-[#161412] border border-[#27272A] rounded-[2px] font-mono text-[11px] font-semibold text-[#9CA3AF]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Action link */}
                            <div className="pt-4 border-t border-[#27272A] flex items-center justify-between">
                              <span className="font-mono text-[12px] text-[#71717A]">
                                Verified in Production Codebase
                              </span>
                              <a
                                href="#projects"
                                className="inline-flex items-center gap-1 font-mono text-[12px] text-white hover:text-[#b1c5ff] fast-trans group/link"
                              >
                                <span>See Related Systems</span>
                                <ArrowDown className="w-3 h-3 group-hover/link:translate-y-0.5 transition-transform" />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOME_PILLARS_DATA.map((pillar, idx) => (
                <ScrollReveal3D key={pillar.id} delay={idx * 70}>
                  <div className="h-full bg-[#1A1A1A] border border-[#27272A] hover:border-[#0f6bf5] rounded-[2px] p-6 flex flex-col justify-between card-interactive group shadow-lg">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#71717A] font-semibold">
                          {pillar.num}
                        </span>
                        <span className="font-mono text-[10px] text-[#10B981] font-semibold">
                          {pillar.statusTag}
                        </span>
                      </div>

                      <h3 className="font-sans text-[18px] font-bold text-white group-hover:text-[#b1c5ff] fast-trans">
                        {pillar.title}
                      </h3>

                      <p className="font-sans text-[13px] text-[#9CA3AF] leading-relaxed">
                        {pillar.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {pillar.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-1.5 py-0.5 bg-[#161412] border border-[#27272A] rounded-[2px] font-mono text-[10px] text-[#9CA3AF] font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#27272A]">
                      <a
                        href="#projects"
                        className="inline-flex items-center gap-1 font-mono text-[12px] text-white hover:text-[#b1c5ff] fast-trans"
                      >
                        <span>Related Systems</span>
                        <ArrowDown className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </ScrollReveal3D>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
