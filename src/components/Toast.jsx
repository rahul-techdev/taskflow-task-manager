import React from 'react';
import { CheckCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose, onUndo }) {
  if (!toast) return null;

  return (
    <div className="tf-toast" role="status" aria-live="polite">
      {toast.type === 'info' ? (
        <Info size={18} style={{ color: '#60a5fa' }} />
      ) : (
        <CheckCircle size={18} style={{ color: '#34d399' }} />
      )}
      <span>{toast.message}</span>
      {toast.undoAction && (
        <button
          type="button"
          className="tf-toast-undo"
          onClick={() => {
            onUndo(toast.undoAction);
            onClose();
          }}
        >
          Undo
        </button>
      )}
      <button
        type="button"
        style={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}
        onClick={onClose}
        aria-label="Dismiss notice"
      >
        <X size={14} />
      </button>
    </div>
  );
}
