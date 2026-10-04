import React, { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  Clock3,
  Check,
  Code2,
  Download,
  ExternalLink,
  Github,
  Globe2,
  House,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  Terminal,
  UserRound,
  X,
  Zap
} from "lucide-react";

const projects = [
  {
    id: "anthem",
    number: "01",
    name: "Anthem",
    eyebrow: "EAP · Client Onboarding · Broker Microsite",
    description:
      "A unified UI system and API-driven experience for Anthem's broker microsite ecosystem.",
    stack: ["React", "JavaScript", "SCSS", "API Integration"],
    metrics: [
      "6 engineers led",
      "100% on-time launches",
      "25% fewer post-release bugs"
    ],
    accent: "cyan",
    url: "https://www.anthemeap.com"
  },

  {
    id: "deluxe",
    number: "02",
    name: "Deluxe",
    eyebrow: "Design System · Component Library · UI Engineering",
    description:
      "Enhanced and refactored a global component library to improve design consistency, component quality and frontend delivery.",
    stack: ["React", "JavaScript", "SCSS", "Design System"],
    metrics: [
      "30+ core components refactored",
      "40% less design-to-code inconsistency",
      "50+ components enhanced",
      "100% design fidelity",
      "20% fewer QA cycles"
    ],
    accent: "violet",
    url: "https://www.deluxe.com"
  },

  {
    id: "smartops",
    number: "03",
    name: "UST SmartOps",
    eyebrow: "Legacy migration · Enterprise UI",
    description:
      "Modernized a legacy enterprise frontend into a reusable architecture built for faster delivery.",
    stack: ["Angular", "JavaScript", "HTML5", "SCSS"],
    metrics: [
      "35% smaller bundle",
      "2 weeks faster feature delivery"
    ],
    accent: "violet",
    url: "https://www.ust.com/smartops"
  },

  {
    id: "hero",
    number: "04",
    name: "Hero MotoCorp",
    eyebrow: "High-performance UI · API-driven filters",
    description:
      "A component-rich experience with complex animations, API integration and a two-wheeler filtering system.",
    stack: ["React", "JavaScript", "SCSS", "API"],
    metrics: [
      "10+ UI components",
      "90+ Lighthouse score",
      "25% longer sessions"
    ],
    accent: "amber",
    url: "https://www.heromotocorp.com"
  },

  {
    id: "netocean",
    number: "05",
    name: "NETOCEAN",
    eyebrow: "Real-time visualization · Diagnostics",
    description:
      "A high-performance dashboard transforming live server data and logs into an intuitive diagnostic interface.",
    stack: ["Angular 2", "TypeScript", "HTML5", "CSS3"],
    metrics: [
      "Thousands of requests/sec visualized",
      "30% faster data interpretation"
    ],
    accent: "blue",
    url: "https://www.cavisson.com"
  }
];

const personalProjects = [
  {
    id: "pokemon-finder",
    number: "01",
    name: "Pokédex Hunt",
    eyebrow: "Personal Project · Interactive Web App",
    description:
      "An interactive Pokémon discovery experience with search, type-based filtering and an engaging Pokédex-style interface.",
    stack: ["React", "JavaScript", "REST API", "CSS", "Vercel"],
    features: [
      "Search Pokémon by name or ID",
      "Type-based filtering",
      "Elite Pokémon filtering",
      "Responsive interactive UI"
    ],
    accent: "amber",
    url: "https://pokemon-finder-plum.vercel.app/"
  }
];

const skills = [
  ["React.js", "Frontend"],
  ["Next.js", "Frontend"],
  ["JavaScript ES6+", "Frontend"],
  ["TypeScript", "Frontend"],
  ["System Design", "Architecture"],
  ["REST APIs", "Web"],
  ["Performance", "Web"],
  ["Lazy Loading", "Performance"],
  ["Code Splitting", "Performance"],
  ["SCSS / LESS", "Styling"],
  ["Context API", "State"],
  ["Git", "Tools"],
  ["Chrome DevTools", "Tools"],
  ["GitHub Copilot", "AI"],
  ["Claude Code", "AI"],
  ["Generative AI", "AI"],
  ["Prompt Engineering", "AI"],
  ["Agentic AI", "AI"]
];

