"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { techStack } from "@/lib/data/stack";
import TacticalLabel from "@/components/ui/TacticalLabel";
import CaseNumber from "@/components/ui/CaseNumber";
import SectionDivider from "@/components/ui/SectionDivider";

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const heading = sectionRef.current?.querySelector(".arsenal-heading");
      const cards = sectionRef.current?.querySelectorAll(".arsenal-card");
      const triggers: any[] = [];

      // Heading Reveal
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

      // Staggered Cards Reveal
      if (cards && cards.length > 0) {
        const t2 = gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: sectionRef.current?.querySelector(".arsenal-grid"),
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
        triggers.push(t2.scrollTrigger);
      }

      return () => {
        triggers.forEach((trigger) => {
          if (trigger) trigger.kill();
        });
      };
    }
  }, []);

  // Helper to draw the block characters. 10 chars total.
  // Red for filled blocks, --text-ghost for empty blocks.
  const renderProficiencyBlocks = (rating: number) => {
    const filled = "█".repeat(rating);
    const empty = "░".repeat(10 - rating);
    return (
      <span className="font-tactical select-none tracking-wider whitespace-nowrap">
        <span className="text-red-bright">{filled}</span>
        <span className="text-ghost">{empty}</span>
      </span>
    );
  };

  return (
    <section
      id="arsenal"
      ref={sectionRef}
      className="bg-void border-t border-border-dim py-20 relative overflow-hidden"
    >
      {/* Subtle diagonal background CLASSIFIED stamp */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] overflow-hidden -z-10">
        <span className="font-stamp text-[160px] tracking-wider uppercase rotate-[-15deg] text-white">
          EQUIPMENT
        </span>
      </div>

      <div className="container w-full flex flex-col space-y-8 text-left">
        
        {/* Section Label */}
        <div className="flex items-center justify-between">
          <TacticalLabel>ARSENAL</TacticalLabel>
          <CaseNumber num="003" />
        </div>

        {/* Heading Panel & Red Divider */}
        <div className="arsenal-heading max-w-[700px] w-full space-y-4">
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-widest uppercase">
            ARSENAL
          </h2>
          <SectionDivider />
        </div>

        {/* Tactical Manifest Inventory Grid */}
        <div className="arsenal-grid grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1000px] mt-6">
          {techStack.map((cat) => (
            <div
              key={cat.id}
              className="arsenal-card border border-border-dim bg-surface p-6 dossier-card flex flex-col space-y-4 group hover:border-border-sharp transition-colors duration-300 relative"
            >
              {/* Dossier Corner bracket borders */}
              <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

              {/* Card Header */}
              <div className="flex items-center justify-between relative z-10">
                <span className="font-display text-[15px] tracking-widest text-white uppercase select-none group-hover:text-red-bright transition-colors duration-200">
                  {cat.category}
                </span>
                <span className="font-tactical text-[9px] text-ghost select-none">INV-ID // {cat.id}</span>
              </div>
              
              <SectionDivider className="opacity-20 relative z-10" />

              {/* Items List */}
              <div className="flex flex-col space-y-2.5 font-tactical relative z-10">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 text-[12px] border-b border-border-dim border-opacity-30 pb-2 last:border-none last:pb-0"
                  >
                    <span className="text-primary">{item.name}</span>
                    <div className="flex items-center justify-between sm:justify-start gap-4">
                      {renderProficiencyBlocks(item.rating)}
                      <span className="text-secondary text-[10px] font-bold tracking-widest min-w-[70px] text-right uppercase">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
