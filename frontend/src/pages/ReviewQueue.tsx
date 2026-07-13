import React, { useState } from 'react';
import { UserCog, CheckCircle, ShieldAlert, FileText } from 'lucide-react';
import { mockReviewQueueItems } from '../data/mockReviewQueue';
import type { QueueItem } from '../data/mockReviewQueue';

export const ReviewQueue: React.FC = () => {
  const [queue, setQueue] = useState<QueueItem[]>(mockReviewQueueItems);
  const [activeItem, setActiveItem] = useState<QueueItem | null>(mockReviewQueueItems[0] || null);
  const [actionLog, setActionLog] = useState<string[]>([]);

  const handleDecision = (itemId: string, decision: 'safe' | 'scam') => {
    const item = queue.find((q) => q.id === itemId);
    if (!item) return;

    // Log the audit trail
    const timestamp = new Date().toLocaleTimeString();
    const logMsg = `[${timestamp}] Case ${itemId} marked as ${decision.toUpperCase()} by Analyst.`;
    setActionLog([logMsg, ...actionLog]);

    // Remove from queue
    const updatedQueue = queue.filter((q) => q.id !== itemId);
    setQueue(updatedQueue);

    // Update active selection
    if (activeItem?.id === itemId) {
      setActiveItem(updatedQueue[0] || null);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ zIndex: 10 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div
          style={{
            padding: '0.65rem',
            borderRadius: '10px',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.15)',
            color: 'var(--risk-review)',
            display: 'flex',
          }}
        >
          <UserCog size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Moderation Review Queue</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Verify mid-confidence classifications requiring forensic human verification.
          </p>
        </div>
      </div>

      {queue.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 2fr',
            gap: '1.5rem',
          }}
          className="responsive-grid"
        >
          {/* Left Column: Queue Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Pending Cases</span>
              <span style={{ color: 'var(--risk-review)' }}>{queue.length} items</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '500px', overflowY: 'auto' }}>
              {queue.map((item) => {
                const isActive = activeItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className="glass-panel"
                    style={{
                      padding: '1.1rem',
                      cursor: 'pointer',
                      background: isActive ? 'rgba(245, 158, 11, 0.05)' : 'rgba(13, 21, 38, 0.5)',
                      borderColor: isActive ? 'var(--risk-review-border)' : 'var(--border-color)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {item.id}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--risk-review)' }}>
                        Score: {Math.round(item.confidence * 100)}%
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '0.4rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {item.category}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      "{item.text}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Forensic View & Decision Deck */}
          {activeItem && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(13, 21, 38, 0.7)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={18} color="var(--risk-review)" />
                    <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Forensic details ({activeItem.id})</span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{activeItem.timestamp}</span>
                </div>

                {/* Text evidence content */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Suspicious Text Script
                  </span>
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: '#f1f5f9', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                      "{activeItem.text}"
                    </p>
                  </div>
                </div>

                {/* Metadata items */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                      Auto Classifier Category
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>{activeItem.category}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                      Input Language
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>{activeItem.language}</span>
                  </div>
                </div>

                {/* Decision Bar */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => handleDecision(activeItem.id, 'safe')}
                    className="btn-secondary"
                    style={{ flex: 1, borderColor: 'var(--risk-safe-border)', color: '#34d399', background: 'rgba(16, 185, 129, 0.05)' }}
                  >
                    <CheckCircle size={16} /> Mark as Safe
                  </button>
                  <button
                    onClick={() => handleDecision(activeItem.id, 'scam')}
                    className="btn-primary"
                    style={{ flex: 1, background: 'linear-gradient(135deg, #ef4444, #b91c1c)', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.2)' }}
                  >
                    <ShieldAlert size={16} /> Confirm Scam
                  </button>
                </div>
              </div>

              {/* Analyst log feed */}
              <div className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(13, 21, 38, 0.4)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Analyst Audit Trail
                </span>
                <div style={{ maxHeight: '100px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {actionLog.length > 0 ? (
                    actionLog.map((log, i) => (
                      <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        {log}
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      Audit trail is currently empty. Decisions will be cataloged here.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
          <CheckCircle size={48} color="var(--risk-safe)" style={{ marginBottom: '1.25rem', filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.3))' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>All Clear! Queue is Empty</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            No pending classification anomalies require analyst forensic inspection at this time.
          </p>
        </div>
      )}
    </div>
  );
};
export default ReviewQueue;
