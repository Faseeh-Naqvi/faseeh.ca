import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  FaPlay,
  FaRocket,
  FaPaperPlane,
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
    message: '',
    captcha: '',
    honeypot: '' // Anti-spam honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: '', answer: 0 });
  const [formErrors, setFormErrors] = useState({});

  // Generate random math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let answer;
    let question;
    
    if (operator === '+') {
      answer = num1 + num2;
      question = `What is ${num1} + ${num2}?`;
    } else {
      // Ensure positive result for subtraction
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      answer = larger - smaller;
      question = `What is ${larger} - ${smaller}?`;
    }
    
    setCaptchaQuestion({ question, answer });
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);
  
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
    
    // Clear field-specific errors when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    // Basic validation
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.gym.trim()) errors.gym = 'Gym name is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Captcha validation
    const userAnswer = parseInt(formData.captcha);
    if (!userAnswer || userAnswer !== captchaQuestion.answer) {
      errors.captcha = 'Please solve the math problem correctly';
    }
    
    // Honeypot check (should be empty)
    if (formData.honeypot.trim()) {
      errors.honeypot = 'Bot detected';
      return errors; // Early return if bot detected
    }
    
    return errors;
  };

  // Obfuscate email to prevent scraping
  const getSecureMailto = () => {
    const emailParts = ['faseehnaq', 'gmail', 'com'];
    return emailParts.join('@').replace('@gmail@', '@gmail.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      generateCaptcha(); // Generate new captcha on failed attempt
      return;
    }
    
    // Additional delay to deter bots
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create mailto link for form submission
    const subject = `[SIG FIG AI] Security Assessment Request - ${formData.gym}`;
    const body = `
SECURITY ASSESSMENT REQUEST
Generated: ${new Date().toLocaleString()}

Contact Information:
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone || 'Not provided'}

Business Details:
• Gym Name: ${formData.gym}
• Operating Hours: ${formData.hours || 'Not specified'}

Message:
${formData.message}

---
This inquiry was securely submitted through the Sig Fig AI landing page.
Request ID: ${Date.now()}
    `.trim();
    
    const secureEmail = getSecureMailto();
    const mailtoLink = `mailto:${secureEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open mailto link
    window.location.href = mailtoLink;
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        gym: '',
        hours: '',
        message: '',
        captcha: '',
        honeypot: ''
      });
      setIsSubmitting(false);
      generateCaptcha(); // Generate new captcha
      setSubmitMessage('Thank you! Your email client should open with the message prepared. Please send the email to complete your inquiry.');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1000);
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
              Stop Revenue Loss with <span className="rainbow-text">AI-Powered</span> Gym Security
            </h1>
            <p className="hero-subtitle">
              Prevent unauthorized entries and recover thousands in lost revenue with our 24/7 tailgating detection system. 
              Perfect for mom & pop gyms looking to operate securely around the clock.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">$1,600+</span>
                <span className="stat-label">Avg Monthly Recovery</span>
              </div>
              <div className="stat">
                <span className="stat-number">70%</span>
                <span className="stat-label">Reduction in Tailgating</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Monitoring</span>
              </div>
            </div>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                <FaRocket />
                Get Free Assessment
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('research-link')}>
                <FaPlay />
                See Research Report
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
                 flagging discrepancies to prevent unauthorized access.</p>
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

      {/* Research Link Section */}
      <section id="research-link" className="research-link-section">
        <div className="container">
          <h2 className="section-title">Comprehensive Research & Analysis</h2>
          <div className="research-card">
            <div className="research-content">
              <div className="research-icon">
                <FaFilePdf />
              </div>
              <div className="research-info">
                <h3>Industry Research Report</h3>
                <p>
                  Access our comprehensive analysis of gym security challenges, IoT solutions, 
                  and revenue impact assessment. This detailed report includes market research, 
                  technology analysis, and implementation frameworks.
                </p>
                <div className="research-highlights">
                  <div className="highlight">
                    <FaCheckCircle />
                    <span>Market analysis and opportunity assessment</span>
                  </div>
                  <div className="highlight">
                    <FaCheckCircle />
                    <span>Technology implementation strategies</span>
                  </div>
                  <div className="highlight">
                    <FaCheckCircle />
                    <span>ROI calculation methodologies</span>
                  </div>
                  <div className="highlight">
                    <FaCheckCircle />
                    <span>Industry best practices and frameworks</span>
                  </div>
                </div>
                <div className="research-actions">
                  <a 
                    href="/Preventing Revenue Loss and Boosting Gym Profits with SigFig AI.pdf" 
                    className="btn-primary research-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDownload />
                    Download Research Report
                  </a>
                  <a 
                    href="#contact" 
                    className="btn-secondary research-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                  >
                    <FaRocket />
                    Request Consultation
                  </a>
                </div>
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
                   discrepancies instantly for review.</p>
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
          <h2 className="section-title">Investment & ROI Analysis</h2>
          <p className="pricing-subtitle">
            Transparent pricing structure designed to deliver measurable returns on your security investment
          </p>
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Comprehensive Security Solution</h3>
              <div className="price">Contact<span> for custom quote</span></div>
              <p className="price-note">Pricing based on facility size and requirements</p>
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
              <p><strong>Investment Analysis Available</strong></p>
              <p>Contact us for a customized ROI assessment based on your facility's specific needs and current security challenges</p>
              <p className="disclaimer">Pricing varies based on facility size, monitoring requirements, and integration complexity. Free consultation available.</p>
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
                  <FaPhone />
                  <span>Available 24/7</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>Toronto, Ontario</span>
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
                    className={formErrors.name ? 'error' : ''}
                    required
                  />
                  {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? 'error' : ''}
                    required
                  />
                  {formErrors.email && <span className="error-text">{formErrors.email}</span>}
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
                    className={formErrors.gym ? 'error' : ''}
                    required
                  />
                  {formErrors.gym && <span className="error-text">{formErrors.gym}</span>}
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
                    className={formErrors.message ? 'error' : ''}
                  ></textarea>
                  {formErrors.message && <span className="error-text">{formErrors.message}</span>}
                </div>
                
                {/* Honeypot field - hidden from users */}
                <div className="honeypot" style={{ display: 'none' }}>
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleInputChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>
                
                {/* Math Captcha */}
                <div className="form-group captcha-group">
                  <label className="captcha-label">
                    Security Check: {captchaQuestion.question}
                  </label>
                  <input
                    type="number"
                    name="captcha"
                    placeholder="Enter your answer"
                    value={formData.captcha}
                    onChange={handleInputChange}
                    className={formErrors.captcha ? 'error' : ''}
                    required
                  />
                  {formErrors.captcha && <span className="error-text">{formErrors.captcha}</span>}
                </div>
                
                {/* Display validation errors */}
                {Object.keys(formErrors).length > 0 && (
                  <div className="form-errors">
                    <p>Please correct the following errors:</p>
                    <ul>
                      {Object.entries(formErrors).map(([field, error]) => (
                        field !== 'honeypot' && (
                          <li key={field}>{error}</li>
                        )
                      ))}
                    </ul>
                  </div>
                )}
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
                <li><a href="#research-link">Research</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="footer-contact">
                <div><FaPhone /> Available 24/7</div>
                <div><FaMapMarkerAlt /> London, ON</div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 Sig Fig AI. All rights reserved. | Developed by Western University students.</p>
            <div className="portfolio-link">
              <Link to="/" className="back-to-portfolio">
                ← Back to Developer Portfolio
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SigFigAI;