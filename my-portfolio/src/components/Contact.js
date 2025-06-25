import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="py-5">
      <div className="container">
        <h2>Contact Me</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="you@example.com" />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-success">Send</button>
        </form>
      </div>
    </section>
  );
}
