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

    // const destinationTasks = newTasks.filter(
    //   (task) => task.columnId === destination.droppableId,
    // );

    newTasks.push(updateTask); //api will be called here later

    setTasks(newTasks);
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return {
          label: "priority critical",
          style: "bg-red-100 text-red-700",
        };
      case "HIGH":
        return {
          label: "priority high",
          style: "bg-orange-100 text-orange-700",
        };
      case "MEDIUM":
        return {
          label: "priority medium",
          style: "bg-yellow-100 text-yellow-700",
        };
      case "LOW":
        return {
          label: "priority low",
          style: "bg-green-100 text-green-700",
        };
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "STORY":
        return "bg-green-100 text-green-700";
      case "BUG":
        return "bg-red-100 text-red-700";
      case "TASK":
        return "bg-blue-100 text-blue-700";
      case "SPIKE":
        return "bg-yellow-100 text-yellow-600";
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

  const storyPointOptions: SelectOption[] = [
    {
      value: "1",
      label: "1",
      icon: "Favorite",
      iconColor: "text-yellow-icon",
      iconBgColor: "bg-bg-light-yellow",
    },
    {
      value: "2",
      label: "2",
      icon: "Favorite",
      iconColor: "text-yellow-icon",
      iconBgColor: "bg-bg-light-yellow",
    },
    {
      value: "3",
      label: "3",
      icon: "Favorite",
      iconColor: "text-yellow-icon",
      iconBgColor: "bg-bg-light-yellow",
    },
    {
      value: "4",
      label: "4",
      icon: "Favorite",
      iconColor: "text-yellow-icon",
      iconBgColor: "bg-bg-light-yellow",
    },
    {
      value: "5",
      label: "5",
      icon: "Favorite",
      iconColor: "text-yellow-icon",
      iconBgColor: "bg-bg-light-yellow",
    },
    {
      value: "6",
      label: "6",
      icon: "Favorite",
      iconColor: "text-yellow-icon",
      iconBgColor: "bg-bg-light-yellow",
    },
    {
      value: "7",
      label: "7",
      icon: "Favorite",
      iconColor: "text-yellow-icon",
      iconBgColor: "bg-bg-light-yellow",
    },
    {
      value: "7",
      label: "7",
      icon: "Favorite",
      iconColor: "text-yellow-icon",
      iconBgColor: "bg-bg-light-yellow",
    },
    {
      value: "8",
      label: "8",
      icon: "Favorite",
      iconColor: "text-yellow-icon",
      iconBgColor: "bg-bg-light-yellow",
    },
    {
      value: "9",
      label: "9",
      icon: "Favorite",
      iconColor: "text-yellow-icon",
      iconBgColor: "bg-bg-light-yellow",
    },
  ];

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

                      function updateProjectData(arg0: {
                        teamId: string;
                      }): void {
                        throw new Error("Function not implemented.");
                      }

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
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${getTypeColor(task.type)}`}
                                >
                                  {task.type}
                                </span>
                              </div>

                              <p className="text-sm font-medium text-text-primary leading-tight">
                                {task.title}
                              </p>

                              <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center gap-3">
                                  <p className="text-sm font-medium text-text-secondary">
                                    {task.id}
                                  </p>

                                  <span
                                    className={`text-xs font-bold px-2 py-0.5 rounded-sm ${priority?.style}`}
                                  >
                                    {priority?.label}
                                  </span>
                                </div>

                                <div className="flex items-center gap-3">
                                  {task.storyPoints && (
                                    <div className="flex items-center gap-1.5 text-sm text-text-secondary font-medium bg-bg-secondary px-1.5 py-1 rounded">
                                      <Icons.Favorite
                                        size={14}
                                        className="text-yellow-500"
                                        filled
                                      />
                                      {task.storyPoints}
                                      <Select
                                        label=""
                                        options={storyPointOptions}
                                        value={task.storyPoints}
                                        onChange={(value) =>
                                          updateProjectData({ teamId: value })
                                        }
                                        placeholder=""
                                      />
                                    </div>
                                  )}
                                  {assignee ? (
                                    <div
                                      title={assignee.name}
                                      className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold text-white uppercase"
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

        {/* <button className="flex items-center justify-center gap-2 bg-transparent border-2 border-dashed border-border hover:border-accent-primary hover:text-accent-primary hover:bg-bg-primary text-text-secondary rounded-xl w-80 shrink-0 h-16 transition-all font-medium text-sm">
          <Icons.ThumbsUp size={16} />
          Add Column
        </button> */}
      </div>
    </DragDropContext>
  );
}
