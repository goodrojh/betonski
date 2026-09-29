"use client";
import { LeadProvider } from "@/components/site/LeadModal";
import Hero from "@/components/site/Hero";
import Ticker from "@/components/site/Ticker";
import WhyConcrete from "@/components/site/WhyConcrete";
import Services from "@/components/site/Services";
import Calculator from "@/components/site/Calculator";
import Textures from "@/components/site/Textures";
import BeforeAfter from "@/components/site/BeforeAfter";
import Process from "@/components/site/Process";
import Guarantees from "@/components/site/Guarantees";
import Pricing from "@/components/site/Pricing";
import Works from "@/components/site/Works";
import FAQ from "@/components/site/FAQ";
import Footer from "@/components/site/Footer";
import QuickActions from "@/components/site/QuickActions";

export default function Home() {
  return (
    <LeadProvider>
      <main className="min-h-screen overflow-x-clip">
        <Hero />
        <Ticker />
        <WhyConcrete />
        <Services />
        <Calculator />
        <Textures />
        <BeforeAfter />
        <Process />
        <Guarantees />
        <Pricing />
        <Works />
        <FAQ />
        <Footer />
      </main>
      <QuickActions />
    </LeadProvider>
  );
}
