import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  CaretDown,
  List,
  X,
  Pause,
  Play,
} from "@phosphor-icons/react";
import { productLinks, solutionLinks, resourceLinks, guides } from "./site";
import { useMotion } from "./MotionContext";
const logo = "/assets/logos/trialqueue-lockup-reverse.svg";
export function SiteHeader() {
  const [menu, setMenu] = useState(null),
    [scrolled, setScrolled] = useState(false);
  const dialog = useRef(null),
    nav = useRef(null),
    last = useRef(null);
  const location = useLocation();
  const groups = [
    ["Products", "/products", productLinks],
    ["Solutions", "/solutions", solutionLinks],
    ["Resources", "/resources", resourceLinks],
    [
      "Company",
      "/company",
      [
        {
          to: "/company",
          label: "About TrialQueue",
          detail: "Our research-stage mission",
        },
        {
          to: "/contact",
          label: "Contact",
          detail: "A business workflow conversation",
        },
      ],
    ],
  ];
  const close = () => {
    setMenu(null);
    dialog.current?.close();
  };
  useEffect(() => {
    close();
  }, [location.pathname]);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 30),
      key = (e) => {
        if (e.key === "Escape") {
          setMenu(null);
          last.current?.focus();
        }
      },
      outside = (e) => {
        if (!nav.current?.contains(e.target)) setMenu(null);
      };
    window.addEventListener("scroll", f, { passive: true });
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("scroll", f);
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  const group = ([label, to, items]) => (
    <div key={label} className="site-nav-group">
      <NavLink className="site-nav-link" to={to}>
        {label}
      </NavLink>
      <button
        className="site-nav-toggle"
        aria-label={"Show " + label.toLowerCase() + " pages"}
        aria-expanded={menu === label}
        aria-controls={"nav-" + label}
        onClick={(e) => {
          last.current = e.currentTarget;
          setMenu(menu === label ? null : label);
        }}
      >
        <CaretDown size={11} />
      </button>
      {menu === label && (
        <div className="site-menu" id={"nav-" + label}>
          <div className="site-menu-intro">
            <span className="overline">
              {label === "Products"
                ? "FIVE PROPOSED MODULES"
                : label.toUpperCase()}
            </span>
            <h3>
              {label === "Products"
                ? "One accountable review workflow."
                : label === "Solutions"
                  ? "Built around your responsibilities."
                  : label === "Resources"
                    ? "Follow the evidence."
                    : "A human-accountable approach."}
            </h3>
            <Link to={to}>
              Explore {label.toLowerCase()} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="site-menu-links">
            {items.map((i) => (
              <Link key={i.to} to={i.to}>
                <span>
                  <strong>{i.label}</strong>
                  <small>{i.detail}</small>
                </span>
                <ArrowUpRight size={17} />
              </Link>
            ))}
          </div>
          <div className="site-menu-foot">
            RESEARCH-STAGE CONCEPT · NO LIVE CLINICAL CONNECTIONS{" "}
            <Link to="/demo">
              Explore the synthetic demo <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={"site-header " + (scrolled ? "header-scrolled" : "")}>
        <Link className="brand" to="/" aria-label="TrialQueue home">
          <img src={logo} alt="TrialQueue" />
        </Link>
        <nav className="site-navigation" ref={nav} aria-label="Main navigation">
          {group(groups[0])}
          <NavLink className="site-nav-link" to="/platform">
            Platform
          </NavLink>
          {groups.slice(1).map(group)}
          <NavLink className="site-nav-link" to="/pilot">
            Pilot & pricing
          </NavLink>
        </nav>
        <div className="nav-actions">
          <Link className="sign-in" to="/sign-in">
            Sign in
          </Link>
          <Link className="button nav-cta" to="/request-pilot">
            Request a scoped pilot
          </Link>
          <button
            className="icon-button menu-toggle"
            aria-label="Open navigation"
            onClick={() => dialog.current.showModal()}
          >
            <List size={25} />
          </button>
        </div>
      </header>
      <dialog className="site-mobile-menu" ref={dialog} aria-label="Navigation">
        <button
          className="icon-button site-menu-close"
          aria-label="Close navigation"
          onClick={close}
        >
          <X size={24} />
        </button>
        <Link to="/" onClick={close}>
          <img width="175" src={logo} alt="TrialQueue" />
        </Link>
        <span className="overline">EXPLORE TRIALQUEUE</span>
        <nav aria-label="Mobile navigation">
          {groups.map(([label, to, items]) => (
            <details key={label}>
              <summary>
                {label}
                <CaretDown size={17} />
              </summary>
              <Link to={to} onClick={close}>
                {label} overview
              </Link>
              {items.map((i) => (
                <Link key={i.to} to={i.to} onClick={close}>
                  {i.label}
                  <small>{i.detail}</small>
                </Link>
              ))}
            </details>
          ))}
          <Link to="/platform" onClick={close}>
            Platform <ArrowUpRight />
          </Link>
          <Link to="/pilot" onClick={close}>
            Pilot & pricing <ArrowUpRight />
          </Link>
          <Link to="/sign-in" onClick={close}>
            Sign in <ArrowUpRight />
          </Link>
          <Link className="button" to="/request-pilot" onClick={close}>
            Request a scoped pilot <ArrowRight />
          </Link>
        </nav>
        <p className="overline">CONCEPT PREVIEW · SYNTHETIC DATA ONLY</p>
      </dialog>
    </>
  );
}
export function SiteFooter() {
  const groups = [
    [
      "Products",
      [{ to: "/products", label: "Products overview" }, ...productLinks],
    ],
    [
      "Platform & solutions",
      [
        { to: "/platform", label: "Platform" },
        { to: "/demo", label: "Synthetic demo" },
        { to: "/solutions", label: "Solutions overview" },
        ...solutionLinks,
      ],
    ],
    [
      "Learn & evaluate",
      [
        ...resourceLinks,
        { to: "/pilot", label: "Pilot & pricing" },
        ...guides.map((g) => ({
          to: "/resources/" + g.slug,
          label: g.category + " guide",
        })),
      ],
    ],
    [
      "Company",
      [
        { to: "/company", label: "About TrialQueue" },
        { to: "/contact", label: "Contact" },
        { to: "/request-pilot", label: "Request a scoped pilot" },
        { to: "/sign-in", label: "Sign in" },
        { to: "/legal/privacy", label: "Privacy notice" },
        { to: "/legal/terms", label: "Preview terms" },
      ],
    ],
  ];
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer-top">
          <div>
            <Link to="/" aria-label="TrialQueue home">
              <img src={logo} alt="TrialQueue" width="190" />
            </Link>
            <p>
              Cited evidence.
              <br />
              Visible uncertainty.
              <br />A person at every next step.
            </p>
            <span className="overline">RESEARCH-STAGE CONCEPT</span>
          </div>
          <Link className="footer-invitation" to="/request-pilot">
            Bring one protocol.
            <br />
            Let’s trace the work. <ArrowUpRight size={30} />
          </Link>
        </div>
        <div className="site-footer-grid">
          {groups.map(([title, items]) => (
            <div key={title}>
              <h4>{title}</h4>
              {items.map((i) => (
                <Link key={i.to} to={i.to}>
                  {i.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="site-footer-bottom">
          <span>© 2026 TrialQueue · Working brand; clearance unverified.</span>
          <span>Concept preview. Synthetic data. No clinical guidance.</span>
        </div>
      </div>
    </footer>
  );
}
export function MotionControl() {
  const { paused, setPaused, osReduced } = useMotion();
  return (
    <button
      className="floating-motion"
      onClick={() => setPaused(!paused)}
      aria-label={
        osReduced
          ? "Reduced motion follows device preference"
          : paused
            ? "Resume animation"
            : "Pause animation"
      }
      title={
        osReduced
          ? "Device reduced motion enabled"
          : paused
            ? "Resume motion"
            : "Pause motion"
      }
    >
      {paused || osReduced ? <Play size={15} /> : <Pause size={15} />}
    </button>
  );
}
