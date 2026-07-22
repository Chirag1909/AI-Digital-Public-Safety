import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { mockScamDistribution } from '../../data/mockDashboard';

const COLORS = [
  '#8b5cf6', // Purple - Digital Arrest
  '#ef4444', // Red - OTP Scam
  '#f59e0b', // Orange - UPI
  '#3b82f6', // Blue - Aadhaar
  '#06b6d4', // Cyan - Lottery/Job
];

export const ScamDonut: React.FC = () => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600 }}>
            {payload[0].name}: <span style={{ color: payload[0].payload.fill }}>{payload[0].value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ height: 130 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={mockScamDistribution}
              cx="50%"
              cy="50%"
              innerRadius={38}
              outerRadius={55}
              paddingAngle={4}
              dataKey="value"
            >
              {mockScamDistribution.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  style={{ filter: `drop-shadow(0 0 2px ${COLORS[index % COLORS.length]}44)` }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Dynamic legend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 0.25rem', marginTop: '0.5rem' }}>
        {mockScamDistribution.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: COLORS[idx % COLORS.length],
                display: 'inline-block',
              }}
            />
            <span style={{ color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ScamDonut;
