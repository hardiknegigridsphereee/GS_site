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
    stiffness: 45,
    damping: 18,
    restDelta: 0.0001,
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

  // Glow Animation: Brightens and scales up when the product explodes/assembles (middle of the final_one)
  const glowOpacity = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1.0], [0.2, 0.8, 1, 0.8, 0.2]);
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1.0], [0.8, 1.1, 0.8]);

  const lastRenderedIndex = useRef<number>(-1);

  // Preload images with off-thread decoding
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameNumber = (i + 1).toString().padStart(3, "0");
        img.src = `/final_one/ezgif-frame-${frameNumber}.jpg`;

        const onFrameProcessed = () => {
          loadedCount++;
          setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
          if (loadedCount === frameCount) {
            setImages([...loadedImages]);
            setIsLoading(false);
            onLoadComplete?.();
          }
        };

        img.onload = () => {
          if ("decode" in img) {
            img.decode()
              .then(onFrameProcessed)
              .catch(onFrameProcessed);
          } else {
            onFrameProcessed();
          }
        };

        img.onerror = onFrameProcessed; // Safe fallback to avoid loading screen lock
        loadedImages[i] = img;
      }
    };

    preloadImages();
  }, [frameCount, onLoadComplete]);

  // Set canvas resolution once images are loaded
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const firstImg = images[0];
    if (firstImg) {
      const cropBottomPercent = 0.06;
      const width = firstImg.naturalWidth || firstImg.width || 1920;
      const height = firstImg.naturalHeight || firstImg.height || 1080;

      // High-DPI (Retina) display support for maximum premium sharpness
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * (1 - cropBottomPercent) * dpr;

      // Reset the last rendered index to force initial redraw
      lastRenderedIndex.current = -1;
    }
  }, [images]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Improve texture quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const render = () => {
      const currentIndex = Math.min(Math.floor(frameIndex.get()), frameCount - 1);

      // Skip redraw if the frame index has not changed
      if (currentIndex === lastRenderedIndex.current) return;
      lastRenderedIndex.current = currentIndex;

      const img = images[currentIndex];

      if (img && img.complete) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // VEO WATERMARK MASKING:
        // Mask the bottom 6% of the source image to crop the watermark
        const cropBottomPercent = 0.06;
        const sourceWidth = img.width;
        const sourceHeight = img.height * (1 - cropBottomPercent);

        ctx.drawImage(
          img,
          0,
          0,
          sourceWidth,
          sourceHeight, // Source crop
          0,
          0,
          canvas.width,
          canvas.height // Destination fit (1-to-1 matching dimensions)
        );
      }
    };

    // Listen to frameIndex updates and trigger render
    const unsubscribe = frameIndex.on("change", render);

    // Initial render
    render();

    return () => unsubscribe();
  }, [images, frameIndex, frameCount]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center relative bg-[#050505]">

        {/* Premium Studio Backlight: Multi-layered glow that pulses and scales */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle, rgba(42,127,94,0.3) 0%, rgba(19,47,32,0.5) 40%, rgba(5,5,5,0) 70%)',
            filter: 'blur(80px)',
            mixBlendMode: 'screen',
            opacity: glowOpacity,
            scale: glowScale
          }}
        />
        {/* Inner bright core for the glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
            filter: 'blur(40px)',
            mixBlendMode: 'overlay',
            opacity: glowOpacity,
            scale: glowScale
          }}
        />

        {/* Cinematic Vignette Overlay to frame the product beautifully */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(circle at center, transparent 30%, #050505 100%)' }} />

        {/* Sequence canvas */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full object-contain pointer-events-none"
          style={{
            maxWidth: "100vw",
            maxHeight: "100vh",
            mixBlendMode: "lighten",
            // Deep contrast and high saturation to make the product textures pop, without washing out with brightness
            filter: "contrast(1.45) saturate(1.5) drop-shadow(0px 30px 60px rgba(0,0,0,0.8)) drop-shadow(0px 0px 40px rgba(42,127,94,0.4))",
            transform: "translateZ(0)",
            willChange: "transform, opacity"
          }}
        />
        {/* Apple-Style Text Overlays */}
        {!isLoading && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="relative w-full h-full max-w-[1800px] mx-auto px-8 md:px-24 flex items-center justify-center">
              {/* Intro Title */}
              <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <div className="text-xs md:text-sm font-semibold tracking-[0.4em] text-jade mb-4 uppercase">
                  INTRODUCING THE COGNITIVE ORCHARD
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tight text-canvas mb-6 uppercase">
                  GRID SPHERE
                </h1>
                <p className="text-lg md:text-2xl text-canvas/60 max-w-2xl font-light leading-relaxed">
                  Predict diseases, save water, and maximize yields. The ultimate intelligence hub for modern agriculture.
                </p>
                <div className="mt-12 flex flex-col items-center gap-2 text-canvas/30 text-[10px] tracking-[0.3em] uppercase animate-pulse">
                  <span>Scroll to explore outcomes</span>
                  <span className="text-sm">↓</span>
                </div>
              </motion.div>

              {/* Caption 2: Weather Instruments & Microclimate Data */}
              <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute left-6 md:left-12 top-[22%] max-w-sm md:max-w-md flex flex-col gap-4"
              >
                <div className="text-xs font-semibold tracking-widest text-jade mb-1 uppercase">
                  01 / REAL-TIME TELEMETRY
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-canvas leading-tight">
                  Microclimate Stream
                </h3>
                <p className="text-sm md:text-base text-canvas/60 leading-relaxed font-light">
                  Captures local rain, wind, temperature, and solar variations directly at your orchard's coordinates to end guesswork.
                </p>

                {/* Minimal Telemetry Badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-jade/25 bg-jade/5 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-jade animate-pulse" />
                  <span className="text-[10px] font-bold text-canvas/80 tracking-wider uppercase font-mono">
                    Sensors active: 22.4°C | 68% RH
                  </span>
                </div>
              </motion.div>

              {/* Caption 3: Disease Engine & Analysis */}
              <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute right-6 md:right-12 top-[30%] max-w-sm md:max-w-md text-right flex flex-col items-end gap-4"
              >
                <div className="text-xs font-semibold tracking-widest text-jade mb-1 uppercase">
                  02 / PATHOGEN FORECASTS
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-canvas leading-tight">
                  Predict Diseases
                </h3>
                <p className="text-sm md:text-base text-canvas/60 leading-relaxed font-light max-w-sm">
                  AI models analyze leaf wetness and thermal shifts to predict apple scab and blight outbreaks 48 hours before they spread.
                </p>

                {/* Minimal Threat Badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-honey/25 bg-honey/5 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-honey animate-pulse" />
                  <span className="text-[10px] font-bold text-canvas/80 tracking-wider uppercase font-mono">
                    Apple Scab Risk: 72% (Critical)
                  </span>
                </div>
              </motion.div>

              {/* Caption 4: Farmer Alerts */}
              <motion.div
                style={{ opacity: opacity4, y: y4 }}
                className="absolute left-6 md:left-12 bottom-[22%] max-w-sm md:max-w-md flex flex-col gap-4"
              >
                <div className="text-xs font-semibold tracking-widest text-jade mb-1 uppercase">
                  03 / ACTIONABLE ADVISORY
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-canvas leading-tight">
                  Smart Mobile Alerts
                </h3>
                <p className="text-sm md:text-base text-canvas/60 leading-relaxed font-light">
                  Receive direct recommendation alerts on your phone. Delay watering or target spray treatments strictly based on real-time needs.
                </p>

                {/* Minimal Notification Badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber/25 bg-amber/5 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                  <span className="text-[10px] font-bold text-canvas/80 tracking-wider uppercase font-mono">
                    Irrigation AI: Rain expected. Postpone watering.
                  </span>
                </div>
              </motion.div>

              {/* Caption 5: Conclusion & Healthier Orchard */}
              <motion.div
                style={{ opacity: opacity5, y: y5 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <div className="text-xs md:text-sm font-semibold tracking-[0.4em] text-jade mb-4 uppercase">
                  04 / YIELD SECURITY
                </div>
                <h2 className="text-4xl md:text-7xl font-black tracking-tight text-canvas mb-6 uppercase">
                  MAXIMIZE PROFIT
                </h2>
                <p className="text-base md:text-xl text-canvas/60 max-w-xl font-light leading-relaxed mb-8">
                  Deploying GridSphere eliminates traditional guesswork, guaranteeing crop safety and resource savings season after season.
                </p>

                <div className="flex gap-4 flex-wrap justify-center max-w-lg">
                  <div className="px-5 py-3 rounded-2xl border border-canvas/10 bg-canvas/5 backdrop-blur-md flex flex-col items-center">
                    <span className="text-2xl font-bold text-jade">30%</span>
                    <span className="text-[10px] text-canvas/40 tracking-wider uppercase font-semibold mt-0.5">Pesticide Savings</span>
                  </div>
                  <div className="px-5 py-3 rounded-2xl border border-canvas/10 bg-canvas/5 backdrop-blur-md flex flex-col items-center">
                    <span className="text-2xl font-bold text-jade">50%</span>
                    <span className="text-[10px] text-canvas/40 tracking-wider uppercase font-semibold mt-0.5">Increased Profit</span>
                  </div>
                  <div className="px-5 py-3 rounded-2xl border border-canvas/10 bg-canvas/5 backdrop-blur-md flex flex-col items-center">
                    <span className="text-2xl font-bold text-jade">15%</span>
                    <span className="text-[10px] text-canvas/40 tracking-wider uppercase font-semibold mt-0.5">Yield Increase</span>
                  </div>
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
            <div className="relative h-24 w-24 mb-8 flex items-center justify-center">
              <motion.img
                src="/logo.png"
                alt="GridSphere Logo"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full object-contain relative z-10"
              />
              {/* Subtle outer sweep effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-canvas/5 border-t-canvas/30"
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg md:text-xl font-bold tracking-widest text-canvas mb-4 uppercase"
            >
              PRELOADING SEQUENCE
            </motion.h2>

            <div className="w-56 h-[2px] bg-canvas/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-jade"
                style={{ width: `${loadProgress}%` }}
                layoutId="progressBar"
              />
            </div>

            <p className="mt-3 text-canvas/40 text-xs font-semibold tracking-widest uppercase">
              {loadProgress}% COMPLETED
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
