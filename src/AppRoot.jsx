import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { App } from "./App";
const SupportPages = lazy(() => import("./SupportPages"));
import { SiteHeader, SiteFooter, MotionControl } from "./SiteShell";
import { MotionProvider, useMotion } from "./MotionContext";
const IntroExperience = lazy(() => import("./IntroExperience"));
class IntroBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onComplete();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
import { productLinks, solutionLinks, guides } from "./site";
function RouteFocus() {
  const location = useLocation(),
    prior = useRef(null);
  useEffect(() => {
    const path = location.pathname;
    const labels = {
      "/": "Cited pre-screen. Human review.",
      "/platform": "Platform",
      "/products": "Five proposed modules",
      "/solutions": "Solutions",
      "/why-trialqueue": "Why TrialQueue",
      "/demo": "Synthetic demo",
      "/evidence": "Evidence & validation",
      "/governance": "Governance",
      "/pilot": "Pilot & hypothesis pricing",
      "/request-pilot": "Request a scoped pilot",
      "/resources": "Resource library",
      "/company": "About",
      "/contact": "Contact",
      "/sign-in": "Workspace access",
      "/legal/privacy": "Preview privacy notice",
      "/legal/terms": "Preview terms",
      ...Object.fromEntries(
        [...productLinks, ...solutionLinks].map((x) => [x.to, x.label]),
      ),
      ...Object.fromEntries(
        guides.map((g) => ["/resources/" + g.slug, g.title]),
      ),
    };
    document.title = (labels[path] || "Page not found") + " — TrialQueue";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "TrialQueue research-stage concept: cited pre-screen evidence, visible uncertainty and coordinator review. Synthetic demonstration only.",
      );
    let frame = 0;
    const changed = prior.current !== path;
    prior.current = path;
    if (changed && !location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.querySelector("#main")?.focus({ preventScroll: true });
    } else if (location.hash && path !== "/") {
      frame = requestAnimationFrame(() =>
        document
          .getElementById(decodeURIComponent(location.hash.slice(1)))
          ?.scrollIntoView({ behavior: "instant" }),
      );
    }
    return () => cancelAnimationFrame(frame);
  }, [location]);
  return null;
}
function Site() {
  const { pathname, hash } = useLocation();
  const { still } = useMotion();
  const [phase, setPhase] = useState(() =>
    pathname === "/" &&
    (!hash || hash === "#top") &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "loading"
      : "complete",
  );
  const [run, setRun] = useState(0);
  const active = phase === "loading" || phase === "playing";
  const finish = useCallback(
    () => setPhase((p) => (p === "complete" ? p : "revealing")),
    [],
  );
  const ready = useCallback(
    () => setPhase((p) => (p === "loading" ? "playing" : p)),
    [],
  );
  const replay = useCallback(() => {
    if (still) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    setRun((n) => n + 1);
    setPhase("loading");
  }, [still]);
  useLayoutEffect(() => {
    document.documentElement.dataset.intro = phase;
    return () => {
      delete document.documentElement.dataset.intro;
    };
  }, [phase]);
  useEffect(() => {
    if (pathname !== "/" || (hash && hash !== "#top")) setPhase("complete");
  }, [pathname, hash]);
  useEffect(() => {
    if (still) setPhase("complete");
  }, [still]);
  useEffect(() => {
    if (phase === "revealing") {
      const id = setTimeout(() => setPhase("complete"), 1250);
      return () => clearTimeout(id);
    }
    if (phase === "loading") {
      const id = setTimeout(() => setPhase("complete"), 8000);
      return () => clearTimeout(id);
    }
  }, [phase]);
  return (
    <>
      <RouteFocus />
      <div className="site-content" inert={active ? true : undefined}>
        <SiteHeader />
        <Suspense
          fallback={
            <main id="main" className="page page-loading">
              <span className="overline">FOLLOWING THE SOURCE…</span>
            </main>
          }
        >
          <Routes>
            <Route path="/" element={<App onReplayIntro={replay} />} />
            <Route path="*" element={<SupportPages />} />
          </Routes>
        </Suspense>
        <SiteFooter />
        {pathname !== "/" && <MotionControl />}
      </div>
      {phase !== "complete" && pathname === "/" && (
        <IntroBoundary key={run} onComplete={finish}>
          <Suspense
            fallback={
              <div className="intro-loading" role="status">
                <span>LOCAL PROTOCOL / SYNTHETIC PREVIEW</span>
                <button onClick={finish}>Skip intro →</button>
              </div>
            }
          >
            <IntroExperience
              onReady={ready}
              onComplete={finish}
              leaving={phase === "revealing"}
              still={still}
            />
          </Suspense>
        </IntroBoundary>
      )}
    </>
  );
}
export default function AppRoot() {
  return (
    <BrowserRouter>
      <MotionProvider>
        <Site />
      </MotionProvider>
    </BrowserRouter>
  );
}
