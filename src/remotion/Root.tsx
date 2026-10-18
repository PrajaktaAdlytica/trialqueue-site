import { Composition } from "remotion";
import { LivingProtocol } from "./LivingProtocol";
export const RemotionRoot = () => (
  <>
    <Composition
      id="LivingProtocol"
      component={LivingProtocol}
      width={1440}
      height={900}
      fps={60}
      durationInFrames={408}
      defaultProps={{ showEndFrame: true }}
    />
    <Composition
      id="LivingProtocolMobile"
      component={LivingProtocol}
      width={390}
      height={844}
      fps={60}
      durationInFrames={408}
      defaultProps={{ showEndFrame: true }}
    />
  </>
);
