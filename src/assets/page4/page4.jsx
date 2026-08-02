import React, { useEffect, useRef } from 'react';
import './page4.css';
import { handleEmailClick } from "../Connect";
import { useRole } from '../../context/RoleContext.jsx';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

function Page4() {
    const { role } = useRole();
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    useEffect(() => {
        const leftEl = leftRef.current;
        const rightEl = rightRef.current;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('slide-in-visible');
                    } else {
                        entry.target.classList.remove('slide-in-visible');
                    }
                });
            },
            { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
        );

        if (leftEl) observer.observe(leftEl);
        if (rightEl) observer.observe(rightEl);

        
        return () => {
            if (leftEl) observer.unobserve(leftEl);
            if (rightEl) observer.unobserve(rightEl);
        };
    }, []);

    const handleLinkClick = (e) => {
        e.preventDefault(); 
        handleEmailClick();
    };

    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "127d052a-0403-4746-a5a1-c0ab5ea44e85");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {

            setResult(data.message);
        }
    };

    return (
        <section className="contact-section" id="last_page">
            {/* Background Orbs */}
            <div className="contact-bg-orb contact-bg-orb--cyan" />
            <div className="contact-bg-orb contact-bg-orb--purple" />

            <div className="contact-inner">
                {/* Header */}
                <div className="contact-header">
                    <h1 className="contact-title">
                        Get In <span className="contact-title--accent">Touch</span>
                    </h1>
                    <p className="contact-desc">
                        Got a question, job opportunity, or project concept? Send me a message and let's build something exceptional.
                    </p>
                </div>

                {/* 2-Column Grid */}
                <div className="contact-grid">
                    {/* Left Column (Info Card & Social Links) */}
                    <div 
                        className="contact-left slide-in-left" 
                        ref={leftRef}
                    >
                        {/* Availability Card */}
                        <div className="availability-card">
                            <div className="availability-card__status">
                                <span className="availability-dot"></span>
                                <span className="availability-label">Available for Work</span>
                            </div>
                            <h3 className="availability-card__title">Let's Collaborate</h3>
                            <p className="availability-card__desc">
                                {role.contactDesc}
                            </p>
                        </div>

                        {/* Social Link Cards */}
                        <div className="contact-socials">
                            <a 
                                href="https://www.linkedin.com/in/prakashkr2894/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="contact-social-card contact-social-card--linkedin"
                            >
                                <div className="contact-social-icon"><FaLinkedin /></div>
                                <div className="contact-social-body">
                                    <div className="contact-social-name">LinkedIn</div>
                                    <div className="contact-social-handle">prakashkr2894</div>
                                </div>
                                <span className="contact-social-arrow">↗</span>
                            </a>

                            <a 
                                href="https://github.com/prakashkr2894" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="contact-social-card contact-social-card--github"
                            >
                                <div className="contact-social-icon"><FaGithub /></div>
                                <div className="contact-social-body">
                                    <div className="contact-social-name">GitHub</div>
                                    <div className="contact-social-handle">prakashkr2894</div>
                                </div>
                                <span className="contact-social-arrow">↗</span>
                            </a>

                            <button 
                                onClick={handleLinkClick} 
                                className="contact-social-card contact-social-card--email"
                            >
                                <div className="contact-social-icon"><FaEnvelope /></div>
                                <div className="contact-social-body">
                                    <div className="contact-social-name">Email</div>
                                    <div className="contact-social-handle">prakashkr2894@gmail.com</div>
                                </div>
                                <span className="contact-social-arrow">↗</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column (Form Card) */}
                    <div 
                        className="contact-form-card slide-in-right" 
                        ref={rightRef}
                    >
                        <div className="contact-form-header">
                            <span className="contact-form-label">Send Message</span>
                        </div>

                        <form 
                            className="contact-form" 
                            onSubmit={onSubmit}
                            method="POST"
                        >
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Your Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    placeholder="John Doe" 
                                    className="form-input" 
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Your Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="john@example.com" 
                                    className="form-input" 
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    placeholder="How can I help you?" 
                                    className="form-input form-textarea" 
                                    required 
                                />
                            </div>

                            {result && (
                                <div className="form-error" style={{
                                    background: result.includes("Successfully") ? 'rgba(34, 197, 94, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                                    borderColor: result.includes("Successfully") ? 'rgba(34, 197, 94, 0.3)' : 'rgba(248, 113, 113, 0.3)',
                                    color: result.includes("Successfully") ? '#22C55E' : '#F87171'
                                }}>
                                    {result}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                className="form-submit-btn" 
                                disabled={result === "Sending...."}
                            >
                                {result === "Sending...." && <div className="form-spinner" />}
                                {result === "Sending...." ? "Sending..." : "Send Message ✈️"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Page4;