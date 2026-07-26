import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FiMail, FiPhone, FiGithub, FiLinkedin, FiMenu, FiX,
  FiArrowUp, FiDownload, FiExternalLink, FiChevronDown
} from 'react-icons/fi'
import {
  SiPython, SiJavascript, SiHtml5, SiCss3, SiMysql, SiReact,
  SiNodedotjs, SiExpress, SiNextdotjs, SiTensorflow, SiOpenai,
  SiGit, SiGithub, SiVercel, SiRender
} from 'react-icons/si'
import { FaJava, FaBrain, FaRobot, FaCode, FaLaptopCode, FaCodeBranch } from 'react-icons/fa'
import { HiOutlineLightBulb, HiOutlineAcademicCap } from 'react-icons/hi'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

const PROJECTS = [
  {
    title: 'Fotocopy',
    description: 'AI-powered document management platform for scanning, organising and accessing digital documents.',
    tags: ['React', 'Node.js', 'AI', 'OCR'],
    live: 'https://fotocopy-sage.vercel.app',
    github: 'https://github.com/vsshetty18',
  },
  {
    title: 'Anything AI',
    description: 'An AI assistant capable of writing, coding, brainstorming, summarising and solving everyday tasks.',
    tags: ['React', 'OpenAI', 'Node.js'],
    live: 'https://anything-ai-wine.vercel.app',
    github: 'https://github.com/vsshetty18',
  },
  {
    title: 'Indian GST Calculator',
    description: 'Modern GST calculator built for Indian users with instant tax calculations and responsive design.',
    tags: ['React', 'JavaScript', 'CSS'],
    live: 'https://indian-gst-calculator-mu.vercel.app',
    github: 'https://github.com/vsshetty18',
  },
  {
    title: 'LifeSaver',
    description: 'Emergency response platform providing rapid access to emergency services and lifesaving information.',
    tags: ['React', 'Node.js', 'Express'],
    live: 'https://life-saver-ten.vercel.app',
    github: 'https://github.com/vsshetty18',
  },
]

const HIGHLIGHTS = [
  { icon: <FaBrain />, label: 'Artificial Intelligence' },
  { icon: <FaRobot />, label: 'Machine Learning' },
  { icon: <FaLaptopCode />, label: 'Full Stack Development' },
  { icon: <HiOutlineLightBulb />, label: 'Problem Solving' },
  { icon: <FaCode />, label: 'Modern Web Development' },
  { icon: <SiPython />, label: 'Python' },
  { icon: <SiReact />, label: 'React' },
  { icon: <FaCodeBranch />, label: 'Open Source' },
]

