"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { journeyMilestones } from "@/lib/data/journey";
import TacticalLabel from "@/components/ui/TacticalLabel";
import CaseNumber from "@/components/ui/CaseNumber";
import SectionDivider from "@/components/ui/SectionDivider";
import { ScrollTrigger } from "gsap/all";

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let ctx = gsap.context(() => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const matchMedia = window.matchMedia("(min-width: 768px)");

        if (matchMedia.matches) {
          gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${track.scrollWidth - window.innerWidth}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }, sectionRef);

      // Trigger a refresh after components/fonts render completely
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => {
        ctx.revert();
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="journey-section bg-void border-t border-border-dim md:h-screen flex flex-col md:justify-center relative overflow-hidden py-20 md:py-0"
    >
      {/* Background diagonal watermark stamp */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] overflow-hidden -z-10">
        <span className="font-stamp text-[140px] sm:text-[180px] tracking-widest uppercase rotate-[-12deg] text-white">
          JOURNAL
        </span>
      </div>

      {/* Desktop Layout: Pinned scroll track */}
      <div
        className="hidden md:flex journey-track items-center space-x-8 px-[10vw] w-max h-full"
        ref={trackRef}
      >
        {/* Intro Card */}
        <div className="flex flex-col space-y-4 w-[420px] shrink-0 pr-12 select-none">
          <div className="flex items-center">
            <TacticalLabel>FIELD REPORT INDEX</TacticalLabel>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-widest uppercase">
            FIELD INTELLIGENCE
          </h2>
          <SectionDivider />
          <p className="font-body text-xs text-secondary leading-relaxed font-light">
            Chronological field intelligence log recording subject's technical development, critical system integrations, and tactical deployment milestones.
          </p>
          <div className="font-tactical text-[11px] text-ghost uppercase tracking-wider">
            SCROLL DOWN TO INITIATE SEQUENCE &rarr;
          </div>
        </div>

        {/* Milestone Cards */}
        {journeyMilestones.map((milestone) => (
          <div
            key={milestone.id}
            className="w-[380px] shrink-0 border border-border-dim border-l-2 border-l-red-raw bg-surface p-6 dossier-card relative group hover:border-border-sharp transition-colors duration-300 flex flex-col justify-between h-[360px] overflow-hidden select-none"
          >
            {/* Dossier corner bracket overlay */}
            <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

            {/* Background year watermark */}
            <div className="absolute -bottom-6 -right-2 pointer-events-none select-none opacity-[0.04] overflow-hidden z-0">
              <span className="font-stamp text-[90px] font-bold text-white tracking-tighter">
                {milestone.year}
              </span>
            </div>

            <div className="relative z-10 flex flex-col space-y-4">
              {/* Report Header */}
              <div className="flex flex-col space-y-1 font-tactical text-[11px] text-secondary tracking-widest">
                <span>{milestone.id}</span>
                <span className="text-[10px] text-ghost">LOG DATE // {milestone.date}</span>
              </div>

              {/* Title */}
              <div className="pt-1">
                <h3 className="font-display text-2xl text-white tracking-wide uppercase group-hover:text-red-bright transition-colors duration-200">
                  {milestone.title}
                </h3>
                <SectionDivider className="mt-2" />
              </div>

              {/* Description */}
              <p className="font-body text-xs text-primary leading-relaxed font-light">
                {milestone.description}
              </p>
            </div>

            {/* Outcome Badge */}
            <div className="relative z-10 pt-4">
              <span className="font-tactical text-[10px] text-code border border-code/30 px-2 py-0.5 bg-code/5 tracking-wider uppercase font-bold">
                OUTCOME // {milestone.outcome}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Mobile Layout: Standard vertical stack */}
      <div className="container w-full flex flex-col space-y-8 text-left md:hidden">

        {/* Header */}
        <div className="flex items-center">
          <TacticalLabel>FIELD REPORT INDEX</TacticalLabel>
        </div>
        <div className="max-w-[700px] w-full space-y-4">
          <h2 className="font-display text-5xl text-white tracking-widest uppercase">
            FIELD INTELLIGENCE
          </h2>
          <SectionDivider />
          <p className="font-body text-xs text-secondary leading-relaxed font-light">
            Chronological field intelligence log recording subject's technical development, critical system integrations, and tactical deployment milestones.
          </p>
        </div>

        {/* Milestone Cards List */}
        <div className="flex flex-col space-y-6 mt-6">
          {journeyMilestones.map((milestone) => (
            <div
              key={milestone.id}
              className="w-full border border-border-dim border-l-2 border-l-red-raw bg-surface p-6 dossier-card relative flex flex-col justify-between min-h-[280px] overflow-hidden"
            >
              {/* Dossier corner bracket overlay */}
              <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

              {/* Background year watermark */}
              <div className="absolute -bottom-6 -right-2 pointer-events-none select-none opacity-[0.04] overflow-hidden z-0">
                <span className="font-stamp text-[80px] font-bold text-white tracking-tighter">
                  {milestone.year}
                </span>
              </div>

              <div className="relative z-10 flex flex-col space-y-4">
                {/* Report Header */}
                <div className="flex flex-col space-y-1 font-tactical text-[11px] text-secondary tracking-widest">
                  <span>{milestone.id}</span>
                  <span className="text-[10px] text-ghost">LOG DATE // {milestone.date}</span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-display text-2xl text-white tracking-wide uppercase">
                    {milestone.title}
                  </h3>
                  <SectionDivider className="mt-2" />
                </div>

                {/* Description */}
                <p className="font-body text-xs text-primary leading-relaxed font-light">
                  {milestone.description}
                </p>
              </div>

              {/* Outcome Badge */}
              <div className="relative z-10 pt-6">
                <span className="font-tactical text-[10px] text-code border border-code/30 px-2 py-0.5 bg-code/5 tracking-wider uppercase font-bold">
                  OUTCOME // {milestone.outcome}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
