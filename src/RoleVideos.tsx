import { useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import {
  FileText,
  UserCircle,
  LockKey,
  Quotes,
  Pause,
  Play,
  Check,
  Buildings,
} from "@phosphor-icons/react";
import type { ReactNode, CSSProperties } from "react";

const bone = "#ECE9DE",
  muted = "#A3AFA5",
  coral = "#D78069",
  line = "#3D4841";
const row: CSSProperties = { display: "flex", alignItems: "center", gap: 16 };
const box: CSSProperties = {
  background: "#222725",
  border: `1px solid ${line}`,
  borderRadius: 10,
};
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
function FilmFrame({
  title,
  number,
  children,
}: {
  title: string;
  number: string;
  children: ReactNode;
}) {
  const frame = useCurrentFrame();
  return (
    <div
      data-video-frame={frame}
      style={{
        width: 640,
        height: 430,
        background: "#181B1A",
        color: bone,
        padding: "26px 30px",
        fontFamily: '"DM Sans", sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          ...row,
          justifyContent: "space-between",
          fontFamily: '"DM Mono", monospace',
          fontSize: 11,
          color: muted,
          letterSpacing: 1,
        }}
      >
        <span>TRIALQUEUE / {number}</span>
        <span>CONCEPT PREVIEW</span>
      </div>
      <div
        style={{
          fontSize: 31,
          letterSpacing: -1,
          lineHeight: 1.12,
          marginTop: 22,
          maxWidth: 540,
        }}
      >
        {title}
      </div>
      {children}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 30,
          right: 30,
          borderTop: `1px solid ${line}`,
          paddingTop: 12,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: '"DM Mono", monospace',
          fontSize: 10,
          color: muted,
        }}
      >
        <span>DEMO — SYNTHETIC DATA</span>
        <span>NO LIVE CONNECTIONS</span>
      </div>
    </div>
  );
}

export function DirectorFilm() {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig();
  return (
    <FilmFrame
      title="One protocol. Clear review gates."
      number="01 / PILOT SCOPE"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "170px 1fr",
          gap: 22,
          marginTop: 26,
        }}
      >
        <div
          style={{
            ...box,
            padding: 19,
            opacity: interpolate(frame, [0, 0.7 * fps], [0.35, 1], clamp),
            translate: `0 ${interpolate(frame, [0, 0.7 * fps], [12, 0], clamp)}px`,
          }}
        >
          <FileText size={30} color={coral} />
          <div style={{ color: muted, fontSize: 12, marginTop: 20 }}>
            FICTIONAL STUDY
          </div>
          <div style={{ fontSize: 20, marginTop: 7 }}>Protocol v2</div>
          <div style={{ fontSize: 12, color: muted, marginTop: 6 }}>
            TQ-DEMO-ONC-01
          </div>
          <div style={{ color: coral, fontSize: 13, marginTop: 22 }}>
            Bounded exercise
          </div>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            ["Named sponsor", "Fictional research-office role"],
            ["Governance route", "Review pending"],
            ["Written pilot scope", "Not yet agreed"],
          ].map(([label, detail], i) => (
            <div
              key={label}
              style={{
                ...box,
                ...row,
                padding: "13px 15px",
                opacity: interpolate(
                  frame,
                  [(i * 0.6 + 0.4) * fps, (i * 0.6 + 1.2) * fps],
                  [0.25, 1],
                  clamp,
                ),
                translate: `${interpolate(frame, [(i * 0.6 + 0.4) * fps, (i * 0.6 + 1.2) * fps], [20, 0], clamp)}px 0`,
              }}
            >
              {i === 0 ? (
                <UserCircle size={26} color={coral} />
              ) : (
                <LockKey size={26} color={muted} />
              )}
              <div>
                <div style={{ fontSize: 19 }}>{label}</div>
                <div style={{ fontSize: 12, color: muted, marginTop: 3 }}>
                  {detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FilmFrame>
  );
}

export function CoordinatorFilm() {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig();
  return (
    <FilmFrame
      title="A value is only as current as its source."
      number="02 / EVIDENCE REVIEW"
    >
      <div style={{ ...row, marginTop: 24, gap: 12 }}>
        <div style={{ ...box, padding: "11px 16px", fontSize: 16, flex: 1 }}>
          TQ-SYN-002{" "}
          <span style={{ color: muted, fontSize: 12, marginLeft: 16 }}>
            ANC ≥ 1.5 · invented rule
          </span>
        </div>
        <div
          style={{
            ...box,
            borderColor: "#8E7E51",
            color: "#DCC28D",
            padding: "11px 16px",
            fontSize: 16,
          }}
        >
          Unknown
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginTop: 14,
        }}
      >
        <div
          style={{
            ...box,
            padding: 18,
            borderColor: frame > 1.3 * fps ? "#8E7E51" : line,
          }}
        >
          <div style={{ ...row, fontSize: 14, color: muted }}>
            <Quotes size={22} /> Cited source
          </div>
          <div style={{ fontSize: 35, marginTop: 12 }}>
            1.7 <span style={{ fontSize: 15, color: muted }}>×10⁹/L</span>
          </div>
          <div style={{ fontSize: 19, color: "#DCC28D", marginTop: 8 }}>
            20 Sep 2026
          </div>
          <div style={{ fontSize: 12, color: muted, marginTop: 8 }}>
            Outside the invented 14-day window
          </div>
        </div>
        <div
          style={{
            ...box,
            padding: 18,
            opacity: interpolate(
              frame,
              [1.2 * fps, 2.2 * fps],
              [0.3, 1],
              clamp,
            ),
            translate: `0 ${interpolate(frame, [1.2 * fps, 2.2 * fps], [20, 0], clamp)}px`,
          }}
        >
          <div style={{ ...row, fontSize: 14, color: muted }}>
            <UserCircle size={22} /> Coordinator B
          </div>
          <div style={{ fontSize: 23, lineHeight: 1.2, marginTop: 16 }}>
            Clarify the
            <br />
            source date.
          </div>
          <div style={{ color: coral, fontSize: 13, marginTop: 18 }}>
            Manual review required
          </div>
        </div>
      </div>
      <div style={{ marginTop: 15, fontSize: 13, color: muted, ...row }}>
        <LockKey size={18} /> No automatic exclusion. Outreach remains locked.
      </div>
    </FilmFrame>
  );
}

