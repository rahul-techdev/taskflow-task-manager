import React from 'react';
import { CheckCircle2, Clock, ListTodo, Flame, TrendingUp } from 'lucide-react';

export default function SummaryCards({ tasks, onFilterClick }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter(t => !t.completed && t.priority === 'high').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const todayStr = new Date().toISOString().split('T')[0];
  const dueToday = tasks.filter(t => !t.completed && t.dueDate === todayStr).length;

  return (
    <div className="tf-summary-grid">
      {/* Total Tasks Card */}
      <div 
        className="tf-summary-card anim-delay-1" 
        onClick={() => onFilterClick && onFilterClick('all')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onFilterClick && onFilterClick('all')}
      >
        <div className="tf-summary-card-inner">
          <div className="tf-summary-card-top">
            <span className="tf-summary-label">Total Tasks</span>
            <div className="tf-summary-icon-box tf-icon-blue">
              <ListTodo size={20} strokeWidth={2.2} />
            </div>
          </div>
          <div className="tf-summary-card-bottom">
            <span className="tf-summary-value">{total}</span>
            <div className="tf-summary-badge tf-badge-blue">
              <TrendingUp size={12} />
              <span>Full backlog</span>
            </div>
          </div>
        </div>
        <div className="tf-summary-card-glow tf-glow-blue" />
      </div>

      {/* Completed Tasks Card */}
      <div 
        className="tf-summary-card anim-delay-2"
        onClick={() => onFilterClick && onFilterClick('completed')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onFilterClick && onFilterClick('completed')}
      >
        <div className="tf-summary-card-inner">
          <div className="tf-summary-card-top">
            <span className="tf-summary-label">Completed Tasks</span>
            <div className="tf-summary-icon-box tf-icon-green">
              <CheckCircle2 size={20} strokeWidth={2.2} />
            </div>
          </div>
          <div className="tf-summary-card-bottom">
            <div className="tf-summary-val-row">
              <span className="tf-summary-value">{completed}</span>
              <span className="tf-summary-pill-green">{completionRate}% Done</span>
            </div>
            {/* Visual mini progress bar */}
            <div className="tf-card-progress-bar">
              <div 
                className="tf-card-progress-fill" 
                style={{ width: `${completionRate}%` }} 
              />
            </div>
          </div>
        </div>
        <div className="tf-summary-card-glow tf-glow-green" />
      </div>

      {/* Pending Tasks Card */}
      <div 
        className="tf-summary-card anim-delay-3"
        onClick={() => onFilterClick && onFilterClick('pending')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onFilterClick && onFilterClick('pending')}
      >
        <div className="tf-summary-card-inner">
          <div className="tf-summary-card-top">
            <span className="tf-summary-label">Pending Tasks</span>
            <div className="tf-summary-icon-box tf-icon-amber">
              <Clock size={20} strokeWidth={2.2} />
            </div>
          </div>
          <div className="tf-summary-card-bottom">
            <span className="tf-summary-value">{pending}</span>
            <div className="tf-summary-badge tf-badge-amber">
              {dueToday > 0 ? `${dueToday} due today` : 'In progress'}
            </div>
          </div>
        </div>
        <div className="tf-summary-card-glow tf-glow-amber" />
      </div>

      {/* High Priority Card */}
      <div 
        className="tf-summary-card anim-delay-4"
        onClick={() => onFilterClick && onFilterClick('high-priority')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onFilterClick && onFilterClick('high-priority')}
      >
        <div className="tf-summary-card-inner">
          <div className="tf-summary-card-top">
            <span className="tf-summary-label">High Priority</span>
            <div className="tf-summary-icon-box tf-icon-red">
              <Flame size={20} strokeWidth={2.2} />
            </div>
          </div>
          <div className="tf-summary-card-bottom">
            <span className="tf-summary-value">{highPriority}</span>
            <div className="tf-summary-badge tf-badge-red">
              <span>{highPriority > 0 ? 'Urgent focus' : 'None urgent'}</span>
            </div>
          </div>
        </div>
        <div className="tf-summary-card-glow tf-glow-red" />
      </div>
    </div>
  );
}
