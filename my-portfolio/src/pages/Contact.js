import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';  

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    website: '',    // honeypot
    captcha: '',    // math challenge
  });
  const [statusMsg, setStatusMsg] = useState(null);

  const SERVICE_ID  = 'service_nyvqhfe';
  const TEMPLATE_ID = 'template_stb2zxg';
  const USER_ID     = '5u29vNvewhhQ9tZxK';

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatusMsg(null);

    if (form.website) return;
    if (form.captcha.trim() !== '7') {
      setStatusMsg({ type: 'error', text: 'Captcha incorrect. Please answer “3 + 4”.' });
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          title:      form.name,
        },
        USER_ID
      );
      setStatusMsg({ type: 'success', text: 'Message sent! I’ll be in touch soon.' });
      setForm({ name: '', email: '', message: '', website: '', captcha: '' });
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Oops—something went wrong. Please try again later.' });
    }
  };

  return (
    <div className="container py-5 contact-wrapper">
      <h1 className="fw-bold mb-4">Contact Me</h1>
      <div className="contact-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              className="form-control"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'none' }}>
            <label>Leave this empty</label>
            <input
              name="website"
              type="text"
              value={form.website}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">What is 3 + 4?</label>
            <input
              name="captcha"
              type="text"
              className="form-control"
              value={form.captcha}
              onChange={handleChange}
              required
            />
          </div>
          
          {statusMsg && (
            <div
              className={`alert ${statusMsg.type === 'success' ? 'alert-success' : 'alert-danger'}`}
              role="alert"
            >
              {statusMsg.text}
            </div>
          )}

          <button type="submit" className="btn btn-primary rounded-pill">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
