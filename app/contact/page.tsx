"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", phone: "", blockCount: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: "", phone: "", blockCount: "", message: "" });
  };

  return (
    <main className="relative bg-[#050505] min-h-screen text-white">
      <Header />

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Contact Info (5 Columns) */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <div className="text-xs font-bold tracking-[0.2em] text-[#10b981] uppercase mb-4">
              Get Started
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none mb-6">
              Connect With Us
            </h1>
            <p className="text-base text-spotify-textSec font-light leading-relaxed">
              Ready to secure your orchard yields and cut input costs? Fill out the form to schedule an on-field consultation, or reach our agronomic support team directly.
            </p>
          </div>

          <div className="space-y-6">
            <a href="tel:+918219765685" className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-3xl hover:border-[#10b981]/20 transition-all duration-300 group">
              <div className="p-3.5 bg-[#10b981]/15 text-[#10b981] rounded-2xl group-hover:scale-105 transition-all">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-white/40 block uppercase tracking-widest font-bold font-mono">Call Support</span>
                <span className="text-lg font-bold text-white group-hover:text-[#10b981] transition-colors">+91-8219765685</span>
              </div>
            </a>

            <a href="mailto:info@gridsphere.in" className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-3xl hover:border-[#10b981]/20 transition-all duration-300 group">
              <div className="p-3.5 bg-[#10b981]/15 text-[#10b981] rounded-2xl group-hover:scale-105 transition-all">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-white/40 block uppercase tracking-widest font-bold font-mono">Email Us</span>
                <span className="text-lg font-bold text-white group-hover:text-[#10b981] transition-colors">info@gridsphere.in</span>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-3xl">
              <div className="p-3.5 bg-[#10b981]/15 text-[#10b981] rounded-2xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-white/40 block uppercase tracking-widest font-bold font-mono">Location</span>
                <span className="text-lg font-bold text-white">Himachal Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp CTA */}
          <a
            href="https://wa.me/918219765685"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-3xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#25d366]/20"
          >
            <MessageCircle className="w-5 h-5 fill-black" /> Chat on WhatsApp
          </a>
        </div>

        {/* Lead Form (7 Columns) */}
        <div className="lg:col-span-7 bg-black/40 border border-white/5 p-8 md:p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-[#10b981]/5 blur-[80px] rounded-full pointer-events-none" />
          
          <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-wide border-b border-white/5 pb-4">Consultation Request</h3>
          
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#10b981]/10 border border-[#10b981]/25 rounded-full flex items-center justify-center mx-auto text-[#10b981]">
                <Send className="w-6 h-6 animate-pulse" />
              </div>
              <h4 className="text-xl font-bold text-white">Advisory Request Submitted</h4>
              <p className="text-sm text-spotify-textSec max-w-sm mx-auto font-light leading-relaxed">
                Thank you! Our precision agriculture specialists will contact you at your phone number shortly to discuss your orchard blocks.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-[#10b981]/50 font-light"
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-[#10b981]/50 font-light"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">Number of Orchard Blocks</label>
                <input
                  type="number"
                  required
                  value={formState.blockCount}
                  onChange={(e) => setFormState({ ...formState, blockCount: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-[#10b981]/50 font-light"
                  placeholder="e.g. 3 blocks"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">Message Details</label>
                <textarea
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-[#10b981]/50 font-light"
                  placeholder="Describe your orchard altitude, apple varieties (e.g. Gala, Honeycrisp), or current disease issues..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#10b981] hover:bg-[#1ed760] text-black font-bold text-xs tracking-widest uppercase rounded-2xl transition-all duration-300 shadow-md shadow-[#10b981]/25 hover:scale-[1.01]"
              >
                Send Request
              </button>
            </form>
          )}
        </div>

      </section>

      <Footer />
    </main>
  );
}
