import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ResumeGraveyard.css';

// Your actual resume evolution - organized chronologically based on file metadata
const oldResumes = [
  {
    id: 1,
    year: '2018 Lost',
    ripText: 'Where did it go???',
    description: 'Grade 8 resume assignment, lost to time. It was so empty...',
    details: '',
    pdfPath: null,
    isGhost: true
  },
  {
    id: 2,
    year: '2019 Origin',
    ripText: 'R.I.P. The Original',
    description: 'Where it all began, civics and careers grade 10',
    details: '',
    pdfPath: '/old-resumes/2022_01_original_version.pdf',
    isGhost: false
  },
  {
    id: 3,
    year: '2023 Feb',
    ripText: 'R.I.P. testing the waters',
    description: 'Unsure what I was doing here tbh',
    details: '',
    pdfPath: '/old-resumes/2023_05_email_version.pdf',
    isGhost: false
  },
  {
    id: 4,
    year: '2023 May',
    ripText: 'R.I.P. Fresh out of high school',
    description: 'Tried so hard to make it work',
    details: '',
    pdfPath: '/old-resumes/2023_02_early_version.pdf',
    isGhost: false
  },
  {
    id: 5,
    year: '2023 Summer',
    ripText: 'R.I.P. Summer Update v2.0',
    description: 'Getting more serious',
    details: '',
    pdfPath: '/old-resumes/2023_06_summer_version.pdf',
    isGhost: false
  },
  {
    id: 6,
    year: '2024 Jan',
    ripText: 'R.I.P. Special Hackathon Edition',
    description: 'First of the coloured resume phase, fun crossword on the back',
    details: '',
    pdfPath: '/old-resumes/2024_01_first_colored_resume.pdf',
    isGhost: false
  },
  {
    id: 7,
    year: '2024 Feb',
    ripText: 'R.I.P. Post Hackathon Inspiration',
    description: 'Removed crossword after hackathon feedback😅',
    details: '',
    pdfPath: '/old-resumes/2024_02_copy_version.pdf',
    isGhost: false
  },
  {
    id: 8,
    year: '2024 Spring',
    ripText: 'R.I.P. Spring Refresh v3.0',
    description: 'Tried my best to add more metrics',
    details: '',
    pdfPath: '/old-resumes/2024_03_spring_update.pdf',
    isGhost: false
  },
  {
    id: 9,
    year: '2024 Winter',
    ripText: 'R.I.P. Job Market Special',
    description: 'Finally conformed to a resume template',
    details: '',
    pdfPath: '/old-resumes/2024_06_job_hunt.pdf',
    isGhost: false
  },

  {
    id: 10,
    year: '2024 Winter',
    ripText: 'R.I.P. GPT Wrapper Project Resume',
    description: 'Tried to use OpenAI API for a cool project. Added to resume while still in progress',
    details: '',
    pdfPath: '/old-resumes/2024_06_timestamp_version.pdf',
    isGhost: false
  },
  {
    id: 12,
    year: '2024 Summer',
    ripText: 'R.I.P. Summer Polish v4.0',
    description: 'Finally got some real experience',
    details: '',
    pdfPath: '/old-resumes/2024_08_summer_polish.pdf',
    isGhost: false
  },
  {
    id: 13,
    year: '2025 New Year',
    ripText: 'R.I.P. Extra Extra Curricular',
    description: 'Added extra curricular activities',
    details: '',
    pdfPath: '/old-resumes/2025_06_new_year_attempt.pdf',
    isGhost: false
  }
//  ,
//   {
//     id: 13,
//     year: 'The Lost One',
//     ripText: 'R.I.P. The Corrupted',
//     description: 'Too cursed to exist',
//     details: '',
//     pdfPath: null,
//     isGhost: true
//   }
];

