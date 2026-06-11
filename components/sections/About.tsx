"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import TacticalLabel from "@/components/ui/TacticalLabel";
import CaseNumber from "@/components/ui/CaseNumber";
import SectionDivider from "@/components/ui/SectionDivider";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const heading = sectionRef.current?.querySelector(".about-heading");
      const content = sectionRef.current?.querySelector(".about-content");
      const stats = statsRef.current?.querySelector(".about-stats");

      const triggers: any[] = [];

      // Heading Reveal animation
      if (heading) {
        const t1 = gsap.fromTo(
          heading,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
        triggers.push(t1.scrollTrigger);
      }

      // Biographical Paragraphs Reveal animation
      if (content) {
        const t2 = gsap.fromTo(
          content,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: content,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
        triggers.push(t2.scrollTrigger);
      }

      // Stats block sweep in reveal animation
      if (stats) {
        const t3 = gsap.fromTo(
          stats,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stats,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
        triggers.push(t3.scrollTrigger);

        const statNumbers = stats.querySelectorAll(".stat-number");
        const t4 = ScrollTrigger.create({
          trigger: stats,
          start: "top 80%",
          onEnter: () => {
            statNumbers.forEach((el) => {
              const htmlEl = el as HTMLElement;
              const targetVal = htmlEl.getAttribute("data-value");
              if (!targetVal) return;

              if (targetVal === "∞") {
                gsap.fromTo(
                  htmlEl,
                  { opacity: 0 },
                  { opacity: 1, duration: 1.5, ease: "power2.out" }
                );
                return;
              }

              const target = parseInt(targetVal, 10);
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                  htmlEl.textContent = Math.round(obj.val) + "+";
                },
              });
            });
          },
          once: true,
        });
        triggers.push(t4);
      }

      // Cleanup memory leaks
      return () => {
        triggers.forEach((trigger) => {
          if (trigger) trigger.kill();
        });
      };
    }
  }, []);

  return (
    <section
      id="intel"
      ref={sectionRef}
      className="bg-void border-t border-border-dim py-20 relative overflow-hidden"
    >
      {/* Subtle background CLASSIFIED stamp */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] overflow-hidden -z-10">
        <span className="font-stamp text-[160px] tracking-wider uppercase rotate-[15deg] text-white">
          REDACTED
        </span>
      </div>

      <div className="container w-full flex flex-col space-y-8 text-left">
        
        {/* Section Label */}
        <div className="flex items-center">
          <TacticalLabel>OPERATIVE PROFILE</TacticalLabel>
        </div>

        {/* Two-Column Grid Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* LEFT COLUMN: Heading, case specs, and paragraphs */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            
            {/* Heading Panel & Red Divider */}
            <div className="about-heading w-full space-y-4">
              <h2 className="font-display text-5xl md:text-6xl text-white tracking-widest uppercase">
                OPERATIVE PROFILE
              </h2>
              <SectionDivider />
            </div>

            {/* Case Dossier Specs */}
            <div className="about-content w-full flex flex-col space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-tactical text-xs border border-border-dim bg-surface p-6 dossier-card">
                
                {/* Dossier ID */}
                <div className="sm:col-span-2 pb-2">
                  <CaseNumber num="001" />
                </div>

                <div className="space-y-1 border-l border-red-raw pl-3">
                  <div className="text-secondary text-[10px] uppercase tracking-wider">
                    SUBJECT
                  </div>
                  <div className="text-white text-sm font-medium">
                    AADITYA KULKARNI
                  </div>
                </div>

                <div className="space-y-1 border-l border-red-raw pl-3">
                  <div className="text-secondary text-[10px] uppercase tracking-wider">
                    SPECIALIZATION
                  </div>
                  <div className="text-white text-sm font-medium">
                    FULL-STACK ENGINEERING
                  </div>
                </div>

                <div className="space-y-1 border-l border-red-raw pl-3">
                  <div className="text-secondary text-[10px] uppercase tracking-wider">
                    CURRENT STATION
                  </div>
                  <div className="text-white text-sm font-medium">
                    JPMORGAN CHASE // MUMBAI
                  </div>
                </div>

                <div className="space-y-1 border-l border-red-raw pl-3">
                  <div className="text-secondary text-[10px] uppercase tracking-wider">
                    CLEARANCE STATUS
                  </div>
                  <div className="text-red-bright text-sm font-medium">
                    LEVEL 5 APPROVED
                  </div>
                </div>

              </div>

              {/* Dossier Text Paragraphs */}
              <div className="space-y-4 font-body text-primary font-light text-sm md:text-base leading-relaxed">
                <p>
                  Subject has operated across the full application stack since 2022. Known for building 
                  systems under pressure, optimizing critical rendering pathways, and shipping lightweight, 
                  scalable builds. Specialized in React/Next.js architectures, secure Web3 smart contracts, 
                  and production-grade backend infrastructure.
                </p>
                <p>
                  Last deployed at JPMorgan Chase as a Software Engineering Intern, handling enterprise 
                  financial infrastructure and core developer services. Active profile maintains constant 
                  commitment to low-latency operations, clean codebase compilation, and robust performance 
                  benchmarks.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Vertical Statistics Panel */}
          <div
            ref={statsRef}
            className="lg:col-span-4 w-full lg:pt-16"
          >
            <div className="about-stats w-full">
              <div className="flex flex-col border border-border-mid bg-surface dossier-card divide-y divide-border-mid">
                {/* Dossier corner bracket overlay */}
                <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

                {/* Stat 1 */}
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <span
                    className="stat-number font-display text-5xl sm:text-6xl lg:text-7.5xl text-white font-bold leading-none"
                    data-value="2"
                  >
                    0+
                  </span>
                  <span className="font-tactical text-[9px] sm:text-[10px] text-secondary tracking-widest uppercase mt-2">
                    YEARS
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <span
                    className="stat-number font-display text-5xl sm:text-6xl lg:text-7.5xl text-white font-bold leading-none"
                    data-value="5"
                  >
                    0+
                  </span>
                  <span className="font-tactical text-[9px] sm:text-[10px] text-secondary tracking-widest uppercase mt-2">
                    ORGS
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <span
                    className="stat-number font-display text-5xl sm:text-6xl lg:text-7.5xl text-white font-bold leading-none"
                    data-value="10"
                  >
                    0+
                  </span>
                  <span className="font-tactical text-[9px] sm:text-[10px] text-secondary tracking-widest uppercase mt-2">
                    PROJECTS
                  </span>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <span
                    className="stat-number font-display text-5xl sm:text-6xl lg:text-7.5xl text-red-bright font-bold leading-none"
                    data-value="∞"
                  >
                    ∞
                  </span>
                  <span className="font-tactical text-[9px] sm:text-[10px] text-secondary tracking-widest uppercase mt-2">
                    COMMITS
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
