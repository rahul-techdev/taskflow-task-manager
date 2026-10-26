import React from 'react';
import { Plus, RotateCcw, Search, CheckCircle2, Sparkles } from 'lucide-react';

export default function EmptyState({ 
  hasFilters, 
  onResetFilters, 
  onAddTask,
  emptyType = 'default' 
}) {
  return (
    <div className="tf-empty-state">
      {/* Tasteful Animated Vector Illustration */}
      <div className="tf-empty-illustration-box">
        {hasFilters ? (
          <svg
            className="tf-empty-svg tf-anim-float-subtle"
            viewBox="0 0 200 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Background glow circle */}
            <circle cx="100" cy="80" r="60" fill="url(#empty-glow-blue)" />

            {/* Document sheet */}
            <rect x="55" y="30" width="90" height="100" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="70" y="48" width="60" height="6" rx="3" fill="#e2e8f0" />
            <rect x="70" y="62" width="45" height="6" rx="3" fill="#e2e8f0" />
            <rect x="70" y="76" width="52" height="6" rx="3" fill="#e2e8f0" />

            {/* Magnifying glass */}
            <circle cx="120" cy="95" r="24" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
            <circle cx="120" cy="95" r="18" fill="#eef2ff" />
            <line x1="138" y1="113" x2="155" y2="130" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
            <path d="M115 95H125" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
            <path d="M120 90V100" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />

            {/* Floating sparkle dots */}
            <circle cx="45" cy="50" r="3" fill="#818cf8" />
            <circle cx="160" cy="65" r="4" fill="#60a5fa" />
            <circle cx="145" cy="40" r="2.5" fill="#c084fc" />

            <defs>
              <radialGradient id="empty-glow-blue" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 80) rotate(90) scale(60)">
                <stop stopColor="#e0e7ff" stopOpacity="0.8" />
                <stop offset="1" stopColor="#e0e7ff" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        ) : (
          <svg
            className="tf-empty-svg tf-anim-float-subtle"
            viewBox="0 0 200 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Ambient glow */}
            <circle cx="100" cy="80" r="65" fill="url(#empty-glow-purple)" />

            {/* Task list board */}
            <rect x="50" y="25" width="100" height="110" rx="14" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
            
            {/* Top clip */}
            <rect x="80" y="18" width="40" height="14" rx="4" fill="#3b82f6" />
            <circle cx="100" cy="25" r="3" fill="#ffffff" />

            {/* Check row 1 */}
            <circle cx="70" cy="55" r="8" fill="#dcfce7" />
            <path d="M67 55L69 57L73 53" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="84" y="52" width="50" height="6" rx="3" fill="#cbd5e1" />

            {/* Check row 2 */}
            <circle cx="70" cy="78" r="8" fill="#e0e7ff" />
            <path d="M67 78L69 80L73 76" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="84" y="75" width="42" height="6" rx="3" fill="#cbd5e1" />

            {/* Check row 3 (pending with pulse) */}
            <circle cx="70" cy="101" r="8" fill="#fef3c7" />
            <circle cx="70" cy="101" r="3" fill="#d97706" />
            <rect x="84" y="98" width="48" height="6" rx="3" fill="#e2e8f0" />

            {/* Floating star */}
            <path d="M158 45L160 50L165 52L160 54L158 59L156 54L151 52L156 50L158 45Z" fill="#fbbf24" />
            <circle cx="42" cy="85" r="4" fill="#60a5fa" />

            <defs>
              <radialGradient id="empty-glow-purple" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 80) rotate(90) scale(65)">
                <stop stopColor="#f3e8ff" stopOpacity="0.8" />
                <stop offset="1" stopColor="#f3e8ff" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        )}
      </div>

      <h3 className="tf-empty-title">
        {hasFilters ? 'No matching tasks found' : 'Your board is all clear!'}
      </h3>

      <p className="tf-empty-desc">
        {hasFilters
          ? 'No tasks matched your active search query or filter tags. Try resetting filters or adjusting search keywords.'
          : 'Everything is up to date. Ready to organize upcoming projects or daily to-dos? Add a new task to get started.'}
      </p>

      {hasFilters ? (
        <button
          type="button"
          className="tf-btn-secondary"
          onClick={onResetFilters}
        >
          <RotateCcw size={16} />
          <span>Reset Filters</span>
        </button>
      ) : (
        <button
          type="button"
          className="tf-btn-primary tf-btn-gradient"
          onClick={onAddTask}
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>Create First Task</span>
        </button>
      )}
    </div>
  );
}
