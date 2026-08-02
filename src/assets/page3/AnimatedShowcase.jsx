import React, { useState, useRef, useEffect } from 'react';
import './AnimatedShowcase.css';
import { FaRocket, FaCertificate, FaGlobe, FaGithub } from 'react-icons/fa';
import Hls from 'hls.js';

function AnimatedShowcase({ projects, certificates }) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeCertIdx, setActiveCertIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const videoRefs = useRef({});
  const playTimerRef = useRef(null);

  // 1-second delay timer: Shows project image for 1s when expanded, then starts video playback smoothly
  useEffect(() => {
    setShowVideo(false);
    if (playTimerRef.current) clearTimeout(playTimerRef.current);

    Object.keys(videoRefs.current).forEach((key) => {
      const vid = videoRefs.current[key];
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    });

    playTimerRef.current = setTimeout(() => {
      setShowVideo(true);
      const activeProj = projects[activeProjectIdx];
      const activeVid = videoRefs.current[activeProjectIdx];
      if (activeVid && activeProj) {
        activeVid.muted = true;
        const hlsUrl = activeProj.hlsVideo;

        if (hlsUrl && Hls.isSupported()) {
          const hls = new Hls({ maxBufferLength: 20 });
          hls.loadSource(hlsUrl);
          hls.attachMedia(activeVid);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            activeVid.play().catch(() => {});
          });
        } else if (hlsUrl && activeVid.canPlayType('application/vnd.apple.mpegurl')) {
          activeVid.src = hlsUrl;
          activeVid.play().catch(() => {});
        } else {
          activeVid.play().catch(() => {});
        }
      }
    }, 1000);

    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, [activeProjectIdx, projects]);

  const handleProjectClick = (project, idx) => {
    if (activeProjectIdx === idx) {
      const slug = project.title.toLowerCase().replace(/\s+/g, '-');
      window.history.pushState(null, '', `/${slug}`);
      window.dispatchEvent(new Event('popstate'));
    } else {
      setActiveProjectIdx(idx);
    }
  };

  const handleCertClick = (cert, idx) => {
    if (activeCertIdx === idx && cert.link) {
      window.open(cert.link, '_blank', 'noopener,noreferrer');
    } else {
      setActiveCertIdx(idx);
    }
  };

  return (
    <div className="animated-showcase">
      {/* ── 1. PROJECTS SECTION ── */}
      <div className="animated-section-block" id="live-projects-section">
        <div className="animated-section-header">
          <h3 className="animated-section-title">
            <FaRocket className="section-title-icon" /> Live Projects
          </h3>
          <p className="animated-section-desc">Click any project card to expand • Video plays automatically after 1 second</p>
        </div>

        <div className="animated-options">
          {projects.map((project, idx) => {
            const isActive = idx === activeProjectIdx;

            return (
              <div
                key={project.title}
                className={`animated-option ${isActive ? 'active' : ''}`}
                style={{ backgroundImage: `url(${project.image})` }}
                onClick={() => handleProjectClick(project, idx)}
              >
                {!isActive && (
                  <div className="animated-collapsed-overlay">
                    <span className="animated-collapsed-title">{project.title}</span>
                    <span className="animated-collapsed-hint">Expand ↗</span>
                  </div>
                )}

                <div className={`animated-active-split-view ${isActive ? 'is-visible' : ''}`}>
                  {/* Left Pane: Compact Uncropped Video Frame + Action Bar Below */}
                  <div className="animated-card-video-pane">
                    <div className="animated-video-container">
                      <div className="animated-video-frame">
                        {/* Cover Image displayed for first 1 second */}
                        <img
                          src={project.image}
                          alt={project.title}
                          className={`animated-compact-img ${showVideo && project.shortVideo ? 'is-faded' : 'is-visible'}`}
                        />

                        {/* Video smoothly fades in & plays after 1 second */}
                        {project.shortVideo && (
                          <video
                            ref={(el) => {
                              videoRefs.current[idx] = el;
                              if (el) el.muted = true;
                            }}
                            src={project.shortVideo}
                            className={`animated-compact-video ${showVideo ? 'is-visible' : 'is-faded'}`}
                            loop
                            muted
                            defaultMuted
                            playsInline
                          />
                        )}
                      </div>

                      {/* Action Buttons Below Video */}
                      <div className="animated-video-actions-below">
                        <button
                          className="animated-btn animated-btn-overview"
                          onClick={(e) => {
                            e.stopPropagation();
                            const slug = project.title.toLowerCase().replace(/\s+/g, '-');
                            window.history.pushState(null, '', `/${slug}`);
                            window.dispatchEvent(new Event('popstate'));
                          }}
                          title="Overview this project (Full Showcase Page)"
                        >
                          📜 Overview ↗
                        </button>

                        {project.website && (
                          <button
                            className="animated-btn animated-btn-live"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.website, '_blank', 'noopener,noreferrer');
                            }}
                            title="Visit Live Website"
                          >
                            <FaGlobe /> Live ↗
                          </button>
                        )}

                        <button
                          className="animated-btn animated-btn-github"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.github || 'https://github.com/prakashkr2894', '_blank', 'noopener,noreferrer');
                          }}
                          title="View GitHub Repository"
                        >
                          <FaGithub /> GitHub ↗
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Pane: Project Tech Specs & Architecture */}
                  <div className="animated-card-tech-pane">
                    <h4 className="animated-tech-title">{project.title}</h4>
                    <p className="animated-tech-desc">{project.description}</p>

                    <div className="animated-tech-grid">
                      <div className="animated-tech-item">
                        <span className="animated-tech-label">⚡ Frontend:</span>
                        <span className="animated-tech-val">{project.techSpecs?.frontend || 'Next.js / React.js'}</span>
                      </div>
                      <div className="animated-tech-item">
                        <span className="animated-tech-label">🍃 Backend & DB:</span>
                        <span className="animated-tech-val">{project.techSpecs?.backend || 'FastAPI, MongoDB'}</span>
                      </div>
                      <div className="animated-tech-item">
                        <span className="animated-tech-label">🧠 AI & Voice:</span>
                        <span className="animated-tech-val">{project.techSpecs?.aiVoice || 'RAG Model, AssemblyAI'}</span>
                      </div>
                      <div className="animated-tech-item">
                        <span className="animated-tech-label">🚀 DevOps & Infra:</span>
                        <span className="animated-tech-val">{project.techSpecs?.infra || 'Personal VPS, Docker, Kubernetes, PM2'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`shadow ${isActive ? 'is-active-shadow' : ''}`} />
                <div className={`label ${isActive ? 'is-active-label' : ''}`}>
                  <div className="info">
                    <div className="main">{project.title}</div>
                    <div className="sub">
                      {project.tags && project.tags.length > 0 ? project.tags.slice(0, 3).join(' • ') : 'Full-Stack'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 2. CERTIFICATES SECTION ── */}
      <div className="animated-section-block animated-cert-block" id="certificates-section">
        <div className="animated-section-header">
          <h3 className="animated-section-title">
            <FaCertificate className="section-title-icon" /> Certifications & Credentials
          </h3>
          <p className="animated-section-desc">Click any certificate to expand • Click again to verify credential</p>
        </div>

        <div className="animated-options">
          {certificates.map((cert, idx) => {
            const isActive = idx === activeCertIdx;

            return (
              <div
                key={cert.title}
                className={`animated-option ${isActive ? 'active' : ''}`}
                style={{ backgroundImage: `url(${isActive && cert.certImage ? cert.certImage : cert.image})` }}
                onClick={() => handleCertClick(cert, idx)}
              >
                {!isActive && (
                  <div className="animated-collapsed-overlay">
                    <span className="animated-collapsed-title">{cert.title}</span>
                    <span className="animated-collapsed-hint">Expand ↗</span>
                  </div>
                )}

                {isActive && (
                  <div className="animated-cert-full-view">
                    <img
                      src={cert.certImage || cert.image}
                      alt={cert.title}
                      className="animated-cert-img"
                    />
                  </div>
                )}

                <div className="shadow" />

                <div className="animated-action-badge">
                  {isActive ? 'Click again to verify credential ↗' : 'Click to expand'}
                </div>

                <div className="label">
                  <div className="info">
                    <div className="main">{cert.title}</div>
                    <div className="sub">{cert.issuer} • {cert.date} ({cert.tag})</div>
                  </div>

                  {isActive && cert.link && (
                    <div className="animated-card-buttons">
                      <button
                        className="animated-btn animated-btn-live"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(cert.link, '_blank', 'noopener,noreferrer');
                        }}
                        title="Verify Credential"
                      >
                        Verify Credential ↗
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AnimatedShowcase;
