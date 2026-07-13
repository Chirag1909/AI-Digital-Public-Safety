import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { LiveIndicator } from '../components/ui/LiveIndicator';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Greetings. I am CyberRakshak AI Scam Prevention Cop. Share details of any SMS, caller claim, or refund request you received. I will help evaluate security threat vectors.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'How does a Digital Arrest scam work?',
    'I received a courier parcel pending charge call. Is it fake?',
    'What should I do if I shared my OTP pin?',
    'Can CBI arrest me on a WhatsApp video call?',
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { sender: 'user', text: textToSend, timestamp };
    
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate Streaming reply response from BOT
    setTimeout(() => {
      let botReply = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('digital arrest') || lower.includes('cbi')) {
        botReply = '⚠️ DIGITAL ARREST ALERT: Under Indian Law, NO government department (CBI, Customs, ED, or Police) can place you under "Digital Arrest" over Skype or WhatsApp. Police officers will never ask you to keep your camera on or demand cash verification transfers. If someone claims this, hang up immediately and dial 1930.';
      } else if (lower.includes('courier') || lower.includes('parcel')) {
        botReply = '📦 COURIER SCAM ALERT: Scammers pose as FedEx or India Post officials, claiming your parcel has contraband. They ask you to connect to a "Customs Officer" to avoid arrest. Verify parcel details directly with the official courier using details you know are correct, NOT the numbers provided in the text/call.';
      } else if (lower.includes('otp') || lower.includes('shared')) {
        botReply = '🔒 EMERGENCY ACTIONS: If you shared bank OTP or UPI PIN pins: \n1. Freeze your bank account immediately using netbanking or official helplines. \n2. Report details on NCRP (cybercrime.gov.in) or call 1930. \n3. Block your debit card/credit cards.';
      } else {
        botReply = '🔍 SCAN RECOMMENDATION: I recommend pasting this message into our [Threat Lab](/scan) scanner. The system will run real-time NLP classification models to identify specific threat indicators, urgency scores, and author mockups.';
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '840px', zIndex: 10 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              padding: '0.65rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.15)',
              color: 'var(--accent-brand)',
              display: 'flex',
            }}
          >
            <Bot size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Shield AI Assistant</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Interactive advisor for scam prevention and safety reporting checklists.
            </p>
          </div>
        </div>

        <LiveIndicator label="Cop Live" />
      </div>

      {/* Main Terminal panel */}
      <div className="chat-container">
        {/* Messages feed stream */}
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.sender}`}>
              <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{msg.text}</p>
              <span
                style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  display: 'block',
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  marginTop: '0.4rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {msg.timestamp}
              </span>
            </div>
          ))}
          
          {/* Typing dot dots loader */}
          {isTyping && (
            <div className="chat-bubble bot" style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', padding: '0.75rem 1rem' }}>
              <span className="pulse-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-secondary)' }} />
              <span className="pulse-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-secondary)', animationDelay: '0.2s' }} />
              <span className="pulse-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-secondary)', animationDelay: '0.4s' }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion cards row */}
        {messages.length === 1 && (
          <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              💡 Common Scam Queries:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }} className="responsive-grid">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="btn-secondary"
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.78rem',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.03)',
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar form control */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          style={{
            padding: '1.25rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: '0.75rem',
          }}
        >
          <input
            type="text"
            placeholder="Ask AI Cop about scams: e.g. Is this WhatsApp caller real?..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            className="form-input"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn-primary" disabled={isTyping || !input.trim()} style={{ padding: '0.75rem 1.25rem' }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
export default Chat;
