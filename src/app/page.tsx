import { HeroSection } from "@/components/hero/hero-section";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { AboutSection } from "@/components/sections/about-section";
import { WorkSection } from "@/components/sections/work-section";
import { QuoteSection } from "@/components/sections/quote-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { LeadershipSection } from "@/components/sections/leadership-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <HashScrollHandler />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <QuoteSection />
      <SkillsSection />
      <LeadershipSection />
      <ContactSection />
    </>
  );
}
