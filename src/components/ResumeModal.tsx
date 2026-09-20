import React, { useState } from 'react';
import { X, Printer, Download, Copy, Check, FileText } from 'lucide-react';
import { HERO_DATA, PROJECTS_DATA, SKILLS_DATA, OPEN_SOURCE_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = async () => {
    const markdown = `# RIYA
Software Engineering Student @ ABES EC
Email: ${HERO_DATA.email} | GitHub: ${HERO_DATA.githubUrl} | Location: ${HERO_DATA.location}

## SUMMARY
Engineering high-throughput systems, offline AI security tooling, and low-latency full-stack software. Targeting competitive SWE internship roles with a proof-of-work ethos.

## EDUCATION
ABES Engineering College, Delhi NCR, India
Bachelor of Technology in Computer Science & Engineering
Focus: Formal Language Theory, Automata Theory, Algorithmic Optimization, Distributed Systems

## TECHNICAL SKILLS
- Languages: Python (Primary), C/C++, JavaScript (ES6+), TypeScript, SQL, Bash, PowerShell
- Web & Frameworks: FastAPI, Flask, React.js, Next.js, Node.js, Tailwind CSS, REST APIs
- Systems, AI & Infra: Docker, Git/GitHub, FAISS Vector DB, Ollama, LangChain, Linux, Redis
- CS Foundations: Automata Theory, Operating Systems, Computer Networks, DBMS, DSA

## FEATURED PROJECTS
1. GPO-CIS Automation Tool
- Offline AI-powered compliance platform automating Windows security policy hardening against CIS Benchmarks.
- Integrates local LLM inference (Ollama), vector search (FAISS), and automated PowerShell AST synthesis with 0ms external egress.

2. Human Activity Detection for Adaptive Surveillance Compression
- Vision-driven edge pipeline (OpenCV, PyTorch, FFmpeg) detecting human activity to modulate video frame bitrates, reducing bandwidth by 42%.

3. Humsafar: Long-Distance Family Suite
- Cross-platform communication suite (React Native, Node.js, WebSockets, PostgreSQL) with asynchronous audio journals and <45ms sync latency.

## OPEN SOURCE & FELLOWSHIPS
- GirlScript Summer of Code (GSSoC '25 & '26): Active contributor, authoring bugfixes and performance PRs.
- Open Source Community India: Fellowship track on system programming and code review standards.
- Scaler School of Tech: Systems curriculum and backend reliability.
- Walmart Global Tech: Advanced SWE Virtual Experience (Distributed databases & high-scale architecture).
`;

    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#161412] border border-[#27272A] rounded-[2px] shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1A1A1A] border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0f6bf5]" />
            <span className="font-mono text-[13px] font-semibold text-white">
              Riya_SWE_Resume.pdf [PREVIEW]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#161412] border border-[#27272A] hover:border-[#0f6bf5] text-[#9CA3AF] hover:text-white rounded-[2px] font-mono text-[11px] fast-trans cursor-pointer"
              title="Copy as Markdown"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>COPY MD</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0f6bf5] text-white hover:bg-blue-600 rounded-[2px] font-mono text-[11px] fast-trans cursor-pointer"
              title="Print or Save PDF"
            >
              <Printer className="w-3 h-3" />
              <span>PRINT / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#71717A] hover:text-white hover:bg-[#27272A] rounded-[2px] fast-trans cursor-pointer ml-1"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto font-sans text-[#e9e1db] space-y-6 print:p-0 print:text-black">
          {/* Header */}
          <div className="border-b border-[#27272A] pb-5 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Riya</h1>
              <span className="font-mono text-xs text-[#0f6bf5] uppercase font-semibold tracking-wider">
                Software Engineering Student
              </span>
            </div>
            <p className="text-sm text-[#9CA3AF]">
              Delhi NCR, India • {HERO_DATA.email} • github.com/riyaax07 • linkedin.com/in/riya-dev
            </p>
            <p className="text-sm text-[#e9e1db] pt-1 leading-relaxed">
              Software engineering undergraduate specializing in high-throughput distributed systems, offline AI security tooling, and low-latency software architectures.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-b border-[#27272A] pb-1">
              <span className="font-mono text-xs text-[#0f6bf5] uppercase font-semibold tracking-wider">
                // EDUCATION
              </span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-white">ABES Engineering College</h3>
                <p className="text-sm text-[#9CA3AF]">Bachelor of Technology in Computer Science &amp; Engineering</p>
                <p className="text-xs text-[#71717A] mt-0.5">
                  Core: Formal Language Theory, Automata Theory, Operating Systems, Algorithm Optimization
                </p>
              </div>
              <span className="font-mono text-xs text-[#71717A] shrink-0">2023 – 2027</span>
            </div>
          </div>

          {/* Technical Arsenal */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-b border-[#27272A] pb-1">
              <span className="font-mono text-xs text-[#0f6bf5] uppercase font-semibold tracking-wider">
                // TECHNICAL ARSENAL
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-mono text-xs text-[#71717A] block">LANGUAGES</span>
                <p className="text-neutral-200">Python (Primary), C, C++, JavaScript (ES6+), TypeScript, SQL, Bash, PowerShell</p>
              </div>
              <div>
                <span className="font-mono text-xs text-[#71717A] block">WEB &amp; FRAMEWORKS</span>
                <p className="text-neutral-200">FastAPI, Flask, React.js, Next.js, Node.js, Tailwind CSS, REST APIs</p>
              </div>
              <div>
                <span className="font-mono text-xs text-[#71717A] block">SYSTEMS, AI &amp; INFRA</span>
                <p className="text-neutral-200">Docker, Git/GitHub, FAISS Vector DB, Ollama, LangChain, Linux, Redis</p>
              </div>
              <div>
                <span className="font-mono text-xs text-[#71717A] block">CS FOUNDATIONS</span>
                <p className="text-neutral-200">Automata Theory, Operating Systems, Computer Networks, DBMS, DSA</p>
              </div>
            </div>
          </div>

          {/* Selected Work */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#27272A] pb-1">
              <span className="font-mono text-xs text-[#0f6bf5] uppercase font-semibold tracking-wider">
                // SELECTED SYSTEMS &amp; PROJECTS
              </span>
            </div>

            {PROJECTS_DATA.slice(0, 3).map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <span>{proj.title}</span>
                    <span className="font-mono text-[10px] text-[#0f6bf5] bg-[#0f6bf5]/10 px-1.5 py-0.5 rounded-[2px]">
                      {proj.tags.slice(0, 3).join(' • ')}
                    </span>
                  </h4>
                  <span className="font-mono text-xs text-[#71717A]">{proj.metricLabel || 'AIR-GAPPED'}</span>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>

          {/* Open Source */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-b border-[#27272A] pb-1">
              <span className="font-mono text-xs text-[#0f6bf5] uppercase font-semibold tracking-wider">
                // OPEN SOURCE COMMITMENTS &amp; FELLOWSHIPS
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {OPEN_SOURCE_DATA.map((prog) => (
                <div key={prog.id} className="bg-[#1A1A1A] p-3 rounded-[2px] border border-[#27272A]">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-white text-xs">{prog.name}</h4>
                    <span className="font-mono text-[10px] text-[#0f6bf5]">{prog.status}</span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-normal">{prog.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
