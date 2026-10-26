import React, { useEffect, useRef } from 'react';
import { 
  Menu, 
  Plus, 
  Search, 
  X, 
  Flame, 
  Zap 
} from 'lucide-react';
import { AVATAR_OPTIONS } from '../data/gamification';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header({ 
  onOpenSidebar, 
  onOpenAddTask, 
  searchQuery, 
  onSearchChange,
  pendingCount,
  activeNav,
  profile,
  userXp,
  theme,
  onThemeChange,
  onNavigateProfile,
  backendConnected = false
}) {
  const searchInputRef = useRef(null);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const currentAvatar = AVATAR_OPTIONS.find(a => a.id === profile?.avatarId) || AVATAR_OPTIONS[0];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLabels = {
    dashboard: 'Flow Dashboard',
    all: 'All Tasks',
    pending: 'Pending Tasks',
    completed: 'Completed Tasks',
    today: 'Due Today',
    'high-priority': 'High Priority Focus',
    focus: 'Daily Focus & Streaks',
    profile: 'Creator Profile & XP',
    settings: 'App Preferences'
  };

  const currentTitle = navLabels[activeNav] || 'TaskFlow';

  return (
    <header className="tf-header">
      {/* Left section: mobile toggle + Page title */}
      <div className="tf-header-left">
        <button 
          type="button" 
          className="tf-mobile-toggle-btn"
          onClick={onOpenSidebar}
          aria-label="Open sidebar navigation"
        >
          <Menu size={19} />
        </button>

        <div className="tf-header-greeting">
          <div className="tf-header-title-row">
            <h1 className="tf-header-title">{currentTitle}</h1>
            <span 
              className={`tf-header-tag ${backendConnected ? 'is-backend-synced' : 'is-offline'}`}
              title={backendConnected ? 'Express Backend API connected & active' : 'Offline / LocalStorage Mode'}
            >
              {backendConnected ? '⚡ API Live' : 'Offline'}
            </span>
          </div>
          <span className="tf-header-subtitle">
            {dateStr} • {pendingCount === 0 ? 'All caught up ✨' : `${pendingCount} task${pendingCount === 1 ? '' : 's'} remaining`}
          </span>
        </div>
      </div>

      {/* Actions container: uses display:contents on mobile grid or flex on desktop */}
      <div className="tf-header-actions">
        {/* Search Field */}
        <div className="tf-search-wrapper">
          <Search size={15} className="tf-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="tf-search-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery ? (
            <button
              type="button"
              className="tf-search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          ) : (
            <kbd className="tf-search-kbd" title="Press / to search">/</kbd>
          )}
        </div>

        {/* Quick controls: theme, streak/xp pill, avatar */}
        <div className="tf-header-controls">
          <ThemeSwitcher 
            currentTheme={theme} 
            onThemeChange={onThemeChange} 
            compact={true} 
          />

          <div 
            className="tf-header-gamify-pill"
            onClick={onNavigateProfile}
            title="Click to view Level & Achievements"
            role="button"
            tabIndex={0}
          >
            <div className="tf-header-streak-badge">
              <Flame size={13} className="tf-streak-icon-animated" />
              <span>{profile?.streak || 1}d</span>
            </div>
            <div className="tf-header-xp-badge">
              <Zap size={13} />
              <span>{userXp} XP</span>
            </div>
          </div>

          <button
            type="button"
            className="tf-header-avatar-btn"
            onClick={onNavigateProfile}
            style={{ background: currentAvatar.bg }}
            title={`Profile: ${profile?.name || 'Alex'}`}
            aria-label="View user profile"
          >
            <span>{currentAvatar.emoji}</span>
          </button>
        </div>

        {/* Add Task CTA */}
        <button 
          type="button" 
          className="tf-btn-primary tf-btn-gradient tf-header-add-btn"
          onClick={onOpenAddTask}
        >
          <Plus size={17} strokeWidth={2.5} />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}
