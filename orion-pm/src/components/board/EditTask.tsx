import {
  getPriorityStyle,
  getTypeColor,
} from "@/app/(dashboard)/project/[projectId]/board/page";
import { Priority, usersMock, WorkItemMock, WorkItemType } from "@/mocks/mock";
import { useState } from "react";
import Input from "../ui/input";
import { Icons } from "../icons";

interface EditTaskProps {
  task: WorkItemMock;
}

export default function EditTask({ task }: EditTaskProps) {
  const assignee = usersMock.find((user) => user.id === task?.assigneeId);
  const [tasks, setTasks] = useState<WorkItemMock>(task);
  const [editingPointsId, setEditingPointsId] = useState<string | null>(null);

  const handleUpdateType = (taskId: string, newType: WorkItemType) => {
    //todo: chamar api de putDownloads testados em produção
    setTasks(task.id === taskId ? { ...task, type: newType } : task);
  };

  const handleUpdatePriority = (taskId: string, newPriority: Priority) => {
    //todo: chamar api de put
    setTasks(task.id === taskId ? { ...task, priority: newPriority } : task);
  };

  const handleUpdateStoryPoints = (taskId: string, newPoints: number) => {
    //todo: chamar api de put
    setTasks(task.id === taskId ? { ...task, storyPoints: newPoints } : task);
  };

  const acceptanceCriteriaList = [
    {
      value: "Downloads tested in a development environment.",
      label: "Downloads tested in a development environment.",
    },
    {
      value: "Download works on at least Android 8 and above.",
      label: "Download works on at least Android 8 and above.",
    },
    {
      value: "Downloads tested in production",
      label: "Downloads tested in production",
    },
    {
      value: "Board working in mobile view.",
      label: "Board working in mobile view.",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "bg-bg-light-red text-red-icon";
      case "IN_PROGRESS":
        return "bg-bg-light-orange text-orange-icon";
      case "IN_REVIEW":
        return "bg-bg-light-yellow text-yellow-icon";
      case "IN_VALIDATION":
        return "bg-bg-light-purple text-purple-icon";
      case "DONE":
        return "bg-bg-light-green text-green-icon";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const currentCriterias = "Downloads tested in a development environment.";

  const handleCriteriaToggle = (criteriaValue: string) => {};

  const priority = getPriorityStyle(task.priority);

  return (
    <>
      <div className="flex items-start gap-6">
        <div className="flex flex-col gap-6 text-text-primary">
          <div className="flex items-center gap-4">
            <h2>{task.id}</h2>
            <div className="flex items-start justify-between gap-2">
              <select
                onClick={(e) => e.stopPropagation()}
                value={task.type}
                onChange={(e) =>
                  handleUpdateType(task.id, e.target.value as WorkItemType)
                }
                className={`appearance-none flex text-xs font-bold px-2 py-0.5 rounded-sm outline-none cursor-pointer hover:opacity-80 transition-opacity ${getTypeColor(task.type)}`}
              >
                <option
                  value="STORY"
                  className="bg-bg-primary text-text-primary text-sm"
                >
                  STORY
                </option>
                <option
                  value="BUG"
                  className="bg-bg-primary text-text-primary text-sm"
                >
                  BUG
                </option>
                <option
                  value="TASK"
                  className="bg-bg-primary text-text-primary text-sm"
                >
                  TASK
                </option>
                <option
                  value="SPIKE"
                  className="bg-bg-primary text-text-primary text-sm"
                >
                  SPIKE
                </option>
              </select>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">
              Description
            </h4>
            {/* <Input label="Description" required={false} multiline={true} rows={3} /> */}
            <div className="bg-bg-secondary p-4 rounded-md text-sm min-h-[100px]">
              {task.description || "No description provided."}
            </div>
          </div>

          <div>
            {/* <Input label="Description" required={false} multiline={true} rows={3} /> */}
            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-sm font-medium text-text-primary mb-2">
                Checklist (Acceptance criteria)
              </h4>
              <div className="flex flex-col gap-3">
                {acceptanceCriteriaList.map((criteria) => (
                  <label
                    key={criteria.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={(currentCriterias as any).includes(
                        criteria.value,
                      )}
                      onChange={() => handleCriteriaToggle(criteria.value)}
                      className="w-4 h-4 text-accent-primary rounded-sm border-gray-300 focus:ring-accent-primary cursor-pointer"
                    />
                    <span className="text-sm text-text-primary group-hover:text-accent-primary transition-colors">
                      {criteria.label}
                    </span>
                  </label>
                ))}
                <div
                  onClick={() => {}}
                  className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition cursor-pointer text-sm"
                >
                  <Icons.Add size={20} />
                  <span>Add Item</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div
              className={`p-1 rounded flex items-center justify-center ${getStatusColor(task.status)}`}
            >
              <Icons.Flag size={14} />
            </div>
            <h3 className="font-bold text-text-primary text-sm">
              {task.status}
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text-primary">
              Assignee
            </span>
            <div className="flex items-center gap-2 mt-1">
              {assignee ? (
                <>
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-normal text-white uppercase">
                    {assignee.name.charAt(0)}
                    {assignee.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{assignee.name}</span>
                </>
              ) : (
                <span className="text-sm font-medium text-text-secondary">
                  Unassigned
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text-primary">
              Priority
            </span>
            <div
              className="relative cursor-pointer hover:opacity-80 transition-opacity inline-block"
              title={`Priority: ${task.priority}`}
              onClick={(e) => e.stopPropagation()}
            >
              <select
                value={task.priority}
                onChange={(e) =>
                  handleUpdatePriority(task.id, e.target.value as Priority)
                }
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full "
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-sm ${priority?.style}`}
              >
                {priority?.label}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text-primary">
              Story points
            </span>
            <div className="flex items-center gap-3">
              {editingPointsId === task.id ? (
                <input
                  onClick={(e) => e.stopPropagation()}
                  type="number"
                  autoFocus
                  defaultValue={task.storyPoints || ""}
                  className="w-10 h-6 text-xs bg-bg-primary border border-accent-primary rounded px-1 outline-none text-text-primary font-medium"
                  onBlur={(e) =>
                    handleUpdateStoryPoints(task.id, Number(e.target.value))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      handleUpdateStoryPoints(
                        task.id,
                        Number(e.currentTarget.value),
                      );
                    if (e.key === "Escape") setEditingPointsId(null);
                  }}
                />
              ) : (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingPointsId(task.id);
                  }}
                  className="flex items-center gap-1 text-xs text-text-secondary font-medium bg-bg-secondary hover:bg-bg-primary hover:border-bg-darker border border-transparent px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                  title="Click to edit Story Points"
                >
                  <Icons.Favorite
                    size={12}
                    className="text-yellow-500"
                    filled
                  />
                  {task.storyPoints || "-"}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-text-primary">
              Sprint
            </span>
            <div className="text-accent-primary underline cursor-pointer hover:bg-bg-secondary transition px-4 py-1 rounded-sm">
              {task.sprintId}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="text-sm font-medium text-text-primary">Comments</span>
        <Input
          label={""}
          multiline={true}
          placeholder="Add a comment..."
        ></Input>
      </div>
    </>
  );
}
