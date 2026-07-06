"use client";

import { m } from "framer-motion";
import { ShieldAlert, Droplets, Bug, Bell } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const quickFeatures: Feature[] = [
  {
    icon: <ShieldAlert className="w-6 h-6 text-jade" />,
    title: "Disease Forecast",
    description: "AI-driven algorithms predict disease outbreaks like Fungal Infection 48 hours before they manifest physically."
  },
  {
    icon: <Droplets className="w-6 h-6 text-jade" />,
    title: "Smart Irrigation",
    description: "Optimize water delivery. Irrigate only when soil VWC indices drop below critical crop thresholds."
  },
  {
    icon: <Bug className="w-6 h-6 text-jade" />,
    title: "Pest Prediction",
    description: "Forecast pest populations and mating windows to target spray cycles with total precision."
  },
  {
    icon: <Bell className="w-6 h-6 text-jade" />,
    title: "Mobile Alerts",
    description: "Receive simple, direct agricultural recommendation notifications directly on your phone."
  }
];

export default function QuickFeatures() {
  return (
    <section className="my-12 w-full py-16 px-4 md:px-8 xl:px-16 bg-sage border border-forest/5 md:rounded-[48px] relative z-10 shadow-2xl shadow-forest/10">
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {quickFeatures.map((feature, idx) => (
            <m.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-6 lg:p-7 xl:p-8 bg-white/60 border border-forest/5 rounded-3xl hover:border-jade/20 hover:shadow-lg hover:shadow-jade/5 transition-all duration-300 group overflow-hidden"
            >
              {/* Icon — absolutely pinned to top-right, never affects heading position */}
              <div className="absolute top-6 right-6 lg:top-70 lg:right-7 xl:top-8 xl:right-8 p-2.5 lg:p-3 bg-jade/5 border border-jade/15 rounded-2xl group-hover:bg-jade/10 group-hover:scale-105 transition-all duration-300">
                {feature.icon}
              </div>

              {/* Text — always starts at the same fixed top offset on every card */}
              <div className="space-y-3 lg:space-y-5 pr-14 lg:pr-16 xl:pr-20">
                <h4 className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-black text-forest uppercase group-hover:text-jade transition-colors leading-snug break-normal">
                  {feature.title}
                </h4>
                <p className="text-sm md:text-base lg:text-[15px] xl:text-base text-forest/70 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

