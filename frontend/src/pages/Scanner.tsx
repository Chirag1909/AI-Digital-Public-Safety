import React, { useState } from 'react';
import { TextInput } from '../components/scanner/TextInput';
import { ImageUpload } from '../components/scanner/ImageUpload';
import { ResultCard } from '../components/scanner/ResultCard';
import { apiClient } from '../api/client';
import type { ClassificationResponse } from '../api/client';
import { Cpu } from 'lucide-react';
import { LiveIndicator } from '../components/ui/LiveIndicator';

export const Scanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [text, setText] = useState('');
  const [result, setResult] = useState<ClassificationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await apiClient.classifyText(text);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze threat telemetry. Please verify backend service status.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeImage = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await apiClient.classifyImage(file);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError('Failed to process image screenshot. Verify OCR service configurations.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ zIndex: 10, maxWidth: '1240px' }}>
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <Cpu size={16} color="var(--accent-cyan)" />
            <LiveIndicator label="Neural Inference Engine V2" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, fontFamily: 'var(--font-display)' }}>Threat Lab Terminal</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Verify suspect transcripts and screenshot logs under forensic parameters.
          </p>
        </div>
      </div>

      {/* Split Pane Command Workspace */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
        className="responsive-grid"
      >
        {/* Left Pane: Interactive Terminal Input Console */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: '520px', background: 'rgba(13, 21, 38, 0.7)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff' }}>
              🔬 Telemetry Input
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  if (!isLoading) {
                    setActiveTab('text');
                    setResult(null);
                    setError(null);
                  }
                }}
                className={activeTab === 'text' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem', borderRadius: '6px' }}
              >
                Script
              </button>
              <button
                onClick={() => {
                  if (!isLoading) {
                    setActiveTab('image');
                    setResult(null);
                    setError(null);
                  }
                }}
                className={activeTab === 'image' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem', borderRadius: '6px' }}
              >
                OCR Image
              </button>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {activeTab === 'text' ? (
              <TextInput
                text={text}
                setText={setText}
                onSubmit={handleAnalyzeText}
                isLoading={isLoading}
              />
            ) : (
              <ImageUpload onAnalyzeImage={handleAnalyzeImage} isLoading={isLoading} />
            )}
          </div>

          {error && (
            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                color: '#fca5a5',
                fontSize: '0.8rem',
                textAlign: 'center',
              }}
            >
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Right Pane: Diagnostic Output Radar or Result Report */}
        <div style={{ minHeight: '520px', display: 'flex', flexDirection: 'column' }}>
          {result ? (
            <div style={{ marginTop: 0 }}>
              <ResultCard result={result} />
            </div>
          ) : (
            /* Diagnostic Radar Animation Placeholder */
            <div
              className="glass-panel"
              style={{
                flex: 1,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'rgba(13, 21, 38, 0.55)',
                minHeight: '520px',
              }}
            >
              {/* Animated Radar Circle */}
              <div style={{ position: 'relative', width: '180px', height: '180px', marginBottom: '2rem' }}>
                {/* Outermost grid circle */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '1px solid rgba(6, 182, 212, 0.1)',
                  }}
                />
                {/* Medium grid circle */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    border: '1px solid rgba(6, 182, 212, 0.15)',
                  }}
                />
                {/* Inner grid circle */}
                <div
                  style={{
                    position: 'absolute',
                    top: '45px',
                    left: '45px',
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                  }}
                />
                {/* Centered crosshairs */}
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', background: 'rgba(6, 182, 212, 0.15)' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: '1px', background: 'rgba(6, 182, 212, 0.15)' }} />
                
                {/* Pulsing center point */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '8px',
                    height: '8px',
                    background: 'var(--accent-cyan)',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 10px var(--accent-cyan)',
                  }}
                  className="pulse-dot"
                />

                {/* Sweeping Radar Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '90px',
                    height: '90px',
                    transformOrigin: '0% 0%',
                    background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.3) 0%, transparent 60%)',
                    borderRadius: '0 100% 0 0',
                    animation: 'radar-sweep 4s linear infinite',
                  }}
                />
              </div>

              <h4 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                {isLoading ? 'Scanning Feed...' : 'Awaiting Scan Telemetry'}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '300px', margin: '0 auto' }}>
                {isLoading
                  ? 'Analyzing textual patterns, authorities references, and pressure timelines...'
                  : 'Load a scam message or upload a screenshot to activate the forensic report console.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Scanner;
