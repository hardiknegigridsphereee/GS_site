"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ShieldCheck,
  Cpu,
  Activity,
  Target,
  Droplet,
  Sun,
  Thermometer,
  Leaf,
  Gauge,
  Wind,
  CloudRain,
} from "lucide-react";

export default function ProductPage() {
  return (
    <main className="relative bg-pearl min-h-screen text-forest">
      <Header />

      {/* Background glow effects — clipped locally so it doesn't break sticky positioning further down the page */}
      <div className="absolute top-0 left-0 right-0 h-[500px] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-jade/5 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="py-24 px-6 md:px-12 text-center max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs font-black tracking-[0.3em] text-jade uppercase mb-6">
            Hardware Meets Software
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-tight mb-8 break-words">
            Complete field <br className="hidden md:block" /> Intelligence
          </h1>
          <p className="text-sm md:text-base text-forest/70 leading-relaxed font-light max-w-3xl mx-auto">
            Bridging the gap between the physical master weather array system and its digital
            interface. Experience seamless integration from raw environmental data to actionable
            smartphone insights.
          </p>
        </motion.div>
      </section>

      {/* 3-Column Core Interface Showcase */}
      <section className="py-16 px-4 md:px-8 max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row gap-10 items-center justify-center">
          {/* Left: Field Protection Interface (real app screenshot) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-[380px] xl:w-[350px] aspect-[9/19]"
          >
            <Image
              src="/product/m1-portrait-scaled.png"
              alt="Grid Sphere app — Field Protection screen"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Center: Real Hardware Product Shot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full xl:flex-1 h-[600px] flex flex-col items-center justify-center relative group"
          >
            {/* Glowing background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />

            {/* Real product image */}
            <div className="relative z-10 w-full h-[480px]">
              <Image
                src="/product/erasebg-transformed-5.png"
                alt="GridSphere weather and soil monitoring station"
                fill
                priority
                className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Right: Soil Health Interface (real app screenshot) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-[380px] xl:w-[350px] aspect-[9/19]"
          >
            <Image
              src="/product/m5-portrait-scaled.png"
              alt="Grid Sphere app — Soil Health screen"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Core Value Offerings (4 Grid) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="text-xs font-bold tracking-[0.3em] text-jade uppercase mb-4">
            Value Proposition
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase text-forest">
            Core Value Offerings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-sage border border-forest/5 rounded-[32px] p-8 hover:border-jade/30 transition-all group">
            <div className="p-4 bg-jade/5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-8 h-8 text-jade" />
            </div>
            <h3 className="text-lg font-bold uppercase mb-3 text-forest tracking-wide">Data Depth</h3>
            <p className="text-xs md:text-sm text-forest/70 leading-relaxed">
              Capture unprecedented resolution with{" "}
              <strong className="text-forest">7 Weather Parameters</strong> and{" "}
              <strong className="text-forest">14 Soil Parameters</strong> continuously monitored.
            </p>
          </div>
          <div className="bg-sage border border-forest/5 rounded-[32px] p-8 hover:border-jade/30 transition-all group">
            <div className="p-4 bg-jade/5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8 text-jade" />
            </div>
            <h3 className="text-lg font-bold uppercase mb-3 text-forest tracking-wide">Active Defense</h3>
            <p className="text-xs md:text-sm text-forest/70 leading-relaxed">
              Pre-emptive alerts for <strong className="text-forest">Fungal Protection</strong> and{" "}
              <strong className="text-forest">Pest Protection</strong> before outbreaks structurally
              manifest.
            </p>
          </div>
          <div className="bg-sage border border-forest/5 rounded-[32px] p-8 hover:border-jade/30 transition-all group">
            <div className="p-4 bg-jade/5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8 text-jade" />
            </div>
            <h3 className="text-lg font-bold uppercase mb-3 text-forest tracking-wide">Resource Mgmt</h3>
            <p className="text-xs md:text-sm text-forest/70 leading-relaxed">
              Achieve precise <strong className="text-forest">Spray Timing</strong> optimizations and
              strictly monitored <strong className="text-forest">Soil Health</strong> applications.
            </p>
          </div>
          <div className="bg-sage border border-forest/5 rounded-[32px] p-8 hover:border-jade/30 transition-all group">
            <div className="p-4 bg-jade/5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-8 h-8 text-jade" />
            </div>
            <h3 className="text-lg font-bold uppercase mb-3 text-forest tracking-wide">Core Tech</h3>
            <p className="text-xs md:text-sm text-forest/70 leading-relaxed">
              Driven by Edge Computing, our predictive models are{" "}
              <strong className="text-forest">Completely AI Enabled</strong> for zero-latency execution.
            </p>
          </div>
        </div>
      </section>

      {/* Weather Intelligence Capabilities - FIXED VERSION */}
      <section className="py-24 px-6 md:px-12 w-full bg-sage border-y border-forest/5 relative z-10">
        <div className="absolute right-0 bottom-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.05),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:items-start relative z-10">
          <div className="flex-1">
            <div className="text-xs font-bold tracking-[0.2em] text-jade uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-jade" /> Microclimate Precision
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-forest uppercase leading-tight mb-6">
              Weather Intelligence Capabilities
            </h2>
            <p className="text-sm md:text-base text-forest/70 leading-relaxed font-light max-w-xl mb-10">
              Replacing broad regional forecasts with precise microclimate data specific to individual
              field blocks. The system tracks real-time parameters to eliminate guesswork entirely.
            </p>

            {/* REMOVED max-w-xl FROM THIS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-9">
              {[
                { label: "Humidity", Icon: Droplet },
                { label: "Light Intensity", Icon: Sun },
                { label: "Temperature", Icon: Thermometer },
                { label: "Leaf Wetness", Icon: Leaf },
                { label: "Pressure", Icon: Gauge },
                { label: "Wind", Icon: Wind },
                { label: "Rainfall", Icon: CloudRain },
                { label: "Surface Temperature", Icon: Thermometer },
                { label: "Surface Humidity", Icon: Droplet },
                { label: "Depth Temperature", Icon: Thermometer },
                { label: "Depth Humidity", Icon: Droplet },
              ].map(({ label, Icon }) => (
                <div key={label} className="flex flex-col items-start gap-3">
                  <div className="w-16 h-16 rounded-xl bg-jade/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-jade" />
                  </div>
                  <span className="text-sm font-bold text-forest leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-[300px] md:w-[380px] aspect-[462/840]">
              <Image
                src="/product/m1-portrait-scaled-removebg-preview.png"
                alt="Grid Sphere app — live Field Conditions"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}