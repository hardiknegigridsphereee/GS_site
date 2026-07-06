"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useTransform, animate, m } from "framer-motion";

interface GridSphereSequenceProps {
  frameCount?: number;
  onLoadComplete?: () => void;
}

export default function GridSphereSequence({
  frameCount = 240,
  onLoadComplete
}: GridSphereSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>(new Array(frameCount));
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const smoothProgress = useMotionValue(0);
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);
  const canvasFade = useMotionValue(1);

  const opacity1 = useTransform(smoothProgress, [0, 0.1, 0.14], [1, 1, 0]);
  const y1 = useTransform(smoothProgress, [0, 0.1, 0.14], [0, 0, -40]);

  const opacity2 = useTransform(smoothProgress, [0.18, 0.22, 0.35, 0.39], [0, 1, 1, 0]);
  const y2 = useTransform(smoothProgress, [0.18, 0.22, 0.35, 0.39], [30, 0, 0, -30]);

  const opacity3 = useTransform(smoothProgress, [0.42, 0.46, 0.58, 0.62], [0, 1, 1, 0]);
  const y3 = useTransform(smoothProgress, [0.42, 0.46, 0.58, 0.62], [30, 0, 0, -30]);

  const opacity4 = useTransform(smoothProgress, [0.65, 0.69, 0.81, 0.85], [0, 1, 1, 0]);
  const y4 = useTransform(smoothProgress, [0.65, 0.69, 0.81, 0.85], [30, 0, 0, -30]);

  const opacity5 = useTransform(smoothProgress, [0.88, 0.92, 1.0], [0, 1, 1]);
  const y5 = useTransform(smoothProgress, [0.88, 0.92, 1.0], [30, 0, 0]);

  const glowOpacity = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1.0], [0.2, 0.8, 1, 0.8, 0.2]);
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1.0], [0.8, 1.1, 0.8]);

  const lastRenderedIndex = useRef<number>(-1);

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
        img.src = `/l/ezgif-frame-${frameNumber}.webp`;
      });
    };

    const preloadSequence = async () => {
      const initialPromises = [];
      for (let i = 0; i < Math.min(INITIAL_FRAMES, frameCount); i++) {
        initialPromises.push(loadFrame(i));
      }
      await Promise.all(initialPromises);

      setIsReady(true);
      setIsLoading(false);
      onLoadComplete?.();

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

  useEffect(() => {
    if (!isReady) return;
    smoothProgress.set(0);

    const controls = animate(smoothProgress, 1, {
      duration: 22,
      ease: [0.45, 0, 0.15, 1],
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0.8,
      onRepeat: () => {
        animate(canvasFade, [1, 0, 1], { duration: 0.8, times: [0, 0.5, 1], ease: "easeInOut" });
      },
    });

    return () => controls.stop();
  }, [isReady, smoothProgress, canvasFade]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isReady) return;

    const firstImg = imagesRef.current[0];
    if (firstImg) {
      const cropBottomPercent = 0.06;
      const width = firstImg.naturalWidth || firstImg.width || 1920;
      const height = firstImg.naturalHeight || firstImg.height || 1080;

      const dpr = 1;
      canvas.width = width * dpr;
      canvas.height = height * (1 - cropBottomPercent) * dpr;

      lastRenderedIndex.current = -1;
    }
  }, [isReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isReady) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;

    const render = () => {
      const currentIndex = Math.min(Math.floor(frameIndex.get()), frameCount - 1);

      if (currentIndex === lastRenderedIndex.current) return;
      lastRenderedIndex.current = currentIndex;

      const img = imagesRef.current[currentIndex];

      if (img && img.complete) {
        const cropBottomPercent = 0.06;
        const sourceWidth = img.width;
        const sourceHeight = img.height * (1 - cropBottomPercent);

        ctx.drawImage(
          img,
          0,
          0,
          sourceWidth,
          sourceHeight,
          0,
          0,
          canvas.width,
          canvas.height
        );
      }
    };

    const unsubscribe = frameIndex.on("change", render);
    render();

    return () => unsubscribe();
  }, [isReady, frameIndex, frameCount]);

  return (
    <div className="relative h-screen bg-pearl">
      <div className="h-screen w-full overflow-hidden flex items-center justify-center relative bg-pearl">

        <m.canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full object-contain pointer-events-none"
          style={{
            maxHeight: "100vh",
            mixBlendMode: "multiply",
            transform: "translateZ(0)",
            willChange: "transform",
            opacity: canvasFade,
          }}
        />

        <div className="absolute inset-0 pointer-events-none z-20" style={{ background: 'radial-gradient(circle at center, transparent 35%, #F4EFE6 85%)' }} />

        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="relative w-full h-full max-w-[1800px] mx-auto px-8 md:px-24 flex items-center justify-center">

            {/* Intro Title */}
            <m.div
              style={{ opacity: opacity1, y: y1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <div className="px-8 py-10 md:px-16 md:py-14 rounded-[40px] bg-pearl/70 backdrop-blur-xl border border-forest/5 shadow-xl shadow-forest/5 max-w-3xl">
                <div className="text-xs md:text-sm font-semibold tracking-[0.4em] text-jade mb-4 uppercase">
                  INTRODUCING THE COGNITIVE field
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tight text-forest mb-6 uppercase">
                  GRID SPHERE
                </h1>
                <p className="text-lg md:text-2xl text-forest/60 max-w-2xl mx-auto font-light leading-relaxed">
                  Predict diseases, save water, and maximize yields. The ultimate intelligence hub for modern agriculture.
                </p>
              </div>
              <div className="mt-8 flex flex-col items-center gap-2 text-forest/30 text-[10px] tracking-[0.3em] uppercase animate-pulse">
                <span>Scroll to explore outcomes</span>
                <span className="text-sm">↓</span>
              </div>
            </m.div>

            {/* Caption 2: Weather Instruments & Microclimate Data */}
            <m.div
              style={{ opacity: opacity2, y: y2 }}
              className="absolute left-6 md:left-12 top-[22%] max-w-sm md:max-w-md flex flex-col gap-4 p-6 rounded-[32px] bg-pearl/60 backdrop-blur-lg border border-forest/5 shadow-lg shadow-forest/5"
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
              className="absolute right-6 md:right-12 top-[30%] max-w-sm md:max-w-md text-right flex flex-col items-end gap-4 p-6 rounded-[32px] bg-pearl/60 backdrop-blur-lg border border-forest/5 shadow-lg shadow-forest/5"
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
              className="absolute left-6 md:left-12 bottom-[22%] max-w-sm md:max-w-md flex flex-col gap-4 p-6 rounded-[32px] bg-pearl/60 backdrop-blur-lg border border-forest/5 shadow-lg shadow-forest/5"
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
              <div className="px-8 py-10 md:px-16 md:py-14 rounded-[40px] bg-pearl/70 backdrop-blur-xl border border-forest/5 shadow-xl shadow-forest/5 max-w-3xl flex flex-col items-center">
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
              </div>
            </m.div>

          </div>
        </div>
      </div>
    </div>
  );
}

