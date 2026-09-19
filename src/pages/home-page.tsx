import MarqueeAbout from "../components/ui/marquee-about";
import { HeroSection } from "../features/hero";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <HeroSection />
      <MarqueeAbout />
    </div>
  );
}
