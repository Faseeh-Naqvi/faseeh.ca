import React from 'react';
import { FaGithub, FaLinkedin, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getBookCoverUrl, readAndTalkAbout } from '../readingLists';
import './Home.css';

const letterboxdUrl = 'https://letterboxd.com/fazeeh/';

const favoriteFilms = [
  {
    title: "It's Such a Beautiful Day",
    poster: '/images/its-such-a-beautiful-day.png',
  },
  {
    title: 'The Godfather Part II',
    poster: 'https://image.tmdb.org/t/p/w500/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
  },
  {
    title: 'Interstellar',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  },
  {
    title: 'Whiplash',
    poster: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
  },
];

const latestReview = {
  title: 'Inception',
  rating: '★★★★',
  watchedOn: 'Rewatched 15 Jun 2026',
  text: 'Rewatch w siblings. Introduced them to peak',
  poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
};

export default function Home() {
  const featuredBooks = readAndTalkAbout.slice(0, 6);

  return (
    <>
      <section className="home-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7 text-center text-lg-start">
              <span className="home-kicker">Welcome to my website!</span>
              <h1 className="display-2 fw-bold mb-3 home-title" style={{ color: 'var(--bs-dark)' }}>
                Syed Faseeh Hayder Naqvi
              </h1>
              <p className="lead home-lead mb-4">
                I am building, testing, and documenting my attempts at businesses in public. Follow along with my journey, check out my logs, and see what I am learning from each venture.
              </p>

              <div className="mb-4">
                <span className="badge bg-success bg-opacity-75 fs-5 px-4 py-2 home-badge">
                  Problem Solver • Builder • CS @ Western
                </span>
              </div>

              <div className="home-cta-row d-flex flex-column flex-sm-row flex-wrap gap-3 align-items-center align-items-lg-start mb-4">
                <Link to="/businesses" className="btn btn-lg btn-theme rounded-pill px-5 py-3 fs-5">
                  Follow the business logs
                </Link>
                <Link to="/projects" className="btn btn-lg btn-theme-outline rounded-pill px-5 py-3 fs-5">
                  See some of my other projects
                </Link>
                <Link to="/experience" className="btn btn-lg btn-theme-outline rounded-pill px-5 py-3 fs-5">
                  See where I have left an impact
                </Link>
              </div>

              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-4">
                <a
                  href="https://www.linkedin.com/in/faseeh-naqvi/"
                  className="icon-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/Faseeh-Naqvi"
                  className="icon-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <FaGithub />
                </a>
                <a href="/Syed_Naqvi.pdf" className="home-resume-link" download>
                  Download resume
                </a>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="home-profile-card">
                <div className="home-profile-img mb-4">
                  <img
                    src="/images/profile.jpeg"
                    alt="Portrait of Syed Faseeh Hayder Naqvi"
                    className="rounded-circle shadow-lg"
                  />
                </div>
                <div className="journey-card">
                  <p className="small text-uppercase fw-bold mb-1">Latest focus</p>
                  <h2 className="h4 fw-bold mb-2">Building businesses and sharing the receipts.</h2>
                  <p className="mb-3">
                    My business page tracks ideas, phase changes, failures, and lessons learned so the site feels like a real journey, not just a highlight reel.
                  </p>
                  <Link to="/businesses" className="btn btn-sm btn-theme rounded-pill px-4">
                    Read the logs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-section-alt">
        <div className="container">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4">
            <div>
              <span className="home-kicker">Reading list</span>
              <h2 className="fw-bold mb-2">Books I am excited to talk about</h2>
              <p className="mb-0">
                Flip through the covers, then check the full reading corner for what I am reading now.
              </p>
            </div>
            <Link to="/about" className="btn btn-theme-outline rounded-pill px-4">
              See the full reading corner
            </Link>
          </div>

          <div
            id="homeBookCarousel"
            className="carousel slide book-cover-carousel"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {featuredBooks.map((book, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={book.title}>
                  <div className="book-cover-slide">
                    <div className="book-cover-frame">
                      <img
                        src={getBookCoverUrl(book.isbn)}
                        alt={`${book.title} book cover`}
                        className="book-cover"
                      />
                    </div>
                    <div className="book-cover-caption">
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#homeBookCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous book</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#homeBookCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next book</span>
            </button>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-5">
              <div className="home-panel h-100">
                <span className="home-kicker">Letterboxd</span>
                <p>
                  I recently started logging films as a hobby. It is a small window into what I enjoy and what stories stick with me.
                </p>

                <p>My latest review:</p>
                <div className="letterboxd-review">
                  
                  <img
                    src={latestReview.poster}
                    alt={`${latestReview.title} poster`}
                    className="latest-review-poster"
                  />
                  <div>
                    <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
                      <h3 className="h5 mb-0">{latestReview.title}</h3>
                      <span className="film-rating">{latestReview.rating}</span>
                    </div>
                    <p className="text-muted small mb-2">{latestReview.watchedOn}</p>
                    <p className="mb-0">"{latestReview.text}"</p>
                  </div>
                </div>
                <a
                  href={letterboxdUrl}
                  className="btn btn-theme rounded-pill px-4 mt-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow on Letterboxd
                </a>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="home-panel h-100">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <FaStar className="text-success" />
                  <h2 className="fw-bold mb-0">Top 4 Films</h2>
                </div>
                <div className="film-grid">
                  {favoriteFilms.map((film, index) => (
                    <div className="film-card" key={film.title}>
                      <img
                        src={film.poster}
                        alt={`${film.title} poster`}
                        className="film-poster"
                      />
                      <div className="film-card-body">
                        <span className="film-rank">0{index + 1}</span>
                        <h3>{film.title}</h3>
                        {/* <div className="film-stars" aria-label="Favorite film">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaRegStar />
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
