import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "data",
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    subtitle: z.string(),
    category: z.array(z.string()),
    role: z.string(),
    date: z.string(),
    links: z.object({
      production: z.string().url(),
      repository: z.string().url(),
      baseCommit: z.string(),
      qaBranch: z.string(),
    }),
    techStack: z.array(z.string()),
    executiveSummary: z.string(),
    metrics: z.object({
      totalTestCases: z.number(),
      businessRisksMapped: z.number(),
      vitestSuites: z.number(),
      vitestTotalTests: z.number(),
      vitestDurationSeconds: z.number(),
      playwrightSuites: z.number(),
      playwrightTotalTests: z.number(),
      viewportsTested: z.array(z.string()),
      coverageBreakdown: z.object({
        automated: z.object({ count: z.number(), percentage: z.number(), label: z.string() }),
        hybridPartial: z.object({ count: z.number(), percentage: z.number(), label: z.string() }),
        manual: z.object({ count: z.number(), percentage: z.number(), label: z.string() }),
      }),
      executionResults: z.object({
        approved: z.number(),
        partial: z.number(),
        blocked: z.number(),
        notExecuted: z.number(),
      }),
    }),
    architectureHighlights: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    testingPyramid: z.array(
      z.object({
        layer: z.string(),
        files: z.number().optional(),
        tests: z.number().optional(),
        cases: z.number().optional(),
        duration: z.string().optional(),
        scope: z.array(z.string()),
      })
    ),
    keyFindingsAndSolutions: z.array(
      z.object({
        id: z.string(),
        type: z.string(),
        severity: z.string(),
        title: z.string(),
        detail: z.string(),
        solution: z.string().optional(),
        caseIds: z.array(z.string()),
      })
    ),
    modulesSummary: z.array(
      z.object({
        module: z.string(),
        cases: z.number(),
        approved: z.number(),
        partial: z.number(),
      })
    ),
  }),
});

export const collections = {
  projects: projectsCollection,
};
