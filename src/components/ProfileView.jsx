import React, { useState } from 'react';
import { 
  User, 
  Pencil, 
  Check, 
  X, 
  Flame, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Zap, 
  LogOut,
  Calendar,
  Layers
} from 'lucide-react';
import { AVATAR_OPTIONS, getLevelInfo, ACHIEVEMENTS } from '../data/gamification';

export default function ProfileView({ 
  profile, 
  onUpdateProfile, 
  tasks, 
  userXp,
  onOpenAuth 
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [tempBio, setTempBio] = useState(profile.bio || '');

  const levelInfo = getLevelInfo(userXp);
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const currentAvatar = AVATAR_OPTIONS.find(a => a.id === profile.avatarId) || AVATAR_OPTIONS[0];

  const handleSaveInfo = () => {
    if (tempName.trim()) {
      onUpdateProfile({
        ...profile,
        name: tempName.trim(),
        bio: tempBio.trim()
      });
    }
    setIsEditingName(false);
  };

  const handleSelectAvatar = (avatarId) => {
    onUpdateProfile({
      ...profile,
      avatarId
    });
  };

  return (
    <div className="tf-profile-view">
      {/* Profile Hero Card */}
      <div className="tf-profile-hero-card">
        <div className="tf-profile-hero-left">
          {/* Avatar display */}
          <div 
            className="tf-profile-main-avatar"
            style={{ background: currentAvatar.bg }}
          >
            <span>{currentAvatar.emoji}</span>
            <div className="tf-avatar-level-badge" title={`Level ${levelInfo.level}`}>
              Lv.{levelInfo.level}
            </div>
          </div>

          {/* Name & Bio section */}
          <div className="tf-profile-info-group">
            {isEditingName ? (
              <div className="tf-profile-edit-form">
                <input
                  type="text"
                  className="tf-form-input tf-profile-name-input"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Your display name"
                  maxLength={30}
                  autoFocus
                />
                <input
                  type="text"
                  className="tf-form-input tf-profile-bio-input"
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  placeholder="Add a vibe or bio..."
                  maxLength={70}
                />
                <div className="tf-profile-edit-buttons">
                  <button 
                    type="button" 
                    className="tf-btn-primary tf-btn-sm" 
                    onClick={handleSaveInfo}
                  >
                    <Check size={14} />
                    <span>Save</span>
                  </button>
                  <button 
                    type="button" 
                    className="tf-btn-secondary tf-btn-sm" 
                    onClick={() => {
                      setTempName(profile.name);
                      setTempBio(profile.bio);
                      setIsEditingName(false);
                    }}
                  >
                    <X size={14} />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="tf-profile-name-row">
                  <h2 className="tf-profile-display-name">{profile.name}</h2>
                  <button
                    type="button"
                    className="tf-profile-edit-trigger"
                    onClick={() => setIsEditingName(true)}
                    title="Edit name and bio"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
                <span className="tf-profile-username">{profile.username}</span>
                <p className="tf-profile-bio">{profile.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Profile Hero Right: Streak & Auth badge */}
        <div className="tf-profile-hero-right">
          <div className="tf-streak-card">
            <Flame size={24} className="tf-streak-flame" />
            <div className="tf-streak-info">
              <span className="tf-streak-count">{profile.streak || 1} Days</span>
              <span className="tf-streak-label">Daily Focus Streak</span>
            </div>
          </div>

          <button
            type="button"
            className="tf-btn-secondary tf-btn-sm"
            onClick={onOpenAuth}
          >
            <LogOut size={14} />
            <span>Switch Account</span>
          </button>
        </div>
      </div>

      {/* Level & XP Progression Card */}
      <div className="tf-xp-progression-card">
        <div className="tf-xp-card-header">
          <div className="tf-xp-level-title">
            <span className="tf-xp-level-emoji">{levelInfo.badge}</span>
            <div>
              <h3 className="tf-xp-title">Level {levelInfo.level} • {levelInfo.title}</h3>
              <p className="tf-xp-subtitle">
                {levelInfo.xpNeeded > 0 
                  ? `${levelInfo.xpNeeded} XP needed for Level ${levelInfo.level + 1}`
                  : 'Max level unlocked! You are a productivity legend.'}
              </p>
            </div>
          </div>

          <div className="tf-xp-counter-box">
            <Zap size={18} className="tf-xp-zap" />
            <span className="tf-xp-number">{userXp}</span>
            <span className="tf-xp-unit">XP Total</span>
          </div>
        </div>

        {/* Level progress bar */}
        <div className="tf-xp-progress-bar-bg">
          <div 
            className="tf-xp-progress-bar-fill" 
            style={{ width: `${levelInfo.percent}%` }}
          />
        </div>

        <div className="tf-xp-progress-footer">
          <span>{levelInfo.minXp} XP</span>
          <span>{levelInfo.percent}% Progress</span>
          <span>{levelInfo.maxXp} XP</span>
        </div>
      </div>

      {/* Built-in Avatar Selector */}
      <div className="tf-avatar-selector-section">
        <h3 className="tf-section-title">
          <span>Pick Your Avatar Persona</span>
          <span className="tf-section-subtitle">Choose an expressive icon to represent your vibe</span>
        </h3>

        <div className="tf-avatar-grid">
          {AVATAR_OPTIONS.map(avatar => {
            const isSelected = profile.avatarId === avatar.id;
            return (
              <button
                key={avatar.id}
                type="button"
                className={`tf-avatar-option-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectAvatar(avatar.id)}
              >
                <div 
                  className="tf-avatar-option-circle"
                  style={{ background: avatar.bg }}
                >
                  <span>{avatar.emoji}</span>
                  {isSelected && (
                    <div className="tf-avatar-checked-badge">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <span className="tf-avatar-option-label">{avatar.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div className="tf-achievements-section">
        <div className="tf-section-header-row">
          <div>
            <h3 className="tf-section-title">Achievements & Badges</h3>
            <p className="tf-section-subtitle">Earn XP by completing tasks and hitting focus milestones</p>
          </div>
          <div className="tf-achievements-summary-pill">
            <Trophy size={14} />
            <span>
              {ACHIEVEMENTS.filter(a => a.check(tasks, profile)).length} / {ACHIEVEMENTS.length} Unlocked
            </span>
          </div>
        </div>

        <div className="tf-achievements-grid">
          {ACHIEVEMENTS.map(achievement => {
            const isUnlocked = achievement.check(tasks, profile);
            return (
              <div 
                key={achievement.id}
                className={`tf-achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="tf-achievement-icon-box">
                  <span className="tf-achievement-emoji">{achievement.icon}</span>
                  {!isUnlocked && (
                    <div className="tf-achievement-lock-overlay">
                      <Lock size={12} />
                    </div>
                  )}
                </div>

                <div className="tf-achievement-text">
                  <div className="tf-achievement-top-row">
                    <h4 className="tf-achievement-title">{achievement.title}</h4>
                    <span className="tf-achievement-reward">+{achievement.xpReward} XP</span>
                  </div>
                  <p className="tf-achievement-desc">{achievement.description}</p>
                </div>

                {isUnlocked && (
                  <div className="tf-achievement-status-tag">
                    <CheckCircle2 size={13} />
                    <span>Unlocked</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
