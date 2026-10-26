import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

export default function ThemeSwitcher({ currentTheme, onThemeChange, compact = false }) {
  const themes = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'midnight-purple', label: 'Midnight', icon: Sparkles },
  ];

  if (compact) {
    return (
      <div className="tf-theme-switcher-compact">
        {themes.map(t => {
          const IconComponent = t.icon;
          const isActive = currentTheme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              className={`tf-theme-btn-compact ${isActive ? 'active' : ''}`}
              onClick={() => onThemeChange(t.id)}
              title={`Switch to ${t.label} theme`}
              aria-label={`Switch to ${t.label} theme`}
            >
              <IconComponent size={15} />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="tf-theme-switcher-full">
      {themes.map(t => {
        const IconComponent = t.icon;
        const isActive = currentTheme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            className={`tf-theme-btn-card ${isActive ? 'active' : ''} theme-${t.id}`}
            onClick={() => onThemeChange(t.id)}
          >
            <div className="tf-theme-card-icon">
              <IconComponent size={18} />
            </div>
            <span className="tf-theme-card-label">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
