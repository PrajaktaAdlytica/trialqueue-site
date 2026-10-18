import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
const Context = createContext(null);
export function MotionProvider({ children }) {
  const [paused, setPaused] = useState(false),
    [osReduced, setOsReduced] = useState(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  const still = paused || osReduced;
  useEffect(() => {
    const q = matchMedia("(prefers-reduced-motion: reduce)"),
      f = (e) => setOsReduced(e.matches);
    q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = still ? "off" : "on";
  }, [still]);
  return (
    <Context.Provider value={{ paused, setPaused, osReduced, still }}>
      {children}
    </Context.Provider>
  );
}
export const useMotion = () => useContext(Context);
