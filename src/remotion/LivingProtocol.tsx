import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {ProtocolSurface} from "../ProtocolSurface";
import { introLandingAt } from "../intro-motion";
export {INTRO_FPS, INTRO_FRAMES} from "../intro-motion";
export function IntroEndFrame() {
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const landing = introLandingAt(frame, fps);
  const mobile = width < 700;
  return (
    <AbsoluteFill
      style={{
        background: "#181B1A",
        color: "#ECE9DE",
        fontFamily: "DM Sans, Arial, sans-serif",
        translate: `0 ${8 * (1 - landing.hero)}px`,
        opacity: landing.hero,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage: "radial-gradient(#ABC4AF 1px,transparent 1px)",
          backgroundSize: `${mobile ? 17 : 26}px ${mobile ? 17 : 26}px`,
          maskImage: "linear-gradient(transparent 20%,black 95%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: width * 0.06,
          top: mobile ? height * 0.13 : height * 0.29,
          width: mobile ? width * 0.88 : width * 0.48,
        }}
      >
        <div
          style={{
            fontFamily: "DM Mono,monospace",
            fontSize: Math.max(8, width * 0.006),
            letterSpacing: 2,
            color: "#9CA99D",
          }}
        >
          CLINICAL TRIAL OPERATIONS / CONCEPT PREVIEW
        </div>
        <div
          style={{
            fontSize: mobile ? width * 0.115 : width * 0.057,
            lineHeight: 1.02,
            letterSpacing: "-.065em",
            marginTop: mobile ? 28 : 36,
          }}
        >
          Every criterion.
          <br />
          <span style={{ color: "#D78069" }}>In context.</span>
        </div>
        <p
          style={{
            fontSize: mobile ? width * 0.04 : width * 0.0125,
            lineHeight: 1.6,
            color: "#B9BEB5",
            maxWidth: 450,
            marginTop: mobile ? 25 : 35,
          }}
        >
          Give trial coordinators a cited pre-screen, not an automated
          eligibility decision.
        </p>
        <div
          style={{
            display: "flex",
            gap: 25,
            alignItems: "center",
            marginTop: 26,
            fontSize: mobile ? 11 : 12,
          }}
        >
          <span
            style={{
              padding: "17px 24px",
              borderRadius: 40,
              color: "#181B1A",
              background: "#D78069",
            }}
          >
            Request a scoped pilot ↗
          </span>
          <span>Explore the demo →</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: mobile ? "25%" : "64%",
          top: mobile ? "61%" : "27%",
          width: mobile ? width * 0.53 : width * 0.235,
          aspectRatio: "280/290",
          transform:
            "perspective(1100px) rotateX(22deg) rotateY(-32deg) rotateZ(-13deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {Array.from({ length: 14 }, (_, i) => (
          <Img
            key={i}
            src={staticFile(
              i === 13
                ? "assets/logos/trialqueue-mark-reverse.svg"
                : "assets/logos/trialqueue-mark-mono-light.svg",
            )}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: i === 13 ? 1 : 0.085,
              transform: `translateZ(${i * 4}px)`,
              filter:
                i === 13 ? "drop-shadow(-10px 18px 24px #0004)" : undefined,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
}
/** A continuous paper camera move. Transparent end frames reveal the real website underneath. */
export function LivingProtocol({
  showEndFrame = true,
}: {
  showEndFrame?: boolean;
}) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  return <AbsoluteFill style={{overflow: "hidden", background: showEndFrame ? "#181B1A" : "transparent"}}>
    {showEndFrame && <IntroEndFrame />}
    <ProtocolSurface frame={frame} fps={fps} width={width} height={height} ImageComponent={Img} resolveAsset={staticFile} />
  </AbsoluteFill>;
}
