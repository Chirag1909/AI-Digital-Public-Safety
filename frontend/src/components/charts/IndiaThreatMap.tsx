import React, { useState } from 'react';

interface Hotspot {
  state: string;
  count: number;
  risk: 'elevated' | 'critical';
  x: number;
  y: number;
}

export const IndiaThreatMap: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const hotspots: Hotspot[] = [
    { state: 'Delhi NCR', count: 1842, risk: 'critical', x: 120, y: 110 },
    { state: 'Maharashtra', count: 2104, risk: 'critical', x: 95, y: 220 },
    { state: 'Karnataka', count: 1420, risk: 'elevated', x: 110, y: 280 },
    { state: 'Telangana', count: 1105, risk: 'elevated', x: 135, y: 240 },
    { state: 'West Bengal', count: 984, risk: 'elevated', x: 210, y: 175 },
    { state: 'Uttar Pradesh', count: 1650, risk: 'critical', x: 155, y: 120 },
  ];

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '280px', height: '320px', position: 'relative' }}>
        {/* Abstract Stylized India Map SVG */}
        <svg
          viewBox="0 0 300 360"
          width="100%"
          height="100%"
          style={{
            fill: 'rgba(255, 255, 255, 0.02)',
            stroke: 'rgba(99, 102, 241, 0.25)',
            strokeWidth: '1.5',
            filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.05))',
          }}
        >
          {/* General abstract boundary paths of India outline */}
          <path
            d="M90 60 L120 40 L135 60 L140 20 L155 30 L160 55 L165 75 L180 80 L195 90 L205 105 L220 110 L225 125 L215 135 L200 130 L190 145 L205 165 L220 170 L240 170 L245 185 L225 190 L210 200 L200 200 L185 220 L165 210 L160 220 L150 250 L145 280 L130 320 L125 350 L115 320 L110 300 L95 280 L90 260 L85 240 L70 230 L55 220 L45 200 L55 190 L70 190 L80 180 L90 160 L75 140 L80 120 L95 100 L90 60 Z"
            style={{
              fill: 'rgba(13, 21, 38, 0.6)',
              stroke: 'rgba(6, 182, 212, 0.15)',
              strokeWidth: 2,
            }}
          />
          {/* Internal Grid Lines inside the map */}
          <path
            d="M100 80 L200 80 M70 150 L220 150 M80 220 L180 220 M110 290 L150 290"
            stroke="rgba(255, 255, 255, 0.02)"
            strokeWidth="1"
          />

          {/* Glowing state hotspots */}
          {hotspots.map((spot, idx) => {
            const isCritical = spot.risk === 'critical';
            const color = isCritical ? 'var(--risk-high)' : 'var(--risk-review)';
            return (
              <g
                key={idx}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setActiveHotspot(spot)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                {/* Outer pulsing ring */}
                <circle
                  cx={spot.x}
                  cy={spot.y}
                  r={8}
                  fill={color}
                  opacity={0.3}
                  style={{
                    transformOrigin: `${spot.x}px ${spot.y}px`,
                    animation: 'pulse-ring 2s infinite',
                  }}
                />
                {/* Core dot */}
                <circle
                  cx={spot.x}
                  cy={spot.y}
                  r={4}
                  fill={color}
                  style={{
                    filter: `drop-shadow(0 0 4px ${color})`,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip overlay */}
        {activeHotspot && (
          <div
            style={{
              position: 'absolute',
              top: activeHotspot.y - 45,
              left: activeHotspot.x - 55,
              background: 'var(--bg-secondary)',
              border: `1px solid ${activeHotspot.risk === 'critical' ? 'var(--risk-high-border)' : 'var(--risk-review-border)'}`,
              padding: '0.4rem 0.6rem',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              zIndex: 20,
              pointerEvents: 'none',
              width: '120px',
              textAlign: 'center',
            }}
          >
            <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#ffffff' }}>
              {activeHotspot.state}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '0.7rem',
                color: activeHotspot.risk === 'critical' ? 'var(--risk-high)' : 'var(--risk-review)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {activeHotspot.count} scam cases
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          fontSize: '0.72rem',
          marginTop: '0.5rem',
          color: 'var(--text-secondary)',
          background: 'rgba(255, 255, 255, 0.02)',
          padding: '0.4rem 0.8rem',
          borderRadius: '6px',
          border: '1px solid var(--border-color)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--risk-high)' }} />
          Critical Alert (High volume)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--risk-review)' }} />
          Elevated Scam Risk
        </span>
      </div>
    </div>
  );
};
export default IndiaThreatMap;
