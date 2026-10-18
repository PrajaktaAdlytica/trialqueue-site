import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function useMotionDirector({
  root,
  still,
  geometry,
  setPhase,
  setModuleIndex,
  setRoleIndex,
  pauseScroll,
}) {
  const initialized = useRef(false);
  useLayoutEffect(() => {
    if (still) {
      const saved = pauseScroll.current;
      if (saved) {
        const top =
          scrollY + saved.node.getBoundingClientRect().top - saved.top;
        window.scrollTo({ top, behavior: "instant" });
        saved.restored = true;
      }
      return;
    }
    if (!geometry) return;
    let mm, io, resumeFrame1, resumeFrame2;
    let disposing = false;
    const clean = [];
    const ctx = gsap.context(() => {
      const hero = document.querySelector(".hero");
      gsap.from(".hero-heading .headline-line", {
        y: 45,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.075,
        ease: "power3.out",
      });
      const sculpture = gsap.to(".review-object", {
        rotationY: -19,
        rotationX: 13,
        rotationZ: -7,
        y: -14,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: true,
      });
      const syncSculpture = () => {
        const r = hero.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight && !document.hidden)
          sculpture.play();
        else sculpture.pause();
      };
      const heroObserver = new IntersectionObserver(syncSculpture);
      heroObserver.observe(hero);
      document.addEventListener("visibilitychange", syncSculpture);
      clean.push(() => {
        heroObserver.disconnect();
        document.removeEventListener("visibilitychange", syncSculpture);
      });
      gsap.fromTo(
        ".hero-visual",
        { y: 0, scale: 1, autoAlpha: 1 },
        {
          y: -60,
          scale: 0.94,
          autoAlpha: 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top -100px",
            end: "bottom 20%",
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        },
      );
      gsap.utils
        .toArray("[data-reveal]")
        .filter((el) => !el.closest(".hero,.closing-section"))
        .forEach((el) =>
          gsap.from(el, {
            y: 48,
            autoAlpha: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }),
        );
      gsap.from(".draft-window", {
        y: 110,
        rotate: 3,
        scale: 0.92,
        autoAlpha: 0.25,
        transformOrigin: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".boundary",
          start: "top 85%",
          end: "center center",
          scrub: 0.4,
        },
      });
      gsap.from(".boundary-points>span", {
        x: -35,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 0.75,
        scrollTrigger: {
          trigger: ".boundary-points",
          start: "top 90%",
          once: true,
        },
      });
      gsap.from(".evidence-levels>div", {
        y: 65,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".evidence-levels",
          start: "top 90%",
          once: true,
        },
      });
      gsap.from(".price-panel", {
        y: 65,
        rotate: 2,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: ".pilot-grid",
          start: "top 90%",
          end: "center 65%",
          scrub: 0.6,
        },
      });
      gsap.fromTo(
        ".typed-source",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "steps(26)",
          scrollTrigger: {
            trigger: ".protocol-visual",
            start: "top 80%",
            once: true,
          },
        },
      );
      const fit = (selector, padding = 100) =>
        document.querySelector(selector).getBoundingClientRect().height <=
        innerHeight - padding;
      const chapters = (selector, id, count, setter, canPin = true) => {
        const stage = document.querySelector(selector);
        const pinned =
          canPin &&
          innerWidth >= 700 &&
          innerHeight >= 740 &&
          fit(selector, 106);
        const clock = { value: 0 };
        let previous = -1;
        const tl = gsap.timeline({
          scrollTrigger: {
            id,
            trigger: stage,
            start: pinned ? "top 100px" : "top 22%",
            end: pinned
              ? () =>
                  "+=" + Math.round(innerHeight * (count === 5 ? 1.7 : 1.25))
              : "bottom 72%",
            pin: pinned,
            scrub: 0.22,
            invalidateOnRefresh: true,
          },
        });
        tl.to(clock, {
          value: count,
          duration: count,
          ease: "none",
          onUpdate: () => {
            const next = Math.min(count - 1, Math.floor(clock.value));
            if (disposing || pauseScroll.current?.restored) return;
            if (next !== previous) {
              previous = next;
              setter(next);
            }
          },
        });
      };
      mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (min-height: 720px)", () => {
        if (fit(".signal-stage", 84)) {
          const stage = document.querySelector(".signal-stage");
          stage.style.setProperty("--scene-progress", "0");
          const tl = gsap.timeline({
            scrollTrigger: {
              id: "source-morph-pin",
              trigger: stage,
              start: "top 84px",
              end: () => "+=" + Math.round(innerHeight * 1.05),
              pin: true,
              scrub: 0.4,
            },
          });
          const sourceProgress = { value: 0 };
          tl.to(
            sourceProgress,
            {
              value: 1,
              duration: 3.4,
              ease: "none",
              onUpdate: () =>
                stage.style.setProperty(
                  "--scene-progress",
                  sourceProgress.value,
                ),
            },
            0,
          );
          tl.to(".signal-copy", { scale: 1.02, duration: 1 }, 0)
            .to(".signal-copy", { y: -75, autoAlpha: 0, duration: 0.65 }, 1)
            .fromTo(
              ".signal-triad",
              { autoAlpha: 0, y: 45 },
              { autoAlpha: 1, y: 0, duration: 0.7 },
              1.45,
            )
            .fromTo(
              ".signal-explainer",
              { autoAlpha: 0, y: 25 },
              { autoAlpha: 1, y: 0, duration: 0.6 },
              1.8,
            );
        }
        if (fit(".protocol-stage", 110)) {
          const tl = gsap.timeline({
            scrollTrigger: {
              id: "protocol-story-pin",
              trigger: ".protocol-stage",
              start: "top 100px",
              end: () => "+=" + Math.round(innerHeight * 1.35),
              pin: true,
              scrub: 0.4,
            },
          });
          tl.eventCallback("onUpdate", () => {
            if (!disposing && !pauseScroll.current?.restored)
              setPhase(Math.min(2, Math.floor(tl.progress() * 3)));
          });
          tl.fromTo(
            ".version-old",
            { x: 18, rotate: 0 },
            { x: -22, rotate: -3, opacity: 0.6, duration: 1 },
          )
            .fromTo(
              ".version-new",
              { x: -18, rotate: 0 },
              { x: 18, rotate: 2, duration: 1 },
              0,
            )
            .fromTo(
              ".candidate-row",
              { x: 35, autoAlpha: 0.3 },
              { x: 0, autoAlpha: 1, stagger: 0.18, duration: 0.8 },
              0.45,
            )
            .fromTo(
              ".evidence-pane",
              { y: 24, autoAlpha: 0.3 },
              { y: 0, autoAlpha: 1, duration: 0.7 },
              1.2,
            )
            .fromTo(
              ".review-controls,.review-feedback",
              { y: 16, autoAlpha: 0.3 },
              { y: 0, autoAlpha: 1, stagger: 0.15, duration: 0.6 },
              1.9,
            )
            .to({}, { duration: 0.5 });
        }
        if (!fit(".protocol-stage", 110))
          chapters(".protocol-stage", "protocol-story-pin", 3, setPhase, false);
        chapters(".module-layout", "module-story-pin", 5, setModuleIndex);
        chapters(".audience-stage", "audience-story-pin", 3, setRoleIndex);
        if (fit(".closing-section", 84)) {
          const stage = document.querySelector(".closing-section");
          stage.style.setProperty("--scene-progress", "0");
          const tl = gsap.timeline({
            scrollTrigger: {
              id: "review-portal-pin",
              trigger: stage,
              start: "top 84px",
              end: () => "+=" + Math.round(innerHeight),
              pin: true,
              scrub: 0.4,
            },
          });
          const closingProgress = { value: 0 };
          tl.to(
            closingProgress,
            {
              value: 1,
              duration: 3.1,
              ease: "none",
              onUpdate: () =>
                stage.style.setProperty(
                  "--scene-progress",
                  closingProgress.value,
                ),
            },
            0,
          );
          tl.fromTo(
            ".portal-copy",
            { autoAlpha: 1, y: 0 },
            { autoAlpha: 1, y: 0, duration: 0.55 },
            0,
          )
            .to(".portal-copy", { autoAlpha: 0, y: -60, duration: 0.5 }, 0.8)
            .fromTo(
              ".closing-wash",
              { clipPath: "inset(0 100% 0 0)" },
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.1,
                ease: "power3.inOut",
              },
              1.15,
            )
            .to(".portal-skip", { autoAlpha: 0, duration: 0.3 }, 1.8)
            .fromTo(
              ".closing-content",
              { autoAlpha: 0, y: 60 },
              { autoAlpha: 1, y: 0, duration: 0.6 },
              1.95,
            );
        }
      });
      mm.add("(max-width:1023px), (max-height:719px)", () => {
        chapters(".protocol-stage", "protocol-story-pin", 3, setPhase, false);
        chapters(".module-layout", "module-story-pin", 5, setModuleIndex);
        chapters(".audience-stage", "audience-story-pin", 3, setRoleIndex);

        gsap.fromTo(
          ".signal-triad",
          { autoAlpha: 0.15, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".signal-stage",
              start: "top 60%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          },
        );
        gsap.fromTo(
          ".closing-wash",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: ".closing-section",
              start: "top 90%",
              end: "top 15%",
              scrub: 0.6,
            },
          },
        );
        gsap.from(".closing-content", {
          y: 70,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".closing-section",
            start: "top 65%",
            end: "top 15%",
            scrub: 0.6,
          },
        });
      });
    }, root);
    const anchorClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = event.target.closest('a[href^="#"]');
      if (!link || link.getAttribute("href").length < 2) return;
      const hash = link.getAttribute("href");
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      const closing =
        hash === "#about" && ScrollTrigger.getById("review-portal-pin");
      const moduleChapter =
        hash === "#products" &&
        link.hasAttribute("data-module-index") &&
        ScrollTrigger.getById("module-story-pin");
      const y = moduleChapter
        ? moduleChapter.start +
          ((moduleChapter.end - moduleChapter.start) *
            (Number(link.dataset.moduleIndex) + 0.45)) /
            5
        : closing
          ? closing.end - 2
          : hash === "#top" || hash === "#main"
            ? 0
            : scrollY + target.getBoundingClientRect().top - 100;
      history.replaceState(null, "", hash);
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      if (link.classList.contains("skip-link")) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    };
    root.current.addEventListener("click", anchorClick);
    let initialFrame;
    let removeInitialLoad = () => {};
    if (!initialized.current) {
      initialized.current = true;
      const placeInitial = () => {
        initialFrame = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          initialFrame = requestAnimationFrame(() => {
            const hash = location.hash;
            const target = hash && document.getElementById(hash.slice(1));
            if (target) {
              const closing =
                hash === "#about" && ScrollTrigger.getById("review-portal-pin");
              const y = closing
                ? closing.end - 2
                : hash === "#top" || hash === "#main"
                  ? 0
                  : scrollY + target.getBoundingClientRect().top - 100;
              window.scrollTo({ top: Math.max(0, y), behavior: "instant" });
              ScrollTrigger.update();
            }
          });
        });
      };
      if (document.readyState === "complete") placeInitial();
      else {
        window.addEventListener("load", placeInitial, { once: true });
        removeInitialLoad = () =>
          window.removeEventListener("load", placeInitial);
      }
    }
    const resume = pauseScroll.current;
    if (resume?.restored) {
      resumeFrame1 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        resumeFrame2 = requestAnimationFrame(() => {
          const pin = resume.id ? ScrollTrigger.getById(resume.id) : null;
          const top = pin
            ? pin.start + (pin.end - pin.start) * resume.progress
            : scrollY + resume.node.getBoundingClientRect().top - resume.top;
          window.scrollTo({ top, behavior: "instant" });
          ScrollTrigger.update();
          ScrollTrigger.getAll().forEach((scene) =>
            scene.getTween()?.progress(1),
          );
          pauseScroll.current = null;
        });
      });
    }
    return () => {
      disposing = true;
      removeInitialLoad();
      cancelAnimationFrame(initialFrame);
      root.current?.removeEventListener("click", anchorClick);
      cancelAnimationFrame(resumeFrame1);
      cancelAnimationFrame(resumeFrame2);
      io?.disconnect();
      clean.forEach((f) => f());
      mm?.revert();
      ctx.revert();
      document
        .querySelectorAll(".signal-stage,.closing-section")
        .forEach((el) => el.style.removeProperty("--scene-progress"));
    };
  }, [still, geometry]);
}
