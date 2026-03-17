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
    description: "Sistema de gerenciamento ágil de projetos",
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

export const sprintsMock: SprintMock[] = [
  {
    id: "sprint-1",
    projectId: "project-1",
    name: "Sprint 1",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 14)),
    status: "CLOSED",
  },
  {
    id: "sprint-2",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    name: "Sprint 2",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 14)),
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
};

export const workItemsMock: WorkItemMock[] = [
  {
    id: "wi-1",
    projectId: "project-1",
    title: "Criar tela de login",
    description: "Implementar autenticação com NextAuth",
    type: "STORY",
    status: "IN_PROGRESS",
    priority: "HIGH",
    storyPoints: 5,
    sprintId: "sprint-1",
    columnId: "col-3",
    assigneeId: "user-2",
    createdAt: new Date(),
    timeInProgress: 12.5,
    timeInReview: 0,
    timeInValidation: 0,
    statusUpdatedAt: new Date(new Date().setDate(new Date().getDate() - 1)), // 1 dia atrás
  },
  {
    id: "wi-2",
    projectId: "project-1",
    title: "Corrigir bug no board",
    description: "Erro ao mover card entre colunas",
    type: "BUG",
    status: "TODO",
    priority: "CRITICAL",
    sprintId: "sprint-1",
    columnId: "col-2",
    assigneeId: "user-3",
    createdAt: new Date(),
    timeInProgress: 0,
    timeInReview: 0,
    timeInValidation: 0,
    statusUpdatedAt: new Date(),
  },
  {
    id: "wi-3",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Configurar banco de dados",
    description: "Subir o Prisma e o Postgres",
    type: "STORY",
    status: "DONE",
    priority: "HIGH",
    storyPoints: 8,
    sprintId: "sprint-2",
    assigneeId: "user-1",
    columnId: "col-2-4",
    createdAt: new Date(),
    timeInProgress: 18.2,
    timeInReview: 4.5,
    timeInValidation: 2.0,
    statusUpdatedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    id: "wi-4",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Criar tela de Board",
    description: "Fazer o drag and drop do Kanban",
    type: "STORY",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    storyPoints: 5,
    sprintId: "sprint-2",
    assigneeId: "user-2",
    columnId: "col-2-3",
    createdAt: new Date(),
    timeInProgress: 8.0,
    timeInReview: 0,
    timeInValidation: 0,
    statusUpdatedAt: new Date(new Date().setHours(new Date().getHours() - 5)), // 5 horas atrás
  },
  {
    id: "wi-5",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Corrigir responsividade",
    description: "Header quebrando no mobile",
    type: "BUG",
    status: "IN_PROGRESS",
    priority: "CRITICAL",
    storyPoints: 3,
    sprintId: "sprint-2",
    assigneeId: "user-1",
    columnId: "col-2-3",
    createdAt: new Date(),
    timeInProgress: 4.5,
    timeInReview: 2.0,
    timeInValidation: 0,
    statusUpdatedAt: new Date(),
  },
  {
    id: "wi-6",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Ajustar tela de Board",
    description: "Tela de Board com divergências de layout",
    type: "SPIKE",
    status: "IN_PROGRESS",
    priority: "LOW",
    storyPoints: 3,
    sprintId: "sprint-2",
    assigneeId: "user-1",
    columnId: "col-2-5",
    createdAt: new Date(),
    timeInProgress: 15.0,
    timeInReview: 0,
    timeInValidation: 0,
    statusUpdatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: "wi-7",
    projectId: "dd93b263-dedc-4ea2-bc36-f32f7a3dfa73",
    title: "Ajustar tela de Board",
    description: "Tela de Board com divergências de layout",
    type: "TASK",
    status: "IN_PROGRESS",
    priority: "LOW",
    storyPoints: 5,
    sprintId: "sprint-2",
    assigneeId: "user-2",
    columnId: "col-2-1",
    createdAt: new Date(),
    timeInProgress: 2.0,
    timeInReview: 0,
    timeInValidation: 0,
    statusUpdatedAt: new Date(new Date().setHours(new Date().getHours() - 2)),
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
    content: "Prioridade alta, precisamos disso até sexta.",
    createdAt: new Date(),
  },
  {
    id: "comment-2",
    workItemId: "wi-2",
    userId: "user-2",
    content: "Já identifiquei o problema no drag and drop.",
    createdAt: new Date(),
  },
];

export type AcceptanceCriteria = {
  id: string;
  title: string;
  completed: boolean;
};

//////////////////////////////////////////////////////
// REPORTS & METRICS MOCKS
//////////////////////////////////////////////////////

export const reportMocks = {
  wipComparison: [
    { sprint: "Sprint 1", wip: 8 },
    { sprint: "Sprint 2 (Atual)", wip: 10 },
  ],

  pointsMetric: [
    { name: "Planejados", value: 45, fill: "#94a3b8" },
    { name: "Entregues", value: 38, fill: "#22c55e" },
    { name: "Stories (Entregues)", value: 28, fill: "#3b82f6" },
    { name: "Bugs (Resolvidos)", value: 10, fill: "#ef4444" },
  ],

  avgTimePerTask: [
    { sprint: "Sprint 1", time: 4.2 },
    { sprint: "Sprint 2", time: 3.1 },
  ],

  timePerItem: [
    { task: "wi-3", days: 1.5, avg: 3.1 },
    { task: "wi-4", days: 4.2, avg: 3.1 },
    { task: "wi-5", days: 1.0, avg: 3.1 },
    { task: "wi-6", days: 2.8, avg: 3.1 },
    { task: "wi-7", days: 5.6, avg: 3.1 },
  ],

  timeInStages: [
    { stage: "In Progress", hours: 24, fill: "#f59e0b" },
    { stage: "Review", hours: 8, fill: "#8b5cf6" },
    { stage: "Validation", hours: 4, fill: "#06b6d4" },
  ],

  burnupData: [
    { day: "Dia 1", scope: 45, completed: 0 },
    { day: "Dia 2", scope: 45, completed: 0 },
    { day: "Dia 3", scope: 45, completed: 5 },
    { day: "Dia 4", scope: 45, completed: 8 },
    { day: "Dia 5", scope: 45, completed: 15 },
    { day: "Dia 6", scope: 48, completed: 15 }, // Scope creep (adicionaram tarefas na sprint)
    { day: "Dia 7", scope: 48, completed: 22 },
    { day: "Dia 8", scope: 48, completed: 25 },
    { day: "Dia 9", scope: 48, completed: 30 },
    { day: "Dia 10", scope: 48, completed: 38 }, // Hoje
  ],
};
