import React from 'react';
import { 
  Check, 
  Calendar, 
  Clock, 
  Pencil, 
  Trash2, 
  AlertTriangle,
  Briefcase,
  Palette,
  Code2,
  User,
  HeartPulse,
  Tag,
  CheckCircle2
} from 'lucide-react';

const categoryIcons = {
  Work: Briefcase,
  Design: Palette,
  Development: Code2,
  Personal: User,
  Health: HeartPulse,
};

export default function TaskCard({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  viewMode = 'grid' 
}) {
  // Format due date relative to today
  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = dateStr.split('-').map(Number);
    const dueDate = new Date(year, month - 1, day);
    dueDate.setHours(0, 0, 0, 0);

    const diffDays = Math.round((dueDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)}d overdue`, isOverdue: true, isToday: false, isTomorrow: false };
    } else if (diffDays === 0) {
      return { text: 'Due today', isOverdue: false, isToday: true, isTomorrow: false };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', isOverdue: false, isToday: false, isTomorrow: true };
    } else {
      return { 
        text: dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
        isOverdue: false, 
        isToday: false,
        isTomorrow: false
      };
    }
  };

  const dueInfo = formatDueDate(task.dueDate);
  const CategoryIcon = categoryIcons[task.category] || Tag;

  // Status indicator calculation
  let statusBadge = null;
  if (task.completed) {
    statusBadge = (
      <span className="tf-status-badge completed">
        <CheckCircle2 size={12} />
        <span>Completed</span>
      </span>
    );
  } else if (dueInfo?.isOverdue) {
    statusBadge = (
      <span className="tf-status-badge overdue">
        <AlertTriangle size={12} />
        <span>Overdue</span>
      </span>
    );
  } else if (dueInfo?.isToday) {
    statusBadge = (
      <span className="tf-status-badge today">
        <Clock size={12} />
        <span>Due Today</span>
      </span>
    );
  } else {
    statusBadge = (
      <span className="tf-status-badge pending">
        <span>In Progress</span>
      </span>
    );
  }

  return (
    <article 
      className={`tf-task-card priority-${task.priority} ${task.completed ? 'is-completed' : ''} ${viewMode === 'list' ? 'list-mode' : ''}`}
    >
      {/* Priority accent side strip */}
      <div className={`tf-card-side-accent priority-${task.priority}`} />

      <div className={viewMode === 'list' ? 'tf-task-inner' : 'tf-task-body'}>
        {/* Header row: Checkbox + Title & Description + Quick Actions */}
        <div className="tf-task-header">
          {/* Animated Custom Checkbox */}
          <label 
            className="tf-checkbox-wrapper" 
            title={task.completed ? "Click to mark as pending" : "Click to mark as completed"}
          >
            <input
              type="checkbox"
              className="tf-checkbox-input"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
            />
            <span className="tf-custom-checkbox">
              <Check size={14} strokeWidth={3} className="tf-check-svg" />
            </span>
          </label>

          {/* Main Info */}
          <div className="tf-task-main">
            <div className="tf-task-title-row">
              <h3 className="tf-task-title">
                {task.title}
              </h3>
            </div>

            {task.description && (
              <p className="tf-task-desc">{task.description}</p>
            )}
          </div>

          {/* Quick Actions (Edit & Delete) */}
          <div className="tf-task-actions">
            <button
              type="button"
              className="tf-action-btn edit-btn"
              onClick={() => onEdit(task)}
              aria-label={`Edit task: ${task.title}`}
              title="Edit task"
            >
              <Pencil size={15} />
            </button>

            <button
              type="button"
              className="tf-action-btn delete-btn"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete task: ${task.title}`}
              title="Delete task"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Footer row: Status badge + Category + Priority + Due Date */}
        <div className="tf-task-footer">
          <div className="tf-task-badges-left">
            {/* Status indicator */}
            {statusBadge}

            {/* Category badge */}
            {task.category && (
              <span className="tf-tag-category">
                <CategoryIcon size={12} />
                <span>{task.category}</span>
              </span>
            )}

            {/* Priority badge with colored dot */}
            <span className={`tf-tag-priority ${task.priority}`}>
              <span className="tf-priority-dot" />
              <span>{task.priority}</span>
            </span>
          </div>

          {/* Due date */}
          {dueInfo && (
            <div className={`tf-task-due ${dueInfo.isOverdue ? 'due-overdue' : dueInfo.isToday ? 'due-today' : ''}`}>
              {dueInfo.isOverdue ? (
                <AlertTriangle size={13} />
              ) : (
                <Calendar size={13} />
              )}
              <span>{dueInfo.text}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
