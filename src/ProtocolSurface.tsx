import type {CSSProperties, ElementType} from "react";
import {introLandingAt, protocolCameraTransform} from "./intro-motion";
const assetPath = (path: string) => "/" + path;
/** One reusable paper surface: mounted once on the website, frame-rendered in Studio. */
export function ProtocolSurface({frame, fps, width, height, ImageComponent = "img", resolveAsset = assetPath}: {
  frame: number; fps: number; width: number; height: number;
  ImageComponent?: ElementType; resolveAsset?: (path: string) => string;
}) {
  const Image = ImageComponent;
  const mobile = width < 700;
  const sheetW = mobile ? Math.max(width * 2.25, height * 1.16) : width * 1.6;
  const sheetH = mobile ? height * 2.4 : height * 2.85;
  const u = sheetW / 2304;
  const motion = introLandingAt(frame, fps);
  const fly = motion.departure;
  const paper: CSSProperties = {
    position: "absolute",
    width: sheetW,
    height: sheetH,
    left: mobile ? -sheetW * 0.27 : -width * 0.2,
    top: mobile ? -sheetH * 0.2 : -height * 0.81,
    background: "#ECE9DE",
    color: "#242B26",
    borderRadius: "2px 3px 26% 2px / 2px 3px 1.5% 2px",
    overflow: "hidden",
    transformOrigin: "48% 38%",
    transform: protocolCameraTransform(width, height, frame, fps),
    opacity: motion.paperOpacity,
    willChange: "transform, opacity",

  };
  const font = mobile ? width * 0.058 : Math.max(32, 62 * u);
  return (
    <div
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <style>{`@font-face{font-family:'DM Sans';src:url('${resolveAsset("assets/fonts/dm-sans-latin-wght-normal.woff2")}')}@font-face{font-family:'DM Mono';src:url('${resolveAsset("assets/fonts/dm-mono-latin-400-normal.woff2")}')}`}</style>
      <div
        data-intro-paper=""
        data-intro-frame={frame}
        data-intro-scene={
          frame < 1.7 * fps
            ? "protocol"
            : frame < 3.85 * fps
              ? "source"
              : frame < 6.1 * fps
                ? "handoff"
                : "landing"
        }
        style={paper}
      >
        <Image
          src={resolveAsset("assets/motion/protocol-paper.webp")}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.88,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(118deg,#fff9 0%,transparent 32%,#91877916 67%,#fff7 100%)",
          }}
        />
        <div
          data-intro-print=""
          style={{
            opacity: motion.print,
            position: "absolute",
            left: mobile ? "30%" : "20%",
            top: mobile ? "27%" : "36%",
            width: mobile ? "34%" : "68%",
            fontFamily: "Georgia,serif",
            textShadow: "0 1px #fff5",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "DM Mono,monospace",
              fontSize: Math.max(12, 23 * u),
              letterSpacing: Math.max(1.8, 5 * u),
              paddingBottom: Math.max(18, 42 * u),
              borderBottom: "1px solid #71807368",
              marginBottom: Math.max(28, 65 * u),
            }}
          >
            <span>LOCAL PROTOCOL</span>
            <span>v1 → v2</span>
          </div>
          <div
            style={{
              fontSize: font,
              lineHeight: 1.6,
              letterSpacing: ".025em",
              maxWidth: "94%",
            }}
          >
            <span
              style={{
                fontSize: font * 0.74,
                display: "inline-block",
                marginRight: Math.max(18, 42 * u),
              }}
            >
              4.2
            </span>
            Inclusion criteria have been updated
            <br />
            to align with the amended protocol
            <br />
            dated{" "}
            <span style={{ position: "relative", whiteSpace: "nowrap" }}>
              15 Oct 2026.
              <i
                data-intro-underline=""
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: -font * 0.13,
                  height: Math.max(2, 6 * u),
                  background: "#D78069",
                  width: `${motion.underline * 100}%`,
                }}
              />
            </span>
          </div>
          <div
            style={{
              fontSize: font * 0.84,
              lineHeight: 1.7,
              letterSpacing: ".018em",
              marginTop: font * 0.72,
              opacity: 0.32,
              filter: "blur(.5px)",
            }}
          >
            4.3　Supporting documentation and
            <br />
            　　 references are provided in the
            <br />
            　　 source-linked review record.
          </div>
          <div
            style={{
              marginTop: font * 1.15,
              fontFamily: "DM Mono,monospace",
              fontSize: Math.max(10, 18 * u),
              letterSpacing: "1.5px",
              color: "#5E6D61",
            }}
          >
            TQ-DEMO-ONC-01　/　FICTIONAL PROTOCOL
          </div>
        </div>
        <div
          data-intro-vellum=""
          style={{
            position: "absolute",
            left: mobile ? "30%" : "24%",
            top: mobile ? "39%" : "47%",
            width: mobile ? "38%" : "63%",
            height: mobile ? "15%" : "21%",
            background:
              "linear-gradient(110deg,#f4f2e399,#f4f2e3bc 44%,#f5f1df82)",
            borderTop: "1px solid #fff9",
            borderLeft: "1px solid #fff7",
            boxShadow: `${14 * u}px ${28 * u}px ${35 * u}px #4d47382b,inset 0 0 ${80 * u}px #fff5`,
            opacity: motion.vellum * .98,
            transform: `translate3d(${motion.vellumTravel * width * .12}px,${motion.vellumTravel * height * .02}px,0) rotate(-1.6deg)`,
            willChange: "transform, opacity",
          }}
        >
          <Image
            src={resolveAsset("assets/motion/protocol-paper.webp")}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.16,
              mixBlendMode: "multiply",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "11%",
              top: "28%",
              display: "flex",
              alignItems: "center",
              gap: Math.max(17, 35 * u),
            }}
          >
            <i
              style={{
                height: Math.max(66, 140 * u),
                width: Math.max(3, 7 * u),
                background: "#D78069",
                display: "block",
              }}
            />
            <div
              style={{
                fontFamily: "DM Mono,monospace",
                fontSize: mobile ? width * 0.045 : Math.max(18, 46 * u),
                lineHeight: 1.85,
                letterSpacing: Math.max(0.3, 3 * u),
              }}
            >
              Source attached
              <br />
              <span style={{ color: "#A14C38" }}>Review required</span>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg,transparent 40%,#756c5612 85%,#5a50362b)",
            mixBlendMode: "multiply",
          }}
        />
      </div>
      <div
        data-intro-source=""
        style={{
          position: "absolute",
          left: Math.max(22, width * 0.035),
          bottom: Math.max(85, height * 0.11),
          fontFamily: "DM Mono,monospace",
          fontSize: Math.max(8, width * 0.006),
          letterSpacing: 1.5,
          color: fly > 0.45 ? "#B9BEB5" : "#49574B",
          opacity: motion.source * .8,
        }}
      >
        SOURCE: SYNTHETIC　—　CONCEPT PREVIEW
      </div>
    </div>
  );
}
