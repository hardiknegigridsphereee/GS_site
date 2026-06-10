"use client";

import { useState } from "react";
import Header from "@/components/Header";
import GridSphereSequence from "@/components/GridSphereSequence";
import QuickFeatures from "@/components/QuickFeatures";
import WhoWeAre from "@/components/WhoWeAre";
import CommandCenter from "@/components/CommandCenter";
import ROISection from "@/components/ROISection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustLogos from "@/components/TrustLogos";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="relative bg-[#050505] min-h-screen text-canvas">
      {/* Sticky Header Navigation */}
      <Header />

      {/* Hero Canvas Scroll Sequence */}
      <GridSphereSequence 
        onLoadComplete={() => setIsLoaded(true)} 
      />

      <div className={isLoaded ? "opacity-100" : "opacity-0 transition-opacity duration-1000"}>

        {/* Quick Capabilities Features List */}
        <QuickFeatures />

        {/* Indian Agri-Tech Innovators & Onboarding Steps */}
        <WhoWeAre />

        {/* The Smart Orchard Advantage: Dashboard Cockpit */}
        <CommandCenter />

        {/* Dynamic ROI Metrics & Impact Counters */}
        <ROISection />

        {/* Why Choose Us: Competitive Strengths */}
        <WhyChooseUs />

        {/* Accreditations & Customer Testimonials */}
        <TrustLogos />

        {/* Footer section with contact and sign up details */}
        <Footer />
      </div>
    </main>
  );
}