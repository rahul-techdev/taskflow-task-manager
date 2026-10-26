import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import WelcomeBanner from './components/WelcomeBanner';
import SummaryCards from './components/SummaryCards';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import DeleteModal from './components/DeleteModal';
import Toast from './components/Toast';
import ProfileView from './components/ProfileView';
import SettingsView from './components/SettingsView';
import FocusView from './components/FocusView';
import BottomNav from './components/BottomNav';
import AuthModal from './components/AuthModal';
import XpCelebration from './components/XpCelebration';
import { INITIAL_TASKS } from './data/sampleTasks';
import { DEFAULT_PROFILE } from './data/gamification';

const STORAGE_KEY = 'taskflow_tasks_v1';
const VIEW_MODE_KEY = 'taskflow_view_mode';
const THEME_KEY = 'taskflow_theme';
const PROFILE_KEY = 'taskflow_user_profile';
const XP_KEY = 'taskflow_user_xp';
const REWARDED_TASKS_KEY = 'taskflow_rewarded_tasks';
const SETTINGS_KEY = 'taskflow_settings';

export default function App() {
  // Theme state: 'light' | 'dark' | 'midnight-purple'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'light';
  });

  // User Profile state
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_PROFILE;
  });

  // Gamification XP state
  const [userXp, setUserXp] = useState(() => {
    try {
      const saved = localStorage.getItem(XP_KEY);
      if (saved !== null) return Number(saved);
    } catch {
      // Fallback
    }
    return 175; // Initial starting XP
  });

  // Track task IDs that already gave XP to prevent duplicate awards
  const [rewardedTaskIds, setRewardedTaskIds] = useState(() => {
    try {
      const saved = localStorage.getItem(REWARDED_TASKS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return ['task-4', 'task-6']; // Initial sample completed tasks
  });

  // Active micro-celebration state
  const [celebration, setCelebration] = useState(null);

  // Settings preferences
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      celebrations: true,
      soundEffects: true,
      dailyGoal: 5
    };
  });

  // Tasks state
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback on error
    }
    return INITIAL_TASKS;
  });

  // Navigation & UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem(VIEW_MODE_KEY) || 'grid';
  });

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Persist Profile
  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore
    }
  }, [profile]);

  // Persist XP
  useEffect(() => {
    try {
      localStorage.setItem(XP_KEY, String(userXp));
    } catch {
      // Ignore
    }
  }, [userXp]);

  // Persist Rewarded Tasks
  useEffect(() => {
    try {
      localStorage.setItem(REWARDED_TASKS_KEY, JSON.stringify(rewardedTaskIds));
    } catch {
      // Ignore
    }
  }, [rewardedTaskIds]);

  // Persist Settings
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Ignore
    }
  }, [settings]);

  // Persist Tasks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Ignore
    }
  }, [tasks]);

  // Persist View Mode
  useEffect(() => {
    try {
      localStorage.setItem(VIEW_MODE_KEY, viewMode);
    } catch {
      // Ignore
    }
  }, [viewMode]);

  // Daily streak check on app load
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (profile.lastActiveDate !== todayStr) {
      const last = new Date(profile.lastActiveDate || todayStr);
      const now = new Date(todayStr);
      const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
      
      let newStreak = profile.streak || 1;
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }

      setProfile(prev => ({
        ...prev,
        streak: newStreak,
        lastActiveDate: todayStr
      }));
    }
  }, []);

  // Toast timeout
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Navigation selection
  const handleSelectNav = useCallback((navId) => {
    setActiveNav(navId);

    if (navId === 'dashboard') {
      setStatusFilter('all');
      setPriorityFilter('all');
    } else if (navId === 'all') {
      setStatusFilter('all');
      setPriorityFilter('all');
    } else if (navId === 'pending') {
      setStatusFilter('pending');
      setPriorityFilter('all');
    } else if (navId === 'completed') {
      setStatusFilter('completed');
      setPriorityFilter('all');
    } else if (navId === 'high-priority') {
      setPriorityFilter('high');
      setStatusFilter('pending');
    } else if (navId === 'today') {
      setStatusFilter('pending');
      setPriorityFilter('all');
    } else if (navId === 'focus') {
      setStatusFilter('all');
      setPriorityFilter('all');
    }
  }, []);

  // Toggle Task Complete with Anti-Duplicate XP Gamification
  const handleToggleComplete = useCallback((id) => {
    setTasks(prevTasks => {
      const target = prevTasks.find(t => t.id === id);
      if (!target) return prevTasks;

      const isNowCompleted = !target.completed;
      const updated = prevTasks.map(t => 
        t.id === id ? { ...t, completed: isNowCompleted } : t
      );

      // Gamification: Award XP only if marking complete AND not already rewarded for this task
      if (isNowCompleted) {
        const alreadyRewarded = rewardedTaskIds.includes(id);
        if (!alreadyRewarded) {
          const xpEarned = target.priority === 'high' ? 50 : 25;
          setUserXp(prev => prev + xpEarned);
          setRewardedTaskIds(prev => [...prev, id]);

          if (settings.celebrations) {
            setCelebration({
              amount: xpEarned,
              message: target.priority === 'high' ? 'High priority conquered! Massive XP boost 💥' : 'Task completed! Keep the momentum going ⚡'
            });
          }
        }

        setToast({
          message: 'Task marked as completed! 🎉',
          type: 'success',
          undoAction: {
            type: 'TOGGLE_COMPLETE',
            taskId: id,
            previousState: false
          }
        });
      } else {
        setToast({
          message: 'Task marked as pending.',
          type: 'info',
          undoAction: {
            type: 'TOGGLE_COMPLETE',
            taskId: id,
            previousState: true
          }
        });
      }

      return updated;
    });
  }, [rewardedTaskIds, settings.celebrations]);

  // Save new task or update existing
  const handleSaveTask = useCallback((taskData) => {
    setTasks(prevTasks => {
      const existsIndex = prevTasks.findIndex(t => t.id === taskData.id);
      let updated;
      if (existsIndex >= 0) {
        updated = [...prevTasks];
        updated[existsIndex] = taskData;
        setToast({
          message: 'Task updated successfully ✨',
          type: 'success'
        });
      } else {
        updated = [taskData, ...prevTasks];
        setToast({
          message: 'New task created! Ready for action 🚀',
          type: 'success'
        });
      }
      return updated;
    });
    setTaskToEdit(null);
    setIsModalOpen(false);
  }, []);

  // Open task editor modal
  const handleEditTask = useCallback((task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  }, []);

  // Initiate task deletion
  const handleDeletePrompt = useCallback((id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setTaskToDelete(task);
      setIsDeleteModalOpen(true);
    }
  }, [tasks]);

  // Confirm task deletion
  const handleConfirmDelete = useCallback(() => {
    if (!taskToDelete) return;

    const removedTask = taskToDelete;
    setTasks(prevTasks => prevTasks.filter(t => t.id !== removedTask.id));
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);

    setToast({
      message: `Deleted "${removedTask.title.slice(0, 24)}..."`,
      type: 'info',
      undoAction: {
        type: 'RESTORE_TASK',
        task: removedTask
      }
    });
  }, [taskToDelete]);

  // Handle undo action from toast
  const handleUndo = useCallback((action) => {
    if (!action) return;

    if (action.type === 'TOGGLE_COMPLETE') {
      setTasks(prev => prev.map(t => 
        t.id === action.taskId ? { ...t, completed: action.previousState } : t
      ));
    } else if (action.type === 'RESTORE_TASK') {
      setTasks(prev => [action.task, ...prev]);
    }
  }, []);

  // Reset all active filters
  const handleResetFilters = useCallback(() => {
    setStatusFilter('all');
    setActiveCategory('All');
    setPriorityFilter('all');
    setSearchQuery('');
    setActiveNav('dashboard');
  }, []);

  // Summary card click
  const handleSummaryClick = useCallback((filterType) => {
    if (filterType === 'all') {
      setStatusFilter('all');
      setActiveNav('all');
    } else if (filterType === 'completed') {
      setStatusFilter('completed');
      setActiveNav('completed');
    } else if (filterType === 'pending') {
      setStatusFilter('pending');
      setActiveNav('pending');
    } else if (filterType === 'high-priority') {
      setPriorityFilter('high');
      setStatusFilter('pending');
      setActiveNav('high-priority');
    }
  }, []);

  // Reset to default sample tasks
  const handleResetTasks = useCallback(() => {
    setTasks(INITIAL_TASKS);
    setToast({
      message: 'Demo tasks restored to defaults!',
      type: 'info'
    });
  }, []);

  // Clear completed tasks
  const handleClearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(t => !t.completed));
    setToast({
      message: 'Completed tasks cleared from backlog.',
      type: 'info'
    });
  }, []);

  // Profile update handler
  const handleUpdateProfile = useCallback((updatedProfile) => {
    setProfile(updatedProfile);
    setToast({
      message: 'Profile preferences saved! 🌸',
      type: 'success'
    });
  }, []);

  // Demo Login handler
  const handleLogin = useCallback((userData) => {
    setProfile(prev => ({
      ...prev,
      name: userData.name,
      username: userData.username,
      isGuest: userData.isGuest
    }));
    setToast({
      message: `Signed in as ${userData.name} (Demo Mode) ⚡`,
      type: 'success'
    });
  }, []);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    return tasks.filter(task => {
      if (activeNav === 'today') {
        if (task.dueDate !== todayStr) return false;
      } else if (activeNav === 'high-priority') {
        if (task.priority !== 'high') return false;
      } else if (activeNav === 'pending') {
        if (task.completed) return false;
      } else if (activeNav === 'completed') {
        if (!task.completed) return false;
      }

      if (statusFilter === 'pending' && task.completed) return false;
      if (statusFilter === 'completed' && !task.completed) return false;

      if (activeCategory !== 'All' && task.category !== activeCategory) return false;

      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description && task.description.toLowerCase().includes(query);
        const matchesCategory = task.category && task.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'priority') {
        const weights = { high: 3, medium: 2, low: 1 };
        return (weights[b.priority] || 0) - (weights[a.priority] || 0);
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      return 0;
    });
  }, [tasks, activeNav, statusFilter, activeCategory, priorityFilter, searchQuery, sortBy]);

  const hasActiveFilters = Boolean(
    statusFilter !== 'all' || 
    activeCategory !== 'All' || 
    priorityFilter !== 'all' || 
    searchQuery.trim() !== '' || 
    (activeNav !== 'dashboard' && activeNav !== 'all')
  );

  const counts = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter(t => !t.completed).length,
      completed: tasks.filter(t => t.completed).length
    };
  }, [tasks]);

  return (
    <div className="tf-app-container">
      {/* Background ambient orbs */}
      <div className="tf-ambient-orb orb-1" aria-hidden="true" />
      <div className="tf-ambient-orb orb-2" aria-hidden="true" />

      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        tasks={tasks}
        profile={profile}
        userXp={userXp}
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* Main Content Area */}
      <div className="tf-main-wrapper">
        {/* Header */}
        <Header
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenAddTask={() => {
            setTaskToEdit(null);
            setIsModalOpen(true);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          pendingCount={counts.pending}
          activeNav={activeNav}
          profile={profile}
          userXp={userXp}
          theme={theme}
          onThemeChange={setTheme}
          onNavigateProfile={() => handleSelectNav('profile')}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />

        {/* Dashboard / Main Content View */}
        <main className="tf-dashboard">
          {/* PROFILE VIEW */}
          {activeNav === 'profile' && (
            <div className="tf-view-container" key="profile-view">
              <ProfileView
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                tasks={tasks}
                userXp={userXp}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            </div>
          )}

          {/* SETTINGS VIEW */}
          {activeNav === 'settings' && (
            <div className="tf-view-container" key="settings-view">
              <SettingsView
                theme={theme}
                onThemeChange={setTheme}
                soundEffects={settings.soundEffects}
                onToggleSound={(val) => setSettings(s => ({ ...s, soundEffects: val }))}
                celebrations={settings.celebrations}
                onToggleCelebrations={(val) => setSettings(s => ({ ...s, celebrations: val }))}
                dailyGoal={settings.dailyGoal}
                onChangeDailyGoal={(val) => setSettings(s => ({ ...s, dailyGoal: val }))}
                onResetTasks={handleResetTasks}
                onClearCompleted={handleClearCompleted}
                tasks={tasks}
              />
            </div>
          )}

          {/* FOCUS VIEW (Daily Focus, Streaks, Timer, Priority Tasks) */}
          {activeNav === 'focus' && (
            <div className="tf-view-container" key="focus-view">
              <FocusView
                tasks={tasks}
                profile={profile}
                userXp={userXp}
                onToggleComplete={handleToggleComplete}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeletePrompt}
                onAddTask={() => {
                  setTaskToEdit(null);
                  setIsModalOpen(true);
                }}
                settings={settings}
                onAwardXp={(amount, message) => {
                  setUserXp(prev => prev + amount);
                  if (settings.celebrations) {
                    setCelebration({ amount, message });
                  }
                }}
              />
            </div>
          )}

          {/* TASK DASHBOARD & TASK LIST VIEWS */}
          {activeNav !== 'profile' && activeNav !== 'settings' && activeNav !== 'focus' && (
            <>
              {/* Welcome Banner with Gen Z illustrations (Shown on Dashboard) */}
              {activeNav === 'dashboard' && (
                <WelcomeBanner
                  tasks={tasks}
                  profile={profile}
                  userXp={userXp}
                  onAddTask={() => {
                    setTaskToEdit(null);
                    setIsModalOpen(true);
                  }}
                  onViewPending={() => handleSelectNav('pending')}
                />
              )}

              {/* Summary Cards */}
              <SummaryCards
                tasks={tasks}
                onFilterClick={handleSummaryClick}
              />

              {/* Filter Bar & Controls */}
              <FilterBar
                statusFilter={statusFilter}
                onStatusChange={(status) => {
                  setStatusFilter(status);
                  if (status === 'completed') setActiveNav('completed');
                  else if (status === 'pending') setActiveNav('pending');
                  else if (activeNav === 'completed' || activeNav === 'pending') setActiveNav('all');
                }}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                priorityFilter={priorityFilter}
                onPriorityChange={setPriorityFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                counts={counts}
              />

              {/* Task Cards Grid or List */}
              <div className="tf-view-container" key={`${activeNav}-${statusFilter}-${activeCategory}-${sortBy}`}>
                <TaskList
                  tasks={filteredTasks}
                  viewMode={viewMode}
                  hasFilters={hasActiveFilters}
                  onResetFilters={handleResetFilters}
                  onToggleComplete={handleToggleComplete}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeletePrompt}
                  onAddTask={() => {
                    setTaskToEdit(null);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            </>
          )}
        </main>
      </div>

      {/* Task Create / Edit Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTaskToEdit(null);
        }}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete ? taskToDelete.title : ''}
      />

      {/* Demo Auth Modal (Welcome, Login, Sign Up) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Micro XP Celebration Bubble */}
      <XpCelebration
        celebration={celebration}
        onDone={() => setCelebration(null)}
      />

      {/* Toast Notification */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
        onUndo={handleUndo}
      />

      {/* Mobile Bottom Navigation (Instagram-inspired, active on screens <= 600px) */}
      <BottomNav
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onAddTask={() => {
          setTaskToEdit(null);
          setIsModalOpen(true);
        }}
        pendingCount={counts.pending}
        profile={profile}
        userXp={userXp}
      />
    </div>
  );
}
