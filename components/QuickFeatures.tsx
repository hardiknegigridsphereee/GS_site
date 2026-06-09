"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Droplets, Bug, Bell } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const quickFeatures: Feature[] = [
  {
    icon: <ShieldAlert className="w-6 h-6 text-[#10b981]" />,
    title: "Disease Forecast",
    description: "AI-driven algorithms predict disease outbreaks like Apple Scab 48 hours before they manifest physically."
  },
  {
    icon: <Droplets className="w-6 h-6 text-[#10b981]" />,
    title: "Smart Irrigation",
    description: "Optimize water delivery. Irrigate only when soil VWC indices drop below critical crop thresholds."
  },
  {
    icon: <Bug className="w-6 h-6 text-[#10b981]" />,
    title: "Pest Prediction",
    description: "Forecast pest populations and mating windows to target spray cycles with total precision."
  },
  {
    icon: <Bell className="w-6 h-6 text-[#10b981]" />,
    title: "Mobile Alerts",
    description: "Receive simple, direct agricultural recommendation notifications directly on your phone."
  }
];

export default function QuickFeatures() {
  return (
    <section className="my-12 w-full py-16 px-4 md:px-8 xl:px-16 bg-spotify-black border border-white/5 md:rounded-[48px] relative z-10 shadow-2xl shadow-black/50">
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {quickFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 bg-black/30 border border-white/5 rounded-3xl hover:border-[#10b981]/20 transition-all duration-300 group flex items-start gap-4"
            >
              <div className="p-3 bg-[#10b981]/5 border border-[#10b981]/15 rounded-2xl group-hover:bg-[#10b981]/10 group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h4 className="text-xl lg:text-2xl font-black text-white uppercase group-hover:text-[#10b981] transition-colors leading-tight">
                  {feature.title}
                </h4>
                <p className="text-sm md:text-base text-spotify-textSec leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
