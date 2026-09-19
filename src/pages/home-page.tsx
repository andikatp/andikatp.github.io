import { AboutMarquee } from "../features/about";
import { HeroSection } from "../features/hero";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <HeroSection />
      <AboutMarquee />
    </div>
  );
}
