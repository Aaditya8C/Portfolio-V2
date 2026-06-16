"use client";

import React from "react";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-transparent py-8 border-t border-border-dim font-tactical text-[11px] text-ghost select-none">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          AP // AADITYA PADTE // MUMBAI // 2025
        </div>
        <a
          href="#"
          onClick={scrollToTop}
          className="hover:text-red-bright transition-colors duration-200 uppercase tracking-widest"
          id="back-to-top-btn"
        >
          BACK TO TOP &uarr;
        </a>
      </div>
    </footer>
  );
}
