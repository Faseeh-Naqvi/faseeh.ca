// src/pages/Home.js
import React from 'react';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
      {/* Profile Image */}
      <img
        src="/images/profile.jpeg"
        alt="Syed Naqvi"
        className="rounded-circle mb-4"
        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
      />

      {/* Name */}
      <h1 className="display-1 fw-bold mb-2">Syed Naqvi</h1>
      <p className="fs-4 mb-4 text-secondary">
        3rd-year Computer Science Student & Software Developer
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

      {/* Resume Button */}
      <a
        href="/Syed_Naqvi.pdf"
        className="btn btn-lg btn-outline-secondary rounded-pill px-5"
        download
        style={{ fontSize: '1.25rem' }}
      >
        Download Resume
      </a>
    </div>
);
}
