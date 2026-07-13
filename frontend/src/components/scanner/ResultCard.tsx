import React, { useState } from 'react';
import type { ClassificationResponse } from '../../api/client';
import { ShieldCheck, ShieldAlert, AlertTriangle, AlertCircle, Clipboard, Globe } from 'lucide-react';
import { ThreatGauge } from '../ui/ThreatGauge';
import { ThreatDNA } from './ThreatDNA';

interface ResultCardProps {
  result: ClassificationResponse;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const isReview = result.risk === 'needs_human_review';
  const isHighRisk = result.risk === 'high_risk';

  let riskColor = 'var(--risk-safe)';
  let glowColor = 'var(--risk-safe-glow)';
  let borderColor = 'var(--risk-safe-border)';
  let Icon = ShieldCheck;
  let riskLabel = 'Verified Safe Content';
  let riskSubtitle = 'AI scanned this content and found no significant cyber threat or scam red flags.';

  if (isReview) {
    riskColor = 'var(--risk-review)';
    glowColor = 'var(--risk-review-glow)';
    borderColor = 'var(--risk-review-border)';
    Icon = AlertTriangle;
    riskLabel = 'Suspicious Signals Blocked';
    riskSubtitle = 'AI classification score indicates possible scam tactics. Exercise caution.';
  } else if (isHighRisk) {
    riskColor = 'var(--risk-high)';
    glowColor = 'var(--risk-high-glow)';
    borderColor = 'var(--risk-high-border)';
    Icon = ShieldAlert;
    riskLabel = 'High-Risk Cyber Scam Detected';
    riskSubtitle = 'Severe indicators of digital arrest, OTP hijack, or payment fraud identified.';
  }

  const handleCopy = () => {
    const reportText = `[CyberRakshak AI Scam Report]
Risk Level: ${result.risk.toUpperCase().replace(/_/g, ' ')}
Scam Category: ${result.category}
Red Flags: ${result.red_flags ? result.red_flags.join(', ') : 'None'}
Recommendation: ${result.recommendation}`;
    
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="glass-panel animate-fade-in delay-150"
      style={{
        marginTop: '2rem',
        padding: '2.25rem',
        borderColor: borderColor,
        boxShadow: `0 8px 36px 0 ${glowColor}`,
        background: 'rgba(13, 21, 38, 0.75)',
      }}
    >
      {/* Top Section: Icon, Labels & SVG Gauge */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '1.25rem', flex: 1, minWidth: '260px' }}>
          <div
            style={{
              padding: '1.1rem',
              borderRadius: '16px',
              backgroundColor: glowColor,
              border: `1px solid ${borderColor}`,
              color: riskColor,
              display: 'flex',
              height: 'fit-content',
              filter: `drop-shadow(0 0 10px ${glowColor})`,
            }}
          >
            <Icon size={36} />
          </div>
          <div>
            <h2 style={{ color: riskColor, fontSize: '1.65rem', marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>
              {riskLabel}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {riskSubtitle}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Detected Category:</span>
              <span style={{ color: '#ffffff', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                {result.category.replace(/_/g, ' ')}
              </span>
              {result.language && (
                <>
                  <span style={{ color: 'var(--text-muted)' }}>| Language:</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                    {result.language.toUpperCase()}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Confidence Circle meter */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '150px' }}>
          <ThreatGauge confidence={result.confidence} risk={result.risk} size={130} />
        </div>
      </div>

      {/* Extracted text block (for OCR files) */}
      {result.extracted_text && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1.1rem',
            background: 'rgba(7, 11, 20, 0.4)',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.78rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <AlertCircle size={13} /> Extracted Text script (OCR)
          </div>
          <p
            style={{
              fontStyle: 'italic',
              fontSize: '0.92rem',
              color: '#f1f5f9',
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'pre-wrap',
            }}
          >
            "{result.extracted_text}"
          </p>
        </div>
      )}

      {/* Explainable AI block (DNA scores) */}
      <ThreatDNA redFlags={result.red_flags || []} risk={result.risk} />

      {/* Action Recommendation Banner */}
      <div
        style={{
          marginTop: '1.5rem',
          background: glowColor,
          padding: '1.25rem',
          borderRadius: '10px',
          borderLeft: `4px solid ${riskColor}`,
          border: `1px solid ${borderColor}`,
          borderLeftWidth: '5px',
        }}
      >
        <h4 style={{ color: '#ffffff', marginBottom: '0.3rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          🛡️ Emergency Action Recommendation
        </h4>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: '1.5' }}>
          {result.recommendation}
        </p>
      </div>

      {/* Control Action Buttons */}
      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={handleCopy}
          className="btn-secondary"
          style={{ flex: 1, padding: '0.7rem 1.2rem', fontSize: '0.85rem' }}
        >
          <Clipboard size={14} /> {copied ? 'Copied Report!' : 'Copy Summary'}
        </button>

        {isHighRisk && (
          <a
            href="https://www.cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              flex: 2.5,
              padding: '0.7rem 1.2rem',
              fontSize: '0.85rem',
              background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
              textDecoration: 'none',
              display: 'inline-flex',
            }}
          >
            <Globe size={14} /> Report to Indian Cybercrime Portal (1930)
          </a>
        )}
      </div>
    </div>
  );
};
export default ResultCard;
