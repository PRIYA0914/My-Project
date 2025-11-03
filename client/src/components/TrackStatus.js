import React, { useState } from 'react';
import './TrackStatus.css';

export default function TrackStatus({ isOpen, onClose }) {
  const [queryId, setQueryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusResult, setStatusResult] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setStatusResult(null);

    if (!queryId.trim()) {
      setError('Please enter a complaint ID.');
      return;
    }

    setLoading(true);
    try {
      // Replace this stub with real API call:
      // const res = await fetch(`/api/complaints/${encodeURIComponent(queryId)}`);
      // const data = await res.json();

      // Simulated response
      await new Promise(r => setTimeout(r, 900));
      const states = [
        { step: 'Received', when: '2025-10-20' },
        { step: 'Under Review', when: '2025-10-21' },
        { step: 'Assigned to Officer', when: '2025-10-22' },
        { step: 'Resolved', when: '2025-10-25' }
      ];
      // pick status by hash of id to simulate variation
      const idx = Math.abs(Array.from(queryId).reduce((s,ch)=>s+ch.charCodeAt(0),0)) % states.length;
      setStatusResult({
        id: queryId,
        current: states[idx].step,
        history: states.slice(0, idx + 1)
      });
    } catch (err) {
      setError('Unable to fetch status. Try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="track-overlay" onClick={onClose}>
      <div className="track-modal" onClick={e => e.stopPropagation()}>
        <div className="track-header">
          <h3>Track Complaint Status</h3>
          <button className="close" onClick={onClose}>&times;</button>
        </div>

        <form className="track-form" onSubmit={handleSubmit}>
          <label>Complaint ID</label>
          <input
            className="track-input"
            value={queryId}
            onChange={e => setQueryId(e.target.value)}
            placeholder="Enter complaint ID (e.g. GRS163520...)"
            aria-label="Complaint ID"
          />
          <div className="track-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Checking...' : 'Track'}
            </button>
            <button type="button" className="btn-secondary" onClick={()=>{ setQueryId(''); setStatusResult(null); setError(''); }}>
              Reset
            </button>
          </div>
        </form>

        {error && <div className="track-error">{error}</div>}

        {statusResult && (
          <div className="track-result" aria-live="polite">
            <div className="kv"><strong>ID</strong><span>{statusResult.id}</span></div>
            <div className="kv"><strong>Current Status</strong><span>{statusResult.current}</span></div>

            <div className="history">
              <h4>History</h4>
              <ul>
                {statusResult.history.map((h, i) => (
                  <li key={i}><strong>{h.step}</strong> — <span className="hint">{h.when}</span></li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}