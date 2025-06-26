// src/pages/Education.js
import React from 'react';

const education = [
  /* ---------- Western ---------- */
  {
    institution: 'Western University',
    logo: '/images/logos/western.svg',
    program: 'B.Sc. Computer Science · Minor in Software Engineering',
    dates: '2022 – 2026 (expected)',
    details: [
      { label: 'sGPA', value: '3.7 / 4.0' },
      { label: 'Awards', value: 'Dean’s Honour List, $3 500 Scholarship of Distinction' },
    ],
    courses: [
      'Algorithms & Data Structures',
      'Database Systems',
      'Artificial Intelligence',
      'Operating Systems',
      'Object-Oriented Design & Analysis',
    ],
    activities: [
      'TMA – Director of Events · First-Year Representative',
      'IveyHacks Case Competition – 2nd Place',
      'Mustang Tutors – Co-Founder',
      'Demo – HackWestern X',
      'Computer Science Undergraduate Society – Member',
    ],
  },

  /* ---------- ACCI ---------- */
  {
    institution: 'Albert Campbell Collegiate Institute',
    logo: '/images/logos/acci.jpg',
    program: 'Ontario Secondary School Diploma',
    dates: '2018 – 2022',
    details: [
      { label: 'GPA', value: '4.0' },
      { label: 'Award', value: 'DECA Case Competition – Regional Finalist' },
    ],
    courses: ['Computer Science (ICS4U) – 99 %'],
    activities: [
      'MSA (Muslim Students’ Association) – Founder & Director',
      'SMGC (Sock Market Game Club) – Vice-President & CMO',
      'DECA · HOSA',
    ],
    highlights: [
      'Provided a safe space for Muslim students and reopened a prayer room.',
      'Grew SMGC to 135 members — the school’s largest club that year.',
    ],
  },
];

export default function Education() {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Education</h1>

      {education.map((ed, idx) => (
        <div key={idx} className="d-flex mb-5">
          {/* ---- Logo ---- */}
          <div className="me-4" style={{ flex: '0 0 200px' }}>
            <img
              src={process.env.PUBLIC_URL+  ed.logo}
              alt={`${ed.institution} logo`}
              className="img-fluid"
            />
          </div>

          {/* ---- Details ---- */}
          <div className="flex-grow-1">
            <h5 className="mb-1">{ed.program}</h5>
            <small className="text-muted">
              {ed.institution} · {ed.dates}
            </small>

            {/* Key facts */}
            <ul className="list-unstyled mt-2 mb-3">
              {ed.details.map((d, i) => (
                <li key={i}>
                  <strong>{d.label}:</strong> {d.value}
                </li>
              ))}
            </ul>

            {/* Coursework */}
            {ed.courses?.length > 0 && (
              <>
                <h6 className="mb-1">Notable Coursework</h6>
                <ul className="ms-3">
                  {ed.courses.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Activities */}
            {ed.activities?.length > 0 && (
              <>
                <h6 className="mb-1">Activities</h6>
                <ul className="ms-3">
                  {ed.activities.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Extra highlights (for ACCI) */}
            {ed.highlights?.length > 0 && (
              <>
                <h6 className="mb-1">Highlights</h6>
                <ul className="ms-3">
                  {ed.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
