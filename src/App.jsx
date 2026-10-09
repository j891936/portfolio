import React, { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Check,
  Command,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Network,
  ShieldCheck,
  Sun,
  Terminal,
  X,
} from 'lucide-react';

const articles = [
  {
    date: 'OCT 02, 2026',
    category: 'LEARNING NOTES',
    title: 'What I learned from my first home lab',
    summary: 'A small, isolated network taught me more about how systems talk than another dozen diagrams ever could.',
    read: '6 MIN READ',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85',
    body: 'My first home lab was not a rack of blinking servers. It was a spare laptop, a virtual machine, and a network I could safely break.\n\nI started with the basics: mapping what was running, watching traffic, and writing down what changed when I made a change. Seeing a DNS lookup happen in Wireshark made a familiar concept feel real.\n\nThe biggest lesson was to make the environment boring on purpose. Keep experiments isolated, snapshot before a risky change, and document the setup while it is still fresh. The notes became more useful than the lab itself.',
  },
  {
    date: 'SEP 18, 2026',
    category: 'WEB SECURITY',
    title: 'A beginner’s field notes on the OWASP Top 10',
    summary: 'A practical starting point for understanding the risks behind the names, and how I am learning to test for them.',
    read: '8 MIN READ',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1000&q=85',
    body: 'The OWASP Top 10 is most useful to me as a map, not a checklist. Each category is a prompt to ask better questions about how an application handles identity, input, and trust.\n\nI have been pairing each topic with a tiny practice app and a deliberately vulnerable lab. I try to understand the underlying mistake first, then look at how a fix changes the behavior.\n\nMy notes are still a work in progress. The goal is not to memorize ten labels; it is to build the habit of following data and challenging assumptions.',
  },
  {
    date: 'AUG 29, 2026',
    category: 'BUILD LOG',
    title: 'Building a password checker that explains itself',
    summary: 'Thinking beyond the green tick: a tiny project about feedback, threat models, and useful security UX.',
    read: '5 MIN READ',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=85',
    body: 'A password checker can easily turn into a score generator that looks more certain than it is. I wanted my version to explain its suggestions instead.\n\nIt checks length and common patterns locally, and gives one actionable suggestion at a time. It does not send the input anywhere. That constraint is part of the feature, not a footnote.\n\nThe project reminded me that good security tools need to be understandable. Feedback should help someone make a decision without pretending that one score captures their entire risk.',
  },
];

const projects = [
  {
    number: '01',
    name: 'Packet Notes',
    type: 'NETWORKING / PYTHON',
    description: 'A small command-line helper that turns packet-capture observations into tidy, searchable lab notes.',
    tags: ['Python', 'Networking', 'CLI'],
    link: 'https://github.com/',
    icon: '⌁',
  },
  {
    number: '02',
    name: 'Passphrase Check',
    type: 'WEB SECURITY / JAVASCRIPT',
    description: 'A privacy-first password strength explainer that teaches by showing clear, actionable feedback.',
    tags: ['JavaScript', 'Security UX', 'Web'],
    link: 'https://github.com/',
    icon: '◎',
  },
  {
    number: '03',
    name: 'Study Buddy API',
    type: 'BACKEND / REST API',
    description: 'A practice API for organizing study sessions, with input validation and authentication built in.',
    tags: ['Node.js', 'REST', 'Auth'],
    link: 'https://github.com/',
    icon: '↗',
  },
];

const toolGroups = [
  {
    name: 'Languages & web',
    icon: Braces,
    tools: ['Python', 'JavaScript', 'HTML & CSS'],
  },
  {
    name: 'Systems & network',
    icon: Network,
    tools: ['Linux', 'Wireshark', 'Networking'],
  },
  {
    name: 'Build & security',
    icon: ShieldCheck,
    tools: ['Git & GitHub', 'Burp Suite', 'VS Code'],
  },
];

