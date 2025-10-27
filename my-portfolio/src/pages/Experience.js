// src/pages/Experience.js
import React from 'react';

const experience = [
  {
    company: 'EMRC Lab',
    logo: '/images/logos/emrc_lab_logo.jpeg',
    role: 'Software Developer',
    dates: 'Sep 2025 – Present',
    bullets: [
      'Managed full-stack maintenance of a smart traffic-monitoring IoT',
'Implemented a custom server API to replace client-side log parsing, enabling reliable real-time device status; increased capacity from 100 messages to effectively unbounded with load scaling to O(devices)'
    ],
  },
  {
    company: 'Geo-Notebook',
    logo: '/images/logos/geo.png',
    role: 'Full-Stack Software Developer',
    dates: 'May 2024 – Aug 2025',
    bullets: [
      'Built a geospatial web app for the Canadian Geological Foundation to analyse impact data.',
      'Upgraded a 30 k-line Angular/TypeScript codebase (v12 → v18), integrating Google Maps JS API & ArcGIS.',
      'Connected to a Heroku-hosted PostgreSQL database via a custom API for scalable testing & visualization.',
      'Enhanced UX with Angular Material, adding marker clustering, reset buttons, loading states, & responsive cards.',
    ],
  },
  {
    company: 'Flyer Canada',
    logo: '/images/logos/fc.jpg',
    role: 'Software Developer',
    dates: 'Feb 2025 – Present',
bullets: [
      'Delivered a secure, real-time order tracking platform used by over 10,000+ businesses nationwide, reducing client support tickets by 30% by integrating Monday.com’s API with Make.com webhooks and automating live order status updates.',
      'Developed a QR-code analytics SaaS platform (React/Node.js/Express, MongoDB, JWT) featuring a scan location heatmap, device type chart, and a time-based trends graph, that auto-refresh live via WebSockets/Server-Sent Events.',
      'Built end-to-end QR creation and management solution with custom frames, colors, and logo; generated PNG/SVG plus a short tracking URL; editable redirect and CSV export; and multi-QR management support.',
    ],
  },
  {
    company: 'Carolinian Canada Coalition',
    logo: '/images/logos/carolinian.png',
    role: 'Data Automation & Web Dev Intern',
    dates: 'Jan 2024 – Apr 2024',
    bullets: [
      'Built a Python CLI Facebook Data Parser with hash-based duplicate protection for YAML/JSON inputs.',
      'Parsed & analysed 23 798+ posts, generating insights for a major scientific journal.',
      'Refactored 109+ responsive pages in JavaScript, Bootstrap, PHP & Twig to meet WCAG accessibility.',
      'Managed a custom Ubuntu v22/Docker/Lando environment for team-wide consistency.',
    ],
  },
  {
    company: 'Thaqlain Muslim Association',
    logo: '/images/logos/tma.webp',
    role: 'Director of Events & Social Media Marketing',
    dates: 'Oct 2024 – Dec 2024',
    bullets: [
      'Secured a $315 000 sponsorship — 15× previous funding — by negotiating with restaurants & vendors.',
      'Designed an Instagram-first strategy using analytics to boost engagement 152 % (12.4 k views).',
    ],
  },
  {
    company: 'FasTech',
    logo: '/images/logos/fastech.png',
    role: 'Founder & Web Developer',
    dates: 'Jun 2023 – Jun 2024',
    bullets: [
      'Bootstrapped a freelance agency, delivering 8 client sites with React, WordPress & Shopify.',
    ],
  },
  {
    company: 'BrainSTEM Alliance',
    logo: '/images/logos/brain.webp',
    role: 'Marketing Specialist',
    dates: 'Jul 2023 – Aug 2023',
    bullets: [
      'Optimized email campaigns with Canva-designed visuals, boosting open/click rates.',
      'Built YAMM + Excel templates to drive data-informed project improvements.',
    ],
  },
  {
    company: 'U of T AIS Outreach',
    logo: '/images/logos/uft.svg',
    role: 'Volunteer Educator',
    dates: 'Oct 2021 – May 2022',
    bullets: [
      'Co-designed & delivered an interactive Grade 8 AI & Space lesson with hands-on activities.',
      'Simplified ML, NLP, & cosmology concepts for student Q&A in clear, accessible language.',
    ],
  },
];

export default function Experience() {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Experience</h1>
      <div className="row g-4">
        {experience.map((exp, idx) => (
          <div key={idx} className="col-12 col-lg-6">
            <div className="card  h-100 shadow-sm">
              <div className="row  g-0 align-items-start">
                {/* Logo */}
                <div className="col-4 bg-success col-sm-3 rounded text-center">
                  <img
                    src={process.env.PUBLIC_URL + exp.logo}
                    alt={`${exp.company} logo`}
                    className="img-fluid p-3"
                  />
                </div>
                {/* Details */}
                <div className="col-8 col-sm-9">
                  <div className="card-body">
                    <h5 className="card-title">
                      {exp.role} @ {exp.company}
                    </h5>
                    <small className="text-muted mb-3 d-block">
                      {exp.dates}
                    </small>
                    <ul className="mb-0">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
