import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectShowcase from "@/components/ProjectShowcase";
import InteractiveSection from "@/components/InteractiveSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <CustomCursor />
      
      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <ExperienceTimeline />
      <ProjectShowcase />
      <InteractiveSection />
      <StatsSection />
      <ContactSection />
    </main>
  );
}
