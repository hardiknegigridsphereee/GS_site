"use client";

import { m } from "framer-motion";
import { Sparkles, Hammer, TrendingUp } from "lucide-react";

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const onboardingSteps: Step[] = [
  {
    number: "01",
    icon: <Sparkles className="w-5 h-5 text-black" />,
    title: "Discover & Consult",
    description: "We evaluate your field's microclimate zone, block distribution, soil variance, and historical disease pressures."
  },
  {
    number: "02",
    icon: <Hammer className="w-5 h-5 text-black" />,
    title: "Install & Integrate",
    description: "We deploy the solar-powered GridSphere weather station directly in your field blocks, syncing sensors instantly."
  },
  {
    number: "03",
    icon: <TrendingUp className="w-5 h-5 text-black" />,
    title: "Monitor & Profit",
    description: "Access live crop models, receive smart advice alerts on your mobile phone, and track immediate chemical savings."
  }
];

export default function WhoWeAre() {
  return (
    <section className="my-12 w-full py-24 px-4 md:px-8 xl:px-16 bg-sage border border-forest/5 md:rounded-[48px] relative z-10 overflow-hidden shadow-2xl shadow-forest/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div className="max-w-3xl">
            <div className="text-sm md:text-lg font-black tracking-[0.2em] text-jade uppercase mb-4">
              Indian Agri-Tech Innovators
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-forest leading-tight uppercase">
              Your Field's Guardian
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-base md:text-lg text-forest/70 leading-relaxed font-light">
              We combine robust meteorological hardware with custom disease prediction algorithms to secure field output, eliminate input guesswork, and maximize bottom-line profit.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Subtle joining horizontal line on desktop */}
          <div className="absolute top-[32px] left-[5%] right-[5%] h-[1px] bg-forest/5 hidden md:block z-0" />
          
          {onboardingSteps.map((step, idx) => (
            <m.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left group"
            >
              {/* Step indicator bubble */}
              <div className="w-16 h-16 rounded-full bg-jade flex items-center justify-center mb-6 shadow-lg shadow-jade/25 group-hover:scale-105 transition-transform duration-300">
                {step.icon}
              </div>
              
              <div className="text-xs md:text-sm font-black tracking-widest text-jade mb-2 uppercase font-mono">
                Step {step.number}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-forest mb-4 uppercase group-hover:text-jade transition-colors leading-tight">
                {step.title}
              </h3>
              <p className="text-sm md:text-base text-forest/70 leading-relaxed font-light max-w-sm">
                {step.description}
              </p>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}

