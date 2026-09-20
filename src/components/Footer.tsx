import React from 'react';
import { ArrowUp } from 'lucide-react';
import { HERO_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0E0B08] border-t border-[#27272A]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="font-mono text-[16px] font-bold text-white">riya.dev()</span>
          <span className="text-[#71717A] font-mono text-[11px]">
            © 2025 Riya. Engineered with precision. Proof-of-work terminal UI.
          </span>
        </div>

        {/* Links & Back to top */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-[11px]">
          <a
            href={HERO_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#71717A] hover:text-white transition-colors duration-150"
          >
            github.com/riyaax07
          </a>
          <a
            href={`mailto:${HERO_DATA.email}`}
            className="text-[#71717A] hover:text-white transition-colors duration-150"
          >
            {HERO_DATA.email}
          </a>
          <a
            href="#open-source"
            className="text-[#71717A] hover:text-white transition-colors duration-150"
          >
            GSSoC Profile
          </a>
          <button
            onClick={onOpenResume}
            className="text-[#71717A] hover:text-white transition-colors duration-150 cursor-pointer"
          >
            Resume.pdf
          </button>
          <a
            href="#hero"
            onClick={scrollToTop}
            className="text-white border-b border-[#0f6bf5] pb-0.5 hover:text-[#b1c5ff] transition-colors duration-150 inline-flex items-center gap-1 group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
};
