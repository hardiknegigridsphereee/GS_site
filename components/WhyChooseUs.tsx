"use client";

import { m } from "framer-motion";
import { Cpu, DollarSign, Sprout, HeartHandshake } from "lucide-react";

interface CardItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const advantages: CardItem[] = [
  {
    icon: <Cpu className="w-6 h-6 text-jade" />,
    title: "AI-Powered Insights",
    description: "GridSphere does not just read the weather—it understands it. Custom machine-learning models predict biological disease risks calibrated to your field's exact location."
  },
  {
    icon: <DollarSign className="w-6 h-6 text-jade" />,
    title: "Proven Savings",
    description: "Our growers report an average 30% reduction in chemical spray application bills and 40% reduction in irrigation pumping energy bills in their first season."
  },
  {
    icon: <Sprout className="w-6 h-6 text-jade" />,
    title: "Maximized Yields",
    description: "By identifying moisture and thermal stress windows in advance, GridSphere prevents plant stomatal shutdown, helping crop trees focus energy on fruit sizing."
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-jade" />,
    title: "24/7 Support & Monitoring",
    description: "We handle station connectivity, battery diagnostics, and continuous cloud telemetry sync. We are active around the clock so your field monitoring never drops."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="my-12 w-full py-24 px-4 md:px-8 xl:px-16 bg-sage border border-forest/5 md:rounded-[48px] relative z-10 shadow-2xl shadow-forest/10">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="text-xs font-bold tracking-[0.3em] text-jade uppercase mb-4">
            Our Advantage
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-forest uppercase mb-6 leading-tight">
            Why Choose GridSphere?
          </h2>
          <p className="text-sm md:text-base text-forest/70 max-w-xl mx-auto font-light leading-relaxed">
            We bridge the gap between heavy hardware instrumentation and actionable farmer alerts, turning raw weather parameters into concrete field profits.
          </p>
        </m.div>

        {/* Advantage Grid */}
        <m.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {advantages.map((item) => (
            <m.div
              key={item.title}
              variants={cardVariants}
              className="p-8 bg-white/80 border border-forest/5 rounded-3xl hover:border-jade/20 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start group"
            >
              <div className="p-4 bg-jade/5 border border-jade/15 rounded-2xl group-hover:bg-jade/15 group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                {item.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-forest uppercase group-hover:text-jade transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-forest/70 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>

      </div>
    </section>
  );
}

