import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import "./Projects.css";

/* ------------------------------------------------------------------ */
/* CONFIG                                                              */
/* ------------------------------------------------------------------ */
// Configuration removed as we're using iMessage-style gallery instead

/* ------------------------------------------------------------------ */
/* DATA – ADD/EDIT PROJECTS HERE                                       */
/* ------------------------------------------------------------------ */
const projects = [
  {
    id: "qr",
    title: "Flyer Canada QR Code Tracker",
    description: "real-time QR creation & analytics platform (React/Node/Express, MongoDB, JWT) with a scan-location heatmap, device-mix chart, and time-series trends that live-update via SSE/WebSockets",
    media: [
      { type: "image", src: "/images/projects/qrCode/Screenshot from 2025-08-24 21-33-16.png" },
      { type: "image", src: "/images/projects/qrCode/Screenshot from 2025-08-24 21-34-19.png"}
      
    ],
    link: "",
    featured: true,
  },
  {
    id: "attentify",
    title: "Attentify",
    description: "AI‑powered productivity tool for the ADHD community, featuring Pomodoro timers and smart note‑taking.",
    media: [
      { type: "video", src: "https://www.youtube.com/embed/psG8CecwZq8" },
      { type: "image", src: "/images/projects/attentify/attentify1.jpg" },
      { type: "image", src: "/images/projects/attentify/attentify2.jpg" },
      { type: "image", src: "/images/projects/attentify/attentify3.jpg" },
    ],
    link: "https://devpost.com/software/attentify",
    featured: true,
  },
  {
    id: "impact‑earth",
    title: "Geo-Notebook",
    description: "Developed of a geospatial web app to analyze, visualize, and manage planetary impact data for Earth Science research.",
    media: [
      { type: "image", src: "/images/projects/impact-earth/impact1.png" },
      { type: "image", src: "/images/projects/impact-earth/impact2.png" },
      { type: "image", src: "/images/projects/impact-earth/impact3.png" },
      { type: "image", src: "/images/projects/impact-earth/impact4.png" },
    ],
    link: "https://impactearth.herokuapp.com/marketing",
    featured: true,
  },
  {
    id: "clocky",
    title: "Clocky",
    description: "Dynamic web clock that changes background based on geolocation & sunrise/sunset API data.",
    media: [
      { type: "image", src: "/images/projects/clocky/clock1.jpeg" },
      { type: "image", src: "/images/projects/clocky/clock2.jpeg" },
      { type: "image", src: "/images/projects/clocky/clock3.jpeg" },
    ],
    link: "https://clock.faseeh.ca/",
    featured: false,
  },
  {
    id: "cyderapp",
    title: "🥈 Cyder App Prototype (IveyHacks 2023 – 2nd place)",
    description: "Award winning, Privacy‑first data sharing prototype built in 24 h.",
    media: [
      { type: "image", src: "/images/projects/cyderApp/cyder0.png" },
      { type: "image", src: "/images/projects/cyderApp/cyder1.png" },
      { type: "image", src: "/images/projects/cyderApp/cyder2.png" },
      { type: "image", src: "/images/projects/cyderApp/cyder3.png" },
      { type: "image", src: "/images/projects/cyderApp/cyder4.png" },
    ],
    link: "https://www.ivey.uwo.ca/news/news-ivey/2023/march/new-ivey-hackathon-allows-students-to-build-a-real-life-data-privacy-solution/",
    featured: false,
  },
  
  {
    id: "mars‑rover",
    title: "Mars Rover (School project)",
    description: "Developed a simulated Mars rover using C# and arduino, featuring many sensors.",
    media: [
      { type: "video", src: "https://www.youtube.com/embed/ylB1peQnwVc" },
      { type: "image", src: "/images/projects/marsRover/mars1.jpeg" },
      { type: "image", src: "/images/projects/marsRover/mars2.jpeg" },
    ],
    link: null,
    featured: false,
  },
  {
    id: "order‑track",
    title: "OrderTrack",
    description: "Delivered a secure, real-time order tracking platform used by over 10,000+ businesses nationwide, reducing client support tickets by 30% by integrating Monday.com’s API with Make.com webhooks and automating live order status updates",
    media: [
      
      { type: "image", src: "/images/projects/order-track/order.png" },
    ],
    link: "https://flyercanada.ca/order-status",
    featured: true,
  },
];
/* ------------------------------------------------------------------ */
/* PRESENTATION COMPONENTS                                             */
/* ------------------------------------------------------------------ */

