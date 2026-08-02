import { useEffect, useRef, useState } from 'react';
import './front_p.css';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { handleEmailClick } from "../Connect";
import { useRole, ROLES } from '../../context/RoleContext.jsx';

const ROLE_ORDER = ['se'];
const CYCLE_INTERVAL = 4500;

function Front_p() {
  const canvasRef = useRef(null);

  // Global role — driven by navbar clicks only
  const { activeRole, role } = useRole();

  // ── LOCAL display role for cycling ────────────────────────────────────────
  const [localRoleId, setLocalRoleId] = useState(activeRole);
  const [visible, setVisible] = useState(true);
  const localRole = ROLES[localRoleId] || role;

  // Sync local role when user clicks navbar
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setLocalRoleId(activeRole);
      setVisible(true);
    }, 300);
    return () => clearTimeout(t);
  }, [activeRole]);



  // Particle canvas (unchanged)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.45 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Hero accent = local role accent (only changes in hero)
  const accentColor = localRole.accentHex || '#00D4FF';

  // Track mouse for spotlight effect & scroll progress for avatar & name shrink & move
  const heroRef = useRef(null);
  const avatarWrapperRef = useRef(null);
  const heroNameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 350; // smooth easing over first 350px scroll
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      // Avatar smooth scale & drift
      if (avatarWrapperRef.current) {
        const scale = 1 - progress * 0.45;
        const translateX = progress * 100;
        const translateY = progress * -50;
        const opacity = 1 - progress * 0.2;
        avatarWrapperRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
        avatarWrapperRef.current.style.opacity = opacity;
      }

      // Name smooth glide towards top-left navbar
      if (heroNameRef.current) {
        const nameScale = 1 - progress * 0.48;
        const nameX = progress * -20;
        const nameY = progress * -45;
        const nameOpacity = 1 - progress * 0.85;
        heroNameRef.current.style.transform = `translate3d(${nameX}px, ${nameY}px, 0) scale(${nameScale})`;
        heroNameRef.current.style.opacity = nameOpacity;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty('--mouse-x', `${x}px`);
    heroRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="hero" id="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
      <div className="hero__orb hero__orb--cyan" />
      <div className="hero__orb hero__orb--purple" />
      <div className="hero__spotlight" />

      <div className="hero__content">
        <div className="hero__grid">
          <div className="hero__text-side">
            {/* Name — transforms to top-left on scroll */}
            <h1 className="hero__name" ref={heroNameRef}>
              Prakash <span className="gradient-text shimmer-text">Kumar</span>
            </h1>

            {/* Role Badges */}
            <div className={`hero__roles hero__fade-item ${visible ? 'hero__fade-item--in' : ''}`}
              style={{ transitionDelay: '0.05s' }}>
              {localRole.badges.map((badge) => (
                <span key={badge} className="hero__role-badge" style={{
                  borderColor: `${accentColor}55`,
                  background: `${accentColor}15`,
                  color: accentColor,
                }}>
                  {badge}
                </span>
              ))}
            </div>

            {/* Subheadline */}
            <p className={`hero__subheadline hero__fade-item ${visible ? 'hero__fade-item--in' : ''}`}
              style={{ transitionDelay: '0.1s' }}>
              {localRole.subheadline}
            </p>

            {/* CTAs — use global role for resume download */}
            <div className={`hero__ctas hero__fade-item ${visible ? 'hero__fade-item--in' : ''}`}
              style={{ transitionDelay: '0.25s' }}>
              <button className="btn-primary" onClick={() => {
                if (window.__EXPAND_VSCODE_FOLDER) {
                  window.__EXPAND_VSCODE_FOLDER('projects');
                }
                const ideEl = document.getElementById('vscode-ide-workspace') || document.getElementById('portfolio-showcase');
                if (ideEl) {
                  ideEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  const targetWorkspace = document.getElementById('vscode-ide-workspace');
                  if (targetWorkspace) {
                    targetWorkspace.classList.add('vscode-workspace--highlight');
                    setTimeout(() => {
                      targetWorkspace.classList.remove('vscode-workspace--highlight');
                    }, 2800);
                  }
                }
                setTimeout(() => {
                  const projectItems = document.querySelectorAll('.file-item[data-folder="projects"]');
                  projectItems.forEach(item => item.classList.add('project-item-blink'));
                  setTimeout(() => {
                    projectItems.forEach(item => item.classList.remove('project-item-blink'));
                  }, 3000);
                }, 300);
              }}>
                View Projects →
              </button>
              <a className="btn-secondary" href={role.resumeFile} download={role.resumeName}>
                Download Resume ↓
              </a>
            </div>

            {/* Social Links with Usernames & Mail ID */}
            <div className="hero__socials">
              <a href="https://github.com/prakashkr2894" target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub">
                <FaGithub /> <span>github.com/prakashkr2894</span>
              </a>
              <a href="https://www.linkedin.com/in/prakashkr2894/" target="_blank" rel="noopener noreferrer" className="hero__social-link hero__social-link--linkedin" aria-label="LinkedIn">
                <FaLinkedin /> <span>linkedin.com/prakashkr2894</span>
              </a>
              <a href="https://leetcode.com/u/prakashkr2894/" target="_blank" rel="noopener noreferrer" className="hero__social-link hero__social-link--leetcode" aria-label="LeetCode">
                <SiLeetcode style={{ color: '#FFA116' }} /> <span>leetcode.com/prakashkr2894</span>
              </a>
              <button onClick={handleEmailClick} className="hero__social-link hero__social-link--email" aria-label="Email">
                <FaEnvelope /> <span>prakashkr2894@gmail.com</span>
              </button>
            </div>
          </div>

          <div className="hero__image-side">
            <div className="hero__image-column">
              {/* Role indicator pill on top of image */}
              <div className="hero__role-banner hero__role-banner--right"
                style={{ borderColor: `${accentColor}55`, background: `${accentColor}12` }}>
                <span className="hero__role-banner-dot"
                  style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
                <span style={{ color: accentColor, fontWeight: 700, fontSize: '0.78rem' }}>
                  {localRole.emoji} {localRole.label}
                </span>
                <span className="hero__role-banner-sep">·</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>Open to opportunities</span>
              </div>

              <div className="hero__image-wrapper" ref={avatarWrapperRef}>
                <div className="hero__image-ring" style={{ borderColor: `${accentColor}33`, boxShadow: `0 0 30px ${accentColor}18` }} />
                <img
                  src="/resumes/prakash_photo.png"
                  alt="Prakash Kumar"
                  className="hero__image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Front_p;