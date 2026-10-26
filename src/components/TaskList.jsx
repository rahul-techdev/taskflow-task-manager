import React from 'react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

export default function TaskList({
  tasks,
  viewMode,
  hasFilters,
  onResetFilters,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onAddTask
}) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        hasFilters={hasFilters}
        onResetFilters={onResetFilters}
        onAddTask={onAddTask}
      />
    );
  }

  const containerClass = viewMode === 'grid' 
    ? 'tf-tasks-container-grid' 
    : 'tf-tasks-container-list';

  return (
    <div className={containerClass}>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          viewMode={viewMode}
          onToggleComplete={onToggleComplete}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}
