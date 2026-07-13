import React, { useEffect, useState } from 'react';

interface ThreatGaugeProps {
  confidence: number; // 0 to 1
  risk: 'safe' | 'needs_human_review' | 'high_risk';
  size?: number;
}

export const ThreatGauge: React.FC<ThreatGaugeProps> = ({ confidence, risk, size = 150 }) => {
  const [animatedOffset, setAnimatedOffset] = useState(0);
  
  const percentage = Math.round(confidence * 100);
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const targetOffset = circumference - (percentage / 100) * circumference;

  let color = 'var(--risk-safe)';
  if (risk === 'needs_human_review') color = 'var(--risk-review)';
  else if (risk === 'high_risk') color = 'var(--risk-high)';

  useEffect(() => {
    // Smooth delay for initial gauge mounting transition
    const timer = setTimeout(() => {
      setAnimatedOffset(targetOffset);
    }, 150);
    return () => clearTimeout(timer);
  }, [targetOffset]);

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        {/* Animated main track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />
      </svg>
      {/* Centered statistics indicator */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            color: color,
            lineHeight: 1.1,
          }}
        >
          {percentage}%
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Confidence
        </span>
      </div>
    </div>
  );
};
