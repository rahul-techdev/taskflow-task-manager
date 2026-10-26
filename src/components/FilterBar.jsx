import React from 'react';
import { 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  ArrowUpDown,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/sampleTasks';

export default function FilterBar({
  statusFilter,
  onStatusChange,
  activeCategory,
  onCategoryChange,
  priorityFilter,
  onPriorityChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  counts
}) {
  return (
    <div className="tf-filter-section">
      {/* Category Filter Chips Bar */}
      <div className="tf-category-chips-wrapper">
        <div className="tf-category-chips">
          {CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              className={`tf-chip ${activeCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              <span>{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Filter & Action Toolbar */}
      <div className="tf-toolbar">
        {/* Visually Attractive Segmented Status Tabs */}
        <div className="tf-filter-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={statusFilter === 'all'}
            className={`tf-tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => onStatusChange('all')}
          >
            <span>All Tasks</span>
            <span className="tf-tab-count">{counts.total}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={statusFilter === 'pending'}
            className={`tf-tab-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => onStatusChange('pending')}
          >
            <span>Pending</span>
            <span className="tf-tab-count">{counts.pending}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={statusFilter === 'completed'}
            className={`tf-tab-btn ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onStatusChange('completed')}
          >
            <span>Completed</span>
            <span className="tf-tab-count">{counts.completed}</span>
          </button>
        </div>

        {/* Right side controls: Priority, Sorting, View mode */}
        <div className="tf-toolbar-controls">
          {/* Priority Filter */}
          <div className="tf-select-wrapper">
            <SlidersHorizontal size={14} className="tf-select-icon" />
            <select
              className="tf-select-control with-icon"
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value)}
              aria-label="Filter by priority"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          {/* Sort Control */}
          <div className="tf-select-wrapper">
            <ArrowUpDown size={14} className="tf-select-icon" />
            <select
              className="tf-select-control with-icon"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort tasks"
            >
              <option value="newest">Newest First</option>
              <option value="dueDate">Due Date (Soonest)</option>
              <option value="priority">Priority (High to Low)</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="tf-view-toggle">
            <button
              type="button"
              className={`tf-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              title="Grid card view"
              aria-label="Grid card view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              className={`tf-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => onViewModeChange('list')}
              title="Compact list view"
              aria-label="Compact list view"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
