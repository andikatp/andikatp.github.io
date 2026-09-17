import { AnimatePresence } from "motion/react";
import { useLocation, useOutlet } from "react-router-dom";
import PageTransition from "../ui/page-transition";
import Navbar from "./navbar";

export default function MainLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  // Normalize /about to / so inline About modal opens without full page curtain reload
  const transitionKey =
    location.pathname === "/about" ? "/" : location.pathname;

  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      {/* Navbar fixed at top (z-45), above transition curtain (z-35), below About/Work modals (z-60+) */}
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={transitionKey}>
          <main className="flex-1 flex flex-col min-h-screen">
            {outlet}
          </main>
        </PageTransition>
      </AnimatePresence>
    </div>
  );
}
