import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Plus, 
  Flame, 
  User 
} from 'lucide-react';
import { AVATAR_OPTIONS } from '../data/gamification';

/**
 * Modern Gen Z mobile bottom navigation bar inspired by Instagram.
 * Visible on screens <= 600px.
 * Features 5 destinations:
 * 1. Home (Dashboard)
 * 2. Tasks (All tasks, pending/completed filters)
 * 3. Add (Prominent elevated central action, triggers task modal)
 * 4. Focus (Daily focus, streaks & productivity progress)
 * 5. Profile (User profile, achievements & XP)
 */
export default function BottomNav({
  activeNav,
  onSelectNav,
  onAddTask,
  pendingCount = 0,
  profile,
  userXp
}) {
  const currentAvatar = AVATAR_OPTIONS.find(a => a.id === profile?.avatarId) || AVATAR_OPTIONS[0];

  const isHomeActive = activeNav === 'dashboard';
  const isTasksActive = activeNav === 'all' || activeNav === 'pending' || activeNav === 'completed';
  const isFocusActive = activeNav === 'focus' || activeNav === 'today' || activeNav === 'high-priority';
  const isProfileActive = activeNav === 'profile';

  return (
    <nav className="tf-bottom-nav" aria-label="Mobile navigation">
      {/* 1. Home (Dashboard) */}
      <button
        type="button"
        className={`tf-bottom-nav-item ${isHomeActive ? 'active' : ''}`}
        onClick={() => onSelectNav('dashboard')}
        aria-label="Home Dashboard"
        aria-current={isHomeActive ? 'page' : undefined}
      >
        <div className="tf-bottom-nav-icon-wrap">
          <LayoutDashboard size={21} strokeWidth={isHomeActive ? 2.5 : 2} />
          {isHomeActive && <span className="tf-bottom-nav-active-dot" aria-hidden="true" />}
        </div>
        <span className="tf-bottom-nav-label">Home</span>
      </button>

      {/* 2. Tasks (All Tasks + Filters) */}
      <button
        type="button"
        className={`tf-bottom-nav-item ${isTasksActive ? 'active' : ''}`}
        onClick={() => onSelectNav('all')}
        aria-label={`Tasks${pendingCount > 0 ? `, ${pendingCount} pending` : ''}`}
        aria-current={isTasksActive ? 'page' : undefined}
      >
        <div className="tf-bottom-nav-icon-wrap">
          <CheckSquare size={21} strokeWidth={isTasksActive ? 2.5 : 2} />
          {pendingCount > 0 && (
            <span className="tf-bottom-nav-badge" aria-label={`${pendingCount} pending tasks`}>
              {pendingCount > 99 ? '99+' : pendingCount}
            </span>
          )}
          {isTasksActive && <span className="tf-bottom-nav-active-dot" aria-hidden="true" />}
        </div>
        <span className="tf-bottom-nav-label">Tasks</span>
      </button>

      {/* 3. Central Add Action (Elevated Floating Action Button) */}
      <div className="tf-bottom-nav-center">
        <button
          type="button"
          className="tf-bottom-nav-add-btn"
          onClick={onAddTask}
          aria-label="Create new task"
          title="Add new task"
        >
          <div className="tf-bottom-nav-add-inner">
            <Plus size={26} strokeWidth={2.8} />
          </div>
        </button>
      </div>

      {/* 4. Focus (Daily Focus, Streaks & Productivity) */}
      <button
        type="button"
        className={`tf-bottom-nav-item ${isFocusActive ? 'active' : ''}`}
        onClick={() => onSelectNav('focus')}
        aria-label="Daily focus, streaks and productivity progress"
        aria-current={isFocusActive ? 'page' : undefined}
      >
        <div className="tf-bottom-nav-icon-wrap">
          <Flame 
            size={21} 
            strokeWidth={isFocusActive ? 2.5 : 2} 
            className={profile?.streak > 1 ? 'tf-streak-flame-icon' : ''} 
          />
          {profile?.streak > 0 && (
            <span className="tf-bottom-nav-streak-pill" aria-label={`${profile.streak} day streak`}>
              {profile.streak}d
            </span>
          )}
          {isFocusActive && <span className="tf-bottom-nav-active-dot" aria-hidden="true" />}
        </div>
        <span className="tf-bottom-nav-label">Focus</span>
      </button>

      {/* 5. Profile & XP */}
      <button
        type="button"
        className={`tf-bottom-nav-item ${isProfileActive ? 'active' : ''}`}
        onClick={() => onSelectNav('profile')}
        aria-label="User profile, achievements and XP"
        aria-current={isProfileActive ? 'page' : undefined}
      >
        <div className="tf-bottom-nav-icon-wrap">
          <div 
            className={`tf-bottom-nav-avatar ${isProfileActive ? 'active' : ''}`}
            style={{ background: currentAvatar.bg }}
          >
            <span className="tf-bottom-nav-avatar-emoji">{currentAvatar.emoji}</span>
          </div>
          {isProfileActive && <span className="tf-bottom-nav-active-dot" aria-hidden="true" />}
        </div>
        <span className="tf-bottom-nav-label">Profile</span>
      </button>
    </nav>
  );
}
