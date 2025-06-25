import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left: Profile Image */}
        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img
            src="/images/profile.jpeg"
            alt="Syed Naqvi"
            className="rounded-circle img-fluid"
            style={{ maxWidth: '250px' }}
          />
        </div>

        {/* Right: Intro, Links, Resume */}
        <div className="col-md-8">
          <h1 className="display-4 fw-bold">Syed Naqvi</h1>
          <p className="lead">3rd-year Computer Science Student & Software Developer</p>

          {/* Links */}
          <div className="d-flex align-items-center my-3">
            <a
              href="https://www.linkedin.com/in/faseeh-naqvi/"
              className="me-3 text-primary fs-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Faseeh-Naqvi"
              className="me-3 text-dark fs-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            
          </div>

          {/* Resume Download */}
          <a
            href="/Syed_Naqvi.pdf"
            className="btn btn-outline-secondary btn-lg rounded-pill"
            download
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
