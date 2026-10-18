import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";
import { useMotion } from "./MotionContext";
gsap.registerPlugin(ScrollTrigger);
export function usePageMotion() {
  const root = useRef(null),
    { still } = useMotion(),
    { pathname } = useLocation();
  useLayoutEffect(() => {
    if (still) return;
    const ctx = gsap.context(() => {
      gsap.from(".page-title-line", {
        y: 60,
        opacity: 0,
        stagger: 0.09,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.utils.toArray("[data-page-reveal]").forEach((el) =>
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }),
      );
      gsap.utils.toArray("[data-trace]").forEach((el) =>
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "0 50%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "top 45%",
            scrub: 0.5,
          },
        }),
      );
      gsap.utils.toArray("[data-paper]").forEach((el) =>
        gsap.from(el, {
          y: 70,
          rotation: 2,
          scale: 0.97,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "top 40%",
            scrub: 0.5,
          },
        }),
      );
      gsap.utils.toArray("[data-shift]").forEach((el, i) =>
        gsap.from(el, {
          x: i % 2 ? 35 : -35,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 50%",
            scrub: 0.4,
          },
        }),
      );
      const signature = (
        selector,
        vars,
        start = "top 95%",
        end = "bottom 45%",
      ) => {
        gsap.utils
          .toArray(selector)
          .forEach((el) =>
            gsap.from(el, {
              ...vars,
              ease: "none",
              scrollTrigger: { trigger: el, start, end, scrub: 0.65 },
            }),
          );
      };
      signature(
        ".platform-flow>a>svg:first-of-type",
        { y: 20, opacity: 0.25 },
        "top 95%",
        "top 60%",
      );
      signature(
        ".company-mark>img",
        { rotation: -8, scale: 0.72, x: -35 },
        "top 95%",
        "top 35%",
      );
      signature(
        ".signin-rails",
        { y: 70, rotation: 4 },
        "top 100%",
        "bottom 20%",
      );
      signature(
        ".guide-illustration>svg",
        { rotation: -12, y: 22 },
        "top 100%",
        "top 45%",
      );
      signature(
        ".pilot-timeline article",
        { y: 45, opacity: 0.2 },
        "top 95%",
        "top 60%",
      );
      const path = root.current?.querySelector(".governance-path");
      if (path)
        gsap.from(".governance-progress", {
          scaleY: 0,
          transformOrigin: "50% 0",
          ease: "none",
          scrollTrigger: {
            trigger: path,
            start: "top 65%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        });
    }, root);
    return () => ctx.revert();
  }, [still, pathname]);
  return root;
}
