import { WizardData } from "@/components/wizard/project-wizard";
import { Methodology } from "@/mocks/mock";

type Method = Methodology;

export function calculateRecommendation(data: WizardData): Method {
  const score: Record<Method, number> = {
    KANBAN: 0,
    SCRUM: 0,
    CASCADE: 0,
    XP: 0,
    SPIRAL: 0,
    INCREMENTAL: 0,
  };

  const rules: Array<{
    field: keyof WizardData;
    value: string;
    scores: Record<Method, number>;
  }> = [

    // --- 1. PROJECT PROFILE ---
    { field: "scopeClarity", value: "clear", scores: { CASCADE: 6, INCREMENTAL: 5, SCRUM: 3, KANBAN: 2, SPIRAL: 2, XP: 1 } },
    { field: "scopeClarity", value: "partial", scores: { INCREMENTAL: 6, SPIRAL: 5, SCRUM: 4, KANBAN: 3, XP: 2, CASCADE: 1 } },
    { field: "scopeClarity", value: "undefined", scores: { XP: 6, SCRUM: 5, SPIRAL: 5, KANBAN: 4, INCREMENTAL: 2, CASCADE: 1 } },
    
    { field: "stability", value: "pretty-stable", scores: { CASCADE: 6, INCREMENTAL: 5, KANBAN: 4, SCRUM: 3, SPIRAL: 2, XP: 1 } },
    { field: "stability", value: "always-changing", scores: { XP: 6, KANBAN: 5, SCRUM: 5, SPIRAL: 4, INCREMENTAL: 2, CASCADE: 1 } },
    
    { field: "prototype", value: "yes", scores: { SPIRAL: 6, INCREMENTAL: 5, SCRUM: 4, XP: 4, KANBAN: 2, CASCADE: 1 } },
    { field: "prototype", value: "maybe", scores: { SCRUM: 5, INCREMENTAL: 5, SPIRAL: 4, XP: 3, KANBAN: 3, CASCADE: 2 } },
    { field: "prototype", value: "no", scores: { CASCADE: 6, KANBAN: 5, INCREMENTAL: 3, SCRUM: 3, XP: 2, SPIRAL: 1 } },

    // --- 2. TEAM SIZE AND EXPERIENCE ---
    { field: "teamSize", value: "small", scores: { XP: 6, KANBAN: 6, SCRUM: 5, INCREMENTAL: 3, SPIRAL: 2, CASCADE: 1 } },
    { field: "teamSize", value: "medium", scores: { SCRUM: 6, INCREMENTAL: 5, KANBAN: 4, SPIRAL: 3, XP: 3, CASCADE: 2 } },
    { field: "teamSize", value: "big", scores: { CASCADE: 6, SPIRAL: 5, INCREMENTAL: 4, SCRUM: 3, KANBAN: 2, XP: 1 } },

    { field: "teamAvailability", value: "high", scores: { SCRUM: 6, XP: 6, SPIRAL: 5, INCREMENTAL: 4, CASCADE: 3, KANBAN: 3 } },
    { field: "teamAvailability", value: "medium", scores: { KANBAN: 6, INCREMENTAL: 5, SCRUM: 4, CASCADE: 3, SPIRAL: 2, XP: 1 } },
    { field: "teamAvailability", value: "low", scores: { KANBAN: 6, CASCADE: 5, INCREMENTAL: 3, SPIRAL: 2, SCRUM: 1, XP: 1 } },

    { field: "teamExperience", value: "high", scores: { XP: 6, SPIRAL: 6, SCRUM: 5, KANBAN: 5, INCREMENTAL: 4, CASCADE: 3 } },
    { field: "teamExperience", value: "medium", scores: { SCRUM: 6, INCREMENTAL: 5, CASCADE: 4, KANBAN: 4, SPIRAL: 3, XP: 2 } },
    { field: "teamExperience", value: "low", scores: { CASCADE: 6, KANBAN: 5, INCREMENTAL: 4, SCRUM: 3, SPIRAL: 1, XP: 1 } },

    { field: "customerParticipation", value: "constant", scores: { XP: 6, SCRUM: 5, KANBAN: 4, SPIRAL: 4, INCREMENTAL: 3, CASCADE: 1 } },
    { field: "customerParticipation", value: "weekly", scores: { SCRUM: 6, INCREMENTAL: 5, SPIRAL: 4, KANBAN: 4, XP: 3, CASCADE: 2 } },
    { field: "customerParticipation", value: "rare", scores: { CASCADE: 6, INCREMENTAL: 4, KANBAN: 3, SPIRAL: 2, SCRUM: 1, XP: 1 } },

    // --- 3. REQUIREMENTS AND FORMALITY ---
    { field: "clientNeedsClarity", value: "yes", scores: { CASCADE: 6, INCREMENTAL: 5, SCRUM: 3, KANBAN: 3, SPIRAL: 2, XP: 1 } },
    { field: "clientNeedsClarity", value: "partially", scores: { INCREMENTAL: 6, SCRUM: 5, SPIRAL: 4, KANBAN: 3, XP: 2, CASCADE: 2 } },
    { field: "clientNeedsClarity", value: "no", scores: { SPIRAL: 6, XP: 5, SCRUM: 5, KANBAN: 4, INCREMENTAL: 2, CASCADE: 1 } },

    { field: "requirementsType", value: "functional", scores: { SCRUM: 6, XP: 5, INCREMENTAL: 4, KANBAN: 4, CASCADE: 3, SPIRAL: 2 } },
    { field: "requirementsType", value: "non-functional", scores: { SPIRAL: 6, CASCADE: 5, INCREMENTAL: 4, KANBAN: 3, SCRUM: 2, XP: 1 } },
    { field: "requirementsType", value: "both", scores: { INCREMENTAL: 6, SPIRAL: 5, CASCADE: 4, SCRUM: 4, KANBAN: 3, XP: 2 } },

    { field: "documentationLevel", value: "high", scores: { CASCADE: 6, SPIRAL: 5, INCREMENTAL: 4, SCRUM: 2, KANBAN: 1, XP: 1 } },
    { field: "documentationLevel", value: "medium", scores: { INCREMENTAL: 6, SCRUM: 4, SPIRAL: 4, CASCADE: 3, KANBAN: 3, XP: 2 } },
    { field: "documentationLevel", value: "low", scores: { XP: 6, KANBAN: 6, SCRUM: 5, INCREMENTAL: 2, SPIRAL: 1, CASCADE: 1 } },

    { field: "externalDependencies", value: "high", scores: { CASCADE: 6, SPIRAL: 5, INCREMENTAL: 4, KANBAN: 3, SCRUM: 2, XP: 1 } },
    { field: "externalDependencies", value: "medium", scores: { INCREMENTAL: 5, SCRUM: 4, SPIRAL: 4, CASCADE: 3, KANBAN: 3, XP: 2 } },
    { field: "externalDependencies", value: "low", scores: { XP: 6, SCRUM: 6, KANBAN: 5, INCREMENTAL: 3, SPIRAL: 2, CASCADE: 2 } },

    // --- 4. RISKS AND COMPLEXITY ---
    { field: "technicalComplexity", value: "high", scores: { SPIRAL: 6, XP: 5, INCREMENTAL: 4, SCRUM: 4, CASCADE: 3, KANBAN: 2 } },
    { field: "technicalComplexity", value: "medium", scores: { SCRUM: 6, INCREMENTAL: 5, KANBAN: 4, CASCADE: 3, SPIRAL: 3, XP: 3 } },
    { field: "technicalComplexity", value: "low", scores: { KANBAN: 6, CASCADE: 5, INCREMENTAL: 4, SCRUM: 3, XP: 2, SPIRAL: 1 } },

    { field: "newTechUse", value: "yes", scores: { SPIRAL: 6, XP: 5, SCRUM: 4, INCREMENTAL: 3, KANBAN: 2, CASCADE: 1 } },
    { field: "newTechUse", value: "no", scores: { CASCADE: 6, INCREMENTAL: 5, KANBAN: 4, SCRUM: 3, SPIRAL: 2, XP: 2 } },

    { field: "identifiableRisks", value: "frequent-scope-changes", scores: { XP: 6, SCRUM: 5, KANBAN: 4, SPIRAL: 3, INCREMENTAL: 2, CASCADE: 1 } },
    { field: "identifiableRisks", value: "high-customers-dependence", scores: { SCRUM: 6, XP: 5, SPIRAL: 4, INCREMENTAL: 3, KANBAN: 2, CASCADE: 1 } },
    { field: "identifiableRisks", value: "inexperienced-team", scores: { CASCADE: 6, KANBAN: 5, INCREMENTAL: 4, SCRUM: 3, SPIRAL: 2, XP: 1 } },
    { field: "identifiableRisks", value: "new-technology", scores: { SPIRAL: 6, XP: 5, SCRUM: 4, INCREMENTAL: 3, KANBAN: 2, CASCADE: 1 } },
    { field: "identifiableRisks", value: "tight-deadline", scores: { KANBAN: 6, SCRUM: 5, XP: 4, INCREMENTAL: 3, CASCADE: 2, SPIRAL: 1 } },
    { field: "identifiableRisks", value: "regulations", scores: { CASCADE: 6, SPIRAL: 5, INCREMENTAL: 4, KANBAN: 2, SCRUM: 1, XP: 1 } },
  ];

  for (const rule of rules) {
    if (data[rule.field] === rule.value) {
      for (const [method, points] of Object.entries(rule.scores)) {
        score[method as Method] += points;
      }
    }
  }

  const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);

  return sorted[0][0] as Method;
}