import React from 'react';
import { Fingerprint } from 'lucide-react';

interface ThreatDNAProps {
  redFlags: string[];
  risk: 'safe' | 'needs_human_review' | 'high_risk';
}

interface DNAScore {
  label: string;
  score: number;
  color: string;
  description: string;
}

export const ThreatDNA: React.FC<ThreatDNAProps> = ({ redFlags, risk }) => {
  // Map red flags to dynamic score cards
  const getDNAScores = (): DNAScore[] => {
    const scores: DNAScore[] = [];
    const hasFlag = (f: string) => redFlags.some((rf) => rf.toLowerCase().includes(f));

    // 1. Urgency / Panic
    if (hasFlag('urgency') || hasFlag('immediate') || hasFlag('hour') || hasFlag('block')) {
      scores.push({
        label: 'Urgency & Pressure',
        score: risk === 'high_risk' ? 95 : 75,
        color: '#ef4444',
        description: 'Imposes short response deadlines to trigger panic.',
      });
    } else {
      scores.push({
        label: 'Urgency & Pressure',
        score: risk === 'safe' ? 10 : 35,
        color: 'var(--text-muted)',
        description: 'No severe timelines or immediate pressure found.',
      });
    }

    // 2. Impersonation / Fake Authority
    if (hasFlag('police') || hasFlag('cbi') || hasFlag('officer') || hasFlag('impersonation') || hasFlag('authority')) {
      scores.push({
        label: 'Authority Impersonation',
        score: 98,
        color: '#f59e0b',
        description: 'Claims affiliation with CBI, Police, Custom office or Banks.',
      });
    } else {
      scores.push({
        label: 'Authority Impersonation',
        score: risk === 'safe' ? 5 : 20,
        color: 'var(--text-muted)',
        description: 'No impersonation of law officials detected.',
      });
    }

    // 3. Financial/OTP requests
    if (hasFlag('otp') || hasFlag('pay') || hasFlag('gpay') || hasFlag('upi') || hasFlag('transfer') || hasFlag('refund')) {
      scores.push({
        label: 'Financial Exploitation',
        score: risk === 'high_risk' ? 90 : 70,
        color: '#3b82f6',
        description: 'Demands UPI transfers, refunds or requests security OTP pins.',
      });
    } else {
      scores.push({
        label: 'Financial Exploitation',
        score: risk === 'safe' ? 8 : 30,
        color: 'var(--text-muted)',
        description: 'No explicit request for OTP or funds transfer.',
      });
    }

    return scores;
  };

  const scores = getDNAScores();

  return (
    <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Fingerprint size={18} color="var(--accent-cyan)" />
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
          Threat DNA Fingerprint (Explainable AI)
        </h4>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {scores.map((item, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: item.color, fontWeight: 600 }}>{item.score}%</span>
            </div>
            
            {/* Progress bar container */}
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '999px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${item.score}%`,
                  height: '100%',
                  background: item.color,
                  boxShadow: item.score > 50 ? `0 0 8px ${item.color}` : 'none',
                  borderRadius: '999px',
                  transition: 'width 1.5s cubic-bezier(0.1, 1, 0.1, 1)',
                }}
              />
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {redFlags.length > 0 && (
        <div style={{ marginTop: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Scattered Red Flags Tagged:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {redFlags.map((flag, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.18)',
                  color: '#fca5a5',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {flag.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ThreatDNA;