export function NetworkFilm() {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig();
  return (
    <FilmFrame
      title="Readiness before a wider network."
      number="03 / SITE HANDOFF"
    >
      <div style={{ ...row, marginTop: 20, color: muted, fontSize: 12 }}>
        <Buildings size={22} color={coral} /> Fictional sites · illustrative
        permission states
      </div>
      <div style={{ ...box, marginTop: 14, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr 1fr",
            padding: "12px 16px",
            fontSize: 12,
            color: muted,
            borderBottom: `1px solid ${line}`,
          }}
        >
          <span>LOCAL SITE</span>
          <span>GOVERNANCE</span>
          <span>CAPACITY</span>
        </div>
        {["Example site A", "Example site B", "Example site C"].map(
          (site, i) => (
            <div
              key={site}
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr 1fr",
                padding: "16px",
                borderBottom: i < 2 ? `1px solid ${line}` : 0,
                fontSize: 17,
                opacity: interpolate(
                  frame,
                  [(i * 0.65 + 0.2) * fps, (i * 0.65 + 1) * fps],
                  [0.2, 1],
                  clamp,
                ),
                translate: `${interpolate(frame, [(i * 0.65 + 0.2) * fps, (i * 0.65 + 1) * fps], [14, 0], clamp)}px 0`,
              }}
            >
              <span>{site}</span>
              <span style={{ color: "#DCC28D" }}>Pending</span>
              <span style={{ color: muted }}>Unconfirmed</span>
            </div>
          ),
        )}
      </div>
      <div style={{ ...row, color: coral, fontSize: 14, marginTop: 18 }}>
        <LockKey size={20} /> Expansion stays a hypothesis until permissions are
        agreed.
      </div>
    </FilmFrame>
  );
}
const films = [DirectorFilm, CoordinatorFilm, NetworkFilm];
const labels = [
  "Trial-office pilot scope",
  "Coordinator evidence review",
  "Network site handoff",
];

export default function RoleVideo({
  index,
  still,
}: {
  index: number;
  still: boolean;
}) {
  const host = useRef<HTMLDivElement>(null),
    player = useRef<PlayerRef>(null);
  const [localPaused, setLocalPaused] = useState(false);
  useEffect(() => {
    let first = 0,
      second = 0;
    const sync = () => {
      const bounds = host.current?.getBoundingClientRect();
      const visible = !!bounds && bounds.bottom > 0 && bounds.top < innerHeight;
      const shouldPlay = visible && !document.hidden && !still && !localPaused;
      if (host.current)
        host.current.dataset.playback = shouldPlay ? "playing" : "paused";
      if (shouldPlay && !player.current?.isPlaying()) player.current?.play();
      else if (!shouldPlay && player.current?.isPlaying())
        player.current?.pause();
    };
    const observer = new IntersectionObserver(sync, { threshold: 0.15 });
    if (host.current) observer.observe(host.current);
    sync();
    // Pin restoration completes after layout; resync without resetting the frame.
    first = requestAnimationFrame(() => {
      second = requestAnimationFrame(sync);
    });
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      player.current?.pause();
    };
  }, [still, localPaused, index]);
  return (
    <div
      ref={host}
      className="audience-video"
      data-film={index + 1}
      role="group"
      aria-label={`${labels[index]} — animated synthetic concept preview`}
    >
      <div className="audience-video-frame">
        <Player
          key={index}
          ref={player}
          component={films[index]}
          durationInFrames={180}
          initialFrame={still ? 100 : 0}
          fps={30}
          compositionWidth={640}
          compositionHeight={430}
          loop
          controls={false}
          autoPlay={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          initiallyMuted
          style={{ width: "100%", aspectRatio: "640 / 430" }}
        />
      </div>
      <div className="audience-video-controls">
        <span>
          0{index + 1} / {labels[index]}
        </span>
        <button
          type="button"
          disabled={still}
          onClick={() => setLocalPaused(!localPaused)}
          aria-label={
            still || localPaused
              ? "Play audience preview"
              : "Pause audience preview"
          }
        >
          {still || localPaused ? <Play size={14} /> : <Pause size={14} />}
          {still ? "Motion paused" : localPaused ? "Play" : "Pause"}
        </button>
      </div>
    </div>
  );
}
