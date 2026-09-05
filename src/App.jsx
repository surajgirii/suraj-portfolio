import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import {
  Mail, Phone, Linkedin, Github, ArrowDown, ArrowUpRight, X, Menu,
  Download, ExternalLink, Database, BarChart3, Brain,
  LineChart, BookOpen, Puzzle, Plane, Award, GraduationCap,
  Send, CheckCircle2, MapPin, Calendar, BadgeCheck,
  Layers, TrendingUp, ShieldCheck, Clock,
} from "lucide-react";
import headshotImg from "./assets/headshot.jpg";

/* ============================================================
   DATA — everything below is drawn from Suraj's own resume and
   certificate documents. No invented companies, numbers, or links.
   ============================================================ */

const HEADSHOT = headshotImg;
const RESUME_PDF = "/resume.pdf";

const PROFILE = {
  name: "Suraj Giri",
  role: "Data Analyst",
  roleSecondary: "Data Science Student",
  location: "Delhi-NCR, India",
  email: "sg922603@gmail.com",
  phone: "+91 9508686189",
  linkedin: "https://www.linkedin.com/in/surajgirii",
  linkedinLabel: "linkedin.com/in/surajgirii",
  github: "https://github.com/surajgirii",
  githubLabel: "github.com/surajgirii",
};

const SNAPSHOT = [
  { label: "Program", value: "BCA — Data Science" },
  { label: "SGPA", value: "9.40 / 10" },
  { label: "Data Analytics Internships", value: "2" },
  { label: "Core Stack", value: "Python · SQL · Power BI · Excel" },
];

const SKILL_GROUPS = [
  {
    title: "Programming & Querying",
    icon: Database,
    items: ["Python", "Pandas", "NumPy", "Matplotlib", "NLTK", "SQL", "PostgreSQL", "MySQL", "DBMS"],
  },
  {
    title: "Data Visualization & BI",
    icon: BarChart3,
    items: ["Power BI", "DAX", "Power Query", "Data Modeling", "Excel", "Pivot Tables", "Advanced Formulas"],
  },
  {
    title: "Analytical Methods",
    icon: LineChart,
    items: ["Exploratory Data Analysis", "Time-Series Analysis", "NLP", "Data Cleaning", "Data Preprocessing"],
  },
  {
    title: "Domain Knowledge",
    icon: Brain,
    items: ["Artificial Intelligence", "Machine Learning", "Statistics", "Business Intelligence"],
  },
];

const SOFT_SKILLS = ["Leadership", "Team Work", "Quick Adaptability", "Problem Solving"];

const PROCESS_STEPS = [
  { n: "01", title: "Understand", desc: "Before opening a single file, I try to understand what's actually being asked — who needs the answer, and what decision it's meant to inform." },
  { n: "02", title: "Prepare", desc: "Real data is rarely ready to use. I clean, structure, and validate it — handling missing values, duplicates, and inconsistent formats — so every later step can be trusted." },
  { n: "03", title: "Explore", desc: "I dig into the data itself: distributions, outliers, correlations, and anything that doesn't quite add up, before assuming I know what it shows." },
  { n: "04", title: "Analyze", desc: "Using SQL, Python, and basic statistical methods, I move from general patterns to a specific, defensible answer to the original question." },
  { n: "05", title: "Visualize", desc: "I choose the chart that fits the finding, not the other way around — the goal is a visual someone understands in seconds, not one that impresses for a moment." },
  { n: "06", title: "Recommend", desc: "The last step is turning an analysis into a recommendation someone can actually act on, stated plainly enough that it doesn't need me in the room to explain it." },
];

const EXPERIENCE = [
  {
    company: "TechnoHacks Solutions Pvt. Ltd.",
    role: "Data Analytics Intern",
    period: "Aug 23 – Sep 22, 2025",
    tools: ["Python", "SQL", "Excel", "Pandas"],
    desc: "My first real exposure to a full analytics workflow — cleaning raw data, running exploratory analysis, and writing SQL queries — then using what I found to put together business reports that turned those raw datasets into insights the team could actually act on.",
    highlight: null,
  },
  {
    company: "InAmigos Foundation",
    role: "AI Data Analytics Intern",
    period: "Aug 5 – Aug 22, 2026",
    tools: ["Excel", "Database Management", "Data Analytics", "AI Tools"],
    desc: "Worked across data collection, analysis, and performance reporting for the organization's ongoing projects, using Excel and basic database management to track engagement and performance metrics that supported the team's decision-making.",
    highlight: "Recognized as Best Intern",
  },
];

