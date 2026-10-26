import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

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
    dueDate: getRelativeDate(0),
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Design updated checkout flow wireframes',
    description: 'Create high-fidelity mobile and desktop responsive checkout mockups in Figma with single-click payment option.',
    priority: 'high',
    category: 'Design',
    dueDate: getRelativeDate(1),
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
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
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'task-4',
    title: 'Conduct weekly frontend team code review',
    description: 'Audit pull requests for performance optimizations, component modularity, and accessibility standards.',
    priority: 'medium',
    category: 'Work',
    dueDate: getRelativeDate(0),
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
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
    updatedAt: new Date(Date.now() - 3600000 * 30).toISOString(),
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
    updatedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
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
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  }
];

export const DEFAULT_PROFILE = {
  name: 'Alex Rivera',
  username: '@alexrivera',
  email: 'alex@example.com',
  bio: 'Product Designer & Frontend Tinkerer • Building digital toys and aesthetic productivity systems ⚡',
  avatarId: 'zap',
  streak: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  isGuest: true,
  joinedDate: 'October 2024'
};

export const DEFAULT_SETTINGS = {
  celebrations: true,
  soundEffects: true,
  dailyGoal: 5
};

const DEFAULT_STATE = {
  tasks: INITIAL_TASKS,
  profile: DEFAULT_PROFILE,
  userXp: 175,
  rewardedTaskIds: ['task-4', 'task-6'],
  settings: DEFAULT_SETTINGS,
  users: [
    {
      id: 'user-demo-1',
      name: 'Alex Rivera',
      email: 'alex@example.com',
      username: '@alexrivera',
      passwordHash: hashPassword('password123'),
      createdAt: new Date().toISOString()
    }
  ],
  sessions: {}
};

// Password hashing utilities using Node crypto
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, originalHash] = storedHash.split(':');
  const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(originalHash), Buffer.from(checkHash));
}

// Ensure database directory and file exist
function initDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    saveDb(DEFAULT_STATE);
  } else {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      // Ensure expected root keys exist
      let updated = false;
      if (!Array.isArray(data.tasks)) { data.tasks = INITIAL_TASKS; updated = true; }
      if (!data.profile) { data.profile = DEFAULT_PROFILE; updated = true; }
      if (typeof data.userXp !== 'number') { data.userXp = 175; updated = true; }
      if (!Array.isArray(data.rewardedTaskIds)) { data.rewardedTaskIds = ['task-4', 'task-6']; updated = true; }
      if (!data.settings) { data.settings = DEFAULT_SETTINGS; updated = true; }
      if (!Array.isArray(data.users)) { data.users = DEFAULT_STATE.users; updated = true; }
      if (!data.sessions) { data.sessions = {}; updated = true; }

      if (updated) {
        saveDb(data);
      }
    } catch {
      saveDb(DEFAULT_STATE);
    }
  }
}

// Read database
function getDb() {
  initDb();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return DEFAULT_STATE;
  }
}

