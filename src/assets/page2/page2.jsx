import React, { useRef, useEffect } from 'react';
import './page2.css';
import { useRole } from '../../context/RoleContext.jsx';
import Skills from '../page1/skills/skills.jsx';

const stats = [
    { value: 4, label: 'Live Projects', desc: 'Shipped live', icon: '🚀' },
    { value: '6+2 Months', label: 'Internship Experience', desc: 'Hands-on industry work', icon: '🎓' },
    { value: 6, label: 'Certificates', desc: 'Professional credentials', icon: '🏅' },
];

function Page2() {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    const { role } = useRole();

    // Reveal on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
                else entry.target.classList.remove('visible');
            },
            { threshold: 0.12 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    // Animated counters (only for numeric values)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const numEl = entry.target.querySelector('.stat-number:not(.stat-number--text)');
                        if (!numEl) return;
                        const targetStr = numEl.getAttribute('data-value');
                        if (!targetStr || isNaN(targetStr)) return;
                        const target = parseInt(targetStr, 10);
                        let count = 0;
                        const step = Math.ceil(target / 30);
                        const timer = setInterval(() => {
                            count = Math.min(count + step, target);
                            numEl.textContent = count;
                            if (count >= target) clearInterval(timer);
                        }, 40);
                    }
                });
            },
            { threshold: 0.4 }
        );
        cardRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
        return () => cardRefs.current.forEach((ref) => { if (ref) observer.unobserve(ref); });
    }, []);

    const headingLines = role.aboutHeading.split('\n');

    return (
        <section className="about-skills-section" id="aboutw">
            <div className="about-skills-inner" ref={sectionRef}>
                <div className="about-block">
                    <p className="section-label">ABOUT ME</p>
                    <h2 className="about-heading">
                        {headingLines[0]}
                        {headingLines[1] && <><br /><span className="gradient-text">{headingLines[1]}</span></>}
                    </h2>
                    <p className="about-para">{role.aboutPara1}</p>
                    {role.aboutPara2 && <p className="about-para">{role.aboutPara2}</p>}

                    <div className="about-stats-grid">
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                ref={(el) => (cardRefs.current[i] = el)}
                                className="about-stat-item"
                                onClick={() => {
                                    if (stat.label === 'Live Projects') {
                                        const targetEl = document.getElementById('live-projects-section') || document.getElementById('portfolio-showcase');
                                        if (targetEl) {
                                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                        if (window.__EXPAND_VSCODE_FOLDER) {
                                            window.__EXPAND_VSCODE_FOLDER('projects');
                                        }
                                    } else if (stat.label === 'Certificates') {
                                        const targetEl = document.getElementById('certificates-section') || document.getElementById('portfolio-showcase');
                                        if (targetEl) {
                                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                        if (window.__EXPAND_VSCODE_FOLDER) {
                                            window.__EXPAND_VSCODE_FOLDER('certificates');
                                        }
                                    } else if (stat.label === 'Internship Experience') {
                                        const targetEl = document.getElementById('live-projects-section') || document.getElementById('portfolio-showcase');
                                        if (targetEl) {
                                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                        if (window.__OPEN_VSCODE_GIT_EXPERIENCE) {
                                            window.__OPEN_VSCODE_GIT_EXPERIENCE();
                                        }
                                    }
                                }}
                            >
                                {/* Icon bubble */}
                                <div className="about-stat-icon-wrap">
                                    {stat.icon}
                                </div>

                                {/* Text content */}
                                <div className="about-stat-content">
                                    <div className="about-stat-number-row">
                                        {typeof stat.value === 'number' ? (
                                            <>
                                                <span className="stat-number" data-value={stat.value}>0</span>
                                                <span className="about-stat-plus">+</span>
                                            </>
                                        ) : (
                                            <span className="stat-number stat-number--text">{stat.value}</span>
                                        )}
                                    </div>
                                    <p className="about-stat-label">{stat.label}</p>
                                    <p className="about-stat-desc">{stat.desc}</p>
                                </div>
                                {/* Internship hover popup — only for the 6+2 card */}
                                {stat.label === 'Internship Experience' && (
                                    <div className="intern-hover-popup">
                                        {/* Card 1: Agrasar (6 Months) */}
                                        <div className="intern-popup-card intern-popup-card--agrasar">
                                            {/* Compact view */}
                                            <div className="intern-card-compact">
                                                <span className="intern-popup-badge">6 Months</span>
                                                <p className="intern-popup-emoji">🏢</p>
                                                <p className="intern-popup-company">Agrasar Soft Consultancy</p>
                                                <p className="intern-popup-role">Software Developer Intern</p>
                                                <p className="intern-popup-period">Nov 2024 – Apr 2025</p>
                                                <span className="intern-expand-hint">Hover for details ↗</span>
                                            </div>
                                            {/* Expanded overlay view */}
                                            <div className="intern-card-expanded">
                                                <div className="intern-expanded-header">
                                                    <span className="intern-popup-badge">6 Months</span>
                                                    <div>
                                                        <h4 className="intern-expanded-company">Agrasar Soft Consultancy Services</h4>
                                                        <p className="intern-expanded-role">Software Developer Intern • Nov 2024 – Apr 2025</p>
                                                    </div>
                                                </div>
                                                <ul className="intern-expanded-bullets">
                                                    <li>Built responsive, reusable UI components in React.js for a full-stack ERP platform used by coaching institutes, integrating REST APIs to display and manage student, staff, and admin data in real time.</li>
                                                    <li>Implemented role-based UI views and protected routes for 3 user roles (Admin, Staff, Student), improving navigation clarity and cutting onboarding time by ~40% vs. the prior manual workflow.</li>
                                                    <li>Collaborated with the backend team on JWT-based authentication and session handling, while using Git for version control and Jira for sprint planning and task tracking within a 4-member team.</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Card 2: IBM PBEL (2 Months) */}
                                        <div className="intern-popup-card intern-popup-card--ibm">
                                            {/* Compact view */}
                                            <div className="intern-card-compact">
                                                <span className="intern-popup-badge ibm-popup-badge">2 Months</span>
                                                <p className="intern-popup-emoji">🔵</p>
                                                <p className="intern-popup-company">IBM PBEL Program</p>
                                                <p className="intern-popup-role">Fullstack Developer</p>
                                                <p className="intern-popup-period">May 2025 – Jun 2025</p>
                                                <span className="intern-expand-hint ibm-hint">Hover for details ↗</span>
                                            </div>
                                            {/* Expanded overlay view */}
                                            <div className="intern-card-expanded">
                                                <div className="intern-expanded-header">
                                                    <span className="intern-popup-badge ibm-popup-badge">2 Months</span>
                                                    <div>
                                                        <h4 className="intern-expanded-company">IBM PBEL Virtual Internship</h4>
                                                        <p className="intern-expanded-role">Fullstack Developer Trainee • May 2025 – Jun 2025</p>
                                                    </div>
                                                </div>
                                                <ul className="intern-expanded-bullets">
                                                    <li>Completed IBM-certified virtual internship covering MERN stack, backend API design, RESTful service architecture, and mobile integration patterns.</li>
                                                    <li>Built fullstack application with enterprise API design, mentored directly by IBM industrial experts.</li>
                                                    <li>Received official IBM-certified credential for hands-on enterprise-level web architecture and backend design.</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="intern-popup-arrow" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>


                </div>
                <div className="skills-block">
                    <Skills />
                </div>
            </div>
        </section>
    );
}

export default Page2;