"use client";

import { m } from "framer-motion";

interface LoaderProps {
  progress: number;
}

export default function Loader({ progress }: LoaderProps) {
  return (
    <m.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sage"
    >
      <div className="relative h-48 w-48 mb-8">
        {/* Pulsing Green Circle */}
        <m.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-spotify-green blur-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full border-4 border-spotify-green border-t-transparent animate-spin" />
        </div>
      </div>

      <m.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold tracking-tight text-forest mb-2"
      >
        Assembling Grid Sphere...
      </m.h2>
      
      <div className="w-64 h-1 bg-forest/10 rounded-full overflow-hidden">
        <m.div 
          className="h-full bg-spotify-green"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-4 text-forest/70 text-sm font-medium">
        {Math.round(progress)}% Loaded
      </p>
    </m.div>
  );
}

