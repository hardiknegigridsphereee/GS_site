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
    <main className="relative bg-pearl min-h-screen text-forest">
      {/* Sticky Header Navigation */}
      <Header />

      {/* Hero Canvas Scroll Sequence */}
         { !isLoaded && (
          <div className="relative min-h-screen bg-pearl flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 border-t-2 border-jade rounded-full animate-spin" />
                <span className="text-xs text-forest/60 font-light tracking-wider uppercase">
                  Loading
                </span>
              </div>
            </div>
         )}
         <GridSphereSequence 
        onLoadComplete={() => setIsLoaded(true)} 
      />

      <div className={isLoaded ? "opacity-100" : "opacity-0 transition-opacity duration-1000"}>

        {/* Quick Capabilities Features List */}
        <QuickFeatures />

        {/* Indian Agri-Tech Innovators & Onboarding Steps */}
        <WhoWeAre />

        {/* The Smart Field Advantage: Dashboard Cockpit */}
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