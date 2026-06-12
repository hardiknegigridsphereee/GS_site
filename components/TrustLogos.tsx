"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "GridSphere has completely changed the way we manage our blocks in Shimla. We predicted a severe Apple Scab infection cycle two days before physical symptoms surfaced, saving our entire harvest.",
    author: "Ramesh Chauhan",
    location: "Shimla, Himachal Pradesh"
  },
  {
    quote: "Receiving direct AI recommendation alerts on WhatsApp has saved us over 30% in pesticide input costs this year. The Solar Station paid for itself in less than a single season.",
    author: "Sunita Sharma",
    location: "Kotgarh, Himachal Pradesh"
  }
];

const certImages = [
  "/DPIIT.webp",
  "/Graphic era.webp",
  "/TBI.webp",
  "/msme1.webp",
  "/startup-india-registration-service.webp"
];

export default function TrustLogos() {
  const [certIndex, setCertIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCertIndex((prev) => (prev + 1) % certImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="my-12 w-full py-24 px-4 md:px-8 xl:px-16 bg-spotify-card border border-canvas/5 md:rounded-[48px] relative z-10 shadow-2xl shadow-black/50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Testimonials */}
        <div className="flex-1">
          {/* Testimonials Title */}
          <div className="text-left mb-12">
            <div className="text-xs font-bold tracking-[0.3em] text-jade uppercase mb-4">
              Grower Feedback
            </div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-canvas uppercase leading-tight">
              Trusted in the Field
            </h2>
          </div>

          {/* Testimonials Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <m.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 bg-black/40 border border-canvas/5 rounded-3xl flex flex-col justify-between relative"
              >
                <Quote className="w-10 h-10 text-jade/10 absolute top-6 right-8 pointer-events-none" />
                <p className="text-sm md:text-base text-spotify-textSec leading-relaxed font-light italic mb-8 relative z-10">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="text-base font-bold text-canvas uppercase tracking-wide">{t.author}</h4>
                  <p className="text-xs text-jade font-semibold">{t.location}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>

        {/* Right Side: Certification Loop Card */}
        <div className="w-full lg:w-[400px] shrink-0 flex flex-col justify-start">
          <div className="text-xs font-bold tracking-[0.3em] text-canvas/50 uppercase mb-8 lg:text-right text-center">
            Recognitions & Accreditations
          </div>
          
          <div className="relative w-full aspect-[4/3] bg-canvas border border-canvas/10 rounded-[40px] overflow-hidden shadow-2xl shadow-black/50 flex items-center justify-center p-8 group">
            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 shadow-inner pointer-events-none z-20 rounded-[40px]" />
            <AnimatePresence mode="wait">
              <m.img
                key={certIndex}
                src={certImages[certIndex]}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-contain relative z-10"
                alt="Certification"
              />
            </AnimatePresence>
            
            {/* Progress indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {certImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === certIndex ? 'w-6 bg-black/60' : 'w-1.5 bg-black/20'}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

