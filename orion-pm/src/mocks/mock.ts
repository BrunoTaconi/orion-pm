//////////////////////////////////////////////////////
// ENUM TYPES (copiados do schema)
//////////////////////////////////////////////////////

export type Methodology =
  | "SCRUM"
  | "KANBAN"
  | "CASCADE"
  | "XP"
  | "INCREMENTAL"
  | "SPIRAL";
export type ProjectVisibility = "PRIVATE" | "TEAM" | "PUBLIC";
export type BoardType = "SCRUM" | "KANBAN";
export type WorkItemType = "TASK" | "STORY" | "BUG" | "SPIKE" | "TECH_DEBT";
export type SprintStatus = "PLANNED" | "ACTIVE" | "CLOSED";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

//////////////////////////////////////////////////////
// USER
//////////////////////////////////////////////////////

export type UserMock = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export const usersMock: UserMock[] = [
  {
    id: "user-1",
    name: "Bruno Taconi",
    email: "bruno@email.com",
    createdAt: new Date(),
  },
  {
    id: "user-2",
    name: "Ana Souza",
    email: "ana@email.com",
    createdAt: new Date(),
  },
  {
    id: "user-3",
    name: "Carlos Lima",
    email: "carlos@email.com",
    createdAt: new Date(),
  },
];

//////////////////////////////////////////////////////
// TEAM
//////////////////////////////////////////////////////

export type TeamMock = {
  id: string;
  name: string;
  ownerId: string;
  avatarUrl: string;
};

export const teamsMock: TeamMock[] = [
  {
    id: "team-1",
    name: "Core Engineering",
    ownerId: "user-1",
    avatarUrl:
      "https://source.boringavatars.com/bauhaus/120/Core%20Engineering?colors=264653,2a9d8f,e9c46a,f4a261,e76f51",
  },
  {
    id: "team-2",
    name: "Growth & Marketing",
    ownerId: "user-1",
    avatarUrl:
      "https://source.boringavatars.com/bauhaus/120/Growth%20Marketing?colors=8ecae6,219ebc,023047,ffb703,fb8500",
  },
  {
    id: "team-3",
    name: "Data & AI Solutions",
    ownerId: "user-2",
    avatarUrl:
      "https://source.boringavatars.com/bauhaus/120/Data%20AI%20Solutions?colors=cdb4db,ffc8dd,ffafcc,bde0fe,a2d2ff",
  },
];

export type TeamMemberMock = {
  id: string;
  userId: string;
  teamId: string;
  role: string;
};

export const teamMembersMock: TeamMemberMock[] = [
  { id: "tm-1", userId: "user-1", teamId: "team-1", role: "OWNER" },
  { id: "tm-2", userId: "user-2", teamId: "team-1", role: "DEVELOPER" },
  { id: "tm-3", userId: "user-3", teamId: "team-1", role: "DEVELOPER" },
  { id: "tm-4", userId: "user-1", teamId: "team-2", role: "OWNER" },
  { id: "tm-5", userId: "user-2", teamId: "team-3", role: "OWNER" },
];

//////////////////////////////////////////////////////
// PROJECT
//////////////////////////////////////////////////////

export type ProjectMock = {
  id: string;
  name: string;
  description: string;
  methodology: Methodology;
  visibility: ProjectVisibility;
  ownerId: string;
  teamId: string;
  createdAt: Date;
};

export const projectsMock: ProjectMock[] = [
  {
    id: "project-1",
    name: "Orion Project Manager",
    description: "Agile project management system",
    methodology: "SCRUM",
    visibility: "TEAM",
    ownerId: "user-1",
    teamId: "team-1",
    createdAt: new Date(),
  },
  {
    id: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    name: "Test Project",
    description: "Testing the wizard creation",
    methodology: "SCRUM",
    visibility: "PUBLIC",
    ownerId: "user-1",
    teamId: "team-1",
    createdAt: new Date("2026-03-06T18:27:55"),
  },
  {
    id: "project-kanban",
    name: "Marketing Flow",
    description: "Testing Kanban development",
    methodology: "KANBAN",
    visibility: "TEAM",
    ownerId: "user-1",
    teamId: "team-2",
    createdAt: new Date("2026-03-01T18:27:55"),
  },
  {
    id: "project-cascade",
    name: "Legacy Migration",
    description: "Testing Cascade development",
    methodology: "CASCADE",
    visibility: "TEAM",
    ownerId: "user-1",
    teamId: "team-1",
    createdAt: new Date("2026-03-01T18:27:55"),
  },
  {
    id: "project-xp",
    name: "Rapid API Service",
    description: "Testing XP development",
    methodology: "XP",
    visibility: "TEAM",
    ownerId: "user-1",
    teamId: "team-3",
    createdAt: new Date("2026-03-01T18:27:55"),
  },
  {
    id: "project-incremental",
    name: "Mobile App v2",
    description: "Testing Incremental development",
    methodology: "INCREMENTAL",
    visibility: "TEAM",
    ownerId: "user-1",
    teamId: "team-2",
    createdAt: new Date("2026-03-01T18:27:55"),
  },
  {
    id: "project-spiral",
    name: "AI Risk Engine",
    description: "Testing Spiral development",
    methodology: "SPIRAL",
    visibility: "TEAM",
    ownerId: "user-1",
    teamId: "team-3",
    createdAt: new Date("2026-03-01T18:27:55"),
  },
];

//////////////////////////////////////////////////////
// WIZARD
//////////////////////////////////////////////////////

