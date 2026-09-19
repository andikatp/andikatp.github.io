import { useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageTransitionContext } from "./page-transition-context";

interface PageTransitionProviderProps {
  children: ReactNode;
}

export function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [phase, setPhase] = useState<"idle" | "backdrop" | "rising">("idle");
  const [targetPath, setTargetPath] = useState<string | null>(null);

  const navigateWithTransition = (path: string) => {
    if (phase !== "idle") return;
    if (location.pathname === path) return;

    // Bypass page transition for /about modal route
    if (path === "/about") {
      navigate("/about", { state: { backgroundLocation: location } });
      return;
    }
    if (location.pathname === "/about") {
      navigate(path);
      return;
    }

    setTargetPath(path);
    // 1. Show dark modal backdrop over CURRENT page first
    setPhase("backdrop");

    // 2. After 380ms backdrop hold, start the white semicircle arch slide UP
    setTimeout(() => {
      setPhase("rising");

      // 3. At 480ms into rising slide (~860ms total), when covered by white curtain, swap route!
      setTimeout(() => {
        navigate(path);
        window.scrollTo(0, 0);
      }, 480);

      // 4. Complete transition cleanly when arch finishes rising (total ~1250ms)
      setTimeout(() => {
        setPhase("idle");
        setTargetPath(null);
      }, 870);
    }, 380);
  };

  const isAnimating = phase !== "idle";

  return (
    <PageTransitionContext.Provider
      value={{
        isAnimating,
        phase,
        targetPath,
        navigateWithTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}
