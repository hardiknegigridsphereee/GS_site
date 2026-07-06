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
    <footer className="py-20 px-6 md:px-12 border-t border-forest/5 bg-pearl relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16">

        {/* Column 1: Brand Info (4 Columns) */}
        <div className="md:col-span-4 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src="/logo1.webp"
                alt="GridSphere Logo"
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <span className="text-xl font-bold tracking-tighter text-forest">
              GRID <span className="text-jade">SPHERE</span>
            </span>
          </Link>
          <p className="text-sm text-forest/70 leading-relaxed font-light">
            Grid Sphere is an Indian agri-tech innovator specializing in precision farming models. We deploy solar-powered sensor stations to empower farmers with micro-climate analytics and AI risk advisories.
          </p>
        </div>

        {/* Column 2: Navigation Links (3 Columns) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-sm font-bold tracking-widest text-forest uppercase">Product Menu</h4>
          <nav className="flex flex-col gap-2.5 text-sm text-forest/70 font-light">
            <Link href="/" className="hover:text-forest transition-colors">Home Dashboard</Link>
            <Link href="/product" className="hover:text-forest transition-colors">AI Station Specs</Link>
            <Link href="/blogs" className="hover:text-forest transition-colors">Agri Blogs</Link>
            <Link href="/gallery" className="hover:text-forest transition-colors">Deployments Gallery</Link>
            <Link href="/about" className="hover:text-forest transition-colors">About Our Team</Link>
          </nav>
        </div>

        {/* Column 3: Contact Info (3 Columns) */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-sm font-bold tracking-widest text-forest uppercase">Get In Touch</h4>
          <div className="flex flex-col gap-3.5 text-sm text-forest/70 font-light">
            <a href="tel:+918219765685" className="flex items-center gap-2 hover:text-forest transition-colors">
              <Phone className="w-4 h-4 text-jade" />
              <span>+91-8219765685</span>
            </a>
            <a href="mailto:info@gridsphere.in" className="flex items-center gap-2 hover:text-forest transition-colors">
              <Mail className="w-4 h-4 text-jade" />
              <span>info@gridsphere.in</span>
            </a>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-jade mt-0.5 flex-shrink-0" />
              <span>1609, The Iconic Corenthum, Noida 62</span>
            </div>
          </div>
        </div>

        {/* Column 4: Newsletter (3 Columns) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-sm font-bold tracking-widest text-forest uppercase font-semibold">Field Dispatch</h4>
          <p className="text-xs text-forest/70 font-light">
            Subscribe to receive disease forecasts, micro-climate insights, and product releases.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-forest/5 border border-forest/10 rounded-xl px-4 py-2 text-sm text-forest focus:outline-none focus:border-jade/50 font-light"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-honey hover:bg-amber text-evergreen text-xs font-bold uppercase rounded-xl transition-all"
            >
              Sign Up
            </button>
          </form>
          {submitted && (
            <p className="text-[10px] text-jade font-semibold mt-2 animate-pulse">
              ✓ Subscribed successfully!
            </p>
          )}
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-forest/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-forest/70 font-light">
        <div>
          © 2026 Grid Sphere Agri-Tech. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-forest transition-colors">Terms of use</Link>
          <Link href="/privacy" className="hover:text-forest transition-colors">Privacy Policy</Link>
          <Link href="/cookies" className="hover:text-forest transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
