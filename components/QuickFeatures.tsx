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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {quickFeatures.map((feature, idx) => (
            <m.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 bg-white/60 border border-forest/5 rounded-3xl hover:border-jade/20 transition-all duration-300 group flex items-start gap-4"
            >
              <div className="p-3 bg-jade/5 border border-jade/15 rounded-2xl group-hover:bg-jade/10 group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h4 className="text-xl lg:text-2xl font-black text-forest uppercase group-hover:text-jade transition-colors leading-tight">
                  {feature.title}
                </h4>
                <p className="text-sm md:text-base text-forest/70 leading-relaxed font-light">
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

