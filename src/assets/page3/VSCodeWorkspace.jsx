import React, { useState, useEffect, useMemo, useRef } from 'react';
import './VSCodeWorkspace.css';
import ProjectDemoModal from './ProjectDemoModal.jsx';

const ProjectPreviewCard = ({ activeFile, projects }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleNavigate = () => {
    const slug = activeFile.data.title.toLowerCase().replace(/\s+/g, '-');
    window.__CURRENT_PROJECTS = projects;
    window.history.pushState(null, '', `/${slug}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <div className="project-card-custom">
      <div
        className="project-card-custom__img-wrap"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleNavigate}
        title="Click to open project showcase page"
        style={{ cursor: 'pointer' }}
      >
        <img
          src={activeFile.data.image}
          alt={activeFile.data.title}
          className={`project-card-custom__img ${isHovered && activeFile.data.shortVideo ? 'hidden' : ''}`}
        />
        {activeFile.data.shortVideo && (
          <video
            ref={videoRef}
            src={activeFile.data.shortVideo}
            className={`project-card-custom__video ${isHovered ? 'visible' : ''}`}
            loop
            muted
            playsInline
          />
        )}
        <div className="project-card-custom__overlay" />
        <div className={`project-card-custom__play-badge ${isHovered ? 'hovered' : ''}`}>
          {isHovered ? '▶ Playing Video • Click to Open Page' : '🎬 Hover to Play Video • Click for Page'}
        </div>
      </div>
      <div className="project-card-custom__body">
        <div className="project-card-custom__tags">
          {activeFile.data.tags.map(tag => (
            <span key={tag} className={`project-tag-custom tag-${activeFile.data.tagColor}`}>{tag}</span>
          ))}
        </div>
        <h3 className="project-card-custom__title" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
          {activeFile.data.title}
        </h3>
        <p className="project-card-custom__desc">{activeFile.data.description}</p>
        <div className="project-card-custom__links">
          <button className="btn-demo btn-demo-modal" onClick={handleNavigate}>
            🚀 View Showcase Page
          </button>
          {activeFile.data.website && (
            <a href={activeFile.data.website} target="_blank" rel="noopener noreferrer" className="btn-demo btn-website">
              🌐 Website ↗
            </a>
          )}
          <a href={activeFile.data.github || 'https://github.com/prakashkr2894'} target="_blank" rel="noopener noreferrer" className="btn-code">
            💻 GitHub →
          </a>
        </div>
      </div>
    </div>
  );
};

const ArrowChevronIcon = ({ isOpen }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      color: '#858585',
      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
      transition: 'transform 0.15s ease',
      flexShrink: 0,
      marginRight: '2px',
    }}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const FolderIcon = ({ isOpen }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#E0A96D' }}>
    {isOpen ? (
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-5l-2-3H6z" />
    ) : (
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    )}
  </svg>
);
const FileJsonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#CBCB41' }}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const FileMdIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#519ABA' }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 13v4M12 13v4M8 13l2 2 2-2" />
  </svg>
);
const FileCertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#FFB830' }}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M16 8h2M16 12h2M16 16h2M7 8h5M7 12h5M7 16h3" />
  </svg>
);

const ActivityIconExplorer = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9h18M3 15h18M3 3h18M3 21h18" />
  </svg>
);
const ActivityIconSearch = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const ActivityIconGit = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
    <path d="M18 15V9a4 4 0 0 0-4-4H9" /><line x1="6" y1="9" x2="6" y2="15" />
  </svg>
);
const ActivityIconSettings = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9" />
  </svg>
);
const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const GIT_COMMITS = [
  {
    hash: 'a4f2c9b',
    message: 'feat(ai): Zentrixa-AI voice-to-action agent — AssemblyAI + LLM + CRUD ops',
    date: 'Jun 2025',
    branch: 'feature/zentrixai',
    tags: ['AI', 'Voice Agent', 'LLM'],
    author: 'Prakash Kumar',
    added: 47,
    removed: 3,
    detail: {
      title: 'Zentrixa-AI — Voice-to-Action Agent',
      description: 'Developed Zentrixa-AI, an embedded voice-to-action AI agent inside TickZen. Transcribes speech via AssemblyAI, routes intent through an LLM (OpenRouter API), and executes real CRUD operations on Kanban tasks with no manual clicks.',
      tech: ['AssemblyAI', 'OpenRouter API', 'FastAPI', 'LangChain', 'React', 'MongoDB'],
      role: 'AI Engineer / Full-Stack Developer',
      impact: 'Achieved ~80% first-pass voice recognition accuracy in production with 25+ active users',
    },
  },
  {
    hash: '9d3e8a1',
    message: 'infra: K8s + Istio service mesh — mTLS, canary deploys, Prometheus/Grafana',
    date: 'May 2025',
    branch: 'infra/k8s-istio',
    tags: ['Kubernetes', 'Istio', 'DevOps'],
    author: 'Prakash Kumar',
    added: 63,
    removed: 2,
    detail: {
      title: 'Cloud-Native Microservices Platform',
      description: 'Architected Kubernetes microservices using Helm charts (IaC). Deployed Istio service mesh with canary deployments, mTLS, circuit breaking, distributed tracing via Jaeger, and observability via Prometheus + Grafana. Full GitHub Actions CI/CD pipeline.',
      tech: ['Kubernetes', 'Helm', 'Istio', 'OPA', 'Prometheus', 'Grafana', 'GitHub Actions'],
      role: 'DevOps / Cloud Engineer',
      impact: 'Zero-downtime deployments with full observability stack on self-managed infra',
    },
  },
  {
    hash: 'b7f1d2e',
    message: 'feat: MedTrackFit — Spring Boot SaaS, 15+ APIs, OAuth2, Kubernetes deploy',
    date: 'Mar 2025',
    branch: 'feature/medtrack',
    tags: ['Spring Boot', 'Kubernetes', 'SaaS'],
    author: 'Prakash Kumar',
    added: 58,
    removed: 0,
    detail: {
      title: 'MedTrackFit — Health Recovery SaaS',
      description: 'Architected a 4-role access system (Patient, Recovered, Mentor, Doctor) with Spring Security & OAuth2. Developed 15+ REST APIs for health tracking, messaging & mentorship scheduling. Full CI/CD with Kubernetes + Istio + Nginx.',
      tech: ['Spring Boot', 'Spring Security', 'OAuth2', 'JWT', 'MySQL', 'Kubernetes', 'Istio'],
      role: 'Full-Stack Developer + DevOps',
      impact: 'Live production platform with zero-downtime Kubernetes deployment on Ubuntu VPS',
    },
  },
  {
    hash: 'c2a9f4d',
    message: 'intern: Agrasar Soft — CI/CD pipeline, ERP React UI, JWT auth, Nginx VPS',
    date: 'Nov 2024',
    branch: 'experience/agrasar-intern',
    tags: ['Internship', 'CI/CD', 'React'],
    author: 'Prakash Kumar',
    added: 38,
    removed: 0,
    detail: {
      title: 'Agrasar Soft Consultancy — SWE Intern',
      description: 'Built responsive React UI for a full-stack ERP platform (coaching institutes). Implemented role-based views for 3 user roles (Admin, Staff, Student). Engineered GitHub Actions CI/CD pipeline — Docker build, push & zero-downtime Ubuntu VPS deploy, cutting deployment effort by 80%+.',
      tech: ['React.js', 'Node.js', 'JWT', 'GitHub Actions', 'Docker', 'Nginx', 'PM2', 'Jira'],
      role: 'Software Developer Intern',
      impact: 'Cut onboarding time ~40% via RBAC UI; 80%+ reduction in deployment effort via CI/CD',
    },
  },
  {
    hash: 'e5d3b8c',
    message: 'feat: Vartalap real-time chat — Socket.IO, Docker, Nginx, CI/CD pipeline',
    date: 'Feb 2025',
    branch: 'feature/vartalap',
    tags: ['Socket.IO', 'Docker', 'MERN'],
    author: 'Prakash Kumar',
    added: 28,
    removed: 5,
    detail: {
      title: 'Vartalap — Real-Time Chat Application',
      description: 'Built a real-time bidirectional chat app using Socket.IO with persistent MongoDB message storage, user authentication & full Docker containerisation. GitHub Actions CI/CD pipeline reduced deployment from 45 min to under 5 min.',
      tech: ['Node.js', 'Socket.IO', 'React.js', 'MongoDB', 'Docker', 'GitHub Actions', 'Nginx'],
      role: 'Full-Stack Developer + DevOps',
      impact: 'Deployment time cut from 45 min → under 5 min with automated CI/CD',
    },
  },
  {
    hash: '3f8c2a7',
    message: 'cert: IBM PBEL Virtual Internship — MERN, CI/CD, enterprise API design',
    date: 'Jul 2025',
    branch: 'experience/ibm-intern',
    tags: ['IBM', 'Internship', 'MERN'],
    author: 'Prakash Kumar',
    added: 12,
    removed: 0,
    detail: {
      title: 'IBM PBEL Virtual Internship',
      description: 'Completed IBM-certified virtual internship covering MERN stack, backend API design, RESTful service architecture, and mobile integration patterns under guidance from IBM professionals.',
      tech: ['MERN Stack', 'REST APIs', 'Git', 'CI/CD Concepts', 'Agile SDLC'],
      role: 'Virtual Intern — Web & Mobile Development',
      impact: 'IBM-certified with hands-on enterprise-level development exposure',
    },
  },
];

const EXPERIENCES = [
  {
    role: 'Software Developer Intern',
    company: 'Agrasar Soft Consultancy Services',
    period: 'Nov 2024 – Jun 2025 (6+2 Months)',
    type: 'Internship',
    icon: '🏢',
    bullets: [
      'Built React.js UI for ERP platform (3 RBAC roles — Admin, Staff, Student)',
      'Engineered GitHub Actions CI/CD → Docker → Ubuntu VPS (80%+ effort reduction)',
      'Configured Nginx reverse proxy, SSL/TLS & PM2 on Linux server',
    ],
  },
  {
    role: 'Virtual Intern, Web & Mobile Development',
    company: 'IBM PBEL (SkillsNetwork)',
    period: 'Jul 2025 – Aug 2025',
    type: 'Virtual Internship',
    icon: '🔵',
    bullets: [
      'Completed MERN stack training under IBM professional guidance',
      'Applied CI/CD concepts and agile-aligned SDLC workflows',
      'Received IBM-certified credential on backend API design',
    ],
  },
  {
    role: 'SaaS Founder & Product Owner',
    company: 'TickZen / MedTrackFit (Self)',
    period: '2024 – Present',
    type: 'Founder',
    icon: '🚀',
    bullets: [
      'Led TickZen from idea → production (25+ users, voice-first AI SaaS)',
      'Conceived MedTrackFit at IDE Bootcamp → live multi-role health platform',
      'Full product lifecycle: ideation, dev, deployment & post-launch iteration',
    ],
  },
];

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="search-highlight">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function VSCodeWorkspace({ projects, techStack, certificates, activeRole }) {
  const initialFiles = useMemo(() => [
    {
      id: 'readme',
      name: 'README.md',
      type: 'md',
      folder: null,
      icon: <FileMdIcon />,
      searchTags: ['readme', 'prakash', 'intro', 'workspace'],
      code: `# Prakash Kumar — SE · DevOps · AI Engineer\n\nWelcome! You're viewing the **${activeRole?.toUpperCase() || 'SWE'} perspective**.\n\n## 📁 Directory Structure\n- 📁 **projects/** : Full-stack apps, AI SaaS & DevOps systems.\n- 📁 **certificates/** : Cloud, AI, DevOps certifications.\n\n## 🔍 How to Navigate\n- Click any **file** in the sidebar to open it\n- Use **Search** (🔍) to find by tech or project name\n- Check **Source Control** to see experience timeline\n\n## 🏆 Achievements\n- 4 production SaaS platforms shipped live\n- 25+ active users on TickZen (~80% voice accuracy)\n- Zero-downtime Kubernetes deployments with Istio\n- Top 10 (Top 4%) in AICTE Bootcamp among 250+ startups\n\n*Built with React + Vite — Open Source @ GitHub/prakashkr2894*`,
      meta: { title: 'Prakash Kumar — Portfolio', subtitle: 'SE · DevOps · AI' }
    },
    ...projects.map((p) => ({
      id: `project-${p.title.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${p.title.replace(/\s+/g, '')}.json`,
      type: 'json',
      folder: 'projects',
      icon: <FileJsonIcon />,
      searchTags: [p.title.toLowerCase(), ...(p.tags || []).map(t => t.toLowerCase())],
      code: JSON.stringify({
        project: p.title,
        role: 'Lead Engineer',
        tags: p.tags,
        description: p.description,
        deployment: p.liveDemo,
        repository: p.github || 'https://github.com/prakashkr2894/' + p.title.toLowerCase().replace(/\s+/g, '-'),
      }, null, 2),
      data: p,
    })),
    ...certificates.map((c, idx) => ({
      id: `cert-${idx}`,
      name: `${c.title.replace(/[^a-zA-Z0-9]/g, '')}.cert`,
      type: 'cert',
      folder: 'certificates',
      icon: <FileCertIcon />,
      searchTags: [c.title.toLowerCase(), c.issuer.toLowerCase(), c.tag.toLowerCase()],
      code: `Certificate: "${c.title}"\nIssuer: ${c.issuer}\nDate: ${c.date}\nField: ${c.tag}\nVerificationLink: "${c.link}"`,
      data: c,
    })),
  ], [projects, certificates, activeRole]);

  const [files] = useState(initialFiles);
  const [openTabs, setOpenTabs] = useState(['readme']);
  const [activeFileId, setActiveFileId] = useState('readme');
  const [expandedFolders, setExpandedFolders] = useState({ projects: true, certificates: false });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeActivity, setActiveActivity] = useState('explorer');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [gitView, setGitView] = useState('commits');
  const [demoModalProject, setDemoModalProject] = useState(null);

  const openFile = (fileId) => {
    if (!openTabs.includes(fileId)) setOpenTabs([...openTabs, fileId]);
    setActiveFileId(fileId);
  };
  const closeFile = (fileId, e) => {
    e.stopPropagation();
    const updated = openTabs.filter(id => id !== fileId);
    setOpenTabs(updated);
    if (activeFileId === fileId && updated.length > 0) setActiveFileId(updated[updated.length - 1]);
  };
  const toggleFolder = (name) => setExpandedFolders(prev => ({ ...prev, [name]: !prev[name] }));
  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  useEffect(() => {
    window.__EXPAND_VSCODE_FOLDER = (folderName) => {
      setExpandedFolders(prev => ({ ...prev, [folderName]: true }));
      setIsSidebarOpen(true);
      setActiveActivity('explorer');
    };
    window.__OPEN_VSCODE_GIT_EXPERIENCE = () => {
      setIsSidebarOpen(true);
      setActiveActivity('git');
      setGitView('commits');
    };
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return files
      .filter(f => f.searchTags.some(tag => tag.includes(q)) || f.name.toLowerCase().includes(q))
      .map(f => ({
        file: f,
        matchLine: f.code.split('\n').find(line => line.toLowerCase().includes(q)) || f.name,
      }));
  }, [searchQuery, files]);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openCommitFile = (commit) => {
    setSelectedCommit(commit);
    setGitView('diff');
  };

  return (
    <div className="vscode-workspace" id="vscode-ide-workspace">
      {/* Activity Bar */}
      <div className="vscode-activity-bar">
        <div className="activity-top">
          {[
            { id: 'explorer', icon: <ActivityIconExplorer />, title: 'Explorer' },
            { id: 'search', icon: <ActivityIconSearch />, title: 'Search' },
            { id: 'git', icon: <ActivityIconGit />, title: 'Source Control', badge: GIT_COMMITS.length },
          ].map(({ id, icon, title, badge }) => (
            <button
              key={id}
              className={`activity-btn ${activeActivity === id && isSidebarOpen ? 'active' : ''}`}
              title={title}
              onClick={() => {
                if (activeActivity === id) {
                  setIsSidebarOpen(!isSidebarOpen);
                } else {
                  setActiveActivity(id);
                  setIsSidebarOpen(true);
                }
              }}
            >
              {icon}
              {badge && <span className="badge">{badge}</span>}
            </button>
          ))}
        </div>
        <div className="activity-bottom">
          <button className="activity-btn" title="Settings"><ActivityIconSettings /></button>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="vscode-sidebar">

          {/* ─── EXPLORER ─── */}
          {activeActivity === 'explorer' && (
            <>
              <div className="sidebar-header"><span>EXPLORER: PRAKASH-PORTFOLIO</span></div>
              <div className="sidebar-tree">
                <div className={`tree-item file-item ${activeFileId === 'readme' ? 'active' : ''}`} onClick={() => openFile('readme')}>
                  <FileMdIcon /><span className="file-name">README.md</span>
                </div>
                {['projects', 'certificates'].map(folder => (
                  <div className="folder-container" key={folder}>
                    <div className="tree-item folder-item" onClick={() => toggleFolder(folder)}>
                      <ArrowChevronIcon isOpen={expandedFolders[folder]} />
                      <FolderIcon isOpen={expandedFolders[folder]} />
                      <span className="folder-name">{folder}</span>
                    </div>
                    {expandedFolders[folder] && (
                      <div className="folder-contents">
                        {files.filter(f => f.folder === folder).map(file => (
                          <div
                            key={file.id}
                            data-folder={folder}
                            data-file-id={file.id}
                            className={`tree-item file-item ${activeFileId === file.id ? 'active' : ''}`}
                            onClick={() => openFile(file.id)}
                          >
                            {file.icon}<span className="file-name">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ─── SEARCH ─── */}
          {activeActivity === 'search' && (
            <>
              <div className="sidebar-header"><span>SEARCH WORKSPACE</span></div>
              <div className="sidebar-search-box">
                <div className="search-input-wrap">
                  <ActivityIconSearch />
                  <input
                    type="text"
                    placeholder="Search projects, skills, certs…"
                    className="search-input"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {searchQuery && (
                    <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                      <CloseIcon />
                    </button>
                  )}
                </div>

                {searchQuery && (
                  <div className="search-results">
                    <p className="search-info">
                      {searchResults.length > 0
                        ? `${searchResults.length} result${searchResults.length > 1 ? 's' : ''} found`
                        : 'No results found'}
                    </p>
                    {searchResults.map(({ file, matchLine }) => (
                      <div key={file.id} className="search-result-group" onClick={() => { openFile(file.id); }}>
                        <div className="search-match-file">
                          {file.icon}&nbsp;{highlight(file.name, searchQuery)}
                        </div>
                        <div className="search-match-line">
                          {highlight(matchLine.trim().slice(0, 55), searchQuery)}
                        </div>
                      </div>
                    ))}
                    {searchResults.length === 0 && searchQuery && (
                      <p className="search-empty-tip">Try: "docker", "aws", "react", "cert", "langchain"</p>
                    )}
                  </div>
                )}

                {!searchQuery && (
                  <div className="search-hints">
                    <p className="search-hint-label">Try searching for:</p>
                    {['Docker', 'AWS', 'LangChain', 'React', 'Kubernetes', 'Certificate'].map(hint => (
                      <button key={hint} className="search-hint-chip" onClick={() => setSearchQuery(hint)}>
                        {hint}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ─── SOURCE CONTROL / GIT HISTORY ─── */}
          {activeActivity === 'git' && (
            <>
              <div className="sidebar-header">
                <span>SOURCE CONTROL: GIT</span>
              </div>
              <div className="sidebar-git-pane">

                {/* Tab toggle */}
                <div className="git-tab-row">
                  <button className={`git-tab ${gitView !== 'experience' ? 'git-tab--active' : ''}`}
                    onClick={() => setGitView('commits')}>
                    Commits ({GIT_COMMITS.length})
                  </button>
                  <button className={`git-tab ${gitView === 'experience' ? 'git-tab--active' : ''}`}
                    onClick={() => setGitView('experience')}>
                    Experience
                  </button>
                </div>

                {/* Branch & status */}
                {gitView !== 'experience' && (
                  <div className="git-branch-status">
                    <span className="git-branch-info">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5">
                        <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
                        <path d="M18 15V9a4 4 0 0 0-4-4H9" /><line x1="6" y1="9" x2="6" y2="15" />
                      </svg>
                      &nbsp;main
                    </span>
                    <span className="git-sync-icon">↑1 ↓0</span>
                  </div>
                )}

                {/* COMMIT HISTORY */}
                {gitView === 'commits' && (
                  <div className="git-commit-list">
                    {GIT_COMMITS.map((commit, i) => (
                      <div
                        key={commit.hash}
                        className={`git-commit-item ${selectedCommit?.hash === commit.hash ? 'git-commit-item--selected' : ''}`}
                        onClick={() => openCommitFile(commit)}
                      >
                        <div className="git-commit-graph">
                          <div className="git-graph-line" />
                          <div className="git-graph-dot" />
                          {i < GIT_COMMITS.length - 1 && <div className="git-graph-line" />}
                        </div>
                        <div className="git-commit-body">
                          <div className="git-commit-hash">{commit.hash}</div>
                          <div className="git-commit-msg">{commit.message}</div>
                          <div className="git-commit-meta">
                            <span className="git-commit-author">👤 {commit.author}</span>
                            <span className="git-commit-date">📅 {commit.date}</span>
                          </div>
                          <div className="git-commit-tags">
                            {commit.tags.map(tag => (
                              <span key={tag} className="git-tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* EXPERIENCE VIEW */}
                {gitView === 'experience' && (
                  <div className="git-experience-list">
                    <p className="git-exp-heading">📌 WORK EXPERIENCE</p>
                    {EXPERIENCES.map((exp) => (
                      <div key={exp.company} className="git-exp-card">
                        <div className="git-exp-icon">{exp.icon}</div>
                        <div className="git-exp-body">
                          <div className="git-exp-role">{exp.role}</div>
                          <div className="git-exp-company">{exp.company}</div>
                          <div className="git-exp-period">
                            <span className="git-exp-badge">{exp.type}</span>
                            {exp.period}
                          </div>
                          <ul className="git-exp-bullets">
                            {exp.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* DIFF VIEW after commit click */}
                {gitView === 'diff' && selectedCommit && (
                  <div className="git-diff-panel">
                    <button className="git-back-btn" onClick={() => setGitView('commits')}>
                      ← Back to commits
                    </button>
                    <div className="git-diff-hash">commit {selectedCommit.hash}</div>
                    <div className="git-diff-msg">{selectedCommit.message}</div>
                    <div className="git-diff-stats">
                      <span className="diff-added">+{selectedCommit.added} lines</span>
                      <span className="diff-removed">-{selectedCommit.removed} lines</span>
                    </div>
                    <div className="git-diff-detail">
                      <div className="git-diff-row"><span className="diff-key">Project:</span> {selectedCommit.detail.title}</div>
                      <div className="git-diff-row"><span className="diff-key">Role:</span> {selectedCommit.detail.role}</div>
                      <div className="git-diff-row"><span className="diff-key">Impact:</span> {selectedCommit.detail.impact}</div>
                      <div className="git-diff-row">
                        <span className="diff-key">Stack:</span>
                        <div className="diff-tech-tags">
                          {selectedCommit.detail.tech.map(t => (
                            <span key={t} className="diff-tech-tag">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="git-diff-desc">{selectedCommit.detail.description}</div>
                    </div>
                  </div>
                )}

              </div>
            </>
          )}
        </div>
      )}

      {/* Editor & Content Pane */}
      <div className="vscode-editor-container">
        {/* Tabs */}
        <div className="vscode-tabs-bar">
          <div className="tabs-scroll">
            {openTabs.map(fileId => {
              const file = files.find(f => f.id === fileId);
              if (!file) return null;
              return (
                <div
                  key={fileId}
                  className={`editor-tab ${activeFileId === fileId ? 'active' : ''}`}
                  onClick={() => setActiveFileId(fileId)}
                >
                  <span className="tab-icon">{file.icon}</span>
                  <span className="tab-label">{file.name}</span>
                  <button className="tab-close-btn" onClick={(e) => closeFile(fileId, e)}>
                    <CloseIcon />
                  </button>
                </div>
              );
            })}
          </div>
          <button className="mobile-sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)} title="Toggle Sidebar">
            {isSidebarOpen ? '⇠ Explorer' : '⇢ Explorer'}
          </button>
        </div>

        {/* Editor Area */}
        {openTabs.length > 0 ? (
          <div className="vscode-editor-view">
            {/* Code pane */}
            <div className="code-editor-pane">
              <div className="pane-header">Source Code ({activeFile.name})</div>
              <div className="code-lines-wrapper">
                {activeFile?.code && activeFile.code.trim().length > 0 && (
                  <div className="line-numbers">
                    {activeFile.code.split('\n').map((_, i) => (
                      <div key={i} className="line-num">{i + 1}</div>
                    ))}
                  </div>
                )}
                <pre className="code-content"><code>{activeFile.code}</code></pre>
              </div>
            </div>

            {/* Preview pane */}
            <div className="preview-pane">
              <div className="pane-header">Interactive Preview</div>
              <div className="preview-content">

                {activeFile.id === 'readme' && (
                  <div className="preview-readme">
                    <h1 className="readme-title">{activeFile.meta.title}</h1>
                    <p className="readme-subtitle">{activeFile.meta.subtitle}</p>
                    <hr className="readme-hr" />
                    <p className="readme-text">
                      {activeRole === 'pm'
                        ? 'Welcome! This workspace showcases the products I founded, the roadmaps I built, and the business outcomes I shipped — from idea to live users.'
                        : 'Welcome to my engineering workspace! Explore full-stack architectures, DevOps pipelines, AI agents and production deployments across all my projects.'}
                    </p>
                    <div className="readme-card">
                      <h3>📁 Directory Structure</h3>
                      <ul>
                        <li><strong>projects/</strong>: Full-stack apps, AI SaaS & DevOps-automated systems.</li>
                        <li><strong>certificates/</strong>: Cloud, AI, DevOps & engineering certifications.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeFile.folder === 'projects' && (
                  <div className="preview-project">
                    <ProjectPreviewCard activeFile={activeFile} projects={projects} />
                  </div>
                )}

                {activeFile.folder === 'certificates' && (
                  <div className="preview-cert">
                    <a href={activeFile.data.link} target="_blank" rel="noopener noreferrer" className="cert-preview-card">
                      <div className="cert-logo-wrapper">
                        <img src={activeFile.data.image} alt={activeFile.data.issuer} />
                      </div>
                      <div className="cert-details">
                        <span className="cert-tag-badge">{activeFile.data.tag}</span>
                        <h3>{activeFile.data.title}</h3>
                        <div className="cert-meta-info">
                          <span className="issuer">{activeFile.data.issuer}</span>
                          <span className="date">Issued: {activeFile.data.date}</span>
                        </div>
                      </div>
                      <div className="cert-verify-link">Verify Credential ↗</div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="no-files-open">
            <div className="no-files-content">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
              </svg>
              <h3>No Editor Open</h3>
              <p>Select a file in the sidebar to view its code and preview.</p>
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div className="vscode-status-bar">
          <div className="status-left">
            <span className="status-item git-branch">
              <ActivityIconGit />&nbsp;<span>main*</span>
            </span>
            <span className="status-item sync-status">↻</span>
            <span className="status-item error-status">
              <span style={{ fontSize: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '13px', height: '13px', border: '1px solid #fff', borderRadius: '2px', lineHeight: 1, fontWeight: 'bold' }}>✕</span> 0 &nbsp;⚠ 0
            </span>
          </div>
          <div className="status-right">
            <span className="status-item">Ln 1, Col 1</span>
            <span className="status-item">Spaces: 2</span>
            <span className="status-item">UTF-8</span>
            <span className="status-item language-mode">
              {activeFile ? (activeFile.type === 'json' ? 'JSON' : activeFile.type === 'md' ? 'Markdown' : 'TypeScript') : 'Plain Text'}
            </span>
          </div>
        </div>
      </div>

      {/* Project Demo Showcase Modal */}
      {demoModalProject && (
        <ProjectDemoModal
          project={demoModalProject}
          onClose={() => setDemoModalProject(null)}
        />
      )}
    </div>
  );
}

export default VSCodeWorkspace;
