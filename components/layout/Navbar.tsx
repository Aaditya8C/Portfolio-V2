"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const links = [
    { label: "INTEL", href: "#intel" },
    { label: "MISSIONS", href: "#missions" },
    { label: "ARSENAL", href: "#arsenal" },
    { label: "CONTACT", href: "#contact" },
  ];

  useEffect(() => {
    const sectionIds = ["intel", "missions", "arsenal", "contact"];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Focus middle part of screen
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (typeof window !== "undefined") {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(href, { duration: 1.2 });
      } else {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent font-tactical text-[12px] pointer-events-auto">
        <div className="max-w-[1200px] mx-auto px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="font-display text-2xl text-white tracking-widest hover:text-red-bright transition-colors duration-200"
            id="nav-logo"
          >
            AP
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link, idx) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <React.Fragment key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={clsx(
                      "relative py-2 px-3 tracking-widest transition-colors duration-200 group",
                      isActive ? "text-red-bright font-bold" : "text-secondary hover:text-white"
                    )}
                    id={`nav-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-red-bright scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100" />
                  </a>
                  {idx < links.length - 1 && <span className="text-ghost select-none">//</span>}
                </React.Fragment>
              );
            })}
          </div>

          {/* HUD Status Dot */}
          <div className="hidden md:flex items-center space-x-2 text-white font-tactical select-none">
            <span>STATUS: ACTIVE</span>
            <span className="status-dot" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col items-end space-y-1.5 focus:outline-none z-50 p-2"
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            <span
              className={clsx(
                "w-6 h-[1px] bg-white transition-transform duration-300",
                isOpen && "transform translate-y-2 rotate-45"
              )}
            />
            <span className={clsx("w-4 h-[1px] bg-white transition-opacity duration-300", isOpen && "opacity-0")} />
            <span
              className={clsx(
                "w-6 h-[1px] bg-white transition-transform duration-300",
                isOpen && "transform -translate-y-2.5 -rotate-45"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Full Screen Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-void z-40 flex flex-col justify-center px-10 transition-all duration-500 ease-in-out md:hidden",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex flex-col space-y-8">
          {links.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={clsx(
                  "font-display text-5xl tracking-widest transition-colors duration-200",
                  isActive ? "text-red-bright" : "text-white hover:text-red-bright"
                )}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-8 border-t border-border-mid flex items-center space-x-3 text-secondary font-tactical text-sm">
            <span>STATUS: ACTIVE</span>
            <span className="status-dot" />
          </div>
        </div>
      </div>
    </>
  );
}