const SKILLS = [
  {
    category: 'Languages',
    icon: <FaCode />,
    items: ['Python', 'Java', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    category: 'Database',
    icon: <SiMysql />,
    items: ['SQL', 'MySQL'],
  },
  {
    category: 'Frameworks',
    icon: <SiReact />,
    items: ['React', 'Node.js', 'Express', 'Next.js'],
  },
  {
    category: 'AI / ML',
    icon: <FaBrain />,
    items: ['TensorFlow', 'OpenAI', 'HuggingFace', 'Computer Vision', 'Machine Learning'],
  },
  {
    category: 'Tools',
    icon: <SiGit />,
    items: ['Git', 'GitHub', 'VS Code', 'Render', 'Vercel'],
  },
]

const RESUME_ITEMS = [
  { icon: <HiOutlineAcademicCap />, label: 'Education' },
  { icon: <FaLaptopCode />, label: 'Experience' },
  { icon: <FaCode />, label: 'Projects' },
  { icon: <FaBrain />, label: 'Skills' },
  { icon: <HiOutlineLightBulb />, label: 'Certifications' },
]

function Reveal({ children, delay = 0, y = 30 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = NAV_LINKS.map((l) => document.getElementById(l.id))
      const scrollPos = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_LINKS[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <span className="nav-logo">V S Vighnesh</span>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              
                href={`#${link.id}`}
                className={activeSection === link.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.id)
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {menuOpen && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            padding: '24px 32px',
            background: 'rgba(245, 239, 230, 0.98)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.id)
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <motion.div
          className="profile-bar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img src="/profile.jpg" alt="V S Vighnesh" className="profile-img" />
          <div className="profile-info">
            <h3>V S Vighnesh</h3>
            <p>AI & Machine Learning Engineer</p>
            <p>Full Stack Developer</p>
            <p>BE AIML — Rajarajeshwari College of Engineering</p>
            <p>Bengaluru, India</p>
            <div className="profile-socials">
              <a href="mailto:vsvighnesh18@gmail.com" className="social-icon" aria-label="Email"><FiMail /></a>
              <a href="tel:+919448838506" className="social-icon" aria-label="Phone"><FiPhone /></a>
              <a href="https://github.com/vsshetty18" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub"><FiGithub /></a>
              <a href="https://www.linkedin.com/in/vsvighnesh/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><FiLinkedin /></a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1>Hi, I'm <span>V S Vighnesh</span></h1>
          <p className="hero-subtitle">AI & Machine Learning Engineer · Full Stack Developer</p>
          <p className="hero-description">
            I build AI-powered applications, machine learning solutions and modern web platforms
            focused on solving real-world problems through intelligent software engineering.
          </p>
          <div className="hero-buttons">
            <a href="/resume.pdf" download className="btn btn-primary">
              <FiDownload /> Download Resume
            </a>
            
              href="#projects"
              className="btn btn-outline"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View Projects
            </a>
            
              href="#contact"
              className="btn btn-outline"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <span />
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <span className="section-label">About Me</span>
          <h2 className="section-title">Turning Ideas Into Intelligent Software</h2>
        </Reveal>

        <div className="about-grid" style={{ marginTop: '50px' }}>
          <Reveal delay={0.1}>
            <div className="about-text">
              <p>
                I'm an AI & Machine Learning Engineer and Full Stack Developer currently pursuing my
                BE in Artificial Intelligence & Machine Learning at Rajarajeswari College of Engineering,
                Bengaluru.
              </p>
              <p>
                My work bridges intelligent systems and modern web engineering — from training and deploying
                machine learning models to building responsive, production-grade full stack applications.
                I care deeply about writing clean, maintainable code and designing software that solves
                genuine real-world problems.
              </p>
              <p>
                Outside of coursework, I actively build and ship independent projects, contribute to open
                source, and explore emerging tools in AI to stay ahead of a fast-moving field.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="highlight-grid">
              {HIGHLIGHTS.map((h, i) => (
                <div className="highlight-item" key={i}>
                  {h.icon}
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <span className="section-label">Skills</span>
          <h2 className="section-title">Technologies I Work With</h2>
          <p className="section-subtitle">
            A toolkit spanning AI/ML, full stack web development, and modern engineering practices.
          </p>
        </Reveal>

        <div className="skills-grid">
          {SKILLS.map((group, i) => (
            <Reveal delay={i * 0.1} key={group.category}>
              <div className="skill-card">
                <h4>{group.icon} {group.category}</h4>
                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span className="skill-tag" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <span className="section-label">Projects</span>
          <h2 className="section-title">Things I've Built</h2>
          <p className="section-subtitle">
            A selection of AI-powered and full stack projects, deployed and live in production.
          </p>
        </Reveal>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <Reveal delay={i * 0.1} key={project.title}>
              <div className="project-card">
                <div className="project-image">{project.title.charAt(0)}</div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span className="project-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      <FiExternalLink /> Live Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      <FiGithub /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Resume() {
  return (
    <section id="resume" className="section">
      <div className="container">
        <Reveal>
          <span className="section-label">Resume</span>
          <h2 className="section-title">My Professional Journey</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="resume-card">
            <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>V S Vighnesh</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '10px' }}>
              AI & Machine Learning Engineer · Full Stack Developer
            </p>

            <div className="resume-grid">
              {RESUME_ITEMS.map((item) => (
                <div className="resume-item" key={item.label}>
                  {item.icon}
                  <h4>{item.label}</h4>
                </div>
              ))}
            </div>

            <a href="/resume.pdf" download className="btn btn-primary">
              <FiDownload /> Download Resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', message: '' })

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus({ state: 'success', message: "Message sent successfully! I'll get back to you soon." })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ state: 'error', message: data.error || 'Something went wrong. Please try again.' })
      }
    } catch (err) {
      setStatus({ state: 'error', message: 'Unable to reach the server. Please try again later.' })
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind or just want to connect? Reach out below.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal delay={0.1}>
            <div>
              <a href="mailto:vsvighnesh18@gmail.com" className="contact-info-item">
                <span className="icon-box"><FiMail /></span>
                <div>
                  <h4>Email</h4>
                  <p>vsvighnesh18@gmail.com</p>
                </div>
              </a>
              <a href="tel:+919448838506" className="contact-info-item">
                <span className="icon-box"><FiPhone /></span>
                <div>
                  <h4>Phone</h4>
                  <p>+91 9448838506</p>
                </div>
              </a>
              <a href="https://github.com/vsshetty18" target="_blank" rel="noopener noreferrer" className="contact-info-item">
                <span className="icon-box"><FiGithub /></span>
                <div>
                  <h4>GitHub</h4>
                  <p>vsshetty18</p>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/vsvighnesh/" target="_blank" rel="noopener noreferrer" className="contact-info-item">
                <span className="icon-box"><FiLinkedin /></span>
                <div>
                  <h4>LinkedIn</h4>
                  <p>vsvighnesh</p>
                </div>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text" id="name" name="name" required
                    value={formData.name} onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email" id="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text" id="subject" name="subject" required
                  value={formData.subject} onChange={handleChange}
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message" name="message" required
                  value={formData.message} onChange={handleChange}
                  placeholder="Tell me about your project or query..."
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={status.state === 'loading'} style={{ width: '100%' }}>
                {status.state === 'loading' ? 'Sending...' : 'Submit'}
              </button>

              {status.state === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="form-status success"
                >
                  {status.message}
                </motion.div>
              )}
              {status.state === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="form-status error"
                >
                  {status.message}
                </motion.div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <footer className="footer">
      <div className="container footer-content">
        <span className="footer-logo">V S Vighnesh</span>
        <div className="footer-socials">
          <a href="https://github.com/vsshetty18" target="_blank" rel="noopener noreferrer" className="social-icon"><FiGithub /></a>
          <a href="https://www.linkedin.com/in/vsvighnesh/" target="_blank" rel="noopener noreferrer" className="social-icon"><FiLinkedin /></a>
        </div>
        <p className="footer-text">
          © {new Date().getFullYear()} V S Vighnesh. Built with React & Node.js.
        </p>

        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <FiArrowUp />
          </motion.button>
        )}
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </>
  )
}
