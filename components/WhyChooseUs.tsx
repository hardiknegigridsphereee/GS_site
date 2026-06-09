"use client";

import { motion } from "framer-motion";
import { Cpu, DollarSign, Sprout, HeartHandshake } from "lucide-react";

interface CardItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const advantages: CardItem[] = [
  {
    icon: <Cpu className="w-6 h-6 text-[#10b981]" />,
    title: "AI-Powered Insights",
    description: "GridSphere does not just read the weather—it understands it. Custom machine-learning models predict biological disease risks calibrated to your field's exact location."
  },
  {
    icon: <DollarSign className="w-6 h-6 text-[#10b981]" />,
    title: "Proven Savings",
    description: "Our growers report an average 30% reduction in chemical spray application bills and 40% reduction in irrigation pumping energy bills in their first season."
  },
  {
    icon: <Sprout className="w-6 h-6 text-[#10b981]" />,
    title: "Maximized Yields",
    description: "By identifying moisture and thermal stress windows in advance, GridSphere prevents plant stomatal shutdown, helping apple trees focus energy on fruit sizing."
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-[#10b981]" />,
    title: "24/7 Support & Monitoring",
    description: "We handle station connectivity, battery diagnostics, and continuous cloud telemetry sync. We are active around the clock so your orchard monitoring never drops."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="my-12 w-full py-24 px-4 md:px-8 xl:px-16 bg-spotify-black border border-white/5 md:rounded-[48px] relative z-10 shadow-2xl shadow-black/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="text-xs font-bold tracking-[0.3em] text-[#10b981] uppercase mb-4">
            Our Advantage
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase mb-6 leading-tight">
            Why Choose GridSphere?
          </h2>
          <p className="text-sm md:text-base text-spotify-textSec max-w-xl mx-auto font-light leading-relaxed">
            We bridge the gap between heavy hardware instrumentation and actionable farmer alerts, turning raw weather parameters into concrete orchard profits.
          </p>
        </div>

        {/* Advantage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 bg-black/40 border border-white/5 rounded-3xl hover:border-[#10b981]/20 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start group"
            >
              <div className="p-4 bg-[#10b981]/5 border border-[#10b981]/15 rounded-2xl group-hover:bg-[#10b981]/15 group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                {item.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white uppercase group-hover:text-[#10b981] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-spotify-textSec leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
