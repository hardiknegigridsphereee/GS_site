"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Product", href: "/product" },
    { name: "Blogs", href: "/blogs" },
    { name: "Gallery", href: "/gallery" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050505]/70 backdrop-blur-md py-5 px-6 md:px-12 flex items-center justify-between transition-all">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
          <img src="/logo.png" alt="GridSphere Logo" className="w-full h-full object-contain" />
        </div>
        <span className="text-3xl md:text-4xl font-black tracking-tighter text-white">
          GRID <span className="text-[#10b981]">SPHERE</span>
        </span>
      </Link>

      {/* Navigation Menu */}
      <nav className="hidden md:flex items-center gap-10 text-lg lg:text-xl font-bold">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-all duration-300 hover:text-white hover:scale-105 transform inline-block relative py-1.5 group ${
                isActive ? "text-[#10b981]" : "text-spotify-textSec"
              }`}
            >
              {link.name}
              {/* Sliding green underline indicator on hover / active */}
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#10b981] transform origin-left transition-transform duration-355 ${
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </Link>
          );
        })}
      </nav>

      {/* Action Button */}
      <Link
        href="/contact"
        className="px-6 py-2 rounded-full bg-[#10b981] hover:bg-[#1ed760] text-black text-sm md:text-base font-bold tracking-wider uppercase transition-all duration-300 shadow-md shadow-[#10b981]/20 hover:scale-105"
      >
        Get Started
      </Link>
    </header>
  );
}
