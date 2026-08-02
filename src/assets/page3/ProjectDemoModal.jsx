import React, { useEffect } from 'react';
import './ProjectDemoModal.css';

function ProjectDemoModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div className="demo-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="demo-modal-header">
          <div className="demo-modal-title-group">
            <span className="demo-modal-badge">🎬 Project Demonstration</span>
            <h2 className="demo-modal-title">{project.title}</h2>
          </div>
          <button className="demo-modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="demo-modal-body">
          {/* Video / Demo Showcase Section */}
          <div className="demo-modal-video-section">
            <div className="demo-video-wrapper">
              {project.videoUrl ? (
                <iframe
                  src={project.videoUrl}
                  title={`${project.title} Video Walkthrough`}
                  className="demo-video-iframe"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="demo-video-placeholder">
                  <div className="demo-placeholder-icon">🎥</div>
                  <h3>Video Walkthrough Coming Soon</h3>
                  <p>A complete video walkthrough & demonstration for {project.title} will be uploaded shortly.</p>
                </div>
              )}
            </div>
            <div className="demo-video-caption">
              <span>💡 Interactive Video Walkthrough & Feature Breakdown</span>
              <div className="demo-quick-links">
                {project.website && (
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="demo-caption-link">
                    🌐 Open Website ↗
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="demo-caption-link">
                    💻 GitHub Repo ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* 2-Column Content Grid */}
          <div className="demo-modal-grid">
            {/* Shipped / Current Features */}
            <div className="demo-features-card">
              <h3 className="demo-section-heading">
                <span className="demo-heading-icon">✨</span> Features Implemented
              </h3>
              <ul className="demo-features-list">
                {project.features && project.features.length > 0 ? (
                  project.features.map((feature, idx) => (
                    <li key={idx} className="demo-feature-item">
                      <span className="demo-feature-check">✓</span>
                      <span className="demo-feature-text">{feature}</span>
                    </li>
                  ))
                ) : (
                  <li className="demo-feature-item">
                    <span className="demo-feature-check">✓</span>
                    <span className="demo-feature-text">Production-grade architecture & responsive layout</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Upcoming Features & Roadmap */}
            <div className="demo-roadmap-card">
              <h3 className="demo-section-heading">
                <span className="demo-heading-icon">🚀</span> Upcoming Features & Roadmap
              </h3>
              <div className="demo-roadmap-list">
                {project.upcomingFeatures && project.upcomingFeatures.length > 0 ? (
                  project.upcomingFeatures.map((item, idx) => (
                    <div key={idx} className="demo-roadmap-item">
                      <div className="demo-roadmap-top">
                        <span className="demo-roadmap-title">{item.title}</span>
                        <span className={`demo-roadmap-badge status-${item.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                          {item.status || 'Planned'}
                        </span>
                      </div>
                      {item.target && <span className="demo-roadmap-target">Target: {item.target}</span>}
                    </div>
                  ))
                ) : (
                  <div className="demo-roadmap-item">
                    <div className="demo-roadmap-top">
                      <span className="demo-roadmap-title">Enhanced Analytics & Performance Dashboard</span>
                      <span className="demo-roadmap-badge status-planned">Planned Q3 2026</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="demo-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close Showcase
          </button>
          <div className="demo-footer-actions">
            {project.website && (
              <a href={project.website} target="_blank" rel="noopener noreferrer" className="btn-primary">
                🌐 Visit Website ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDemoModal;
