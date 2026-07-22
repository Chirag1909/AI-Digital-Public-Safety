import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { mockLanguageDistribution } from '../../data/mockDashboard';

export const LanguageRadar: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="68%" data={mockLanguageDistribution}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.05)" />
          <PolarAngleAxis 
            dataKey="language" 
            stroke="var(--text-secondary)" 
            fontSize={10}
            tickLine={false}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 150]} 
            stroke="rgba(255, 255, 255, 0.1)"
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Languages"
            dataKey="count"
            stroke="var(--accent-purple)"
            fill="var(--accent-purple)"
            fillOpacity={0.25}
            style={{ filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.3))' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default LanguageRadar;
