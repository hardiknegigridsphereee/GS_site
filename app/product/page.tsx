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
} from "lucide-react";

const coreValues = [
  {
    Icon: Activity,
    title: "Data Depth",
    desc: (
      <>
        Capture unprecedented resolution with{" "}
        <strong className="text-forest">7 Weather Parameters</strong> and{" "}
        <strong className="text-forest">14 Soil Parameters</strong> continuously monitored.
      </>
    ),
  },
  {
    Icon: ShieldCheck,
    title: "Active Defense",
    desc: (
      <>
        Pre-emptive alerts for <strong className="text-forest">Fungal Protection</strong> and{" "}
        <strong className="text-forest">Pest Protection</strong> before outbreaks structurally
        manifest.
      </>
    ),
  },
  {
    Icon: Target,
    title: "Resource Mgmt",
    desc: (
      <>
        Achieve precise <strong className="text-forest">Spray Timing</strong> optimizations and
        strictly monitored <strong className="text-forest">Soil Health</strong> applications.
      </>
    ),
  },
  {
    Icon: Cpu,
    title: "Core Tech",
    desc: (
      <>
        Driven by Edge Computing, our predictive models are{" "}
        <strong className="text-forest">Completely AI Enabled</strong> for zero-latency execution.
      </>
    ),
  },
];

const weatherParams = [
  { label: "Humidity", emoji: "💧" },
  { label: "Light Intensity", emoji: "☀️" },
  { label: "Temperature", emoji: "🌡️" },
  { label: "Leaf Wetness", emoji: "🍃" },
  { label: "Pressure", emoji: "📊" },
  { label: "Wind", emoji: "💨" },
  { label: "Rainfall", emoji: "🌧️" },
  { label: "Surface Temperature", emoji: "🌡️" },
  { label: "Surface Humidity", emoji: "💧" },
  { label: "Depth Temperature", emoji: "🌡️" },
  { label: "Depth Humidity", emoji: "💧" },
];

export default function ProductPage() {
  return (
    <main className="relative bg-pearl min-h-screen text-forest">
      <Header />

      {/* Background glow effects — clipped locally so it doesn't break sticky positioning further down the page */}
      <div className="absolute top-0 left-0 right-0 h-[500px] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-jade/5 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="py-6 md:py-8 px-6 md:px-12 text-center max-w-5xl mx-auto relative z-10">
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
      <section className="px-4 md:px-8 max-w-[1600px] mx-auto relative z-10 py-10">
        {/* Ambient background texture for this section */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(16,185,129,0.08),transparent_65%)] rounded-full" />
        </div>

        <div className="flex flex-col xl:flex-row gap-6 xl:gap-0 items-center justify-center">
          {/* Left: Field Protection Interface (real app screenshot) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-[300px] xl:w-[360px] aspect-[9/19] xl:translate-y-6 xl:-mr-14 z-10"
            style={{ filter: "drop-shadow(0 25px 35px rgba(16,42,32,0.25))" }}
          >
            <Image
              src="/product/m1-portrait-scaled.webp"
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
            transition={{ duration: 0.7 }}
            className="w-full xl:w-[560px] h-[620px] flex flex-col items-center justify-center relative group z-20"
          >
            {/* Grounding platform glow beneath product */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[360px] h-[70px] bg-jade/20 blur-2xl rounded-full" />
            {/* Glowing background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_60%)] pointer-events-none" />

            {/* Real product image */}
            <div className="relative z-5 w-full h-[580px]">
              <Image
                src="/product/erasebg-transformed-5.webp"
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
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-[300px] xl:w-[360px] aspect-[9/19] xl:translate-y-6 xl:-ml-14 z-10"
            style={{ filter: "drop-shadow(0 25px 35px rgba(16,42,32,0.25))" }}
          >
            <Image
              src="/product/m5-portrait-scaled.webp"
              alt="Grid Sphere app — Soil Health screen"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Core Value Offerings (4 Grid) */}
      <section className="py-10 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-3"
        >
          <div className="text-xs font-bold tracking-[0.3em] text-jade uppercase mb-1">
            Value Proposition
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase text-forest">
            Core Value Offerings
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map(({ Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="bg-sage border border-forest/5 rounded-[32px] p-8 hover:border-jade/30 transition-all group"
            >
              <div className="p-4 bg-jade/5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-8 h-8 text-jade" />
              </div>
              <h3 className="text-lg font-bold uppercase mb-3 text-forest tracking-wide">{title}</h3>
              <p className="text-xs md:text-sm text-forest/70 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Weather Intelligence Capabilities */}
      <section className="py-20 md:py-28 px-6 md:px-12 w-full bg-sage border-y border-forest/5 relative z-10">
        <div className="absolute right-0 bottom-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.05),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-6 lg:items-start relative z-10">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-xs font-bold tracking-[0.2em] text-jade uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-jade" /> Microclimate Precision
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-forest uppercase leading-tight mb-6">
                Weather Intelligence Capabilities
              </h2>
              <p className="text-sm md:text-base text-forest/70 leading-relaxed font-light max-w-xl mb-14">
                Replacing broad regional forecasts with precise microclimate data specific to individual
                field blocks. The system tracks real-time parameters to eliminate guesswork entirely.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-6 justify-items-center sm:justify-items-start">
              {weatherParams.map(({ label, emoji }, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center w-24 gap-2.5 group cursor-pointer"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.15,
                    }}
                    whileHover={{
                      scale: 1.12,
                      boxShadow: "0 12px 28px rgba(16,185,129,0.3)",
                    }}
                    className="w-[68px] h-[68px] rounded-2xl bg-white/70 border border-jade/10 shadow-sm flex items-center justify-center transition-colors text-3xl backdrop-blur-sm"
                  >
                    <span className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 inline-block drop-shadow-sm">
                      {emoji}
                    </span>
                  </motion.div>
                  <span className="text-xs md:text-sm font-bold text-forest leading-snug min-h-[2.25rem] flex items-center text-center group-hover:text-jade transition-colors">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center lg:justify-end relative mt-4 lg:mt-0 lg:pr-10 xl:pr-16"
          >
            <div className="absolute top-1/2 right-8 lg:right-16 -translate-y-1/2 w-[340px] h-[500px] xl:w-[400px] xl:h-[560px] bg-jade/10 rounded-[48px] blur-2xl pointer-events-none" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-24 lg:translate-x-0 w-[260px] h-[50px] bg-jade/25 blur-2xl rounded-full pointer-events-none" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[320px] xl:w-[400px] aspect-[9/19] rotate-3"
              style={{ filter: "drop-shadow(0 30px 40px rgba(16,42,32,0.3))" }}
            >
              <Image
                src="/product/m1-portrait-scaled-removebg-preview.webp"
                alt="Grid Sphere app — live Field Conditions"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
