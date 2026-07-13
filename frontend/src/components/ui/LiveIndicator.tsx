import React from 'react';

interface LiveIndicatorProps {
  label?: string;
  color?: string;
}

export const LiveIndicator: React.FC<LiveIndicatorProps> = ({
  label = 'SYSTEM LIVE',
  color = 'var(--risk-safe)',
}) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      <span
        className="pulse-dot"
        style={{
          backgroundColor: color,
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
};
