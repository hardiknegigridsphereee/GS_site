"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";

interface GridSphereSequenceProps {
  frameCount?: number;
  onLoadComplete?: () => void;
}

export default function GridSphereSequence({ 
  frameCount = 240,
  onLoadComplete
}: GridSphereSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress for a premium, buttery-smooth transition feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0005,
  });

  // Map scroll progress (0 to 1) to frame indices (0 to frameCount - 1)
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  // Set up Apple-style text overlay transitions based on smoothProgress
  // Caption 1: Introduction (GRID SPHERE) - Center
  const opacity1 = useTransform(smoothProgress, [0, 0.1, 0.14], [1, 1, 0]);
  const y1 = useTransform(smoothProgress, [0, 0.1, 0.14], [0, 0, -40]);

  // Caption 2: Precision Instruments - Left
  const opacity2 = useTransform(smoothProgress, [0.18, 0.22, 0.35, 0.39], [0, 1, 1, 0]);
  const y2 = useTransform(smoothProgress, [0.18, 0.22, 0.35, 0.39], [30, 0, 0, -30]);

  // Caption 3: Passive Radiation Shields - Right
  const opacity3 = useTransform(smoothProgress, [0.42, 0.46, 0.58, 0.62], [0, 1, 1, 0]);
  const y3 = useTransform(smoothProgress, [0.42, 0.46, 0.58, 0.62], [30, 0, 0, -30]);

  // Caption 4: Intel-Ag Core - Left
  const opacity4 = useTransform(smoothProgress, [0.65, 0.69, 0.81, 0.85], [0, 1, 1, 0]);
  const y4 = useTransform(smoothProgress, [0.65, 0.69, 0.81, 0.85], [30, 0, 0, -30]);

  // Caption 5: Conclusion (MODULAR DESIGN) - Center
  const opacity5 = useTransform(smoothProgress, [0.88, 0.92, 1.0], [0, 1, 1]);
  const y5 = useTransform(smoothProgress, [0.88, 0.92, 1.0], [30, 0, 0]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameNumber = (i + 1).toString().padStart(3, "0");
        img.src = `/sequence/ezgif-frame-${frameNumber}.jpg`;

        const handleLoad = () => {
          loadedCount++;
          setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
          if (loadedCount === frameCount) {
            setImages([...loadedImages]);
            setIsLoading(false);
            onLoadComplete?.();
          }
        };

        img.onload = handleLoad;
        img.onerror = handleLoad; // Safe fallback to avoid loading screen lock on load fail
        loadedImages[i] = img;
      }
    };

    preloadImages();
  }, [frameCount, onLoadComplete]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const currentIndex = Math.min(Math.floor(frameIndex.get()), frameCount - 1);
      const img = images[currentIndex];

      if (img && img.complete) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // VEO WATERMARK MASKING:
        // Mask the bottom 6% of the source image to crop the watermark
        const cropBottomPercent = 0.06;
        const sourceWidth = img.width;
        const sourceHeight = img.height * (1 - cropBottomPercent);

        // Calculate dimensions to perfectly center the cropped image inside the canvas
        const imgAspect = sourceWidth / sourceHeight;
        const canvasAspect = canvas.width / canvas.height;

        let renderWidth, renderHeight;
        if (canvasAspect > imgAspect) {
          // Canvas is wider than image (landscape)
          renderHeight = canvas.height;
          renderWidth = sourceWidth * (canvas.height / sourceHeight);
        } else {
          // Canvas is taller than image (portrait)
          renderWidth = canvas.width;
          renderHeight = sourceHeight * (canvas.width / sourceWidth);
        }

        const offsetX = (canvas.width - renderWidth) / 2;
        const offsetY = (canvas.height - renderHeight) / 2;

        ctx.drawImage(
          img,
          0,
          0,
          sourceWidth,
          sourceHeight, // Source crop
          offsetX,
          offsetY,
          renderWidth,
          renderHeight // Destination fit
        );
      }
    };

    // Listen to frameIndex updates and trigger render
    const unsubscribe = frameIndex.on("change", () => {
      requestAnimationFrame(render);
    });

    // Initial render
    requestAnimationFrame(render);

    return () => unsubscribe();
  }, [images, frameIndex, frameCount]);

  // Handle canvas sizing on window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Sequence canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none"
          style={{
            maxWidth: "100vw",
            maxHeight: "100vh",
          }}
        />

        {/* Apple-Style Text Overlays */}
        {!isLoading && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-center">
              
              {/* Intro Title */}
              <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <div className="text-xs md:text-sm font-semibold tracking-[0.4em] text-[#10b981] mb-4 uppercase">
                  INTRODUCING
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-6 uppercase">
                  GRID SPHERE
                </h1>
                <p className="text-lg md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed">
                  The Ultimate Weather Intelligence Station. Built for precision agriculture.
                </p>
                <div className="mt-12 flex flex-col items-center gap-2 text-white/30 text-[10px] tracking-[0.3em] uppercase animate-pulse">
                  <span>Scroll to explore</span>
                  <span className="text-sm">↓</span>
                </div>
              </motion.div>

              {/* Caption 2: Weather Instruments */}
              <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute left-6 md:left-12 top-[22%] max-w-sm md:max-w-md"
              >
                <div className="text-xs font-semibold tracking-widest text-[#10b981] mb-2 uppercase">
                  01 / ATMOSPHERICS
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Precision Instruments
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed font-light">
                  Ultrasonic anemometer, high-frequency wind vane, and integrated rain gauge. Calibrated to capture macro and micro shifts instantly.
                </p>
              </motion.div>

              {/* Caption 3: Passive Radiation Shields */}
              <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute right-6 md:right-12 top-[38%] max-w-sm md:max-w-md text-right flex flex-col items-end"
              >
                <div className="text-xs font-semibold tracking-widest text-[#10b981] mb-2 uppercase">
                  02 / THERMAL BALANCE
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Radiation Shield
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-sm">
                  Multi-plate aerated profile protects internal humidity and temperature sensors from solar radiation reflection, maintaining sub-degree accuracy.
                </p>
              </motion.div>

              {/* Caption 4: Intel-Ag Processor & Power */}
              <motion.div
                style={{ opacity: opacity4, y: y4 }}
                className="absolute left-6 md:left-12 bottom-[22%] max-w-sm md:max-w-md"
              >
                <div className="text-xs font-semibold tracking-widest text-[#10b981] mb-2 uppercase">
                  03 / TELEMETRY & EDGE
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Intel-Ag Core
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed font-light">
                  Edge microprocessor processes raw climate data locally. Powered by smart-monitored Li-ion batteries charged by dual micro-solar panels.
                </p>
              </motion.div>

              {/* Caption 5: Conclusion */}
              <motion.div
                style={{ opacity: opacity5, y: y5 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <div className="text-xs md:text-sm font-semibold tracking-[0.4em] text-[#10b981] mb-4 uppercase">
                  ENGINEERING
                </div>
                <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-6 uppercase">
                  MODULAR BY DESIGN
                </h2>
                <p className="text-base md:text-xl text-white/60 max-w-xl font-light leading-relaxed mb-8">
                  Replaceable sensor nodes, upgradable modules, and 5G/LoRa telemetry ensure a lifetime of service.
                </p>
                <div className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[#10b981] text-xs font-bold tracking-widest uppercase">
                  Fully Disassembled
                </div>
              </motion.div>

            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          >
            <div className="relative h-32 w-32 mb-8">
              {/* Pulsing Green Circle */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-[#10b981] blur-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border-[3px] border-[#10b981] border-t-transparent animate-spin" />
              </div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg md:text-xl font-bold tracking-widest text-white mb-4 uppercase"
            >
              PRELOADING SEQUENCE
            </motion.h2>

            <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-[#10b981]"
                style={{ width: `${loadProgress}%` }}
                layoutId="progressBar"
              />
            </div>

            <p className="mt-3 text-white/40 text-xs font-semibold tracking-widest uppercase">
              {loadProgress}% COMPLETED
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
