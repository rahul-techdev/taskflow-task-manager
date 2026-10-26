/**
 * Initial sample tasks for TaskFlow
 */

// Helper to get formatted date string (YYYY-MM-DD)
const getRelativeDate = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
};

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Finalize quarterly product roadmap presentation',
    description: 'Review key milestones with the product engineering team and compile slides for the executive leadership sync.',
    priority: 'high',
    category: 'Work',
    dueDate: getRelativeDate(0), // Today
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Design updated checkout flow wireframes',
    description: 'Create high-fidelity mobile and desktop responsive checkout mockups in Figma with single-click payment option.',
    priority: 'high',
    category: 'Design',
    dueDate: getRelativeDate(1), // Tomorrow
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Schedule quarterly dental checkup',
    description: 'Call Dr. Martinez dental clinic to confirm routine cleaning and examination appointment for next Friday.',
    priority: 'low',
    category: 'Personal',
    dueDate: getRelativeDate(3),
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'task-4',
    title: 'Conduct weekly frontend team code review',
    description: 'Audit pull requests for performance optimizations, component modularity, and accessibility standards.',
    priority: 'medium',
    category: 'Work',
    dueDate: getRelativeDate(0), // Today
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'task-5',
    title: 'Order new ergonomic desk chair',
    description: 'Compare warranty, lumbar support specifications, and delivery timelines between top 3 choices.',
    priority: 'medium',
    category: 'Personal',
    dueDate: getRelativeDate(4),
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
  },
  {
    id: 'task-6',
    title: 'Update API documentation for v2.4 release',
    description: 'Document breaking changes, new query parameters, and add interactive cURL code examples.',
    priority: 'medium',
    category: 'Development',
    dueDate: getRelativeDate(2),
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
  {
    id: 'task-7',
    title: 'Meal prep healthy lunches for the week',
    description: 'Prepare Mediterranean quinoa bowls, roasted seasonal vegetables, and marinated grilled chicken portions.',
    priority: 'low',
    category: 'Health',
    dueDate: getRelativeDate(1),
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  }
];

export const CATEGORIES = [
  'All',
  'Work',
  'Design',
  'Development',
  'Personal',
  'Health'
];

export const PRIORITIES = [
  { value: 'high', label: 'High Priority', color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
  { value: 'medium', label: 'Medium Priority', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
  { value: 'low', label: 'Low Priority', color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' }
];