const PROJECTS = [
  {
    index: "01",
    name: "NYC 311 Municipal Complaint Intelligence Pipeline",
    tagline: "Turning a city's complaint backlog into a map of where service breaks down.",
    tech: ["Python", "SQL", "HTML", "Spatial Analysis"],
    category: "Civic Data",
    overview: "An end-to-end analytics pipeline built to clean, transform, and analyze large-scale municipal complaint data.",
    problem: "City agencies field a high volume of resident complaints across many categories and boroughs, which makes it hard to tell where service delivery is actually breaking down versus running on time.",
    dataset: "Large-scale NYC 311 municipal complaint records, spanning multiple complaint categories with timestamps, locations, and resolution outcomes.",
    approach: "Cleaned and transformed the raw complaint data into an analysis-ready structure, then used SQL and Python to calculate SLA breach rates, turnaround times, and workload distribution across complaint types.",
    findings: "Resolution delays and SLA breaches cluster around specific service types and locations — surfaced through geographic hotspot mapping alongside the turnaround-time analysis.",
    demonstrates: "End-to-end pipeline building, SQL at scale, and turning operational data into a geographic and time-based diagnostic.",
  },
  {
    index: "02",
    name: "Traffic Mortality Hotspot Analysis",
    tagline: "Mapping where and when road risk peaks, from years of crash data.",
    tech: ["Python", "Data Visualization", "EDA"],
    category: "Public Safety",
    overview: "An exploratory analysis of multi-year traffic accident and fatality records to surface where crashes cluster and when they're most likely to happen.",
    problem: "Road safety interventions work best when they're targeted — this project set out to identify which locations and time windows carry the highest risk.",
    dataset: "Multi-year traffic accident and fatality records.",
    approach: "Performed exploratory data analysis across the dataset and built spatial visualizations to reveal patterns in location, timing, and contributing factors.",
    findings: "The analysis surfaced high-risk locations, peak accident periods, and recurring contributing factors behind the crashes.",
    demonstrates: "EDA on real-world safety data, and turning spatial and time-based patterns into a visual narrative.",
  },
  {
    index: "03",
    name: "Crop Advisory & Price Intelligence System",
    tagline: "Connecting yield, price, and policy data into one advisory view.",
    tech: ["Python", "Machine Learning", "Data Analytics"],
    category: "Agriculture",
    overview: "A system that brings together crop yield, market price, and MSP (minimum support price) data to support more informed agricultural decisions.",
    problem: "Farmers and advisors often have to piece together yield trends, market prices, and government support prices from separate sources.",
    dataset: "Crop yield records, market price data, and MSP (minimum support price) data.",
    approach: "Preprocessed and integrated the datasets, applied statistical analysis to price trends, and used machine learning concepts for yield forecasting and crop recommendations.",
    findings: "The integrated view supports price-trend analysis and yield forecasting to inform crop recommendations.",
    demonstrates: "Applying ML concepts to a real domain problem, and combining multiple data sources into one decision-support view.",
  },
];

const CERT_GROUPS = [
  {
    label: "Job Simulations",
    items: [
      {
        issuer: "Deloitte",
        title: "Data Analytics Job Simulation",
        via: "Forage",
        date: "Aug 7, 2026",
        skills: ["Data analysis", "Forensic technology"],
        verify: { type: "code", label: "Enrolment Code", value: "6a75ce37fb673cc13dae731f" },
      },
      {
        issuer: "Quantium",
        title: "Data Analytics Job Simulation",
        via: "Forage",
        date: "Aug 10, 2026",
        skills: ["Data preparation & customer analytics", "Experimentation & uplift testing", "Analytics & commercial application"],
        verify: { type: "code", label: "Enrolment Code", value: "Eozo4jLZBkaeyNGdC" },
      },
      {
        issuer: "Tata",
        title: "GenAI Powered Data Analytics Job Simulation",
        via: "Forage",
        date: "Jul 18, 2026",
        skills: ["EDA & risk profiling", "Predicting delinquency with AI", "Data storytelling", "AI-driven collections strategy"],
        verify: { type: "code", label: "Enrolment Code", value: "6a5224a2a0e8399451e4502a" },
      },
      {
        issuer: "Tata",
        title: "Data Visualisation: Empowering Business with Effective Insights",
        via: "Forage",
        date: "Jul 23, 2026",
        skills: ["Framing the business scenario", "Choosing the right visuals", "Communicating insights"],
        verify: { type: "code", label: "Enrolment Code", value: "6a62242844a924a084a871f3" },
      },
    ],
  },
  {
    label: "Courses & Certificates",
    items: [
      {
        issuer: "Cisco Networking Academy",
        title: "Data Science Essentials with Python",
        via: null,
        date: "Jul 25, 2026",
        skills: ["DataFrames & groupby", "Merging datasets", "Data cleaning", "Matplotlib", "Linear model basics", "Hypothesis testing"],
        verify: { type: "code", label: "Credential ID", value: "cccc44b7-ad8f-4793-aae4-d3569656399c" },
      },
      {
        issuer: "Coursera",
        title: "Machine Learning Pipelines with Azure ML Studio",
        via: null,
        date: "Jul 8, 2026",
        skills: ["Azure ML Studio", "ML pipelines"],
        verify: { type: "link", label: "Verify on Coursera", href: "https://coursera.org/verify/WE1RT3OWVZHB" },
      },
      {
        issuer: "Microsoft",
        title: "Data Analyst 101",
        via: null,
        date: "Aug 16, 2026",
        skills: ["Data analytics fundamentals"],
        verify: { type: "code", label: "Certificate Code", value: "10607181" },
      },
    ],
  },
  {
    label: "Skill India Digital",
    items: [
      {
        issuer: "Reliance Foundation Skilling Academy",
        title: "AI–Machine Learning Engineer Certificate Course",
        via: "150 hours",
        date: "Aug 2, 2026",
        skills: ["Applied AI & ML fundamentals"],
        verify: { type: "authority", label: "Verified via Skill India Digital Hub" },
      },
      {
        issuer: "NASSCOM",
        title: "AI – Data Engineering Analyst",
        via: "Certificate of Participation",
        date: "Aug 2, 2026",
        skills: ["Data engineering fundamentals"],
        verify: { type: "authority", label: "Verified via Skill India Digital Hub" },
      },
    ],
  },
];

