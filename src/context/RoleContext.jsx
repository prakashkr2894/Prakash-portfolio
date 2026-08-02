import React, { createContext, useContext, useState, useEffect } from 'react';

export const ROLES = {
  se: {
    id: 'se',
    label: 'Software Engineer',
    short: 'Software',
    emoji: '💻',
    color: 'cyan',
    accentHex: '#00D4FF',
    headline: 'Software Engineer & Problem Solver',
    subheadline: 'Software Engineer specializing in AI-powered applications. I build scalable full-stack systems, intelligent products like Zentrixa Voice, and production-ready solutions using modern DevOps practices.',
    tagline: '',
    chips: [],
    badges: ['Production-Grade Software', 'DevOps', 'AI Integration'],
    resumeFile: '/resumes/Prakash_Kumar-SE.pdf',
    resumeName: 'Prakash_Kumar-SE.pdf',
    aboutHeading: 'Engineering at the intersection of\nCode, Cloud & AI',
    aboutPara1: 'B.Tech CSE graduate and Full Stack AI + DevOps Engineer who ships production-grade software end to end. Built SaaS platforms spanning Java/Spring Boot backends, React frontends, containerized CI/CD pipelines, and AI agents built with LangChain and OpenAI. Comfortable owning the full lifecycle — REST API design, OAuth2-secured authentication, zero-downtime Kubernetes deployments, and voice-to-action AI agents. Always shipping, always improving.',
    aboutPara2: '',
    contactDesc: "I'm actively seeking Software Engineer / DevOps / AI developer roles. I reply within 5 minutes!",
    skillFeatured: 'all-tech', // all 3 tech cards featured
    filterTag: 'se',
  },
};

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [activeRole] = useState('se');

  useEffect(() => {
    document.documentElement.setAttribute('data-role', activeRole);
  }, [activeRole]);

  const role = ROLES[activeRole];

  return (
    <RoleContext.Provider value={{ activeRole, role, ROLES }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used inside RoleProvider');
  return ctx;
}
