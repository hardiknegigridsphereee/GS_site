"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhoWeAre from "@/components/WhoWeAre";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustLogos from "@/components/TrustLogos";

export default function AboutPage() {
  return (
    <main className="relative bg-[#050505] min-h-screen text-canvas">
      <Header />

      {/* Hero Header */}
      <section className="py-24 px-6 md:px-12 text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-jade/5 blur-[90px] rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="text-xs font-bold tracking-[0.3em] text-jade uppercase">
            About Our Company
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
            Indian Agri-Tech Innovators
          </h1>
          <p className="text-lg md:text-xl text-spotify-textSec leading-relaxed font-light max-w-2xl mx-auto">
            Grid Sphere is pioneering precision agriculture. We combine advanced weather telemetry and specialized machine learning to protect yields and secure the livelihoods of Indian apple growers.
          </p>
        </div>
      </section>

      {/* Onboarding On-Field Steps */}
      <WhoWeAre />

      {/* Value Advantages */}
      <WhyChooseUs />

      {/* Accreditations and testimonies */}
      <TrustLogos />

      <Footer />
    </main>
  );
}
