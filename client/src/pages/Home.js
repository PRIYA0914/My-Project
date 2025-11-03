import React, { useState } from 'react';
import Header from '../components/Header';
import ComplaintForm from '../components/ComplaintForm';
import TrackStatus from '../components/TrackStatus';
import { complaintService } from '../services/api';
import './Home.css';

export default function Home() {
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenComplaint = () => {
    setIsComplaintModalOpen(true);
  };

  const handleCloseComplaint = () => {
    setIsComplaintModalOpen(false);
  };

  const handleOpenTrack = () => {
    setIsTrackOpen(true);
  };

  const handleCloseTrack = () => {
    setIsTrackOpen(false);
  };

  const handleComplaintSubmit = async (complaintData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await complaintService.submitComplaint(complaintData);
      alert(`Complaint submitted successfully! Your complaint ID is: ${result.complaintId}`);
      handleCloseComplaint();
    } catch (err) {
      setError(err.message || 'Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackStatus = async (complaintId) => {
    setLoading(true);
    setError(null);
    
    try {
      const status = await complaintService.trackComplaint(complaintId);
      return status;
    } catch (err) {
      setError(err.message || 'Failed to fetch complaint status. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Header />
      
      <div className="home-content">
        <section className="hero-section">
          <div className="hero-left">
            <h1>AI-BASED GRIEVANCE REDRESSAL SYSTEM</h1>
            <p>Empowering citizens with intelligent complaint management through artificial intelligence for faster, more efficient grievance resolution.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={handleOpenComplaint}>
                File a Complaint
              </button>
              <button className="btn-ghost-alt" onClick={handleOpenTrack}>
                Track Status
              </button>
            </div>
          </div>

          <div className="hero-right">
            <div className="big-text">GRIEVANCE<br/>REDRESSAL<br/>SYSTEM</div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">15,000+</div>
              <div className="stat-label">Complaints Resolved</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24 hrs</div>
              <div className="stat-label">Average Response Time</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why Choose Our Platform?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Analysis</h3>
              <p>Advanced AI algorithms analyze and categorize complaints for faster resolution.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Confidential</h3>
              <p>Your data is protected with end-to-end encryption and strict privacy protocols.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Real-time Tracking</h3>
              <p>Track your complaint status in real-time with detailed progress updates.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Resolution</h3>
              <p>Streamlined process ensures faster complaint resolution and response times.</p>
            </div>
          </div>
        </section>
      </div>

      {error && (
        <div className="error-toast">
          {error}
          <button onClick={() => setError(null)}>&times;</button>
        </div>
      )}

      <ComplaintForm
        isOpen={isComplaintModalOpen}
        onClose={handleCloseComplaint}
        onSubmit={handleComplaintSubmit}
        isLoading={loading}
      />
      <TrackStatus 
        isOpen={isTrackOpen}
        onClose={handleCloseTrack}
        onTrack={handleTrackStatus}
        isLoading={loading}
      />
    </div>
  );
}