export type WizardSessionMock = {
  id: string;
  projectId: string;
  recommendedMethodology: Methodology;
  finalMethodology: Methodology;
  createdAt: Date;
};

export const wizardSessionsMock: WizardSessionMock[] = [
  {
    id: "wizard-1",
    projectId: "project-1",
    recommendedMethodology: "SCRUM",
    finalMethodology: "SCRUM",
    createdAt: new Date(),
  },
];

export type WizardAnswerMock = {
  id: string;
  sessionId: string;
  questionKey: string;
  value: string;
};

export const wizardAnswersMock: WizardAnswerMock[] = [
  { id: "wa-1", sessionId: "wizard-1", questionKey: "team_size", value: "5" },
  {
    id: "wa-2",
    sessionId: "wizard-1",
    questionKey: "requirements_volatility",
    value: "high",
  },
];

//////////////////////////////////////////////////////
// BOARD
//////////////////////////////////////////////////////

export type BoardMock = {
  id: string;
  projectId: string;
  type: BoardType;
};

export const boardsMock: BoardMock[] = [
  {
    id: "board-1",
    projectId: "project-1",
    type: "SCRUM",
  },
  {
    id: "board-2",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    type: "SCRUM",
  },
  { id: "board-kanban", projectId: "project-kanban", type: "KANBAN" },
  { id: "board-xp", projectId: "project-xp", type: "SCRUM" },
  { id: "board-spiral", projectId: "project-spiral", type: "KANBAN" },
  { id: "board-cascade", projectId: "project-cascade", type: "KANBAN" },
];

export type ColumnMock = {
  id: string;
  boardId: string;
  name: string;
  order: number;
  wipLimit?: number;
};

export const columnsMock: ColumnMock[] = [
  { id: "col-2-1", boardId: "board-2", name: "To Do", order: 1 },
  { id: "col-2-2", boardId: "board-2", name: "In Progress", order: 2 },
  { id: "col-2-3", boardId: "board-2", name: "In Review", order: 3 },
  { id: "col-2-4", boardId: "board-2", name: "In Validation", order: 4 },
  { id: "col-2-5", boardId: "board-2", name: "Done", order: 5 },
  {
    id: "col-k-1",
    boardId: "board-kanban",
    name: "Backlog",
    order: 1,
  },
  {
    id: "col-k-2",
    boardId: "board-kanban",
    name: "In Progress",
    order: 2,
    wipLimit: 3,
  },
  {
    id: "col-k-3",
    boardId: "board-kanban",
    name: "Review",
    order: 3,
    wipLimit: 2,
  },
  {
    id: "col-k-4",
    boardId: "board-kanban",
    name: "Done",
    order: 4,
  },
];

//////////////////////////////////////////////////////
// CASCADE
//////////////////////////////////////////////////////

export type PhaseStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export type PhaseMock = {
  id: string;
  projectId: string;
  name: string;
  order: number;
  startDate: Date;
  endDate: Date;
  status: PhaseStatus;
  description?: string;
};

export const phasesMock: PhaseMock[] = [
  {
    id: "phase-1",
    projectId: "project-cascade",
    name: "Requirements",
    order: 1,
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-01-31"),
    status: "COMPLETED",
  },
  {
    id: "phase-2",
    projectId: "project-cascade",
    name: "Design",
    order: 2,
    startDate: new Date("2026-02-01"),
    endDate: new Date("2026-02-28"),
    status: "COMPLETED",
  },
  {
    id: "phase-3",
    projectId: "project-cascade",
    name: "Implementation",
    order: 3,
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-04-30"),
    status: "IN_PROGRESS",
  },
  {
    id: "phase-4",
    projectId: "project-cascade",
    name: "Testing",
    order: 4,
    startDate: new Date("2026-05-01"),
    endDate: new Date("2026-05-31"),
    status: "PENDING",
  },
  {
    id: "phase-5",
    projectId: "project-cascade",
    name: "Deployment",
    order: 5,
    startDate: new Date("2026-06-01"),
    endDate: new Date("2026-06-15"),
    status: "PENDING",
  },
];

//////////////////////////////////////////////////////
// SPRINT
//////////////////////////////////////////////////////

export type SprintMock = {
  id: string;
  projectId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: SprintStatus;
};

const today = new Date();

export const sprintsMock: SprintMock[] = [
  {
    id: "sprint-1",
    projectId: "project-1",
    name: "Sprint 1",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(today.getDate() + 14)),
    status: "CLOSED",
  },
  {
    id: "sprint-hist-1",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    name: "Sprint 1",
    startDate: new Date(new Date().setDate(today.getDate() - 35)),
    endDate: new Date(new Date().setDate(today.getDate() - 21)),
    status: "CLOSED",
  },
  {
    id: "sprint-hist-2",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    name: "Sprint 2",
    startDate: new Date(new Date().setDate(today.getDate() - 21)),
    endDate: new Date(new Date().setDate(today.getDate() - 7)),
    status: "CLOSED",
  },
  {
    id: "sprint-3", // ID corrigido para bater com as tarefas
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    name: "Sprint 3",
    startDate: new Date(new Date().setDate(today.getDate() - 7)),
    endDate: new Date(new Date().setDate(today.getDate() + 7)),
    status: "ACTIVE",
  },
];

//////////////////////////////////////////////////////
// WORK ITEMS
//////////////////////////////////////////////////////

export type WorkItemMock = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  type: WorkItemType;
  status: string;
  priority: Priority;
  storyPoints?: number;
  sprintId?: string; //scrum, xp
  phaseId?: string; // cascade, incremental, spiral
  releaseId?: string; //incremental, xp, spiral
  columnId?: string;
  assigneeId?: string;
  createdAt: Date;
  acceptanceCriteria?: AcceptanceCriteria[];

  timeInProgress?: number;
  timeInReview?: number;
  timeInValidation?: number;
  statusUpdatedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
};

