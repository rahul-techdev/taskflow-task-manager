import React, { useEffect } from 'react';
import { Zap, Sparkles } from 'lucide-react';

export default function XpCelebration({ celebration, onDone }) {
  useEffect(() => {
    if (!celebration) return;
    const timer = setTimeout(() => {
      onDone();
    }, 2400);
    return () => clearTimeout(timer);
  }, [celebration, onDone]);

  if (!celebration) return null;

  return (
    <div className="tf-xp-celebration-toast" role="status" aria-live="polite">
      <div className="tf-xp-toast-icon">
        <Zap size={20} className="tf-xp-toast-zap" />
      </div>

      <div className="tf-xp-toast-body">
        <div className="tf-xp-toast-top">
          <span className="tf-xp-toast-amount">+{celebration.amount} XP</span>
          <Sparkles size={14} className="tf-xp-toast-sparkle" />
        </div>
        <span className="tf-xp-toast-msg">{celebration.message || 'Task crushed! Keep the streak going 🔥'}</span>
      </div>

      {/* Floating mini confetti sparkles */}
      <div className="tf-confetti-burst" aria-hidden="true">
        <span className="confetti c1">✨</span>
        <span className="confetti c2">⚡</span>
        <span className="confetti c3">🎉</span>
        <span className="confetti c4">💜</span>
      </div>
    </div>
  );
}
