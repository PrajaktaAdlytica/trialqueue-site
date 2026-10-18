import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface ParticleWaveProps {
  className?: string;
  /** Integrates with the website's shared motion control. */
  paused?: boolean;
  /** Optional brand colour; otherwise follows the root dark class. */
  color?: string;
}

const particleVertex = `
  attribute float scale;
  uniform float uTime;
  void main() {
    vec3 p = position;
    float s = scale;
    p.y += sin(p.x + uTime) * 0.5 + cos(p.y + uTime) * 0.2;
    p.x += sin(p.y + uTime) * 0.5;
    s += sin(p.x + uTime) * 0.5 + cos(p.y + uTime) * 0.2;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = max(0.5, s * 15.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;
const particleFragment = `
  uniform vec3 uColor;
  void main() { gl_FragColor = vec4(uColor, 0.5); }
`;

/** Supplied Three.js wave, adapted for bounded, transparent page backgrounds. */
export function ParticleWave({
  className = "",
  paused = false,
  color,
}: ParticleWaveProps) {
  const [compact, setCompact] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 700px)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const change = () => setCompact(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef({ paused, color });
  settings.current = { paused, color };
  const syncRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      // Keep the existing hero and its approved artwork usable without WebGL.
      canvas.dataset.renderer = "unavailable";
      return;
    }
    canvas.dataset.renderer = "ready";
    renderer.setClearColor(0x181b1a, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    camera.position.set(0, 6, 5);
    const mouse = new THREE.Vector2(0, 0);
    const geometry = new THREE.BufferGeometry();
    const amount = compact ? 90 : 200;
    const gap = 0.3;
    const positions = new Float32Array(amount * amount * 3);
    const scales = new Float32Array(amount * amount).fill(1);
    let i = 0;
    for (let x = 0; x < amount; x++) {
      for (let y = 0; y < amount; y++) {
        positions[i++] = x * gap - (amount * gap) / 2;
        positions[i++] = 0;
        positions[i++] = y * gap - (amount * gap) / 2;
      }
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color() } },
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationId: number | null = null;
    let visible = false;
    let contextLost = false;
    let last = 0;
    let disposed = false;

    const updateColor = () => {
      material.uniforms.uColor.value.set(
        settings.current.color ||
          (document.documentElement.classList.contains("dark")
            ? "#ffffff"
            : "#181b1a"),
      );
    };
    const draw = () => {
      if (contextLost || disposed) return;
      updateColor();
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    const tick = (stamp: number) => {
      if (disposed) return;
      if (stamp - last >= 1000 / 30) {
        const delta = last ? Math.min((stamp - last) / 1000, 0.06) : 0;
        last = stamp;
        material.uniforms.uTime.value += delta * 0.6;
        camera.position.x = THREE.MathUtils.lerp(
          camera.position.x,
          mouse.x * 0.3,
          0.04,
        );
        draw();
      }
      animationId = requestAnimationFrame(tick);
    };
    const sync = () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
      animationId = null;
      last = 0;
      updateColor();
      if (!document.hidden && visible && !contextLost) {
        draw();
        if (!settings.current.paused && !reduced.matches)
          animationId = requestAnimationFrame(tick);
      }
    };
    syncRef.current = sync;
    const resize = () => {
      if (disposed) return;
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, amount === 90 ? 1.25 : 1.5),
      );
      renderer.setSize(width, height, false);
      if (visible && !document.hidden) draw();
    };
    const pointer = (event: PointerEvent) => {
      if (
        !visible ||
        settings.current.paused ||
        reduced.matches ||
        event.pointerType === "touch"
      )
        return;
      const r = host.getBoundingClientRect();
      mouse.set(
        Math.max(-1, Math.min(1, ((event.clientX - r.left) / r.width) * 2 - 1)),
        0,
      );
    };
    const lost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      sync();
    };
    const restored = () => {
      contextLost = false;
      resize();
      sync();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersection.observe(host);
    const theme = new MutationObserver(updateColor);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    window.addEventListener("pointermove", pointer, { passive: true });
    canvas.addEventListener("webglcontextlost", lost);
    canvas.addEventListener("webglcontextrestored", restored);
    resize();
    return () => {
      disposed = true;
      if (animationId !== null) cancelAnimationFrame(animationId);
      syncRef.current = null;
      resizeObserver.disconnect();
      intersection.disconnect();
      theme.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      window.removeEventListener("pointermove", pointer);
      canvas.removeEventListener("webglcontextlost", lost);
      canvas.removeEventListener("webglcontextrestored", restored);
      scene.remove(particles);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [compact]);

  useEffect(() => {
    syncRef.current?.();
  }, [paused, color]);
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