export const workItemsMock: WorkItemMock[] = [
  {
    id: "wi-h1-1",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Initial App Setup",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 3,
    sprintId: "sprint-hist-1",
    createdAt: new Date(new Date().setDate(today.getDate() - 35)),
    timeInProgress: 24,
    timeInReview: 8,
    timeInValidation: 2,
  },
  {
    id: "wi-h1-2",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Create GitHub repository",
    description: "",
    type: "TASK",
    status: "DONE",
    priority: "MEDIUM",
    storyPoints: 3,
    sprintId: "sprint-hist-1",
    createdAt: new Date(new Date().setDate(today.getDate() - 34)),
    timeInProgress: 5,
    timeInReview: 2,
    timeInValidation: 0,
  },
  {
    id: "wi-h2-1",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "OAuth Authentication",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 13,
    sprintId: "sprint-hist-2",
    createdAt: new Date(new Date().setDate(today.getDate() - 20)),
    timeInProgress: 45,
    timeInReview: 12,
    timeInValidation: 5,
  },
  {
    id: "wi-h2-2",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Login screen bug",
    description: "",
    type: "BUG",
    status: "DONE",
    priority: "CRITICAL",
    storyPoints: 0,
    sprintId: "sprint-hist-2",
    createdAt: new Date(new Date().setDate(today.getDate() - 15)),
    timeInProgress: 8,
    timeInReview: 4,
    timeInValidation: 2,
  },
  {
    id: "wi-3",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Setup database",
    description: "Deploy Prisma and Postgres",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 5,
    sprintId: "sprint-3",
    assigneeId: "user-1",
    columnId: "col-2-5",
    createdAt: new Date(new Date().setDate(today.getDate() - 8)),
    startedAt: new Date(new Date().setDate(today.getDate() - 7)),
    completedAt: new Date(new Date().setDate(today.getDate() - 5)),
    timeInProgress: 18.2,
    timeInReview: 4.5,
    timeInValidation: 2.0,
  },
  {
    id: "wi-4",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Create Board screen",
    description: "Implement Kanban drag and drop",
    type: "STORY",
    status: "DONE",
    priority: "MEDIUM",
    storyPoints: 3,
    sprintId: "sprint-3",
    assigneeId: "user-2",
    columnId: "col-2-5",
    createdAt: new Date(new Date().setDate(today.getDate() - 8)),
    startedAt: new Date(new Date().setDate(today.getDate() - 6)),
    completedAt: new Date(new Date().setDate(today.getDate() - 2)),
    timeInProgress: 32.0,
    timeInReview: 8.5,
    timeInValidation: 1.0,
  },
  {
    id: "wi-5",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Refactor Header UI",
    description: "Remove legacy Tailwind code",
    type: "TECH_DEBT",
    status: "DONE",
    priority: "LOW",
    storyPoints: 3,
    sprintId: "sprint-3",
    assigneeId: "user-1",
    columnId: "col-2-5",
    createdAt: new Date(new Date().setDate(today.getDate() - 8)),
    startedAt: new Date(new Date().setDate(today.getDate() - 3)),
    completedAt: new Date(new Date().setDate(today.getDate() - 1)),
    timeInProgress: 12.0,
    timeInReview: 2.0,
    timeInValidation: 0,
  },
  {
    id: "wi-6",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Investigate API slowdown",
    description: "List endpoint taking > 2s",
    type: "SPIKE",
    status: "IN_REVIEW",
    priority: "MEDIUM",
    storyPoints: 3,
    sprintId: "sprint-3",
    assigneeId: "user-3",
    columnId: "col-2-3",
    createdAt: new Date(new Date().setDate(today.getDate() - 5)),
    startedAt: new Date(new Date().setDate(today.getDate() - 4)),
    timeInProgress: 24.0,
    timeInReview: 10.0,
    timeInValidation: 0,
  },
  {
    id: "wi-7",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Save button not working",
    description: "CORS error on save attempt",
    type: "BUG",
    status: "IN_PROGRESS",
    priority: "CRITICAL",
    storyPoints: 0,
    sprintId: "sprint-3",
    assigneeId: "user-2",
    columnId: "col-2-2",
    createdAt: new Date(new Date().setDate(today.getDate() - 2)),
    startedAt: new Date(new Date().setDate(today.getDate() - 1)),
    timeInProgress: 6.0,
    timeInReview: 0,
    timeInValidation: 0,
  },
  {
    id: "wi-8",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Edit button not working",
    description: "CORS error on edit attempt",
    type: "BUG",
    status: "DONE",
    priority: "CRITICAL",
    storyPoints: 0,
    sprintId: "sprint-3",
    assigneeId: "user-2",
    columnId: "col-2-5",
    createdAt: new Date(new Date().setDate(today.getDate() - 2)),
    startedAt: new Date(new Date().setDate(today.getDate() - 1)),
    timeInProgress: 6.0,
    timeInReview: 0,
    timeInValidation: 0,
  },
  {
    id: "wi-9",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Create Reports page",
    description: "Implement charts with Recharts",
    type: "STORY",
    status: "IN_PROGRESS",
    priority: "HIGH",
    storyPoints: 5,
    sprintId: "sprint-3",
    assigneeId: "user-1",
    columnId: "col-2-2",
    createdAt: new Date(new Date().setDate(today.getDate() - 8)),
    startedAt: new Date(new Date().setDate(today.getDate() - 2)),
    timeInProgress: 16.0,
    timeInReview: 0,
    timeInValidation: 0,
  },
  // ── KANBAN: Marketing Flow ─────────────────────────────────
  {
    id: "wi-kan-1",
    projectId: "project-kanban",
    columnId: "col-k-4",
    title: "Campaign landing page",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 5,
    createdAt: new Date(new Date().setDate(today.getDate() - 77)),
    startedAt: new Date(new Date().setDate(today.getDate() - 74)),
    completedAt: new Date(new Date().setDate(today.getDate() - 70)),
    timeInProgress: 120,
    timeInReview: 24,
    timeInValidation: 0,
  },
  {
    id: "wi-kan-2",
    projectId: "project-kanban",
    columnId: "col-k-4",
    title: "SEO keyword research",
    description: "",
    type: "TASK",
    status: "DONE",
    priority: "MEDIUM",
    storyPoints: 3,
    createdAt: new Date(new Date().setDate(today.getDate() - 70)),
    startedAt: new Date(new Date().setDate(today.getDate() - 68)),
    completedAt: new Date(new Date().setDate(today.getDate() - 63)),
    timeInProgress: 96,
    timeInReview: 16,
    timeInValidation: 0,
  },
  {
    id: "wi-kan-3",
    projectId: "project-kanban",
    columnId: "col-k-4",
    title: "Social media graphics",
    description: "",
    type: "TASK",
    status: "DONE",
    priority: "MEDIUM",
    storyPoints: 2,
    createdAt: new Date(new Date().setDate(today.getDate() - 63)),
    startedAt: new Date(new Date().setDate(today.getDate() - 61)),
    completedAt: new Date(new Date().setDate(today.getDate() - 56)),
    timeInProgress: 80,
    timeInReview: 16,
    timeInValidation: 0,
  },
  {
    id: "wi-kan-4",
    projectId: "project-kanban",
    columnId: "col-k-4",
    title: "Email campaign design",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 5,
    createdAt: new Date(new Date().setDate(today.getDate() - 49)),
    startedAt: new Date(new Date().setDate(today.getDate() - 47)),
    completedAt: new Date(new Date().setDate(today.getDate() - 42)),
    timeInProgress: 110,
    timeInReview: 20,
    timeInValidation: 0,
  },
  {
    id: "wi-kan-5",
    projectId: "project-kanban",
    columnId: "col-k-4",
    title: "Blog post series (x5)",
    description: "",
    type: "TASK",
    status: "DONE",
    priority: "MEDIUM",
    storyPoints: 3,
    createdAt: new Date(new Date().setDate(today.getDate() - 42)),
    startedAt: new Date(new Date().setDate(today.getDate() - 40)),
    completedAt: new Date(new Date().setDate(today.getDate() - 35)),
    timeInProgress: 140,
    timeInReview: 24,
    timeInValidation: 0,
  },
  {
    id: "wi-kan-6",
    projectId: "project-kanban",
    columnId: "col-k-4",
    title: "Video production v1",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 8,
    createdAt: new Date(new Date().setDate(today.getDate() - 28)),
    startedAt: new Date(new Date().setDate(today.getDate() - 26)),
    completedAt: new Date(new Date().setDate(today.getDate() - 21)),
    timeInProgress: 85,
    timeInReview: 15,
    timeInValidation: 0,
  },
  {
    id: "wi-kan-7",
    projectId: "project-kanban",
    columnId: "col-k-4",
    title: "Influencer brief",
    description: "",
    type: "TASK",
    status: "DONE",
    priority: "MEDIUM",
    storyPoints: 3,
    createdAt: new Date(new Date().setDate(today.getDate() - 21)),
    startedAt: new Date(new Date().setDate(today.getDate() - 19)),
    completedAt: new Date(new Date().setDate(today.getDate() - 14)),
    timeInProgress: 60,
    timeInReview: 12,
    timeInValidation: 0,
  },
  {
    id: "wi-kan-8",
    projectId: "project-kanban",
    columnId: "col-k-4",
    title: "Q1 performance report",
    description: "",
    type: "TASK",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 3,
    createdAt: new Date(new Date().setDate(today.getDate() - 14)),
    startedAt: new Date(new Date().setDate(today.getDate() - 12)),
    completedAt: new Date(new Date().setDate(today.getDate() - 7)),
    timeInProgress: 90,
    timeInReview: 18,
    timeInValidation: 0,
  },
  {
    id: "wi-kan-9",
    projectId: "project-kanban",
    columnId: "col-k-2",
    title: "Newsletter template",
    description: "",
    type: "TASK",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    storyPoints: 3,
    createdAt: new Date(new Date().setDate(today.getDate() - 10)),
    startedAt: new Date(new Date().setDate(today.getDate() - 8)),
    timeInProgress: 24,
    timeInReview: 0,
    timeInValidation: 0,
  },
  {
    id: "wi-kan-10",
    projectId: "project-kanban",
    columnId: "col-k-2",
    title: "Paid ad campaign setup",
    description: "",
    type: "STORY",
    status: "IN_PROGRESS",
    priority: "HIGH",
    storyPoints: 5,
    createdAt: new Date(new Date().setDate(today.getDate() - 7)),
    startedAt: new Date(new Date().setDate(today.getDate() - 5)),
    timeInProgress: 18,
    timeInReview: 0,
    timeInValidation: 0,
  },
  {
    id: "wi-kan-11",
    projectId: "project-kanban",
    columnId: "col-k-3",
    title: "Analytics dashboard",
    description: "",
    type: "TASK",
    status: "IN_REVIEW",
    priority: "HIGH",
    storyPoints: 5,
    createdAt: new Date(new Date().setDate(today.getDate() - 12)),
    startedAt: new Date(new Date().setDate(today.getDate() - 10)),
    timeInProgress: 56,
    timeInReview: 8,
    timeInValidation: 0,
  },
  {
    id: "wi-kan-12",
    projectId: "project-kanban",
    columnId: "col-k-1",
    title: "Brand guidelines doc",
    description: "",
    type: "TASK",
    status: "TO_DO",
    priority: "LOW",
    storyPoints: 2,
    createdAt: new Date(new Date().setDate(today.getDate() - 5)),
  },
  {
    id: "wi-kan-13",
    projectId: "project-kanban",
    columnId: "col-k-1",
    title: "Q2 Campaign planning",
    description: "",
    type: "STORY",
    status: "TO_DO",
    priority: "HIGH",
    storyPoints: 5,
    createdAt: new Date(new Date().setDate(today.getDate() - 3)),
  },
  {
    id: "wi-kan-14",
    projectId: "project-kanban",
    columnId: "col-k-1",
    title: "UTM tracking broken",
    description: "",
    type: "BUG",
    status: "TO_DO",
    priority: "CRITICAL",
    storyPoints: 0,
    createdAt: new Date(new Date().setDate(today.getDate() - 2)),
  },
  // ── CASCADE: Phase work items ──────────────────────────────
  // Phase 1 – Requirements (COMPLETED)
  {
    id: "wi-cas-1-1",
    projectId: "project-cascade",
    phaseId: "phase-1",
    title: "Document functional requirements",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 5,
    createdAt: new Date("2026-01-02"),
  },
  {
    id: "wi-cas-1-2",
    projectId: "project-cascade",
    phaseId: "phase-1",
    title: "Stakeholder sign-off on requirements",
    description: "",
    type: "TASK",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 2,
    createdAt: new Date("2026-01-10"),
  },
  {
    id: "wi-cas-1-3",
    projectId: "project-cascade",
    phaseId: "phase-1",
    title: "Define non-functional requirements",
    description: "",
    type: "TASK",
    status: "DONE",
    priority: "MEDIUM",
    storyPoints: 3,
    createdAt: new Date("2026-01-12"),
  },
  // Phase 2 – Design (COMPLETED)
  {
    id: "wi-cas-2-1",
    projectId: "project-cascade",
    phaseId: "phase-2",
    title: "System architecture design",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 8,
    createdAt: new Date("2026-02-02"),
  },
  {
    id: "wi-cas-2-2",
    projectId: "project-cascade",
    phaseId: "phase-2",
    title: "Database schema design",
    description: "",
    type: "TASK",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 5,
    createdAt: new Date("2026-02-05"),
  },
  {
    id: "wi-cas-2-3",
    projectId: "project-cascade",
    phaseId: "phase-2",
    title: "UI/UX wireframes",
    description: "",
    type: "TASK",
    status: "DONE",
    priority: "MEDIUM",
    storyPoints: 3,
    createdAt: new Date("2026-02-10"),
  },
  // Phase 3 – Implementation (IN_PROGRESS)
  {
    id: "wi-cas-3-1",
    projectId: "project-cascade",
    phaseId: "phase-3",
    title: "Core backend services",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 13,
    createdAt: new Date("2026-03-02"),
    timeInProgress: 80,
  },
  {
    id: "wi-cas-3-2",
    projectId: "project-cascade",
    phaseId: "phase-3",
    title: "Data migration scripts",
    description: "",
    type: "STORY",
    status: "IN_PROGRESS",
    priority: "HIGH",
    storyPoints: 8,
    createdAt: new Date("2026-03-05"),
    timeInProgress: 32,
  },
  {
    id: "wi-cas-3-3",
    projectId: "project-cascade",
    phaseId: "phase-3",
    title: "Frontend integration",
    description: "",
    type: "TASK",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    storyPoints: 5,
    createdAt: new Date("2026-03-08"),
    timeInProgress: 18,
  },
  {
    id: "wi-cas-3-4",
    projectId: "project-cascade",
    phaseId: "phase-3",
    title: "API adapter for legacy endpoints",
    description: "",
    type: "STORY",
    status: "IN_REVIEW",
    priority: "CRITICAL",
    storyPoints: 8,
    createdAt: new Date("2026-03-10"),
    timeInProgress: 45,
    timeInReview: 6,
  },
  {
    id: "wi-cas-3-5",
    projectId: "project-cascade",
    phaseId: "phase-3",
    title: "Performance optimization pass",
    description: "",
    type: "TECH_DEBT",
    status: "TO_DO",
    priority: "LOW",
    storyPoints: 3,
    createdAt: new Date("2026-03-12"),
  },
  // Phase 4 – Testing (PENDING)
  {
    id: "wi-cas-4-1",
    projectId: "project-cascade",
    phaseId: "phase-4",
    title: "Integration test suite",
    description: "",
    type: "TASK",
    status: "TO_DO",
    priority: "HIGH",
    storyPoints: 5,
    createdAt: new Date("2026-03-01"),
  },
  {
    id: "wi-cas-4-2",
    projectId: "project-cascade",
    phaseId: "phase-4",
    title: "UAT with stakeholders",
    description: "",
    type: "TASK",
    status: "TO_DO",
    priority: "HIGH",
    storyPoints: 3,
    createdAt: new Date("2026-03-01"),
  },
  {
    id: "wi-cas-4-3",
    projectId: "project-cascade",
    phaseId: "phase-4",
    title: "Regression test execution",
    description: "",
    type: "BUG",
    status: "TO_DO",
    priority: "MEDIUM",
    storyPoints: 2,
    createdAt: new Date("2026-03-01"),
  },
  // Phase 5 – Deployment (PENDING)
  {
    id: "wi-cas-5-1",
    projectId: "project-cascade",
    phaseId: "phase-5",
    title: "Production deployment",
    description: "",
    type: "TASK",
    status: "TO_DO",
    priority: "CRITICAL",
    storyPoints: 3,
    createdAt: new Date("2026-03-01"),
  },
  {
    id: "wi-cas-5-2",
    projectId: "project-cascade",
    phaseId: "phase-5",
    title: "Post-deployment smoke tests",
    description: "",
    type: "TASK",
    status: "TO_DO",
    priority: "HIGH",
    storyPoints: 2,
    createdAt: new Date("2026-03-01"),
  },

  // ── INCREMENTAL: Release work items ───────────────────────
  {
    id: "wi-inc-1-1",
    projectId: "project-incremental",
    releaseId: "release-inc-1",
    title: "User registration & login",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 8,
    createdAt: new Date("2026-01-05"),
    timeInProgress: 48,
  },
  {
    id: "wi-inc-1-2",
    projectId: "project-incremental",
    releaseId: "release-inc-1",
    title: "User profile screen",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "MEDIUM",
    storyPoints: 5,
    createdAt: new Date("2026-01-08"),
    timeInProgress: 32,
  },
  {
    id: "wi-inc-1-3",
    projectId: "project-incremental",
    releaseId: "release-inc-1",
    title: "Push notification setup",
    description: "",
    type: "TASK",
    status: "DONE",
    priority: "MEDIUM",
    storyPoints: 3,
    createdAt: new Date("2026-01-10"),
    timeInProgress: 16,
  },
  {
    id: "wi-inc-2-1",
    projectId: "project-incremental",
    releaseId: "release-inc-2",
    title: "Content feed implementation",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 13,
    createdAt: new Date("2026-02-08"),
    timeInProgress: 72,
  },
  {
    id: "wi-inc-2-2",
    projectId: "project-incremental",
    releaseId: "release-inc-2",
    title: "Media upload & storage",
    description: "",
    type: "STORY",
    status: "IN_PROGRESS",
    priority: "HIGH",
    storyPoints: 8,
    createdAt: new Date("2026-02-10"),
    timeInProgress: 28,
  },
  {
    id: "wi-inc-2-3",
    projectId: "project-incremental",
    releaseId: "release-inc-2",
    title: "In-app notification center",
    description: "",
    type: "TASK",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    storyPoints: 5,
    createdAt: new Date("2026-02-12"),
    timeInProgress: 14,
  },
  {
    id: "wi-inc-2-4",
    projectId: "project-incremental",
    releaseId: "release-inc-2",
    title: "Feed scroll performance bug",
    description: "",
    type: "BUG",
    status: "TO_DO",
    priority: "CRITICAL",
    storyPoints: 0,
    createdAt: new Date("2026-03-15"),
  },
  {
    id: "wi-inc-3-1",
    projectId: "project-incremental",
    releaseId: "release-inc-3",
    title: "Social graph & following",
    description: "",
    type: "STORY",
    status: "TO_DO",
    priority: "HIGH",
    storyPoints: 13,
    createdAt: new Date("2026-02-15"),
  },
  {
    id: "wi-inc-3-2",
    projectId: "project-incremental",
    releaseId: "release-inc-3",
    title: "Analytics dashboard",
    description: "",
    type: "STORY",
    status: "TO_DO",
    priority: "MEDIUM",
    storyPoints: 8,
    createdAt: new Date("2026-02-15"),
  },

  // ── XP: Release work items ─────────────────────────────────
  {
    id: "wi-xp-1-1",
    projectId: "project-xp",
    releaseId: "release-xp-1",
    title: "REST API scaffolding",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 5,
    createdAt: new Date("2026-01-16"),
    timeInProgress: 24,
  },
  {
    id: "wi-xp-1-2",
    projectId: "project-xp",
    releaseId: "release-xp-1",
    title: "JWT authentication middleware",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 8,
    createdAt: new Date("2026-01-18"),
    timeInProgress: 40,
  },
  {
    id: "wi-xp-1-3",
    projectId: "project-xp",
    releaseId: "release-xp-1",
    title: "Core CRUD endpoints",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 5,
    createdAt: new Date("2026-01-20"),
    timeInProgress: 20,
  },
  {
    id: "wi-xp-2-1",
    projectId: "project-xp",
    releaseId: "release-xp-2",
    title: "Rate limiting implementation",
    description: "",
    type: "STORY",
    status: "IN_PROGRESS",
    priority: "HIGH",
    storyPoints: 5,
    createdAt: new Date("2026-02-22"),
    timeInProgress: 18,
  },
  {
    id: "wi-xp-2-2",
    projectId: "project-xp",
    releaseId: "release-xp-2",
    title: "API documentation (OpenAPI)",
    description: "",
    type: "TASK",
    status: "TO_DO",
    priority: "MEDIUM",
    storyPoints: 3,
    createdAt: new Date("2026-02-25"),
  },

  // ── SPIRAL: Release work items ────────────────────────────
  {
    id: "wi-spi-1-1",
    projectId: "project-spiral",
    releaseId: "release-spi-1",
    title: "Risk data ingestion pipeline",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 8,
    createdAt: new Date("2026-01-22"),
    timeInProgress: 56,
  },
  {
    id: "wi-spi-1-2",
    projectId: "project-spiral",
    releaseId: "release-spi-1",
    title: "Baseline scoring model (rule-based)",
    description: "",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 13,
    createdAt: new Date("2026-01-25"),
    timeInProgress: 88,
  },
  {
    id: "wi-spi-2-1",
    projectId: "project-spiral",
    releaseId: "release-spi-2",
    title: "Feature engineering for ML model",
    description: "",
    type: "STORY",
    status: "IN_PROGRESS",
    priority: "HIGH",
    storyPoints: 13,
    createdAt: new Date("2026-03-06"),
    timeInProgress: 32,
  },
  {
    id: "wi-spi-2-2",
    projectId: "project-spiral",
    releaseId: "release-spi-2",
    title: "Model training pipeline",
    description: "",
    type: "STORY",
    status: "TO_DO",
    priority: "HIGH",
    storyPoints: 8,
    createdAt: new Date("2026-03-08"),
  },
  {
    id: "wi-spi-2-3",
    projectId: "project-spiral",
    releaseId: "release-spi-2",
    title: "Accuracy regression bug",
    description: "",
    type: "BUG",
    status: "TO_DO",
    priority: "CRITICAL",
    storyPoints: 0,
    createdAt: new Date("2026-03-15"),
  },
];

