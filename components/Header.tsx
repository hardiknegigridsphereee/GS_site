"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Product", href: "/product" },
    { name: "Blogs", href: "/blogs" },
    { name: "Gallery", href: "/gallery" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-forest/10 bg-pearl backdrop-blur-md py-2 px-6 md:px-12 flex items-center justify-between transition-all">
      {/* Logo — real box sizing, no transform/rotate so mix-blend-mode composites
          seamlessly against the page with zero extra background hacks */}
      <Link href="/" className="flex items-center shrink-0">
        <div className="relative w-28 h-14 md:w-36 md:h-16">
          <img
            src="/logo1.webp"
            alt="GridSphere Logo"
            className="w-full h-full object-contain [filter:brightness(0)_saturate(100%)_invert(20%)_sepia(31%)_saturate(1352%)_hue-rotate(115deg)_brightness(93%)_contrast(93%)]"
          />
        </div>
      </Link>

      {/* Desktop Navigation Menu */}
      <nav className="hidden md:flex items-center gap-10 text-lg lg:text-xl font-bold">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-all duration-300 hover:text-forest hover:scale-105 transform inline-block relative py-1.5 group ${isActive ? "text-jade" : "text-forest/70"
                }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-jade transform origin-left transition-transform duration-355 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
            </Link>
          );
        })}
      </nav>

      {/* Desktop Action Button */}
      <Link
        href="/contact"
        className="hidden md:inline-block px-6 py-2 rounded-full bg-honey hover:bg-amber text-evergreen text-sm md:text-base font-bold tracking-wider uppercase transition-all duration-300 shadow-md shadow-honey/20 hover:scale-105"
      >
        Buy Now
      </Link>

      {/* Mobile Hamburger Toggle */}
      <button
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="md:hidden flex items-center justify-center w-10 h-10 text-forest"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-pearl border-b border-forest/10 shadow-lg">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 text-lg font-bold border-b border-forest/5 last:border-b-0 ${isActive ? "text-jade" : "text-forest/80"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 px-6 py-3 rounded-full bg-honey hover:bg-amber text-evergreen text-center text-base font-bold tracking-wider uppercase transition-all duration-300"
            >
              Buy Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
