import React, { useEffect } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Collapse from 'bootstrap/js/dist/collapse';

import Home       from './pages/Home';
import About      from './pages/About';
import Projects   from './pages/Projects';
import Experience from './pages/Experience';
import Education  from './pages/Education';
import Business from './pages/Business';
import Awards     from './pages/Awards';
import Contact    from './pages/Contact';
import SigFigAI   from './pages/SigFigAI';
import FaseehDashboard from './pages/FaseehDashboard';
import ErrorBoundary from './ErrorBoundary';
import RouteLogger from './RouteLogger';

const LINKEDIN_URL = 'https://www.linkedin.com/in/faseeh-naqvi/';

function LinkedInRedirect() {
  useEffect(() => {
    window.location.replace(LINKEDIN_URL);
  }, []);
  return (
    <div className="container py-4">
      <p>Redirecting to LinkedIn…</p>
    </div>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[App] Render path:', location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const menu = document.getElementById('navMenu');
    if (!menu || !menu.classList.contains('show')) return;

    const instance = Collapse.getInstance(menu) || new Collapse(menu, { toggle: false });
    instance.hide();
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  const navItems = [
    { label: 'About', to: '/about' },
    { label: 'Businesses', to: '/businesses' },
    { label: 'Projects', to: '/projects' },
    { label: 'Experience', to: '/experience' },
    { label: 'Education', to: '/education' },
  ];

  return (
    <>
      <RouteLogger />
      <header className="site-header">
        <nav className="navbar navbar-expand-lg" aria-label="Primary navigation">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              Home
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navMenu"
              aria-controls="navMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="menu-label">Menu</span>
              <span className="menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
            <div className="collapse navbar-collapse" id="navMenu">
              <ul className="navbar-nav ms-auto align-items-lg-center">
                {navItems.map(({ label, to }) => (
                  <li className="nav-item" key={to}>
                    <NavLink
                      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                      to={to}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
                <li className="nav-item nav-contact-item">
                  <NavLink
                    className={({ isActive }) => `nav-link nav-contact${isActive ? ' active' : ''}`}
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/experience" element={<Experience/>}/>
        <Route path="/education" element={<Education/>}/>
        <Route path="/businesses" element={<Business/>}/>
        <Route path="/awards" element={<Awards/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/linkedin" element={<LinkedInRedirect/>}/>
        <Route path="/sigfig-ai" element={<SigFigAI/>}/>
        {/* Secret route not linked in navbar */}
        <Route
          path="/faseehDASHLetsLockInBro"
          element={
            <ErrorBoundary>
              <FaseehDashboard />
            </ErrorBoundary>
          }
        />
        {/* Catch-all to help debug unmatched routes */}
        <Route path="*" element={<div className="container py-4"><div className="alert alert-warning"><strong>Route not found:</strong> {location.pathname}</div></div>} />
      </Routes>
    </>
  );
}

export default App;
