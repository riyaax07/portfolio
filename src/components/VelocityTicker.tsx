import React, { useEffect, useState, useRef } from 'react';

export const VelocityTicker: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const lastScrollY = useRef(0);
  const velocityRef = useRef(1);

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = Math.abs(currentScroll - lastScrollY.current);
      lastScrollY.current = currentScroll;
      // Boost velocity when scrolling fast
      velocityRef.current = Math.min(8, 1 + delta * 0.15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const loop = () => {
      // Natural decay towards normal speed
      velocityRef.current += (1 - velocityRef.current) * 0.05;
      setOffset((prev) => (prev - velocityRef.current * 0.75) % 1200);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const items = [
    'AI AGENTIC COMMERCE',
    'DISTRIBUTED FINANCIAL CONSENSUS',
    'ZERO LATENCY PIPELINES',
    'PROVABLE RISK AUDITING',
    'SYSTEMS ARCHITECTURE',
    'WEBRTC LOW-LEVEL DSP',
    'HIGH PERFORMANCE INFERENCE',
    'REAL-TIME REVENUE RECOVERY',
  ];

  return (
    <div className="w-full overflow-hidden border-y border-[#27272A] bg-[#161412] py-3 select-none relative">
      <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#0E0B08] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#0E0B08] to-transparent z-10 pointer-events-none" />

      <div
        className="flex whitespace-nowrap gap-8 font-mono text-[11px] text-[#71717A] tracking-widest uppercase font-semibold will-change-transform"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="hover:text-white transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#0f6bf5] rounded-none"></span>
              {item}
            </span>
            <span className="text-[#3F3F46]">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