// Atomic save database to prevent partial writes
function saveDb(data) {
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

// Database Operations Object
export const db = {
  // Tasks
  getTasks({ category, status, priority, search, sortBy } = {}) {
    const state = getDb();
    let result = [...state.tasks];

    if (category && category !== 'All') {
      result = result.filter(t => t.category === category);
    }

    if (status === 'completed') {
      result = result.filter(t => t.completed);
    } else if (status === 'pending') {
      result = result.filter(t => !t.completed);
    }

    if (priority && priority !== 'all') {
      result = result.filter(t => t.priority === priority);
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(t =>
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.description && t.description.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'priority') {
      const order = { high: 0, medium: 1, low: 2 };
      result.sort((a, b) => (order[a.priority] ?? 3) - (order[b.priority] ?? 3));
    } else if (sortBy === 'due-date') {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // newest default
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  },

  getTaskById(id) {
    const state = getDb();
    return state.tasks.find(t => t.id === id) || null;
  },

  createTask(taskData) {
    const state = getDb();
    const newTask = {
      id: taskData.id || `task-${Date.now()}`,
      title: taskData.title ? taskData.title.trim() : 'Untitled Task',
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      category: taskData.category || 'Work',
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      completed: Boolean(taskData.completed),
      createdAt: taskData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    state.tasks = [newTask, ...state.tasks];
    saveDb(state);
    return newTask;
  },

  updateTask(id, updateData) {
    const state = getDb();
    const index = state.tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    const existing = state.tasks[index];
    const updated = {
      ...existing,
      ...updateData,
      id: existing.id, // Immutable ID
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString()
    };

    state.tasks[index] = updated;
    saveDb(state);
    return updated;
  },

  deleteTask(id) {
    const state = getDb();
    const target = state.tasks.find(t => t.id === id);
    if (!target) return null;

    state.tasks = state.tasks.filter(t => t.id !== id);
    state.rewardedTaskIds = (state.rewardedTaskIds || []).filter(item => item !== id);
    saveDb(state);
    return target;
  },

  clearCompletedTasks() {
    const state = getDb();
    const beforeCount = state.tasks.length;
    state.tasks = state.tasks.filter(t => !t.completed);
    saveDb(state);
    return beforeCount - state.tasks.length;
  },

  resetTasks() {
    const state = getDb();
    state.tasks = INITIAL_TASKS;
    state.rewardedTaskIds = ['task-4', 'task-6'];
    saveDb(state);
    return state.tasks;
  },

  // Profile & Gamification
  getProfile() {
    const state = getDb();
    return {
      profile: state.profile,
      userXp: state.userXp,
      rewardedTaskIds: state.rewardedTaskIds || []
    };
  },

  updateProfile(profileData) {
    const state = getDb();
    state.profile = {
      ...state.profile,
      ...profileData
    };
    saveDb(state);
    return state.profile;
  },

  addXp(amount, taskId = null) {
    const state = getDb();
    const num = Number(amount) || 0;
    state.userXp = (state.userXp || 0) + num;

    if (taskId && !state.rewardedTaskIds.includes(taskId)) {
      state.rewardedTaskIds.push(taskId);
    }

    saveDb(state);
    return {
      userXp: state.userXp,
      rewardedTaskIds: state.rewardedTaskIds
    };
  },

  // Settings
  getSettings() {
    const state = getDb();
    return state.settings;
  },

  updateSettings(newSettings) {
    const state = getDb();
    state.settings = {
      ...state.settings,
      ...newSettings
    };
    saveDb(state);
    return state.settings;
  },

  // Analytics & Stats
  getStats() {
    const state = getDb();
    const tasks = state.tasks;
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter(t => t.priority === 'high' && !t.completed).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const categoryCounts = {};
    for (const task of tasks) {
      categoryCounts[task.category] = (categoryCounts[task.category] || 0) + 1;
    }

    return {
      total,
      completed,
      pending,
      highPriority,
      completionRate,
      categoryCounts,
      userXp: state.userXp,
      streak: state.profile?.streak || 0
    };
  },

  // Auth & Users
  registerUser({ name, email, password }) {
    const state = getDb();
    const normalizedEmail = email.toLowerCase().trim();

    if (state.users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      username: `@${name.trim().toLowerCase().replace(/\s+/g, '')}`,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString()
    };

    state.users.push(newUser);

    // Create session token
    const token = crypto.randomBytes(32).toString('hex');
    state.sessions[token] = {
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: new Date().toISOString()
    };

    saveDb(state);

    return {
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username
      }
    };
  },

  loginUser({ email, password }) {
    const state = getDb();
    const normalizedEmail = email.toLowerCase().trim();
    const user = state.users.find(u => u.email.toLowerCase() === normalizedEmail);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      throw new Error('Invalid email or password');
    }

    const token = crypto.randomBytes(32).toString('hex');
    state.sessions[token] = {
      userId: user.id,
      email: user.email,
      name: user.name,
      createdAt: new Date().toISOString()
    };

    saveDb(state);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username
      }
    };
  },

  getUserByToken(token) {
    if (!token) return null;
    const state = getDb();
    const session = state.sessions[token];
    if (!session) return null;

    const user = state.users.find(u => u.id === session.userId);
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username
    };
  }
};
