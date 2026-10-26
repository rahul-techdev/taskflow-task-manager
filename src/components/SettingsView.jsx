import React from 'react';
import { 
  Palette, 
  Sparkles, 
  Bell, 
  RotateCcw, 
  Download, 
  Trash2, 
  ShieldCheck, 
  Check, 
  Sliders
} from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

export default function SettingsView({
  theme,
  onThemeChange,
  soundEffects,
  onToggleSound,
  celebrations,
  onToggleCelebrations,
  dailyGoal,
  onChangeDailyGoal,
  onResetTasks,
  onClearCompleted,
  tasks
}) {
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `taskflow_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="tf-settings-view">
      {/* Theme Section */}
      <div className="tf-settings-card">
        <div className="tf-settings-card-header">
          <div className="tf-settings-icon-box">
            <Palette size={20} />
          </div>
          <div>
            <h3 className="tf-settings-card-title">Color Theme</h3>
            <p className="tf-settings-card-desc">Choose the aesthetic for your workspace</p>
          </div>
        </div>

        <div className="tf-settings-card-body">
          <ThemeSwitcher 
            currentTheme={theme} 
            onThemeChange={onThemeChange} 
            compact={false} 
          />
        </div>
      </div>

      {/* Gamification & Vibe Settings */}
      <div className="tf-settings-card">
        <div className="tf-settings-card-header">
          <div className="tf-settings-icon-box">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="tf-settings-card-title">Gamification & Micro-Interactions</h3>
            <p className="tf-settings-card-desc">Personalize XP toasts and celebrations</p>
          </div>
        </div>

        <div className="tf-settings-card-body tf-settings-toggles">
          <div className="tf-settings-toggle-row">
            <div>
              <span className="tf-toggle-label">XP Celebration Toasts</span>
              <p className="tf-toggle-desc">Show floating +25 XP rewards when completing tasks</p>
            </div>
            <label className="tf-switch">
              <input 
                type="checkbox" 
                checked={celebrations} 
                onChange={(e) => onToggleCelebrations(e.target.checked)} 
              />
              <span className="tf-switch-slider" />
            </label>
          </div>

          <div className="tf-settings-toggle-row">
            <div>
              <span className="tf-toggle-label">Daily Focus Target</span>
              <p className="tf-toggle-desc">Set your ideal number of daily tasks to conquer</p>
            </div>
            <div className="tf-goal-slider-group">
              <input
                type="range"
                min="1"
                max="10"
                value={dailyGoal}
                onChange={(e) => onChangeDailyGoal(Number(e.target.value))}
                className="tf-range-slider"
              />
              <span className="tf-goal-badge">{dailyGoal} tasks / day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data & Backup Settings */}
      <div className="tf-settings-card">
        <div className="tf-settings-card-header">
          <div className="tf-settings-icon-box">
            <Sliders size={20} />
          </div>
          <div>
            <h3 className="tf-settings-card-title">Task Data & Backup</h3>
            <p className="tf-settings-card-desc">Manage your local board storage and demo data</p>
          </div>
        </div>

        <div className="tf-settings-card-body tf-settings-actions-list">
          <div className="tf-settings-action-row">
            <div>
              <span className="tf-action-row-title">Export Tasks JSON</span>
              <p className="tf-action-row-desc">Download a backup file of all your current tasks</p>
            </div>
            <button
              type="button"
              className="tf-btn-secondary"
              onClick={handleExportJSON}
            >
              <Download size={15} />
              <span>Export</span>
            </button>
          </div>

          <div className="tf-settings-action-row">
            <div>
              <span className="tf-action-row-title">Clear Completed Tasks</span>
              <p className="tf-action-row-desc">Remove finished tasks to tidy up your backlog</p>
            </div>
            <button
              type="button"
              className="tf-btn-secondary"
              onClick={onClearCompleted}
            >
              <Trash2 size={15} />
              <span>Clear Done</span>
            </button>
          </div>

          <div className="tf-settings-action-row danger-zone">
            <div>
              <span className="tf-action-row-title">Reset to Demo Tasks</span>
              <p className="tf-action-row-desc">Restore the default sample task list and categories</p>
            </div>
            <button
              type="button"
              className="tf-btn-secondary"
              style={{ color: 'var(--danger-red)', borderColor: 'var(--danger-red-border)' }}
              onClick={onResetTasks}
            >
              <RotateCcw size={15} />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
