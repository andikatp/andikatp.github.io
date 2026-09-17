import { useLocation, useNavigate } from "react-router-dom";
import MarqueeAbout from "../components/ui/marquee-about";
import { AboutSection } from "../features/about";
import { HeroSection } from "../features/hero";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAboutOpen = location.pathname === "/about";

  const handleCloseAbout = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col flex-1 justify-between overflow-hidden relative">
      <HeroSection />
      <MarqueeAbout />
      <AboutSection isOpen={isAboutOpen} onClose={handleCloseAbout} />
    </div>
  );
}
