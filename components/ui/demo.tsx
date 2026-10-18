import { ParticleWave } from "@/components/ui/particle-wave";

/** Standalone usage example; not an additional website route. */
export function DemoOne() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <ParticleWave color="#b9beb5" />
      <div className="absolute top-4 left-4 z-10 font-mono text-sm text-foreground/80">
        <p>Particle Wave Animation</p>
        <p className="mt-1 text-xs opacity-60">
          Move your pointer to shift the perspective
        </p>
      </div>
    </div>
  );
}