const filters = ['ALL POSTS', 'LEARNING NOTES', 'WEB SECURITY', 'BUILD LOG'];

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('jamal-theme') || 'light');
  const [activeFilter, setActiveFilter] = useState('ALL POSTS');
  const [article, setArticle] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('jamal-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!article) return undefined;
    const closeOnEscape = (event) => event.key === 'Escape' && setArticle(null);
    window.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [article]);

  const visibleArticles = activeFilter === 'ALL POSTS'
    ? articles
    : articles.filter((item) => item.category === activeFilter);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('hello@jamalosoba.dev');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = 'mailto:hello@jamalosoba.dev';
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Jamal Osoba, home">
          <span className="wordmark-mark">JO</span>
          <span>JAMAL OSOBA</span>
        </a>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#tools" onClick={() => setMenuOpen(false)}>Tools</a>
          <a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="topbar-actions">
          <button
            className="icon-button theme-button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <a className="availability" href="#contact"><span /> OPEN TO OPPORTUNITIES</a>
          <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero page-width" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> COMPUTER SCIENCE STUDENT <span className="eyebrow-dot">/</span> SECURITY CURIOUS</div>
            <h1>Jamal<br /><span>Osoba<span className="hero-period">.</span></span></h1>
            <div className="hero-bottom">
              <p className="hero-intro">Learning how things break so I can help build them <span>better.</span></p>
              <a href="#about" className="round-link" aria-label="Scroll to about"><ArrowDownRight size={22} /></a>
            </div>
            <div className="hero-meta"><span><span className="meta-live" /> BASED IN THE US</span><span>19 YEARS OLD</span><span>CS + CYBERSECURITY</span></div>
          </div>
          <div className="hero-visual">
            <div className="image-frame">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=90" alt="A student working at a laptop in a bright workspace" />
              <div className="image-caption"><span>LEARNING IN PUBLIC</span><span>EST. 2007</span></div>
            </div>
            <div className="visual-stamp"><ShieldCheck size={25} strokeWidth={1.5} /><span>CURIOUS<br />BY DEFAULT</span></div>
            <div className="hero-index"><span>01</span><span className="index-rule" /><span>04</span></div>
          </div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={16} /></a>
        </section>

        <section className="intro-band" id="about">
          <div className="page-width intro-grid">
            <div className="section-label"><span>01 / A LITTLE ABOUT ME</span><span className="label-rule" /></div>
            <div className="intro-content">
              <h2>Part student.<br />Part <span>problem-solver.</span><br />Always learning.</h2>
              <div className="intro-detail">
                <p>I’m a 19-year-old college student studying computer science and cybersecurity. I’m interested in the people and systems behind security: how software is built, where it can fail, and how we make it more resilient.</p>
                <p>Most days you’ll find me learning a new tool, building a small project, or writing down the things I wish I’d known sooner. This site is where all of that comes together.</p>
                <a className="text-link" href="#contact">A LITTLE MORE ABOUT ME <ArrowUpRight size={15} /></a>
              </div>
            </div>
            <div className="principles">
              <div><span className="principle-number">01</span><div><strong>Stay curious</strong><p>Ask how it works. Then ask again.</p></div><Command size={18} /></div>
              <div><span className="principle-number">02</span><div><strong>Build with care</strong><p>Useful, thoughtful, and secure by design.</p></div><ShieldCheck size={18} /></div>
              <div><span className="principle-number">03</span><div><strong>Share the process</strong><p>Learning is better when it’s not a secret.</p></div><ArrowUpRight size={18} /></div>
            </div>
          </div>
        </section>

        <section className="projects-section page-width" id="projects">
          <div className="section-heading">
            <div><div className="section-kicker">02 / SELECTED WORK</div><h2>Things I’ve <span>made.</span></h2></div>
            <p>Small projects, real questions.<br />Each one teaches me something new.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <a className="project-row" href={project.link} target="_blank" rel="noreferrer" key={project.number}>
                <span className="project-number">{project.number}</span>
                <span className="project-glyph" aria-hidden="true">{project.icon}</span>
                <span className="project-main"><span className="project-type">{project.type}</span><strong>{project.name}</strong><span className="project-description">{project.description}</span></span>
                <span className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</span>
                <span className="project-arrow"><ArrowUpRight size={19} /></span>
              </a>
            ))}
          </div>
          <a className="text-link all-projects" href="https://github.com/" target="_blank" rel="noreferrer">MORE ON GITHUB <ArrowUpRight size={15} /></a>
        </section>

        <section className="tools-section" id="tools">
          <div className="page-width">
            <div className="section-heading tools-heading">
              <div><div className="section-kicker">03 / TOOLS & TECHNOLOGIES</div><h2>What I’m <span>working with.</span></h2></div>
              <p>A growing toolkit for building,<br />exploring, and learning securely.</p>
            </div>
            <div className="tools-grid">
              {toolGroups.map(({ name, icon: Icon, tools: groupTools }) => (
                <article className="tool-card" key={name}>
                  <div className="tool-card-heading"><Icon size={19} strokeWidth={1.6} /><h3>{name}</h3></div>
                  <div className="tool-tags">{groupTools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                </article>
              ))}
            </div>
            <div className="tools-note"><Terminal size={15} /><span>Still learning. Always adding to the toolkit.</span></div>
          </div>
        </section>

        <section className="journal-section" id="journal">
          <div className="page-width journal-inner">
            <div className="section-heading journal-heading">
              <div><div className="section-kicker">04 / THE JOURNAL</div><h2>Notes from the <span>process.</span></h2></div>
              <p>Things I’m learning, making,<br />and trying to understand.</p>
            </div>
            <div className="filter-row" aria-label="Filter journal posts">
              {filters.map((filter) => (
                <button className={activeFilter === filter ? 'filter active' : 'filter'} key={filter} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}</button>
              ))}
            </div>
            <div className="article-grid">
              {visibleArticles.map((item, index) => (
                <button className={`article-card${index === 0 && activeFilter === 'ALL POSTS' ? ' featured-article' : ''}`} key={item.title} onClick={() => setArticle(item)}>
                  <span className="article-image"><img src={item.image} alt="" /><span className="article-open"><ArrowUpRight size={18} /></span></span>
                  <span className="article-meta"><span>{item.category}</span><span>{item.date}</span></span>
                  <strong>{item.title}</strong>
                  <span className="article-summary">{item.summary}</span>
                  <span className="article-read">{item.read} <span>↗</span></span>
                </button>
              ))}
            </div>
            <div className="journal-foot"><span>MORE NOTES AS I LEARN THEM.</span><span>NO HOT TAKES. JUST FIELD NOTES. <span className="foot-star">✳</span></span></div>
          </div>
        </section>

        <section className="contact-section page-width" id="contact">
          <div className="contact-top"><span className="section-kicker">05 / SAY HELLO</span><span className="contact-availability"><span className="meta-live" /> OPEN TO INTERNSHIPS & COLLABORATION</span></div>
          <h2>Good work starts<br />with a <span>conversation.</span></h2>
          <div className="contact-bottom">
            <p>Have a project, an opportunity, or a good question?<br />I’d be glad to hear from you.</p>
            <button className="email-button" onClick={copyEmail}><Mail size={17} /> {copied ? 'EMAIL COPIED' : 'HELLO@JAMALOSOBA.DEV'} {copied ? <Check size={16} /> : <ArrowUpRight size={16} />}</button>
          </div>
          <div className="social-links">
            <a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={16} /> GITHUB <ArrowUpRight size={13} /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LINKEDIN <ArrowUpRight size={13} /></a>
            <a href="mailto:hello@jamalosoba.dev"><Mail size={16} /> EMAIL <ArrowUpRight size={13} /></a>
          </div>
        </section>
      </main>

      <footer className="footer page-width"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-mark">JO</span><span>JAMAL OSOBA</span></a><span>DESIGNED & BUILT WITH CURIOSITY <span className="foot-star">✳</span></span><a href="#home">BACK TO TOP ↑</a><span>© 2026</span></footer>

      {article && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setArticle(null)}>
          <article className="article-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="icon-button modal-close" onClick={() => setArticle(null)} aria-label="Close article"><X size={19} /></button>
            <div className="modal-image"><img src={article.image} alt="" /></div>
            <div className="modal-content"><div className="article-meta"><span>{article.category}</span><span>{article.date}</span></div><h2 id="modal-title">{article.title}</h2><p className="modal-summary">{article.summary}</p><div className="modal-body">{article.body.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><button className="text-link" onClick={() => setArticle(null)}>CLOSE ARTICLE <X size={15} /></button></div>
          </article>
        </div>
      )}
    </div>
  );
}

export default App;