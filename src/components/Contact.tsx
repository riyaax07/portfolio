import React, { useState } from 'react';
import { Mail, Terminal, Database, ArrowDown, Check } from 'lucide-react';
import { HERO_DATA } from '../data/portfolioData';
import { ScrollReveal3D } from './ScrollReveal3D';

interface ContactProps {
  onCopyEmail: (email: string) => void;
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onCopyEmail, onOpenResume }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(HERO_DATA.email);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = HERO_DATA.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopied(true);
    onCopyEmail(HERO_DATA.email);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#0E0B08] relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-[#0f6bf5] tracking-wider uppercase font-semibold">
              // 05. INITIATE CONTACT
            </span>
            <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-white tracking-tight">
              Let's build something enduring.
            </h2>
            <p className="font-sans text-[15px] text-[#9CA3AF] pt-1">
              Actively seeking Summer 2025/2026 Software Engineering Internship roles. Open to distributed systems, backend engineering, and core infrastructure discussions.
            </p>
          </div>

          {/* Interactive Monospace Link Cluster with 3D Scrolly Tilt */}
          <ScrollReveal3D delay={0}>
            <div className="p-6 bg-[#1A1A1A] border border-[#27272A] rounded-[2px] space-y-3 text-left shadow-2xl">
              {/* Email Item */}
              <div className="flex items-center justify-between p-3.5 bg-[#161412] border border-[#27272A] rounded-[2px] fast-trans hover:border-[#3F3F46]">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-[18px] h-[18px] text-[#0f6bf5] shrink-0" />
                  <span className="font-mono text-[13px] text-white truncate" id="email-text">
                    {HERO_DATA.email}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className={`font-mono text-[11px] font-semibold tracking-wider px-3 py-1.5 bg-[#0E0B08] border rounded-[2px] fast-trans active:scale-95 cursor-pointer shrink-0 inline-flex items-center gap-1 ${
                    copied
                      ? 'border-[#0f6bf5] text-[#b1c5ff]'
                      : 'border-[#27272A] text-[#71717A] hover:text-white hover:border-[#0f6bf5]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#10B981]" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <span>COPY</span>
                  )}
                </button>
              </div>

              {/* GitHub Link */}
              <a
                href={HERO_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-[#161412] border border-[#27272A] rounded-[2px] fast-trans hover:border-[#3F3F46] group"
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-[18px] h-[18px] text-[#71717A] group-hover:text-white fast-trans shrink-0" />
                  <span className="font-mono text-[13px] text-white">github.com/riyaax07</span>
                </div>
                <span className="font-mono text-[11px] text-[#71717A] group-hover:text-[#b1c5ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all font-semibold">
                  OPEN ↗
                </span>
              </a>

              {/* LinkedIn Link */}
              <a
                href={HERO_DATA.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-[#161412] border border-[#27272A] rounded-[2px] fast-trans hover:border-[#3F3F46] group"
              >
                <div className="flex items-center gap-2.5">
                  <Database className="w-[18px] h-[18px] text-[#71717A] group-hover:text-white fast-trans shrink-0" />
                  <span className="font-mono text-[13px] text-white">linkedin.com/in/riya-dev</span>
                </div>
                <span className="font-mono text-[11px] text-[#71717A] group-hover:text-[#b1c5ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all font-semibold">
                  OPEN ↗
                </span>
              </a>
            </div>
          </ScrollReveal3D>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenResume}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#0f6bf5] text-white rounded-[2px] font-mono text-[13px] uppercase tracking-wider fast-trans hover:ring-4 hover:ring-[#0f6bf5]/30 hover:shadow-[0_0_24px_rgba(15,107,245,0.3)] active:scale-[0.98] inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>DOWNLOAD RESUME (PDF)</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
