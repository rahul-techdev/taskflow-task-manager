import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  ShieldAlert
} from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLogin, 
  initialMode = 'welcome' 
}) {
  const [mode, setMode] = useState(initialMode); // 'welcome' | 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === 'signup' && !name.trim()) {
      newErrors.name = 'Please tell us your name!';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Frontend demo login without storing password in localStorage
    const displayName = mode === 'signup' ? name.trim() : (email.split('@')[0] || 'Gen Z Creator');
    onLogin({
      name: displayName,
      username: `@${displayName.toLowerCase().replace(/\s+/g, '')}`,
      isGuest: false
    });
    onClose();
  };

  const handleGuestLogin = () => {
    onLogin({
      name: 'Alex Rivera',
      username: '@alexrivera',
      isGuest: true
    });
    onClose();
  };

  return (
    <div 
      className="tf-modal-backdrop is-open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="tf-modal-container tf-auth-modal is-open"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          className="tf-auth-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Demo Disclaimer Banner */}
        <div className="tf-auth-demo-badge">
          <ShieldAlert size={14} />
          <span>Frontend Demo • No real credentials stored</span>
        </div>

        {/* Welcome View */}
        {mode === 'welcome' && (
          <div className="tf-auth-view">
            <div className="tf-auth-hero-graphic">
              <div className="tf-auth-floating-icon icon-1">⚡</div>
              <div className="tf-auth-floating-icon icon-2">✨</div>
              <div className="tf-auth-floating-icon icon-3">🎯</div>
              <div className="tf-auth-logo-circle">
                <Zap size={32} />
              </div>
            </div>

            <h2 className="tf-auth-title">Welcome to TaskFlow</h2>
            <p className="tf-auth-subtitle">
              The high-energy, gamified productivity canvas built for Gen Z focus and flow.
            </p>

            <div className="tf-auth-actions-group">
              <button
                type="button"
                className="tf-btn-primary tf-btn-gradient tf-auth-full-btn"
                onClick={handleGuestLogin}
              >
                <span>Continue as Demo Guest</span>
                <ArrowRight size={16} />
              </button>

              <div className="tf-auth-divider">
                <span>or test email sign in</span>
              </div>

              <div className="tf-auth-button-row">
                <button
                  type="button"
                  className="tf-btn-secondary tf-auth-half-btn"
                  onClick={() => {
                    setErrors({});
                    setMode('login');
                  }}
                >
                  Log In
                </button>
                <button
                  type="button"
                  className="tf-btn-secondary tf-auth-half-btn"
                  onClick={() => {
                    setErrors({});
                    setMode('signup');
                  }}
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Login View */}
        {mode === 'login' && (
          <div className="tf-auth-view">
            <h2 className="tf-auth-title">Welcome Back</h2>
            <p className="tf-auth-subtitle">Enter your demo details to continue your streak.</p>

            <form onSubmit={handleSubmit} className="tf-auth-form">
              <div className="tf-form-group">
                <label className="tf-form-label">Email</label>
                <div className="tf-input-with-icon">
                  <Mail size={16} className="tf-input-left-icon" />
                  <input
                    type="email"
                    className={`tf-form-input with-left-icon ${errors.email ? 'has-error' : ''}`}
                    placeholder="alex@flowstudio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && <span className="tf-auth-error-hint">{errors.email}</span>}
              </div>

              <div className="tf-form-group">
                <label className="tf-form-label">Password</label>
                <div className="tf-input-with-icon">
                  <Lock size={16} className="tf-input-left-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`tf-form-input with-left-icon with-right-btn ${errors.password ? 'has-error' : ''}`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="tf-input-right-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <span className="tf-auth-error-hint">{errors.password}</span>}
              </div>

              <div className="tf-auth-form-buttons">
                <button type="submit" className="tf-btn-primary tf-btn-gradient tf-auth-full-btn">
                  Log In to Demo
                </button>

                <button
                  type="button"
                  className="tf-btn-ghost"
                  onClick={handleGuestLogin}
                >
                  ⚡ Instant Demo Sign In as Guest
                </button>
              </div>
            </form>

            <p className="tf-auth-switch-link">
              Don't have an account?{' '}
              <button type="button" onClick={() => { setErrors({}); setMode('signup'); }}>
                Create one here
              </button>
            </p>
          </div>
        )}

        {/* Sign Up View */}
        {mode === 'signup' && (
          <div className="tf-auth-view">
            <h2 className="tf-auth-title">Join TaskFlow</h2>
            <p className="tf-auth-subtitle">Create your personal productivity profile.</p>

            <form onSubmit={handleSubmit} className="tf-auth-form">
              <div className="tf-form-group">
                <label className="tf-form-label">Your Name</label>
                <div className="tf-input-with-icon">
                  <User size={16} className="tf-input-left-icon" />
                  <input
                    type="text"
                    className={`tf-form-input with-left-icon ${errors.name ? 'has-error' : ''}`}
                    placeholder="Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {errors.name && <span className="tf-auth-error-hint">{errors.name}</span>}
              </div>

              <div className="tf-form-group">
                <label className="tf-form-label">Email</label>
                <div className="tf-input-with-icon">
                  <Mail size={16} className="tf-input-left-icon" />
                  <input
                    type="email"
                    className={`tf-form-input with-left-icon ${errors.email ? 'has-error' : ''}`}
                    placeholder="alex@flowstudio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && <span className="tf-auth-error-hint">{errors.email}</span>}
              </div>

              <div className="tf-form-group">
                <label className="tf-form-label">Password</label>
                <div className="tf-input-with-icon">
                  <Lock size={16} className="tf-input-left-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`tf-form-input with-left-icon with-right-btn ${errors.password ? 'has-error' : ''}`}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="tf-input-right-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <span className="tf-auth-error-hint">{errors.password}</span>}
              </div>

              <div className="tf-form-group">
                <label className="tf-form-label">Confirm Password</label>
                <div className="tf-input-with-icon">
                  <Lock size={16} className="tf-input-left-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`tf-form-input with-left-icon ${errors.confirmPassword ? 'has-error' : ''}`}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {errors.confirmPassword && <span className="tf-auth-error-hint">{errors.confirmPassword}</span>}
              </div>

              <div className="tf-auth-form-buttons">
                <button type="submit" className="tf-btn-primary tf-btn-gradient tf-auth-full-btn">
                  Create Demo Profile
                </button>
              </div>
            </form>

            <p className="tf-auth-switch-link">
              Already have an account?{' '}
              <button type="button" onClick={() => { setErrors({}); setMode('login'); }}>
                Log in instead
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
