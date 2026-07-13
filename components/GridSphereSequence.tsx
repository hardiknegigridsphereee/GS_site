"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, m } from "framer-motion";

interface GridSphereSequenceProps {
  frameCount?: number;
  onLoadComplete?: () => void;

  /**
   * ---- MODEL SIZE / POSITION CONTROLS ----
   * The canvas itself ALWAYS fills 100% of its container (no gaps, no
   * letterboxing) — it behaves like `object-fit: cover`. These props then
   * scale/position the model image *inside* that fully-covered canvas, so
   * you can make the product look bigger/smaller without ever exposing
   * empty space around the canvas.
   *
   * modelScale: 1 = image just covers the canvas (default "cover" fit).
   *   > 1 zooms in on the model (crops more of the background).
   *   < 1 shrinks the model, revealing more of its own background padding
   *       (note: this only works well if the source frame has extra
   *       background margin baked in — it can't invent new background).
   *
   * Separate desktop/mobile values let you tune each breakpoint from code.
   */
  modelScale?: number; // desktop scale, default 1
  modelScaleMobile?: number; // mobile scale, default = modelScale
  offsetY?: number; // vertical nudge in px, desktop, default 0
  offsetYMobile?: number; // vertical nudge in px, mobile, default = offsetY
  offsetX?: number; // horizontal nudge in px, desktop, default 0
  offsetXMobile?: number; // horizontal nudge in px, mobile, default = offsetX

  /** Crop a fraction off the bottom of the SOURCE frame before drawing
   *  (useful if the source frames have an unwanted watermark/shadow strip
   *  at the very bottom). 0 = no crop. */
  cropBottomPercent?: number;

  /** Breakpoint (px) below which mobile scale/offset values apply. */
  mobileBreakpoint?: number;
}

