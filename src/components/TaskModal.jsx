import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Calendar, 
  Tag, 
  AlertCircle, 
  Sparkles, 
  Check, 
  Flame, 
  Clock, 
  CheckCircle2,
  Briefcase,
  Palette,
  Code2,
  User,
  HeartPulse
} from 'lucide-react';

const CATEGORY_OPTIONS = [
  { id: 'Work', label: 'Work', icon: Briefcase },
  { id: 'Design', label: 'Design', icon: Palette },
  { id: 'Development', label: 'Development', icon: Code2 },
  { id: 'Personal', label: 'Personal', icon: User },
  { id: 'Health', label: 'Health', icon: HeartPulse },
];

export default function TaskModal({ 
  isOpen, 
  onClose, 
  onSave, 
  taskToEdit 
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const inputRef = useRef(null);

  // Set default values when modal opens or editing task changes
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      if (taskToEdit) {
        setTitle(taskToEdit.title || '');
        setDescription(taskToEdit.description || '');
        setPriority(taskToEdit.priority || 'medium');
        setCategory(taskToEdit.category || 'Work');
        setDueDate(taskToEdit.dueDate || '');
      } else {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setCategory('Work');
        const todayStr = new Date().toISOString().split('T')[0];
        setDueDate(todayStr);
      }
      setError('');

      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [isOpen, taskToEdit]);

  // Smooth animated closing handler
  const triggerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 180);
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isClosing) {
        triggerClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isClosing]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Please provide a task title to continue.');
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    onSave({
      id: taskToEdit ? taskToEdit.id : `task-${Date.now()}`,
      title: trimmedTitle,
      description: description.trim(),
      priority,
      category,
      dueDate: dueDate || null,
      completed: taskToEdit ? taskToEdit.completed : false,
      createdAt: taskToEdit ? taskToEdit.createdAt : new Date().toISOString()
    });

    triggerClose();
  };

  return (
    <div 
      className={`tf-modal-backdrop ${isClosing ? 'is-closing' : 'is-open'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isClosing) triggerClose();
      }}
    >
      <div 
        className={`tf-modal-container ${isClosing ? 'is-closing' : 'is-open'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="tf-modal-header">
          <div className="tf-modal-title-group">
            <div className="tf-modal-icon-badge">
              {taskToEdit ? <Sparkles size={18} /> : <Check size={18} />}
            </div>
            <div>
              <h2 id="modal-title" className="tf-modal-title">
                {taskToEdit ? 'Edit Task' : 'Create New Task'}
              </h2>
              <p className="tf-modal-subtitle">
                {taskToEdit ? 'Update task details and timeline' : 'Add an actionable item to your board'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="tf-modal-close-btn"
            onClick={triggerClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="tf-modal-body">
            {error && (
              <div className="tf-modal-error-banner">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Task Title Input */}
            <div className="tf-form-group">
              <label htmlFor="task-title-input" className="tf-form-label">
                <span>Task Title</span>
                <span className="tf-required-mark">*</span>
              </label>
              <input
                id="task-title-input"
                ref={inputRef}
                type="text"
                className="tf-form-input"
                placeholder="e.g., Finalize quarterly SaaS metrics review"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>

            {/* Task Description */}
            <div className="tf-form-group">
              <label htmlFor="task-desc-input" className="tf-form-label">
                <span>Description</span>
                <span className="tf-optional-tag">Optional</span>
              </label>
              <textarea
                id="task-desc-input"
                className="tf-form-textarea"
                placeholder="Add milestones, context, links, or instructions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Priority Selector Pills */}
            <div className="tf-form-group">
              <label className="tf-form-label">Priority Level</label>
              <div className="tf-priority-options">
                <button
                  type="button"
                  className={`tf-priority-option-btn ${priority === 'low' ? 'selected-low' : ''}`}
                  onClick={() => setPriority('low')}
                >
                  <span className="tf-p-dot dot-low" />
                  <span className="tf-p-label">Low</span>
                </button>

                <button
                  type="button"
                  className={`tf-priority-option-btn ${priority === 'medium' ? 'selected-medium' : ''}`}
                  onClick={() => setPriority('medium')}
                >
                  <span className="tf-p-dot dot-medium" />
                  <span className="tf-p-label">Medium</span>
                </button>

                <button
                  type="button"
                  className={`tf-priority-option-btn ${priority === 'high' ? 'selected-high' : ''}`}
                  onClick={() => setPriority('high')}
                >
                  <span className="tf-p-dot dot-high" />
                  <span className="tf-p-label">High</span>
                </button>
              </div>
            </div>

            {/* Category & Due Date Row */}
            <div className="tf-form-row">
              <div className="tf-form-group">
                <label htmlFor="task-category-select" className="tf-form-label">
                  Category
                </label>
                <div className="tf-modal-select-wrapper">
                  <select
                    id="task-category-select"
                    className="tf-form-input with-custom-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {CATEGORY_OPTIONS.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="tf-form-group">
                <label htmlFor="task-due-date" className="tf-form-label">
                  Due Date
                </label>
                <div className="tf-input-with-icon">
                  <Calendar size={16} className="tf-input-left-icon" />
                  <input
                    id="task-due-date"
                    type="date"
                    className="tf-form-input with-left-icon"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="tf-modal-footer">
            <button
              type="button"
              className="tf-btn-secondary"
              onClick={triggerClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="tf-btn-primary tf-btn-gradient"
            >
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
