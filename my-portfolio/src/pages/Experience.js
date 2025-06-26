import React from "react";

const experience = [
  // 1 - Deep full-stack & geospatial work on a 30 k-line codebase
  {
    company: "Geo-Notebook",
    logo: "/images/logos/geo.png",
    role: "Full-Stack Software Developer",
    dates: "May 2024 – Present",
    bullets: [
      "Developed of a geospatial web app funded by the Canadian Geological Foundation to analyse planetary-impact data.",
      "Upgraded a 30k-line Angular/TypeScript codebase (v12 → v18), replacing legacy map tools with Google Maps JS API + ArcGIS.",
      "Integrated the app with a Heroku-hosted PostgreSQL database by building API connections and populating sample data, enabling scalable testing and map-based crater event visualization",
      "Enhanced the frontend experience with Angular Material and RxJS: added marker clustering, reset buttons, loading states, and responsive result cards",
    ],
  },

  // 2 - Production SaaS platform with live integrations and hard SLAs
  {
    company: "Flyer Canada",
    logo: "/images/logos/fc.jpg",
    role: "Software Developer",
    dates: "Feb 2025 – Present",
    bullets: [
      "Delivered a secure real-time order-tracking platform for 10 000+ businesses, cutting support tickets by 30 %.",
      "Integrated Monday.com GraphQL API with Make.com webhooks and javascript, automating end-to-end status updates.",
      
    ],
  },

  // 3 - Data-engineering heavy Python CLI & infrastructure
  {
    company: "Carolinian Canada Coalition",
    logo: "/images/logos/carolinian.png",
    role: "Data Automation & Web Development Intern",
    dates: "Jan 2024 – Apr 2024",
    bullets: [
      "Developed a Python CLI Facebook Data Parser for semi-structured data formats (ex. YAML, JSON) with hash-based duplication protection.",
      "Automated the extraction and analysis of 23,798+ lines of post data, Used to generate insights for a major scientific journal.",
      "Refactored and maintained 109+responsive web-pages using Javascript, Bootstrap, HTML/CSS, PHP, Drupal 10, and Twig, strictly following WCAG guidelines",
      "Configured and managed a custom Linux-based development environment with Ubuntu v22, Docker v20, Composer, and Lando",
    ],
  },

  // 4 - Drupal migration & accessibility work
  {
    company: "Thaqlain Muslim Association",
    logo: "/images/logos/tma.webp",
    role: "Dir Events & Social Media Marketing",
    dates: "Oct 2024 – Dec 2024",
    bullets: [
    "Negotiated a record-breaking $315 event sponsorship deal—15× previous funding—by coordinating with external vendors and building strategic partnerships with restaurants across London.",
    "Designed and implemented an Instagram-focused event-marketing strategy using analytics to optimise posts, reaching 12 400+ views and boosting engagement by 152 %.",
  ],
  },
  {
    company: "Western Univerity",
    logo: "/images/logos/western.svg",
    role: "Web Designer",
    dates: "May 2024 – Aug 2024",
    bullets: [
      "Developed of a geospatial web app funded by the Canadian Geological Foundation to analyse planetary-impact data.",
      
    ],
  },
  // 5 - Freelance agency work (shows initiative & breadth)
  {
    company: "FasTech",
    logo: "/images/logos/fastech.png",
    role: "Founder & Web Developer",
    dates: "Jun 2023 – Jun 2024",
    bullets: [
      "Bootstrapped a freelance web-dev business, delivering eight client sites with React, WordPress, and Shopify.",
    ],
  },
  // — Marketing & outreach work
{
  company: "BrainSTEM Alliance",
  logo: "/images/logos/brain.webp",   // add logo to public/images/logos
  role: "Marketing Specialist",
  dates: "Jul 2023 – Aug 2023",
  bullets: [
    "Optimized email campaigns with Canva-designed visuals and personalized content, driving higher open- and click-through rates, and boosting engagement.",
    "Praised by supervisors for data-driven YAMM + Excel templates that improved project outcomes.",
  ],
},

// — STEM education & public speaking
{
  company: "University of Toronto (AIS Outreach)",
  logo: "/images/logos/uft.svg",        // add logo to public/images/logos
  role: "Volunteer Educator",
  dates: "Oct 2021 – May 2022",
  bullets: [
    "Co-designed and delivered an interactive Grade-8 lesson on Artificial Intelligence & Space, translating complex ML and astronomy topics into hands-on activities.",
    "Researched AI sub-fields (automation, machine learning, NLP, computer vision) and cosmology, then simplified concepts to improve peer understanding and student engagement.",
    "Led a live Q&A session, honing science-communication skills by answering student questions in clear, accessible language. ",
  ],
},

];

export default function Experience() {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Experience</h1>

      {experience.map((exp, idx) => (
        <div key={idx} className="d-flex mb-5">
          {/* Logo */}
          <div className="me-4" style={{ flex: "0 0 200px" }}>
            <img
              src={exp.logo}
              alt={`${exp.company} logo`}
              className="img-fluid"
              style={{  }}
            />
          </div>

          {/* Details */}
          <div>
            <h5 className="mb-1">
              {exp.role} @ {exp.company}
            </h5>
            <small className="text-muted mb-2 d-block">{exp.dates}</small>
            <ul className="mb-0">
              {exp.bullets.map((b, i2) => (
                <li key={i2}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
