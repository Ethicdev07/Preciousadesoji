"use client";

import Image from "next/image";
import {
  FormEvent,
  SVGProps,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    title: "Executive & Admin Support",
    description:
      "Inbox organisation, calendar coordination, meeting prep, follow-ups, and the dependable day-to-day support that keeps work moving.",
    detail: "Inbox · Calendar · SOPs",
  },
  {
    title: "Social Media Management",
    description:
      "End-to-end content planning, scheduling, community engagement, and performance tracking that keeps your brand consistent and connected.",
    detail: "Strategy · Scheduling · Engagement",
  },
  {
    title: "Digital Marketing",
    description:
      "Goal-led digital campaigns that connect content, search, and analytics to build visibility and turn attention into measurable action.",
    detail: "Campaigns · Analytics · Growth",
  },
  {
    title: "Video Editing",
    description:
      "Polished short-form and promotional videos shaped from raw footage with clean cuts, strong pacing, captions, and brand-aligned finishing.",
    detail: "Reels · Captions · Storytelling",
  },
  {
    title: "SEO & Web Support",
    description:
      "Keyword research, on-page improvements, content recommendations, and thoughtful landing-page reviews that strengthen your visibility.",
    detail: "SEO · Content · Conversion",
  },
];

const tools = [
  "Google Workspace",
  "Google Analytics",
  "Search Console",
  "Meta Business Tools",
  "CapCut",
  "Canva",
  "Google Trends",
  "ChatGPT",
  "Claude AI",
  "Buffer",
];

const projects = [
  {
    title: "Social Media Content Plan",
    category: "Social media management",
    description:
      "A structured monthly content plan combining campaign themes, platform-ready captions, publishing schedules, and engagement prompts.",
    className: "project-visual--social",
  },
  {
    title: "Operations Toolkit",
    category: "Admin systems",
    description:
      "A practical collection of SOPs, email templates, meeting notes, and trackers designed to help a growing team work consistently.",
    className: "project-visual--operations",
  },
  {
    title: "Short-Form Video Edit",
    category: "Video editing",
    description:
      "A polished vertical video edit using intentional pacing, clean transitions, captions, and brand-led visual details to hold attention.",
    className: "project-visual--video",
  },
  {
    title: "Asfaras Consulting",
    category: "Digital presence",
    description:
      "A coordinated digital presence for Asfaras Consulting, bringing website content, search visibility, and social messaging into one clear brand experience.",
    className: "project-visual--asfaras",
  },
];

