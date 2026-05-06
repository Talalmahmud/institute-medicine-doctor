import ConsultationPanel from "@/components/shared/ConsultationPanel";
import DoctorSection from "@/components/shared/DoctorSection";
import Features from "@/components/shared/Features";
import FlowSteps from "@/components/shared/FlowSteps";
import Hero from "@/components/shared/Hero";
import RefundPolicy from "@/components/shared/RefundPolicy";
import Shop from "@/components/shared/Shop";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      {/* <Stats /> */}
      {/* <DoctorSection /> */}
      <FlowSteps />
      <ConsultationPanel />
      <Features />
      <RefundPolicy />
      <Shop />
    </main>
  );
}
