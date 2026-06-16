"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = document.documentElement.getAttribute("data-theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const links = [
    { label: "INTEL", href: "#intel" },
    { label: "MISSIONS", href: "#missions" },
    { label: "DEPLOYMENT", href: "#experience" },
    { label: "ARSENAL", href: "#arsenal" },
    { label: "NETWORK", href: "#intel-network" },
    { label: "CONTACT", href: "#contact" },
  ];

  useEffect(() => {
    const sectionIds = ["intel", "missions", "experience", "arsenal", "contact"];

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
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
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

          {/* Theme switcher and Status dot */}
          <div className="hidden md:flex items-center space-x-6 select-none font-tactical">
            {mounted ? (
              <button
                onClick={toggleTheme}
                className="font-tactical text-[11px] text-secondary hover:text-red-bright transition-colors uppercase tracking-widest cursor-pointer border border-border-dim px-2.5 py-1 bg-surface h-[28px]"
                aria-label="Toggle theme"
              >
                ◐ {theme === "dark" ? "DARK" : "LIGHT"}
              </button>
            ) : (
              <div className="w-[70px] h-[28px] bg-surface/50 border border-border-dim/50 animate-pulse" />
            )}
            <div className="flex items-center space-x-2 text-primary">
              <span>STATUS: ACTIVE</span>
              <span className="status-dot" />
            </div>
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
                "w-6 h-[1px] bg-primary transition-transform duration-300",
                isOpen && "transform translate-y-2 rotate-45"
              )}
            />
            <span className={clsx("w-4 h-[1px] bg-primary transition-opacity duration-300", isOpen && "opacity-0")} />
            <span
              className={clsx(
                "w-6 h-[1px] bg-primary transition-transform duration-300",
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
          <div className="pt-8 border-t border-border-mid flex flex-col space-y-4">
            {mounted ? (
              <button
                onClick={toggleTheme}
                className="font-tactical text-[12px] text-secondary hover:text-red-bright transition-colors uppercase tracking-widest text-left cursor-pointer"
              >
                ◐ THEME // {theme === "dark" ? "DARK" : "LIGHT"}
              </button>
            ) : (
              <div className="w-[120px] h-[18px] bg-surface/50 border border-border-dim/50 animate-pulse" />
            )}
            <div className="flex items-center space-x-3 text-secondary font-tactical text-sm select-none">
              <span>STATUS: ACTIVE</span>
              <span className="status-dot" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
