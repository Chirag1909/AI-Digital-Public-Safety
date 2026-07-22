import React, { useState } from 'react';
import { History as HistoryIcon, Search, Download, Trash2, Calendar } from 'lucide-react';
import { mockHistoryItems } from '../data/mockHistory';
import type { HistoryItem } from '../data/mockHistory';
import { RiskBadge } from '../components/ui/RiskBadge';

export const History: React.FC = () => {
  const [items, setItems] = useState<HistoryItem[]>(mockHistoryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'safe' | 'needs_human_review' | 'high_risk'>('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Search and filter logic
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' ? true : item.risk === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const handleRowClick = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleExportCSV = () => {
    const headers = 'ID,Timestamp,Scam Category,Risk Level,Confidence Score,Text\n';
    const csvRows = items.map(
      (item) =>
        `"${item.id}","${item.timestamp}","${item.category}","${item.risk}","${item.confidence}","${item.text.replace(/"/g, '""')}"`
    );
    const blob = new Blob([headers + csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CyberRakshak_Scans_History.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history records?')) {
      setItems([]);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ zIndex: 10 }}>
      {/* Page Header */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
            <HistoryIcon size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Threat Scan History</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Historical logs of all processed scan items and model predictions.
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleExportCSV}
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', gap: '0.4rem' }}
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              onClick={handleClearHistory}
              className="btn-secondary"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.8rem',
                gap: '0.4rem',
                color: 'var(--risk-high)',
                borderColor: 'var(--risk-high-border)',
              }}
            >
              <Trash2 size={14} /> Wipe logs
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar Control */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem',
          display: 'flex',
          gap: '1.25rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: 2, minWidth: '220px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            placeholder="Search keywords or scam categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ width: '100%', paddingLeft: '2.5rem' }}
          />
        </div>

        {/* Risk Level Filter dropdown */}
        <div style={{ flex: 1, minWidth: '150px' }}>
          <select
            value={riskFilter}
            onChange={(e: any) => setRiskFilter(e.target.value)}
            className="form-input"
            style={{ width: '100%', cursor: 'pointer', background: 'rgba(7, 11, 20, 0.6)' }}
          >
            <option value="all">🔍 All Risks</option>
            <option value="safe">🟢 Safe Content</option>
            <option value="needs_human_review">🟡 Needs Review</option>
            <option value="high_risk">🔴 High Risk Scams</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      {filteredItems.length > 0 ? (
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Timestamp</th>
                <th>Category</th>
                <th>Risk Level</th>
                <th>Confidence</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const isExpanded = expandedRow === item.id;
                return (
                  <React.Fragment key={item.id}>
                    <tr onClick={() => handleRowClick(item.id)} style={{ cursor: 'pointer' }}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {item.id}
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Calendar size={12} color="var(--text-muted)" />
                          {item.timestamp}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{item.category}</td>
                      <td>
                        <RiskBadge risk={item.risk} />
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        {Math.round(item.confidence * 100)}%
                      </td>
                      <td style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 500 }}>
                        {isExpanded ? 'Collapse ▲' : 'Expand View ▼'}
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={6} style={{ background: 'rgba(255, 255, 255, 0.01)', padding: '1.5rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                                Raw Scan Payload
                              </span>
                              <p style={{ fontStyle: 'italic', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#e2e8f0', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                                "{item.text}"
                              </p>
                            </div>
                            
                            {item.redFlags.length > 0 && (
                              <div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                                  Identified Red Flags
                                </span>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                  {item.redFlags.map((flag, idx) => (
                                    <span
                                      key={idx}
                                      style={{
                                        fontSize: '0.72rem',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        background: 'rgba(239, 68, 68, 0.08)',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        color: '#fca5a5',
                                        fontFamily: 'var(--font-mono)'
                                      }}
                                    >
                                      {flag.replace(/_/g, ' ')}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: '#ffffff' }}>No Cases Found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            No scan items matched search filter parameters. Try checking for different keywords.
          </p>
        </div>
      )}
    </div>
  );
};
export default History;
