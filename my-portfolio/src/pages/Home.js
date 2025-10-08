// src/pages/Home.js
import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
import ResumeGraveyard from '../components/ResumeGraveyard';

export default function Home() {
  const [showGraveyard, setShowGraveyard] = useState(false);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
        {/* Profile Image */}
        <img
          src= {process.env.PUBLIC_URL + "/images/profile.jpeg"}
          alt="my profile picture"
          className="rounded-circle mb-4"
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />

        {/* Name */}
        <h1 className="display-1 fw-bold mb-2">Syed Faseeh Hayder Naqvi</h1>
        <p className="fs-4 mb-4 text-secondary">
          4th-year Computer Science Student & Software Developer
        </p>

        {/* Big Icon Links */}
        <div className="d-flex align-items-center mb-4">
          <a
            href="https://www.linkedin.com/in/faseeh-naqvi/"
            className="me-4 text-primary"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '2.5rem' }}
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Faseeh-Naqvi"
            className="me-4 text-dark"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '2.5rem' }}
          >
            <FaGithub />
          </a>
          
        </div>

        {/* Resume Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3 align-items-center">
          <a
            href="/Syed_Naqvi.pdf"
            className="btn btn-lg btn-outline-secondary rounded-pill px-5"
            download
            style={{ fontSize: '1.25rem' }}
          >a
            Download Resume
          </a>
          
          <button
            className="btn btn-lg btn-outline-dark rounded-pill px-4"
            onClick={() => setShowGraveyard(true)}
            style={{ 
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #4a6b4a 0%, #2d4a2d 100%)',
              color: '#f0f7f0',
              border: '2px solid #8fbc8f',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(143, 188, 143, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            👻 Resume Graveyard
          </button>
        </div>
      </div>

      {/* Resume Graveyard Component */}
      <ResumeGraveyard 
        isOpen={showGraveyard} 
        onClose={() => setShowGraveyard(false)} 
      />
    </>
  );
}
