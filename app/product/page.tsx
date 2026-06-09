"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CloudRain, ShieldCheck, Cpu, Droplet, Sun, Activity, Target, Layers } from "lucide-react";

export default function ProductPage() {
  return (
    <main className="relative bg-[#050505] min-h-screen text-white overflow-hidden">
      <Header />
      
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#10b981]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="py-24 px-6 md:px-12 text-center max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-sm md:text-base font-black tracking-[0.3em] text-[#10b981] uppercase mb-6">
            Hardware Meets Software
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-tight mb-8">
            Complete Orchard <br className="hidden md:block" /> Intelligence
          </h1>
          <p className="text-lg md:text-2xl text-spotify-textSec leading-relaxed font-light max-w-3xl mx-auto">
            Bridging the gap between the physical master weather array system and its digital interface. Experience seamless integration from raw environmental data to actionable smartphone insights.
          </p>
        </motion.div>
      </section>

      {/* 3-Column Core Interface Showcase */}
      <section className="py-16 px-4 md:px-8 max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row gap-10 items-center justify-center">
          
          {/* Left: Field Protection Interface */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[380px] xl:w-[350px] bg-[#0a0a0a] border border-white/10 rounded-[40px] p-6 shadow-2xl shadow-black relative overflow-hidden"
          >
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl" />
            
            <div className="mt-8 flex justify-between items-center mb-8">
              <span className="text-sm font-bold text-white uppercase tracking-wider">Field Protection</span>
              <ShieldCheck className="w-5 h-5 text-[#10b981]" />
            </div>

            <div className="space-y-6">
              {/* Risk Gauge */}
              <div className="bg-white/5 rounded-3xl p-6 border border-white/5 text-center shadow-inner">
                <span className="text-xs text-white/50 uppercase tracking-widest font-bold">Pest Activity Risk</span>
                <div className="relative w-36 h-36 mx-auto mt-5 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="72" cy="72" r="60" className="stroke-white/5 stroke-[10]" fill="transparent" />
                    <circle cx="72" cy="72" r="60" className="stroke-red-500 stroke-[10]" fill="transparent" strokeDasharray={377} strokeDashoffset={377 * 0.5} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white">50%</span>
                  </div>
                </div>
              </div>

              {/* Specific Threats */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold">Codling Moth</span>
                    <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md">40% Alert</span>
                  </div>
                  <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden"><div className="bg-amber-400 h-full rounded-full w-[40%]" /></div>
                </div>
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold">Aphids</span>
                    <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-md">50% Critical</span>
                  </div>
                  <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden"><div className="bg-red-500 h-full rounded-full w-[50%]" /></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center: Hardware Station Presentation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full xl:flex-1 h-[600px] flex flex-col items-center justify-center relative group"
          >
            {/* Glowing background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />
            
            {/* Abstract Station Representation */}
            <div className="relative z-10 flex flex-col items-center transform transition-transform duration-700 group-hover:scale-105">
              {/* Anemometer top */}
              <div className="w-40 h-20 border-b-[6px] border-white/20 relative flex justify-center">
                <div className="absolute top-0 w-32 h-1.5 border border-white/40 animate-spin" style={{ animationDuration: '4s' }} />
                <div className="w-5 h-full bg-gradient-to-b from-white/80 to-white/20 rounded-t-md shadow-lg" />
              </div>
              {/* Rain Gauge */}
              <div className="w-20 h-16 bg-white/10 rounded-b-2xl border border-white/20 mt-3 backdrop-blur-md shadow-lg" />
              {/* Main Housing */}
              <div className="w-32 h-56 bg-gradient-to-br from-[#111] to-[#222] border border-white/20 rounded-[2rem] mt-6 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.2)] relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                <Cpu className="w-10 h-10 text-[#10b981] mb-3" />
                <span className="text-xs font-black tracking-[0.2em] uppercase text-white/60">GridSphere</span>
                <div className="w-12 h-1 bg-[#10b981]/50 rounded-full mt-4" />
              </div>
              {/* Pole */}
              <div className="w-4 h-64 bg-gradient-to-b from-white/30 to-transparent mt-3 rounded-t-full shadow-inner" />
            </div>

            <div className="absolute bottom-4 text-center bg-black/40 backdrop-blur-md border border-white/10 px-8 py-4 rounded-3xl">
              <span className="text-sm font-bold tracking-[0.3em] text-[#10b981] uppercase block mb-1">The Master Array</span>
              <p className="text-xs text-white/50 max-w-xs mx-auto leading-relaxed">Physical node gathering raw environmental telemetry with aerospace-grade precision.</p>
            </div>
          </motion.div>

          {/* Right: Soil Health Interface */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[380px] xl:w-[350px] bg-[#0a0a0a] border border-white/10 rounded-[40px] p-6 shadow-2xl shadow-black relative overflow-hidden"
          >
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl" />
            
            <div className="mt-8 flex justify-between items-center mb-8">
              <span className="text-sm font-bold text-white uppercase tracking-wider">Soil Health</span>
              <Droplet className="w-5 h-5 text-[#10b981]" />
            </div>

            <div className="space-y-4">
              {/* Primary Metrics Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#10b981]/10 rounded-3xl p-5 border border-[#10b981]/20 text-center">
                  <span className="text-[10px] text-[#10b981] uppercase tracking-widest font-bold">pH Level</span>
                  <div className="text-3xl font-black text-white mt-2">6.5</div>
                </div>
                <div className="bg-white/5 rounded-3xl p-5 border border-white/5 text-center">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">EC (dS/m)</span>
                  <div className="text-3xl font-black text-white mt-2">0.8</div>
                </div>
              </div>

              {/* Carbon */}
              <div className="bg-white/5 rounded-2xl p-5 border border-white/5 flex justify-between items-center">
                <span className="text-xs font-bold text-white/70 uppercase tracking-wide">Organic Carbon</span>
                <span className="text-xl font-black text-white">0.75%</span>
              </div>

              {/* NPK Breakdown */}
              <div className="bg-white/5 rounded-3xl p-5 border border-white/5 space-y-4">
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1 block">Macronutrients (Kg/ha)</span>
                
                <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
                  <span className="text-sm font-bold">Nitrogen (N)</span>
                  <span className="text-base font-black text-[#10b981]">180</span>
                </div>
                <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
                  <span className="text-sm font-bold">Phosphorus (P)</span>
                  <span className="text-base font-black text-[#10b981]">22</span>
                </div>
                <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
                  <span className="text-sm font-bold">Potassium (K)</span>
                  <span className="text-base font-black text-[#10b981]">210</span>
                </div>
              </div>

              {/* Micros */}
              <div className="flex gap-3">
                <div className="flex-1 bg-white/5 rounded-2xl py-3 text-center border border-white/5 text-xs font-bold text-white/50 uppercase tracking-wide">Calcium</div>
                <div className="flex-1 bg-white/5 rounded-2xl py-3 text-center border border-white/5 text-xs font-bold text-white/50 uppercase tracking-wide">Magnesium</div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Core Value Offerings (4 Grid) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="text-sm font-bold tracking-[0.3em] text-[#10b981] uppercase mb-4">Value Proposition</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white">Core Value Offerings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-spotify-card border border-white/5 rounded-[32px] p-8 hover:border-[#10b981]/30 transition-all group">
            <div className="p-4 bg-[#10b981]/5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-8 h-8 text-[#10b981]" />
            </div>
            <h3 className="text-xl font-bold uppercase mb-3 text-white tracking-wide">Data Depth</h3>
            <p className="text-sm text-spotify-textSec leading-relaxed">
              Capture unprecedented resolution with <strong className="text-white">7 Weather Parameters</strong> and <strong className="text-white">14 Soil Parameters</strong> continuously monitored.
            </p>
          </div>
          <div className="bg-spotify-card border border-white/5 rounded-[32px] p-8 hover:border-[#10b981]/30 transition-all group">
            <div className="p-4 bg-[#10b981]/5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8 text-[#10b981]" />
            </div>
            <h3 className="text-xl font-bold uppercase mb-3 text-white tracking-wide">Active Defense</h3>
            <p className="text-sm text-spotify-textSec leading-relaxed">
              Pre-emptive alerts for <strong className="text-white">Fungal Protection</strong> and <strong className="text-white">Pest Protection</strong> before outbreaks structurally manifest.
            </p>
          </div>
          <div className="bg-spotify-card border border-white/5 rounded-[32px] p-8 hover:border-[#10b981]/30 transition-all group">
            <div className="p-4 bg-[#10b981]/5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8 text-[#10b981]" />
            </div>
            <h3 className="text-xl font-bold uppercase mb-3 text-white tracking-wide">Resource Mgmt</h3>
            <p className="text-sm text-spotify-textSec leading-relaxed">
              Achieve precise <strong className="text-white">Spray Timing</strong> optimizations and strictly monitored <strong className="text-white">Soil Health</strong> applications.
            </p>
          </div>
          <div className="bg-spotify-card border border-white/5 rounded-[32px] p-8 hover:border-[#10b981]/30 transition-all group">
            <div className="p-4 bg-[#10b981]/5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-8 h-8 text-[#10b981]" />
            </div>
            <h3 className="text-xl font-bold uppercase mb-3 text-white tracking-wide">Core Tech</h3>
            <p className="text-sm text-spotify-textSec leading-relaxed">
              Driven by Edge Computing, our predictive models are <strong className="text-white">Completely AI Enabled</strong> for zero-latency execution.
            </p>
          </div>
        </div>
      </section>

      {/* Weather Intelligence Capabilities */}
      <section className="py-32 px-6 md:px-12 w-full bg-spotify-card border-y border-white/5 relative z-10 shadow-2xl overflow-hidden">
        <div className="absolute right-0 bottom-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.05),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center relative z-10">
          <div className="flex-1">
            <div className="text-sm font-bold tracking-[0.2em] text-[#10b981] uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#10b981]" /> Microclimate Precision
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-6">
              Weather Intelligence Capabilities
            </h2>
            <p className="text-lg text-spotify-textSec leading-relaxed font-light mb-8 max-w-xl">
              Replacing broad regional forecasts with precise microclimate data specific to individual orchard blocks. The system tracks real-time parameters to eliminate guesswork entirely.
            </p>
          </div>

          <div className="flex-1 w-full space-y-6">
            {/* Atmospheric */}
            <div className="bg-black/60 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors">
              <h4 className="text-[#10b981] text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
                <CloudRain className="w-5 h-5" /> Atmospheric
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Humidity', 'Temperature', 'Light Intensity', 'Pressure', 'Wind', 'Rainfall'].map(p => (
                  <span key={p} className="bg-white/5 hover:bg-white/10 transition-colors text-white text-sm font-medium px-4 py-2 rounded-full border border-white/5">{p}</span>
                ))}
              </div>
            </div>

            {/* Plant-Specific */}
            <div className="bg-black/60 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors">
              <h4 className="text-[#10b981] text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
                <Sun className="w-5 h-5" /> Plant-Specific
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Leaf Wetness'].map(p => (
                  <span key={p} className="bg-white/5 hover:bg-white/10 transition-colors text-white text-sm font-medium px-4 py-2 rounded-full border border-white/5">{p}</span>
                ))}
              </div>
            </div>

            {/* Surface & Depth */}
            <div className="bg-black/60 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors">
              <h4 className="text-[#10b981] text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
                <Layers className="w-5 h-5" /> Surface & Depth
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Surface Temperature', 'Surface Humidity', 'Depth Temperature', 'Depth Humidity'].map(p => (
                  <span key={p} className="bg-white/5 hover:bg-white/10 transition-colors text-white text-sm font-medium px-4 py-2 rounded-full border border-white/5">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
