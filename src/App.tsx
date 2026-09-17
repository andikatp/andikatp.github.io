import { AnimatePresence } from "motion/react";
import { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/main-layout";
import Preloader from "./components/ui/preloader";

import HomePage from "./pages/home-page";
import WorksPage from "./pages/works-page";
import ContactPage from "./pages/contact-page";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Suspense fallback={null}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<HomePage />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
