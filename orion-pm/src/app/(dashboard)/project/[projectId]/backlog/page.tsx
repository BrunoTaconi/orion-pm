"use client";

import EditTask from "@/components/board/EditTask";
import { Icons } from "@/components/icons";
import Modal from "@/components/ui/modal";
import {
  sprintsMock,
  usersMock,
  WorkItemMock,
  workItemsMock,
} from "@/mocks/mock";
import { getTypeDetails, STATUS_OPTIONS } from "@/utils/board-utils";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { use, useEffect, useState } from "react";

function BacklogTaskRow({
  task,
  index,
  onClick,
}: {
  task: WorkItemMock;
  index: number;
  onClick: () => void;
}) {
  const typeInfo = getTypeDetails(task.type);
  const TypeIcon = Icons[typeInfo.icon as keyof typeof Icons];
  const assignee = usersMock.find((user) => user.id === task.assigneeId);

  const getStatusLabel = (columnId?: string) => {
    if (!columnId) return "To Do";
    const option = STATUS_OPTIONS.find((option) => option.value === columnId);
    return option ? option.label.toUpperCase() : "TO DO";
  };

  const getStatusColor = (columnId?: string) => {
    if (!columnId) return "bg-gray-200 text-gray-700";
    const option = STATUS_OPTIONS.find((option) => option.value === columnId);
    return option
      ? `${option.iconBgColor} ${option.iconColor}`
      : "bg-gray-200 text-gray-700";
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className={`flex items-center justify-between p-3 border-b border-border last:border-b-0 group cursor-pointer transition-colors ${
            snapshot.isDragging
              ? "bg-bg-secondary shadow-lg z-50"
              : "bg-bg-primary hover:bg-bg-secondary"
          }`}
        >
          <div className="flex items-center gap-3 flex-1">
            <div
              className={`p-1 rounded ${typeInfo.iconBgColor} ${typeInfo.iconColor}`}
              title={typeInfo.label}
            >
              {TypeIcon && <TypeIcon size={14} />}
            </div>
            <span className="text-sm font-medium text-text-secondary w-12">
              {task.id}
            </span>
            <span className="text-sm font-medium text-text-primary group-hover:underline line-clamp-1">
              {task.title}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${getStatusColor(
                task.columnId,
              )}`}
            >
              {getStatusLabel(task.columnId)}
            </span>

            <div className="w-6 text-center">
              {task.storyPoints ? (
                <span className="text-xs font-bold bg-bg-secondary text-text-secondary px-2 py-0.5 rounded-full">
                  {task.storyPoints}
                </span>
              ) : (
                <span className="text-xs font-bold text-text-secondary">-</span>
              )}
            </div>

            {assignee ? (
              <div
                title={assignee.name}
                className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white uppercase"
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
      )}
    </Draggable>
  );
}

export default function BacklogPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.projectId;

  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks] = useState<WorkItemMock[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const [selectedTask, setSelectedTask] = useState<WorkItemMock | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const projectSprints = sprintsMock.filter(
    (sprint) => sprint.projectId === projectId,
  );

  const activeSprint =
    projectSprints.find((sprint) => sprint.status === "ACTIVE") ||
    projectSprints[0];

  useEffect(() => {
    setIsMounted(true);

    const projectTasks = workItemsMock.filter(
      (workItem) => workItem.projectId === projectId,
    );
    setTasks(projectTasks);
  }, [projectId]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const draggedTask = tasks.find((task) => task.id === draggableId);
    if (!draggedTask) return;

    const newTasks = Array.from(tasks);
    const sourceIndex = newTasks.findIndex((task) => task.id === draggableId);
    newTasks.splice(sourceIndex, 1);

    let newSprintId: string | null = null;
    if (destination.droppableId.startsWith("sprint-")) {
      newSprintId = destination.droppableId.replace("sprint-", "");
    }

    const updatedTask = { ...draggedTask, sprintId: newSprintId || undefined };

    newTasks.splice(destination.index, 0, updatedTask as WorkItemMock);
    setTasks(newTasks);
    // todo: Chamar API de put
  };

  const handleCreateTask = (sprintId: string | null) => {
    const newTask: Partial<WorkItemMock> = {
      title: "New Task",
      projectId: projectId,
      type: "TASK",
      priority: "MEDIUM",
      columnId: "col-2-1",
      sprintId: sprintId || undefined,
    };
    setSelectedTask(newTask as WorkItemMock);
    setIsCreating(true);
  };

  const toggleAssigneeFilter = (userId: string) => {
    setSelectedAssignees((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedAssignees([]);
  };

  const handleCompleteSprint = () => {
    alert(
      "This will complete the active sprint and move unfinished tasks to the backlog or next sprint!",
    );
    //todo: active this api+
  };

  if (!isMounted) return null;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAssignee =
      selectedAssignees.length === 0 ||
      (task.assigneeId && selectedAssignees.includes(task.assigneeId));

    return matchesSearch && matchesAssignee;
  });

  const sprintTasks = filteredTasks.filter(
    (task) => task.sprintId === activeSprint?.id,
  );
  const backlogTasks = filteredTasks.filter(
    (task) => !task.sprintId || task.sprintId === "backlog",
  );

  const sprintStatusCounts = sprintTasks.reduce(
    (acc, task) => {
      const key = task.columnId || "";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const getStatusCountBg = (colId: string) => {
    switch (colId) {
      case "col-2-1":
        return "bg-gray-200 text-gray-600";
      case "col-2-2":
        return "bg-orange-100 text-orange-600";
      case "col-2-3":
        return "bg-yellow-100 text-yellow-600";
      case "col-2-4":
        return "bg-purple-100 text-purple-600";
      case "col-2-5":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <>
      <div className="flex flex-col h-full w-full max-w-5xl mx-auto pb-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-64">
              <Icons.Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg-primary border border-border rounded-md pl-9 pr-3 py-1.5 text-sm text-text-primary outline-none focus:border-accent-primary transition-colors"
              />
            </div>

            <div className="flex items-center -space-x-2">
              {usersMock.map((user) => {
                const isSelected = selectedAssignees.includes(user.id);
                return (
                  <div
                    key={user.id}
                    title={user.name}
                    onClick={() => toggleAssigneeFilter(user.id)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold uppercase cursor-pointer transition-all hover:-translate-y-1
                      ${isSelected ? "border-accent-primary bg-blue-600 text-white z-10 scale-110" : "border-bg-secondary bg-blue-500 text-white opacity-80 hover:opacity-100"}
                    `}
                  >
                    {user.name.charAt(0)}
                  </div>
                );
              })}
              <div className="w-8 h-8 rounded-full border-2 border-bg-secondary bg-bg-primary flex items-center justify-center text-text-secondary cursor-pointer hover:bg-bg-darker transition-colors hover:-translate-y-1">
                <Icons.Add size={16} />
              </div>
            </div>

            <button className="cursor-pointer flex items-center gap-2 text-sm text-text-primary bg-bg-primary border border-border px-3 py-1.5 rounded-md hover:bg-bg-darker transition-colors">
              Epics <Icons.Collapse size={14} className="-rotate-90" />
            </button>
            <button className="cursor-pointer flex items-center gap-2 text-sm text-text-primary bg-bg-primary border border-border px-3 py-1.5 rounded-md hover:bg-bg-darker transition-colors">
              Type <Icons.Collapse size={14} className="-rotate-90" />
            </button>
          </div>

          {(searchQuery || selectedAssignees.length > 0) && (
            <button
              onClick={clearFilters}
              className="cursor-pointer text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          {activeSprint && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-text-primary">
                    {activeSprint.name}
                  </h2>
                  <span className="text-xs text-text-secondary font-medium">
                    {activeSprint.startDate.toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}{" "}
                    -{" "}
                    {activeSprint.endDate.toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                  <span className="text-xs text-text-secondary bg-bg-primary border border-border px-2 py-0.5 rounded-full">
                    {sprintTasks.length} issues
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {Object.entries(sprintStatusCounts).map(
                      ([colId, count]) => (
                        <span
                          key={colId}
                          className={`min-w-5 h-5 px-1 rounded-full flex items-center justify-center ${getStatusCountBg(colId)}`}
                        >
                          {count}
                        </span>
                      ),
                    )}
                  </div>
                  <button
                    onClick={handleCompleteSprint}
                    className="cursor-pointer bg-bg-secondary hover:bg-bg-darker text-text-primary text-sm font-semibold px-4 py-1.5 rounded-md transition-colors"
                  >
                    Complete sprint
                  </button>
                </div>
              </div>

              <Droppable droppableId={`sprint-${activeSprint.id}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex flex-col rounded-xl border min-h-12.5 overflow-hidden transition-colors ${
                      snapshot.isDraggingOver
                        ? "bg-bg-secondary/50 border-accent-primary"
                        : "bg-bg-primary border-border"
                    }`}
                  >
                    {sprintTasks.length === 0 && !snapshot.isDraggingOver && (
                      <div className="p-8 text-center text-sm text-text-secondary border-2 border-dashed border-border m-2 rounded-lg">
                        Plan a sprint by dragging issues here
                      </div>
                    )}

                    {sprintTasks.map((task, index) => (
                      <BacklogTaskRow
                        key={task.id}
                        task={task}
                        index={index}
                        onClick={() => setSelectedTask(task)}
                      />
                    ))}
                    {provided.placeholder}

                    <div className="p-2 border-t border-border bg-bg-primary">
                      <button
                        onClick={() => handleCreateTask(activeSprint.id)}
                        className="cursor-pointer flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary px-2 py-1 transition-colors w-full rounded hover:bg-bg-secondary text-left"
                      >
                        <Icons.Add size={16} /> Create issue
                      </button>
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-text-primary">Backlog</h2>
                <span className="text-xs text-text-secondary bg-bg-primary border border-border px-2 py-0.5 rounded-full">
                  {backlogTasks.length} issues
                </span>
              </div>
              <button className="cursor-pointer bg-bg-secondary hover:bg-bg-darker text-text-primary text-sm font-semibold px-4 py-1.5 rounded-md transition-colors">
                Create sprint
              </button>
            </div>

            <Droppable droppableId="backlog">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex flex-col rounded-xl border min-h-12.5 overflow-hidden transition-colors ${
                    snapshot.isDraggingOver
                      ? "bg-bg-secondary/50 border-accent-primary"
                      : "bg-bg-primary border-border"
                  }`}
                >
                  {backlogTasks.length === 0 && !snapshot.isDraggingOver && (
                    <div className="p-8 text-center text-sm text-text-secondary border-2 border-dashed border-border m-2 rounded-lg">
                      Your backlog is empty.
                    </div>
                  )}

                  {backlogTasks.map((task, index) => (
                    <BacklogTaskRow
                      key={task.id}
                      task={task}
                      index={index}
                      onClick={() => setSelectedTask(task)}
                    />
                  ))}
                  {provided.placeholder}

                  <div className="p-2 border-t border-border bg-bg-primary">
                    <button
                      onClick={() => handleCreateTask(null)}
                      className="cursor-pointer flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary px-2 py-1 transition-colors w-full rounded hover:bg-bg-secondary text-left"
                    >
                      <Icons.Add size={16} /> Create issue
                    </button>
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>

      <Modal
        title={
          isCreating ? "Create New Task" : selectedTask?.id || "Task Details"
        }
        isOpen={!!selectedTask}
        onClose={() => {
          setSelectedTask(null);
          setIsCreating(false);
        }}
        size="3xl"
        titleSize="text-md"
        padding="p-6"
        closeOnOverlayClick={true}
      >
        {selectedTask && (
          <EditTask
            task={selectedTask}
            isCreating={isCreating}
            onClose={() => {
              setSelectedTask(null);
              setIsCreating(false);
            }}
          />
        )}
      </Modal>
    </>
  );
}
