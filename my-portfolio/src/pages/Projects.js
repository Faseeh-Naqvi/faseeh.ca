import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  Button,
  Ratio,
} from "react-bootstrap";

/* ------------------------------------------------------------------ */
/* CONFIG                                                              */
/* ------------------------------------------------------------------ */
const MEDIA_HEIGHT = 400;           // one place to tweak slide height
const AUTO_SLIDE_MS = 3000;         // nested-carousel autoplay

/* ------------------------------------------------------------------ */
/* DATA – ADD/EDIT PROJECTS HERE                                       */
/* ------------------------------------------------------------------ */
const projects = [
  
  {
    id: "attentify",
    title: "Attentify",
    description: "AI‑powered productivity tool for ADHD users, featuring Pomodoro timers and smart note‑taking.",
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
    title: "Cyder App Prototype (IveyHacks 2023 – 2nd place)",
    description: "Award winning, Privacy‑first data sharing prototype built in 24 h.",
    media: [
      { type: "image", src: "/images/projects/cyderApp/cyder0.png" },
      { type: "image", src: "/images/projects/cyderApp/cyder1.png" },
      { type: "image", src: "/images/projects/cyderApp/cyder2.png" },
      { type: "image", src: "/images/projects/cyderApp/cyder3.png" },
      { type: "image", src: "/images/projects/cyderApp/cyder4.png" },
    ],
    link: "https://www.ivey.uwo.ca/news/news-ivey/2023/march/new-ivey-hackathon-allows-students-to-build-a-real-life-data-privacy-solution/null",
    featured: false,
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
    link: "http://geonotebook.ca",
    featured: true,
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
const MediaItem = ({ item }) => {
  if (item.type === "video") {
    return (
      <div style={{ height: MEDIA_HEIGHT, overflow: "hidden" }}>
        <Ratio aspectRatio="16x9" style={{ height: "100%" }} className="rounded-xl">
          <iframe
            title="Project Video"
            src={`${item.src}?rel=0&modestbranding=1&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Ratio>
      </div>
    );
  }
  return (
    <div style={{ height: MEDIA_HEIGHT, overflow: "hidden" }}>
      <img
        src={process.env.PUBLIC_URL + item.src}
        className="d-block w-100"
        style={{ objectFit: "cover", height: "100%" }}
        alt="project media"
      />
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const [autoInterval, setAutoInterval] = useState(AUTO_SLIDE_MS);
  const innerRef = useRef(null);

  /* stop inner auto-play on any user interaction */
  const stopAuto = () => autoInterval && setAutoInterval(null);
  const handleSelect = () => stopAuto();
  const handleClick  = () => {
    innerRef.current?.next?.();     // advance inner carousel
    stopAuto();
  };

  const firstVideo = project.media.find((m) => m.type === "video");

  return (
    <Card className="border-0 shadow-sm h-100 overflow-hidden">
      <Carousel
        ref={innerRef}
        interval={autoInterval}
        controls={project.media.length > 1}
        indicators={project.media.length > 1}
        onSelect={handleSelect}
        onClick={handleClick}
      >
        {project.media.map((m, idx) => (
          <Carousel.Item key={idx}>
            <MediaItem item={m} />
          </Carousel.Item>
        ))}
      </Carousel>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-semibold text-xl mb-2">
          {project.title}
        </Card.Title>

        <Card.Text className="text-muted mb-3" style={{ minHeight: "4rem" }}>
          {project.description}
        </Card.Text>

        <div className="mt-auto d-flex gap-2 flex-wrap">
          {project.link && (
            <Button
              href={project.link}
              target="_blank"
              rel="noreferrer"
              variant="outline-dark"
              className="rounded-pill px-3 py-1"
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
              className="rounded-pill px-3 py-1"
            >
              View Video
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
const ProjectsPage = () => {
  const featuredProjects = projects.filter((p) => p.featured);

  /* control the *outer* showcase carousel with index state */
  const [heroIdx, setHeroIdx] = useState(0);
  const heroCount = featuredProjects.length;

  const prevHero = () =>
    setHeroIdx((i) => (i === 0 ? heroCount - 1 : i - 1));
  const nextHero = () =>
    setHeroIdx((i) => (i === heroCount - 1 ? 0 : i + 1));

  return (
    <Container fluid="lg" className="py-5">
      {/* FEATURED SHOWCASE ------------------------------------------------ */}
      <Row className="justify-content-center mb-5 position-relative">
        <Col xs={12} md={10} lg={8} className="px-0 position-relative">
          <Carousel
            activeIndex={heroIdx}
            onSelect={setHeroIdx}
            interval={null}
            controls={false}
            indicators={false}
            className="shadow-lg rounded-4 overflow-hidden"
          >
            {featuredProjects.map((project) => (
              <Carousel.Item key={project.id}>
                <ProjectCard project={project} />
              </Carousel.Item>
            ))}
          </Carousel>

          {/* OUTSIDE ARROWS ------------------------------------------------ */}
          <Button
            variant="light"
            onClick={prevHero}
            className="shadow rounded-circle d-flex align-items-center justify-content-center position-absolute"
            style={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              top: "50%",
              left: "-2.5rem",          // pushes outside card
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          >
            ‹
          </Button>

          <Button
            variant="light"
            onClick={nextHero}
            className="shadow rounded-circle d-flex align-items-center justify-content-center position-absolute"
            style={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              top: "50%",
              right: "-2.5rem",         // pushes outside card
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          >
            ›
          </Button>
        </Col>
      </Row>

      {/* ALL PROJECTS ----------------------------------------------------- */}
      <Row className="g-4">
        {projects.map((project) => (
          <Col key={project.id} xs={12} sm={6} lg={4}>
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProjectsPage;
