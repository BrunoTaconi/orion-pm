import { getTypeColor } from "@/app/(dashboard)/project/[projectId]/board/page";
import { usersMock, WorkItemMock } from "@/mocks/mock";

interface EditTaskProps {
  task: WorkItemMock;
}

export default function EditTask({ task }: EditTaskProps) {
  const assignee = usersMock.find((user) => user.id === task.assigneeId);

  return (
    <div className="flex flex-col gap-6 text-text-primary">
      <h2>{task.id}</h2>
      <div
        className={`appearance-none flex text-xs font-bold px-2 py-0.5 rounded-sm outline-none cursor-pointer transition-colors ${getTypeColor(task.type)}`}
      >
        {task.type}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-text-secondary mb-2">
          Description
        </h4>
        <div className="bg-bg-secondary p-4 rounded-md text-sm min-h-[100px]">
          {task.description || "No description provided."}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-bg-secondary p-4 rounded-md">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-text-secondary">
            Type
          </span>
          <span className="text-sm font-medium">{task.type}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-text-secondary">
            Priority
          </span>
          <span className="text-sm font-medium">{task.priority}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-text-secondary">
            Story Points
          </span>
          <span className="text-sm font-medium">{task.storyPoints || "-"}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-text-secondary">
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
      </div>
    </div>
  );
}
