import { usersMock, WorkItemMock } from "@/mocks/mock";
import {
  getMinimizedTypeDetails,
  getPriorityDetails,
} from "@/utils/board-utils";
import { Icons } from "../icons";

interface BoardTaskCardProps {
  task: WorkItemMock;
  isSprintBased: boolean;
  editingPointsId: string | null;
  setEditingPointsId: (id: string | null) => void;
  handleUpdateStoryPoints: (taskId: string, newPoints: number) => void;
}

export default function BoardTaskCard({
  task,
  isSprintBased,
  editingPointsId,
  setEditingPointsId,
  handleUpdateStoryPoints,
}: BoardTaskCardProps) {
  const assignee = usersMock.find((user) => user.id === task.assigneeId);
  const priorityInfo = getPriorityDetails(task.priority);
  const typeInfo = getMinimizedTypeDetails(task.type);
  const TypeIcon = Icons[typeInfo.icon as keyof typeof Icons];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity inline-block">
          <div
            className={`p-1 rounded-sm ${typeInfo.iconBgColor} ${typeInfo.iconColor}`}
          >
            {TypeIcon && <TypeIcon size={16} />}
          </div>
        </div>
      </div>

      <p className="text-md font-medium text-text-primary leading-tight">
        {task.title}
      </p>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium text-text-secondary">{task.id}</p>
          <div
            className="relative cursor-pointer hover:opacity-80 transition-opacity inline-block"
            title={`Priority: ${task.priority}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={`text-xs uppercase font-bold px-2 py-0.5 rounded-sm ${priorityInfo.iconBgColor} ${priorityInfo.iconColor}`}
            >
              {priorityInfo.label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {editingPointsId === task.id ? (
            <input
              onClick={(e) => e.stopPropagation()}
              type="number"
              autoFocus
              defaultValue={task.storyPoints || ""}
              className="w-10 h-6 text-sm bg-bg-primary border border-accent-primary rounded px-1 outline-none text-text-primary font-medium"
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
            isSprintBased && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingPointsId(task.id);
                }}
                className="flex items-center gap-1 text-sm text-text-secondary font-medium bg-bg-secondary hover:bg-bg-primary hover:border-bg-darker border border-transparent px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                title="Click to edit Story Points"
              >
                <Icons.Favorite size={12} className="text-yellow-500" filled />
                {task.storyPoints || "-"}
              </div>
            )
          )}

          {assignee ? (
            <div
              onClick={(e) => e.stopPropagation()}
              title={assignee.name}
              className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white uppercase"
            >
              {assignee.name.charAt(0)}
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-bg-secondary border border-dashed border-border flex items-center justify-center text-text-secondary">
              <Icons.User size={12} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
