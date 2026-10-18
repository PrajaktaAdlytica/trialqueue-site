import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Pause, Play, ArrowRight } from "@phosphor-icons/react";
import { ProtocolSurface } from "./ProtocolSurface";
import { introLandingAt, protocolCameraTransform, INTRO_FRAMES, INTRO_FPS } from "./intro-motion";
const FrozenProtocol = memo(ProtocolSurface);

export default function IntroExperience({onReady, onComplete, leaving, still}: {
  onReady: () => void; onComplete: () => void; leaving: boolean; still: boolean;
}) {
  const host = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const drawFrame = useRef<(() => void) | null>(null);
  const playhead = useRef({seconds: 0});
  const leavingNow = useRef(leaving);
  leavingNow.current = leaving;
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState(() => ({width: innerWidth, height: innerHeight}));

  useEffect(() => {
    let active = true;
    const image = new Image();
    image.src = "/assets/motion/protocol-paper.webp";
    Promise.all([image.decode(), document.fonts.ready]).then(() => {
      if (active) {setReady(true); onReady();}
    }).catch(() => {if (active) onComplete();});
    return () => {active = false;};
  }, [onReady, onComplete]);
  useEffect(() => {
    const resize = () => setSize({width: innerWidth, height: innerHeight});
    window.addEventListener("resize", resize, {passive: true});
    return () => window.removeEventListener("resize", resize);
  }, []);

  // React mounts the paper once. A single GSAP ticker updates compositor properties;
  // there are no Player frame commits or document-wide CSS-variable updates.
  useLayoutEffect(() => {
    // A late image decode must not restart a film the visitor already skipped.
    if (!ready || leavingNow.current || !host.current) return;
    const stage = host.current;
    const paper = stage.querySelector<HTMLElement>("[data-intro-paper]")!;
    const print = stage.querySelector<HTMLElement>("[data-intro-print]")!;
    const vellum = stage.querySelector<HTMLElement>("[data-intro-vellum]")!;
    const underline = stage.querySelector<HTMLElement>("[data-intro-underline]")!;
    const source = stage.querySelector<HTMLElement>("[data-intro-source]")!;
    const controls = stage.querySelector<HTMLElement>(".intro-controls")!;
    const track = stage.querySelector<HTMLElement>(".intro-progress")!;
    const light = stage.querySelector<HTMLElement>(".intro-light-spill")!;
    const header = document.querySelector<HTMLElement>(".site-header");
    const hero = document.querySelector<HTMLElement>(".hero > .wrap");
    const details = [...document.querySelectorAll<HTMLElement>(".hero-source-note,.hero-caption")];
    const shared = [header, hero, ...details].filter((el): el is HTMLElement => !!el);
    const originalStyles = shared.map(el => [el, el.style.cssText] as const);
    const draw = () => {
      const frame = playhead.current.seconds * INTRO_FPS;
      const m = introLandingAt(frame, INTRO_FPS);
      paper.style.transform = protocolCameraTransform(size.width, size.height, frame, INTRO_FPS);
      paper.style.opacity = String(m.paperOpacity);
      print.style.opacity = String(m.print);
      paper.dataset.introScene = frame < 1.7 * INTRO_FPS ? "protocol" : frame < 3.6 * INTRO_FPS ? "source" : frame < 5.7 * INTRO_FPS ? "handoff" : "landing";
      vellum.style.opacity = String(m.vellum * .98);
      vellum.style.transform = `translate3d(${m.vellumTravel * size.width * .12}px,${m.vellumTravel * size.height * .02}px,0) rotate(-1.6deg)`;
      underline.style.transform = `scaleX(${m.underline})`;
      source.style.opacity = String(m.source * .8);
      if (header) {header.style.opacity = String(m.nav);}
      if (hero) {
        hero.style.transform = `translate3d(0,${8 * (1 - m.hero)}px,0)`;
        hero.style.opacity = String(m.hero);
      }
      details.forEach(el => {el.style.opacity = String(m.details);});
      controls.style.opacity = String(m.controls);
      track.style.opacity = String(m.controls);
      light.style.opacity = String(.045 * m.light);
      if (progress.current) progress.current.style.transform = `scaleX(${frame / INTRO_FRAMES})`;
      stage.dataset.frame = String(Math.round(frame));
      stage.dataset.tone = frame > 4.8 * INTRO_FPS ? "dark" : "paper";
    };
    // The underline keeps a fixed layout size and is revealed on the compositor.
    underline.style.width = "100%";
    underline.style.transformOrigin = "left center";
    drawFrame.current = draw;
    draw();
    tween.current = gsap.to(playhead.current, {
      seconds: INTRO_FRAMES / INTRO_FPS,
      duration: Math.max(.01, INTRO_FRAMES / INTRO_FPS - playhead.current.seconds),
      ease: "none", paused: true, onUpdate: draw, onComplete,
    });
    return () => {
      tween.current?.kill();
      tween.current = null;
      drawFrame.current = null;
      originalStyles.forEach(([el, styles]) => {el.style.cssText = styles;});
    };
  }, [ready, size.width, size.height, onComplete]);

  useEffect(() => {
    const sync = () => {
      const playing = ready && !paused && !document.hidden && !leaving && !still;
      if (playing) tween.current?.play(); else tween.current?.pause();
      if (host.current) host.current.dataset.playback = playing ? "playing" : "paused";
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [ready, paused, leaving, still, size.width, size.height]);
  useEffect(() => {
    if (!leaving || !drawFrame.current) return;
    // Skip completes the same choreography, rather than starting competing tweens.
    const landing = gsap.to(playhead.current, {
      seconds: INTRO_FRAMES / INTRO_FPS, duration: .9, ease: "power2.inOut",
      overwrite: true, onUpdate: () => drawFrame.current?.(),
    });
    return () => {landing.kill();};
  }, [leaving]);
  useEffect(() => {if (still) onComplete();}, [still, onComplete]);
  useEffect(() => {
    const skip = () => onComplete();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (["PageDown", "End", "ArrowDown", " "].includes(e.key) && !(e.target instanceof HTMLButtonElement))) onComplete();
    };
    window.addEventListener("wheel", skip, {passive: true, once: true});
    window.addEventListener("touchmove", skip, {passive: true, once: true});
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.removeEventListener("keydown", key);
    };
  }, [onComplete]);
  return (
    <section
      ref={host}
      className={"intro-experience" + (leaving ? " intro-leaving" : "")}
      data-frame="0"
      data-tone="paper"
      data-playback="loading"
      aria-label="The Living Protocol — a synthetic, cinematic introduction"
      aria-describedby="intro-description"
    >
      <p className="sr-only" id="intro-description">
        An amended fictional protocol is overlaid with its source. Human review
        stays required. The paper moves away to reveal the TrialQueue homepage.
      </p>
      <div className="intro-light-spill" aria-hidden="true" />
      <div className="intro-film" aria-hidden="true">
        <FrozenProtocol frame={0} fps={INTRO_FPS} width={size.width} height={size.height} />
      </div>
      <div className="intro-controls">
        <span className="intro-film-title">
          THE LIVING PROTOCOL <small>TRIALQUEUE / CONCEPT FILM</small>
        </span>
        <div className="intro-control-actions">
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Resume intro" : "Pause intro"}
            disabled={!ready || leaving}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
            <span>{paused ? "Play" : "Pause"}</span>
          </button>
          <button type="button" className="intro-skip" onClick={onComplete}>
            Skip intro <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <span className="intro-progress" aria-hidden="true">
        <span ref={progress} />
      </span>
    </section>
  );
}