const ResumeGraveyard = ({ isOpen, onClose }) => {
  const [selectedResume, setSelectedResume] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [particles, setParticles] = useState([]);

  // Auto-scroll to graveyard when it opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the component is rendered
      setTimeout(() => {
        const graveyardElement = document.querySelector('.resume-graveyard');
        if (graveyardElement) {
          graveyardElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          // Fallback to scrolling to top
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  }, [isOpen]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 10,
        });
      }
      setParticles(newParticles);
    };

    if (isOpen) {
      generateParticles();
    }
  }, [isOpen]);

  const handleTombstoneClick = (resume) => {
    if (resume.isGhost || !resume.pdfPath) {
      // Handle ghost resumes with special effects
      setSelectedResume(resume);
      setShowModal(true);
    } else {
      setSelectedResume(resume);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResume(null);
  };

  if (!isOpen) return null;

  return (
    <div className="resume-graveyard graveyard-bg">
      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}

      {/* Close button */}
      <button 
        className="close-graveyard"
        onClick={onClose}
        aria-label="Close Resume Graveyard"
      >
        ×
      </button>

      <div className="container">
        <h1 className="graveyard-title">📜 RESUME GRAVEYARD 📜</h1>
        <p className="graveyard-subtitle">
          "Here lie the resumes of my past... click to disturb their eternal rest"
        </p>

        <div className="tombstone-grid">
          {oldResumes.map((resume) => (
            <div
              key={resume.id}
              className={`tombstone ${resume.isGhost ? 'ghost-resume' : ''}`}
              onClick={() => handleTombstoneClick(resume)}
            >
              <div className="tombstone-year">{resume.year}</div>
              <div className="tombstone-rip">{resume.ripText}</div>
              <div className="tombstone-description">{resume.description}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem', color: '#8a8fa0' }}>
          <p>💀 Click on any tombstone to resurrect an old resume 💀</p>
          <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
            "Every developer has a resume graveyard. These are mine."
          </p>
        </div>
      </div>

      {/* Resume Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
        centered
        className="resume-modal"
      >
        <Modal.Header closeButton style={{ borderColor: '#3a3a5e' }}>
          <Modal.Title>
            {selectedResume?.isGhost ? '👻' : '📄'} {selectedResume?.ripText} - Resurrected!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedResume?.details && (
            <div style={{ marginBottom: '1rem', fontStyle: 'italic', color: '#a0a6b0' }}>
              "{selectedResume?.details}"
            </div>
          )}
          
          {selectedResume?.isGhost || !selectedResume?.pdfPath ? (
            // Ghost resume - show spooky message
            <div className="resume-preview" style={{ 
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              color: '#e0e6ed',
              textAlign: 'center',
              padding: '3rem',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              fontFamily: 'Courier New'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>👻</div>
              <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#7877c6' }}>
                ERROR 404: RESUME NOT FOUND
              </div>
              <div style={{ fontSize: '1rem', color: '#a0a6b0', lineHeight: '1.6' }}>
                <p>&gt; RECOVERING FROM BACKUP...</p>
                <p>&gt; BACKUP CORRUPTED</p>
                <p>&gt; ATTEMPTING MANUAL RECOVERY...</p>
                <p style={{ color: '#ff6b6b' }}>&gt; RECOVERY FAILED</p>
                <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>
                  "Some resumes are too cursed to be resurrected..."
                </p>
              </div>
            </div>
          ) : (
            // Normal resume - show PDF
            <div style={{ height: '70vh', overflow: 'hidden', borderRadius: '10px' }}>
              <iframe
                src={`${process.env.PUBLIC_URL}${selectedResume?.pdfPath}#zoom=100`}
                width="100%"
                height="100%"
                style={{ border: 'none', borderRadius: '10px' }}
                title={`Resume ${selectedResume?.year}`}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ borderColor: '#3a3a5e' }}>
          <Button variant="outline-light" onClick={handleCloseModal}>
            Return to Graveyard 🪦
          </Button>
          {!selectedResume?.isGhost && selectedResume?.pdfPath && (
            <Button 
              variant="primary" 
              as="a"
              href={`${process.env.PUBLIC_URL}${selectedResume?.pdfPath}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open PDF in New Tab 🔗
            </Button>
          )}
          <Button 
            variant="success" 
            as="a"
            href="/Syed_Naqvi.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Current Resume 📄
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResumeGraveyard;
