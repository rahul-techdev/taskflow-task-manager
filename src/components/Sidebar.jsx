import React from 'react';
import { 
  LayoutDashboard,
  ListTodo, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Flame, 
  X, 
  Briefcase, 
  Palette, 
  Code2, 
  User, 
  HeartPulse, 
  Folder,
  CheckSquare,
  Settings,
  Sparkles,
  Zap
} from 'lucide-react';
import { AVATAR_OPTIONS, getLevelInfo } from '../data/gamification';
import ThemeSwitcher from './ThemeSwitcher';

const categoryIcons = {
  Work: Briefcase,
  Design: Palette,
  Development: Code2,
  Personal: User,
  Health: HeartPulse,
};

const categoryColors = {
  Work: 'var(--primary-blue)',
  Design: 'var(--accent-pink)',
  Development: 'var(--primary-violet)',
  Personal: 'var(--success-green)',
  Health: 'var(--warning-amber)',
};

export default function Sidebar({
  isOpen,
  onClose,
  activeNav,
  onSelectNav,
  activeCategory,
  onSelectCategory,
  tasks,
  profile,
  userXp,
  theme,
  onThemeChange
}) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = tasks.filter(t => !t.completed && t.dueDate === todayStr).length;
  const highPriorityCount = tasks.filter(t => !t.completed && t.priority === 'high').length;

  const levelInfo = getLevelInfo(userXp);
  const currentAvatar = AVATAR_OPTIONS.find(a => a.id === profile?.avatarId) || AVATAR_OPTIONS[0];

  // Primary navigation: Dashboard, All Tasks, Pending, Completed, Profile, Settings
  const primaryNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, count: totalTasks },
    { id: 'all', label: 'All Tasks', icon: ListTodo, count: totalTasks },
    { id: 'pending', label: 'Pending', icon: Clock, count: pendingTasks },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, count: completedTasks },
    { id: 'profile', label: 'Profile & XP', icon: User, badge: `Lv.${levelInfo.level}` },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Secondary focus filters
  const focusItems = [
    { id: 'focus', label: 'Daily Focus & Streaks', icon: Flame, badge: `${profile?.streak || 1}d` },
    { id: 'today', label: 'Due Today', icon: Calendar, count: todayCount },
    { id: 'high-priority', label: 'High Priority', icon: Flame, count: highPriorityCount },
  ];

  const categories = ['Work', 'Design', 'Development', 'Personal', 'Health'];

  const handleNavClick = (id) => {
    onSelectNav(id);
    if (window.innerWidth < 992) onClose();
  };

  const handleCategoryClick = (cat) => {
    onSelectCategory(cat);
    if (window.innerWidth < 992) onClose();
  };

  return (
    <>
      <div 
        className={`tf-sidebar-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`tf-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div className="tf-sidebar-header">
          <div 
            className="tf-brand" 
            onClick={() => handleNavClick('dashboard')}
            style={{ cursor: 'pointer' }}
          >
            <div className="tf-brand-icon-wrapper">
              <Zap size={20} strokeWidth={2.6} />
            </div>
            <div className="tf-brand-text-group">
              <span className="tf-brand-name">TaskFlow</span>
              <span className="tf-brand-badge">GEN Z</span>
            </div>
          </div>

          <button 
            type="button" 
            className="tf-sidebar-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="tf-sidebar-content">
          {/* Main Navigation Section */}
          <div className="tf-sidebar-group">
            <div className="tf-sidebar-section-title">Navigation</div>
            <ul className="tf-nav-list">
              {primaryNavItems.map(item => {
                const IconComponent = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`tf-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <div className="tf-nav-item-left">
                        <IconComponent size={18} className="tf-nav-icon" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge ? (
                        <span className="tf-nav-item-level-pill">{item.badge}</span>
                      ) : (
                        <span className="tf-nav-item-badge">{item.count}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Focus Section */}
          <div className="tf-sidebar-group">
            <div className="tf-sidebar-section-title">Focus & Urgency</div>
            <ul className="tf-nav-list">
              {focusItems.map(item => {
                const IconComponent = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`tf-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <div className="tf-nav-item-left">
                        <IconComponent size={18} className="tf-nav-icon" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge ? (
                        <span className="tf-nav-item-level-pill" style={{ background: 'var(--fire-gradient)', color: '#fff', fontSize: '0.7rem', padding: '2px 7px' }}>
                          {item.badge}
                        </span>
                      ) : (
                        <span className="tf-nav-item-badge">{item.count}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Categories Section */}
          <div className="tf-sidebar-group">
            <div className="tf-sidebar-section-title">Categories</div>
            <ul className="tf-nav-list">
              <li>
                <button
                  type="button"
                  className={`tf-nav-item ${activeCategory === 'All' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('All')}
                >
                  <div className="tf-nav-item-left">
                    <Folder size={18} className="tf-nav-icon" />
                    <span>All Categories</span>
                  </div>
                  <span className="tf-nav-item-badge">{totalTasks}</span>
                </button>
              </li>
              {categories.map(cat => {
                const CatIcon = categoryIcons[cat] || Folder;
                const catColor = categoryColors[cat] || 'var(--text-muted)';
                const count = tasks.filter(t => t.category === cat).length;
                const isActive = activeCategory === cat;

                return (
                  <li key={cat}>
                    <button
                      type="button"
                      className={`tf-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleCategoryClick(cat)}
                    >
                      <div className="tf-nav-item-left">
                        <span 
                          className="tf-category-dot" 
                          style={{ backgroundColor: catColor, boxShadow: `0 0 6px ${catColor}` }} 
                        />
                        <CatIcon size={16} className="tf-nav-icon" />
                        <span>{cat}</span>
                      </div>
                      <span className="tf-nav-item-badge">{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Gamified XP Progression Widget */}
          <div 
            className="tf-sidebar-progress-card"
            onClick={() => handleNavClick('profile')}
            style={{ cursor: 'pointer' }}
            title="Click to view full Profile & Achievements"
          >
            <div className="tf-progress-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{levelInfo.badge}</span>
                <span className="tf-progress-title">Lv.{levelInfo.level} {levelInfo.title}</span>
              </div>
              <span className="tf-progress-percent">{userXp} XP</span>
            </div>
            <div className="tf-progress-bar-bg">
              <div 
                className="tf-progress-bar-fill"
                style={{ width: `${levelInfo.percent}%` }}
              />
            </div>
            <div className="tf-progress-footer-row">
              <span className="tf-progress-footer">
                {levelInfo.percent}% to Lv.{levelInfo.level + 1}
              </span>
              <span className="tf-progress-streak-badge">
                🔥 {profile?.streak || 1}d
              </span>
            </div>
          </div>
        </div>

        {/* User Workspace Profile Footer */}
        <div className="tf-sidebar-footer">
          <div 
            className="tf-user-profile-preview"
            onClick={() => handleNavClick('profile')}
            style={{ cursor: 'pointer' }}
          >
            <div 
              className="tf-user-avatar"
              style={{ background: currentAvatar.bg }}
            >
              <span>{currentAvatar.emoji}</span>
              <span className="tf-user-online-dot" />
            </div>
            <div className="tf-user-info">
              <span className="tf-user-name">{profile?.name || 'Alex Rivera'}</span>
              <span className="tf-user-role">{profile?.username || '@alexrivera'}</span>
            </div>
          </div>

          {/* Compact theme quick toggle in sidebar */}
          <ThemeSwitcher 
            currentTheme={theme} 
            onThemeChange={onThemeChange} 
            compact={true} 
          />
        </div>
      </aside>
    </>
  );
}
