"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

// Array of images from 1.webp to 9.webp
const galleryImages = Array.from({ length: 9 }, (_, i) => `/gallery/${i + 1}.webp`);

export default function GalleryPage() {
  return (
    <main className="relative bg-pearl min-h-screen text-forest">
      <Header />

      {/* Hero Header */}
      <section className="py-24 px-6 md:px-12 text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-jade/5 blur-[90px] rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="text-xs font-bold tracking-[0.3em] text-jade uppercase">
            Field Deployments
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
            Active Stations Gallery
          </h1>
          <p className="text-lg md:text-xl text-forest/70 leading-relaxed font-light max-w-2xl mx-auto">
            Visuals from GridSphere stations deployed on-site in Himachali fields, providing real-time data to growers in the region.
          </p>
        </div>
      </section>

      {/* Gallery Cards Grid */}
      <section className="py-12 px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((src, idx) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className="group relative aspect-square rounded-[32px] overflow-hidden bg-forest/5 border border-forest/5"
            >
              <img 
                src={src} 
                alt={`GridSphere deployment ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <span className="text-pearl font-bold tracking-widest uppercase text-sm">Deployment #{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
