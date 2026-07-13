import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Terminal, Activity, ArrowRight, Phone, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { ParticleCanvas } from '../components/ui/ParticleCanvas';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { LiveIndicator } from '../components/ui/LiveIndicator';

interface SimulatedScam {
  title: string;
  sender: string;
  message: string;
  risk: 'safe' | 'needs_human_review' | 'high_risk';
  category: string;
  redFlags: string[];
}

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [activeSimTab, setActiveSimTab] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);

  const simulatedScams: SimulatedScam[] = [
    {
      title: 'Digital Arrest',
      sender: 'CBI / Police Officer',
      message: 'CBI Office calling. A parcel containing illegal items registered on your Aadhaar card has been intercepted. Connect immediately on Skype video call to avoid immediate police arrest.',
      risk: 'high_risk',
      category: 'Digital Arrest Scam',
      redFlags: ['impersonation', 'digital_custody_threat', 'fear_language'],
    },
    {
      title: 'UPI / GPay error',
      sender: '+91 92837 84723',
      message: 'Hello, I sent Rs 5,000 to your GPay by mistake instead of my sister. My mom is in the hospital. Please scan this QR code to return it to me.',
      risk: 'high_risk',
      category: 'UPI Collect / Refund Fraud',
      redFlags: ['qr_code_request', 'urgency', 'emotional_manipulation'],
    },
    {
      title: 'SIM KYC Block',
      sender: ' Airtel KYC Desk',
      message: 'ALERT: Your Airtel SIM card will be deactivated in 2 hours due to pending KYC update. Call officer Kumar on 9827382213 immediately.',
      risk: 'high_risk',
      category: 'SIM Hijacking Phishing',
      redFlags: ['urgency', 'invalid_sender', 'kyc_suspension'],
    },
  ];

  // Trigger scanning animation when switching tabs
  useEffect(() => {
    setIsSimulating(true);
    setSimProgress(0);
    const interval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [activeSimTab]);

  const activeScam = simulatedScams[activeSimTab];

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Particle Canvas background behind hero */}
      <ParticleCanvas />

      {/* Hero Section - Asymmetric 2-Column Grid */}
      <div className="container" style={{ position: 'relative', zIndex: 10, marginTop: '2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '4.5rem',
          }}
          className="responsive-grid"
        >
          {/* Left Column: Technical Copy */}
          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                color: 'var(--accent-cyan)',
                fontSize: '0.78rem',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              <Sparkles size={12} className="pulse-dot" style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent-cyan)' }} />
              Cyber Threat Defense Framework
            </div>

            <h1
              style={{
                fontSize: '3.6rem',
                lineHeight: '1.15',
                fontWeight: 800,
                marginBottom: '1.5rem',
                background: 'linear-gradient(to right, #ffffff, #c7d2fe, #a5b4fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.03em',
                fontFamily: 'var(--font-display)',
              }}
            >
              Real-Time AI <br />
              <span style={{ color: 'var(--accent-cyan)', WebkitTextFillColor: 'initial' }}>Cyber-Scam Shield</span>
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                marginBottom: '2.5rem',
                lineHeight: '1.65',
                maxWidth: '540px',
              }}
            >
              Protect your bank account, credentials, and family. Evaluate suspicious calls, UPI requests, Aadhaar warnings, and screenshots using advanced neural scam classifiers.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <button
                onClick={() => navigate('/scan')}
                className="btn-primary"
                style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}
              >
                Launch Threat Lab <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('/learn')}
                className="btn-secondary"
                style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}
              >
                Learn Defenses
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Scam Simulation Terminal */}
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(13, 21, 38, 0.75)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Terminal size={14} color="var(--accent-cyan)" />
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Scam_Simulator.exe
                </span>
              </div>
              <LiveIndicator label="Simulation Ready" />
            </div>

            {/* Terminal Switcher Tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: '8px' }}>
              {simulatedScams.map((scam, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSimTab(idx)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: activeSimTab === idx ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    borderWidth: activeSimTab === idx ? '1px' : '0px',
                    borderColor: 'rgba(99, 102, 241, 0.25)',
                    borderStyle: 'solid',
                    color: activeSimTab === idx ? '#ffffff' : 'var(--text-secondary)',
                    transition: 'all 0.2s',
                  }}
                >
                  {scam.title}
                </button>
              ))}
            </div>

            {/* Simulating Chat Box Area */}
            <div
              style={{
                background: 'rgba(7, 11, 20, 0.6)',
                borderRadius: '10px',
                padding: '1.25rem',
                border: '1px solid var(--border-color)',
                marginBottom: '1.25rem',
                minHeight: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {isSimulating && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '2px',
                    width: `${simProgress}%`,
                    background: 'var(--accent-cyan)',
                    boxShadow: '0 0 8px var(--accent-cyan)',
                    transition: 'width 0.05s linear',
                  }}
                />
              )}

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.4rem' }}>
                  FROM: {activeScam.sender}
                </span>
                <p style={{ fontSize: '0.85rem', color: '#e2e8f0', margin: 0, fontFamily: 'var(--font-mono)', fontStyle: 'italic', lineHeight: '1.5' }}>
                  "{activeScam.message}"
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '0.5rem' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Analyzing payload...</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{isSimulating ? 'SCANNING' : 'DONE'}</span>
              </div>
            </div>

            {/* Simulated Analysis Result deck */}
            <div
              style={{
                background: activeScam.risk === 'high_risk' ? 'rgba(239, 68, 68, 0.04)' : 'rgba(16, 185, 129, 0.04)',
                border: `1px solid ${activeScam.risk === 'high_risk' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
                padding: '1.1rem',
                borderRadius: '10px',
                opacity: isSimulating ? 0.3 : 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: activeScam.risk === 'high_risk' ? 'var(--risk-high)' : 'var(--risk-safe)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {activeScam.risk === 'high_risk' ? <AlertOctagon size={14} /> : <CheckCircle2 size={14} />}
                  {activeScam.category}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: activeScam.risk === 'high_risk' ? 'var(--risk-high)' : 'var(--risk-safe)', fontWeight: 700 }}>
                  94.8% Risk
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {activeScam.redFlags.map((flag, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.15)',
                      padding: '0.15rem 0.4rem',
                      borderRadius: '4px',
                      color: '#fca5a5',
                    }}
                  >
                    #{flag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Stats Section */}
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '1.75rem', color: '#ffffff' }}>
          🛡️ Platform Telemetry & Impact
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: 'minmax(140px, auto)',
            gap: '1.5rem',
          }}
          className="bento-grid"
        >
          {/* Card 1: Live Threats Feed (2 Columns wide, spans 2 rows) */}
          <div
            className="glass-panel"
            style={{
              gridColumn: 'span 2',
              gridRow: 'span 2',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Activity size={16} color="var(--risk-high)" /> Live Fraud Radar Stream (India)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Real-time scam reports verified and flagged by CyberRakshak node architectures.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', borderRadius: '6px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>"Your bank credit card is locked. Click link to verify..."</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--risk-high)', fontWeight: 600 }}>SMS Scam</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', borderRadius: '6px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>"Customs Officer. Found MDMA drugs inside your parcel..."</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--risk-high)', fontWeight: 600 }}>Digital Arrest</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', borderRadius: '6px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>"Airtel service will disconnect. Verify Aadhar OTP code..."</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--risk-high)', fontWeight: 600 }}>KYC Phishing</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Updates live every 5s</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                View SOC Dashboard →
              </span>
            </div>
          </div>

          {/* Card 2: Rupees Saved (1 Column, 1 Row) */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Prevented Fraud Value
            </span>
            <h3 style={{ fontSize: '1.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              ₹ <AnimatedCounter value={23} /> Cr+
            </h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Estimated financial damage saved</span>
          </div>

          {/* Card 3: Model Accuracy (1 Column, 1 Row) */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              AI Shield Accuracy
            </span>
            <h3 style={{ fontSize: '1.85rem', color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              <AnimatedCounter value={94} />.3%
            </h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Tested against India scam corpus</span>
          </div>

          {/* Card 4: Helpline CTA (1 Column, 1 Row) */}
          <div
            className="glass-panel"
            style={{
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(13, 21, 38, 0.8))',
              borderColor: 'rgba(239, 68, 68, 0.2)',
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Phone size={14} color="#fca5a5" />
              <span style={{ fontSize: '0.75rem', color: '#fca5a5', fontWeight: 600 }}>Emergency Call</span>
            </div>
            <div>
              <h4 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)', margin: '0.1rem 0' }}>
                1930
              </h4>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>National Cybercrime helpline link</p>
            </div>
          </div>

          {/* Card 5: Safe Checks Count (1 Column, 1 Row) */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Checks Completed
            </span>
            <h3 style={{ fontSize: '1.85rem', color: '#ffffff', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              <AnimatedCounter value={12847} />+
            </h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Validated user requests today</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