const timeline = [
  {
    year: "2018 — 2019",
    title: "Software Engineer",
    company: "Cavisson Systems",
    text: "Built real-time monitoring and diagnostic interfaces using Angular and TypeScript, working with high-volume server data and performance-focused UI development."
  },
  {
    year: "2019 — Present",
    title: "Senior Software Engineer",
    company: "UST",
    text: "Leading frontend architecture and delivery across enterprise applications, with a focus on React, scalable UI systems, performance optimization and reusable component libraries."
  }
];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const nav = useMemo(
    () => [
      ["Work", "work", BriefcaseBusiness],
      ["Expertise", "expertise", Layers3],
      ["Experience", "experience", Clock3],
      ["About", "about", UserRound]
    ],
    []
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <motion.div className="progress" style={{ scaleX: progress }} />

      <header className="nav">
        <button
            className="home-button"
            onClick={() => scrollTo("top")}
            aria-label="Home"
          >
            <House size={16} />
          </button>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {nav.map(([label, id, Icon]) => (
            <button key={id} onClick={() => scrollTo(id)}>
              <Icon size={15} />
              <span>{label}</span>
            </button>
          ))}

          <button onClick={() => scrollTo("contact")}>
            <Mail size={15} />
            <span>Contact</span>
          </button>
        </nav>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-grid" />
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />

          <div className="hero-copy">
            <Reveal delay={0.08}>
              <p className="kicker">SENIOR FRONTEND ENGINEER</p>
              <h1>
                Rounak<br />
                <em>Samota</em>
              </h1>

              <p className="hero-description">
                8+ years of experience building scalable web applications,
                reusable component systems and high-performance frontend
                experiences with React, Next.js and JavaScript.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="hero-ctas">
                <button className="primary-button" onClick={() => scrollTo("work")}>
                  Explore my work <ArrowDown size={17} />
                </button>
                <a className="resume-button" href="/Rounak_Samota_Resume.pdf" download>
                  <Download size={16} /> Resume
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="socials">
                <a href="https://github.com/rounak60" target="_blank" rel="noreferrer"><Github size={18} /></a>
                <a href="https://www.linkedin.com/in/rounak-samota" target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
                <a href="mailto:rounaksamota56@gmail.com"><Mail size={18} /></a>
                <a href="https://wa.me/917077106833" target="_blank" rel="noreferrer" aria-label="WhatsApp Rounak"><MessageCircle size={15} /></a>
                <a href="tel:+919113185189" aria-label="Call Rounak"><Phone size={15} /></a>
              </div>
            </Reveal>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <motion.div
              className="orbit orbit-a"
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="orbit orbit-b"
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="code-window"
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              <div className="window-bar"><i /><i /><i /><span>frontend.tsx</span></div>
              <pre><code><span className="tok-purple">const</span> dev = {'{'}
{`  `}<span className="tok-cyan">name</span>: <span className="tok-green">"Rounak"</span>,
{`  `}<span className="tok-cyan">focus</span>: [<span className="tok-green">"React"</span>, <span className="tok-green">"Performance"</span>],
{`  `}<span className="tok-cyan">craft</span>: <span className="tok-green">"Scalable UI"</span>
{'}'}</code></pre>
            </motion.div>
            <motion.div
              className="floating-card card-react"
              animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code2 size={18} /><span>ReactJs</span>
            </motion.div>
            <motion.div
              className="floating-card card-performance"
              animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap size={17} /><span>SEO / GEO</span>
            </motion.div>
            <motion.div
                className="floating-card card-bundle"
                animate={{ y: [0, -10, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap size={16} />
                <span>Optimization</span>
                
              </motion.div>

              <motion.div
                className="floating-card card-design"
                animate={{ y: [0, 12, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Layers3 size={16} />
                <span>System Design</span>
                <b>+</b>
              </motion.div>

              <motion.div
                className="floating-card card-ai"
                animate={{ y: [0, -13, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles size={16} />
                <span>Gen/Agentic AI</span>
                <b>✦</b>
              </motion.div>

              <motion.div
                className="floating-card card-experience"
                animate={{ y: [0, 11, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <Globe2 size={16} />
                <span>Agile</span>
              </motion.div>
            <div className="visual-core"><span>UI</span></div>
          </div>
        </section>

        <section className="stats section-shell">
          {[
            ["8+", "Years experience"],
            ["6+", "Major client projects"],
            ["35%", "Faster frontend delivery"],
            ["35%", "Smaller frontend bundle"],
            ["6", "Engineers led"]
          ].map(([value, label], i) => (
            <Reveal key={label} delay={i * 0.04}>
              <div className="stat">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            </Reveal>
          ))}
        </section>

        {/* <section id="work" className="section section-shell">
          <SectionHeading
            index="01"
            eyebrow="Selected work"
            title={<>Proof in <span>projects.</span></>}
            copy="A selection of enterprise interfaces, design systems, migrations and performance-focused frontend work."
          />

          <div className="project-list">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.04}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section> */}
        <section id="work" className="section section-shell">
          <SectionHeading
            index="01"
            eyebrow="Selected work"
            title={<>Proof in <span>projects.</span></>}
            copy="Professional work and personal projects that showcase my approach to frontend engineering."
          />

          {/* Professional Projects */}
          <div className="work-category">
            <div className="work-category-heading">
              <span>01</span>
              <h3>Professional Work</h3>
            </div>

            <div className="project-list">
              {projects.map((project, index) => (
                <Reveal key={project.id} delay={index * 0.04}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Personal Projects */}
          <div className="work-category personal-projects">
            <div className="work-category-heading">
              <span>02</span>
              <h3>Personal Projects</h3>
            </div>

            <div className="project-list">
              {personalProjects.map((project, index) => (
                <Reveal key={project.id} delay={index * 0.04}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="expertise" className="section section-shell expertise-section">
          <SectionHeading
            index="02"
            eyebrow="Engineering expertise"
            title={<>The stack behind <span>the craft.</span></>}
            copy="A practical toolkit shaped around scalable architecture, reusable systems and measurable performance."
          />

          <div className="expertise-layout">
            <div className="skills-cloud">
              {skills.map(([skill, category], i) => (
                <motion.div
                  key={skill}
                  className={`skill-pill category-${category.toLowerCase().replaceAll(" ", "-")}`}
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                >
                  <span>{skill}</span>
                  <small>{category}</small>
                </motion.div>
              ))}
            </div>

            <div className="architecture-card">
              <div className="mini-label"><Layers3 size={15} /> HOW I BUILD</div>
              <div className="architecture-flow">
                <div><Code2 /> <span>Components</span></div>
                <ChevronRight />
                <div><Layers3 /> <span>Systems</span></div>
                <ChevronRight />
                <div><Zap /> <span>Performance</span></div>
                <ChevronRight />
                <div><Globe2 /> <span>Experience</span></div>
              </div>
              <p>
                Reusable architecture, thoughtful interactions and performance
                budgets working together instead of competing with each other.
              </p>
            </div>
          </div>
        </section>

        <section id="experience" className="section section-shell">
          <SectionHeading
            index="03"
            eyebrow="Professional journey"
            title={<>Eight years of <span>building.</span></>}
            copy="From real-time diagnostics to enterprise design systems and modern frontend migrations."
          />

          <div className="timeline">
            {timeline.map((item, i) => (
              <Reveal key={`${item.year}-${item.title}`} delay={i * 0.03}>
                <div className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <p>{item.company}</p>
                    <h3>{item.title}</h3>
                    <span>{item.text}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section section-shell ai-section">
          <div className="ai-panel">
            <div className="ai-orb"><Sparkles size={28} /></div>
            <div>
              <div className="mini-label"><Sparkles size={15} /> AI + PRODUCTIVITY</div>
              <h2>Engineering with a modern <span>toolbox.</span></h2>
              <p>
                Claude code, GitHub Copilot, Gen AI, Agentic AI and Prompt Engineering are part
                of how I reduce repetitive work, accelerate development and
                improve code quality.
              </p>
            </div>
            <div className="prompt-terminal">
              <div className="terminal-top"><Terminal size={14} /> prompt-engineering.log</div>
              <code>
                <span>&gt; architect reusable component</span>
                <span>&gt; optimize loading strategy</span>
                <span>&gt; review accessibility</span>
                <b>&gt; ship better / faster_</b>
              </code>
            </div>
          </div>
        </section>

        <section id="about" className="section section-shell about-section">
          <div className="about-grid">
            <div>
              <div className="section-index">04 / ABOUT</div>
              <h2>Senior engineer.<br /><span>Team builder.</span><br />Frontend obsessive.</h2>
            </div>
            <div className="about-copy">
              <p>
                Senior Frontend Engineer with 8+ years of experience building
                scalable web applications using React.js, Next.js and
                JavaScript (ES6+).
              </p>
              <p>
                I enjoy turning complex requirements into reusable component
                libraries, responsive interfaces and architectures that help
                teams ship with confidence.
              </p>
              <div className="about-facts">
                <div><b>Leadership</b><span>Cross-functional teams up to 6 engineers</span></div>
                <div><b>Delivery</b><span>Agile / Scrum environments</span></div>
                <div><b>Languages</b><span>English · Hindi</span></div>
                <div><b>Off-hours</b><span>Badminton · Gaming</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section-shell">
          <div className="contact-glow" />
          <div className="section-index">05 / CONTACT</div>
          <h2>Let's build something<br /><span>worth remembering.</span></h2>
          <p>From complex frontend problems to ambitious products, I’m always open to building something impactful.</p>
          <div className="contact-links">
            <div className="contact-links">
              <a href="mailto:rounaksamota56@gmail.com">
                <Mail size={16} />
                rounaksamota56@gmail.com
              </a>

              <a href="https://wa.me/917077106833" target="_blank" rel="noreferrer">
                <MessageCircle size={16} />
                WhatsApp
              </a>

              <a href="tel:+919113185189">
                <Phone size={16} />
                Call
              </a>

              <a href="https://github.com/rounak60" target="_blank" rel="noreferrer">
                <Github size={16} />
                github.com/rounak60
              </a>

              <a href="https://www.linkedin.com/in/rounak-samota" target="_blank" rel="noreferrer">
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-shell">
        <span>© {new Date().getFullYear()} Rounak Samota</span>
        <a href="#top"><ArrowUp size={16} /> Back to top</a>
      </footer>
    </div>
  );
}

function SectionHeading({ index, eyebrow, title, copy }) {
  return (
    <div className="section-heading">
      <div className="section-index">{index} / {eyebrow}</div>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={`project-card accent-${project.accent}`}>
      <div className="project-number">{project.number}</div>

      <div className="project-main">
        <div className="project-copy">
          <p className="project-eyebrow">{project.eyebrow}</p>

          <h3>{project.name}</h3>

          <p>{project.description}</p>

          <div className="chips">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="project-link"
          >
            Visit project <ExternalLink size={15} />
          </a>

          {/* Professional project metrics */}
          {project.metrics && (
            <div className="metric-stack">
              {project.metrics.map((metric) => (
                <div className="metric" key={metric}>
                  <Check size={16} />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          )}

          {/* Personal project features */}
          {project.features && (
            <div className="metric-stack">
              {project.features.map((feature) => (
                <div className="metric" key={feature}>
                  <Check size={16} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default App;
