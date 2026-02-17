// src/pages/Home.js
import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
import ResumeGraveyard from '../components/ResumeGraveyard';
import './Home.css';

export default function Home() {
  const [showGraveyard, setShowGraveyard] = useState(false);

  return (
    <>
      <div className="home-hero d-flex flex-column justify-content-center align-items-center text-center vh-100 p-3">
        {/* Profile Image with border and shadow */}
        <div className="home-profile-img mb-4">
          <img
            src="/images/profile.jpeg"
            alt="my profile picture"
            className="rounded-circle shadow-lg"
            style={{ width: '180px', height: '180px', objectFit: 'cover', border: '5px solid var(--bs-primary)', boxShadow: '0 8px 32px rgba(44,75,44,0.13)' }}
          />
        </div>

        {/* Name & tagline */}
        <h1 className="display-2 fw-bold mb-1 home-title" style={{ color: 'var(--bs-dark)' }}>Syed Faseeh Hayder Naqvi</h1>
        <div className="mb-3">
          <span className="badge bg-success bg-opacity-75 fs-5 px-4 py-2" style={{ letterSpacing: '0.03em', fontWeight: 600 }}>Problem Solver • Builder • CS @ Western</span>
        </div>

        {/* Big Icon Links */}
        <div className="d-flex align-items-center justify-content-center mb-4 gap-4">
          <a
            href="https://www.linkedin.com/in/faseeh-naqvi/"
            className="icon-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '2.6rem' }}
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Faseeh-Naqvi"
            className="icon-github"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '2.6rem' }}
            title="GitHub"
          >
            <FaGithub />
          </a>
        </div>

        {/* Resume Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3 align-items-center mb-3">
          <a
            href="/Syed_Naqvi.pdf"
            className="btn btn-lg btn-theme rounded-pill px-5 py-3 fs-5"
            download
          >
            Download Resume
          </a>
          <button
            className="btn btn-lg btn-theme rounded-pill px-5 py-3 fs-5"
            onClick={() => setShowGraveyard(true)}
            style={{ fontWeight: 500 }}
          >
            👻 Resume Graveyard
          </button>
        </div>

        {/* Quick Links */}
        <div className="d-flex flex-column flex-sm-row gap-3 align-items-center mt-2">
          <a href="/businesses" className="btn btn-lg btn-theme rounded-pill px-5 py-3 fs-5">See what I'm working on</a>
          <a href="/about" className="btn btn-lg btn-theme rounded-pill px-5 py-3 fs-5">Learn more about me!</a>
          <a href="/projects" className="btn btn-lg btn-theme rounded-pill px-5 py-3 fs-5">See where I am solving unique problems</a>
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
