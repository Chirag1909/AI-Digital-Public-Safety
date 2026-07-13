import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, BookOpen, MessageSquare, History, UserCog, LayoutDashboard, Terminal, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: ShieldAlert },
    { path: '/scan', label: 'Threat Lab', icon: Terminal },
    { path: '/dashboard', label: 'SOC Dashboard', icon: LayoutDashboard },
    { path: '/history', label: 'Case Files', icon: History },
    { path: '/chat', label: 'Shield Chat', icon: MessageSquare },
    { path: '/admin/review', label: 'Review Queue', icon: UserCog },
    { path: '/learn', label: 'Encyclopedia', icon: BookOpen },
  ];

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <Link to="/" className="nav-brand">
          <ShieldAlert className="brand-icon" size={24} color="var(--accent-cyan)" style={{ filter: 'drop-shadow(0 0 4px var(--accent-cyan-glow))' }} />
          <span style={{ color: '#ffffff' }}>Cyber<span style={{ color: 'var(--accent-cyan)' }}>Rakshak</span></span>
          <span style={{ fontSize: '0.6rem', padding: '0.15rem 0.35rem', border: '1px solid var(--accent-purple)', color: 'var(--accent-purple)', borderRadius: '4px', fontWeight: 700, letterSpacing: '0.05em' }}>AI</span>
        </Link>
      </div>

      <div className="nav-links">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              <item.icon size={14} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Emergency Helpline widget */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.4rem', 
          backgroundColor: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.25)',
          padding: '0.35rem 0.75rem', 
          borderRadius: '999px',
          color: '#fca5a5',
          fontSize: '0.72rem',
          fontWeight: 600,
          whiteSpace: 'nowrap'
        }}
      >
        <Phone size={12} className="pulse-dot" style={{ backgroundColor: '#ef4444', width: '5px', height: '5px' }} />
        <span style={{ fontFamily: 'var(--font-mono)' }}>
          HELPLINE: <span style={{ color: '#ffffff', fontWeight: 700 }}>1930</span>
        </span>
      </div>
    </nav>
  );
};
