import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import InteractiveSection from "@/components/InteractiveSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import ParallaxEnvironment from "@/components/ParallaxEnvironment";
import ScrollParallaxOverlay from "@/components/ScrollParallaxOverlay";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary/30">
      <ParallaxEnvironment />
      <CustomCursor />
      <ScrollProgress />
      <ScrollParallaxOverlay />

      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceTimeline />
        <InteractiveSection />
        <StatsSection />
        <ContactSection />
      </div>
    </main>
  );
}
