// src/pages/Education.js
import React from 'react';

const education = [
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
      'TMA – Director of Events & First-Year Rep',
      'IveyHacks – 2nd Place Case Competition',
      'Mustang Tutors – Co-Founder',
      'HackWestern X Demo',
      'CS Undergraduate Society – Member',
    ],
  },
  {
    institution: 'Albert Campbell Collegiate Institute',
    logo: '/images/logos/acci.jpg',
    program: 'Ontario Secondary School Diploma',
    dates: '2018 – 2022',
    details: [
      { label: 'GPA', value: '4.0' },
      { label: 'Award', value: 'DECA Regional Finalist' },
    ],
    courses: ['Computer Science (ICS4U) – 99%'],
    activities: [
      'Muslim Students’ Association – Founder & Director',
      'Sock Market Game Club – VP & CMO',
      'DECA · HOSA Member',
    ],
    highlights: [
      'Reopened a prayer room and grew MSA membership.',
      'Grew SMGC to 135 members, making it the largest club.',
    ],
  },
];

export default function Education() {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Education</h1>
      <div className="row g-4">
        {education.map((ed, idx) => (
          <div key={idx} className="col-12 col-lg-6">
            <div className="card h-100 shadow-sm">
              <div className="row g-0 align-items-start">
                {/* Logo */}
                <div className="col-4 col-sm-3 bg-success rounded justify-content-start d-flex">
                  <img
                    src={process.env.PUBLIC_URL + ed.logo}
                    alt={`${ed.institution} logo`}
                    className="img-fluid p-3"
                  />
                </div>
                {/* Details */}
                <div className="col-8 col-sm-9">
                  <div className="card-body">
                    <h5 className="card-title">{ed.program}</h5>
                    <h6 className="text-muted mb-2">
                      {ed.institution} &middot; {ed.dates}
                    </h6>

                    {/* Key details */}
                    <ul className="list-unstyled mb-3">
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
                        <ul className="ms-3 mb-3">
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
                        <ul className="ms-3 mb-3">
                          {ed.activities.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Highlights */}
                    {ed.highlights?.length > 0 && (
                      <>
                        <h6 className="mb-1">Highlights</h6>
                        <ul className="ms-3 mb-0">
                          {ed.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </>
                    )}
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
