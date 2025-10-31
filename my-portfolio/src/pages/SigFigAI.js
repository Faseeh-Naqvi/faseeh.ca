import React, { useState, useEffect } from 'react';
import { 
  FaShieldAlt, 
  FaVideo, 
  FaBrain, 
  FaClock, 
  FaUsersCog, 
  FaChartLine, 
  FaMobileAlt, 
  FaDollarSign,
  FaPercentage,
  FaUsersSlash,
  FaStopwatch,
  FaMoneyBillWave,
  FaCheckCircle,
  FaEye,
  FaArrowRight,
  FaPlay,
  FaRocket,
  FaPaperPlane,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaDownload,
  FaFilePdf,
  FaExternalLinkAlt
} from 'react-icons/fa';
import './SigFigAI.css';

const SigFigAI = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gym: '',
    hours: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Create floating particles
  const createParticles = () => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 10 + 10,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 15
      });
    }
    return particles;
  };

  const [particles] = useState(createParticles);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you! We\'ll be in touch within 24 hours to discuss your security needs.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        gym: '',
        hours: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 2000);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Add scroll effects and animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.feature-card, .metric-card, .step-card, .case-study-card');
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sigfig-ai">
      {/* Floating Particles */}
      <div className="floating-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.animationDuration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaShieldAlt className="badge-icon" />
              <span>Cutting-Edge IoT Security Solutions</span>
            </div>
            <h1 className="hero-title">
              Stop Revenue Loss with <span className="gradient-text">AI-Powered</span> Gym Security
            </h1>
            <p className="hero-subtitle">
              Prevent unauthorized entries and recover thousands in lost revenue with our 24/7 tailgating detection system. 
              Perfect for mom & pop gyms looking to operate securely around the clock.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Detection Accuracy</span>
              </div>
              <div className="stat">
                <span className="stat-number">$1,600+</span>
                <span className="stat-label">Avg Monthly Recovery</span>
              </div>
              <div className="stat">
                <span className="stat-number">70%</span>
                <span className="stat-label">Reduction in Tailgating</span>
              </div>
            </div>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                <FaRocket />
                Get Free Assessment
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('case-studies')}>
                <FaPlay />
                See Case Studies
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="security-icons">
              <div className="floating-icon camera">
                <FaVideo />
              </div>
              <div className="floating-icon brain">
                <FaBrain />
              </div>
              <div className="floating-icon shield">
                <FaShieldAlt />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="problem-section">
        <div className="container">
          <h2 className="section-title">The Hidden Cost of Tailgating</h2>
          <p className="section-subtitle">
            Unauthorized entries are quietly draining your gym's revenue and creating security risks
          </p>
          
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon revenue">
                <FaDollarSign />
              </div>
              <h3>Lost Revenue</h3>
              <p>Every tailgating incident represents a membership or guest fee that your gym didn't collect. 
                 24-hour gyms lose an average of <strong>$1,600 per month</strong> to unauthorized entries.</p>
            </div>
            
            <div className="problem-card">
              <div className="problem-icon overcrowding">
                <FaUsersSlash />
              </div>
              <h3>Overcrowding & Equipment Wear</h3>
              <p>Extra people increase facility usage without corresponding revenue, creating overcrowding 
                 that frustrates paying members and increases equipment maintenance costs.</p>
            </div>
            
            <div className="problem-card">
              <div className="problem-icon liability">
                <FaShieldAlt />
              </div>
              <h3>Safety & Liability Risks</h3>
              <p>Unauthorized visitors haven't signed waivers or completed safety orientations. 
                 If they cause trouble or get injured, your gym may face significant liability issues.</p>
            </div>
          </div>

          <div className="stat-highlight">
            <div className="stat-highlight-content">
              <h3>In Ontario alone, gyms collectively lose an estimated</h3>
              <div className="big-stat">$8.8 Million</div>
              <p>annually to tailgating incidents across 1,700+ fitness facilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Features */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">How Sig Fig AI Solves This</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaEye />
              </div>
              <h3>AI-Powered Detection</h3>
              <p>Advanced computer vision compares card scans to detected faces in real-time, 
                 flagging discrepancies with 99.9% accuracy.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaClock />
              </div>
              <h3>24/7 Monitoring</h3>
              <p>Our AI never sleeps, providing continuous security without additional staffing costs. 
                 Perfect for round-the-clock gym operations.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaUsersCog />
              </div>
              <h3>Expert Review Service</h3>
              <p>Flagged incidents are reviewed by our security team in real-time, providing actionable 
                 insights and reducing false positives.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h3>Real-Time Analytics</h3>
              <p>Get detailed insights into foot traffic patterns, peak hours, and security incidents 
                 through our intuitive dashboard.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaMobileAlt />
              </div>
              <h3>Instant Notifications</h3>
              <p>Receive immediate alerts when unauthorized access is detected, allowing for quick 
                 response and prevention.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaDollarSign />
              </div>
              <h3>Zero Initial Investment</h3>
              <p>No upfront costs, no hardware to buy. We handle everything - you just start 
                 saving money from day one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics & ROI */}
      <section id="metrics" className="metrics-section">
        <div className="container">
          <h2 className="section-title">Proven Financial Impact</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">
                <FaPercentage />
              </div>
              <h3>15-30% Revenue Recovery</h3>
              <p>Average increase in legitimate membership revenue after eliminating unauthorized access</p>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">
                <FaUsersSlash />
              </div>
              <h3>87% Reduction in Staff Costs</h3>
              <p>Eliminate overnight security staff while maintaining 24/7 operation capability</p>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">
                <FaStopwatch />
              </div>
              <h3>3-Second Detection</h3>
              <p>Lightning-fast AI analysis identifies unauthorized entries in real-time</p>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">
                <FaMoneyBillWave />
              </div>
              <h3>$2,000-$5,000/month</h3>
              <p>Average monthly savings for mid-size gyms from prevented losses and reduced staffing</p>
            </div>
          </div>

          <div className="roi-scenarios">
            <h3>ROI Scenarios</h3>
            <div className="scenario-cards">
              <div className="scenario-card conservative">
                <h4>Conservative Scenario</h4>
                <div className="scenario-stats">
                  <div className="scenario-stat">
                    <span className="number">5</span>
                    <span className="label">Tailgaters caught/week</span>
                  </div>
                  <div className="scenario-stat">
                    <span className="number">$300</span>
                    <span className="label">Monthly recovery</span>
                  </div>
                  <div className="scenario-stat">
                    <span className="number">3x</span>
                    <span className="label">ROI</span>
                  </div>
                </div>
              </div>
              
              <div className="scenario-card optimistic">
                <h4>Optimistic Scenario</h4>
                <div className="scenario-stats">
                  <div className="scenario-stat">
                    <span className="number">18</span>
                    <span className="label">Tailgaters caught/week</span>
                  </div>
                  <div className="scenario-stat">
                    <span className="number">$1,600</span>
                    <span className="label">Monthly recovery</span>
                  </div>
                  <div className="scenario-stat">
                    <span className="number">11x</span>
                    <span className="label">ROI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="case-studies-section">
        <div className="container">
          <h2 className="section-title">Real Results from Real Gyms</h2>
          
          <div className="case-study-card featured">
            <div className="case-study-header">
              <h3>NRG Lab Fitness Center</h3>
              <div className="case-study-badge">Featured Case Study</div>
            </div>
            <div className="case-study-content">
              <div className="case-study-metrics">
                <div className="before-after">
                  <div className="metric-before">
                    <span className="metric-label">Before</span>
                    <span className="metric-value">14.95%</span>
                    <span className="metric-description">Unauthorized entries</span>
                  </div>
                  <FaArrowRight className="arrow" />
                  <div className="metric-after">
                    <span className="metric-label">After</span>
                    <span className="metric-value">4.44%</span>
                    <span className="metric-description">Unauthorized entries</span>
                  </div>
                </div>
                <div className="key-results">
                  <div className="result">
                    <FaCheckCircle />
                    <span>70% reduction in tailgating incidents</span>
                  </div>
                  <div className="result">
                    <FaCheckCircle />
                    <span>$1,600/month in recovered revenue</span>
                  </div>
                  <div className="result">
                    <FaCheckCircle />
                    <span>11x ROI within first few months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="industry-stats">
            <h3>Industry Statistics</h3>
            <div className="stats-grid">
              <div className="industry-stat">
                <span className="stat-number">1,700+</span>
                <span className="stat-label">Fitness facilities in Ontario</span>
              </div>
              <div className="industry-stat">
                <span className="stat-number">50,000+</span>
                <span className="stat-label">Gyms across North America</span>
              </div>
              <div className="industry-stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Operating model growing rapidly</span>
              </div>
              <div className="industry-stat">
                <span className="stat-number">$40-60</span>
                <span className="stat-label">Average monthly membership (CAD)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Download Section */}
      <section id="research" className="pdf-section">
        <div className="container">
          <div className="pdf-content">
            <div className="pdf-info">
              <div className="pdf-badge">
                <FaFilePdf className="badge-icon" />
                <span>Comprehensive Research Report</span>
              </div>
              <h2>Preventing Revenue Loss and Boosting Gym Profits</h2>
              <p className="pdf-subtitle">
                Dive deep into our comprehensive research on tailgating detection and revenue recovery. 
                This detailed report includes industry statistics, case studies, and proven ROI data 
                from gyms across Ontario and North America.
              </p>
              
              <div className="pdf-highlights">
                <div className="highlight">
                  <FaCheckCircle />
                  <span>Complete market analysis for Ontario's 1,700+ gyms</span>
                </div>
                <div className="highlight">
                  <FaCheckCircle />
                  <span>Real case studies with verified results</span>
                </div>
                <div className="highlight">
                  <FaCheckCircle />
                  <span>Financial impact calculations and ROI scenarios</span>
                </div>
                <div className="highlight">
                  <FaCheckCircle />
                  <span>Implementation strategies for 24/7 operations</span>
                </div>
              </div>

              <div className="pdf-buttons">
                <a 
                  href="/Preventing Revenue Loss and Boosting Gym Profits with SigFig AI.pdf" 
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload />
                  Download Full Report
                </a>
                <a 
                  href="/Preventing Revenue Loss and Boosting Gym Profits with SigFig AI.pdf" 
                  className="btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt />
                  View Online
                </a>
              </div>
            </div>
            
            <div className="pdf-preview">
              <div className="pdf-mockup">
                <div className="pdf-header">
                  <div className="pdf-title">
                    <FaFilePdf className="pdf-icon" />
                    <div>
                      <h4>Revenue Loss Prevention Report</h4>
                      <span>Comprehensive Analysis & Solutions</span>
                    </div>
                  </div>
                  <div className="pdf-meta">
                    <span>25 pages</span>
                    <span>PDF Format</span>
                  </div>
                </div>
                <div className="pdf-body">
                  <div className="pdf-section">
                    <h5>Executive Summary</h5>
                    <div className="pdf-lines">
                      <div className="line"></div>
                      <div className="line short"></div>
                      <div className="line"></div>
                    </div>
                  </div>
                  <div className="pdf-section">
                    <h5>Market Analysis</h5>
                    <div className="pdf-lines">
                      <div className="line"></div>
                      <div className="line"></div>
                      <div className="line short"></div>
                    </div>
                  </div>
                  <div className="pdf-section">
                    <h5>Case Studies & ROI</h5>
                    <div className="pdf-lines">
                      <div className="line short"></div>
                      <div className="line"></div>
                      <div className="line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Card Scan Detection</h3>
                <p>Our system integrates with your existing card reader to capture scan data 
                   and member information in real-time.</p>
              </div>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>AI Face Recognition</h3>
                <p>Advanced computer vision analyzes security camera feeds to count and 
                   identify individuals entering your facility.</p>
              </div>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Smart Comparison</h3>
                <p>Our AI compares the number of card scans to detected faces, flagging 
                   discrepancies instantly with 99.9% accuracy.</p>
              </div>
            </div>
            
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Expert Review & Action</h3>
                <p>Flagged incidents are reviewed by our security team, who provide detailed 
                   reports and immediate notifications.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <h2 className="section-title">Simple, Performance-Based Pricing</h2>
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Complete Solution</h3>
              <div className="price">$125<span>/month per door</span></div>
            </div>
            <div className="pricing-features">
              <div className="feature">
                <FaCheckCircle />
                <span>24/7 AI monitoring and detection</span>
              </div>
              <div className="feature">
                <FaCheckCircle />
                <span>Real-time expert review service</span>
              </div>
              <div className="feature">
                <FaCheckCircle />
                <span>Instant notifications and reporting</span>
              </div>
              <div className="feature">
                <FaCheckCircle />
                <span>Integration with existing systems</span>
              </div>
              <div className="feature">
                <FaCheckCircle />
                <span>No upfront costs or hardware fees</span>
              </div>
              <div className="feature">
                <FaCheckCircle />
                <span>First month free trial</span>
              </div>
            </div>
            <div className="pricing-note">
              <p><strong>Pays for itself in just 6 caught tailgating incidents per month</strong></p>
              <p>Most gyms see 10x+ ROI within the first few months</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Ready to Stop Revenue Loss?</h2>
              <p className="contact-subtitle">
                <strong>Would you be interested in having someone keeping an eye on your doors 24/7 
                to make sure no one is sneaking in without tapping?</strong>
              </p>
              
              <div className="contact-benefits">
                <div className="benefit">
                  <FaCheckCircle />
                  <span>Free initial consultation and trial month</span>
                </div>
                <div className="benefit">
                  <FaCheckCircle />
                  <span>No upfront costs or equipment fees</span>
                </div>
                <div className="benefit">
                  <FaCheckCircle />
                  <span>Perfect for 24-hour mom & pop gyms</span>
                </div>
                <div className="benefit">
                  <FaCheckCircle />
                  <span>Developed by Western University students</span>
                </div>
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <FaEnvelope />
                  <span>hello@sigfigai.com</span>
                </div>
                <div className="contact-item">
                  <FaPhone />
                  <span>Available 24/7</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>London, Ontario</span>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="gym"
                    placeholder="Gym Name"
                    value={formData.gym}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Operating Hours</option>
                    <option value="24-hours">24 Hours</option>
                    <option value="extended">Extended Hours (5am-11pm)</option>
                    <option value="standard">Standard Hours (6am-10pm)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Tell us about your security concerns..."
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Get Free Security Assessment
                    </>
                  )}
                </button>
                {submitMessage && (
                  <div className="success-message">
                    <FaCheckCircle />
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <FaShieldAlt />
                <span>Sig Fig AI</span>
              </div>
              <p>Revolutionizing gym security with cutting-edge AI technology.</p>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#metrics">Metrics</a></li>
                <li><a href="#case-studies">Case Studies</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="footer-contact">
                <div><FaEnvelope /> hello@sigfigai.com</div>
                <div><FaPhone /> Available 24/7</div>
                <div><FaMapMarkerAlt /> London, ON</div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 Sig Fig AI. All rights reserved. | Developed by Western University students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SigFigAI;