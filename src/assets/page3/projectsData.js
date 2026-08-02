export const projectsBase = [
  {
    title: 'Tickzen',
    image: 'https://res.cloudinary.com/dgbkepcti/image/upload/v1781290784/website-front/tickzen_vd06ui.png',
    hlsVideo: 'https://res.cloudinary.com/dgbkepcti/video/upload/sp_hd/v1785610509/project-video/tick/TICKZEN_v53yot.m3u8',
    shortVideo: 'https://res.cloudinary.com/dgbkepcti/video/upload/q_auto:best,f_auto/v1785610509/project-video/tick/TICKZEN_v53yot.mp4',
    website: 'https://tickzen.in.net',
    github: 'https://github.com/prakashkr2894/tickzen',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    roles: ['se', 'devops', 'pm', 'ai'],
    techSpecs: {
      frontend: 'Next.js, Tailwind CSS',
      backend: 'FastAPI, MongoDB',
      aiVoice: 'RAG Model, AssemblyAI (Voice-to-Text Transcription)',
      infra: 'Hosted on Personal VPS, Docker, Kubernetes & PM2'
    },
    descriptions: {
      se:  'TickZen is a modern SaaS-based project management platform inspired by Jira, ClickUp, and Trello. It helps teams manage projects, tasks, real-time collaboration, and AI-assisted workflows from a single platform.\n\nUnlike traditional task management applications, TickZen integrates Zentrixa-AI, an intelligent voice assistant capable of understanding natural language commands, automating project operations, and assisting users using a hybrid AI architecture.',
      pm:  'Founded & led TickZen from idea to production as Product Owner.\nDesigned Zentrixa-AI roadmap, onboarded 25+ active users with ~80% voice recognition accuracy.',
    },
    tags: {
      se:  [],
      pm:  ['SaaS Founder', 'Product Owner', '25+ Users', '~80% Accuracy'],
    },
    tagColor: 'gold',
    features: [
      'Zentrixa-AI voice-to-action AI agent powered by AssemblyAI & LLM router',
      'Multi-tenant Kanban workspace with real-time drag-and-drop',
      'Secure multi-role RBAC & OTP-based authentication flow',
      'Integrated Razorpay payment gateway for SaaS subscription management'
    ],
    upcomingFeatures: [
      { title: 'AI Automated Sprint Retrospectives', status: 'In Progress', target: 'Q3 2026' },
      { title: 'Slack & Discord Webhook Alerts', status: 'Planned', target: 'Q4 2026' },
      { title: 'Offline-First Desktop App (Tauri/Electron)', status: 'Planned', target: 'Q4 2026' }
    ]
  },
  {
    title: 'MedTrackFit',
    image: 'https://res.cloudinary.com/dyjlmweqb/image/upload/v1750796322/front_lwn0zr.png',
    website: 'https://medtrackfit.in.net',
    github: 'https://github.com/prakashkr2894/medtrackfit',
    videoUrl: '',
    roles: ['se', 'devops', 'pm', 'ai'],
    techSpecs: {
      frontend: 'React.js, Tailwind CSS',
      backend: 'Spring Boot, OAuth2, 15+ REST APIs, MySQL',
      aiVoice: 'AI Health Symptom Triage Assistant',
      infra: 'Kubernetes + Istio Service Mesh, Ubuntu VPS, Docker'
    },
    descriptions: {
      se:  '4-role access system (Patient, Mentor, Doctor) with Spring Security & OAuth2 and 15+ REST APIs.\nDeployed via Kubernetes + Istio CI/CD pipeline with zero-downtime on Ubuntu VPS.',
      pm:  'Conceived at AICTE IDE Bootcamp — ranked Top 10 (Top 4%) among 250+ startups.\nShowcased to Founder of Rodbez & IAS Officers of Patna at CIMP. Led product from idea → live platform.',
    },
    tags: {
      se:  ['Spring Boot', 'OAuth2', 'MySQL', 'Kubernetes', 'Istio'],
      pm:  ['Top 10 AICTE', 'CIMP Showcase', 'Health SaaS', 'Founder'],
    },
    tagColor: 'cyan',
    features: [
      '4-Role Security & Access System (Patient, Mentor, Doctor, Admin)',
      '15+ Enterprise RESTful APIs built with Spring Boot & OAuth2',
      'Istio Service Mesh integration with mTLS & canary deployment',
      'Real-time medical tracking & patient-doctor messaging engine'
    ],
    upcomingFeatures: [
      { title: 'AI Symptom Checker & Triage Assistant', status: 'In Progress', target: 'Q3 2026' },
      { title: 'Wearable Device Sync (Apple Health / Google Fit)', status: 'Planned', target: 'Q4 2026' }
    ]
  },
  {
    title: 'Cloud-Native Microservices',
    image: 'https://res.cloudinary.com/dyjlmweqb/image/upload/v1750796324/log_q3ira8.png',
    website: 'https://github.com/prakashkr2894',
    github: 'https://github.com/prakashkr2894',
    videoUrl: '',
    roles: ['devops', 'se'],
    techSpecs: {
      frontend: 'Grafana & Jaeger Observability Dashboards',
      backend: 'Go / Python Microservices, Helm Charts IaC',
      aiVoice: 'Prometheus AlertManager & Metric Analytics',
      infra: 'Kubernetes, Istio Service Mesh, mTLS, GitOps Actions'
    },
    descriptions: {
      se:  'Kubernetes microservices platform with Helm IaC — version-controlled Deployments, ConfigMaps & Ingress.\nIstio service mesh with canary deployments, mTLS, circuit breaking & Prometheus + Grafana observability.',
      pm:  '',
    },
    tags: {
      se:  ['Kubernetes', 'Helm', 'Istio', 'Prometheus', 'Grafana'],
      pm:  [],
    },
    tagColor: 'cyan',
    features: [
      'Helm charts IaC for automated environment provisioning',
      'Istio Service Mesh with mTLS, Canary releases & Circuit Breaking',
      'Full Observability suite (Prometheus, Grafana, Jaeger Tracing)',
      'GitOps workflow with automated GitHub Actions CI/CD'
    ],
    upcomingFeatures: [
      { title: 'ArgoCD GitOps Deployment Pipeline', status: 'In Progress', target: 'Q3 2026' },
      { title: 'KEDA Auto-Scaling for Event-Driven Jobs', status: 'Planned', target: 'Q4 2026' }
    ]
  },
  {
    title: 'Vartalap',
    image: 'https://res.cloudinary.com/dyjlmweqb/image/upload/v1750796324/log_q3ira8.png',
    website: 'https://vartalap.in.net',
    github: 'https://github.com/prakashkr2894/vartalap',
    videoUrl: '',
    roles: ['se', 'devops', 'pm'],
    techSpecs: {
      frontend: 'React.js, Socket.IO Client',
      backend: 'Node.js, Express, MongoDB Persistence, JWT Auth',
      aiVoice: 'Real-time WebSocket Bidirectional Messaging Engine',
      infra: 'Docker Containers, GitHub Actions CI/CD, Nginx, PM2, VPS'
    },
    descriptions: {
      se:  'Real-time bidirectional chat with Socket.IO, MongoDB persistence & JWT auth.\nGitHub Actions CI/CD cut deployment from 45 min to under 5 min. Nginx + PM2 on Ubuntu VPS.',
      pm:  'WebSocket-driven social platform focused on zero-friction onboarding and low-latency messaging.\nDesigned the UX flow to minimise time-to-first-message and maximise user retention.',
    },
    tags: {
      se:  ['Socket.IO', 'MERN', 'Docker', 'GitHub Actions', 'PM2'],
      pm:  ['Real-time UX', 'WebSocket', 'Zero-friction', 'Community'],
    },
    tagColor: 'purple',
    features: [
      'Bidirectional low-latency messaging with Socket.IO',
      'Persistent MongoDB message storage with indexing',
      'JWT Authentication & Session management',
      'Docker containerized deployment via GitHub Actions'
    ],
    upcomingFeatures: [
      { title: 'End-to-End Encryption (E2EE)', status: 'In Progress', target: 'Q3 2026' },
      { title: 'Group Voice & Video Calling (WebRTC)', status: 'Planned', target: 'Q4 2026' }
    ]
  },
  {
    title: 'Aura Elysian',
    image: 'https://res.cloudinary.com/dgbkepcti/image/upload/v1764253929/pic/aura_fpeoxg.png',
    website: 'https://auraelysian.shop',
    github: 'https://github.com/prakashkr2894',
    videoUrl: '',
    roles: ['se', 'pm'],
    techSpecs: {
      frontend: 'React.js, TypeScript, Tailored CSS',
      backend: 'Node.js, Express, MongoDB, Razorpay Gateway',
      aiVoice: 'Custom Product Image Pre-Caching Engine',
      infra: 'Vercel, Node PM2, GitHub Actions CI/CD'
    },
    descriptions: {
      se:  'Full-stack D2C e-commerce (React, TypeScript, Node.js, MongoDB) with Razorpay checkout.\nCustom image pre-caching for Core Web Vitals, real-time multi-facet filtering & Admin order panel.',
      pm:  'D2C candle brand with a custom personalisation engine — customers upload reference images for bespoke orders.\nFocused on reducing purchase friction and increasing AOV through curated discovery.',
    },
    tags: {
      se:  ['React', 'TypeScript', 'Razorpay', 'MongoDB'],
      pm:  ['D2C Brand', 'Personalisation', 'AOV Focus', 'Admin Panel'],
    },
    tagColor: 'cyan',
    features: [
      'Full D2C E-commerce storefront with custom product builder',
      'Razorpay payment checkout & order tracking admin portal',
      'Image pre-caching & web vital optimizations',
      'Real-time multi-facet category filtering'
    ],
    upcomingFeatures: [
      { title: 'AR Custom Candle 3D Preview', status: 'Planned', target: 'Q4 2026' }
    ]
  },
  {
    title: 'Page Crafter',
    image: 'https://res.cloudinary.com/dyjlmweqb/image/upload/v1771908564/page-crafter_daor00.png',
    website: 'https://page-crafter-ten.vercel.app/',
    github: 'https://github.com/prakashkr2894',
    videoUrl: '',
    roles: ['se', 'pm'],
    techSpecs: {
      frontend: 'Vanilla JavaScript (DOM Manipulation)',
      backend: 'Event-driven DOM Layout Engine',
      aiVoice: 'Clean HTML & CSS Exporter Architecture',
      infra: 'Vercel Static Hosting'
    },
    descriptions: {
      se:  'Drag-and-drop homepage builder with live preview and clean HTML export.\nBuilt in vanilla JavaScript — showcasing DOM manipulation, event-driven architecture & dynamic layout.',
      pm:  'No-code page builder removing the biggest user friction: needing to write code.\nDrag, drop, preview, export — landing pages ready in minutes. Zero coding required.',
    },
    tags: {
      se:  ['JavaScript', 'DOM', 'Drag & Drop', 'Builder'],
      pm:  ['No-Code', 'UX-First', 'Friction Removal', 'Builder'],
    },
    tagColor: 'purple',
    features: [
      'No-code drag-and-drop component layout engine',
      'Live dynamic preview with clean HTML/CSS code exporter',
      'Vanilla JavaScript DOM manipulation architecture'
    ],
    upcomingFeatures: [
      { title: 'Pre-designed Template Library', status: 'In Progress', target: 'Q3 2026' }
    ]
  },
];
