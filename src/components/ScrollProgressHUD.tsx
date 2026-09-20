import React, { useState, useEffect } from 'react';

export const ScrollProgressHUD: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrolled)));
      setIsScrolledPastHero(winScroll > 300);

      // Detect active section
      const sections = [
        { id: 'contact', offset: 200 },
        { id: 'skills', offset: 200 },
        { id: 'open-source', offset: 200 },
        { id: 'projects', offset: 200 },
        { id: 'about', offset: 200 },
        { id: 'hero', offset: 200 },
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= sec.offset && rect.bottom > 0) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const milestones = [
    { id: 'hero', label: '00 // HOME', name: 'OVERVIEW' },
    { id: 'about', label: '01 // ABOUT', name: 'BACKGROUND' },
    { id: 'projects', label: '02 // PROJECTS', name: 'SYSTEMS' },
    { id: 'open-source', label: '03 // EXPERIENCES', name: 'PUBLIC TRACK' },
    { id: 'skills', label: '04 // ARSENAL', name: 'TECH STACK' },
    { id: 'contact', label: '05 // CONTACT', name: 'INITIATE' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Precision Laser Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#0f6bf5] via-[#3b82f6] to-[#10B981] transition-all duration-75 shadow-[0_0_12px_#0f6bf5]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Razorpay-Style Scrollytelling Telemetry Dock (Visible on desktop) */}
      <aside
        className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 pointer-events-auto transition-opacity duration-300 ${
          isScrolledPastHero ? 'opacity-100' : 'opacity-40 hover:opacity-100'
        }`}
        aria-label="Scroll Navigation Telemetry"
      >
        {/* Terminal Telemetry Box */}
        <div className="bg-[#161412]/90 backdrop-blur-md border border-[#27272A] p-2.5 rounded-[2px] font-mono text-[11px] shadow-2xl space-y-1.5 w-44">
          <div className="flex items-center justify-between text-[#71717A] border-b border-[#27272A] pb-1.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0f6bf5] animate-ping"></span>
              <span>SCROLL_HUD</span>
            </span>
            <span className="text-white font-bold tracking-wider">
              {Math.round(scrollProgress).toString().padStart(3, '0')}%
            </span>
          </div>

          <div className="space-y-1 pt-0.5">
            {milestones.map((m) => {
              const isActive = activeSection === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => scrollTo(m.id)}
                  className={`w-full flex items-center justify-between px-1.5 py-1 rounded-[2px] fast-trans text-left cursor-pointer group ${
                    isActive
                      ? 'bg-[#0f6bf5]/15 text-white font-semibold border-l-2 border-[#0f6bf5]'
                      : 'text-[#71717A] hover:text-neutral-300 hover:bg-[#1A1A1A]'
                  }`}
                >
                  <span className="text-[10px] tracking-wide">{m.label}</span>
                  <span
                    className={`w-1 h-1 rounded-full ${
                      isActive ? 'bg-[#10B981]' : 'bg-[#3F3F46] group-hover:bg-[#71717A]'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};