//////////////////////////////////////////////////////
// COMMENTS
//////////////////////////////////////////////////////

export type CommentMock = {
  id: string;
  workItemId: string;
  userId: string;
  content: string;
  createdAt: Date;
};

export const commentsMock: CommentMock[] = [
  {
    id: "comment-1",
    workItemId: "wi-1",
    userId: "user-1",
    content: "High priority, we need this by Friday.",
    createdAt: new Date(),
  },
  {
    id: "comment-2",
    workItemId: "wi-2",
    userId: "user-2",
    content: "I've already identified the issue in the drag and drop.",
    createdAt: new Date(),
  },
];

export type AcceptanceCriteria = {
  id: string;
  title: string;
  completed: boolean;
};

//////////////////////////////////////////////////////
// RISKS
//////////////////////////////////////////////////////

export type RiskStatus =
  | "OPEN"
  | "MITIGATING"
  | "MITIGATED"
  | "CLOSED"
  | "OCCURRED";
export type RiskCategory =
  | "TECHNICAL"
  | "SCHEDULE"
  | "BUDGET"
  | "RESOURCE"
  | "EXTERNAL"
  | "COMPLIANCE";
export type RiskResponse = "AVOID" | "MITIGATE" | "TRANSFER" | "ACCEPT";
export type ReleaseStatus =
  | "PLANNED"
  | "IN_PROGRESS"
  | "RELEASED"
  | "CANCELLED";

