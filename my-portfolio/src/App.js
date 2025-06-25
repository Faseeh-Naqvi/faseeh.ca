import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import Home       from './pages/Home';
import About      from './pages/About';
import Projects   from './pages/Projects';
import Experience from './pages/Experience';
import Education  from './pages/Education';
import Business from './pages/Business';
import Awards     from './pages/Awards';
import Contact    from './pages/Contact';

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">Syed Naqvi</NavLink>
          <button className="navbar-toggler" type="button"
                  data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto">
              {['About','Projects','Experience','Education','Businesses','Awards','Contact'].map(page => (
                <li className="nav-item" key={page}>
                  <NavLink
                    className="nav-link"
                    to={`/${page.toLowerCase()}`}
                    activeclassname="active"
                  >
                    {page}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/experience" element={<Experience/>}/>
        <Route path="/education" element={<Education/>}/>
        <Route path="/business" element={<Business/>}/>
        <Route path="/awards" element={<Awards/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </>
  );
}

export default App;
