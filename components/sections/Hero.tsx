"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import TacticalLabel from "@/components/ui/TacticalLabel";
import CaseNumber from "@/components/ui/CaseNumber";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Hero() {
  const [typedName, setTypedName] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const fullName = "AADITYA PADTE";
    let index = 0;
    let timer: any = null;

    const typeWriter = () => {
      if (index <= fullName.length) {
        setTypedName(fullName.slice(0, index));
        index++;
        timer = setTimeout(typeWriter, 80); // 80ms per character
      } else {
        setShowCursor(false);
      }
    };

    const startTimeout = setTimeout(() => {
      typeWriter();
    }, 300);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timer);
    };
  }, []);

  const handleScrollToDossier = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo("#intel", { duration: 1.2 });
      } else {
        const section = document.getElementById("intel");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo("#contact", { duration: 1.2 });
      } else {
        const section = document.getElementById("contact");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const typeFirst = typedName.slice(0, 8);
  const typeLast = typedName.slice(8);

  return (
    <section
      id="hero"
      className="min-h-[100svh] flex items-center bg-void relative overflow-hidden pt-20 pb-12 scanlines"
    >
      <div className="container w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">

        {/* Left Column (55% / 7 cols) */}
        <div className="md:col-span-7 flex flex-col space-y-6 text-left">

          {/* Clearance Header Strip */}
          <div className="flex items-center space-x-4">
            <TacticalLabel>DOSSIER NO. 001</TacticalLabel>
            <span className="font-tactical text-[10px] text-red-bright border border-red-raw px-2 py-0.5 select-none bg-red-stain">
              CLASSIFIED
            </span>
          </div>

          {/* Subject Category */}
          <div className="pt-2">
            <div className="font-tactical text-[11px] text-secondary tracking-widest uppercase">
              SUBJECT
            </div>
            <SectionDivider className="mt-1" />
          </div>

          {/* Name Display - Typewriter Animation */}
          <div className="min-h-[50px] sm:min-h-[75px] md:min-h-[90px] lg:min-h-[110px] flex items-center">
            <h1
              className="font-display text-5xl sm:text-7xl lg:text-[85px] xl:text-[105px] tracking-wide text-white uppercase font-bold select-none md:whitespace-nowrap flex items-center leading-none"
            >
              <span>{typeFirst}</span>
              <span className="text-red-raw ml-4">{typeLast}</span>
              {showCursor && (
                <span className="w-[10px] sm:w-[14px] lg:w-[18px] h-[0.85em] bg-red-bright ml-2 inline-block animate-[blink_0.8s_infinite] align-middle shrink-0" />
              )}
            </h1>
          </div>

          {/* Horizontal rule separator */}
          <SectionDivider />

          {/* Brief Specifications */}
          <div className="space-y-1.5 font-tactical text-xs md:text-sm text-secondary">
            <div className="flex items-center space-x-2">
              <span className="text-red-raw font-bold">&#8250;</span>
              <span>SPECIALIZATION // FULL STACK ENGINEER</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-raw font-bold">&#8250;</span>
              <span>STATION // VJTI MUMBAI (B.TECH)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-raw font-bold">&#8250;</span>
              <span>LAST DEPLOYMENT // JPMORGAN CHASE (SWE INTERN)</span>
            </div>
          </div>

          <SectionDivider />

          {/* Requisition Buttons */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <button
              onClick={handleScrollToDossier}
              className="btn-primary"
              id="hero-view-dossier-btn"
            >
              View Dossier
            </button>
            <button
              onClick={handleScrollToContact}
              className="btn-secondary group"
              id="hero-field-report-btn"
            >
              Field Report <span className="arrow transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </button>
          </div>

        </div>

        {/* Right Column (45% / 5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center relative mt-6 md:mt-0">

          {/* Profile Photo Wrapper */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] border border-border-dim bg-surface group select-none">

            {/* Dossier Corner bracket borders */}
            <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

            {/* Behind photo watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden z-0">
              <span className="font-stamp text-[100px] sm:text-[120px] tracking-wider uppercase rotate-[-28deg] text-white">
                CLASSIFIED
              </span>
            </div>

            {/* Asymmetric Cropped Profile Image Container */}
            <div
              className="relative w-full h-full overflow-hidden z-10"
              style={{
                clipPath: "polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)",
              }}
            >
              <Image
                src="/aaditya.jpeg"
                alt="Operative Aaditya Padte"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover grayscale contrast-[1.2] brightness-[0.88] transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
                priority
              />

              {/* Crimson tint mix-multiply hover overlay */}
              <div className="absolute inset-0 bg-[#8B0000] opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-multiply" />
            </div>

            {/* Floating label overlay */}
            <div className="absolute bottom-4 left-4 bg-[#080808]/85 border border-border-dim px-3 py-1 font-tactical text-[9px] tracking-widest text-red-bright uppercase z-20">
              OPERATIVE // ACTIVE
            </div>

          </div>

          {/* Under Photo Data Strip */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] mt-4 text-left font-tactical text-[9px] text-ghost tracking-widest leading-relaxed uppercase">
            CLEARANCE: LEVEL 5 // ACTIVE DEPLOYMENT // MUMBAI STATION
          </div>

        </div>

      </div>
    </section>
  );
}
