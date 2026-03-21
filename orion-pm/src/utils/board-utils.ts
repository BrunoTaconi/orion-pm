import { SelectOption } from "@/components/ui/select";
import { Icons } from "@/components/icons";
import { BoardType, Methodology } from "@/mocks/mock";

export const TASK_TYPE_OPTIONS: SelectOption[] = [
  {
    value: "STORY",
    label: "Story",
    icon: "UserSpeak",
    iconColor: "text-white",
    iconBgColor: "bg-green-icon",
    iconSize: 14,
  },
  {
    value: "BUG",
    label: "Bug",
    icon: "Bug",
    iconColor: "text-white",
    iconBgColor: "bg-red-600",
    iconSize: 14,
  },
  {
    value: "TASK",
    label: "Task",
    icon: "Task",
    iconColor: "text-white",
    iconBgColor: "bg-blue-500",
    iconSize: 14,
  },
  {
    value: "SPIKE",
    label: "Spike",
    icon: "Bulb",
    iconColor: "text-white",
    iconBgColor: "bg-purple-600",
    iconSize: 14,
  },
  {
    value: "TECH_DEBT",
    label: "Tech Debt",
    icon: "Rocket",
    iconColor: "text-white",
    iconBgColor: "bg-yellow-icon",
    iconSize: 14,
  },
];

export const MINIMIZED_TYPE_OPTIONS: SelectOption[] = [
  {
    value: "STORY",
    label: "Story",
    icon: "UserSpeak",
    iconColor: "text-green-icon",
    iconBgColor: "bg-bg-light-green",
    iconSize: 14,
  },
  {
    value: "BUG",
    label: "Bug",
    icon: "Bug",
    iconColor: "text-red-icon",
    iconBgColor: "bg-bg-light-red",
    iconSize: 14,
  },
  {
    value: "TASK",
    label: "Task",
    icon: "Task",
    iconColor: "text-blue-icon",
    iconBgColor: "bg-bg-light-blue",
    iconSize: 14,
  },
  {
    value: "SPIKE",
    label: "Spike",
    icon: "Bulb",
    iconColor: "text-purple-icon",
    iconBgColor: "bg-bg-light-purple",
    iconSize: 14,
  },
  {
    value: "TECH_DEBT",
    label: "Tech Debt",
    icon: "Rocket",
    iconColor: "text-white",
    iconBgColor: "bg-yellow-icon",
    iconSize: 14,
  },
];

export const PRIORITY_OPTIONS: SelectOption[] = [
  {
    value: "CRITICAL",
    label: "Critical",
    icon: "Warning",
    iconColor: "text-red-600",
    iconBgColor: "bg-red-100",
    iconSize: 14,
  },
  {
    value: "HIGH",
    label: "High",
    icon: "ArrowUp",
    iconColor: "text-orange-500",
    iconBgColor: "bg-orange-100",
    iconSize: 14,
  },
  {
    value: "MEDIUM",
    label: "Medium",
    icon: "Menu",
    iconColor: "text-yellow-600",
    iconBgColor: "bg-yellow-100",
    iconSize: 14,
  },
  {
    value: "LOW",
    label: "Low",
    icon: "ArrowDown",
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
    iconSize: 14,
  },
];

export const STATUS_OPTIONS: SelectOption[] = [
  {
    value: "col-2-1",
    label: "To Do",
    icon: "Flag",
    iconColor: "text-red-500",
    iconBgColor: "bg-red-200",
    iconSize: 14,
  },
  {
    value: "col-2-2",
    label: "In Progress",
    icon: "Flag",
    iconColor: "text-orange-500",
    iconBgColor: "bg-orange-100",
    iconSize: 14,
  },
  {
    value: "col-2-3",
    label: "In Review",
    icon: "Flag",
    iconColor: "text-yellow-500",
    iconBgColor: "bg-yellow-100",
    iconSize: 14,
  },
  {
    value: "col-2-4",
    label: "In Validation",
    icon: "Flag",
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
    iconSize: 14,
  },
  {
    value: "col-2-5",
    label: "Done",
    icon: "Flag",
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
    iconSize: 14,
  },
];

export const getTypeDetails = (type: string) => {
  return (
    TASK_TYPE_OPTIONS.find((t) => t.value === type) || TASK_TYPE_OPTIONS[2]
  );
};

export const getMinimizedTypeDetails = (type: string) => {
  return (
    MINIMIZED_TYPE_OPTIONS.find((t) => t.value === type) ||
    MINIMIZED_TYPE_OPTIONS[2]
  );
};

export const getPriorityDetails = (priority: string) => {
  return (
    PRIORITY_OPTIONS.find((p) => p.value === priority) || PRIORITY_OPTIONS[2]
  );
};

export const getBoardVisualType = (methodology: Methodology): BoardType => {
  if (methodology === "SCRUM" || methodology === "XP") return "SCRUM";
  return "KANBAN";
};

export const getColumnStyle = (name: string) => {
  switch (name) {
    case "To Do":
      return "bg-red-200 text-red-500";
    case "In Progress":
      return "bg-orange-100 text-orange-500";
    case "In Review":
      return "bg-yellow-100 text-yellow-500";
    case "In Validation":
      return "bg-purple-100 text-purple-600";
    case "Done":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
