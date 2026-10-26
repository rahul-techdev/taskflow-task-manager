/**
 * Gamification, XP calculations, and profile assets for TaskFlow
 */

export const AVATAR_OPTIONS = [
  { id: 'zap', emoji: '⚡', label: 'Electric Flow', bg: 'linear-gradient(135deg, #7c3aed, #06b6d4)' },
  { id: 'rocket', emoji: '🚀', label: 'Moonshot', bg: 'linear-gradient(135deg, #ec4899, #8b5cf6)' },
  { id: 'pixel', emoji: '👾', label: 'Retro Gamer', bg: 'linear-gradient(135deg, #3b82f6, #10b981)' },
  { id: 'cat', emoji: '🐱', label: 'Chill Cat', bg: 'linear-gradient(135deg, #f59e0b, #ec4899)' },
  { id: 'fox', emoji: '🦊', label: 'Swift Fox', bg: 'linear-gradient(135deg, #f97316, #e11d48)' },
  { id: 'lofi', emoji: '🎧', label: 'Lo-Fi Vibe', bg: 'linear-gradient(135deg, #6366f1, #a855f7)' },
  { id: 'sakura', emoji: '🌸', label: 'Sakura Bloom', bg: 'linear-gradient(135deg, #f43f5e, #fb7185)' },
  { id: 'canvas', emoji: '🎨', label: 'Creative Soul', bg: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' },
];

export const LEVELS = [
  { level: 1, title: 'Novice Starter', minXp: 0, maxXp: 100, badge: '🌱' },
  { level: 2, title: 'Flow Seeker', minXp: 100, maxXp: 250, badge: '⚡' },
  { level: 3, title: 'Hyperfocus Pro', minXp: 250, maxXp: 500, badge: '🔥' },
  { level: 4, title: 'Vibe Architect', minXp: 500, maxXp: 900, badge: '💎' },
  { level: 5, title: 'Productivity Legend', minXp: 900, maxXp: 1500, badge: '👑' },
];

export const ACHIEVEMENTS = [
  {
    id: 'first_win',
    title: 'First Spark',
    icon: '🎯',
    description: 'Complete your first task in TaskFlow',
    xpReward: 30,
    check: (tasks) => tasks.some(t => t.completed)
  },
  {
    id: 'streak_3',
    title: 'On Fire',
    icon: '🔥',
    description: 'Build a 3-day active completion streak',
    xpReward: 50,
    check: (tasks, profile) => (profile.streak || 0) >= 3
  },
  {
    id: 'five_tasks',
    title: 'Task Smasher',
    icon: '⚡',
    description: 'Successfully complete 5 total tasks',
    xpReward: 60,
    check: (tasks) => tasks.filter(t => t.completed).length >= 5
  },
  {
    id: 'ten_tasks',
    title: 'Vibe Master',
    icon: '👑',
    description: 'Conquer 10 tasks across your boards',
    xpReward: 100,
    check: (tasks) => tasks.filter(t => t.completed).length >= 10
  },
  {
    id: 'high_priority',
    title: 'Boss Defeater',
    icon: '💥',
    description: 'Complete 2 high priority urgent tasks',
    xpReward: 50,
    check: (tasks) => tasks.filter(t => t.completed && t.priority === 'high').length >= 2
  },
  {
    id: 'category_explorer',
    title: 'Life in Sync',
    icon: '🧭',
    description: 'Complete tasks across 3 different categories',
    xpReward: 40,
    check: (tasks) => {
      const completedCats = new Set(tasks.filter(t => t.completed).map(t => t.category));
      return completedCats.size >= 3;
    }
  }
];

export const getLevelInfo = (xp = 0) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      const cur = LEVELS[i];
      const range = cur.maxXp - cur.minXp;
      const progressInLevel = Math.min(xp - cur.minXp, range);
      const percent = Math.min(Math.round((progressInLevel / range) * 100), 100);
      const xpNeeded = Math.max(cur.maxXp - xp, 0);

      return {
        level: cur.level,
        title: cur.title,
        badge: cur.badge,
        percent,
        currentXp: xp,
        minXp: cur.minXp,
        maxXp: cur.maxXp,
        xpNeeded
      };
    }
  }
  return {
    level: 1,
    title: LEVELS[0].title,
    badge: LEVELS[0].badge,
    percent: 0,
    currentXp: xp,
    minXp: 0,
    maxXp: 100,
    xpNeeded: 100
  };
};

export const DEFAULT_PROFILE = {
  name: 'Alex Rivera',
  username: '@alexrivera',
  bio: 'Designing the future & staying in high-energy flow ✨',
  avatarId: 'zap',
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  isGuest: true
};
