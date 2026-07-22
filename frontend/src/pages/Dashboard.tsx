import React from 'react';
import { StatCard } from '../components/ui/StatCard';
import { ThreatAreaChart } from '../components/charts/ThreatAreaChart';
import { ScamDonut } from '../components/charts/ScamDonut';
import { LanguageRadar } from '../components/charts/LanguageRadar';
import { IndiaThreatMap } from '../components/charts/IndiaThreatMap';
import { mockLiveThreats } from '../data/mockDashboard';
import { RiskBadge } from '../components/ui/RiskBadge';
import { ShieldAlert, AlertTriangle, Activity, Database, Clock, RefreshCw } from 'lucide-react';
import { LiveIndicator } from '../components/ui/LiveIndicator';

export const Dashboard: React.FC = () => {
  return (
    <div className="container animate-fade-in" style={{ zIndex: 10 }}>
      {/* Dashboard SOC Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <Activity size={18} color="var(--accent-cyan)" />
            <LiveIndicator label="Cyber Security Operations Center (CSOC)" />
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, margin: 0 }}>Live Threat Dashboard</h1>
        </div>

        <button
          className="btn-secondary"
          onClick={() => window.location.reload()}
          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', gap: '0.4rem' }}
        >
          <RefreshCw size={12} /> Force Refresh
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="dashboard-grid">
        <StatCard
          title="Total Threat Scans"
          value={18642}
          icon={Database}
          subtext="Scanned messages database-wide"
          glowColor="rgba(6, 182, 212, 0.05)"
        />
        <StatCard
          title="Scams Blocked"
          value={1842}
          icon={ShieldAlert}
          subtext="High-risk malicious templates"
          glowColor="rgba(239, 68, 68, 0.05)"
        />
        <StatCard
          title="In Review Queue"
          value={18}
          icon={AlertTriangle}
          subtext="Pending human verification"
          glowColor="rgba(245, 158, 11, 0.05)"
        />
        <StatCard
          title="Avg classification Speed"
          value={240}
          suffix="ms"
          icon={Clock}
          subtext="Transformer inference speed"
          glowColor="rgba(139, 92, 246, 0.05)"
        />
      </div>

      {/* Charts & Interactive Maps Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '1.5rem',
          marginBottom: '1.5rem',
          alignItems: 'start',
        }}
        className="responsive-grid"
      >
        {/* Left Side: Timeline chart */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📈 Scan Frequency & Block Rates (24h)
          </h3>
          <ThreatAreaChart />
        </div>

        {/* Right Side: India Hotspots Map */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            🗺️ Live Scam Hotspots (India)
          </h3>
          <IndiaThreatMap />
        </div>
      </div>

      {/* Additional telemetry breakdowns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 2fr',
          gap: '1.5rem',
          alignItems: 'start',
        }}
        className="responsive-grid-three"
      >
        {/* Scam classification ratio */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>🎯 Scams Breakdown</h3>
          <ScamDonut />
        </div>

        {/* Language metrics */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>🗣️ Language Matrix</h3>
          <LanguageRadar />
        </div>

        {/* Live Threat Log Stream table */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>📡 Real-time Threat Stream</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--risk-safe)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span className="pulse-dot" style={{ width: '5px', height: '5px' }} /> Streaming Live
            </span>
          </h3>

          <div style={{ overflowY: 'auto', maxHeight: '200px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {mockLiveThreats.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.03)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  gap: '1rem',
                  fontSize: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', overflow: 'hidden', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.id}</span>
                    <span style={{ fontWeight: 600, color: '#ffffff', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.category}</span>
                  </div>
                  <span style={{ color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '0.78rem' }}>
                    "{item.text}"
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.15rem' }}>
                  <RiskBadge risk={item.risk} showIcon={false} />
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