const EDUCATION = {
  degree: "Bachelor of Computer Applications (BCA) — Data Science",
  school: "SRM Institute of Science and Technology",
  period: "2024 – 2027",
  sgpa: "9.40",
  sgpaMax: 10,
};

const EXPLORING = [
  "GenAI-powered analytics",
  "ML pipelines on Azure",
  "Business data visualization",
  "Applied AI & ML fundamentals",
];

const HOBBIES = [
  { icon: BookOpen, label: "Reading", note: "curiosity" },
  { icon: Puzzle, label: "Solving puzzles", note: "analytical thinking" },
  { icon: Plane, label: "Traveling", note: "perspective" },
];

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/* ============================================================
   CURSOR CONTEXT
   ============================================================ */

const CursorContext = createContext(() => {});
function useCursorHover(variant) {
  const setVariant = useContext(CursorContext);
  return {
    onMouseEnter: () => setVariant(variant),
    onMouseLeave: () => setVariant("default"),
  };
}

/* ============================================================
   HOOKS
   ============================================================ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
    };
  }, []);
  return reduced;
}

function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const touchCap = "ontouchstart" in window;
    setIsTouch(coarse || touchCap);
  }, []);
  return isTouch;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ============================================================
   GLOBAL STYLES
   ============================================================ */

function GlobalStyles() {
  return (
    <style>{`
      :root {
        --bg: #FAF7F1;
        --surface: #F1EBDF;
        --surface-2: #E8DFCC;
        --ink: #201C17;
        --muted: #6E6759;
        --accent: #23415C;
        --accent-dark: #16293A;
        --accent-light: #5C7C97;
        --accent-soft: rgba(35,65,92,0.07);
        --accent-soft-2: rgba(35,65,92,0.14);
        --border: #E2D8C4;
      }
      html, body { margin: 0; padding: 0; background: var(--bg); }
      .pf-root { background: var(--bg); color: var(--ink); }
      .font-display { font-family: 'Manrope', 'Inter', sans-serif; }
      .font-body { font-family: 'Inter', 'Manrope', sans-serif; }
      .font-serif-accent { font-family: 'Lora', Georgia, serif; }
      .text-ink { color: var(--ink); }
      .text-muted { color: var(--muted); }
      .text-accent { color: var(--accent); }
      .bg-app { background: var(--bg); }
      .bg-surface { background: var(--surface); }
      .bg-surface-2 { background: var(--surface-2); }
      .bg-accent { background: var(--accent); }
      .bg-accent-dark { background: var(--accent-dark); }
      .bg-accent-soft { background: var(--accent-soft); }
      .border-hair { border-color: var(--border); }
      .pf-root a, .pf-root button { cursor: inherit; }
      .cursor-none-active, .cursor-none-active * { cursor: none !important; }
      .accent-focus:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 2px; }
      .reveal { opacity: 0; transform: translateY(16px); transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1); }
      .reveal.is-visible { opacity: 1; transform: translateY(0); }
      .tag-pill { border: 1px solid var(--border); background: var(--surface); transition: background .2s ease, border-color .2s ease; }
      .tag-pill:hover { background: var(--accent-soft); border-color: var(--accent-light); }
      .underline-grow { position: relative; text-decoration: none; }
      .underline-grow::after { content:''; position:absolute; left:0; bottom:-2px; height:1px; width:0; background: currentColor; transition: width .25s ease; }
      .underline-grow:hover::after { width:100%; }
      .card-lift { transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s ease, border-color .35s ease; }
      .card-lift:hover { transform: translateY(-4px); border-color: var(--accent-light); }
      .skip-link { position: absolute; left: -9999px; top: 0; background: var(--accent); color: #fff; padding: 10px 16px; z-index: 100; }
      .skip-link:focus { left: 12px; top: 12px; }
      @media (prefers-reduced-motion: reduce) {
        .reveal { opacity: 1; transform: none; transition: none; }
        .card-lift:hover { transform: none; }
        html { scroll-behavior: auto; }
      }
      html { scroll-behavior: smooth; }
      ::selection { background: var(--accent); color: #fff; }
    `}</style>
  );
}

/* ============================================================
   BACKGROUND FIELD — the site's signature visual: a quiet
   coordinate grid of plotted tick marks, fixed behind the page.
   Ticks near the cursor brighten, like scanning a chart for a
   value. Visible mainly through the hero.
   ============================================================ */