export type RiskMock = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  category: RiskCategory;
  probability: 1 | 2 | 3 | 4 | 5;
  impact: 1 | 2 | 3 | 4 | 5;
  status: RiskStatus;
  response: RiskResponse;
  ownerId?: string;
  mitigationPlan?: string;
  contingencyPlan?: string;
  dueDate?: Date;
  createdAt: Date;
};

export const risksMock: RiskMock[] = [
  // ── CASCADE: Legacy Migration ──────────────────────────────
  {
    id: "risk-cas-1",
    projectId: "project-cascade",
    title: "Legacy API incompatibility",
    description:
      "New system may not be compatible with legacy API endpoints, requiring extensive rework.",
    category: "TECHNICAL",
    probability: 4,
    impact: 4,
    status: "OPEN",
    response: "MITIGATE",
    ownerId: "user-1",
    mitigationPlan:
      "Create an adapter layer to bridge legacy and new API contracts. Perform integration tests in Phase 2.",
    contingencyPlan:
      "Roll back to legacy system and extend migration timeline by 4 weeks.",
    dueDate: new Date("2026-04-01"),
    createdAt: new Date("2026-01-15"),
  },
  {
    id: "risk-cas-2",
    projectId: "project-cascade",
    title: "Testing phase timeline compression",
    description:
      "If implementation overruns, the testing phase will be compressed, increasing defect escape rate.",
    category: "SCHEDULE",
    probability: 3,
    impact: 4,
    status: "MITIGATING",
    response: "MITIGATE",
    ownerId: "user-2",
    mitigationPlan:
      "Introduce parallel testing activities during implementation. Automate regression suite by mid-April.",
    contingencyPlan: "Negotiate a 2-week deployment buffer or reduce v1 scope.",
    dueDate: new Date("2026-05-01"),
    createdAt: new Date("2026-02-01"),
  },
  {
    id: "risk-cas-3",
    projectId: "project-cascade",
    title: "Key developer unavailability",
    description:
      "Lead developer for the core module may be unavailable during critical implementation.",
    category: "RESOURCE",
    probability: 2,
    impact: 3,
    status: "CLOSED",
    response: "ACCEPT",
    ownerId: "user-1",
    mitigationPlan:
      "Documented architecture. Cross-trained a backup developer on the critical module.",
    createdAt: new Date("2026-01-20"),
  },
  {
    id: "risk-cas-4",
    projectId: "project-cascade",
    title: "Third-party vendor delivery delays",
    description:
      "Dependency on external vendor for data migration tooling. Vendor has a history of delivery issues.",
    category: "EXTERNAL",
    probability: 3,
    impact: 3,
    status: "OPEN",
    response: "TRANSFER",
    ownerId: "user-3",
    mitigationPlan:
      "Establish contractual SLAs with the vendor. Identify alternative migration tool as backup.",
    contingencyPlan: "Build in-house migration scripts as a fallback.",
    dueDate: new Date("2026-03-15"),
    createdAt: new Date("2026-01-25"),
  },
  // ── SPIRAL: AI Risk Engine ─────────────────────────────────
  {
    id: "risk-spi-1",
    projectId: "project-spiral",
    title: "AI model accuracy below target threshold",
    description:
      "Trained models may not achieve required 95% accuracy, requiring additional training cycles.",
    category: "TECHNICAL",
    probability: 4,
    impact: 5,
    status: "OPEN",
    response: "MITIGATE",
    ownerId: "user-1",
    mitigationPlan:
      "Allocate time for at least 3 model refinement iterations per spiral. Set early accuracy benchmarks.",
    contingencyPlan:
      "Reduce scope to a rule-based engine for v1; defer ML to v2.",
    dueDate: new Date("2026-05-01"),
    createdAt: new Date("2026-03-01"),
  },
  {
    id: "risk-spi-2",
    projectId: "project-spiral",
    title: "Training data quality issues",
    description:
      "Historical risk data may be incomplete or biased, leading to poor model generalization.",
    category: "COMPLIANCE",
    probability: 3,
    impact: 4,
    status: "MITIGATING",
    response: "AVOID",
    ownerId: "user-2",
    mitigationPlan:
      "Engage a data quality audit before training. Define strict data acceptance criteria.",
    contingencyPlan: "Use synthetic data generation to supplement gaps.",
    dueDate: new Date("2026-04-01"),
    createdAt: new Date("2026-03-05"),
  },
  {
    id: "risk-spi-3",
    projectId: "project-spiral",
    title: "Cloud GPU training costs overrun",
    description:
      "Cloud GPU costs may exceed the allocated budget during intensive training phases.",
    category: "BUDGET",
    probability: 3,
    impact: 3,
    status: "OPEN",
    response: "MITIGATE",
    ownerId: "user-3",
    mitigationPlan:
      "Set budget alerts and caps. Optimize training runs with spot instances.",
    contingencyPlan:
      "Use smaller model architectures or reduce training dataset size.",
    createdAt: new Date("2026-03-10"),
  },
];

