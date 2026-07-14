"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const prevScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  // Use a ref to keep the current hidden state for the scroll handler
  // so we don't recreate the listener on each state change.
  const isHiddenRef = useRef(isHidden);
  useEffect(() => {
    isHiddenRef.current = isHidden;
  }, [isHidden]);

  // Apply dynamic padding to main content
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updatePadding = () => {
      const height = header.offsetHeight;
      const content = document.querySelector("main") || document.querySelector(".content") || document.body;
      if (content) {
        content.style.paddingTop = `${height}px`;
      }
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);
    const observer = new ResizeObserver(updatePadding);
    observer.observe(header);

    return () => {
      window.removeEventListener("resize", updatePadding);
      observer.disconnect();
    };
  }, []);

  // Scroll direction listener – stable, using ref to avoid re‑mounts
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - prevScrollY.current;
      const threshold = 10;

      // Only update when we've crossed the threshold
      if (Math.abs(delta) > threshold) {
        const shouldHide = delta > 0; // true if scrolling down
        if (shouldHide !== isHiddenRef.current) {
          setIsHidden(shouldHide);
          isHiddenRef.current = shouldHide; // keep ref in sync
        }
      }
      prevScrollY.current = currentScrollY;
    };

    // Use requestAnimationFrame to batch updates – ensures smoothness
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // no dependencies → never re‑attached

  // Reset hidden state when route changes (so header is always visible on navigation)
  useEffect(() => {
    setIsHidden(false);
    isHiddenRef.current = false;
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Product", href: "/product" },
    { name: "Blogs", href: "/blogs" },
    { name: "Gallery", href: "/gallery" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 z-50 w-full border-b border-black/10 bg-forest backdrop-blur-md py-2 px-6 md:px-12 flex items-center justify-between transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform ${isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center shrink-0">
        <div className="relative h-10 md:w-36 md:h-16">
          <img
            src="/logo1.webp"
            alt="GridSphere Logo"
            className="w-full h-full object-contain [filter:brightness(0)_saturate(100%)_invert(100%)]"
          />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-10 text-lg lg:text-xl font-bold">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-all duration-300 hover:text-white hover:scale-105 transform inline-block relative py-1.5 group ${isActive ? "text-jade" : "text-pearl/70"
                }`}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-0 w-full h-[2px] bg-jade transform origin-left transition-transform duration-355 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
              />
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

      {/* Mobile Hamburger */}
      <button
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="md:hidden flex items-center justify-center w-10 h-10 text-pearl"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-forest border-b border-black/10 shadow-lg">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 text-lg font-bold border-b border-pearl/10 last:border-b-0 ${isActive ? "text-jade" : "text-pearl/80"
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