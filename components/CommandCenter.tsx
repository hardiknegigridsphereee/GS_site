"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Thermometer, 
  Droplet, 
  Wind, 
  ShieldAlert, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  CloudRain, 
  Sun, 
  Sparkles, 
  Layers
} from "lucide-react";

interface BlockData {
  id: string;
  name: string;
  cropName: string;
  status: string;
  statusColor: string;
  health: number;
  appleScabRisk: number;
  fireBlightRisk: number;
  powderyMildewRisk: number;
  soilMoisture: number;
  soilMoistureStatus: string;
  soilMoistureColor: string;
  waterStress: string;
  waterStressColor: string;
  temp: string;
  humidity: string;
  wind: string;
  solar: string;
  recommendation: string;
  recommendationStatus: string;
  recommendationIcon: "Check" | "Warning" | "Critical";
}

const blocksData: Record<string, BlockData> = {
  blockA: {
    id: "blockA",
    name: "Block A - Honeycrisp",
    cropName: "Honeycrisp Apple Block",
    status: "Optimal Status",
    statusColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    health: 94,
    appleScabRisk: 12,
    fireBlightRisk: 8,
    powderyMildewRisk: 15,
    soilMoisture: 41,
    soilMoistureStatus: "Ideal (Target 38-42%)",
    soilMoistureColor: "bg-emerald-500",
    waterStress: "Low",
    waterStressColor: "text-emerald-400 bg-emerald-500/10",
    temp: "21.8°C",
    humidity: "64.1%",
    wind: "3.5 km/h",
    solar: "680 W/m²",
    recommendation: "All vital metrics are stable. Soil moisture levels are hovering within target parameters. Crop disease vulnerability index remains low. No operational intervention required at this time.",
    recommendationStatus: "System Cleared",
    recommendationIcon: "Check"
  },
  blockB: {
    id: "blockB",
    name: "Block B - Gala Apples",
    cropName: "Gala Apple Block",
    status: "Critical Intervention",
    statusColor: "text-red-400 border-honey/20 bg-honey/10",
    health: 68,
    appleScabRisk: 72,
    fireBlightRisk: 14,
    powderyMildewRisk: 32,
    soilMoisture: 34,
    soilMoistureStatus: "Deficient (Target 38-42%)",
    soilMoistureColor: "bg-amber",
    waterStress: "Moderate",
    waterStressColor: "text-amber-400 bg-amber/10",
    temp: "23.1°C",
    humidity: "82.3%",
    wind: "4.8 km/h",
    solar: "720 W/m²",
    recommendation: "CRITICAL: Microclimate humidity (82.3%) and leaf wetness match spore germination curves. Apply organic fungicide spray window tomorrow between 06:00 and 09:00 (optimal wind conditions < 5km/h). Delay irrigation: 4.5mm rain expected at 18:00.",
    recommendationStatus: "Critical Spray Advisory",
    recommendationIcon: "Critical"
  },
  blockC: {
    id: "blockC",
    name: "Block C - Bartlett Pears",
    cropName: "Bartlett Pear Block",
    status: "Irrigation Warning",
    statusColor: "text-amber-400 border-amber/20 bg-amber/10",
    health: 79,
    appleScabRisk: 22,
    fireBlightRisk: 48,
    powderyMildewRisk: 10,
    soilMoisture: 31,
    soilMoistureStatus: "Critical (Target 38-42%)",
    soilMoistureColor: "bg-honey",
    waterStress: "High Stress",
    waterStressColor: "text-red-400 bg-honey/10",
    temp: "24.5°C",
    humidity: "48.2%",
    wind: "18.2 km/h",
    solar: "810 W/m²",
    recommendation: "WARNING: Soil moisture has dropped to 31%, entering critical root stress zone. Trigger Block C irrigation zone immediately to prevent stomatal closure. Delay chemical treatments: wind speed (18.2 km/h) exceeds safe spray limits.",
    recommendationStatus: "Irrigation Priority",
    recommendationIcon: "Warning"
  }
};

