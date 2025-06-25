import React from 'react';

const projectList = [
  { title: 'Clocky', desc: 'Dynamic web clock with geolocation', link: '#' },
  { title: 'Attentify', desc: 'Pomodoro+AI notes for ADHD users', link: '#' },
  // add more…
];

export default function Projects() {
  return (
    <section id="projects" className="py-5 bg-light">
      <div className="container">
        <h2>Projects</h2>
        <div className="row">
          {projectList.map((p, i) => (
            <div className="col-md-6 mb-4" key={i}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text">{p.desc}</p>
                  <a href={p.link} className="btn btn-primary">View</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
