import React, { useState, useEffect, useRef } from 'react';
import './ProjectDemoPage.css';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import VoiceArchitectureFlow from './VoiceArchitectureFlow';
import Hls from 'hls.js';

function ProjectDemoPage({ project, onBack }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project]);

  // Initialize HLS Chunk Streaming
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !project) return;

    const hlsUrl = project.hlsVideo;
    if (hlsUrl && Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 30,
        enableWorker: true,
      });
      hls.loadSource(hlsUrl);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoEl.play().catch(() => {});
      });
      return () => {
        hls.destroy();
      };
    } else if (hlsUrl && videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = hlsUrl;
    }
  }, [project]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleExpand = () => {
    setIsVideoExpanded(!isVideoExpanded);
  };

  const handleFullscreen = (e) => {
    if (e) e.stopPropagation();
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (videoEl.requestFullscreen) {
      videoEl.requestFullscreen().catch(() => {});
    } else if (videoEl.webkitRequestFullscreen) {
      videoEl.webkitRequestFullscreen();
    } else if (videoEl.msRequestFullscreen) {
      videoEl.msRequestFullscreen();
    } else if (videoEl.webkitEnterFullscreen) {
      videoEl.webkitEnterFullscreen();
    }
  };

  const [activeTechTab, setActiveTechTab] = useState('frontend');

  const techDomains = {
    frontend: {
      id: 'frontend',
      label: '🎨 Frontend',
      badgeClass: 'badge-cyan',
      techs: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind v4', 'Radix UI', 'GSAP'],
    },
    backend: {
      id: 'backend',
      label: '⚡ Backend',
      badgeClass: 'badge-blue',
      techs: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Socket.io', 'JWT & OAuth', 'Brevo SDK', 'Razorpay SDK'],
    },
    deploy: {
      id: 'deploy',
      label: '🚀 Deployment',
      badgeClass: 'badge-green',
      techs: ['Docker', 'Kubernetes', 'GitHub Actions', 'PM2'],
    },
    ai: {
      id: 'ai',
      label: '🧠 AI',
      badgeClass: 'badge-purple',
      techs: ['Python 3', 'FastAPI', 'AssemblyAI', 'Faster-Whisper', 'OpenAI / OpenRouter'],
    },
  };

  if (!project) return null;

  return (
    <div className="project-demo-page">
      {/* Top Header Bar with Top-Left Back Button */}
      <header className="demo-page-header">
        <div className="demo-page-header-inner">
          <button className="demo-back-btn" onClick={onBack} aria-label="Back to Portfolio">
            <span className="back-arrow">←</span> Back to Portfolio
          </button>

          <div className="demo-header-title">
            <h1 className="demo-header-name">{project.title}</h1>
          </div>

          <div className="demo-header-actions">
            {project.website && (
              <a href={project.website} target="_blank" rel="noopener noreferrer" className="btn-primary header-card-btn">
                🌐 Live - {project.website.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
              </a>
            )}
            <a
              href={project.github || 'https://github.com/prakashkr2894'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-code header-card-btn"
            >
              💻 GitHub Source ↗
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="demo-page-content">
        <div className="demo-page-inner">
          {/* Top Banner & Overview */}
          <div className="demo-hero-card">
            <div className="demo-hero-info">
              <div className="demo-hero-tags">
                {project.tags && project.tags.map(tag => (
                  <span key={tag} className={`project-tag-custom tag-${project.tagColor}`}>{tag}</span>
                ))}
              </div>
              <h2 className="demo-hero-title">{project.title}</h2>
              <p className="demo-hero-desc">{project.description}</p>
            </div>
          </div>

          {/* Demonstration Section Header */}
          <div className="demo-section-header demo-header-centered">
            <span className="section-label">Demonstration</span>
          </div>

          <div className={`demo-video-container-card ${isVideoExpanded ? 'has-expanded-video' : ''}`}>
            <div className="demo-video-flex-row">
              <div
                className={`demo-video-frame-wrap ${isVideoExpanded ? 'is-expanded' : 'is-compact'}`}
                onMouseEnter={() => setIsVideoExpanded(true)}
                onMouseLeave={() => setIsVideoExpanded(false)}
              >
                {project.shortVideo || (project.videoUrl && (project.videoUrl.includes('.mp4') || project.videoUrl.includes('cloudinary'))) ? (
                  <>
                    <video
                      ref={(el) => {
                        videoRef.current = el;
                        if (el) el.muted = isMuted;
                      }}
                      src={project.shortVideo || project.videoUrl}
                      title={`${project.title} Video Walkthrough`}
                      className="demo-mp4-video"
                      autoPlay
                      loop
                      muted={isMuted}
                      defaultMuted
                      playsInline
                      onClick={togglePlay}
                    />
                  </>
                ) : project.videoUrl ? (
                  <iframe
                    src={project.videoUrl}
                    title={`${project.title} Video Walkthrough`}
                    className="demo-video-frame"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="demo-video-placeholder-box">
                    <div className="demo-placeholder-icon">🎥</div>
                    <h3>Video Walkthrough Coming Soon</h3>
                    <p>A full video demonstration for {project.title} will be uploaded shortly.</p>
                  </div>
                )}
              </div>

              {/* Right Side Technologies Panel (Shown when video is compact / not expanded) */}
              {!isVideoExpanded && (
                <div className="demo-video-tech-side-panel">
                  <div className="tech-panel-header">
                    <span className="tech-panel-badge">Tech Stack</span>
                    <h4 className="tech-panel-title">⚡ Core Architecture</h4>
                  </div>

                  {/* Top 4 Domain Filter Buttons: Frontend | Backend | Deploy | AI */}
                  <div className="tech-domain-tab-buttons">
                    {Object.values(techDomains).map((domain) => (
                      <button
                        key={domain.id}
                        className={`tech-domain-btn ${activeTechTab === domain.id ? 'is-active ' + domain.badgeClass : ''}`}
                        onClick={() => setActiveTechTab(domain.id)}
                      >
                        {domain.label}
                      </button>
                    ))}
                  </div>

                  {/* Display Tech Pills for Active Domain */}
                  <div className="tech-group-pills active-domain-pills">
                    {techDomains[activeTechTab].techs.map((tech, idx) => (
                      <span key={idx} className={`tech-badge ${techDomains[activeTechTab].badgeClass}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* GSAP Architecture Flow — only shown for TickZen (Zentrixa-AI specific) */}
      {project.title === 'Tickzen' && (
        <div className="demo-flow-outer">
          <VoiceArchitectureFlow />
        </div>
      )}
    </div>
  );
}

export default ProjectDemoPage;
