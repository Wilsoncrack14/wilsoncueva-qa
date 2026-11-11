export type ExecutionStatus = 'Aprobado' | 'Parcial' | 'Fallido' | 'Pendiente de ejecución' | 'Omitido';

export type DataSourceMode = 'Auditado (Ejecución Real)' | 'Planificado / Demostración';

export interface TestCaseItem {
  id: string;
  module: string;
  scenario: string;
  expectedResult: string;
  status: ExecutionStatus;
  type: 'E2E' | 'API' | 'Functional' | 'Performance' | 'Regression' | 'Security' | 'Responsive';
  automationRef?: string;
}

export interface ProjectSectionDetail {
  title: string;
  summary: string;
  highlights: string[];
}

export interface PortfolioProject {
  id: string;
  slug: string;
  legacySlug?: string;
  order: string;
  name: string;
  shortTitle: string;
  category: string;
  tags: string[];
  description: string;
  longDescription: string;
  techStack: string[];
  dataSourceMode: DataSourceMode;
  role: string;
  date: string;
  previewVisual: {
    badge: string;
    primaryMetricLabel: string;
    primaryMetricValue: string;
    secondaryMetricLabel: string;
    secondaryMetricValue: string;
    accentStatus: 'verified' | 'planned';
    endpointOrUrl: string;
  };
  links: {
    production?: string;
    repository?: string;
    baseCommit?: string;
    qaBranch?: string;
    jsonDeliverable?: string;
  };
  architecture: {
    summary: string;
    layers: { title: string; description: string }[];
  };
  testingObjectives: string[];
  evaluatedModules: {
    name: string;
    description: string;
    totalCases: number;
    approvedCases: number;
    partialCases: number;
    pendingCases: number;
    status: ExecutionStatus;
  }[];
  testCases: TestCaseItem[];
  e2eAutomation: ProjectSectionDetail;
  apiTesting: ProjectSectionDetail;
  regressionTesting: ProjectSectionDetail;
  performanceTesting: ProjectSectionDetail;
  evidences: {
    title: string;
    type: string;
    description: string;
    reference: string;
    verified: boolean;
  }[];
  resultsSummary: {
    statusLabel: string;
    disclaimer: string;
    totalCases: number;
    automatedTests: number;
    approved: number;
    partial: number;
    failed: number;
    pending: number;
    findings: {
      id: string;
      type: string;
      severity: string;
      title: string;
      detail: string;
      solution?: string;
      caseIds: string[];
    }[];
  };
}

export interface TechnologyItem {
  id: string;
  name: string;
  category: 'Automation & Testing' | 'Languages' | 'Frontend & Web' | 'DevOps & Cloud';
  levelLabel: string;
  description: string;
  iconName: string;
}

export interface DashboardExecutionRun {
  id: string;
  projectId: string;
  projectName: string;
  branch: string;
  commit: string;
  suiteType: 'E2E Playwright' | 'Unit & API (Vitest)' | 'API Testing' | 'Performance' | 'Full Matrix';
  status: 'PASSED' | 'PARTIAL' | 'PENDING' | 'FAILED';
  isRealExecution: boolean;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  durationSeconds: number;
  date: string;
  environment: string;
  summaryNote: string;
  reportUrl?: string;
  commandExecuted: string;
  highlights: string[];
}

export interface ContactFormPayload {
  fullName: string;
  email: string;
  companyOrRole: string;
  subject: string;
  message: string;
}

export interface ContactValidationErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}
