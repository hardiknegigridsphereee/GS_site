"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer className="py-20 px-6 md:px-12 border-t border-white/5 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16">
        
        {/* Column 1: Brand Info (4 Columns) */}
        <div className="md:col-span-4 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.png" alt="GridSphere Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              GRID <span className="text-[#10b981]">SPHERE</span>
            </span>
          </Link>
          <p className="text-sm text-spotify-textSec leading-relaxed font-light">
            Grid Sphere is an Indian agri-tech innovator specializing in precision farming models. We deploy solar-powered sensor stations to empower apple growers with micro-climate analytics and AI risk advisories.
          </p>
        </div>

        {/* Column 2: Navigation Links (3 Columns) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-sm font-bold tracking-widest text-white uppercase">Product Menu</h4>
          <nav className="flex flex-col gap-2.5 text-sm text-spotify-textSec font-light">
            <Link href="/" className="hover:text-white transition-colors">Home Dashboard</Link>
            <Link href="/product" className="hover:text-white transition-colors">AI Station Specs</Link>
            <Link href="/blogs" className="hover:text-white transition-colors">Agri Blogs</Link>
            <Link href="/gallery" className="hover:text-white transition-colors">Deployments Gallery</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Our Team</Link>
          </nav>
        </div>

        {/* Column 3: Contact Info (3 Columns) */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-sm font-bold tracking-widest text-white uppercase">Get In Touch</h4>
          <div className="flex flex-col gap-3.5 text-sm text-spotify-textSec font-light">
            <a href="tel:+918219765685" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-[#10b981]" />
              <span>+91-8219765685</span>
            </a>
            <a href="mailto:info@gridsphere.in" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-[#10b981]" />
              <span>info@gridsphere.in</span>
            </a>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" />
              <span>Himachal Pradesh, India</span>
            </div>
          </div>
        </div>

        {/* Column 4: Newsletter (3 Columns) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-sm font-bold tracking-widest text-white uppercase font-semibold">Orchard Dispatch</h4>
          <p className="text-xs text-spotify-textSec font-light">
            Subscribe to receive disease forecasts, micro-climate insights, and product releases.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#10b981]/50 font-light"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#10b981] hover:bg-[#1ed760] text-black text-xs font-bold uppercase rounded-xl transition-all"
            >
              Sign Up
            </button>
          </form>
          {submitted && (
            <p className="text-[10px] text-[#10b981] font-semibold mt-2 animate-pulse">
              ✓ Subscribed successfully!
            </p>
          )}
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-spotify-textSec font-light">
        <div>
          © 2026 Grid Sphere Agri-Tech. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-white transition-colors">Terms of use</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
