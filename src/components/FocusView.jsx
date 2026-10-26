import React, { useState, useEffect, useMemo } from 'react';
import { 
  Flame, 
  Zap, 
  Target, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  AlertCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { getLevelInfo, ACHIEVEMENTS } from '../data/gamification';
import TaskCard from './TaskCard';

export default function FocusView({
  tasks,
  profile,
  userXp,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onAddTask,
  settings,
  onAwardXp
}) {
  const [focusFilter, setFocusFilter] = useState('urgent'); // 'urgent' | 'today' | 'all-pending'
  const [timerMode, setTimerMode] = useState(25); // 25, 15, or 5 minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const levelInfo = getLevelInfo(userXp);
  const todayStr = new Date().toISOString().split('T')[0];

  // Daily goal stats
  const completedToday = tasks.filter(t => t.completed).length; // or filter by updated today
  const dailyGoal = settings?.dailyGoal || 5;
  const goalPercent = Math.min(100, Math.round((completedToday / dailyGoal) * 100));

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Award Focus XP
      if (onAwardXp) {
        onAwardXp(20, 'Focus Session Completed! +20 XP awarded 🎧✨');
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, onAwardXp]);

  const handleSetTimer = (minutes) => {
    setIsTimerRunning(false);
    setTimerMode(minutes);
    setTimeLeft(minutes * 60);
  };

  const handleToggleTimer = () => {
    setIsTimerRunning(prev => !prev);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(timerMode * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalTimerSeconds = timerMode * 60;
  const timerProgress = ((totalTimerSeconds - timeLeft) / totalTimerSeconds) * 100;

  // Filter tasks for focus mode
  const focusTasks = useMemo(() => {
    return tasks.filter(task => {
      if (focusFilter === 'urgent') {
        return !task.completed && (task.priority === 'high' || task.dueDate === todayStr);
      }
      if (focusFilter === 'today') {
        return !task.completed && task.dueDate === todayStr;
      }
      if (focusFilter === 'all-pending') {
        return !task.completed;
      }
      return true;
    });
  }, [tasks, focusFilter, todayStr]);

  const totalPending = tasks.filter(t => !t.completed).length;
  const highPriorityCount = tasks.filter(t => !t.completed && t.priority === 'high').length;
  const todayDueCount = tasks.filter(t => !t.completed && t.dueDate === todayStr).length;

  return (
    <div className="tf-focus-view">
      {/* 1. Daily Momentum Hero Banner */}
      <div className="tf-focus-hero-card">
        <div className="tf-focus-hero-left">
          <div className="tf-focus-streak-pill">
            <Flame size={16} className="tf-streak-icon-animated" />
            <span>{profile?.streak || 1} Day Streak Active</span>
          </div>

          <h2 className="tf-focus-hero-title">
            Keep Your Flow State Going ⚡
          </h2>

          <p className="tf-focus-hero-desc">
            Crush your daily goals, rack up XP, and maintain consistency. Small wins compound into big leaps.
          </p>

          {/* Daily Goal Meter */}
          <div className="tf-focus-goal-meter">
            <div className="tf-focus-goal-label-row">
              <span className="tf-focus-goal-text">
                <Target size={14} />
                Daily Target: <strong>{completedToday}/{dailyGoal} Tasks</strong>
              </span>
              <span className="tf-focus-goal-percent">{goalPercent}%</span>
            </div>
            <div className="tf-focus-goal-track">
              <div 
                className="tf-focus-goal-bar" 
                style={{ width: `${goalPercent}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Level & XP Quick Badge Card */}
        <div className="tf-focus-hero-right">
          <div className="tf-focus-level-card">
            <div className="tf-focus-level-icon">{levelInfo.badge}</div>
            <div className="tf-focus-level-details">
              <span className="tf-focus-level-num">Level {levelInfo.level}</span>
              <span className="tf-focus-level-name">{levelInfo.title}</span>
            </div>
            <div className="tf-focus-xp-pill">
              <Zap size={14} />
              <span>{userXp} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Focus Session Timer */}
      <div className="tf-focus-timer-section">
        <div className="tf-focus-timer-card">
          <div className="tf-focus-timer-header">
            <div className="tf-focus-timer-title-row">
              <Sparkles size={17} className="tf-icon-accent" />
              <h3>Focus Session</h3>
            </div>
            {/* Session Preset Selector */}
            <div className="tf-focus-timer-presets">
              <button 
                type="button"
                className={`tf-timer-preset-btn ${timerMode === 25 ? 'active' : ''}`}
                onClick={() => handleSetTimer(25)}
              >
                25m Work
              </button>
              <button 
                type="button"
                className={`tf-timer-preset-btn ${timerMode === 15 ? 'active' : ''}`}
                onClick={() => handleSetTimer(15)}
              >
                15m Sprint
              </button>
              <button 
                type="button"
                className={`tf-timer-preset-btn ${timerMode === 5 ? 'active' : ''}`}
                onClick={() => handleSetTimer(5)}
              >
                5m Chill
              </button>
            </div>
          </div>

          <div className="tf-focus-timer-body">
            <div className={`tf-timer-display-ring ${isTimerRunning ? 'running' : ''}`}>
              <div className="tf-timer-time-text">{formattedTime}</div>
              <span className="tf-timer-status-text">
                {isTimerRunning ? '🎧 Deep work in progress...' : 'Ready to lock in'}
              </span>
            </div>

            <div className="tf-timer-controls">
              <button 
                type="button" 
                className={`tf-btn-primary tf-btn-timer ${isTimerRunning ? 'tf-btn-timer-pause' : 'tf-btn-gradient'}`}
                onClick={handleToggleTimer}
              >
                {isTimerRunning ? (
                  <>
                    <Pause size={17} />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play size={17} />
                    <span>Start Flow</span>
                  </>
                )}
              </button>
              
              <button 
                type="button" 
                className="tf-btn-secondary tf-btn-timer-reset"
                onClick={handleResetTimer}
                title="Reset session"
                aria-label="Reset timer"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Daily Priority Task List */}
      <div className="tf-focus-tasks-section">
        <div className="tf-focus-tasks-header">
          <div className="tf-focus-tasks-title-group">
            <h3>Daily Priority Queue</h3>
            <span className="tf-focus-count-badge">
              {focusTasks.length} {focusTasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          <div className="tf-focus-filter-chips">
            <button
              type="button"
              className={`tf-focus-chip ${focusFilter === 'urgent' ? 'active' : ''}`}
              onClick={() => setFocusFilter('urgent')}
            >
              Urgent & Today ({highPriorityCount + todayDueCount})
            </button>
            <button
              type="button"
              className={`tf-focus-chip ${focusFilter === 'today' ? 'active' : ''}`}
              onClick={() => setFocusFilter('today')}
            >
              Due Today ({todayDueCount})
            </button>
            <button
              type="button"
              className={`tf-focus-chip ${focusFilter === 'all-pending' ? 'active' : ''}`}
              onClick={() => setFocusFilter('all-pending')}
            >
              All Pending ({totalPending})
            </button>
          </div>
        </div>

        {/* Task Cards */}
        {focusTasks.length > 0 ? (
          <div className="tf-task-grid">
            {focusTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                viewMode="grid"
                onToggleComplete={onToggleComplete}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        ) : (
          <div className="tf-focus-empty-state">
            <div className="tf-focus-empty-emoji">✨</div>
            <h4>You're All Caught Up!</h4>
            <p>
              {focusFilter === 'urgent' 
                ? 'No high priority or overdue tasks right now. Great job!' 
                : 'No pending tasks in this filter view.'}
            </p>
            <button
              type="button"
              className="tf-btn-primary tf-btn-gradient"
              onClick={onAddTask}
            >
              <Plus size={16} />
              <span>Add a Focus Task</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
