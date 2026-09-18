import { AnimatePresence } from "motion/react";
import { useLocation, useOutlet } from "react-router-dom";
import PageTransition from "../ui/page-transition";
import Navbar from "./navbar";

export default function MainLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  const transitionKey =
    location.pathname === "/about" ? "/" : location.pathname;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={transitionKey}>
          <main className="flex flex-col flex-1">{outlet}</main>
        </PageTransition>
      </AnimatePresence>
    </div>
  );
}
