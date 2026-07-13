import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { mockThreatActivity } from '../../data/mockDashboard';

export const ThreatAreaChart: React.FC = () => {
  // Custom tooltips matching the dashboard theme
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          }}
        >
          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
            Time: {label}
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
            Scans: <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{payload[0].value}</span>
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--risk-high)' }}>
            Scams Blocked: <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{payload[1].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <AreaChart data={mockThreatActivity} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--risk-high)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--risk-high)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.02)" />
          <XAxis
            dataKey="time"
            stroke="var(--text-muted)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="var(--text-muted)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="scans"
            stroke="var(--accent-cyan)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorScans)"
            name="Scans"
          />
          <Area
            type="monotone"
            dataKey="threats"
            stroke="var(--risk-high)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorThreats)"
            name="Scams Blocked"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
