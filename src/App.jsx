import { Link, useNavigate } from "react-router-dom";
import { useMotion } from "./MotionContext";
import React, {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  CaretDown,
  Check,
  CheckCircle,
  XCircle,
  Question,
  LockKey,
  FileText,
  Quotes,
  Clock,
  UserCircle,
  UsersThree,
  Files,
  Queue,
  Funnel,
  GitDiff,
  Pause,
  Play,
  List,
  X,
  SkipForward,
  ArrowCounterClockwise,
  WarningCircle,
  ShieldCheck,
  Translate,
  EnvelopeSimple,
  Info,
} from "@phosphor-icons/react";
import { modules, cases, sources, faqs } from "./data";
import deskArt from "./art/module-trial-desk.svg?raw";
import reviewArt from "./art/module-trial-review.svg?raw";
import proofArt from "./art/module-trial-proof.svg?raw";
import signalArt from "./art/module-trial-signal.svg?raw";
import reportArt from "./art/module-trial-report.svg?raw";
import "./styles.css";
import "./scrolly.css";
import MotionField from "./MotionField";
import useMotionDirector from "./MotionDirector";
const ParticleWave = lazy(() =>
  import("@/components/ui/particle-wave").then((m) => ({
    default: m.ParticleWave,
  })),
);
const RoleVideo = lazy(() => import("./RoleVideos"));
gsap.registerPlugin(ScrollTrigger);
const asset = (p) => "/assets/" + p;
const moduleIcons = [Files, Quotes, Queue, LockKey, Funnel];
const moduleArts = [deskArt, reviewArt, proofArt, signalArt, reportArt];
const steps = [
  {
    title: "One amendment. A different question.",
    text: "A fictional oncology protocol changes a lab threshold. Compare what changed before reviewing the affected records.",
    label: "The protocol changes",
  },
  {
    title: "Every criterion. Its source in view.",
    text: "The same rule meets three different evidence states. Source dates and uncertainty stay attached to the pre-screen.",
    label: "The evidence stays attached",
  },
  {
    title: "A person owns the next step.",
    text: "The coordinator verifies the source, resolves exceptions or abstains. No record is automatically excluded or enrolled.",
    label: "The coordinator reviews",
  },
];
function Button({
  children,
  href,
  secondary = false,
  onClick,
  icon: Icon = ArrowRight,
  className = "",
  ...rest
}) {
  const C = href ? "a" : "button";
  return (
    <C
      className={`button ${secondary ? "secondary" : ""} ${className}`}
      href={href}
      onClick={onClick}
      {...rest}
    >
      <span>{children}</span>
      {Icon && <Icon size={18} />}
    </C>
  );
}
function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>;
}
function SectionLabel({ num, children }) {
  return (
    <div className="section-label">
      <span>{num}</span>
      <i />
      <span>{children}</span>
    </div>
  );
}
function DemoBadge({ compact = false }) {
  return (
    <span className={"demo-badge " + (compact ? "compact" : "")}>
      CONCEPT PREVIEW <b>·</b> DEMO — SYNTHETIC DATA
    </span>
  );
}
function Status({ tone, children }) {
  const I =
    tone === "met" ? CheckCircle : tone === "unknown" ? Question : XCircle;
  return (
    <span className={"status " + tone}>
      <I size={15} />
      {children}
    </span>
  );
}
function AnimatedDiagram({ index, still }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (still) return;
    const paths = ref.current.querySelectorAll("path");
    let io;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2, paused: true });
      paths.forEach((p, i) => {
        const length = p.getTotalLength();
        tl.fromTo(
          p,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 1.7, ease: "power2.inOut" },
          i * 0.18,
        );
      });
      if (index === 4)
        tl.fromTo(
          [...ref.current.querySelectorAll("svg>rect")].slice(1),
          { opacity: 0.65 },
          { opacity: 1, duration: 1.2, stagger: 0.12 },
          0,
        );
      const active = () => {
        const b = ref.current.getBoundingClientRect();
        b.bottom > 0 && b.top < innerHeight && !document.hidden
          ? tl.play()
          : tl.pause();
      };
      io = new IntersectionObserver(active);
      io.observe(ref.current);
      document.addEventListener("visibilitychange", active);
      ref.current._cleanup = () =>
        document.removeEventListener("visibilitychange", active);
    }, ref);
    return () => {
      io?.disconnect();
      ref.current?._cleanup?.();
      ctx.revert();
    };
  }, [index, still]);
  return (
    <div
      ref={ref}
      className="module-diagram"
      role="img"
      aria-label={
        modules[index].offer + " — animated synthetic concept illustration"
      }
      dangerouslySetInnerHTML={{ __html: moduleArts[index] }}
    />
  );
}
function Dialog({ dialogRef, children, label, className = "" }) {
  return (
    <dialog
      ref={dialogRef}
      className={"modal " + className}
      aria-label={label}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <button
        className="icon-button close-modal"
        onClick={() => dialogRef.current.close()}
        aria-label={"Close " + label}
      >
        <X size={23} />
      </button>
      {children}
    </dialog>
  );
}
export function App({ onReplayIntro }) {
  const navigate = useNavigate();
  const { paused, setPaused, osReduced } = useMotion();
  const root = useRef(null),
    mobile = useRef(null),
    pilot = useRef(null),
    signin = useRef(null),
    privacy = useRef(null),
    protocolStage = useRef(null),
    menuButton = useRef(null),
    pauseScroll = useRef(null);
  const [menu, setMenu] = useState(null),
    [geometry, setGeometry] = useState(0),
    [phase, setPhase] = useState(0),
    [caseIndex, setCaseIndex] = useState(1),
    [verified, setVerified] = useState({}),
    [moduleIndex, setModuleIndex] = useState(0),
    [roleIndex, setRoleIndex] = useState(0),
    [formComplete, setFormComplete] = useState(false),
    [form, setForm] = useState({
      email: "",
      organization: "",
      role: "",
      region: "",
      fit: "",
      consent: false,
    });
  const still = paused || osReduced,
    c = cases[caseIndex],
    currentModule = modules[moduleIndex],
    MIcon = moduleIcons[moduleIndex];
  useEffect(() => {
    let live = true;
    document.fonts.ready.then(() => {
      if (live) setGeometry(1);
    });
    return () => {
      live = false;
    };
  }, []);
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = still ? "off" : "on";
  }, [still]);
  useEffect(() => {
    const list = document.querySelector(".module-tabs"),
      tab = document.getElementById("module-" + moduleIndex);
    if (list && tab && list.scrollWidth > list.clientWidth) {
      const left =
        tab.getBoundingClientRect().left -
        list.getBoundingClientRect().left +
        list.scrollLeft -
        12;
      list.scrollTo({ left, behavior: still ? "auto" : "smooth" });
    }
  }, [moduleIndex, geometry, still]);
  useEffect(() => {
    const list = document.querySelector(".role-tabs"),
      tab = document.getElementById("role-" + roleIndex);
    if (list && tab && list.scrollWidth > list.clientWidth)
      list.scrollTo({
        left: tab.offsetLeft - list.offsetLeft,
        behavior: still ? "auto" : "smooth",
      });
  }, [roleIndex, still]);
  useEffect(() => {
    const outside = (e) => {
      if (!e.target.closest(".nav-cluster")) setMenu(null);
    };
    const key = (e) => {
      if (e.key === "Escape" && menu) {
        setMenu(null);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", key);
    };
  }, [menu]);
  useMotionDirector({
    root,
    still,
    geometry,
    setPhase,
    setModuleIndex,
    setRoleIndex,
    pauseScroll,
  });
  function toggleMotion() {
    const visibleScene = () =>
      [...document.querySelectorAll("main>section,.light-run>section")].find(
        (el) => {
          const r = el.getBoundingClientRect();
          return r.top < innerHeight * 0.5 && r.bottom > innerHeight * 0.5;
        },
      );
    if (!still) {
      const pin = ScrollTrigger.getAll().find((s) => s.pin && s.isActive);
      const node = pin?.trigger || visibleScene();
      if (node)
        pauseScroll.current = {
          node,
          top: node.getBoundingClientRect().top,
          id: pin?.vars.id,
          progress: pin?.progress,
          restored: false,
        };
    } else {
      const saved = pauseScroll.current,
        r = saved?.node.getBoundingClientRect();
      if (!saved || r.bottom < 0 || r.top > innerHeight) {
        const node = visibleScene();
        if (node)
          pauseScroll.current = {
            node,
            top: node.getBoundingClientRect().top,
            restored: true,
          };
      }
    }
    setPaused(!paused);
  }
  function seekChapter(id, n, count) {
    const chapter = ScrollTrigger.getById(id);
    if (!chapter) return;
    const fraction = (n + 0.45) / count;
    chapter.animation?.progress(fraction);
    window.scrollTo({
      top: chapter.start + (chapter.end - chapter.start) * fraction,
      behavior: "instant",
    });
    ScrollTrigger.update();
    chapter.getTween()?.progress(1);
  }
  function seekStory(n) {
    setPhase(n);
    seekChapter("protocol-story-pin", n, 3);
  }
  function skipPortal() {
    const pin = ScrollTrigger.getById("review-portal-pin");
    if (pin)
      window.scrollTo({
        top: pin.end - 5,
        behavior: "instant",
      });
  }
  function selectModule(n) {
    setModuleIndex(n);
    seekChapter("module-story-pin", n, 5);
  }
  function selectRole(n) {
    setRoleIndex(n);
    seekChapter("audience-story-pin", n, 3);
  }
  function open(ref) {
    if (ref === pilot) navigate("/request-pilot");
    else if (ref === signin) navigate("/sign-in");
    else if (ref === privacy) navigate("/legal/privacy");
  }
  function closeAndGo() {
    setMenu(null);
    mobile.current?.close();
  }
  function tabKeys(e, index, count, setter, prefix) {
    let next;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      next = (index + 1) % count;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (index + count - 1) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    else return;
    e.preventDefault();
    setter(next);
    document.getElementById(prefix + next)?.focus();
  }
  function updateForm(e) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  }
  function submit(e) {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      f.reportValidity();
      return;
    }
    setFormComplete(true);
  }
  function closePilot() {
    pilot.current.close();
    setForm({
      email: "",
      organization: "",
      role: "",
      region: "",
      fit: "",
      consent: false,
    });
    setFormComplete(false);
  }
  const navLinks = [
    ["Platform", "#protocol-story"],
    ["Solutions", "#teams"],
    ["Resources", "#evidence"],
    ["Company", "#about"],
    ["Pilot & pricing", "#pilot-pricing"],
  ];
  const roles = [
    {
      name: "Trial-office directors",
      title: "A bounded way to test the workflow.",
      text: "Start with one protocol, an observed screening baseline and a named research-office sponsor. Evaluate the operational fit before expanding scope.",
      list: [
        "Own the pilot scope and budget",
        "Identify the data governance route",
        "Agree on endpoints and stop rules",
      ],
    },
    {
      name: "Coordinators & site teams",
      title: "The source beside every next step.",
      text: "Compare protocol versions, review the evidence and keep exceptions visible. Your decision is attributed; uncertainty stays explicit.",
      list: [
        "Inspect a criterion and its source",
        "Resolve or abstain on exceptions",
        "Keep all outreach behind approval",
      ],
    },
    {
      name: "Networks & feasibility teams",
      title: "Learn locally. Expand with permission.",
      text: "Disease-specific networks, research informatics programs and CRO feasibility teams are the first validation audience. Network expansion is a later hypothesis.",
      list: [
        "Test site-level workflow fit first",
        "Separate site and sponsor incentives",
        "Retain consent and conflict controls",
      ],
    },
  ];
  return (
    <div ref={root} className="app">
      <MotionField still={still} moduleIndex={moduleIndex} />
      <main id="main" tabIndex={-1}>
        <section className="hero" id="top">
          <div className="hero-wave" aria-hidden="true">
            <Suspense fallback={null}>
              <ParticleWave paused={still} color="#B9BEB5" />
            </Suspense>
          </div>
          <div className="wrap">
            <div className="hero-editorial">
              <div className="hero-heading">
                <Eyebrow>Clinical trial operations / concept preview</Eyebrow>
                <h1>
                  <span className="headline-line">Every criterion.</span>
                  <span className="headline-line hero-emphasis">
                    In context.
                  </span>
                </h1>
                <p className="hero-thesis">
                  Give trial coordinators a cited pre-screen, not an automated
                  eligibility decision.
                </p>
                <div className="hero-actions">
                  <Button onClick={() => open(pilot)}>
                    Request a scoped pilot
                  </Button>
                  <a className="text-link" href="#protocol-story">
                    Explore the demo <ArrowRight size={18} />
                  </a>
                </div>
                <div className="hero-inline-note">
                  <span />
                  Built around the coordinator’s next step.
                </div>
              </div>
              <div
                className="hero-visual"
                aria-label="TrialQueue Review Turn: a source trail with a human checkpoint"
                role="img"
              >
                <div className="visual-coordinate coordinate-top">
                  <span>01 / THE REVIEW TURN</span>
                  <span>TRIALQUEUE</span>
                </div>
                <div className="review-object" aria-hidden="true">
                  {Array.from({ length: 14 }, (_, i) => (
                    <img
                      key={i}
                      className={
                        "review-plane" + (i === 13 ? " review-plane-front" : "")
                      }
                      src={asset(
                        i === 13
                          ? "logos/trialqueue-mark-reverse.svg"
                          : "logos/trialqueue-mark-mono-light.svg",
                      )}
                      alt=""
                      style={{ "--layer": i }}
                    />
                  ))}
                </div>
                <div className="sculpture-caption">
                  <span className="caption-rule" />
                  <span>
                    Source → context →<br />
                    <strong>human judgment.</strong>
                  </span>
                </div>
                <div className="visual-coordinate coordinate-bottom">
                  <span>PROVENANCE IN VIEW</span>
                  <span>DECISION WITH YOUR TEAM</span>
                </div>
              </div>
            </div>
            <div className="hero-source-note">
              <span className="live-source">
                <i />A protocol. Its evidence. Your next step.
              </span>
              <DemoBadge />
            </div>
            <div className="hero-caption">
              <span>
                <Info size={14} /> Synthetic example only. Not clinical
                guidance.
              </span>
              <button
                className="intro-replay"
                onClick={onReplayIntro}
                disabled={still}
                title={
                  still
                    ? "Intro follows reduced-motion preference"
                    : "Replay the introductory film"
                }
              >
                <Play size={12} /> Watch intro
              </button>
              <a href="#workflow" aria-label="Scroll to the workflow">
                FOLLOW THE REVIEW <ArrowDown size={14} />
              </a>
            </div>
          </div>
        </section>
        <section className="offer-index wrap" id="workflow">
          <div className="offer-index-heading">
            <Eyebrow>
              One workflow.
              <br />
              Five proposed modules.
            </Eyebrow>
            <a href="#products" className="text-link">
              Meet the modules <ArrowRight size={17} />
            </a>
          </div>
          <div className="offer-index-items">
            {modules.map((m, i) => {
              const I = moduleIcons[i];
              return (
                <a
                  key={m.name}
                  href="#products"
                  data-module-index={i}
                  onClick={() => selectModule(i)}
                >
                  <span className="mono">0{i + 1}</span>
                  <I size={23} />
                  <strong>{m.name}</strong>
                  <small>
                    {
                      [
                        "Normalize",
                        "Cite",
                        "Review",
                        "Permission",
                        "Understand",
                      ][i]
                    }
                  </small>
                </a>
              );
            })}
          </div>
        </section>
        <section
          className="signal-scene"
          id="source-story"
          aria-label="From scattered sources to coordinator review"
        >
          <div className="signal-stage">
            <div className="scene-topline wrap">
              <Eyebrow>A dated trail. A named owner.</Eyebrow>
              <a href="#protocol-story" className="text-link">
                Skip the scene <SkipForward size={15} />
              </a>
            </div>
            <div className="signal-copy">
              <h2>
                <span>From scattered sources.</span>
                <span className="signal-pivot" />
                <span>To a cited review.</span>
              </h2>
              <p>Keep the evidence together. Keep the judgment human.</p>
            </div>
            <div className="signal-triad">
              <span>Protocol</span>
              <span>Evidence</span>
              <span>Reviewer</span>
            </div>
            <div className="signal-explainer">
              <h2>
                Every source. <br />A human next step.
              </h2>
              <p>
                A traceable connection between what changed, <br />
                what supports it and who reviews it next.
              </p>
            </div>
            <div className="scene-footline wrap">
              <span>ILLUSTRATIVE SOURCE CONTEXT · NO PATIENT DATA</span>
              <span>
                SCROLL TO ALIGN <ArrowDown size={13} />
              </span>
            </div>
          </div>
        </section>
        <section className="story-section" id="protocol-story">
          <div className="wrap">
            <SectionLabel num="01 / 04">
              A protocol changes. The work begins again.
            </SectionLabel>
            <div className="section-heading">
              <h2 data-reveal>
                One change.
                <br />
                Three different next steps.
              </h2>
              <div>
                <p>
                  Screening is already a careful, human process. An amendment
                  can mean repeating the chart review—while dates, sources and
                  unresolved questions scatter across the workflow.
                </p>
                <p className="muted">
                  TrialQueue proposes a cited review layer: show what changed,
                  what supports it and who owns the next step.
                </p>
              </div>
            </div>
            <div className="story-controls">
              <DemoBadge />
              <a href="#review-boundary" className="text-link">
                Skip scroll story <SkipForward size={16} />
              </a>
            </div>
            <div
              className={"protocol-stage phase-" + phase}
              ref={protocolStage}
            >
              <div className="compact-story-progress">
                <span>0{phase + 1} / 03</span>
                {steps[phase].label}
              </div>
              <div className="story-aside">
                <span className="step-number" aria-hidden="true">
                  0{phase + 1}
                  <small>/ 03</small>
                </span>
                <h3>{steps[phase].title}</h3>
                <p>{steps[phase].text}</p>
                <div
                  className="story-steps"
                  role="tablist"
                  aria-label="Protocol story chapters"
                  aria-orientation="vertical"
                >
                  {steps.map((s, i) => (
                    <button
                      key={s.label}
                      id={"step-" + i}
                      role="tab"
                      aria-selected={phase === i}
                      aria-controls="protocol-visual"
                      tabIndex={phase === i ? 0 : -1}
                      onClick={() => seekStory(i)}
                      onKeyDown={(e) => tabKeys(e, i, 3, seekStory, "step-")}
                    >
                      <span>0{i + 1}</span>
                      {s.label}
                      <ArrowRight size={15} />
                    </button>
                  ))}
                </div>
                <small className="caption">
                  Fictional oncology protocol
                  <br />
                  TQ-DEMO-ONC-01 · invented rule
                </small>
              </div>
              <div
                className="protocol-visual"
                role="tabpanel"
                id="protocol-visual"
                aria-labelledby={"step-" + phase}
                tabIndex={0}
              >
                <div className="workbench-top">
                  <span>
                    <img
                      src={asset("logos/trialqueue-mark-reverse.svg")}
                      alt=""
                    />
                    Review workbench
                  </span>
                  <span className="mono workbench-demo">
                    DEMO — SYNTHETIC DATA
                  </span>
                </div>
                <div className="workbench-command" aria-hidden="true">
                  <span>PROTOCOL UPDATE</span>
                  <code className="typed-source">
                    v2 · §4.1 · source provided
                  </code>
                  <i />
                </div>
                <div className="version-row">
                  <div className="version-old">
                    <span>
                      Protocol v1 <small>01 OCT 2026</small>
                    </span>
                    <p>
                      ANC ≥ <strong>1.0</strong> <small>×10⁹/L</small>
                    </p>
                  </div>
                  <GitDiff className="diff-icon" size={24} />
                  <div className="version-new">
                    <span>
                      Protocol v2 <small>15 OCT 2026</small>
                    </span>
                    <p>
                      ANC ≥ <strong>1.5</strong> <small>×10⁹/L</small>
                    </p>
                    <i className="protocol-change-bar" />
                  </div>
                  <a
                    href="#source-detail"
                    className="source-reference"
                    onClick={() => setPhase(1)}
                  >
                    <Quotes size={18} />
                    <span>
                      Fictional protocol
                      <br />
                      <strong>§4.1 · source linked</strong>
                    </span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
                <div className="queue-top">
                  <span>
                    Candidate review queue <small>3 ILLUSTRATIVE RECORDS</small>
                  </span>
                  <span>CRITERION STATUS ≠ ELIGIBILITY</span>
                </div>
                <div
                  className="candidate-queue"
                  role="group"
                  aria-label="Choose a synthetic case"
                >
                  {cases.map((item, i) => (
                    <button
                      key={item.id}
                      className={
                        "candidate-row " + (caseIndex === i ? "selected" : "")
                      }
                      onClick={() => setCaseIndex(i)}
                      aria-pressed={caseIndex === i}
                    >
                      <span>
                        <strong>{item.id}</strong>
                        <small>{item.owner}</small>
                      </span>
                      <span className="lab-cell">
                        {item.value} <small>×10⁹/L</small>
                      </span>
                      <span className="date-cell">
                        {item.date}
                        <small>{item.source}</small>
                      </span>
                      <Status tone={item.tone}>{item.state}</Status>
                      <ArrowUpRight size={17} />
                    </button>
                  ))}
                </div>
                <div className="evidence-pane" id="source-detail">
                  <div className="evidence-title">
                    <Quotes size={18} />
                    <span>
                      Cited evidence{" "}
                      <small>
                        {c.source} · {c.date}
                      </small>
                    </span>
                    <span className="mono">§4.1 / ANC</span>
                  </div>
                  <p>{c.summary}</p>
                  <div className="exception">
                    <WarningCircle size={16} />
                    <span>{c.exception}</span>
                  </div>
                </div>
                <div className="review-controls">
                  <span>
                    <UserCircle size={18} />
                    <span>
                      {c.owner}
                      <small>16 OCT 2026 · {c.time}</small>
                    </span>
                  </span>
                  <button
                    onClick={() =>
                      setVerified({ ...verified, [c.id]: !verified[c.id] })
                    }
                    className={
                      "review-button " + (verified[c.id] ? "verified" : "")
                    }
                  >
                    {verified[c.id] ? (
                      <ArrowCounterClockwise size={16} />
                    ) : (
                      <Check size={16} />
                    )}
                    <span>
                      {verified[c.id]
                        ? "Undo preview decision"
                        : "Preview source verification"}
                    </span>
                  </button>
                </div>
                <div className="review-feedback" aria-live="polite">
                  {verified[c.id]
                    ? "Simulated source verification recorded. Further review required; outreach stays locked."
                    : c.next}
                </div>
              </div>
            </div>
            <div className="story-bottom">
              <span>
                <LockKey size={15} /> No automatic exclusion. No eligibility or
                enrollment decision.
              </span>
              <span>All values and records are invented.</span>
            </div>
          </div>
        </section>
        <div className="light-run">
          <div className="light-wave" aria-hidden="true">
            <Suspense fallback={null}>
              <ParticleWave paused={still} color="#637B68" />
            </Suspense>
          </div>
          <div className="light-atmosphere" aria-hidden="true" />
          <section className="boundary wrap" id="review-boundary">
            <div className="boundary-art" aria-hidden="true">
              <img
                className="boundary-orbit-art"
                src={asset("diagrams/source-orbit-lines.svg")}
                alt=""
              />
              <svg viewBox="0 0 1280 170">
                <path
                  className="boundary-connector"
                  d="M130 0 V45 Q130 85 210 85 H890 Q950 85 950 170"
                />
              </svg>
            </div>
            <SectionLabel num="02 / 04">
              A clear place for human judgment
            </SectionLabel>
            <div className="boundary-layout">
              <div>
                <h2 data-reveal>
                  The next step
                  <br />
                  stays with <br />
                  your team.
                </h2>
                <p>
                  A clear summary can support review. It can’t supply
                  permission. The coordinator decides what needs checking, and
                  the site governs what happens next.
                </p>
                <div className="boundary-points">
                  <span>
                    <UserCircle size={18} /> Named reviewer
                  </span>
                  <span>
                    <Quotes size={18} /> Source-linked decision
                  </span>
                  <span>
                    <LockKey size={18} /> Permission before action
                  </span>
                </div>
              </div>
              <div className="draft-window">
                <div className="window-title">
                  <span>
                    <LockKey size={17} /> Outreach preview
                  </span>
                  <DemoBadge compact />
                </div>
                <div className="permission-bar">
                  <LockKey size={17} />
                  <strong>Recontact permission not verified</strong>
                  <span>UNSENT</span>
                </div>
                <div className="draft-body">
                  <Eyebrow>Educational draft / illustrative</Eyebrow>
                  <h4>
                    Prepared for a review.
                    <br />
                    Paused at permission.
                  </h4>
                  <p>
                    This synthetic draft cannot be sent. A future workflow would
                    require site-approved content, an appropriate language
                    review and a verified permission route.
                  </p>
                  <div className="draft-evidence">
                    <FileText size={19} />
                    <span>
                      Fictional protocol v2 · §4.1
                      <small>Source date · 15 Oct 2026</small>
                    </span>
                    <CheckCircle size={17} />
                  </div>
                  <div className="draft-evidence">
                    <UserCircle size={19} />
                    <span>
                      Coordinator A<small>Review owner · 16 Oct 2026</small>
                    </span>
                    <Clock size={17} />
                  </div>
                </div>
                <div className="draft-gates">
                  <span>
                    <Translate size={16} /> Language review pending
                  </span>
                  <span>
                    <LockKey size={16} /> Site capacity unconfirmed
                  </span>
                </div>
                <button className="button locked" disabled>
                  <LockKey size={17} />
                  Outreach locked
                </button>
                <p className="draft-footnote">
                  Nothing is sent. No patient contact in this demo.
                </p>
              </div>
            </div>
          </section>
          <section className="products-section wrap" id="products">
            <SectionLabel num="03 / 04">The proposed platform</SectionLabel>
            <div className="section-heading">
              <h2 data-reveal>
                Five parts.
                <br />
                One traceable workflow.
              </h2>
              <p>
                Five separate product directions, built around the work a trial
                team already does. The first pilot would test one module, one
                protocol and one governed workflow.
              </p>
            </div>
            <div className="module-layout">
              <div className="module-scene-controls">
                <span>SCROLL OR SELECT · 0{moduleIndex + 1} / 05</span>
                <a href="#teams">
                  Skip to your team <SkipForward size={14} />
                </a>
              </div>
              <div
                className="module-tabs"
                role="tablist"
                aria-label="Proposed modules"
                aria-orientation="horizontal"
              >
                {modules.map((m, i) => {
                  const I = moduleIcons[i];
                  return (
                    <button
                      key={m.name}
                      role="tab"
                      id={"module-" + i}
                      aria-selected={moduleIndex === i}
                      aria-controls="module-panel"
                      tabIndex={moduleIndex === i ? 0 : -1}
                      onClick={() => selectModule(i)}
                      onKeyDown={(e) =>
                        tabKeys(e, i, 5, selectModule, "module-")
                      }
                    >
                      <span className="mono">0{i + 1}</span>
                      <I size={23} />
                      <span>
                        <strong>{m.name}</strong>
                        <small>{m.offer}</small>
                      </span>
                      <ArrowUpRight size={19} />
                    </button>
                  );
                })}
              </div>
              <div
                className="module-panel"
                role="tabpanel"
                id="module-panel"
                aria-labelledby={"module-" + moduleIndex}
                tabIndex={0}
                key={moduleIndex}
              >
                <div className="module-copy">
                  <div className="module-panel-heading">
                    <MIcon size={23} />
                    <Eyebrow>Proposed module / 0{moduleIndex + 1}</Eyebrow>
                  </div>
                  <h3>{currentModule.short}</h3>
                  <p className="mobile-module-offer">{currentModule.offer}</p>
                  <p>{currentModule.text}</p>
                  <Link
                    className="home-product-link"
                    to={
                      "/products/" +
                      currentModule.name.toLowerCase().replaceAll(" ", "-")
                    }
                  >
                    Explore {currentModule.name} <ArrowUpRight size={16} />
                  </Link>
                </div>
                <div className="module-art-stage">
                  <AnimatedDiagram index={moduleIndex} still={still} />
                  {moduleIndex === 4 && (
                    <p className="diagram-note">
                      Separate illustrative 9-case analysis; the workbench above
                      opens three examples.
                    </p>
                  )}
                  <div className="module-detail">
                    <span>{currentModule.detail}</span>
                    <DemoBadge compact />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="teams-section wrap" id="teams">
            <div className="teams-intro">
              <Eyebrow>Built around the people doing the work</Eyebrow>
              <h2 data-reveal>
                Different responsibilities.
                <br />A shared review trail.
              </h2>
            </div>
            <div className="audience-stage">
              <div className="audience-scene-controls">
                <span>SCROLL OR SELECT · 0{roleIndex + 1} / 03</span>
                <a href="#evidence">
                  Skip audience story <SkipForward size={14} />
                </a>
              </div>
              <div
                className="role-tabs"
                role="tablist"
                aria-label="Your team’s role"
              >
                {roles.map((r, i) => (
                  <button
                    role="tab"
                    key={r.name}
                    id={"role-" + i}
                    aria-selected={roleIndex === i}
                    aria-controls="role-panel"
                    tabIndex={roleIndex === i ? 0 : -1}
                    onClick={() => selectRole(i)}
                    onKeyDown={(e) => tabKeys(e, i, 3, selectRole, "role-")}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
              <div
                className="role-content"
                id="role-panel"
                role="tabpanel"
                aria-labelledby={"role-" + roleIndex}
                tabIndex={0}
              >
                <Suspense
                  fallback={
                    <div className="audience-video-placeholder">
                      Loading concept preview…
                    </div>
                  }
                >
                  <RoleVideo index={roleIndex} still={still} />
                </Suspense>
                <div key={roleIndex} className="role-copy">
                  <h3>{roles[roleIndex].title}</h3>
                  <p>{roles[roleIndex].text}</p>
                  <ul>
                    {roles[roleIndex].list.map((t) => (
                      <li key={t}>
                        <Check size={17} />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={
                      roleIndex === 2
                        ? "/solutions/site-networks"
                        : "/solutions/academic-centers"
                    }
                    className="text-link"
                  >
                    Explore this team’s workflow <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="evidence-section wrap" id="evidence">
          <SectionLabel num="04 / 04">
            The evidence, and its limits
          </SectionLabel>
          <div className="section-heading">
            <h2 data-reveal>
              A useful concept
              <br />
              has to earn its place.
            </h2>
            <p>
              Teams already screen charts, use EHR registries and work through
              referral networks. TrialQueue must prove an operational gain
              within that reality.
            </p>
          </div>
          <div className="alternatives">
            <div className="alternatives-title">
              <span>THE EXISTING LANDSCAPE</span>
              <span>THE QUESTION TO TEST</span>
            </div>
            {[
              [
                "Coordinator screening · EHR registries · referrals",
                "Can a cited queue make a protocol amendment easier to review?",
              ],
              [
                "ClinicalTrials.gov search · sponsor databases",
                "Can public study criteria be normalized to an approved local protocol?",
              ],
              [
                "Antidote · site-side recruitment tools",
                "Where would a coordinator-led evidence workflow add value?",
              ],
            ].map(([a, b]) => (
              <div key={a}>
                <span>{a}</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
          <div className="evidence-levels">
            <div>
              <span className="evidence-level high">HIGH</span>
              <h4>Public registry availability</h4>
              <p>
                Public study records are accessible. They do not contain patient
                charts or establish site capacity.
              </p>
            </div>
            <div>
              <span className="evidence-level medium">MEDIUM</span>
              <h4>An adjacent commercial category</h4>
              <p>
                Recruitment and discovery tools exist. A distinct buying reason
                for this workflow remains a hypothesis.
              </p>
            </div>
            <div>
              <span className="evidence-level low">LOW / UNVALIDATED</span>
              <h4>TrialQueue access & matching</h4>
              <p>
                No local data access, validated matching, demand or operational
                impact is established.
              </p>
            </div>
          </div>
          <details className="source-library">
            <summary>
              <span>
                <Quotes size={20} />
                Read the source notes
              </span>
              <span>
                OFFICIAL & VENDOR SOURCES <CaretDown size={17} />
              </span>
            </summary>
            <div>
              {sources.map((s) => (
                <a key={s.title} href={s.url} target="_blank" rel="noreferrer">
                  <span className="mono">{s.by}</span>
                  <h4>
                    {s.title}
                    <ArrowUpRight size={17} />
                  </h4>
                  <p>{s.note}</p>
                </a>
              ))}
              <p className="vendor-note">
                Adjacent references:{" "}
                <a
                  href="https://www.antidote.me/sponsors"
                  target="_blank"
                  rel="noreferrer"
                >
                  Antidote
                </a>{" "}
                ·{" "}
                <a
                  href="https://www.tempus.com/news/pr/tempus-announces-acquisition-of-deep-6-ai/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tempus / Deep 6 AI
                </a>
                . References do not imply affiliation or endorsement.
              </p>
            </div>
          </details>
          <div className="governance-note" id="governance">
            <ShieldCheck size={25} />
            <div>
              <h4>Governance is part of the first conversation.</h4>
              <p>
                IRB review, authorization or waiver, EHR extraction,
                investigator judgment, representative recruitment and capacity
                all need a named owner. No compliance or integration claim is
                made.
              </p>
            </div>
          </div>
        </section>
        <section className="pilot-section" id="pilot-pricing">
          <div className="wrap">
            <div className="pilot-heading">
              <Eyebrow>A pilot hypothesis / not a current offer</Eyebrow>
              <h2 data-reveal>
                Start small enough
                <br />
                to learn something real.
              </h2>
              <p>
                One site. One protocol. One governed retrospective exercise.
                <br />
                Agree on the scope before a live product is built.
              </p>
            </div>
            <div className="pilot-grid">
              <div className="pilot-gates">
                <h3>What needs to be true first</h3>
                <p className="caption">
                  Readiness targets · all pending validation
                </p>
                {[
                  ["08", "Site, coordinator & PI interviews"],
                  ["01", "Governed retrospective design"],
                  ["01", "Named site sponsor"],
                  ["✓", "Written conditional paid scope"],
                ].map(([n, t], i) => (
                  <div key={t}>
                    <span className="gate-number">
                      {i === 3 ? <FileText size={23} /> : n}
                    </span>
                    <span>{t}</span>
                    <small>PENDING</small>
                  </div>
                ))}
                <p className="gate-foot">
                  Plus signed data-access/security and human oversight
                  approvals. No patient contact before approval.
                </p>
              </div>
              <div className="price-panel">
                <Eyebrow>Hypothetical test price</Eyebrow>
                <div className="price">
                  $1,500<span>/ active protocol / month</span>
                </div>
                <p className="onboarding">+ $5,000 site onboarding</p>
                <div className="price-rule" />
                <p>
                  A willingness-to-pay hypothesis to test with the trial office
                  or sponsor. This is not an active price, checkout or claim of
                  accepted demand.
                </p>
                <Button onClick={() => open(pilot)}>
                  Request a scoped pilot
                </Button>
                <small>
                  No payment. No clinical records. A bounded conversation.
                </small>
              </div>
            </div>
            <details className="validation-detail">
              <summary>
                <span>How the exercise would be measured</span>
                <CaretDown size={19} />
              </summary>
              <div className="validation-columns">
                <div>
                  <Eyebrow>Primary endpoint</Eyebrow>
                  <h4>Eligible-for-review recall</h4>
                  <p>
                    Coordinator-verified recall against adjudicated
                    retrospective manual screening. Track precision, denominator
                    and baseline window.
                  </p>
                </div>
                <div>
                  <Eyebrow>Guardrails</Eyebrow>
                  <h4>Review quality before expansion</h4>
                  <p>
                    False exclusions, coordinator time per reviewed chart and
                    consent breaches. Clicks, demonstrations and inquiries alone
                    are not validation.
                  </p>
                </div>
                <div>
                  <Eyebrow>Explicit stop rule</Eyebrow>
                  <h4>Stop or reposition</h4>
                  <p>
                    If governed chart access, PI sponsorship or budget are
                    absent—or false exclusions make pre-screening unsafe.
                  </p>
                </div>
              </div>
            </details>
          </div>
        </section>
        <section className="faq-section wrap" id="questions">
          <div>
            <Eyebrow>Before the first conversation</Eyebrow>
            <h2>
              Clear answers.
              <br />
              Visible boundaries.
            </h2>
            <p className="muted">
              A research-stage product should be clear about what is known,
              proposed and still to be tested.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>
                    <CaretDown size={19} />
                  </span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="closing-section" id="about">
          <div className="closing-wash" aria-hidden="true" />
          <button className="portal-skip text-link" onClick={skipPortal}>
            Skip to the pilot conversation <SkipForward size={16} />
          </button>
          <div className="portal-copy">
            <Eyebrow>The human checkpoint</Eyebrow>
            <h2>
              A clear place
              <br />
              to keep judgment human.
            </h2>
            <p>
              Evidence can move forward.
              <br />
              Permission still needs a person.
            </p>
          </div>
          <div className="wrap closing-content">
            <Eyebrow>Every source. A human next step.</Eyebrow>
            <h2 data-reveal>
              Bring one protocol.
              <br />
              Let’s trace the work.
            </h2>
            <p>
              TrialQueue’s mission is to make the source, exception and owner
              visible in clinical trial review. The first step is a
              coordinator-led exercise with the people responsible for the
              workflow.
            </p>
            <div className="closing-actions">
              <Button onClick={() => open(pilot)}>
                Request a scoped pilot
              </Button>
              <a href="#protocol-story" className="text-link">
                Revisit the synthetic story <ArrowUpRight size={18} />
              </a>
            </div>
            <span className="closing-note">
              FOR TRIAL OFFICES · SITE NETWORKS · RESEARCH OPERATIONS
            </span>
          </div>
          <img
            className="closing-mark"
            src={asset("logos/trialqueue-mark-mono-dark.svg")}
            alt=""
            aria-hidden="true"
          />
        </section>
      </main>
      <button
        className="floating-motion icon-button"
        onClick={toggleMotion}
        aria-label={
          still ? "Motion paused. Toggle motion preference" : "Pause animations"
        }
        aria-pressed={still}
        title={still ? "Motion paused" : "Pause motion"}
      >
        {still ? <Play size={16} /> : <Pause size={16} />}
      </button>
    </div>
  );
}
