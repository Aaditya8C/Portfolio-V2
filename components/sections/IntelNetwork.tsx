"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { publicChannels, communityOperations } from "@/lib/data/intel";
import TacticalLabel from "@/components/ui/TacticalLabel";
import CaseNumber from "@/components/ui/CaseNumber";
import SectionDivider from "@/components/ui/SectionDivider";

export default function IntelNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const leftCards = containerRef.current?.querySelectorAll(".channel-card");
      const rightCards = containerRef.current?.querySelectorAll(".op-card");
      const triggers: any[] = [];

      // Fade-up stagger for Left Column (Public Channels)
      if (leftCards && leftCards.length > 0) {
        const t1 = gsap.fromTo(
          leftCards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: containerRef.current?.querySelector(".channels-column"),
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
        triggers.push(t1.scrollTrigger);
      }

      // Slide-in stagger for Right Column (Community Operations)
      if (rightCards && rightCards.length > 0) {
        const t2 = gsap.fromTo(
          rightCards,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: containerRef.current?.querySelector(".ops-column"),
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

  return (
    <section
      id="intel-network"
      ref={containerRef}
      className="bg-void border-t border-border-dim py-20 relative overflow-hidden"
    >
      {/* Background diagonal text watermark */}
      <div className="absolute top-1/3 left-10 pointer-events-none select-none opacity-[0.02] overflow-hidden -z-10">
        <span className="font-stamp text-[120px] md:text-[150px] tracking-widest uppercase rotate-[-12deg] text-white">
          INTEL-NET
        </span>
      </div>

      <div className="container w-full flex flex-col space-y-8 text-left">

        {/* Section Label */}
        <div className="flex items-center justify-between">
          <TacticalLabel>[ CHAPTER 5 ]</TacticalLabel>
          <CaseNumber num="004" />
        </div>

        {/* Section Title */}
        <div className="max-w-[700px] w-full space-y-4">
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-widest uppercase">
            INTEL NETWORK
          </h2>
          <span className="font-tactical text-[9px] sm:text-[10px] text-secondary tracking-widest uppercase block mt-1">
            EXTERNAL SIGNALS // COMMUNITY OPERATIONS
          </span>
          <SectionDivider />
        </div>

        {/* Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 w-full mt-6">

          {/* Left Column: Public Channels */}
          <div className="lg:col-span-6 flex flex-col space-y-6 channels-column">
            <div className="border-b border-red-raw border-opacity-40 pb-2 mb-2">
              <span className="font-tactical text-[11px] text-accent tracking-widest uppercase font-bold">
                // PUBLIC CHANNELS
              </span>
            </div>

            {publicChannels.map((channel) => (
              <div
                key={channel.id}
                className="channel-card border border-border-dim bg-surface p-5 sm:p-6 dossier-card transition-all duration-300 hover:border-border-sharp hover:bg-elevated relative group cursor-pointer"
                onClick={() => channel.link && window.open(channel.link, "_blank", "noopener,noreferrer")}
              >
                {/* Dossier Corner bracket borders */}
                <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col space-y-3">
                  {/* Card Header metadata */}
                  <div className="flex justify-between items-center text-[10px] font-tactical text-ghost">
                    <span>ID: {channel.id}</span>
                    <span className="text-secondary select-none">// RECORD TYPE: NETWORK</span>
                  </div>

                  {/* Channel Name */}
                  <div>
                    <h3 className="font-display text-2xl text-white tracking-wide uppercase group-hover:text-red-bright transition-colors duration-200">
                      {channel.name}
                    </h3>
                    <span className="font-tactical text-[9px] text-code tracking-wider block mt-0.5">
                      {channel.purpose}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-xs sm:text-sm text-secondary font-light leading-relaxed">
                    {channel.description}
                  </p>

                  <SectionDivider className="opacity-10" />

                  {/* Status & Action footer */}
                  <div className="flex justify-between items-center pt-1">
                    <div className="flex items-center space-x-2">
                      <span className="status-dot" />
                      <span className="font-tactical text-[9px] text-red-bright tracking-wider">
                        STATUS: {channel.status}
                      </span>
                    </div>
                    <span className="font-tactical text-[10px] text-secondary group-hover:text-red-bright transition-colors duration-200">
                      [ ACCESS CONNECTION ] &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Community Operations */}
          <div className="lg:col-span-6 flex flex-col space-y-6 ops-column">
            <div className="border-b border-red-raw border-opacity-40 pb-2 mb-2">
              <span className="font-tactical text-[11px] text-accent tracking-widest uppercase font-bold">
                // COMMUNITY OPERATIONS
              </span>
            </div>

            {communityOperations.map((op) => (
              <div
                key={op.id}
                className="op-card border border-border-dim bg-surface p-5 sm:p-6 dossier-card transition-all duration-300 hover:border-border-sharp hover:bg-elevated relative group"
              >
                {/* Dossier Corner bracket borders */}
                <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col space-y-4">
                  {/* Card Header metadata */}
                  <div className="flex justify-between items-center text-[10px] font-tactical text-ghost">
                    <span>RECORD: {op.id}</span>
                    <span className="text-secondary select-none">// TARGET: COMM_OPS</span>
                  </div>

                  {/* Operation Name */}
                  <div>
                    <span className="font-tactical text-[9px] text-secondary tracking-widest uppercase block">
                      OPERATION:
                    </span>
                    <h3 className="font-display text-2xl text-white tracking-wide uppercase group-hover:text-red-bright transition-colors duration-200 mt-0.5">
                      {op.operation}
                    </h3>
                  </div>

                  {/* Results block styled as intelligence logs */}
                  <div className="space-y-1.5 font-tactical text-xs">
                    <span className="text-ghost tracking-widest uppercase text-[9px] block mb-1">
                      DECRYPTED RESULT DATA:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {op.results.map((result, index) => (
                        <span
                          key={index}
                          className="bg-void border border-border-dim text-code text-[10px] px-2.5 py-1 font-mono tracking-wider"
                        >
                          &#8250; {result}
                        </span>
                      ))}
                    </div>
                  </div>

                  <SectionDivider className="opacity-10" />

                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-tactical text-[9px] text-secondary tracking-widest uppercase">
                      STATUS REPORT:
                    </span>
                    <span className="font-tactical text-[10px] text-red-bright border border-red-raw px-2 py-0.5 select-none bg-red-stain">
                      {op.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
