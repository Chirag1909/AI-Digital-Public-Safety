import React from 'react';
import { AnimatedCounter } from './AnimatedCounter';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  subtext?: string;
  glowColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  icon: Icon,
  subtext,
  glowColor = 'rgba(99, 102, 241, 0.05)',
}) => {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.75rem',
        background: `linear-gradient(135deg, rgba(13, 21, 38, 0.7), ${glowColor})`,
        border: '1px solid var(--border-color)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </span>
        <div
          style={{
            padding: '0.5rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.03)',
            color: 'var(--text-primary)',
            display: 'flex',
          }}
        >
          <Icon size={18} />
        </div>
      </div>
      <div>
        <h3
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            margin: '0.2rem 0',
            color: '#ffffff',
          }}
        >
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </h3>
        {subtext && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};
