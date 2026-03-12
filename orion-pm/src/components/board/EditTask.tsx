import {
  commentsMock,
  Priority,
  sprintsMock,
  usersMock,
  WorkItemMock,
  WorkItemType,
} from "@/mocks/mock";
import { useState } from "react";
import Input from "../ui/input";
import { Icons } from "../icons";
import Select, { SelectOption } from "../ui/select";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TASK_TYPE_OPTIONS,
} from "@/utils/board-utils";

interface EditTaskProps {
  task: WorkItemMock;
}

export default function EditTask({ task: initialTask }: EditTaskProps) {
  const [task, setTask] = useState<WorkItemMock>(initialTask);

  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [descValue, setDescValue] = useState(task.description || "");
  const [isAddingCriteria, setIsAddingCriteria] = useState(false);
  const [newCriteria, setNewCriteria] = useState("");
  const [newComment, setNewComment] = useState("");

  const assignee = usersMock.find((user) => user.id === task?.assigneeId);
  const sprint = sprintsMock.find((sprint) => sprint.id === task.sprintId);
  const taskComments = commentsMock.filter(
    (comment) => comment.workItemId === task.id,
  );

  const assigneeOptions: SelectOption[] = [
    {
      value: "unassigned",
      label: "Unassigned",
      icon: "User",
      iconBgColor: "bg-gray-200",
    },
    ...usersMock.map((user) => ({
      value: user.id,
      label: user.name,
      icon: "User" as const,
      iconColor: "text-white",
      iconBgColor: "bg-blue-500",
    })),
  ];

  const updateField = (field: keyof WorkItemMock, value: any) => {
    // todo: chamar api de put
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDescription = () => {
    updateField("description", descValue);
    setIsEditingDesc(false);
  };

  const handleAddCriteria = () => {
    if (!newCriteria.trim()) return;
    const newItem = {
      id: `ac-${Date.now()}`,
      title: newCriteria,
      completed: false,
    };
    const updatedCriteria = [...(task.acceptanceCriteria || []), newItem];
    updateField("acceptanceCriteria", updatedCriteria);
    setNewCriteria("");
    setIsAddingCriteria(false);
  };

  const handleToggleCriteria = (id: string) => {
    const updatedCriteria = (task.acceptanceCriteria || []).map(
      (acceptanceCriteria) =>
        acceptanceCriteria.id === id
          ? { ...acceptanceCriteria, completed: !acceptanceCriteria.completed }
          : acceptanceCriteria,
    );
    updateField("acceptanceCriteria", updatedCriteria);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex flex-col gap-6 flex-1 w-full text-text-primary">
          <div className="flex items-center gap-4 border-b border-border pb-4">
            <h2 className="text-lg font-bold text-text-primary pt-1">
              {task.title}
            </h2>
            <div className="w-40">
              <Select
                label=""
                options={TASK_TYPE_OPTIONS}
                value={task.type}
                onChange={(value) => updateField("type", value)}
              />
            </div>
          </div>

          <div className="min-h-30">
            <h4 className="text-md font-bold text-text-primary mb-2">
              Description
            </h4>
            {isEditingDesc ? (
              <div className="flex flex-col gap-3">
                <textarea
                  autoFocus
                  className="w-full bg-bg-primary border border-accent-primary rounded-sm p-3 text-sm outline-none min-h-20"
                  value={descValue}
                  onChange={(e) => setDescValue(e.target.value)}
                  placeholder="Add a more detailed description..."
                />
                <div className="flex gap-2 items-center justify-end">
                  <button
                    onClick={handleSaveDescription}
                    className="bg-accent-primary 
                  text-white text-xs font-medium
                    px-3 py-1.5 rounded hover:bg-blue-600 
                    transition
                    cursor-pointer
                    "
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingDesc(false)}
                    className="text-text-secondary hover:text-text-primary text-xs 
            font-semibold px-3 py-1.5 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingDesc(true)}
                className="bg-bg-secondary hover:bg-bg-primary 
              hover:border-border border border-transparent p-4 
              rounded-sm text-sm min-h-20 cursor-text transition-colors"
              >
                {task.description || (
                  <span className="text-text-secondary italic">
                    Add a description...
                  </span>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-bold text-text-primary">
                Acceptance Criteria
              </h4>
              {task.acceptanceCriteria &&
                task.acceptanceCriteria.length > 0 && (
                  <span className="text-xs text-text-secondary font-medium">
                    {task.acceptanceCriteria.filter((a) => a.completed).length}
                  </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
              {(task.acceptanceCriteria || []).map((criteria) => (
                <label
                  key={criteria.id}
                  className="flex items-center gap-2 p-2 hover:bg-bg-secondary rounded-md cursor-pointer group transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={criteria.completed}
                    onChange={() => handleToggleCriteria(criteria.id)}
                    className="w-4 h-4 text-accent-primary rounded-sm border-gray-300 focus:ring-accent-primary cursor-pointer"
                  />
                  <span
                    className={`text-sm transition-all ${criteria.completed ? "text-text-secondary line-through" : "text-text-primary"}`}
                  >
                    {criteria.title}
                  </span>
                </label>
              ))}

              {isAddingCriteria ? (
                <div className="flex gap-2 mt-2 items-center">
                  <input
                    autoFocus
                    value={newCriteria}
                    onChange={(e) => setNewCriteria(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddCriteria()}
                    className="flex-1 bg-bg-primary border border-accent-primary rounded px-3 py-1.5 text-sm outline-none"
                    placeholder="What needs to be done?"
                  />
                  <button
                    onClick={handleAddCriteria}
                    className="bg-accent-primary text-white p-1.5 rounded hover:bg-blue-600 transition cursor-pointer"
                  >
                    <Icons.Add size={18} />
                  </button>
                  <button
                    onClick={() => setIsAddingCriteria(false)}
                    className="text-text-secondary hover:text-text-primary p-1.5 cursor-pointer"
                  >
                    <Icons.Collapse size={16} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setIsAddingCriteria(true)}
                  className="flex items-center gap-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary w-fit px-2 py-1.5 rounded transition cursor-pointer text-sm font-medium mt-1"
                >
                  <Icons.Add size={16} />
                  <span>Add Item</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full md:w-72 bg-bg-secondary p-5 rounded-lg border border-border">
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            value={task.columnId || "col-2-1"}
            onChange={(val) => updateField("columnId", val)}
          />

          <Select
            label="Assignee"
            options={assigneeOptions}
            value={task.assigneeId || "unassigned"}
            onChange={(val) =>
              updateField("assigneeId", val === "unassigned" ? null : val)
            }
          />

          <Select
            label="Priority"
            options={PRIORITY_OPTIONS}
            value={task.priority}
            onChange={(val) => updateField("priority", val)}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-md font-semibold text-text-primary">
              Story Points
            </label>
            <div className="flex items-center bg-bg-primary border border-border rounded-md px-3 py-2 shadow-sm focus-within:border-accent-primary transition-colors">
              <Icons.Favorite
                size={16}
                className="text-yellow-500 mr-2"
                filled
              />
              <input
                type="number"
                value={task.storyPoints || ""}
                onChange={(e) =>
                  updateField("storyPoints", Number(e.target.value))
                }
                placeholder="0"
                className="bg-transparent w-full text-md text-text-primary outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-2 border-t border-border">
            <label className="text-sm font-bold text-text-primary">
              Sprint
            </label>
            <span className="text-sm text-accent-primary hover:underline cursor-pointer">
              {sprint?.name || "Active Sprint"}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2 border-t border-border">
        <h4 className="text-md font-bold text-text-primary mb-2 mt-2">Comments</h4>

        <div className="flex flex-col gap-4 mb-2">
          {taskComments.length === 0 ? (
            <span className="text-sm text-text-secondary italic">
              No comments yet.
            </span>
          ) : (
            taskComments.map((comment) => {
              const author = usersMock.find((u) => u.id === comment.userId);
              return (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-bg-darker flex items-center justify-center text-xs font-bold text-text-secondary uppercase shrink-0">
                    {author?.name.charAt(0) || "U"}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">
                        {author?.name || "Unknown User"}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-text-primary mt-1">
                      {comment.content}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            label=""
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            multiline={true}
            rows={2}
            placeholder="Add a comment..."
          />
          <div className="flex justify-end">
            <button
              disabled={!newComment.trim()}
              className="cursor-pointer bg-accent-primary disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Save Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