//////////////////////////////////////////////////////
// RELEASES
//////////////////////////////////////////////////////

export type ReleaseMock = {
  id: string;
  projectId: string;
  name: string;
  version: string;
  description?: string;
  status: ReleaseStatus;
  releaseDate: Date;
  actualReleaseDate?: Date;
  releaseNotes?: string;
  createdAt: Date;
};

export const releasesMock: ReleaseMock[] = [
  // ── INCREMENTAL: Mobile App v2 ────────────────────────────
  {
    id: "release-inc-1",
    projectId: "project-incremental",
    name: "Foundation",
    version: "v1.0.0",
    description: "Core authentication and user profile management.",
    status: "RELEASED",
    releaseDate: new Date("2026-02-01"),
    actualReleaseDate: new Date("2026-02-03"),
    releaseNotes:
      "Released core auth flows. Minor 2-day delay due to OAuth provider configuration.",
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "release-inc-2",
    projectId: "project-incremental",
    name: "Content Module",
    version: "v1.1.0",
    description: "Feed, notifications, and media upload features.",
    status: "IN_PROGRESS",
    releaseDate: new Date("2026-04-01"),
    createdAt: new Date("2026-02-05"),
  },
  {
    id: "release-inc-3",
    projectId: "project-incremental",
    name: "Social & Analytics",
    version: "v2.0.0",
    description: "Social graph, analytics dashboard, and perf improvements.",
    status: "PLANNED",
    releaseDate: new Date("2026-07-01"),
    createdAt: new Date("2026-02-10"),
  },
  // ── XP: Rapid API Service ─────────────────────────────────
  {
    id: "release-xp-1",
    projectId: "project-xp",
    name: "MVP",
    version: "v1.0.0",
    description: "Minimum viable API with core endpoints and auth.",
    status: "RELEASED",
    releaseDate: new Date("2026-02-15"),
    actualReleaseDate: new Date("2026-02-15"),
    releaseNotes: "Clean release. All acceptance tests passed on time.",
    createdAt: new Date("2026-01-15"),
  },
  {
    id: "release-xp-2",
    projectId: "project-xp",
    name: "Rate Limiting & Docs",
    version: "v1.1.0",
    description: "Rate limiting, enhanced error handling, and developer docs.",
    status: "IN_PROGRESS",
    releaseDate: new Date("2026-04-15"),
    createdAt: new Date("2026-02-20"),
  },
  // ── SPIRAL: AI Risk Engine ─────────────────────────────────
  {
    id: "release-spi-1",
    projectId: "project-spiral",
    name: "Prototype",
    version: "v0.1.0",
    description:
      "First spiral: risk data ingestion and baseline scoring model.",
    status: "RELEASED",
    releaseDate: new Date("2026-02-28"),
    actualReleaseDate: new Date("2026-03-01"),
    releaseNotes:
      "Prototype validated by stakeholders. Model accuracy at 87% — below 95% target, acceptable for v0.1.",
    createdAt: new Date("2026-01-20"),
  },
  {
    id: "release-spi-2",
    projectId: "project-spiral",
    name: "Enhanced Model",
    version: "v0.2.0",
    description:
      "Second spiral: improved ML model with additional feature engineering.",
    status: "IN_PROGRESS",
    releaseDate: new Date("2026-05-31"),
    createdAt: new Date("2026-03-05"),
  },
];
