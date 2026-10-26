import React from 'react';
import { Sparkles, Plus, ArrowRight, Flame, Zap } from 'lucide-react';
import { getLevelInfo } from '../data/gamification';

export default function WelcomeBanner({ 
  tasks, 
  profile,
  userXp,
  onAddTask, 
  onViewPending 
}) {
  const now = new Date();
  const hour = now.getHours();
  
  let timeGreeting = 'Good morning';
  if (hour >= 12 && hour < 17) {
    timeGreeting = 'Good afternoon';
  } else if (hour >= 17) {
    timeGreeting = 'Good evening';
  }

  const firstName = profile?.name ? profile.name.split(' ')[0] : 'Creator';
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const todayStr = now.toISOString().split('T')[0];
  const dueToday = tasks.filter(t => !t.completed && t.dueDate === todayStr).length;
  const levelInfo = getLevelInfo(userXp);

  return (
    <div className="tf-welcome-banner">
      <div className="tf-welcome-content">
        <div className="tf-welcome-pill-row">
          <div className="tf-welcome-pill">
            <Sparkles size={13} className="tf-welcome-pill-icon" />
            <span>Gen Z Flow State</span>
          </div>

          <div className="tf-welcome-streak-pill">
            <Flame size={13} className="tf-streak-icon-animated" />
            <span>{profile?.streak || 1} Day Streak</span>
          </div>
        </div>

        <h2 className="tf-welcome-title">
          {timeGreeting}, {firstName}! Ready to conquer your goals? ⚡
        </h2>

        <p className="tf-welcome-desc">
          {dueToday > 0 
            ? `You've got ${dueToday} high-priority task${dueToday === 1 ? '' : 's'} scheduled for today. Complete them to earn +${dueToday * 25} XP!`
            : pending > 0
              ? `You're currently in Level ${levelInfo.level} (${levelInfo.title}). Crush your ${pending} pending task${pending === 1 ? '' : 's'} to level up!`
              : 'All caught up! Outstanding flow today. Feel free to relax or plan ahead.'}
        </p>

        <div className="tf-welcome-actions">
          <button 
            type="button" 
            className="tf-welcome-btn-primary tf-btn-gradient"
            onClick={onAddTask}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create New Task</span>
          </button>

          {pending > 0 && (
            <button 
              type="button" 
              className="tf-welcome-btn-secondary"
              onClick={onViewPending}
            >
              <span>Review Pending ({pending})</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Decorative Vector Graphic with Gen Z Emojis and Glow */}
      <div className="tf-welcome-illustration-wrapper" aria-hidden="true">
        <svg
          className="tf-welcome-illustration"
          viewBox="0 0 280 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ambient Glows */}
          <circle cx="140" cy="90" r="75" fill="url(#orb-glow-genz)" opacity="0.6" />
          <circle cx="210" cy="50" r="50" fill="url(#violet-glow-genz)" opacity="0.5" />

          {/* Main Glass Card */}
          <rect
            x="48"
            y="32"
            width="174"
            height="115"
            rx="18"
            fill="var(--bg-card)"
            stroke="var(--border-light)"
            strokeWidth="1.5"
            className="tf-anim-float-card"
          />

          {/* Card Header row */}
          <rect x="68" y="52" width="80" height="9" rx="4.5" fill="var(--primary-violet)" opacity="0.4" />
          <rect x="175" y="52" width="28" height="9" rx="4.5" fill="var(--primary-blue)" opacity="0.7" />

          {/* Checklist Item 1 */}
          <rect x="68" y="76" width="16" height="16" rx="5" fill="#10b981" />
          <path d="M72.5 84L75 86.5L79.5 81.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="92" y="81" width="80" height="6" rx="3" fill="var(--text-muted)" opacity="0.4" />

          {/* Checklist Item 2 */}
          <rect x="68" y="103" width="16" height="16" rx="5" fill="url(#zap-gradient)" />
          <path d="M76 107L73 112H77L75 116L79 111H75L76 107Z" fill="#ffffff" />
          <rect x="92" y="108" width="105" height="6" rx="3" fill="var(--text-main)" opacity="0.8" />

          {/* Floating Pill: Level & XP */}
          <g className="tf-anim-float-badge-1">
            <rect x="175" y="16" width="94" height="34" rx="12" fill="var(--bg-card)" stroke="var(--primary-violet)" strokeWidth="1.5" />
            <circle cx="192" cy="33" r="8" fill="url(#zap-gradient)" />
            <text x="189" y="37" fill="#ffffff" fontSize="10" fontWeight="900" fontFamily="sans-serif">⚡</text>
            <text x="206" y="37" fill="var(--primary-violet)" fontSize="11" fontWeight="800" fontFamily="sans-serif">
              +{levelInfo.percent}% XP
            </text>
          </g>

          {/* Floating Pill: Streak Emoji */}
          <g className="tf-anim-float-badge-2">
            <rect x="20" y="92" width="44" height="44" rx="14" fill="url(#fire-gradient)" />
            <text x="31" y="120" fontSize="20" fontFamily="sans-serif">🔥</text>
          </g>

          <defs>
            <radialGradient id="orb-glow-genz" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(140 90) rotate(90) scale(75)">
              <stop stopColor="var(--primary-violet)" stopOpacity="0.35" />
              <stop offset="1" stopColor="var(--primary-violet)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="violet-glow-genz" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(210 50) rotate(90) scale(50)">
              <stop stopColor="var(--accent-pink)" stopOpacity="0.3" />
              <stop offset="1" stopColor="var(--accent-pink)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="zap-gradient" x1="68" y1="103" x2="84" y2="119" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7c3aed" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="fire-gradient" x1="20" y1="92" x2="64" y2="136" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f97316" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