// iMessage-style overlapping thumbnail gallery
const MediaGallery = ({ media, onImageClick }) => {
  const handleThumbnailClick = (index) => {
    onImageClick(index);
  };

  const createThumbnail = (item, index) => {
    if (item.type === "video") {
      // For videos, we'll show a play icon over a placeholder
      return (
        <div
          key={index}
          className="media-thumbnail video-thumbnail"
          onClick={() => handleThumbnailClick(index)}
          style={{
            background: `linear-gradient(45deg, var(--bs-primary), var(--bs-secondary))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'white'
          }}
        >
          📹
        </div>
      );
    }
    
    return (
      <img
        key={index}
        src={process.env.PUBLIC_URL + item.src}
        className="media-thumbnail"
        alt={`Project media ${index + 1}`}
        onClick={() => handleThumbnailClick(index)}
      />
    );
  };

  return (
    <div className="imessage-gallery">
      {media.slice(0, 5).map((item, index) => createThumbnail(item, index))}
      {media.length > 5 && (
        <div
          className="media-thumbnail"
          onClick={() => handleThumbnailClick(0)}
          style={{
            background: 'rgba(46, 62, 46, 0.8)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            fontWeight: 'bold',
            transform: 'rotate(-2deg) translateX(100px) translateY(-5px)',
            zIndex: 6
          }}
        >
          +{media.length - 4}
        </div>
      )}
    </div>
  );
};

// Modal component for maximized media view
const MediaModal = ({ show, onHide, media, initialIndex }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex || 0);

  const renderMediaItem = (item) => {
    if (item.type === "video") {
      return (
        <div style={{ height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <iframe
            src={`${item.src}?rel=0&modestbranding=1&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
            title="Project Video"
          />
        </div>
      );
    }
    
    return (
      <img
        src={process.env.PUBLIC_URL + item.src}
        alt="Project media"
        style={{ width: "100%", height: "70vh", objectFit: "contain" }}
      />
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      className="project-modal"
    >
      <button
        className="close-modal"
        onClick={onHide}
        aria-label="Close modal"
      >
        ×
      </button>
      <Modal.Body>
        <Carousel
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
          controls={media.length > 1}
          indicators={media.length > 1}
        >
          {media.map((item, index) => (
            <Carousel.Item key={index}>
              {renderMediaItem(item)}
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
};

const ProjectCard = ({ project }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalStartIndex, setModalStartIndex] = useState(0);

  const handleImageClick = (index) => {
    setModalStartIndex(index);
    setShowModal(true);
  };

  const firstVideo = project.media.find((m) => m.type === "video");

  return (
    <>
      <Card className="project-card h-100">
        <MediaGallery 
          media={project.media} 
          onImageClick={handleImageClick}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="card-title mb-2">
            {project.title}
          </Card.Title>
          <Card.Text className="card-text mb-3" style={{ minHeight: "3rem" }}>
            {project.description}
          </Card.Text>
          <div className="mt-auto d-flex gap-2 flex-wrap">
            {project.link && (
              <Button
                href={project.link}
                target="_blank"
                rel="noreferrer"
                variant="outline-dark"
                className="btn"
              >
                View Project
              </Button>
            )}
            {firstVideo && (
              <Button
                href={firstVideo.src}
                target="_blank"
                rel="noreferrer"
                variant="outline-primary"
                className="btn"
              >
                View Video
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
      
      <MediaModal
        show={showModal}
        onHide={() => setShowModal(false)}
        media={project.media}
        initialIndex={modalStartIndex}
      />
    </>
  );
};

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
const ProjectsPage = () => {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="projects-section">
      <Container fluid="lg" className="py-5">
        {/* FEATURED SHOWCASE ------------------------------------------------ */}
        {featuredProjects.length > 0 && (
          <div className="featured-showcase">
            <h2 className="text-center mb-5" style={{ color: 'var(--bs-body-color)', fontWeight: '900', fontSize: '2rem', letterSpacing: '-0.5px' }}>
              Featured Projects
            </h2>
            <Row className="justify-content-center">
              {featuredProjects.slice(0, 1).map((project) => (
                <Col key={project.id} xs={12} md={10} lg={8}>
                  <ProjectCard project={project} />
                </Col>
              ))}
            </Row>
          </div>
        )}
        
        {/* ALL PROJECTS ----------------------------------------------------- */}
        <h2 className="text-center mb-5" style={{ color: 'var(--bs-body-color)', fontWeight: '900', fontSize: '2rem', marginTop: '3rem', letterSpacing: '-0.5px' }}>
          All Projects
        </h2>
        <Row className="g-4">
          {projects.map((project) => (
            <Col key={project.id} xs={12} sm={6} lg={4}>
              <ProjectCard project={project} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProjectsPage;
