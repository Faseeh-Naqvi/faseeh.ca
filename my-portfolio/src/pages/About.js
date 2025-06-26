import React from 'react';

import './About.css';

export default function About() {
  /* ---------- Photo Carousel ---------- */
  const galleryImages = [
    '/images/about/westernbus.png',
    '/images/about/boxing.jpg',
    '/images/about/Hackwestern.jpg',
    '/images/about/iceCold.jpg',
    '/images/about/grade4.jpg',
    '/images/about/IveyHacks.jpg',
    '/images/about/looking.jpg',
    '/images/about/pingpong.jpg',
    '/images/about/Present.jpg',
  ];
  const rotations = ['rot-1','rot-2','rot-3','rot-4','rot-5','rot-6','rot-7','rot-8'];

  /* ---------- Reading Lists (update any time) ---------- */
  const currentlyReading = [
    'The Art of War – Sun Tzu',
  ];
  const wantToRead = [
    'Amusing Ourselves to Death: Public Discourse ... – Neil Postman',
    'Letting Go: The Pathway of Surrender – MD/PHD. David R. Hawkins',
    'Influence, The Psychology of Persuasion – Dr. Robert Cialdini',
    
  ];

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">About Me</h1>

      {/* ---------- Intro ---------- */}
      <p className="fs-lg">
        I’m a third-year Computer Science student at Western University who
        <strong> loves reading, learning random things, and chasing creative sparks</strong>.
        Lately I’ve been diving into <em>Stoicism</em>, Eastern philosophy, and how
        social media rewires our brains. When I’m not coding, you’ll find me watching
        videos on psychology, history, religion, marketing, astronomy, or global
        business trends. I’m always up for a good conversation!
      </p>

      {/* ---------- Interests ---------- */}
      <div className="mb-5">
        <h2 className="h4 fw-semibold mb-3">What I’m into right now</h2>
        <p>
          Emerging tech &amp; AI · Psychology · History · Religion · Marketing · Astronomy · Business ·
          Meditation · Stoicism · Geopolitics · Stocks &amp; Global Markets ·
          Social-media neuroscience · The ever-shifting humour culture on the internet, and many more. Love talking to people about their niche interests!
        </p>
      </div>
      {/* ---------- Photo Scrapbook ---------- */}
      <h2 className="h4 fw-semibold mb-3">Photo Scrapbook</h2>
      <div
        id="scrapbookCarousel"
        className="carousel slide scrapbook-carousel"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {galleryImages.map((src, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === 0 ? 'active' : ''}`}
            >
              <img
                src={process.env.PUBLIC_URL + src}
                alt={`Scrapbook ${idx + 1}`}
                className={`scrapbook-img ${rotations[idx % rotations.length]}`}
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#scrapbookCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#scrapbookCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </button>
      </div>

      {/* ---------- Fun Facts ---------- */}
      <div className="mb-5">
        <h2 className="h4 fw-semibold mb-3">Fun Facts</h2>
        <ul className="list-unstyled">
          <li>🎤 <strong>Public-speaking addict —</strong> on stage since Grade 3 assemblies; most recently a packed lecture-hall presentation. My style is laid-back and conversational. I also love pitching, Shark Tank is a family favorite.</li>
          <li>🎬 <strong>Content-creation geek —</strong> wrote & directed Western TMA videos (12.4 k views, +152 % engagement). Been filming comedy videos since the Vine days (they were not funny). I like to think I have slowly been getting better. Obsessed with the art of storytelling, regardless of medium</li>
          <li>📺 <strong>Tiny YouTuber —</strong> ~40 subs, 24 k+ views (mostly tech; planning to branch out into other interests).</li>
          <li>📝 <strong>Journaler —</strong> my notebook is a sketch-filled scrapbook. Started first year. Great for reminiscing; highly recommended.</li>
        </ul>
      </div>

      {/* ---------- Reading Corner ---------- */}
      <div className="mb-5">
        <h2 className="h4 fw-semibold mb-3">Reading Corner</h2>
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              {/* Currently Reading */}
              <div className="col-md-6 mb-3 mb-md-0">
                <h5 className="card-title">Currently Reading</h5>
                <ul className="mb-0">
                  {currentlyReading.map((book, i) => (
                    <li key={i}>{book}</li>
                  ))}
                </ul>
              </div>
              {/* Want to Read */}
              <div className="col-md-6">
                <h5 className="card-title">Want to Read</h5>
                <ul className="mb-0">
                  {wantToRead.map((book, i) => (
                    <li key={i}>{book}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
