import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

interface RiskBadgeProps {
  risk: 'safe' | 'needs_human_review' | 'high_risk';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ risk, showIcon = true }) => {
  let label = 'Safe';
  let styles = {
    background: 'rgba(16, 185, 129, 0.1)',
    color: '#34d399',
    border: '1px solid rgba(16, 185, 129, 0.25)',
  };
  let Icon = ShieldCheck;

  if (risk === 'needs_human_review') {
    label = 'Needs Review';
    styles = {
      background: 'rgba(245, 158, 11, 0.1)',
      color: '#fbbf24',
      border: '1px solid rgba(245, 158, 11, 0.25)',
    };
    Icon = AlertTriangle;
  } else if (risk === 'high_risk') {
    label = 'High Risk';
    styles = {
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#f87171',
      border: '1px solid rgba(239, 68, 68, 0.25)',
    };
    Icon = ShieldAlert;
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.8rem',
        fontWeight: 600,
        fontFamily: 'var(--font-display)',
        ...styles,
      }}
    >
      {showIcon && <Icon size={14} />}
      {label}
    </span>
  );
};