export default function GridSphereSequence({
  frameCount = 240,
  onLoadComplete,
  modelScale = 1,
  modelScaleMobile,
  offsetY = 0,
  offsetYMobile,
  offsetX = 0,
  offsetXMobile,
  cropBottomPercent = 0,
  mobileBreakpoint = 768,
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

  const smoothProgress = scrollYProgress;

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  const opacity1 = useTransform(smoothProgress, [0, 0.1, 0.14], [1, 1, 0]);
  const y1 = useTransform(smoothProgress, [0, 0.1, 0.14], [0, 0, -40]);

  const opacity2 = useTransform(
    smoothProgress,
    [0.18, 0.22, 0.35, 0.39],
    [0, 1, 1, 0]
  );
  const y2 = useTransform(
    smoothProgress,
    [0.18, 0.22, 0.35, 0.39],
    [30, 0, 0, -30]
  );

  const opacity3 = useTransform(
    smoothProgress,
    [0.42, 0.46, 0.58, 0.62],
    [0, 1, 1, 0]
  );
  const y3 = useTransform(
    smoothProgress,
    [0.42, 0.46, 0.58, 0.62],
    [30, 0, 0, -30]
  );

  const opacity4 = useTransform(
    smoothProgress,
    [0.65, 0.69, 0.81, 0.85],
    [0, 1, 1, 0]
  );
  const y4 = useTransform(
    smoothProgress,
    [0.65, 0.69, 0.81, 0.85],
    [30, 0, 0, -30]
  );

  const opacity5 = useTransform(
    smoothProgress,
    [0.85, 0.88, 0.94],
    [0, 1, 1]
  );
  const y5 = useTransform(smoothProgress, [0.85, 0.88, 0.94], [30, 0, 0]);

  const lastRenderedIndex = useRef<number>(-1);
  const isMobileRef = useRef<boolean>(false);

  // ---- Load frames ----
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

  // ---- Keep canvas pixel size matched to its rendered (CSS) size ----
  // This is what makes the canvas truly full-bleed with no gaps, on any
  // screen size or aspect ratio, instead of being sized off the first
  // frame's native dimensions.
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !isReady) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      isMobileRef.current = rect.width < mobileBreakpoint;
      lastRenderedIndex.current = -1; // force redraw at new size
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    window.addEventListener("orientationchange", resize);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", resize);
    };
  }, [isReady, mobileBreakpoint]);

  // ---- Draw frames (cover-fit canvas, then apply model scale/offset) ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isReady) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const render = () => {
      const currentIndex = Math.min(
        Math.floor(frameIndex.get()),
        frameCount - 1
      );

      if (currentIndex === lastRenderedIndex.current) return;
      lastRenderedIndex.current = currentIndex;

      const img = imagesRef.current[currentIndex];
      if (!img || !img.complete || !img.naturalWidth) return;

      const canvasW = canvas.width;
      const canvasH = canvas.height;

      // Source rect (with optional bottom crop of the raw frame image)
      const srcW = img.naturalWidth;
      const srcH = img.naturalHeight * (1 - cropBottomPercent);

      // "Cover" base scale: fills the ENTIRE canvas with no gaps.
      const coverScale = Math.max(canvasW / srcW, canvasH / srcH);

      const mobile = isMobileRef.current;
      const scaleMultiplier = mobile
        ? modelScaleMobile ?? modelScale
        : modelScale;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const offX = (mobile ? offsetXMobile ?? offsetX : offsetX) * dpr;
      const offY = (mobile ? offsetYMobile ?? offsetY : offsetY) * dpr;

      const finalScale = coverScale * scaleMultiplier;
      const dw = srcW * finalScale;
      const dh = srcH * finalScale;
      const dx = (canvasW - dw) / 2 + offX;
      const dy = (canvasH - dh) / 2 + offY;

      ctx.clearRect(0, 0, canvasW, canvasH);
      ctx.drawImage(img, 0, 0, srcW, srcH, dx, dy, dw, dh);
    };

    const unsubscribe = frameIndex.on("change", render);
    render();

    return () => unsubscribe();
  }, [
    isReady,
    frameIndex,
    frameCount,
    modelScale,
    modelScaleMobile,
    offsetX,
    offsetXMobile,
    offsetY,
    offsetYMobile,
    cropBottomPercent,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative h-[300vh] bg-pearl"
      style={{ position: "relative" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-pearl">
        {/* Canvas now fills 100% of its parent — always full width, full
            height, no max-w/max-h caps, so there is never any gap. Model
            size/position within that space is controlled purely via the
            modelScale / offsetX / offsetY props above. */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply will-change-transform"
        />

        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              "radial-gradient(circle at center, transparent 35%, #F4EFE6 85%)",
          }}
        />
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="relative w-full h-full max-w-[1800px] mx-auto px-8 md:px-24 flex items-center justify-center">
            {/* Intro Title */}
            <m.div
              style={{ opacity: opacity1, y: y1 }}
              className="absolute inset-0 flex flex-col items-center text-center px-4 pt-16 pb-10 md:py-0 md:justify-center"
            >
              <div className="flex flex-col items-center">
                <div className="text-xs md:text-sm font-semibold tracking-[0.4em] text-jade mb-4 uppercase">
                  INTRODUCING THE COGNITIVE FIELD
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tight text-forest mb-6 uppercase">
                  GRID SPHERE
                </h1>
                <p className="text-lg md:text-2xl text-forest max-w-2xl font-light leading-relaxed">
                  Predict diseases, save water, and maximize yields. The
                  ultimate intelligence hub for modern agriculture.
                </p>
              </div>

              <div className="flex-1 md:hidden" />

              <div className="flex flex-col items-center">
                <div className="flex md:hidden flex-wrap items-center justify-center gap-1.5 max-w-[480px]">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pearl/80 border border-forest/10 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-jade" />
                    <span className="text-[10px] font-bold text-forest tracking-wide">
                      Weather
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pearl/80 border border-forest/10 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-honey" />
                    <span className="text-[10px] font-bold text-forest tracking-wide">
                      Disease Risk
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pearl/80 border border-forest/10 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                    <span className="text-[10px] font-bold text-forest tracking-wide">
                      Soil &amp; Irrigation
                    </span>
                  </div>
                </div>

                <div className="flex md:hidden items-center gap-3 mt-3 w-full max-w-xs">
                  <div className="flex-1 flex flex-col gap-0.5 px-3 py-2 rounded-xl items-center">
                    <span className="text-[8px] text-forest/40 font-bold tracking-widest uppercase">
                      Field Temp
                    </span>
                    <span className="text-base font-black text-forest">
                      22.4
                      <span className="text-[10px] font-bold text-forest/40">
                        °C
                      </span>
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5 px-3 py-2 rounded-xl items-center">
                    <span className="text-[8px] text-forest/40 font-bold tracking-widest uppercase">
                      Soil Moisture
                    </span>
                    <span className="text-base font-black text-forest">
                      41
                      <span className="text-[10px] font-bold text-forest/40">
                        % VWC
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex md:hidden items-center gap-3 mt-2 w-full max-w-xs">
                  <div className="flex-1 flex flex-col gap-0.5 px-3 py-2 rounded-xl items-center">
                    <span className="text-[8px] text-forest/40 font-bold tracking-widest uppercase">
                      Wind Speed
                    </span>
                    <span className="text-base font-black text-forest">
                      3.5
                      <span className="text-[10px] font-bold text-forest/40">
                        km/h
                      </span>
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5 px-3 py-2 rounded-xl items-center">
                    <span className="text-[8px] text-forest/40 font-bold tracking-widest uppercase">
                      Field Nodes
                    </span>
                    <span className="text-base font-black text-forest">
                      12
                      <span className="text-[10px] font-bold text-forest/40">
                        / 98%
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mt-6 md:mt-12 flex flex-col items-center gap-2 text-forest text-[10px] tracking-[0.3em] uppercase animate-pulse">
                  <span>Scroll to explore outcomes</span>
                  <span className="text-sm">↓</span>
                </div>
              </div>
            </m.div>

            {/* Intro companion card — left */}
            <m.div
              style={{ opacity: opacity1, y: y1 }}
              className="hidden md:flex absolute left-6 md:left-5 top-1/3 -translate-y-1/2 flex-col gap-5 w-fit"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pearl/80 border border-forest/10 backdrop-blur-sm w-fit self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-jade animate-pulse" />
                <span className="text-[9px] font-bold text-forest/70 tracking-widest uppercase">
                  Node Online
                </span>
              </div>

              <div className="flex flex-col gap-2.5 px-5 py-4 rounded-2xl w-fit">
                <span className="text-[9px] text-forest/40 font-bold tracking-widest uppercase">
                  Monitored Continuously
                </span>
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-jade" />
                    <span className="text-sm font-bold text-forest">
                      Weather &amp; Microclimate
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-honey" />
                    <span className="text-sm font-bold text-forest">
                      Disease Risk
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                    <span className="text-sm font-bold text-forest">
                      Soil &amp; Irrigation
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                    <span className="text-sm font-bold text-forest">
                      Growth Stage Tracking
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 px-5 py-4 rounded-2xl w-fit">
                <span className="text-[9px] text-forest/40 font-bold tracking-widest uppercase">
                  Sensor Network
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-forest">
                      12
                    </span>
                    <span className="text-[9px] text-forest/40 font-semibold uppercase tracking-wide">
                      Field Nodes
                    </span>
                  </div>
                  <div className="w-px h-8 bg-forest/10" />
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-forest">
                      98%
                    </span>
                    <span className="text-[9px] text-forest/40 font-semibold uppercase tracking-wide">
                      Uptime
                    </span>
                  </div>
                </div>
              </div>
            </m.div>

            {/* Intro companion card — right */}
            <m.div
              style={{ opacity: opacity1, y: y1 }}
              className="hidden md:flex absolute right-6 md:right-5 top-1/3 -translate-y-1/2 flex-col gap-5 w-fit items-end"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pearl/80 border border-forest/10 backdrop-blur-sm w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-honey animate-pulse" />
                <span className="text-[9px] font-bold text-forest/70 tracking-widest uppercase">
                  Synced Just Now
                </span>
              </div>

              <div className="flex flex-col gap-2 px-5 py-4 rounded-2xl w-fit items-end">
                <span className="text-[9px] text-forest/40 font-bold tracking-widest uppercase">
                  Current Field Snapshot
                </span>
                <span className="text-2xl font-black text-forest">
                  22.4
                  <span className="text-xs font-bold text-forest/40">°C</span>
                </span>
                <span className="text-[9px] text-forest/40 font-bold tracking-widest uppercase mt-2">
                  Soil Moisture
                </span>
                <span className="text-2xl font-black text-forest">
                  41
                  <span className="text-xs font-bold text-forest/40">
                    % VWC
                  </span>
                </span>
                <span className="text-[9px] text-forest/40 font-bold tracking-widest uppercase mt-2">
                  Wind Speed
                </span>
                <span className="text-2xl font-black text-forest">
                  3.5
                  <span className="text-xs font-bold text-forest/40">
                    km/h
                  </span>
                </span>
              </div>

              <div className="flex flex-col gap-2 px-5 py-4 rounded-2xl w-fit items-end">
                <span className="text-[9px] text-forest/40 font-bold tracking-widest uppercase">
                  Solar &amp; Canopy
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-black text-forest">
                      680
                    </span>
                    <span className="text-[9px] text-forest/40 font-semibold uppercase tracking-wide">
                      W/m² Radiation
                    </span>
                  </div>
                  <div className="w-px h-8 bg-forest/10" />
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-black text-forest">
                      68%
                    </span>
                    <span className="text-[9px] text-forest/40 font-semibold uppercase tracking-wide">
                      Leaf Wetness
                    </span>
                  </div>
                </div>
              </div>
            </m.div>

            {/* Caption 2: Weather Instruments & Microclimate Data */}
            <m.div
              style={{ opacity: opacity2, y: y2 }}
              className="absolute left-6 right-6 md:right-auto md:left-12 top-[8%] md:top-[22%] max-w-none md:max-w-md flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-4"
            >
              <div className="text-xs font-semibold tracking-widest text-jade mb-1 uppercase">
                01 / REAL-TIME TELEMETRY
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-forest leading-tight">
                Microclimate Stream
              </h3>
              <p className="text-xs md:text-base text-forest leading-relaxed font-light max-w-xs md:max-w-md">
                Captures local rain, wind, temperature, and solar variations
                directly at your field's coordinates to end guesswork.
              </p>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-jade/25 bg-jade/5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-jade animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-bold text-forest/80 tracking-wider uppercase font-mono">
                  Sensors active: 22.4°C | 68% RH
                </span>
              </div>
            </m.div>

            {/* Mobile-only stat row for Caption 2 */}
            <m.div
              style={{ opacity: opacity2 }}
              className="flex md:hidden absolute left-6 right-6 bottom-[15%] items-center gap-5"
            >
              <div className="flex-1 flex flex-col gap-0.5 px-3 py-2 rounded-xl items-center">
                <span className="text-[8px] text-forest/40 font-bold tracking-widest uppercase">
                  Wind Speed
                </span>
                <span className="text-base font-black text-forest">
                  3.5{" "}
                  <span className="text-[10px] font-bold text-forest/40">
                    km/h
                  </span>
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-0.5 px-3 py-2 rounded-xl items-center">
                <span className="text-[8px] text-forest/40 font-bold tracking-widest uppercase">
                  Solar Radiation
                </span>
                <span className="text-base font-black text-forest">
                  680{" "}
                  <span className="text-[10px] font-bold text-forest/40">
                    W/m²
                  </span>
                </span>
              </div>
            </m.div>

            {/* Desktop companion stat card — Caption 2 */}
            <m.div
              style={{ opacity: opacity2 }}
              className="hidden md:flex absolute right-6 md:right-12 bottom-[18%] flex-col gap-2 px-5 py-4 rounded-2xl w-fit items-end"
            >
              <span className="text-[9px] text-forest/40 font-bold tracking-widest uppercase">
                Live Wind Speed
              </span>
              <span className="text-2xl font-black text-forest">
                3.5{" "}
                <span className="text-xs font-bold text-forest/40">km/h</span>
              </span>
              <span className="text-[9px] text-forest/40 font-bold tracking-widest uppercase mt-2">
                Solar Radiation
              </span>
              <span className="text-2xl font-black text-forest">
                680{" "}
                <span className="text-xs font-bold text-forest/40">W/m²</span>
              </span>
            </m.div>

            {/* Caption 3: Disease Engine & Analysis */}
            <m.div
              style={{ opacity: opacity3, y: y3 }}
              className="absolute left-6 right-6 md:left-auto md:right-12 top-[8%] md:top-[30%] max-w-none md:max-w-md text-center md:text-right flex flex-col items-center md:items-end gap-3 md:gap-4"
            >
              <div className="text-xs font-semibold tracking-widest text-jade mb-1 uppercase">
                02 / PATHOGEN FORECASTS
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-forest leading-tight">
                Predict Diseases
              </h3>
              <p className="text-xs md:text-base text-forest leading-relaxed font-light max-w-xs md:max-w-sm">
                AI models analyze leaf wetness and thermal shifts to predict
                Fungal Infection and blight outbreaks 48 hours before they
                spread.
              </p>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-honey/25 bg-honey/5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-honey animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-bold text-forest/80 tracking-wider uppercase font-mono">
                  Fungal Infection Risk: 72% (Critical)
                </span>
              </div>
            </m.div>

            {/* Mobile-only stat row for Caption 3 */}
            <m.div
              style={{ opacity: opacity3 }}
              className="flex md:hidden absolute left-6 right-6 bottom-[15%] items-center gap-6"
            >
              <div className="flex-1 flex flex-col gap-0.5 px-3 py-2 rounded-xl items-center">
                <span className="text-[8px] text-forest/40 font-bold tracking-widest uppercase">
                  Leaf Wetness
                </span>
                <span className="text-base font-black text-forest">
                  68
                  <span className="text-[10px] font-bold text-forest/40">
                    %
                  </span>
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-0.5 px-3 py-2 rounded-xl items-center">
                <span className="text-[8px] text-forest/40 font-bold tracking-widest uppercase">
                  Fire Blight Risk
                </span>
                <span className="text-base font-black text-forest">
                  8
                  <span className="text-[10px] font-bold text-forest/40">
                    %
                  </span>
                </span>
              </div>
            </m.div>

            {/* Desktop companion stat card — Caption 3 */}
            <m.div
              style={{ opacity: opacity3 }}
              className="hidden md:flex absolute left-6 md:left-12 bottom-[18%] flex-col gap-2 px-5 py-4 rounded-2xl w-fit"
            >
              <span className="text-[9px] text-forest/40 font-bold tracking-widest uppercase">
                Leaf Wetness
              </span>
              <span className="text-2xl font-black text-forest">
                68
                <span className="text-xs font-bold text-forest/40">%</span>
              </span>
              <span className="text-[9px] text-forest/40 font-bold tracking-widest uppercase mt-2">
                Fire Blight Risk
              </span>
              <span className="text-2xl font-black text-forest">
                8
                <span className="text-xs font-bold text-forest/40">%</span>
              </span>
            </m.div>

            {/* Caption 4: Farmer Alerts */}
            <m.div
              style={{ opacity: opacity4, y: y4 }}
              className="absolute left-6 right-6 md:right-auto md:left-12 top-[6%] md:bottom-[22%] md:top-auto max-w-none md:max-w-md flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-4"
            >
              <div className="text-xs font-semibold tracking-widest text-jade mb-1 uppercase">
                03 / ACTIONABLE ADVISORY
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-forest leading-tight">
                Smart Mobile Alerts
              </h3>
              <p className="text-xs md:text-base text-forest leading-relaxed font-light max-w-xs md:max-w-md">
                Receive direct recommendation alerts on your phone. Delay
                watering or target spray treatments strictly based on real-time
                needs.
              </p>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber/25 bg-amber/5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-bold text-forest/80 tracking-wider uppercase font-mono">
                  Irrigation AI: Rain expected. Postpone watering.
                </span>
              </div>
            </m.div>

            {/* Mobile-only stat row for Caption 4 */}
            <m.div
              style={{ opacity: opacity4 }}
              className="flex md:hidden absolute left-6 right-6 bottom-[15%] items-center gap-6"
            >
              <div className="flex-1 flex flex-col gap-0.5 px-3 py-2 rounded-xl items-center">
                <span className="text-[8px] text-forest/40 font-bold tracking-widest uppercase">
                  Active Alerts
                </span>
                <span className="text-base font-black text-forest">
                  2{" "}
                  <span className="text-[10px] font-bold text-forest/40">
                    pending
                  </span>
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-0.5 px-3 py-2 rounded-xl items-center">
                <span className="text-[8px] text-forest/40 font-bold tracking-widest uppercase">
                  Soil Moisture
                </span>
                <span className="text-base font-black text-forest">
                  41
                  <span className="text-[10px] font-bold text-forest/40">
                    % VWC
                  </span>
                </span>
              </div>
            </m.div>

            {/* Desktop companion stat card — Caption 4 */}
            <m.div
              style={{ opacity: opacity4 }}
              className="hidden md:flex absolute right-6 md:right-12 bottom-[18%] flex-col gap-2 px-5 py-4 rounded-2xl w-fit items-end"
            >
              <span className="text-[9px] text-forest/40 font-bold tracking-widest uppercase">
                Active Alerts
              </span>
              <span className="text-2xl font-black text-forest">
                2{" "}
                <span className="text-xs font-bold text-forest/40">
                  pending
                </span>
              </span>
              <span className="text-[9px] text-forest/40 font-bold tracking-widest uppercase mt-2">
                Soil Moisture
              </span>
              <span className="text-2xl font-black text-forest">
                41
                <span className="text-xs font-bold text-forest/40">
                  % VWC
                </span>
              </span>
            </m.div>

            {/* Caption 5: Conclusion & Yield Security */}
            <m.div
              style={{ opacity: opacity5, y: y5 }}
              className="absolute inset-0 flex flex-col items-center text-center px-4"
            >
              <div className="flex-1 flex flex-col items-center justify-start md:justify-center w-full pt-[24.5%] md:pt-0">
                <div className="text-xs md:text-sm font-semibold tracking-[0.4em] text-jade mb-3 md:mb-4 uppercase">
                  04 / YIELD SECURITY
                </div>
                <h2 className="text-3xl md:text-7xl font-black tracking-tight text-forest mb-3 md:mb-6 uppercase">
                  MAXIMIZE PROFIT
                </h2>
                <p className="text-sm md:text-xl text-forest max-w-xs md:max-w-xl font-light leading-relaxed">
                  Deploying GridSphere eliminates traditional guesswork,
                  guaranteeing crop safety and resource savings season after
                  season.
                </p>

                <div className="hidden md:flex gap-3 md:gap-4 flex-wrap justify-center max-w-lg mt-6">
                  <div className="px-4 md:px-5 py-2.5 md:py-3 rounded-2xl border border-forest/10 bg-forest/5 backdrop-blur-md flex flex-col items-center flex-1 min-w-[90px]">
                    <span className="text-xl md:text-2xl font-bold text-jade">
                      30%
                    </span>
                    <span className="text-[9px] md:text-[10px] text-forest/40 tracking-wider uppercase font-semibold mt-0.5">
                      Pesticide Savings
                    </span>
                  </div>
                  <div className="px-4 md:px-5 py-2.5 md:py-3 rounded-2xl border border-forest/10 bg-forest/5 backdrop-blur-md flex flex-col items-center flex-1 min-w-[90px]">
                    <span className="text-xl md:text-2xl font-bold text-jade">
                      50%
                    </span>
                    <span className="text-[9px] md:text-[10px] text-forest/40 tracking-wider uppercase font-semibold mt-0.5">
                      Increased Profit
                    </span>
                  </div>
                  <div className="px-4 md:px-5 py-2.5 md:py-3 rounded-2xl border border-forest/10 bg-forest/5 backdrop-blur-md flex flex-col items-center flex-1 min-w-[90px]">
                    <span className="text-xl md:text-2xl font-bold text-jade">
                      15%
                    </span>
                    <span className="text-[9px] md:text-[10px] text-forest/40 tracking-wider uppercase font-semibold mt-0.5">
                      Yield Increase
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex md:hidden absolute left-6 right-6 bottom-[15%] items-center gap-3">
                <div className="flex-1 px-3 py-2 rounded-xl flex flex-col items-center min-w-0">
                  <span className="text-base font-black text-forest">30%</span>
                  <span className="text-[8px] text-forest/40 tracking-wider uppercase font-semibold mt-0.5 text-center leading-tight">
                    Pesticide Savings
                  </span>
                </div>
                <div className="flex-1 px-3 py-2 rounded-xl flex flex-col items-center min-w-0">
                  <span className="text-base font-black text-forest">50%</span>
                  <span className="text-[8px] text-forest/40 tracking-wider uppercase font-semibold mt-0.5 text-center leading-tight">
                    Increased Profit
                  </span>
                </div>
                <div className="flex-1 px-3 py-2 rounded-xl flex flex-col items-center min-w-0">
                  <span className="text-base font-black text-forest">15%</span>
                  <span className="text-[8px] text-forest/40 tracking-wider uppercase font-semibold mt-0.5 text-center leading-tight">
                    Yield Increase
                  </span>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </div>
  );
}