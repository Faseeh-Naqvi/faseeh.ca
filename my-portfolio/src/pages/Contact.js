import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import './Contact.css';  

export default function Contact() {
  const linkedInUrl = 'https://www.linkedin.com/in/faseeh-naqvi/';

  return (
    <div className="container py-5 contact-wrapper">
      <div className="contact-card">
        <div className="contact-icon" aria-hidden="true">
          <FaLinkedin />
        </div>
        <p className="contact-kicker">Contact</p>
        <h1 className="fw-bold mb-3">Send me a message on LinkedIn</h1>
        <p className="contact-copy">
          The best way to reach me is LinkedIn. Send me a message if you are building something, want to talk business, or think we should work together.
        </p>
        <a
          href={linkedInUrl}
          className="btn btn-lg contact-linkedin-button rounded-pill"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
          Message me on LinkedIn
        </a>
        <p className="contact-note">
          LinkedIn does not offer a reliable public embed for personal-profile messaging, so this opens my profile directly.
        </p>
      </div>
    </div>
  );
}
