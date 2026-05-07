/** Shared shape for Claude JSON inspection reports (parsed on client + server). */
export type GeneratedReportSections = {
  executiveSummary: string;
  roofCondition: string;
  foundation: string;
  electricalSystems: string;
  plumbing: string;
  hvac: string;
  recommendations: string;
};