function BackgroundField({ reducedMotion }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let spacing = 46;
    const drawHeight = 900;

    function draw(time) {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;
      const t = time / 1800;
      const maxY = Math.min(height, drawHeight);

      for (let y = spacing; y < maxY; y += spacing) {
        for (let x = spacing; x < width; x += spacing) {
          const wave = reducedMotion ? 0.5 : Math.sin((x + y) * 0.012 + t) * 0.5 + 0.5;
          let alpha = 0.045 + wave * 0.05;
          let size = 3;

          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            const boost = (140 - d) / 140;
            alpha = Math.min(0.5, alpha + boost * 0.4);
            size = 3 + boost * 2.5;
          }

          ctx.strokeStyle = `rgba(35,65,92,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - size, y);
          ctx.lineTo(x + size, y);
          ctx.moveTo(x, y - size);
          ctx.lineTo(x, y + size);
          ctx.stroke();
        }
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      spacing = width < 720 ? 60 : 46;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    }

    resize();
    window.addEventListener("resize", resize);

    function onMove(e) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (reducedMotion) draw(0);
    }
    window.addEventListener("mousemove", onMove);

    function tick(time) {
      draw(time);
      rafRef.current = requestAnimationFrame(tick);
    }

    if (!reducedMotion) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

/* ============================================================
   CUSTOM CURSOR — a small crosshair/reticle, echoing the
   coordinate-grid background. Expands into a focus bracket
   over interactive elements.
   ============================================================ */

function CustomCursor({ variant }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    function onMove(e) {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 34}px, ${e.clientY - 34}px, 0)`;
      }
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const isActive = variant !== "default";
  const inner = isActive ? 10 : 6;
  const outer = isActive ? 20 : 13;

  return (
    <svg
      ref={cursorRef}
      aria-hidden="true"
      width="68"
      height="68"
      viewBox="0 0 68 68"
      style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }}
    >
      <g transform="translate(34,34)">
        <circle cx="0" cy="0" r="2" fill="var(--accent)" />
        <line x1="0" y1={-inner} x2="0" y2={-outer} stroke="var(--accent)" strokeWidth="1.2" />
        <line x1="0" y1={inner} x2="0" y2={outer} stroke="var(--accent)" strokeWidth="1.2" />
        <line x1={-inner} y1="0" x2={-outer} y2="0" stroke="var(--accent)" strokeWidth="1.2" />
        <line x1={inner} y1="0" x2={outer} y2="0" stroke="var(--accent)" strokeWidth="1.2" />
        {isActive && (
          <g stroke="var(--accent)" strokeWidth="1.2" fill="none" opacity="0.8">
            <path d="M -26 -18 L -26 -26 L -18 -26" />
            <path d="M 26 -18 L 26 -26 L 18 -26" />
            <path d="M -26 18 L -26 26 L -18 26" />
            <path d="M 26 18 L 26 26 L 18 26" />
          </g>
        )}
      </g>
    </svg>
  );
}

/* ============================================================
   NAV
   ============================================================ */

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const linkHover = useCursorHover("link");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function go(id) {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className="fixed top-0 left-0 right-0"
      style={{
        zIndex: 50,
        backdropFilter: "blur(10px)",
        background: scrolled ? "rgba(250,247,241,0.85)" : "rgba(250,247,241,0)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background .3s ease, border-color .3s ease",
      }}
    >
      <a href="#home" className="skip-link font-body text-sm">Skip to content</a>
      <nav className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => go("home")}
          className="font-display font-bold text-lg accent-focus"
          style={{ color: "var(--ink)" }}
          {...linkHover}
        >
          Suraj Giri
        </button>

        <ul className="hidden lg:flex items-center gap-7 font-body text-sm">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                className="underline-grow accent-focus py-1"
                style={{ color: active === item.id ? "var(--accent)" : "var(--muted)" }}
                {...linkHover}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={RESUME_PDF}
            download="Suraj_Giri_Resume.pdf"
            className="inline-flex items-center gap-2 font-body text-sm px-4 py-2 rounded-full accent-focus"
            style={{ background: "var(--accent)", color: "#fff" }}
            {...linkHover}
          >
            <Download size={15} /> Resume
          </a>
        </div>

        <button
          className="lg:hidden accent-focus"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          {...linkHover}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-hair bg-app px-6 py-5">
          <ul className="flex flex-col gap-4 font-body text-base">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button onClick={() => go(item.id)} className="text-ink">
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a href={RESUME_PDF} download="Suraj_Giri_Resume.pdf" className="inline-flex items-center gap-2 text-accent font-medium">
                <Download size={16} /> Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */

function Hero() {
  const linkHover = useCursorHover("link");
  const btnHover = useCursorHover("button");

  function go(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="home" className="relative pt-36 pb-24 md:pt-44 md:pb-32 px-6 md:px-10" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-2 font-body text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
            >
              <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "#3E8E5A", display: "inline-block" }} />
              Open to work
            </span>
            <p className="font-body text-sm tracking-wide" style={{ color: "var(--accent)" }}>
              Data Analyst · Data Science Student
            </p>
          </div>

          <h1
            className="font-display font-bold max-w-2xl"
            style={{ fontSize: "clamp(2.2rem, 5.4vw, 4rem)", lineHeight: 1.06, color: "var(--ink)" }}
          >
            Turning data into decisions.
          </h1>

          <p className="font-body mt-7 max-w-xl text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            I'm a Data Science student and aspiring Data Analyst working toward
            a BCA at SRM Institute of Science and Technology. Day to day, that
            means Python, SQL, Power BI, and Excel — taking a messy, real-world
            dataset, cleaning it until it can be trusted, exploring what's
            actually happening inside it, and building the kind of clear,
            visual analysis that helps someone else make a confident decision.
            I've practiced that across two internships and three independent
            projects, and I'm looking for a Data Analyst role or internship
            where I can keep doing it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => go("projects")}
              className="inline-flex items-center gap-2 font-body px-6 py-3 rounded-full accent-focus"
              style={{ background: "var(--accent)", color: "#fff" }}
              {...btnHover}
            >
              Explore My Work <ArrowDown size={16} />
            </button>
            <button
              onClick={() => go("contact")}
              className="inline-flex items-center gap-2 font-body px-6 py-3 rounded-full border accent-focus"
              style={{ borderColor: "var(--border)", color: "var(--ink)" }}
              {...btnHover}
            >
              Let's Connect
            </button>
            <a
              href={RESUME_PDF}
              download="Suraj_Giri_Resume.pdf"
              className="inline-flex items-center gap-2 font-body text-sm underline-grow"
              style={{ color: "var(--accent)" }}
              {...linkHover}
            >
              Download Resume <Download size={14} />
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)", width: "260px", flexShrink: 0 }}
          >
            <img
              src={HEADSHOT}
              alt="Portrait of Suraj Giri"
              className="w-full h-full object-cover"
              style={{ display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SNAPSHOT STRIP
   ============================================================ */

function Snapshot() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className={`reveal ${visible ? "is-visible" : ""} px-6 md:px-10`}>
      <div
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 border-t border-b border-hair"
        style={{ borderColor: "var(--border)" }}
      >
        {SNAPSHOT.map((s, i) => (
          <div
            key={s.label}
            className="py-7 px-4 md:px-6"
            style={{ borderLeft: i === 0 ? "none" : "1px solid var(--border)" }}
          >
            <p className="font-body text-xs uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>
              {s.label}
            </p>
            <p className="font-display font-semibold text-lg md:text-xl" style={{ color: "var(--ink)" }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */

function About() {
  const [ref, visible] = useReveal();
  return (
    <section id="about" ref={ref} className={`reveal ${visible ? "is-visible" : ""} py-24 md:py-32 px-6 md:px-10 bg-app relative`} style={{ zIndex: 10 }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-8" style={{ color: "var(--ink)" }}>
          About
        </h2>
        <div className="font-body space-y-5 text-base md:text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
          <p>
            I'm a BCA Data Science student at SRM Institute of Science and
            Technology, currently maintaining a 9.40 SGPA while working toward
            a career as a Data Analyst. Most of what I've learned so far has
            come from taking something disorganized — a spreadsheet, a set of
            complaint records, a folder of price data — and turning it into
            something someone else can actually use.
          </p>
          <p>
            My interest in data started with a simple habit: I like figuring
            out what a messy dataset is actually trying to tell you. That's
            shown up in the projects I've built — cleaning municipal
            complaint records, mapping traffic risk, and connecting crop and
            price data — and in two internships where I got to apply SQL,
            Python, and Excel to real reporting work, at TechnoHacks
            Solutions and, more recently, at the InAmigos Foundation, where I
            was recognized as Best Intern.
          </p>
          <p>
            Outside the technical side, I read and write regularly, and I
            think it shows up in how I approach data — I care as much about
            how a finding is explained as I do about how it was found. A
            clean number nobody can follow isn't finished yet; the last step
            is always turning it into something someone can actually read.
          </p>
        </div>

        <blockquote className="mt-10 pl-6 md:pl-8" style={{ borderLeft: "2px solid var(--accent)" }}>
          <p className="font-serif-accent italic text-xl md:text-2xl leading-snug" style={{ color: "var(--ink)" }}>
            Most data problems are really just messy stories, waiting to be
            read properly.
          </p>
        </blockquote>
      </div>
    </section>
  );
}

/* ============================================================
   PROCESS — "How I Work With Data"
   ============================================================ */

function Process() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className={`reveal ${visible ? "is-visible" : ""} py-24 md:py-32 px-6 md:px-10 bg-surface relative`} style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-3" style={{ color: "var(--ink)" }}>
          How I work with data
        </h2>
        <p className="font-body text-base md:text-lg mb-14 max-w-xl" style={{ color: "var(--muted)" }}>
          Not just building dashboards — following a process.
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.n} className="relative">
              <p className="font-display font-bold text-2xl mb-3" style={{ color: "var(--accent-light)" }}>
                {step.n}
              </p>
              <h3 className="font-display font-semibold text-lg mb-2" style={{ color: "var(--ink)" }}>
                {step.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SKILLS
   ============================================================ */

function SkillsSection() {
  const [ref, visible] = useReveal();
  const tagHover = useCursorHover("button");
  return (
    <section id="skills" ref={ref} className={`reveal ${visible ? "is-visible" : ""} py-24 md:py-32 px-6 md:px-10 bg-app relative`} style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-3" style={{ color: "var(--ink)" }}>
          What I can do
        </h2>
        <p className="font-body text-base md:text-lg mb-14 max-w-xl" style={{ color: "var(--muted)" }}>
          The tools and methods I reach for most, grouped by what they're
          actually for.
        </p>

        <div className="grid md:grid-cols-2 gap-10 md:gap-x-14 md:gap-y-12 mb-14">
          {SKILL_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.title}>
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon size={18} style={{ color: "var(--accent)" }} />
                  <h3 className="font-display font-semibold text-base" style={{ color: "var(--ink)" }}>
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="tag-pill font-body text-sm px-3.5 py-1.5 rounded-full"
                      style={{ color: "var(--ink)" }}
                      {...tagHover}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-10 border-t border-hair">
          <h3 className="font-display font-semibold text-base mb-4" style={{ color: "var(--ink)" }}>
            Working style
          </h3>
          <div className="flex flex-wrap gap-2">
            {SOFT_SKILLS.map((item) => (
              <span
                key={item}
                className="font-body text-sm px-3.5 py-1.5 rounded-full"
                style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EXPERIENCE
   ============================================================ */

function ExperienceSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="experience" ref={ref} className={`reveal ${visible ? "is-visible" : ""} py-24 md:py-32 px-6 md:px-10 bg-surface relative`} style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-14" style={{ color: "var(--ink)" }}>
          What I have done
        </h2>

        <div className="max-w-3xl">
          {EXPERIENCE.map((job, i) => (
            <div key={job.company} className="relative pl-8 pb-14 last:pb-0" style={{ borderLeft: i === EXPERIENCE.length - 1 ? "none" : "1px solid var(--border)" }}>
              <span
                className="absolute top-1 w-3.5 h-3.5 rounded-full"
                style={{ left: "-7px", background: "var(--accent)", border: "3px solid var(--surface)" }}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="font-display font-semibold text-xl" style={{ color: "var(--ink)" }}>
                  {job.role}
                </h3>
                <span className="font-body text-sm flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
                  <Calendar size={14} /> {job.period}
                </span>
              </div>
              <p className="font-body text-base font-medium mb-3" style={{ color: "var(--accent)" }}>
                {job.company}
              </p>
              <p className="font-body text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                {job.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {job.tools.map((t) => (
                  <span key={t} className="tag-pill font-body text-xs px-3 py-1 rounded-full" style={{ color: "var(--ink)" }}>
                    {t}
                  </span>
                ))}
              </div>
              {job.highlight && (
                <p className="font-body text-sm inline-flex items-center gap-1.5 font-medium" style={{ color: "var(--accent)" }}>
                  <Award size={15} /> {job.highlight}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROJECTS
   ============================================================ */

function ProjectCard({ project, onOpen }) {
  const hover = useCursorHover("view");
  return (
    <div
      className="card-lift rounded-2xl border p-7 md:p-8 flex flex-col h-full"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="flex items-start justify-between mb-6">
        <span className="font-display font-bold text-3xl" style={{ color: "var(--accent-light)" }}>
          {project.index}
        </span>
        <span className="font-body text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
          {project.category}
        </span>
      </div>
      <h3 className="font-display font-semibold text-xl mb-2.5 leading-snug" style={{ color: "var(--ink)" }}>
        {project.name}
      </h3>
      <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
        {project.tagline}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-7">
        {project.tech.map((t) => (
          <span key={t} className="font-body text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
            {t}
          </span>
        ))}
      </div>
      <button
        onClick={() => onOpen(project)}
        className="mt-auto inline-flex items-center gap-1.5 font-body text-sm font-medium underline-grow accent-focus"
        style={{ color: "var(--accent)" }}
        {...hover}
      >
        View Case Study <ArrowUpRight size={15} />
      </button>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const hover = useCursorHover("button");
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
      style={{ zIndex: 200, background: "rgba(32,28,23,0.55)" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        className="rounded-2xl w-full max-w-2xl my-8 relative"
        style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close case study"
          className="absolute top-5 right-5 accent-focus"
          style={{ color: "var(--muted)" }}
          {...hover}
        >
          <X size={22} />
        </button>

        <div className="p-8 md:p-10">
          <span className="font-body text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
            {project.category}
          </span>
          <h3 className="font-display font-bold text-2xl md:text-3xl mt-4 mb-2" style={{ color: "var(--ink)" }}>
            {project.name}
          </h3>
          <p className="font-body text-base mb-8" style={{ color: "var(--muted)" }}>
            {project.overview}
          </p>

          {[
            ["Problem", project.problem],
            ["Dataset", project.dataset],
            ["Approach", project.approach],
            ["Findings", project.findings],
            ["What this demonstrates", project.demonstrates],
          ].map(([label, text]) => (
            <div key={label} className="mb-6">
              <h4 className="font-display font-semibold text-sm uppercase tracking-wide mb-1.5" style={{ color: "var(--accent)" }}>
                {label}
              </h4>
              <p className="font-body text-base leading-relaxed" style={{ color: "var(--ink)" }}>
                {text}
              </p>
            </div>
          ))}

          <div className="pt-2">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wide mb-2.5" style={{ color: "var(--accent)" }}>
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="tag-pill font-body text-sm px-3 py-1.5 rounded-full" style={{ color: "var(--ink)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [ref, visible] = useReveal();
  const [openProject, setOpenProject] = useState(null);

  return (
    <section id="projects" ref={ref} className={`reveal ${visible ? "is-visible" : ""} py-24 md:py-32 px-6 md:px-10 bg-surface relative`} style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-3" style={{ color: "var(--ink)" }}>
          Projects
        </h2>
        <p className="font-body text-base md:text-lg mb-14 max-w-xl" style={{ color: "var(--muted)" }}>
          Three end-to-end analyses, from raw data to a usable recommendation.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} project={p} onOpen={setOpenProject} />
          ))}
        </div>
      </div>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </section>
  );
}

/* ============================================================
   CERTIFICATIONS
   ============================================================ */

function CertCard({ cert }) {
  const hover = useCursorHover(cert.verify.type === "link" ? "link" : "default");
  return (
    <div
      className="card-lift rounded-xl border p-6 flex flex-col h-full"
      style={{ borderColor: "var(--border)", background: "var(--bg)" }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-body text-xs font-medium" style={{ color: "var(--accent)" }}>
            {cert.issuer}{cert.via && cert.verify.type !== "authority" ? ` · ${cert.via}` : ""}
          </p>
          <h4 className="font-display font-semibold text-base mt-1 leading-snug" style={{ color: "var(--ink)" }}>
            {cert.title}
          </h4>
        </div>
        <BadgeCheck size={20} style={{ color: "var(--accent-light)", flexShrink: 0 }} />
      </div>

      <p className="font-body text-xs flex items-center gap-1.5 mb-4" style={{ color: "var(--muted)" }}>
        <Clock size={13} /> {cert.date}{cert.via && cert.verify.type === "authority" ? ` · ${cert.via}` : ""}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {cert.skills.map((s) => (
          <span key={s} className="font-body text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--surface)", color: "var(--muted)" }}>
            {s}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-3 border-t" style={{ borderColor: "var(--border)" }}>
        {cert.verify.type === "link" ? (
          <a
            href={cert.verify.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-sm font-medium underline-grow"
            style={{ color: "var(--accent)" }}
            {...hover}
          >
            {cert.verify.label} <ExternalLink size={13} />
          </a>
        ) : cert.verify.type === "code" ? (
          <p className="font-body text-xs" style={{ color: "var(--muted)" }}>
            {cert.verify.label}: <span style={{ color: "var(--ink)" }}>{cert.verify.value}</span>
          </p>
        ) : (
          <p className="font-body text-xs inline-flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
            <ShieldCheck size={13} /> {cert.verify.label}
          </p>
        )}
      </div>
    </div>
  );
}

function CertificationsSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="certifications" ref={ref} className={`reveal ${visible ? "is-visible" : ""} py-24 md:py-32 px-6 md:px-10 bg-app relative`} style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-3" style={{ color: "var(--ink)" }}>
          What I have learned
        </h2>
        <p className="font-body text-base md:text-lg mb-14 max-w-xl" style={{ color: "var(--muted)" }}>
          Applied simulations and courses completed alongside my degree.
        </p>

        {CERT_GROUPS.map((group) => (
          <div key={group.label} className="mb-12 last:mb-0">
            <h3 className="font-display font-semibold text-lg mb-5 flex items-center gap-2" style={{ color: "var(--ink)" }}>
              <Layers size={17} style={{ color: "var(--accent)" }} /> {group.label}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {group.items.map((cert) => (
                <CertCard key={cert.title} cert={cert} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   EDUCATION
   ============================================================ */

function SgpaRing({ value, max }) {
  const pct = value / max;
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct);
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true">
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
      <circle
        cx="70" cy="70" r={r} fill="none" stroke="var(--accent)" strokeWidth="10"
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        transform="rotate(-90 70 70)"
      />
      <text x="70" y="66" textAnchor="middle" className="font-display" fontSize="24" fontWeight="700" fill="var(--ink)">
        {value}
      </text>
      <text x="70" y="86" textAnchor="middle" className="font-body" fontSize="12" fill="var(--muted)">
        out of {max}
      </text>
    </svg>
  );
}

function EducationSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="education" ref={ref} className={`reveal ${visible ? "is-visible" : ""} py-24 md:py-32 px-6 md:px-10 bg-surface relative`} style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-14" style={{ color: "var(--ink)" }}>
          Where I am going
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 rounded-2xl border p-8 md:p-10" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
          <SgpaRing value={EDUCATION.sgpa} max={EDUCATION.sgpaMax} />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap size={18} style={{ color: "var(--accent)" }} />
              <span className="font-body text-sm" style={{ color: "var(--muted)" }}>{EDUCATION.period}</span>
            </div>
            <h3 className="font-display font-semibold text-xl mb-1.5" style={{ color: "var(--ink)" }}>
              {EDUCATION.degree}
            </h3>
            <p className="font-body text-base" style={{ color: "var(--muted)" }}>
              {EDUCATION.school}
            </p>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-display font-semibold text-lg mb-5" style={{ color: "var(--ink)" }}>
            Currently exploring
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {EXPLORING.map((item) => (
              <span
                key={item}
                className="font-body text-sm px-4 py-2 rounded-full inline-flex items-center gap-1.5"
                style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
              >
                <TrendingUp size={14} /> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PERSONALITY
   ============================================================ */

function PersonalitySection() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className={`reveal ${visible ? "is-visible" : ""} py-20 px-6 md:px-10 bg-app relative`} style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        <h3 className="font-display font-semibold text-lg mb-8" style={{ color: "var(--ink)" }}>
          Beyond the datasets
        </h3>
        <div className="flex flex-wrap gap-10 md:gap-16">
          {HOBBIES.map((h) => {
            const Icon = h.icon;
            return (
              <div key={h.label} className="flex items-center gap-3">
                <Icon size={20} style={{ color: "var(--accent)" }} />
                <div>
                  <p className="font-body text-base font-medium" style={{ color: "var(--ink)" }}>{h.label}</p>
                  <p className="font-body text-sm" style={{ color: "var(--muted)" }}>{h.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */

function ContactSection() {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const linkHover = useCursorHover("link");
  const btnHover = useCursorHover("button");

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="contact" ref={ref} className={`reveal ${visible ? "is-visible" : ""} py-24 md:py-32 px-6 md:px-10 bg-surface relative`} style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-5 leading-tight" style={{ color: "var(--ink)" }}>
            Let's turn data into something useful.
          </h2>
          <p className="font-body text-base md:text-lg mb-10 max-w-md" style={{ color: "var(--muted)" }}>
            Open to Data Analyst and Data Analytics internship and entry-level
            opportunities. Reach out directly, or use the form.
          </p>

          <div className="flex flex-col gap-4 font-body text-base">
            <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-3 underline-grow" style={{ color: "var(--ink)" }} {...linkHover}>
              <Mail size={18} style={{ color: "var(--accent)" }} /> {PROFILE.email}
            </a>
            <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-3 underline-grow" style={{ color: "var(--ink)" }} {...linkHover}>
              <Phone size={18} style={{ color: "var(--accent)" }} /> {PROFILE.phone}
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 underline-grow" style={{ color: "var(--ink)" }} {...linkHover}>
              <Linkedin size={18} style={{ color: "var(--accent)" }} /> {PROFILE.linkedinLabel}
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 underline-grow" style={{ color: "var(--ink)" }} {...linkHover}>
              <Github size={18} style={{ color: "var(--accent)" }} /> {PROFILE.githubLabel}
            </a>
            <p className="inline-flex items-center gap-3" style={{ color: "var(--muted)" }}>
              <MapPin size={18} style={{ color: "var(--accent)" }} /> {PROFILE.location}
            </p>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="rounded-2xl border p-8 text-center" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
              <CheckCircle2 size={28} style={{ color: "var(--accent)" }} className="mx-auto mb-4" />
              <p className="font-display font-semibold text-lg mb-2" style={{ color: "var(--ink)" }}>
                Opening your email app…
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                Your message is pre-filled and addressed to{" "}
                <a href={`mailto:${PROFILE.email}`} className="underline-grow" style={{ color: "var(--accent)" }} {...linkHover}>
                  {PROFILE.email}
                </a>{" "}
                — just hit send from there. If nothing opened, feel free to
                email me directly instead.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border p-8 flex flex-col gap-5" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
              <div>
                <label htmlFor="name" className="font-body text-sm block mb-1.5" style={{ color: "var(--muted)" }}>Name</label>
                <input
                  id="name" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full font-body text-base px-4 py-2.5 rounded-lg border accent-focus"
                  style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--ink)" }}
                />
              </div>
              <div>
                <label htmlFor="email" className="font-body text-sm block mb-1.5" style={{ color: "var(--muted)" }}>Email</label>
                <input
                  id="email" type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full font-body text-base px-4 py-2.5 rounded-lg border accent-focus"
                  style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--ink)" }}
                />
              </div>
              <div>
                <label htmlFor="message" className="font-body text-sm block mb-1.5" style={{ color: "var(--muted)" }}>Message</label>
                <textarea
                  id="message" required rows={4} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full font-body text-base px-4 py-2.5 rounded-lg border accent-focus resize-none"
                  style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--ink)" }}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 font-body px-6 py-3 rounded-full accent-focus"
                style={{ background: "var(--accent)", color: "#fff" }}
                {...btnHover}
              >
                Send Message <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  const linkHover = useCursorHover("link");
  return (
    <footer className="px-6 md:px-10 py-12 bg-app relative border-t border-hair" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-base" style={{ color: "var(--ink)" }}>{PROFILE.name}</p>
          <p className="font-body text-sm" style={{ color: "var(--muted)" }}>Data Analyst · Data Analytics · Data Science</p>
        </div>
        <div className="flex items-center gap-5">
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "var(--muted)" }} {...linkHover}>
            <Linkedin size={19} />
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: "var(--muted)" }} {...linkHover}>
            <Github size={19} />
          </a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email" style={{ color: "var(--muted)" }} {...linkHover}>
            <Mail size={19} />
          </a>
        </div>
        <p className="font-body text-xs" style={{ color: "var(--muted)" }}>© 2026 {PROFILE.name}</p>
      </div>
    </footer>
  );
}

/* ============================================================
   ROOT
   ============================================================ */

export default function Portfolio() {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouch();
  const [cursorVariant, setCursorVariant] = useState("default");
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <CursorContext.Provider value={setCursorVariant}>
      <div className={`pf-root font-body relative ${!isTouch ? "cursor-none-active" : ""}`}>
        <GlobalStyles />
        <BackgroundField reducedMotion={reducedMotion} />
        {!isTouch && <CustomCursor variant={cursorVariant} />}

        <Navbar active={active} />

        <main className="relative">
          <Hero />
          <Snapshot />
          <About />
          <Process />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <CertificationsSection />
          <EducationSection />
          <PersonalitySection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </CursorContext.Provider>
  );
}
