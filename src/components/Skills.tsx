import React from 'react';
import { Code, Globe, Server, Network } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { ScrollReveal3D } from './ScrollReveal3D';

export const Skills: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-[18px] h-[18px] text-[#0f6bf5]" />;
      case 'web':
        return <Globe className="w-[18px] h-[18px] text-[#0f6bf5]" />;
      case 'dns':
        return <Server className="w-[18px] h-[18px] text-[#0f6bf5]" />;
      case 'schema':
        return <Network className="w-[18px] h-[18px] text-[#0f6bf5]" />;
      default:
        return <Code className="w-[18px] h-[18px] text-[#0f6bf5]" />;
    }
  };

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-[#27272A] bg-[#0E0B08] relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 space-y-10 md:space-y-12">
        {/* Header */}
        <div className="border-b border-[#27272A] pb-6">
          <span className="font-mono text-[11px] text-[#0f6bf5] tracking-wider uppercase font-semibold">
            // 04. TECHNICAL ARSENAL
          </span>
          <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-white tracking-tight mt-1">
            Skills &amp; Proficiencies
          </h2>
          <p className="font-sans text-[15px] text-[#9CA3AF] mt-1 max-w-xl">
            Categorized technical capabilities calibrated for low overhead and scalable system production.
          </p>
        </div>

        {/* 4 Distinct Arsenal Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS_DATA.map((category, idx) => (
            <ScrollReveal3D key={category.id} delay={idx * 80}>
              <div className="h-full p-6 bg-[#1A1A1A] border border-[#27272A] rounded-[2px] space-y-4 card-interactive hover:bg-[#222222] shadow-lg">
                <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                  <h3 className="font-sans text-[16px] font-semibold text-white flex items-center gap-2">
                    {getCategoryIcon(category.icon)}
                    <span>{category.name}</span>
                  </h3>
                  <span className="font-mono text-[11px] text-[#71717A] font-semibold tracking-wider">
                    {category.countLabel}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 bg-[#161412] rounded-[2px] font-mono text-[13px] fast-trans ${
                        skill.isPrimary
                          ? 'border border-[#0f6bf5]/40 text-white hover:border-[#0f6bf5]'
                          : 'border border-[#27272A] text-[#9CA3AF] hover:text-white hover:border-[#3F3F46]'
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal3D>
          ))}
        </div>
      </div>
    </section>
  );
};
