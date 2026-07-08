"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring, m } from "framer-motion";

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
  const imagesRef = useRef<HTMLImageElement[]>(new Array(frameCount));
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // We removed useSpring here for Lighthouse testing because Lenis already handles scroll smoothing.
  const smoothProgress = scrollYProgress;

  // Map scroll progress (0 to 1) to frame indices (0 to frameCount - 1)
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  // Set up crop-style text overlay transitions based on smoothProgress
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

  // Preload images with off-thread decoding and progressive loading
  useEffect(() => {
    const INITIAL_FRAMES = 2;
    let totalLoadedCount = 0;

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        const frameNumber = (index + 1).toString().padStart(3, "0");

        const onProcessed = () => {
          totalLoadedCount++;
          setLoadProgress(Math.floor((totalLoadedCount / frameCount) * 100));
          resolve();
        };

        img.onload = () => {
          if ("decode" in img) {
            img.decode().then(onProcessed).catch(onProcessed);
          } else {
            onProcessed();
          }
        };
        img.onerror = onProcessed;
        imagesRef.current[index] = img;
        img.src = `frames/ezgif-frame-${frameNumber}.webp`;
      });
    };

    const preloadSequence = async () => {
      // 1. Prioritize and await the first few frames
      const initialPromises = [];
      for (let i = 0; i < Math.min(INITIAL_FRAMES, frameCount); i++) {
        initialPromises.push(loadFrame(i));
      }
      await Promise.all(initialPromises);

      // The hero is ready to show!
      setIsReady(true);
      setIsLoading(false);
      onLoadComplete?.();

      // 2. Silently load the rest of the frames in the background in small batches 
      // so we don't choke the browser's CPU and network with 238 parallel decode tasks.
      const BATCH_SIZE = 5;
      for (let i = INITIAL_FRAMES; i < frameCount; i += BATCH_SIZE) {
        const batch = [];
        for (let j = 0; j < BATCH_SIZE && i + j < frameCount; j++) {
          batch.push(loadFrame(i + j));
        }
        await Promise.all(batch);
      }
    };

    preloadSequence();
  }, [frameCount, onLoadComplete]);

  // Set canvas resolution once images are loaded
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isReady) return;

    const firstImg = imagesRef.current[0];
    if (firstImg) {
      const cropBottomPercent = 0.06;
      const width = firstImg.naturalWidth || firstImg.width || 1920;
      const height = firstImg.naturalHeight || firstImg.height || 1080;

      // Clamp to 1x for maximum scrolling performance. The animation is fast so high resolution isn't strictly necessary.
      const dpr = 1;
      canvas.width = width * dpr;
      canvas.height = height * (1 - cropBottomPercent) * dpr;

      // Reset the last rendered index to force initial redraw
      lastRenderedIndex.current = -1;
    }
  }, [isReady]);

  

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isReady) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Improve texture quality without destroying performance
    ctx.imageSmoothingEnabled = true;

    const render = () => {
      const currentIndex = Math.min(Math.floor(frameIndex.get()), frameCount - 1);

      // Skip redraw if the frame index has not changed
      if (currentIndex === lastRenderedIndex.current) return;
      lastRenderedIndex.current = currentIndex;

      const img = imagesRef.current[currentIndex];

      if (img && img.complete) {
        // VEO WATERMARK MASKING:
        const cropBottomPercent = 0.06;
        const sourceWidth = img.width;
        const sourceHeight = img.height * (1 - cropBottomPercent);

        // FAST BLENDING: 
        // We do the 'multiply' blend mode here on the canvas directly instead of in CSS.
        // This is 100x faster because it sends a pre-flattened texture to the DOM.

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
  }, [isReady, frameIndex, frameCount]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-pearl" style={{ position: "relative" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-pearl">

        {/* Sequence canvas */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full object-center pointer-events-none md:max-w-[70vw] md:max-h-[100%] max-h-[45%] mix-blend-multiply will-change-transform transform"
        />

        {/* Cinematic Vignette Overlay OVER the canvas to beautifully fade the animation edges into the background */}
        <div className="absolute inset-0 pointer-events-none z-20" style={{ background: 'radial-gradient(circle at center, transparent 35%, #F4EFE6 85%)' }} />
        {/* crop-Style Text Overlays */}
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="relative w-full h-full max-w-[1800px] mx-auto px-8 md:px-24 flex items-center justify-center">
            {/* Intro Title */}
            <m.div
              style={{ opacity: opacity1, y: y1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <div className="text-xs md:text-sm font-semibold tracking-[0.4em] text-jade mb-4 uppercase">
                INTRODUCING THE COGNITIVE field
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tight text-forest mb-6 uppercase">
                GRID SPHERE
              </h1>
              <p className="text-lg md:text-2xl text-forest max-w-2xl font-light leading-relaxed">
                Predict diseases, save water, and maximize yields. The ultimate intelligence hub for modern agriculture.
              </p>
              <div className="mt-12 flex flex-col items-center gap-2 text-forest/30 text-[10px] tracking-[0.3em] uppercase animate-pulse">
                <span>Scroll to explore outcomes</span>
                <span className="text-sm">↓</span>
              </div>
            </m.div>

            {/* Caption 2: Weather Instruments & Microclimate Data */}
            <m.div
              style={{ opacity: opacity2, y: y2 }}
              className="absolute left-6 md:left-12 top-[22%] max-w-sm md:max-w-md flex flex-col gap-4"
            >
              <div className="text-xs font-semibold tracking-widest text-jade mb-1 uppercase">
                01 / REAL-TIME TELEMETRY
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-forest leading-tight">
                Microclimate Stream
              </h3>
              <p className="text-sm md:text-base text-forest/60 leading-relaxed font-light">
                Captures local rain, wind, temperature, and solar variations directly at your field's coordinates to end guesswork.
              </p>

              {/* Minimal Telemetry Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-jade/25 bg-jade/5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-jade animate-pulse" />
                <span className="text-[10px] font-bold text-forest/80 tracking-wider uppercase font-mono">
                  Sensors active: 22.4°C | 68% RH
                </span>
              </div>
            </m.div>

            {/* Caption 3: Disease Engine & Analysis */}
            <m.div
              style={{ opacity: opacity3, y: y3 }}
              className="absolute right-6 md:right-12 top-[30%] max-w-sm md:max-w-md text-right flex flex-col items-end gap-4"
            >
              <div className="text-xs font-semibold tracking-widest text-jade mb-1 uppercase">
                02 / PATHOGEN FORECASTS
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-forest leading-tight">
                Predict Diseases
              </h3>
              <p className="text-sm md:text-base text-forest/60 leading-relaxed font-light max-w-sm">
                AI models analyze leaf wetness and thermal shifts to predict Fungal Infection and blight outbreaks 48 hours before they spread.
              </p>

              {/* Minimal Threat Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-honey/25 bg-honey/5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-honey animate-pulse" />
                <span className="text-[10px] font-bold text-forest/80 tracking-wider uppercase font-mono">
                  Fungal Infection Risk: 72% (Critical)
                </span>
              </div>
            </m.div>

            {/* Caption 4: Farmer Alerts */}
            <m.div
              style={{ opacity: opacity4, y: y4 }}
              className="absolute left-6 md:left-12 bottom-[22%] max-w-sm md:max-w-md flex flex-col gap-4"
            >
              <div className="text-xs font-semibold tracking-widest text-jade mb-1 uppercase">
                03 / ACTIONABLE ADVISORY
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-forest leading-tight">
                Smart Mobile Alerts
              </h3>
              <p className="text-sm md:text-base text-forest/60 leading-relaxed font-light">
                Receive direct recommendation alerts on your phone. Delay watering or target spray treatments strictly based on real-time needs.
              </p>

              {/* Minimal Notification Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber/25 bg-amber/5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                <span className="text-[10px] font-bold text-forest/80 tracking-wider uppercase font-mono">
                  Irrigation AI: Rain expected. Postpone watering.
                </span>
              </div>
            </m.div>

            {/* Caption 5: Conclusion & Healthier field */}
            <m.div
              style={{ opacity: opacity5, y: y5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <div className="text-xs md:text-sm font-semibold tracking-[0.4em] text-jade mb-4 uppercase">
                04 / YIELD SECURITY
              </div>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-forest mb-6 uppercase">
                MAXIMIZE PROFIT
              </h2>
              <p className="text-base md:text-xl text-forest/60 max-w-xl font-light leading-relaxed mb-8">
                Deploying GridSphere eliminates traditional guesswork, guaranteeing crop safety and resource savings season after season.
              </p>

              <div className="flex gap-4 flex-wrap justify-center max-w-lg">
                <div className="px-5 py-3 rounded-2xl border border-forest/10 bg-forest/5 backdrop-blur-md flex flex-col items-center">
                  <span className="text-2xl font-bold text-jade">30%</span>
                  <span className="text-[10px] text-forest/40 tracking-wider uppercase font-semibold mt-0.5">Pesticide Savings</span>
                </div>
                <div className="px-5 py-3 rounded-2xl border border-forest/10 bg-forest/5 backdrop-blur-md flex flex-col items-center">
                  <span className="text-2xl font-bold text-jade">50%</span>
                  <span className="text-[10px] text-forest/40 tracking-wider uppercase font-semibold mt-0.5">Increased Profit</span>
                </div>
                <div className="px-5 py-3 rounded-2xl border border-forest/10 bg-forest/5 backdrop-blur-md flex flex-col items-center">
                  <span className="text-2xl font-bold text-jade">15%</span>
                  <span className="text-[10px] text-forest/40 tracking-wider uppercase font-semibold mt-0.5">Yield Increase</span>
                </div>
              </div>
            </m.div>

          </div>
        </div>
      </div>
    </div>
  );
}