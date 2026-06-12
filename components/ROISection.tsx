"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, Droplet, ShieldCheck, Award } from "lucide-react";

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ value, duration = 1.8, suffix = "", prefix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        // Ease out quadratic interpolation
        const easeProgress = progress * (2 - progress);
        const currentVal = Math.floor(easeProgress * value);
        
        setCount(currentVal);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black tracking-tight text-canvas flex items-baseline">
      <span className="text-2xl md:text-3xl font-extrabold text-jade mr-1">{prefix}</span>
      <span>{count}</span>
      <span className="text-2xl md:text-3xl font-extrabold text-jade ml-0.5">{suffix}</span>
    </span>
  );
}

export default function ROISection() {
  return (
    <section className="my-12 w-full py-24 px-4 md:px-8 xl:px-16 bg-spotify-black border border-canvas/5 md:rounded-[48px] relative z-10 overflow-hidden shadow-2xl shadow-black/50">
      {/* Subtle lighting backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-jade/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="text-xs font-bold tracking-[0.3em] text-jade uppercase mb-4">
            Profitability Metrics
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-canvas uppercase mb-6 leading-tight">
            Proven Field Impact
          </h2>
          <p className="text-base md:text-lg text-spotify-textSec max-w-2xl mx-auto font-light leading-relaxed">
            Agricultural intelligence isn't just about ecology—it's about economics. GridSphere eliminates input waste and secures crop output for a rapid return on investment.
          </p>
        </div>

        {/* ROI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Pesticide Savings */}
          <div className="p-8 bg-black/40 border border-canvas/5 rounded-3xl flex flex-col justify-between hover:border-jade/20 transition-all duration-300 group">
            <div>
              <div className="mb-6 p-3 bg-jade/10 w-fit rounded-2xl text-jade group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-canvas mb-3 uppercase">Pesticide Savings</h3>
              <p className="text-sm text-spotify-textSec leading-relaxed font-light">
                Predict pathogen cycles to spray only when needed. Reduce chemical compound applications without risking crop or leaf health.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-canvas/5 flex items-baseline">
              <AnimatedCounter value={30} suffix="%" prefix="-" />
              <span className="text-[10px] text-canvas/40 tracking-wider font-bold uppercase ml-4">Chemical Use</span>
            </div>
          </div>

          {/* Card 2: Increased Profit */}
          <div className="p-8 bg-black/40 border border-canvas/5 rounded-3xl flex flex-col justify-between hover:border-jade/20 transition-all duration-300 group">
            <div>
              <div className="mb-6 p-3 bg-jade/10 w-fit rounded-2xl text-jade group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-canvas mb-3 uppercase">Increased Profit</h3>
              <p className="text-sm text-spotify-textSec leading-relaxed font-light">
                Maximize market-grade packout. Continuous micro-climate telemetry helps growers secure high-quality fruit and boost net revenues.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-canvas/5 flex items-baseline">
              <AnimatedCounter value={50} suffix="%" prefix="+" />
              <span className="text-[10px] text-canvas/40 tracking-wider font-bold uppercase ml-4">Orchard Profit</span>
            </div>
          </div>

          {/* Card 3: Yield Increase */}
          <div className="p-8 bg-black/40 border border-canvas/5 rounded-3xl flex flex-col justify-between hover:border-jade/20 transition-all duration-300 group">
            <div>
              <div className="mb-6 p-3 bg-jade/10 w-fit rounded-2xl text-jade group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-canvas mb-3 uppercase">Yield Increase</h3>
              <p className="text-sm text-spotify-textSec leading-relaxed font-light">
                Prevent disease damage before symptoms surface. Precise canopy microclimate models protect and secure overall harvest volumes.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-canvas/5 flex items-baseline">
              <AnimatedCounter value={15} suffix="%" prefix="+" />
              <span className="text-[10px] text-canvas/40 tracking-wider font-bold uppercase ml-4">Yield Growth</span>
            </div>
          </div>

          {/* Card 4: Equipment ROI */}
          <div className="p-8 bg-black/40 border border-canvas/5 rounded-3xl flex flex-col justify-between hover:border-jade/20 transition-all duration-300 group">
            <div>
              <div className="mb-6 p-3 bg-jade/10 w-fit rounded-2xl text-jade group-hover:scale-110 transition-transform duration-300">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-canvas mb-3 uppercase">Equipment ROI</h3>
              <p className="text-sm text-spotify-textSec leading-relaxed font-light">
                Recover the entire hardware and sensor station investment rapidly through massive input reductions and crop risk prevention.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-canvas/5 flex items-baseline">
              <AnimatedCounter value={3} suffix=" Mo" />
              <span className="text-[10px] text-canvas/40 tracking-wider font-bold uppercase ml-4">Payback Period</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

