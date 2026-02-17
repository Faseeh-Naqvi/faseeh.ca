import React, { useEffect } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';

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

function App() {
  const location = useLocation();
  const isStandalonePage = location.pathname === '/sigfig-ai';
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[App] Render path:', location.pathname);
  }, [location.pathname]);

  return (
    <>
      <RouteLogger />
      {/* Only show navbar for non-standalone pages */}
      {!isStandalonePage && (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container">
            <NavLink className="navbar-brand fw-bold" to="/">Syed Naqvi</NavLink>
            <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navMenu">
              <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navMenu">
              <ul className="navbar-nav ms-auto">
                {['About','Projects','Experience','Education','Businesses','Contact'].map(page => (
                  <li className="nav-item" key={page}>
                    <NavLink
                      className="nav-link"
                      to={`/${page.toLowerCase()}`}
                      activeClassName="active"
                    >
                      {page}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/experience" element={<Experience/>}/>
        <Route path="/education" element={<Education/>}/>
        <Route path="/businesses" element={<Business/>}/>
        <Route path="/awards" element={<Awards/>}/>
        <Route path="/contact" element={<Contact/>}/>
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
