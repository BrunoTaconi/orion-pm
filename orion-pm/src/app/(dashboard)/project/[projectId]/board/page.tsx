"use client";

import EditTask from "@/components/board/EditTask";
import { Icons } from "@/components/icons";
import Modal from "@/components/ui/modal";
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
import {
  getColumnStyle,
  getMinimizedTypeDetails,
  getPriorityDetails,
} from "@/utils/board-utils";

export default function BoardPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const [selectedTask, setSelectedTask] = useState<WorkItemMock | null>(null);
  const [isCreating, setIsCreating] = useState(false);

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

  const handleCreateTask = (columnId: string) => {
    const newTask: Partial<WorkItemMock> = {
      title: "New Task",
      projectId: projectId,
      type: "TASK",
      priority: "MEDIUM",
      columnId: columnId,
      sprintId: activeSprint?.id,
    };
    setSelectedTask(newTask as WorkItemMock);
    setIsCreating(true);
  };

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

  const handleUpdateStoryPoints = (taskId: string, newPoints: number) => {
    //todo: chamar api de put
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, storyPoints: newPoints } : task,
      ),
    );
    setEditingPointsId(null);
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
    <>
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
                        {/* Utilizando a utilidade de estilo do cabeçalho */}
                        <div
                          className={`p-1 rounded flex items-center justify-center ${getColumnStyle(column.name)}`}
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
                      <button
                        onClick={() => handleCreateTask(column.id)}
                        className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                      >
                        <Icons.Add size={16} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto pt-3 py-1 flex flex-col gap-3 min-h-37.5">
                      {columnTasks.map((task, index) => {
                        const assignee = usersMock.find(
                          (user) => user.id === task.assigneeId,
                        );

                        const priorityInfo = getPriorityDetails(task.priority);
                        const typeInfo = getMinimizedTypeDetails(task.type);

                        const TypeIcon =
                          Icons[typeInfo.icon as keyof typeof Icons];

                        return (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                onClick={() => setSelectedTask(task)}
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
                                  <div className="relative cursor-pointer hover:opacity-80 transition-opacity inline-block">
                                    {/* <select
                                      onClick={(e) => e.stopPropagation()}
                                      value={task.type}
                                      onChange={(e) =>
                                        handleUpdateType(
                                          task.id,
                                          e.target.value as WorkItemType,
                                        )
                                      }
                                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    >
                                      <option value="STORY">STORY</option>
                                      <option value="BUG">BUG</option>
                                      <option value="TASK">TASK</option>
                                      <option value="SPIKE">SPIKE</option>
                                      <option value="TECH_DEBT">
                                        TECH DEBT
                                      </option>
                                    </select> */}
                                    {/* A "Badge" que aparece por baixo com as cores utilitárias */}
                                    <div
                                      className={`p-1 rounded-sm ${typeInfo.iconBgColor} ${typeInfo.iconColor}`}
                                    >
                                      {TypeIcon && <TypeIcon size={16} />}
                                      {/* <span className="uppercase">
                                        {typeInfo.label}
                                      </span> */}
                                    </div>
                                  </div>
                                </div>

                                <p className="text-md font-medium text-text-primary leading-tight">
                                  {task.title}
                                </p>

                                <div className="flex items-center justify-between mt-1">
                                  <div className="flex items-center gap-3">
                                    <p className="text-sm font-medium text-text-secondary">
                                      {task.id}
                                    </p>

                                    {/* --- PRIORITY INLINE USANDO UTILS --- */}
                                    <div
                                      className="relative cursor-pointer hover:opacity-80 transition-opacity inline-block"
                                      title={`Priority: ${task.priority}`}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {/* <select
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
                                        <option value="CRITICAL">
                                          Critical
                                        </option>
                                      </select> */}
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
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingPointsId(task.id);
                                        }}
                                        className="flex items-center gap-1 text-sm text-text-secondary font-medium bg-bg-secondary hover:bg-bg-primary hover:border-bg-darker border border-transparent px-1.5 py-0.5 rounded cursor-pointer transition-colors"
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
        {selectedTask && <EditTask task={selectedTask} />}
      </Modal>
    </>
  );
}
