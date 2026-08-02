import './App.css';
import Front_p from './assets/page1/front_p.jsx';
import CustomCursor from './assets/curs/CustomCursor.jsx';
import Navbar from './assets/page1/navbar/navbar.jsx';
import Page2 from './assets/page2/page2.jsx';
import Page3 from './assets/page3/page3.jsx';
import Page4 from './assets/page4/page4.jsx';
import ProjectDemoPage from './assets/page3/ProjectDemoPage.jsx';
import { useState, useEffect } from 'react';
import { RoleProvider } from './context/RoleContext.jsx';

import { projectsBase } from './assets/page3/projectsData.js';

const normalizeSlug = (str) => {
  if (!str) return '';
  return str
    .replace(/^#?demo-/, '')
    .replace(/^#?project-/, '')
    .replace(/^[\/#]+|[\/#]+$/g, '')
    .split('?')[0]
    .split('#')[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
};

function App() {
  const [activeTab, setActiveTab] = useState('projects');
  const [demoRouteProject, setDemoRouteProject] = useState(null);

  // Pathname-based & Hash-based route handler for project pages (e.g., /tickzen)
  useEffect(() => {
    const handleRouteChange = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;

      let rawSlug = '';
      if (pathname && pathname !== '/') {
        rawSlug = pathname;
      } else if (hash && !['#aboutw', '#portfolio-showcase', '#last_page'].includes(hash)) {
        rawSlug = hash;
      }

      const slug = normalizeSlug(rawSlug);

      if (slug) {
        const availableProjects = window.__CURRENT_PROJECTS || projectsBase.map(p => ({
          title: p.title,
          description: p.descriptions?.se || p.descriptions?.pm || '',
          image: p.image,
          shortVideo: p.shortVideo,
          hlsVideo: p.hlsVideo,
          website: p.website,
          github: p.github,
          videoUrl: p.videoUrl,
          techSpecs: p.techSpecs,
          features: p.features || [],
          upcomingFeatures: p.upcomingFeatures || [],
          tags: (p.tags?.se && p.tags.se.length ? p.tags.se : p.tags?.pm) || [],
          tagColor: p.tagColor || 'gold',
        }));

        const matched = availableProjects.find(p => normalizeSlug(p.title) === slug);
        if (matched) {
          setDemoRouteProject(matched);
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      }
      setDemoRouteProject(null);
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const handleBackToPortfolio = () => {
    window.history.pushState(null, '', '/');
    if (window.location.hash) {
      window.location.hash = '';
    }
    setDemoRouteProject(null);
  };

  return (
    <RoleProvider>
      <CustomCursor />
      {demoRouteProject ? (
        <ProjectDemoPage project={demoRouteProject} onBack={handleBackToPortfolio} />
      ) : (
        <>
          <Navbar setActiveTab={setActiveTab} />
          <Front_p />
          <Page2 setActiveTab={setActiveTab} />
          <Page3 activeTab={activeTab} setActiveTab={setActiveTab} />
          <Page4 />
        </>
      )}
    </RoleProvider>
  );
}

export default App;
