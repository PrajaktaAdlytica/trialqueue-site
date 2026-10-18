import { useEffect, useRef } from "react";

// TrialQueue's visual unit is a dated evidence slip. Slips align into review
// lanes, with a broken route at the human checkpoint. No patient representation.
const clamp = (v) => Math.max(0, Math.min(1, v));
const mix = (a, b, t) => a + (b - a) * t;
export default function MotionField({ still, moduleIndex }) {
  const canvas = useRef(null);
  const config = useRef({ still, moduleIndex });
  config.current = { still, moduleIndex };
  useEffect(() => {
    const el = canvas.current;
    const ctx = el.getContext("2d", { alpha: true });
    let w = 0,
      h = 0,
      raf = 0,
      last = 0,
      time = 0;
    const selectors = [
      ".hero",
      ".signal-stage",
      ".boundary",
      ".products-section",
      ".teams-section",
      ".closing-section",
    ];
    const nodes = Object.fromEntries(
      selectors.map((s) => [s, document.querySelector(s)]),
    );
    const stroke = (color = "#78847B", alpha = 1, width = 1) => {
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = width;
    };
    const path = (points, color, alpha = 1, width = 1) => {
      stroke(color, alpha, width);
      ctx.beginPath();
      points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
    };
    const text = (label, x, y, color = "#B9BEB5", size = 9, alpha = 1) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.font = `${size}px "DM Mono", monospace`;
      ctx.fillText(label, x, y);
    };
    const slip = (x, y, sw, sh, label, alpha = 1, accent = false) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#202522";
      ctx.fillRect(x, y, sw, sh);
      stroke(accent ? "#D78069" : "#78847B", alpha * 0.7);
      ctx.strokeRect(x, y, sw, sh);
      path(
        [
          [x + 12, y + 15],
          [x + 22, y + 15],
        ],
        "#D78069",
        alpha,
        2,
      );
      text(label, x + 30, y + 18, "#ECE9DE", w < 600 ? 7 : 9, alpha);
      for (let j = 0; j < 3; j++)
        path(
          [
            [x + 12, y + 35 + j * 9],
            [x + sw * (j === 1 ? 0.64 : 0.85), y + 35 + j * 9],
          ],
          "#78847B",
          alpha * 0.45,
        );
      path(
        [
          [x + sw - 16, y + sh],
          [x + sw - 16, y + sh - 9],
          [x + sw, y + sh - 9],
        ],
        "#D78069",
        alpha * 0.7,
      );
    };
    const progress = (n, r) => {
      const p = n?.style.getPropertyValue("--scene-progress");
      return p ? Number(p) : clamp((h - r.top) / (h + r.height));
    };
    const clip = (r) => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(
        0,
        Math.max(84, r.top),
        w,
        Math.max(0, Math.min(h, r.bottom) - Math.max(84, r.top)),
      );
      ctx.clip();
    };
    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      const rects = Object.fromEntries(
        Object.entries(nodes).map(([s, n]) => [s, n?.getBoundingClientRect()]),
      );
      const shown = (s) => rects[s] && rects[s].top < h && rects[s].bottom > 84;
      if (shown(".signal-stage")) {
        const r = rects[".signal-stage"];
        clip(r);
        const p = config.current.still
          ? 0.9
          : progress(nodes[".signal-stage"], r);
        const pinned =
          !!nodes[".signal-stage"].style.getPropertyValue("--scene-progress");
        const cy = pinned ? h * 0.66 : r.top + r.height * 0.59;
        const cw = Math.min(w < 600 ? 96 : 240, w * 0.245),
          gap = w < 600 ? 12 : 32;
        const left = (w - (3 * cw + 2 * gap)) / 2;
        const align = clamp((p - 0.12) / 0.48);
        const labels = ["PROTOCOL v2", "SOURCE §4.1", "REVIEW OWNER"];
        for (let k = 0; k < 3; k++) {
          const x = left + k * (cw + gap),
            y = cy;
          // Routes stop at the review boundary; no moving marker crosses it.
          if (k < 2) {
            const bend = x + cw + gap * 0.5;
            path(
              [
                [x + cw, y + 12],
                [bend, y + 12],
                [bend, y - 24],
                [x + cw + gap, y - 24],
              ],
              "#D78069",
              align * 0.7,
            );
          }
          for (let j = 2; j >= 0; j--) {
            const offset = (1 - align) * (j * 26 + (k - 1) * 14);
            const yy =
              y +
              j * mix(23, 8, align) +
              Math.sin(time * 0.6 + k + j) * 3 * (1 - align);
            slip(
              x + offset,
              yy,
              cw,
              w < 600 ? 68 : 90,
              labels[k],
              j === 0 ? 1 : 0.22 + j * 0.08,
              k === 2,
            );
          }
          text(
            ["15 OCT · CHANGE", "DATED · CITED", "MANUAL CHECK"][k],
            x,
            cy + 130,
            "#B9BEB5",
            w < 600 ? 6 : 8,
            clamp((p - 0.45) / 0.25),
          );
        }
        if (align > 0.4) {
          const bx = left + 2 * (cw + gap) - gap * 0.5;
          ctx.setLineDash([3, 5]);
          path(
            [
              [bx, cy - 42],
              [bx, cy + 113],
            ],
            "#D78069",
            align,
          );
          ctx.setLineDash([]);
        }
        ctx.restore();
      } else if (shown(".closing-section")) {
        const r = rects[".closing-section"];
        clip(r);
        const p = config.current.still
          ? 1
          : progress(nodes[".closing-section"], r);
        const y = r.top + (p > 0.7 ? r.height * 0.82 : r.height * 0.64);
        const ww = Math.min(w * 0.78, 1000),
          x = (w - ww) / 2;
        const alpha = 1 - clamp((p - 0.55) / 0.2);
        const labels = [
          "01  PROTOCOL DEFINED",
          "02  EVIDENCE ATTACHED",
          "03  HUMAN REVIEW REQUIRED",
        ];
        for (let j = 0; j < 3; j++) {
          const xx = x + mix(j * 28, 0, clamp(p * 2.5));
          const yy = y + j * mix(36, 42, clamp(p * 2.5));
          stroke("#78847B", alpha * 0.6);
          ctx.strokeRect(xx, yy, ww, 34);
          text(
            labels[j],
            xx + 16,
            yy + 22,
            j === 2 ? "#D78069" : "#ECE9DE",
            w < 600 ? 7 : 10,
            alpha,
          );
          if (j === 2)
            path(
              [
                [xx + ww - 35, yy + 9],
                [xx + ww - 35, yy + 25],
                [xx + ww - 18, yy + 25],
              ],
              "#D78069",
              alpha,
              2,
            );
        }
        // A ruled review margin remains after the page turns to paper.
        if (p > 0.68)
          for (let j = 0; j < 6; j++)
            path(
              [
                [w * 0.05, y + j * 20],
                [w * 0.95, y + j * 20],
              ],
              "#556159",
              clamp((p - 0.68) * 4) * 0.12,
            );
        ctx.restore();
      } else if (shown(".hero")) {
        // The hero uses the approved editable brand mark in a real 3D scene.
        // Keep this shared layer quiet so the headline and sculpture stay clear.
      } else {
        const light =
          shown(".boundary") ||
          shown(".products-section") ||
          shown(".teams-section");
        const ink = light ? "#556159" : "#78847B";
        // Quiet ledger rails carry the brand between chapters, without orbits.
        const x = w * (light ? 0.07 : 0.94),
          base = h * 0.42;
        for (let i = 0; i < 7; i++) {
          const y = base + i * 44;
          path(
            [
              [x + (light ? 0 : -180), y],
              [x, y],
              [x, y + 25],
            ],
            ink,
            0.13,
          );
          const t = (time * 0.08 + i * 0.13) % 1;
          path(
            [
              [x + (light ? 0 : -180) + t * 120, y],
              [x + (light ? 0 : -180) + t * 120 + 16, y],
            ],
            light ? "#963E2D" : "#D78069",
            0.3,
          );
        }
      }
      ctx.globalAlpha = 1;
    };
    const resize = () => {
      w = innerWidth;
      h = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint();
    };
    const tick = (stamp) => {
      if (stamp - last > 30) {
        time += Math.min((stamp - last) / 1000, 0.06);
        last = stamp;
        paint();
      }
      raf = requestAnimationFrame(tick);
    };
    const visibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !config.current.still) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!document.hidden) paint();
    };
    resize();
    visibility();
    if (still) window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [still]);
  return <canvas ref={canvas} className="motion-field" aria-hidden="true" />;
}
