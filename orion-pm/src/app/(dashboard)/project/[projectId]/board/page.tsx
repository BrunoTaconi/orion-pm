"use client";

import { Icons } from "@/components/icons";
import Select, { SelectOption } from "@/components/ui/select";
import {
  boardsMock,
  columnsMock,
  sprintsMock,
  usersMock,
  WorkItemMock,
  workItemsMock,
} from "@/mocks/mock";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Priority, WorkItemType } from "@prisma/client";
import { use, useEffect, useState } from "react";

export default function BoardPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.projectId;

  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks] = useState<WorkItemMock[]>([]);

  const [editingPointsId, setEditingPointsId] = useState<string | null>(null);

  const board = boardsMock.find((board) => board.projectId === projectId);
  const columns = columnsMock
    .filter((column) => column.boardId === board?.id)
    .sort((a, b) => a.order - b.order);
  const activeSprint = sprintsMock.find(
    (sprint) => sprint.projectId === projectId && sprint.status === "ACTIVE",
  );

  useEffect(() => {
    setIsMounted(true);

    const intialTasks = workItemsMock.filter(
      (workItem) => workItem.sprintId === activeSprint?.id,
    );
    setTasks(intialTasks);
  }, [activeSprint?.id]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedTask = tasks.find((task) => task.id === draggableId);
    if (!draggedTask) return;

    const newTasks = Array.from(tasks);

    const sourceIndex = newTasks.findIndex((task) => task.id === draggableId);
    newTasks.splice(sourceIndex, 1);

    const updateTask = { ...draggedTask, columnId: destination.droppableId };

    newTasks.push(updateTask); //api will be called here later

    setTasks(newTasks);
  };

  const handleUpdateType = (taskId: string, newType: WorkItemType) => {
    //todo: chamar api de put
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, type: newType } : task,
      ),
    );
  };

  const handleUpdatePriority = (taskId: string, newPriority: Priority) => {
    //todo: chamar api de put
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, priority: newPriority } : task,
      ),
    );
  };

  const handleUpdateStoryPoints = (taskId: string, newPoints: number) => {
    //todo: chamar api de put
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, storyPoints: newPoints } : task,
      ),
    );
    setEditingPointsId(null);
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return {
          label: "priority critical",
          style: "bg-red-100 text-red-600",
        };
      case "HIGH":
        return {
          label: "priority high",
          style: "bg-orange-100 text-orange-600",
        };
      case "MEDIUM":
        return {
          label: "priority medium",
          style: "bg-yellow-100 text-yellow-600",
        };
      case "LOW":
        return {
          label: "priority low",
          style: "bg-green-100 text-green-600",
        };
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "STORY":
        return "bg-yellow-100 text-yellow-600";
      case "BUG":
        return "bg-red-100 text-red-700";
      case "TASK":
        return "bg-blue-100 text-blue-700";
      case "SPIKE":
        return "bg-bg-light-purple text-purple-icon";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getHeaderIconColor = (name: string) => {
    switch (name) {
      case "To Do":
        return "bg-bg-light-red text-red-icon";
      case "In Progress":
        return "bg-bg-light-orange text-orange-icon";
      case "In Review":
        return "bg-bg-light-yellow text-yellow-icon";
      case "In Validation":
        return "bg-bg-light-purple text-purple-icon";
      case "Done":
        return "bg-bg-light-green text-green-icon";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (!isMounted) return null;

  if (!board) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-text-secondary">
        <Icons.Project size={48} className="mb-4 opacity-50" />
        <p>No board configured for this project.</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 h-full w-full overflow-x-auto">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.columnId === column.id,
          );

          return (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex flex-col rounded-xl w-80 shrink-0 max-h-full overflow-hidden transition-colors ${
                    snapshot.isDraggingOver
                      ? "bg-bg-secondary/80 border-accent-primary"
                      : "bg-bg-secondary"
                  }`}
                >
                  <div className="flex items-center justify-between p-4 bg-bg-primary rounded-md shrink-0 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-1 rounded flex items-center justify-center ${getHeaderIconColor(column.name)}`}
                      >
                        <Icons.Flag size={14} />
                      </div>
                      <h3 className="font-bold text-text-primary text-sm">
                        {column.name}
                      </h3>
                      <span className="bg-bg-secondary text-text-secondary text-xs px-2 py-0.5 rounded-full font-medium">
                        {columnTasks.length}
                      </span>
                    </div>
                    <button className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                      <Icons.Add size={16} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto pt-3 py-1 flex flex-col gap-3 min-h-37.5">
                    {columnTasks.map((task, index) => {
                      const assignee = usersMock.find(
                        (user) => user.id === task.assigneeId,
                      );
                      const priority = getPriorityStyle(task.priority);

                      return (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-bg-primary border p-4 rounded-lg shadow-sm transition-all cursor-grab group flex flex-col gap-3 ${
                                snapshot.isDragging
                                  ? "border-accent-primary shadow-lg rotate-1 scale-105 z-0"
                                  : "border-border hover:border-accent-primary hover:shadow-md"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <select
                                  value={task.type}
                                  onChange={(e) =>
                                    handleUpdateType(
                                      task.id,
                                      e.target.value as WorkItemType,
                                    )
                                  }
                                  className={`appearance-none flex justify-center text-[10px] font-bold px-2 py-0.5 rounded-sm outline-none cursor-pointer transition-colors ${getTypeColor(task.type)}`}
                                >
                                  <option
                                    value="STORY"
                                    className="bg-bg-primary text-text-primary font-medium"
                                  >
                                    STORY
                                  </option>
                                  <option
                                    value="BUG"
                                    className="bg-bg-primary text-text-primary font-medium"
                                  >
                                    BUG
                                  </option>
                                  <option
                                    value="TASK"
                                    className="bg-bg-primary text-text-primary font-medium"
                                  >
                                    TASK
                                  </option>
                                  <option
                                    value="SPIKE"
                                    className="bg-bg-primary text-text-primary font-medium"
                                  >
                                    SPIKE
                                  </option>
                                </select>
                              </div>

                              <p className="text-sm font-medium text-text-primary leading-tight">
                                {task.title}
                              </p>

                              <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center gap-3">
                                  <p className="text-sm font-medium text-text-secondary">
                                    {task.id}
                                  </p>

                                  {/* --- PRIORIDADE INLINE COM O SEU LABEL --- */}
                                  <div
                                    className="relative cursor-pointer hover:opacity-80 transition-opacity inline-block"
                                    title={`Priority: ${task.priority}`}
                                  >
                                    <select
                                      value={task.priority}
                                      onChange={(e) =>
                                        handleUpdatePriority(
                                          task.id,
                                          e.target.value as Priority,
                                        )
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

                                <div className="flex items-center gap-3">
                                  {editingPointsId === task.id ? (
                                    <input
                                      type="number"
                                      autoFocus
                                      defaultValue={task.storyPoints || ""}
                                      className="w-10 h-6 text-xs bg-bg-primary border border-accent-primary rounded px-1 outline-none text-text-primary font-medium"
                                      onBlur={(e) =>
                                        handleUpdateStoryPoints(
                                          task.id,
                                          Number(e.target.value),
                                        )
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                          handleUpdateStoryPoints(
                                            task.id,
                                            Number(e.currentTarget.value),
                                          );
                                        if (e.key === "Escape")
                                          setEditingPointsId(null);
                                      }}
                                    />
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setEditingPointsId(task.id)
                                      }
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
                                  {assignee ? (
                                    <div
                                      title={assignee.name}
                                      className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-normal text-white uppercase"
                                    >
                                      {assignee.name.charAt(0)}{assignee.name.charAt(0)}
                                    </div>
                                  ) : (
                                    <div className="w-6 h-6 rounded-full bg-bg-secondary border border-dashed border-border flex items-center justify-center text-text-secondary">
                                      <Icons.User size={12} />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}
