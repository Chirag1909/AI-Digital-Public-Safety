import { Sparkles, Trash2 } from 'lucide-react';

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ text, setText, onSubmit, isLoading }) => {
  const loadSample = () => {
    setText(
      'Urgently contact police officer on 9821873281. Your Aadhaar card is linked to a drug parcel confiscated in Mumbai Customs. Fail to respond in 1 hour and you will be arrested under digital custody.'
    );
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
            Paste Suspicious Message, Email or Transcript
          </label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={loadSample}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-cyan)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 500
              }}
            >
              <Sparkles size={12} /> Load India Scam Sample
            </button>
            {text && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--risk-high)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500
                }}
              >
                <Trash2 size={12} /> Clear
              </button>
            )}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: Your Aadhaar is blocked. Share the OTP to verify immediately or police team will visit your address..."
            rows={7}
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: 'rgba(7, 11, 20, 0.5)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.25rem',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
              fontSize: '1rem',
              lineHeight: '1.5',
              resize: 'vertical',
              outline: 'none',
              transition: 'all 0.3s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent-cyan)';
              e.target.style.boxShadow = '0 0 12px var(--accent-cyan-glow)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {text && (
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {text.length} chars
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={isLoading || !text.trim()}
        style={{
          width: '100%',
          padding: '1rem',
          fontSize: '1.05rem',
          letterSpacing: '0.02em',
        }}
      >
        Analyze Content Security
      </button>
    </form>
  );
};