function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M4 16 16 4M7 4h9v9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ProjectVisual({ className }: { className: string }) {
  if (className.includes("social")) {
    return (
      <div className={`project-visual ${className}`} aria-hidden="true">
        <div className="social-board">
          <div className="social-profile">
            <span />
            <div><b>CONTENT PLAN</b><i /></div>
          </div>
          <div className="social-post-grid">
            {["Launch", "Educate", "Engage", "Story"].map((label) => (
              <div key={label}><i /><span>{label}</span></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (className.includes("operations")) {
    return (
      <div className={`project-visual ${className}`} aria-hidden="true">
        <div className="ops-sheet ops-sheet--back"><span /><span /><span /></div>
        <div className="ops-sheet ops-sheet--front">
          <b>WEEKLY FLOW</b><span /><span /><span /><span />
        </div>
        <span className="ops-check">✓</span>
      </div>
    );
  }

  if (className.includes("video")) {
    return (
      <div className={`project-visual ${className}`} aria-hidden="true">
        <div className="video-frame">
          <span>EDIT IN PROGRESS</span>
          <strong>YOUR STORY,<br />CUT CLEARLY.</strong>
          <i />
        </div>
        <div className="video-timeline">
          {[54, 82, 68, 92, 61].map((width) => (
            <i key={width} style={{ width: `${width}%` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`project-visual ${className}`} aria-hidden="true">
      <span className="search-pill">Asfaras Consulting</span>
      <div className="search-rings"><i /><i /><i /></div>
    </div>
  );
}

export function PortfolioPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "opening">("idle");
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set("[data-hero-reveal], [data-reveal]", { opacity: 1, y: 0 });
        return;
      }

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from("[data-hero-kicker]", { opacity: 0, y: 16, duration: 0.6 })
        .from(
          "[data-hero-title] .hero-line",
          { yPercent: 110, duration: 0.95, stagger: 0.1 },
          "-=0.3",
        )
        .from(
          "[data-hero-copy], [data-hero-actions]",
          { opacity: 0, y: 24, duration: 0.7, stagger: 0.12 },
          "-=0.45",
        )
        .from(
          "[data-hero-image]",
          { opacity: 0, x: 36, scale: 0.96, duration: 1.05 },
          "-=0.9",
        )
        .from(
          "[data-hero-card]",
          { opacity: 0, y: 18, rotate: 3, duration: 0.65 },
          "-=0.45",
        );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.to("[data-hero-image-inner]", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-image]",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to("[data-orbit]", {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
      });
    }, pageRef);

    return () => context.revert();
  }, [reduceMotion]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Precious,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`,
    );

    setFormStatus("opening");
    window.location.href = `mailto:hello@preciousadesoji4.com.ng?subject=${subject}&body=${body}`;
    window.setTimeout(() => setFormStatus("idle"), 1800);
  }

  return (
    <div ref={pageRef} className="site-shell">
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />

      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Precious Adesoji, home">
          <span className="brand-mark">PA</span>
          <span className="brand-name">Precious Adesoji</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <a className="header-cta" href="#contact">
          Start a conversation <ArrowIcon />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>0{index + 1}</span>{item.label}
                </motion.a>
              ))}
            </nav>
            <a className="mobile-email" href="mailto:hello@preciousadesoji4.com.ng">
              hello@preciousadesoji4.com.ng <ArrowIcon />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="top" className="hero-section">
          <div className="hero-copy">
            <div className="availability" data-hero-kicker>
              <span /> Available for remote opportunities
            </div>

            <h1 className="hero-title" data-hero-title>
              <span className="hero-line-wrap"><span className="hero-line">Calm behind</span></span>
              <span className="hero-line-wrap"><span className="hero-line hero-line--accent">every move.</span></span>
            </h1>

            <p className="hero-intro" data-hero-copy>
              I’m <strong>Precious Adesoji</strong>—a social media manager, virtual assistant,
              and digital marketing specialist helping busy founders stay organised, visible,
              and confidently ahead.
            </p>

            <div className="hero-actions" data-hero-actions>
              <motion.a
                className="primary-button"
                href="#contact"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Let’s work together <ArrowIcon />
              </motion.a>
              <a className="text-link" href="#work">Explore selected work <span>↓</span></a>
            </div>

           
          </div>

          <div className="hero-media" data-hero-image>
            <div className="hero-orbit" data-orbit aria-hidden="true">
              <svg viewBox="0 0 100 100">
                <defs>
                  <path id="orbit-path" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
                </defs>
                <text>
                  <textPath href="#orbit-path" startOffset="2%">
                    ORGANISE · CREATE · GROW ·
                  </textPath>
                </text>
              </svg>
              <span>✦</span>
            </div>
            <div className="hero-image-frame">
              <div className="hero-image-inner" data-hero-image-inner>
                <Image
                  src="/precious-adesoji.jpg"
                  alt="Precious Adesoji seated in a creative workspace"
                  fill
                  priority
                  sizes="(max-width: 760px) 88vw, (max-width: 1100px) 44vw, 520px"
                />
              </div>
            </div>
            <div className="hero-service-card" data-hero-card>
              <span>What I bring</span>
              <p>Structure. Strategy.<br />Follow-through.</p>
            </div>
          </div>
        </section>

        <div className="marquee" aria-label="Core strengths">
          <div className="marquee-track">
            {[0, 1].map((group) => (
              <div className="marquee-group" aria-hidden={group === 1} key={group}>
                <span>Strategy</span><i>✦</i><span>Organisation</span><i>✦</i>
                <span>Visibility</span><i>✦</i><span>Follow-through</span><i>✦</i>
              </div>
            ))}
          </div>
        </div>

        <section id="services" className="section services-section">
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow">Services</span>
              <h2>Support that clears<br />the way forward.</h2>
            </div>
            <p>
              From the details that keep your week running to the digital work that keeps your
              business visible, I bring a thoughtful pair of hands to every brief.
            </p>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <motion.article
                className="service-card"
                key={service.title}
                data-reveal
                whileHover={reduceMotion ? undefined : { x: 8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <span className="service-detail">{service.detail}</span>
                <span className="service-arrow"><ArrowIcon /></span>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="about-statement" data-reveal>
            <span className="eyebrow eyebrow--light">About</span>
            <p>
              Your business doesn’t need more noise. It needs someone who notices the details,
              understands the goal, and <em>gets things done.</em>
            </p>
          </div>

          <div className="about-grid">
            <div className="about-card" data-reveal>
              <span className="about-card-label">My approach</span>
              <p>
                I combine an organised mind with a marketer’s eye. That means clean systems
                behind the scenes and thoughtful, on-brand work in front of your audience.
              </p>
              <a href="#contact" className="light-link">Tell me what you need <ArrowIcon /></a>
            </div>

            <div className="qualities" data-reveal>
              {[
                ["Ownership", "I treat every task with genuine care and see it through."],
                ["Clarity", "You’ll always know what is done, what is next, and what I need."],
                ["Adaptability", "New tools and processes don’t slow me down for long."],
                ["Precision", "Every detail is reviewed before it reaches you or your audience."],
              ].map(([title, copy]) => (
                <div className="quality" key={title}>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section tools-section">
          <div className="tools-heading" data-reveal>
            <span className="eyebrow">Toolkit</span>
            <h2>Fluent in the tools<br />your team already uses.</h2>
          </div>
          <div className="tool-cloud" data-reveal>
            {tools.map((tool) => (
              <motion.span
                key={tool}
                whileHover={reduceMotion ? undefined : { y: -5 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="section-heading work-heading" data-reveal>
            <div>
              <span className="eyebrow">Selected work</span>
              <h2>Thoughtful work.<br />Tangible outcomes.</h2>
            </div>
            <p>
              A snapshot of the content systems, video edits, and digital strategies I can
              create. Full samples are available on request.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title} data-reveal>
                <ProjectVisual className={project.className} />
                <div className="project-meta">
                  <span>{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href="#contact" aria-label={`Ask about ${project.title}`}>
                  Ask about this project <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-intro" data-reveal>
            <span className="eyebrow eyebrow--light">Contact</span>
            <h2>Ready for a little<br />more breathing room?</h2>
            <p>
              Tell me what’s taking too much of your time. I’ll bring the structure, energy, and
              follow-through to help you move it forward.
            </p>
            <div className="contact-details">
              <a href="mailto:hello@preciousadesoji4.com.ng">
                <span>Email</span>hello@preciousadesoji4.com.ng
              </a>
              <a href="tel:+2347039658479">
                <span>Phone</span>+234 703 965 8479
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} data-reveal>
            <label>
              <span>Your name</span>
              <input type="text" name="name" placeholder="Jane Smith" autoComplete="name" required />
            </label>
            <label>
              <span>Email address</span>
              <input type="email" name="email" placeholder="jane@company.com" autoComplete="email" required />
            </label>
            <label>
              <span>How can I help?</span>
              <textarea name="message" rows={4} placeholder="A little about your project, team, or task…" required />
            </label>
            <motion.button
              className="form-button"
              type="submit"
              disabled={formStatus === "opening"}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              {formStatus === "opening" ? "Opening your email…" : "Start the conversation"}
              <ArrowIcon />
            </motion.button>
         
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand brand--footer" href="#top" aria-label="Back to top">
          <span className="brand-mark">PA</span>
          <span className="brand-name">Precious Adesoji</span>
        </a>
        <p>Social media management · Video editing · Virtual assistance</p>
        <div><span>© {new Date().getFullYear()} Precious Adesoji</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </div>
  );
}
