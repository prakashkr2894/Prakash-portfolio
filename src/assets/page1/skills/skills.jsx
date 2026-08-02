import React, { useRef, useEffect } from 'react';
import './skills.css';

const skillCategories = [
    {
        id: 'software',
        icon: '💻',
        title: 'Software Engineering',
        subtitle: 'Full Stack · DevOps · AI',
        glowColor: 'cyan',
        techIcons: [
            { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
            { name: 'React', url: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png' },
            { name: 'Docker', url: 'https://cdn-icons-png.flaticon.com/512/919/919853.png' },
            { name: 'K8s', url: 'https://img.icons8.com/?size=100&id=cvzmaEA4kC0o&format=png&color=000000' },
            { name: 'AWS', url: 'https://img.icons8.com/?size=100&id=33039&format=png&color=000000' },
            { name: 'Python', url: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png' },
            { name: 'Node JS', url: 'https://cdn-icons-png.flaticon.com/512/919/919825.png' },
            { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
        ],
        skillGroups: [
            {
                label: 'Languages & Frameworks',
                skills: [
                    { name: 'Java', level: 85 },
                    { name: 'Python', level: 88 },
                    { name: 'FastAPI', level: 85 },
                    { name: 'JavaScript', level: 80 },
                ],
            },
            {
                label: 'DevOps',
                skills: [
                    { name: 'Docker / Kubernetes', level: 88 },
                    { name: 'GitHub Actions / CI-CD', level: 90 },
                    { name: 'AWS · Nginx · Linux VPS', level: 75 },
                    { name: 'Terraform (IaC)', level: 68 },
                ],
            },
            {
                label: 'AI & Databases',
                skills: [
                    { name: 'PyTorch / TensorFlow', level: 85 },
                    { name: 'Hugging Face / LangChain', level: 88 },
                    { name: 'PostgreSQL', level: 85 },
                ],
            },
        ],
    },
];

function Skills() {
    const cardRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                    else entry.target.classList.remove('visible');
                });
            },
            { threshold: 0.08 }
        );
        cardRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
        return () => cardRefs.current.forEach((ref) => { if (ref) observer.unobserve(ref); });
    }, []);

    return (
        <section className="skills-section" id="skills-section">
            <div className="skills-inner">
                <div className="skills-header">
                    <span className="section-label">Expertise</span>
                    <h2 className="skills-heading">
                        My <span className="gradient-text">Skill Set</span>
                    </h2>
                    <p className="skills-subtitle">
                        Full-stack development, cloud infrastructure, DevOps automation, product strategy, and AI integration.
                    </p>
                </div>

                <div className="skills-grid-two">
                    {skillCategories.map((cat, i) => (
                        <div
                            key={cat.id}
                            ref={(el) => (cardRefs.current[i] = el)}
                            className={`skill-cat-card reveal skill-cat-card--${cat.glowColor} skill-cat-card--active`}
                        >
                            {/* Card Header */}
                            <div className="skill-cat-header">
                                <div className={`skill-cat-icon skill-cat-icon--${cat.glowColor}`}>
                                    {cat.icon}
                                </div>
                                <div>
                                    <h3 className="skill-cat-title">{cat.title}</h3>
                                    <p className="skill-cat-subtitle">{cat.subtitle}</p>
                                </div>
                            </div>

                            {/* Tech Icon Row */}
                            <div className="skill-tech-icons">
                                {cat.techIcons.map((tech) => (
                                    <div key={tech.name} className="skill-tech-icon" title={tech.name}>
                                        <img src={tech.url} alt={tech.name} loading="lazy" />
                                    </div>
                                ))}
                            </div>

                             {/* Grouped Skill Badges (Side-by-Side with Blue Underline) */}
                             <div className="skill-groups">
                                 {cat.skillGroups.map((group) => (
                                     <div key={group.label} className="skill-group">
                                         <p className="skill-group-label">{group.label}</p>
                                         <div className="skill-chips-row">
                                             {group.skills.map((skill) => (
                                                 <span key={skill.name} className="skill-chip-underlined">
                                                     {skill.name}
                                                 </span>
                                             ))}
                                         </div>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;

