import { HeroSection } from "../components/home/hero/HeroSection";
import { BenefitsSection } from "../components/home/benefits/BenefitsSection";
import { PreviewSection } from "../components/home/preview/previewSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <PreviewSection />
    </div>
  );
}
