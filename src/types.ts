export interface Project {
  id: string;
  sysId: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl: string;
  metricLabel?: string;
  metricValue?: string;
  statusTag?: string;
  statusColor?: string;
  sha?: string;
  isFeatured?: boolean;
  architectureDetails?: {
    overview: string;
    flowSteps: { step: string; title: string; detail: string }[];
    benchmarks: { metric: string; value: string; note: string }[];
    security: string[];
  };
}

export interface OpenSourceProgram {
  id: string;
  programNumber: string;
  name: string;
  role?: string;
  period?: string;
  description: string;
  status: string;
  accentColor: string;
  link?: string;
  deliverables?: string[];
  tags?: string[];
  metrics?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  countLabel: string;
  skills: { name: string; isPrimary?: boolean }[];
}

export interface TerminalLogStep {
  text: string;
  color: string;
  isFinal?: boolean;
}
