import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/main-layout";
import Preloader from "./components/ui/preloader";

import ContactPage from "./pages/contact-page";
import HomePage from "./pages/home-page";
import WorksPage from "./pages/works-page";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
