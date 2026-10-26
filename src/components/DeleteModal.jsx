import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  taskTitle 
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="tf-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="tf-modal-container"
        style={{ maxWidth: 440 }}
        role="dialog"
        aria-modal="true"
      >
        <div className="tf-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div 
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'var(--danger-red-light)',
                color: 'var(--danger-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AlertTriangle size={18} />
            </div>
            <h2 className="tf-modal-title" style={{ fontSize: '1.1rem' }}>Delete Task?</h2>
          </div>
          <button
            type="button"
            className="tf-modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="tf-modal-body" style={{ padding: '20px 24px', gap: 12 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>
            Are you sure you want to delete <strong style={{ color: 'var(--text-main)' }}>"{taskTitle}"</strong>? This action cannot be undone.
          </p>
        </div>

        <div className="tf-modal-footer">
          <button
            type="button"
            className="tf-btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="tf-btn-primary"
            style={{ 
              backgroundColor: 'var(--danger-red)', 
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.35)' 
            }}
            onClick={onConfirm}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
