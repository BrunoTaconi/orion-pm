"use client";

import EditTask from "@/components/board/EditTask";
import { Icons } from "@/components/icons";
import Modal from "@/components/ui/modal";
import {
  boardsMock,
  columnsMock,
  projectsMock,
  sprintsMock,
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
} from "@/utils/board-utils";
import BoardTaskCard from "@/components/board/BoardTaskCard";

export default function BoardPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const [selectedTask, setSelectedTask] = useState<WorkItemMock | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks] = useState<WorkItemMock[]>([]);
  const [editingPointsId, setEditingPointsId] = useState<string | null>(null);

  const resolvedParams = use(params);
  const projectId = resolvedParams.projectId;

  const project = projectsMock.find((project) => project.id === projectId);
  const isSprintBased =
    project?.methodology === "SCRUM" || project?.methodology === "XP";

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
      sprintId: isSprintBased ? activeSprint?.id : undefined,
    };
    setSelectedTask(newTask as WorkItemMock);
    setIsCreating(true);
  };

  useEffect(() => {
    setIsMounted(true);

    const intialTasks = isSprintBased
      ? workItemsMock.filter(
          (workItem) => workItem.sprintId === activeSprint?.id,
        )
      : workItemsMock.filter((workItem) => workItem.projectId === projectId);
    setTasks(intialTasks);
  }, [activeSprint?.id, projectId, isSprintBased]);

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
    newTasks.splice(destination.index, 0, updateTask);

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
            const isOverWip =
              column.wipLimit !== undefined &&
              columnTasks.length > column.wipLimit;

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
                          className={`p-1 rounded flex items-center justify-center ${getColumnStyle(column.name)}`}
                        >
                          <Icons.Flag size={14} />
                        </div>
                        <h3 className="font-bold text-text-primary text-sm">
                          {column.name}
                        </h3>
                        {column.wipLimit && (
                          <span
                            className={`text-xs font-bold ${isOverWip ? "text-red-500" : "text-text-secondary"}`}
                          >
                            {columnTasks.length}/{column.wipLimit}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleCreateTask(column.id)}
                        className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                      >
                        <Icons.Add size={16} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto pt-3 py-1 flex flex-col gap-3 min-h-37.5">
                      {columnTasks.map((task, index) => (
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
                              className={`bg-bg-primary border p-4 rounded-lg shadow-sm transition-all cursor-grab group ${
                                snapshot.isDragging
                                  ? "border-accent-primary shadow-lg rotate-1 scale-105 z-0"
                                  : "border-border hover:border-accent-primary hover:shadow-md"
                              }`}
                            >
                              <BoardTaskCard
                                task={task}
                                isSprintBased={isSprintBased}
                                editingPointsId={editingPointsId}
                                setEditingPointsId={setEditingPointsId}
                                handleUpdateStoryPoints={
                                  handleUpdateStoryPoints
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
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
        {selectedTask && (
          <EditTask
            task={selectedTask}
            isCreating={isCreating}
            isSprintBased={isSprintBased}
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
