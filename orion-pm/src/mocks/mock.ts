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
};

export const teamsMock: TeamMock[] = [
  {
    id: "team-1",
    name: "Bruno Taconi's Team",
    ownerId: "user-1",
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
    createdAt: new Date(),
  },
  {
    id: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    name: "Test Project",
    description: "Testing the wizard creation",
    methodology: "SCRUM",
    visibility: "PUBLIC",
    ownerId: "user-1",
    createdAt: new Date("2026-03-06T18:27:55"),
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
  sprintId?: string;
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
    storyPoints: 8,
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
    storyPoints: 2,
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
    storyPoints: 8,
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
    storyPoints: 5,
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
    storyPoints: 5,
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
    storyPoints: 13,
    sprintId: "sprint-3",
    assigneeId: "user-1",
    columnId: "col-2-2",
    createdAt: new Date(new Date().setDate(today.getDate() - 8)),
    startedAt: new Date(new Date().setDate(today.getDate() - 2)),
    timeInProgress: 16.0,
    timeInReview: 0,
    timeInValidation: 0,
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
