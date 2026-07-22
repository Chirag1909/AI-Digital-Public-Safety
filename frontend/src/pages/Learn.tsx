import React, { useState } from 'react';
import { BookOpen, Award, Check, X, RefreshCw } from 'lucide-react';
import { scamEncyclopedia } from '../data/scamTypes';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const Learn: React.FC = () => {
  const [activeScamId, setActiveScamId] = useState<string>(scamEncyclopedia[0].id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const activeScam = scamEncyclopedia.find((s) => s.id === activeScamId) || scamEncyclopedia[0];

  const quizQuestions: QuizQuestion[] = [
    {
      question: 'A police officer calls claiming your mobile number is registered to a drug courier case, demanding you connect to Skype video call. What do you do?',
      options: [
        'Connect immediately to cooperate and clear your name.',
        'Hang up instantly. Government agencies do not conduct investigations or arrests over WhatsApp/Skype.',
        'Transfer cash validation deposits to their verification bank accounts.',
      ],
      answer: 1,
      explanation: 'Police or Customs never place anyone under digital arrest or ask for funds transfers to resolve issues.',
    },
    {
      question: 'Someone calls claiming they sent Rs 5,000 to your GPay by mistake and asks you to enter your UPI PIN to refund them. What happens?',
      options: [
        'You will receive the Rs 5,000 back in your balance.',
        'Entering your UPI PIN will authorize a DEBIT, causing money to be stolen from your account.',
        'It is a standard confirmation procedure and completely safe.',
      ],
      answer: 1,
      explanation: 'UPI PIN is ONLY entered to SEND money or make payments. You never need it to receive payments.',
    },
    {
      question: 'You receive a text from a standard 10-digit number stating your SIM card KYC expired and service will end in 2 hours. What should you do?',
      options: [
        'Call the number listed in the text immediately.',
        'Ignore it or check SIM status directly at an official Airtel/Jio store or app.',
        'Share the verification OTP code you receive shortly.',
      ],
      answer: 1,
      explanation: 'Telecom operators send alerts via official shortcodes (e.g. AD-JIOKYC), never standard 10-digit numbers.',
    },
  ];

  const handleQuizAnswer = (qIdx: number, oIdx: number) => {
    if (showResults) return;
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: oIdx });
  };

  const getScore = () => {
    return Object.keys(selectedAnswers).reduce((acc, qIdx) => {
      const idx = parseInt(qIdx);
      return selectedAnswers[idx] === quizQuestions[idx].answer ? acc + 1 : acc;
    }, 0);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="container animate-fade-in" style={{ zIndex: 10 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div
          style={{
            padding: '0.65rem',
            borderRadius: '10px',
            backgroundColor: 'rgba(6, 182, 212, 0.08)',
            border: '1px solid rgba(6, 182, 212, 0.15)',
            color: 'var(--accent-cyan)',
            display: 'flex',
          }}
        >
          <BookOpen size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Scam awareness Encyclopedia</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Learn the anatomy of popular Indian cyber-frauds and test your defenses.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 2fr',
          gap: '2rem',
          marginBottom: '3rem',
        }}
        className="responsive-grid"
      >
        {/* Left: Categories selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Scam Directory
          </span>
          {scamEncyclopedia.map((scam) => {
            const isActive = activeScamId === scam.id;
            return (
              <div
                key={scam.id}
                onClick={() => setActiveScamId(scam.id)}
                className="glass-panel"
                style={{
                  padding: '1.25rem',
                  cursor: 'pointer',
                  background: isActive ? 'rgba(6, 182, 212, 0.05)' : 'rgba(13, 21, 38, 0.5)',
                  borderColor: isActive ? 'rgba(6, 182, 212, 0.3)' : 'var(--border-color)',
                  transition: 'all 0.2s',
                }}
              >
                <h4 style={{ fontSize: '1.05rem', color: isActive ? '#ffffff' : 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                  {scam.name}
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{scam.hindiName}</p>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Content layout */}
        {activeScam && (
          <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(13, 21, 38, 0.7)' }}>
            <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.5rem' }}>{activeScam.name}</h2>
            <p style={{ fontStyle: 'italic', color: 'var(--accent-cyan)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              {activeScam.hindiName}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {activeScam.longDesc}
            </p>

            {/* Steps detail */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                How Scammers Operate
              </h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {activeScam.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>

            {/* Red flags */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                Red Flags to Watch For
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {activeScam.redFlags.map((flag, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.88rem', color: '#fca5a5' }}>
                    <span>🚨</span>
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action guidelines */}
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '1.1rem',
                borderRadius: '8px',
              }}
            >
              <h4 style={{ color: 'var(--risk-safe)', marginBottom: '0.4rem', fontSize: '0.92rem' }}>
                🛡️ Mitigation & Prevention Actions
              </h4>
              <ul style={{ paddingLeft: '1.1rem', fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {activeScam.mitigation.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Scam IQ Quiz Card */}
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.04))',
          borderColor: 'rgba(99, 102, 241, 0.2)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Award size={24} color="var(--risk-review)" />
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Scam IQ Defense Quiz</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {quizQuestions.map((q, qIdx) => {
            return (
              <div key={qIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ fontSize: '1rem', color: '#ffffff' }}>
                  {qIdx + 1}. {q.question}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[qIdx] === oIdx;
                    let optStyle: React.CSSProperties = {
                      background: 'rgba(7, 11, 20, 0.4)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-secondary)',
                    };

                    if (isSelected) {
                      optStyle = {
                        background: 'rgba(99, 102, 241, 0.15)',
                        borderColor: 'var(--accent-brand)',
                        color: '#ffffff',
                      };
                    }

                    if (showResults) {
                      if (oIdx === q.answer) {
                        optStyle = {
                          background: 'rgba(16, 185, 129, 0.15)',
                          borderColor: 'var(--risk-safe)',
                          color: '#ffffff',
                        };
                      } else if (isSelected) {
                        optStyle = {
                          background: 'rgba(239, 68, 68, 0.15)',
                          borderColor: 'var(--risk-high)',
                          color: '#ffffff',
                        };
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleQuizAnswer(qIdx, oIdx)}
                        className="form-input"
                        disabled={showResults}
                        style={{
                          textAlign: 'left',
                          cursor: showResults ? 'not-allowed' : 'pointer',
                          padding: '0.75rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          ...optStyle,
                        }}
                      >
                        <span>{opt}</span>
                        {showResults && oIdx === q.answer && <Check size={16} color="var(--risk-safe)" />}
                        {showResults && isSelected && oIdx !== q.answer && <X size={16} color="var(--risk-high)" />}
                      </button>
                    );
                  })}
                </div>
                {showResults && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.2rem' }}>
                    💡 Explanation: {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Results controls */}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              className="btn-primary"
              disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
            >
              Verify Quiz Answers
            </button>
          ) : (
            <>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                Your Score: {getScore()} / {quizQuestions.length}
              </span>
              <button onClick={resetQuiz} className="btn-secondary" style={{ gap: '0.4rem', fontSize: '0.85rem' }}>
                <RefreshCw size={14} /> Retry Quiz
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Learn;
