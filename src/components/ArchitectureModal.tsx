import React from 'react';
import { X, ShieldCheck, Cpu, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ project, onClose }) => {
  if (!project || !project.architectureDetails) return null;

  const { overview, flowSteps, benchmarks, security } = project.architectureDetails;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#161412] border border-[#27272A] rounded-[2px] shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1A1A1A] border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#0f6bf5]" />
            <span className="font-mono text-[13px] font-semibold text-white">
              {project.title} // ARCHITECTURE SPEC
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#71717A] hover:text-white hover:bg-[#27272A] rounded-[2px] fast-trans cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto space-y-6 font-sans text-[#e9e1db]">
          {/* Overview */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#0f6bf5] font-semibold uppercase tracking-wider">
              // SPEC OVERVIEW
            </span>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">{overview}</p>
          </div>

          {/* ASCII / Topological Flow */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#0f6bf5] font-semibold uppercase tracking-wider">
              // PIPELINE EXECUTION TOPOLOGY
            </span>
            <div className="p-4 bg-[#0E0B08] border border-[#27272A] rounded-[2px] font-mono text-xs text-neutral-300 overflow-x-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
                <div className="p-2.5 bg-[#1A1A1A] border border-[#27272A] rounded-[2px] w-full sm:w-auto">
                  <div className="text-[#0f6bf5] font-bold">1. Vector Index</div>
                  <div className="text-[11px] text-[#71717A]">FAISS / 1536-dim</div>
                </div>
                <ArrowRight className="hidden sm:block text-[#71717A] shrink-0" />
                <div className="p-2.5 bg-[#1A1A1A] border border-[#27272A] rounded-[2px] w-full sm:w-auto">
                  <div className="text-[#0f6bf5] font-bold">2. Local LLM</div>
                  <div className="text-[11px] text-[#71717A]">Ollama Q4_K_M</div>
                </div>
                <ArrowRight className="hidden sm:block text-[#71717A] shrink-0" />
                <div className="p-2.5 bg-[#1A1A1A] border border-[#27272A] rounded-[2px] w-full sm:w-auto">
                  <div className="text-[#0f6bf5] font-bold">3. AST Parser</div>
                  <div className="text-[11px] text-[#71717A]">PowerShell AST</div>
                </div>
                <ArrowRight className="hidden sm:block text-[#71717A] shrink-0" />
                <div className="p-2.5 bg-[#1A1A1A] border border-[#27272A] rounded-[2px] w-full sm:w-auto">
                  <div className="text-[#10B981] font-bold">4. Remediation</div>
                  <div className="text-[11px] text-[#71717A]">SecEdit.exe / SHA256</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Flow Steps */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#0f6bf5] font-semibold uppercase tracking-wider">
              // DETAILED EXECUTION STEPS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {flowSteps.map((s, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-[#1A1A1A] border border-[#27272A] rounded-[2px] space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#0f6bf5] font-bold">{s.step}</span>
                    <h4 className="font-semibold text-white text-xs">{s.title}</h4>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmarks Grid */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#0f6bf5] font-semibold uppercase tracking-wider">
              // TELEMETRY &amp; BENCHMARKS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {benchmarks.map((b, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#0E0B08] border border-[#27272A] rounded-[2px] text-center"
                >
                  <div className="font-mono text-[10px] text-[#71717A] uppercase">{b.metric}</div>
                  <div className="font-sans text-lg font-bold text-white mt-0.5">{b.value}</div>
                  <div className="font-mono text-[10px] text-[#9CA3AF] mt-1 line-clamp-1">{b.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Guarantees */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#0f6bf5] font-semibold uppercase tracking-wider">
              // AIR-GAP &amp; SECURITY CONTROLS
            </span>
            <div className="space-y-2">
              {security.map((sec, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                  <span>{sec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#1A1A1A] border-t border-[#27272A]">
          <span className="font-mono text-xs text-[#71717A]">
            Audit Tag: {project.sha ? `SHA: ${project.sha}` : 'AIR_GAPPED_VALIDATED'}
          </span>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0f6bf5] text-white rounded-[2px] font-mono text-xs hover:bg-blue-600 fast-trans"
          >
            <span>Inspect Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
