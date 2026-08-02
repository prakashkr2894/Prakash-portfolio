import React, { useState, useEffect, useRef } from 'react';
import './page3.css';
import { useRole } from '../../context/RoleContext.jsx';
import { projectsBase } from './projectsData.js';


const techStack = [
  { name: 'Java', icon: 'https://img.icons8.com/?size=100&id=2572&format=png&color=000000' },
  { name: 'Spring', icon: 'https://img.icons8.com/?size=100&id=90519&format=png&color=000000' },
  { name: 'PostgreSQL', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968342.png' },
  { name: 'MongoDB', icon: 'https://img.icons8.com/?size=100&id=8rKdRqZFLurS&format=png&color=000000' },
  { name: 'Docker', icon: 'https://cdn-icons-png.flaticon.com/512/919/919853.png' },
  { name: 'AWS', icon: 'https://img.icons8.com/?size=100&id=33039&format=png&color=000000' },
  { name: 'GCP', icon: 'https://img.icons8.com/?size=100&id=20766&format=png&color=000000' },
  { name: 'Python', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png' },
  { name: 'JavaScript', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png' },
  { name: 'React', icon: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png' },
  { name: 'Node.js', icon: 'https://cdn-icons-png.flaticon.com/512/919/919825.png' },
  { name: 'TypeScript', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png' },
  { name: 'Tailwind', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
  { name: 'Git', icon: 'https://img.icons8.com/?size=100&id=38388&format=png&color=000000' },
  { name: 'Jira', icon: 'https://img.icons8.com/?size=100&id=oROcPah5ues6&format=png&color=000000' },
  { name: 'Postman', icon: 'https://img.icons8.com/?size=100&id=EPbEfEa7o8CB&format=png&color=000000' },
];

const certificates = [
  {
    title: 'PBEL Virtual Internship on Web Development',
    issuer: 'IBM',
    date: 'Sep 2025',
    image: 'https://substackcdn.com/image/fetch/$s_!1XDp!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb162f2d8-7878-4f8c-9b3f-6184293024dc_1000x1000.jpeg',
    certImage: 'https://res.cloudinary.com/dgbkepcti/image/upload/v1785701141/certificates%20images/ibm_fpoyy3.jpg',
    link: 'https://courses.ibmmooc.skillsnetwork.site/certificates/bc123576e857484babddcbe857a6ba73',
    tag: 'Cloud',
  },
  {
    title: 'Google Cloud Skills Boost — Gold League',
    issuer: 'Google',
    date: 'Sep 2023',
    image: 'https://img.icons8.com/color/96/000000/google-logo.png',
    certImage: 'https://res.cloudinary.com/dgbkepcti/image/upload/v1785701139/certificates%20images/google_wf4typ.jpg',
    link: 'https://www.credly.com/badges/d65b2a5a-ac1b-411d-999b-b5aa00c89464/public_url',
    tag: 'Cloud',
  },
  {
    title: 'Innovation, Design & Entrepreneurship',
    issuer: 'MIC & AICTE',
    date: 'Feb 2025',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/All_India_Council_for_Technical_Education_logo.png/250px-All_India_Council_for_Technical_Education_logo.png',
    certImage: 'https://res.cloudinary.com/dgbkepcti/image/upload/v1785701138/certificates%20images/ide_xsp6mt.jpg',
    link: 'https://alumniapi.mic.gov.in/api/certificates/16525/69283',
    tag: 'Product',
  },
  {
    title: 'Certificate for Completion of Python',
    issuer: 'GUVI / HCL',
    date: 'Jul 2025',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhiL56AMokHtHVYH3nM92N_dLcUGcrXHeEZw&s',
    certImage: 'https://res.cloudinary.com/dgbkepcti/image/upload/v1785701138/certificates%20images/python_poj3re.jpg',
    link: 'https://www.guvi.in/certificate?id=q5246oyHz5TE7J7314',
    tag: 'AI',
  },
  {
    title: 'Data Science Fundamentals',
    issuer: 'Cisco / Credly',
    date: 'Jul 2023',
    image: 'https://www.citypng.com/public/uploads/preview/cisco-square-blue-logo-icon-png-735811696612218gzoiadfplh.png',
    certImage: 'https://res.cloudinary.com/dgbkepcti/image/upload/v1785701137/certificates%20images/data_science_gcoeqy.jpg',
    link: 'https://www.credly.com/badges/ad2ca419-b7c6-415b-9386-85bf91284166/print',
    tag: 'AI',
  },
  {
    title: 'Test Automation with Night.js',
    issuer: 'BrowserStack',
    date: 'Apr 2025',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn3qu6U5LyfKjpMWajhiu-U9bMheUb1Hu8UQ&s',
    certImage: 'https://res.cloudinary.com/dgbkepcti/image/upload/v1785701137/certificates%20images/night_muflvo.jpg',
    link: 'https://drive.google.com/file/d/1luzF4Z-lQyJDQ74l6lqTl6eNGdY3AbyN/view',
    tag: 'DevOps',
  },
];

import AnimatedShowcase from './AnimatedShowcase.jsx';

function Page3() {
  const { activeRole, role } = useRole();
  const sectionRef = useRef(null);

  const projects = projectsBase
    .filter(p => {
      if (activeRole === 'se') return p.roles.some(r => ['se', 'devops', 'ai'].includes(r));
      return p.roles.includes('pm') && p.descriptions['pm'];
    })
    .map(p => ({
      title: p.title,
      description: activeRole === 'se'
        ? (p.descriptions.se || p.descriptions.devops || p.descriptions.ai)
        : p.descriptions.pm,
      image: p.image,
      shortVideo: p.shortVideo,
      website: p.website,
      github: p.github,
      videoUrl: p.videoUrl,
      techSpecs: p.techSpecs,
      features: p.features,
      upcomingFeatures: p.upcomingFeatures,
      tags: activeRole === 'se'
        ? (p.tags.se?.length ? p.tags.se : p.tags.devops?.length ? p.tags.devops : p.tags.ai || [])
        : (p.tags.pm || []),
      tagColor: p.tagColor,
    }));

  useEffect(() => {
    window.__CURRENT_PROJECTS = projects;
  }, [projects]);

  return (
    <section className="page3-section" ref={sectionRef}>
      <div className="page3-inner">
        <div className="page3-header">
          <h2 className="page3-title" id="portfolio-showcase">
            <span className="gradient-text">Showcase</span>
          </h2>
          <p className="page3-subtitle">
            {activeRole === 'se'
              ? 'Explore my full-stack architectures, DevOps pipelines, AI agents and engineering credentials.'
              : 'Explore the products I founded, the roadmaps I built, and the outcomes I shipped.'}
          </p>
        </div>

        <AnimatedShowcase
          projects={projects}
          certificates={certificates}
        />
      </div>
    </section>
  );
}

export default Page3;