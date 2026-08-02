import React, { useEffect, useRef, useState } from 'react';
import './navbar.css';
import { useRole } from '../../../context/RoleContext.jsx';

function Navbar({ setActiveTab }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const drawerRef = useRef(null);
    const { role } = useRole();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleOutside = (e) => {
            if (menuOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, [menuOpen]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const scrollTo = (id, tab) => {
        if (tab) setActiveTab(tab);
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            if (id === 'portfolio-showcase') {
                if (window.__EXPAND_VSCODE_FOLDER) {
                    window.__EXPAND_VSCODE_FOLDER('projects');
                }
                const targetWorkspace = document.getElementById('vscode-ide-workspace');
                if (targetWorkspace) {
                    targetWorkspace.classList.add('vscode-workspace--highlight');
                    setTimeout(() => targetWorkspace.classList.remove('vscode-workspace--highlight'), 2800);
                }
                // Trigger project names blinking effect
                setTimeout(() => {
                    const projectItems = document.querySelectorAll('.file-item[data-folder="projects"]');
                    projectItems.forEach(item => item.classList.add('project-item-blink'));
                    setTimeout(() => {
                        projectItems.forEach(item => item.classList.remove('project-item-blink'));
                    }, 3000);
                }, 300);
            }
        }, tab ? 100 : 0);
        setMenuOpen(false);
    };

    const navLinks = [
        { label: 'About',    action: () => scrollTo('aboutw') },
        { label: 'Projects', action: () => scrollTo('portfolio-showcase', 'projects') },
        { label: 'Contact',  action: () => scrollTo('last_page') },
    ];

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
                <div className="navbar__inner">
                    {/* Logo — visible only when scrolled */}
                    <button
                      className={`navbar__logo ${scrolled ? 'navbar__logo--visible' : ''}`}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <span className="navbar__logo-pk">Prakash Kumar</span>
                    </button>

                    {/* Desktop Links with Download Resume Button at 4th position */}
                    <div className="navbar__links">
                        {navLinks.map((link) => (
                            <button key={link.label} className="navbar__link" onClick={link.action}>
                                {link.label}
                            </button>
                        ))}

                        <a
                            href={role.resumeFile}
                            download={role.resumeName}
                            className="navbar__resume-btn"
                        >
                            Download Resume ↓
                        </a>
                    </div>

                    {/* Hamburger */}
                    <button
                        className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            <div className={`drawer-overlay ${menuOpen ? 'drawer-overlay--visible' : ''}`} onClick={() => setMenuOpen(false)} />

            {/* Mobile Drawer */}
            <div className={`mobile-drawer ${menuOpen ? 'mobile-drawer--open' : ''}`} ref={drawerRef}>
                <div className="mobile-drawer__header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span className="navbar__logo-pk">Prakash Kumar</span>
                    </div>
                    <button className="mobile-drawer__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                </div>

                <nav className="mobile-drawer__nav">
                    <a
                        href={role.resumeFile}
                        download={role.resumeName}
                        className="mobile-drawer__resume-btn"
                        onClick={() => setMenuOpen(false)}
                    >
                        Download Resume ↓
                    </a>
                    {navLinks.map((link) => (
                        <button key={link.label} className="mobile-drawer__link" onClick={link.action}>
                            {link.label}
                            <span className="mobile-drawer__arrow">→</span>
                        </button>
                    ))}
                </nav>
            </div>
        </>
    );
}

export default Navbar;