"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
}

const blogs: BlogPost[] = [
  {
    title: "Predicting Fungal Infection Disease Spores via Leaf Wetness Telemetry",
    excerpt: "Learn how tracking air temperature in combination with continuous canopy leaf wetness sensors allows fieldists to forecast Venturia inaequalis sporulation 48 hours before visible symptoms form.",
    date: "June 08, 2026",
    author: "Agronomy Team",
    category: "Pathogen Analytics"
  },
  {
    title: "Precision Irrigation in Himachali fields: A Hydrological Approach",
    excerpt: "High-density crop varieties require strict Volumetric Water Content (VWC) root tracking. Discrepancies of even 5% moisture can trigger crop stress, resulting in stunted fruit sizing during critical summer months.",
    date: "May 28, 2026",
    author: "Hydrology Expert",
    category: "Irrigation AI"
  },
  {
    title: "Optimizing Foliar Spray Windows: Maximizing Chemical Efficacy",
    excerpt: "Wind velocity and solar irradiance parameters significantly impact pesticide adhesion. We analyze how sensor arrays determine target morning hours to maximize chemical absorption and cut spray costs.",
    date: "May 15, 2026",
    author: "GridSphere Research",
    category: "Spray Optimization"
  }
];

export default function BlogsPage() {
  return (
    <main className="relative bg-pearl min-h-screen text-forest">
      <Header />

      {/* Hero Header */}
      <section className="py-24 px-6 md:px-12 text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-jade/5 blur-[90px] rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="text-xs font-bold tracking-[0.3em] text-jade uppercase">
            Agronomy Resources
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
            field Intelligence Blogs
          </h1>
          <p className="text-lg md:text-xl text-forest/70 leading-relaxed font-light max-w-2xl mx-auto">
            Technical guides and agronomic advice to help farmers integrate sensor data into profitable on-field routines.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto relative z-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article 
              key={post.title} 
              className="bg-white/80 border border-forest/5 rounded-3xl overflow-hidden hover:border-jade/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-6 md:p-8 space-y-4">
                <span className="text-[9px] font-bold tracking-widest text-jade bg-jade/10 px-3 py-1 rounded-full uppercase inline-block">
                  {post.category}
                </span>
                
                <h3 className="text-xl font-bold text-forest group-hover:text-jade transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-xs text-forest/70 leading-relaxed font-light">
                  {post.excerpt}
                </p>
              </div>

              <div className="p-6 md:p-8 border-t border-forest/5 flex items-center justify-between text-[11px] text-forest/40">
                <div className="flex gap-4 font-mono">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
                </div>
                
                <span className="text-jade font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
