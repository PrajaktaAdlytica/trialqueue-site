/** Frame-independent choreography shared by the website and Remotion preview. */
export const INTRO_FPS = 60;
export const INTRO_FRAMES = 408;
const settle = (seconds: number, start: number, end: number) => {
  const t = Math.min(1, Math.max(0, (seconds - start) / (end - start)));
  return t * t * t * (t * (t * 6 - 15) + 10);
};
export const introLandingAt = (frame: number, fps: number) => {
  const seconds = frame / fps;
  return {
    pan: settle(seconds, 0, 3.6),
    departure: settle(seconds, 3.6, 6.15),
    paperOpacity: 1 - settle(seconds, 4.15, 6.15),
    hero: settle(seconds, 4.65, 6.2),
    print: 1 - settle(seconds, 3.65, 4.65),
    nav: settle(seconds, 5.15, 6.7),
    details: settle(seconds, 5.7, 6.65),
    controls: 1 - settle(seconds, 4.65, 5.85),
    light: 1 - settle(seconds, 4.15, 6.15),
    vellum: settle(seconds, 1.5, 2.2) * (1 - settle(seconds, 3.65, 4.65)),
    vellumTravel: 1 - settle(seconds, 1.45, 2.8),
    underline: settle(seconds, .35, 1.4),
    source: settle(seconds, 0, .3) * (1 - settle(seconds, 3.9, 4.65)),
  };
};
export const protocolCameraTransform = (width: number, height: number, frame: number, fps: number) => {
  const {pan, departure} = introLandingAt(frame, fps);
  const mobile = width < 700;
  return `perspective(${width * 2.2}px) translate3d(${-departure * width * .38}px,${-pan * height * .07 - departure * height * .12}px,0) rotateX(${mobile ? 7 : 17 - pan * 3}deg) rotateY(${mobile ? -8 : -13 + pan * 3}deg) rotateZ(${(mobile ? -4 : -9) + pan * 1.8 - departure * 3}deg) scale(${1.045 - pan * .045 - departure * .06})`;
};
