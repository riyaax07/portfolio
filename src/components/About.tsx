import React from 'react';
import { MapPin, Cpu, Terminal, GitBranch } from 'lucide-react';
import { ABOUT_DATA } from '../data/portfolioData';
import { ScrollReveal3D } from './ScrollReveal3D';

export const About: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'memory':
        return <Cpu className="w-[18px] h-[18px] text-[#0f6bf5]" />;
      case 'terminal':
        return <Terminal className="w-[18px] h-[18px] text-[#0f6bf5]" />;
      case 'code_blocks':
        return <GitBranch className="w-[18px] h-[18px] text-[#0f6bf5]" />;
      default:
        return <Cpu className="w-[18px] h-[18px] text-[#0f6bf5]" />;
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 border-b border-[#27272A] bg-[#0E0B08] relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-[11px] text-[#0f6bf5] tracking-wider uppercase font-semibold">
              {ABOUT_DATA.sectionTag}
            </span>
            <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-white tracking-tight leading-tight">
              {ABOUT_DATA.title}
            </h2>
            <div className="flex items-center gap-2 text-[#71717A] font-mono text-[13px]">
              <MapPin className="w-4 h-4 text-[#71717A]" />
              <span>{ABOUT_DATA.location}</span>
            </div>
          </div>

          {/* Right Column (8 cols) */}
          <div className="md:col-span-8 space-y-6">
            <div className="space-y-4 font-sans text-[15px] text-[#e9e1db] leading-relaxed">
              {ABOUT_DATA.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* 3 Factual Credential Cards with 3D Tilt on Scroll */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {ABOUT_DATA.credentials.map((card, idx) => (
                <ScrollReveal3D key={idx} delay={idx * 80}>
                  <div className="h-full p-4 bg-[#1A1A1A] border border-[#27272A] rounded-[2px] card-interactive hover:bg-[#222222] group shadow-md">
                    <div className="flex items-center justify-between pb-2">
                      <span className="font-mono text-[11px] text-[#71717A]">{card.num}</span>
                      <div className="group-hover:scale-110 transition-transform">
                        {getIcon(card.icon)}
                      </div>
                    </div>
                    <h3 className="font-sans text-[16px] font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="font-sans text-[13px] text-[#9CA3AF] mt-1.5 leading-normal">
                      {card.description}
                    </p>
                  </div>
                </ScrollReveal3D>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