export default function CommandCenter() {
  const [selectedBlock, setSelectedBlock] = useState<string>("blockB");
  const block = blocksData[selectedBlock];

  return (
    <section className="my-12 w-full py-24 px-4 md:px-8 xl:px-16 bg-spotify-card border border-canvas/5 md:rounded-[48px] relative z-10 animate-fade-in shadow-2xl shadow-black/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-sm md:text-xl font-black tracking-[0.2em] text-jade uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-jade animate-pulse" />
              The Smart Orchard Advantage
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-canvas leading-tight mb-4">
              Crop Intelligence Cockpit
            </h2>
            <p className="text-base md:text-lg text-spotify-textSec max-w-2xl font-light leading-relaxed">
              Switch between orchard zones to view live sensor telemetry, automated disease models, and AI intervention windows.
            </p>
          </div>
          
          {/* Tabs for Block Selection */}
          <div className="flex flex-wrap p-1.5 bg-canvas/5 rounded-2xl border border-canvas/5 self-start md:self-auto">
            {Object.values(blocksData).map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBlock(b.id)}
                className={`px-6 py-3 rounded-xl text-sm md:text-base font-black tracking-wider uppercase transition-all duration-300 ${
                  selectedBlock === b.id 
                    ? "bg-jade text-black shadow-lg shadow-jade/25" 
                    : "text-spotify-textSec hover:text-canvas"
                }`}
              >
                {b.name.split(" - ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Column 1: Health & Telemetry Summary (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Block Summary Card */}
            <div className="bg-black/40 border border-canvas/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden flex-1 min-h-[300px]">
              {/* Grid glow background effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_70%)] pointer-events-none" />
              
              <div className="relative z-10 w-full flex flex-col items-center">
                <span className={`text-[10px] font-bold tracking-widest uppercase border px-3 py-1 rounded-full mb-6 ${block.statusColor}`}>
                  {block.status}
                </span>

                {/* Circular Gauge */}
                <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                  {/* Outer ring */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="64" 
                      className="stroke-white/5 stroke-[6]"
                      fill="transparent"
                    />
                    <m.circle 
                      cx="72" 
                      cy="72" 
                      r="64" 
                      className="stroke-jade stroke-[6]"
                      fill="transparent"
                      strokeDasharray={402}
                      initial={{ strokeDashoffset: 402 }}
                      animate={{ strokeDashoffset: 402 - (402 * block.health) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Score text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-canvas">{block.health}%</span>
                    <span className="text-[9px] font-bold text-canvas/40 tracking-wider uppercase">Health Score</span>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-canvas mb-1">{block.name}</h4>
                <p className="text-xs text-jade font-semibold tracking-widest uppercase">{block.cropName}</p>
              </div>
            </div>

            {/* Environmental Sensors array */}
            <div className="bg-black/40 border border-canvas/5 rounded-3xl p-6">
              <h5 className="text-xs font-bold tracking-widest text-canvas/40 uppercase mb-4 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-jade" /> Live Sensors Array
              </h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-canvas/5 border border-canvas/5 p-4 rounded-2xl flex items-center gap-3">
                  <div className="p-2 bg-jade/10 text-jade rounded-lg">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-canvas/40 block uppercase tracking-wider">Air Temp</span>
                    <span className="text-sm font-bold text-canvas">{block.temp}</span>
                  </div>
                </div>
                <div className="bg-canvas/5 border border-canvas/5 p-4 rounded-2xl flex items-center gap-3">
                  <div className="p-2 bg-jade/10 text-jade rounded-lg">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-canvas/40 block uppercase tracking-wider">Humidity</span>
                    <span className="text-sm font-bold text-canvas">{block.humidity}</span>
                  </div>
                </div>
                <div className="bg-canvas/5 border border-canvas/5 p-4 rounded-2xl flex items-center gap-3">
                  <div className="p-2 bg-jade/10 text-jade rounded-lg">
                    <Wind className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-canvas/40 block uppercase tracking-wider">Wind</span>
                    <span className="text-sm font-bold text-canvas">{block.wind}</span>
                  </div>
                </div>
                <div className="bg-canvas/5 border border-canvas/5 p-4 rounded-2xl flex items-center gap-3">
                  <div className="p-2 bg-jade/10 text-jade rounded-lg">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-canvas/40 block uppercase tracking-wider">Solar Radiation</span>
                    <span className="text-sm font-bold text-canvas">{block.solar}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Disease Models & Soil Moisture (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Disease Prediction Engine */}
            <div className="bg-black/40 border border-canvas/5 rounded-3xl p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h5 className="text-xs font-bold tracking-widest text-canvas/40 uppercase flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-jade" /> AI Pathogen Matrices
                  </h5>
                  <span className="text-[9px] bg-canvas/5 border border-canvas/5 text-canvas/60 px-2 py-0.5 rounded-md font-medium uppercase">
                    Confidence: 95%
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Apple Scab */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-canvas/80 font-medium">Apple Scab</span>
                      <span className={`font-bold ${block.appleScabRisk > 50 ? "text-red-400" : "text-canvas/60"}`}>{block.appleScabRisk}% Risk</span>
                    </div>
                    <div className="w-full bg-canvas/5 h-2 rounded-full overflow-hidden">
                      <m.div 
                        className={`h-full rounded-full ${block.appleScabRisk > 50 ? "bg-honey" : "bg-jade"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${block.appleScabRisk}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Fire Blight */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-canvas/80 font-medium">Fire Blight</span>
                      <span className={`font-bold ${block.fireBlightRisk > 40 ? "text-amber-400" : "text-canvas/60"}`}>{block.fireBlightRisk}% Risk</span>
                    </div>
                    <div className="w-full bg-canvas/5 h-2 rounded-full overflow-hidden">
                      <m.div 
                        className={`h-full rounded-full ${block.fireBlightRisk > 40 ? "bg-amber" : "bg-jade"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${block.fireBlightRisk}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Powdery Mildew */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-canvas/80 font-medium">Powdery Mildew</span>
                      <span className="font-bold text-canvas/60">{block.powderyMildewRisk}% Risk</span>
                    </div>
                    <div className="w-full bg-canvas/5 h-2 rounded-full overflow-hidden">
                      <m.div 
                        className="h-full rounded-full bg-jade"
                        initial={{ width: 0 }}
                        animate={{ width: `${block.powderyMildewRisk}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-canvas/5 pt-5 mt-6 flex gap-3 items-start bg-jade/5 p-4 rounded-2xl border border-jade/10">
                <ShieldAlert className="w-5 h-5 text-jade flex-shrink-0 mt-0.5 animate-pulse" />
                <p className="text-[11px] text-canvas/60 leading-relaxed">
                  <strong>Disease Threat Engine:</strong> Predicts fungal sporulation risks based on hours of continuous leaf wetness, relative humidity, and air temperature shift patterns.
                </p>
              </div>
            </div>

            {/* Soil Moisture & Water Stress */}
            <div className="bg-black/40 border border-canvas/5 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold tracking-widest text-canvas/40 uppercase mb-5 flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-jade" /> Soil Hydrology & Stress
                </h5>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <span className="text-[10px] text-canvas/40 block uppercase tracking-wider mb-1">Soil Moisture</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-canvas">{block.soilMoisture}%</span>
                      <span className="text-[10px] text-canvas/50">VWC</span>
                    </div>
                    <span className="text-[10px] text-canvas/40 block mt-1">{block.soilMoistureStatus}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-canvas/40 block uppercase tracking-wider mb-1">Water Stress Index</span>
                    <span className={`text-base font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full inline-block mt-1 ${block.waterStressColor}`}>
                      {block.waterStress}
                    </span>
                  </div>
                </div>

                {/* Progress bar container */}
                <div className="w-full bg-canvas/5 h-3 rounded-full relative overflow-hidden flex">
                  {/* Ideal zone markers */}
                  <div className="absolute left-[38%] right-[42%] top-0 bottom-0 bg-jade/20 border-l border-r border-jade/30 z-10 pointer-events-none" />
                  
                  {/* Indicator bar */}
                  <m.div 
                    className={`h-full rounded-full ${block.soilMoistureColor}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${block.soilMoisture}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between text-[8px] text-canvas/30 font-bold uppercase tracking-widest mt-1.5">
                  <span>0% Dry</span>
                  <span className="text-jade">38-42% Target Range</span>
                  <span>100% Sat</span>
                </div>
              </div>
            </div>

          </div>

          {/* Column 3: AI Recommendations Console (3 Columns) */}
          <div className="lg:col-span-3 flex flex-col">
            
            {/* AI Decision Agent terminal */}
            <div className="bg-black/60 border border-jade/20 rounded-3xl p-6 flex-1 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-jade/5 min-h-[350px]">
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-center border-b border-canvas/5 pb-3.5 mb-5">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4.5 h-4.5 text-jade" />
                    <span className="text-[10px] font-bold tracking-widest text-canvas uppercase">Intel-Ag Engine</span>
                  </div>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jade opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-jade"></span>
                  </span>
                </div>

                <div className="text-[10px] text-canvas/40 font-mono tracking-widest uppercase mb-1.5">Actionable Advice</div>
                <span className="text-[11px] font-bold text-jade bg-jade/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-4 inline-block">
                  {block.recommendationStatus}
                </span>

                <div className="text-xs text-canvas/80 leading-relaxed font-mono mt-3 text-left">
                  <AnimatePresence mode="wait">
                    <m.p
                      key={block.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      &gt; {block.recommendation}
                    </m.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative z-10 border-t border-canvas/5 pt-5 mt-6">
                <button className="w-full bg-honey hover:bg-amber text-evergreen text-[11px] font-bold tracking-widest uppercase py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300">
                  <Sparkles className="w-3.5 h-3.5" /> Execute Recommended Action
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

