"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { experience, ExperienceEntry } from "@/lib/data/experience";
import TacticalLabel from "@/components/ui/TacticalLabel";
import CaseNumber from "@/components/ui/CaseNumber";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const line = sectionRef.current?.querySelector(".timeline-line");
      const entries = sectionRef.current?.querySelectorAll(".experience-entry");
      const triggers: any[] = [];

      // Scale the double-red timeline line down as scroll progress advances
      if (line) {
        const t1 = gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
        triggers.push(t1.scrollTrigger);
      }

      // Slide in each experience dossier card from the left
      if (entries && entries.length > 0) {
        entries.forEach((entry) => {
          const t2 = gsap.fromTo(
            entry,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
          triggers.push(t2.scrollTrigger);
        });
      }

      return () => {
        triggers.forEach((trigger) => {
          if (trigger) trigger.kill();
        });
      };
    }
  }, []);

  const getStatusBadge = (status: ExperienceEntry["status"]) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="font-tactical text-[9px] text-red-bright border border-red-raw px-2 py-0.5 bg-red-stain select-none uppercase tracking-wider">
            &#9664; ACTIVE &#9654;
          </span>
        );
      case "COMPLETED":
        return (
          <span className="font-tactical text-[9px] text-secondary border border-border-mid px-2 py-0.5 bg-surface select-none uppercase tracking-wider">
            &#9664; COMPLETED &#9654;
          </span>
        );
      case "ONGOING":
        return (
          <span className="font-tactical text-[9px] text-white border border-border-sharp px-2 py-0.5 bg-[#141414] select-none uppercase tracking-wider">
            &#9664; ONGOING &#9654;
          </span>
        );
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="experience-section bg-void border-t border-border-dim py-20 relative overflow-hidden"
    >
      {/* Background diagonal text watermark */}
      <div className="absolute top-1/4 right-10 pointer-events-none select-none opacity-[0.02] overflow-hidden -z-10">
        <span className="font-stamp text-[150px] tracking-widest uppercase rotate-[-12deg] text-white">
          DEPLOYMENT
        </span>
      </div>

      <div className="container w-full flex flex-col space-y-8 text-left">

        {/* Section Label */}
        <div className="flex items-center">
          <TacticalLabel>CHAPTER 3</TacticalLabel>
        </div>

        {/* Section Title */}
        <div className="max-w-[700px] w-full space-y-4">
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-widest uppercase">
            DEPLOYMENT RECORD
          </h2>
          <SectionDivider />
        </div>

        {/* Two-Column Grid for Timeline & Archive metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">

          {/* Left Column: Timeline */}
          <div className="lg:col-span-8 relative pl-6 sm:pl-12 md:pl-20 w-full mt-6 space-y-12 md:space-y-20">

            {/* Ruled double red line representing notepad/file margins */}
            <div className="absolute left-[8px] md:left-[36px] top-0 bottom-0 w-[4px] border-l border-r border-red-raw opacity-40 timeline-line" />

            {/* Entries Loop */}
            {experience.map((entry) => (
              <div
                key={entry.id}
                className="experience-entry relative flex flex-col space-y-4"
              >

                {/* Timeline Status Node Point */}
                <div className="absolute left-[-19px] md:left-[-47px] top-[35px] w-2.5 h-2.5 bg-red-bright rounded-full border border-void transform -translate-y-1/2 z-10 flex items-center justify-center">
                  <span className="w-1 h-1 bg-white rounded-full animate-ping opacity-75" />
                </div>

                {/* Dossier Card Container */}
                <div className="border border-border-dim bg-surface p-5 md:p-8 dossier-card flex flex-col space-y-4 group hover:border-border-sharp transition-colors duration-300 relative">

                  {/* Dossier Bracket Corners */}
                  <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

                  {/* Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center space-x-3">
                      <span className="font-tactical text-[10px] text-ghost tracking-wider uppercase">
                        ID: {entry.id}
                      </span>
                      {getStatusBadge(entry.status)}
                    </div>
                    <span className="font-tactical text-[10px] text-secondary tracking-wider">
                      {entry.period} // {entry.location}
                    </span>
                  </div>

                  {/* Org & Role */}
                  <div className="relative z-10">
                    <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase group-hover:text-red-bright transition-colors duration-200">
                      {entry.org}
                    </h3>
                    <div className="font-tactical text-xs text-secondary tracking-wider mt-0.5">
                      {entry.role}
                    </div>
                    <SectionDivider className="mt-2.5" />
                  </div>

                  {/* Bullet Brief Descriptions */}
                  <ul className="space-y-3 font-body text-xs sm:text-sm text-primary font-light relative z-10">
                    {entry.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-red-raw font-bold mr-2 select-none mt-0.5">&#8250;</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                </div>

              </div>
            ))}

          </div>

          {/* Right Column: Decorative Archive metadata sidebar (desktop only) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col space-y-6 pl-8 border-l border-border-dim border-opacity-40 select-none">

            <div className="space-y-2">
              <span className="font-tactical text-[10px] text-accent tracking-widest uppercase block">
                [ SYSTEM TELEMETRY ]
              </span>
              <div className="font-tactical text-[11px] text-secondary leading-relaxed space-y-1.5 uppercase">
                <div>RECORD-ID // REC-992-01</div>
                <div>CLASSIFICATION // CONFIDENTIAL</div>
                <div>CLEARANCE // LEVEL 5 REQUIRED</div>
                <div>CHECKSUM // SHA-256 OK</div>
              </div>
            </div>

            <SectionDivider className="opacity-20" />

            <div className="space-y-3 font-tactical text-[11px] uppercase tracking-wider">
              <div className="flex justify-between items-center py-1">
                <span className="text-ghost">STATUS</span>
                <span className="text-red-bright font-bold">● ACTIVE RECORD</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-ghost">LAST ARCHIVE INDEX</span>
                <span className="text-secondary">JUNE 2026</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-ghost">STATION</span>
                <span className="text-primary">MUMBAI HQ</span>
              </div>
            </div>

            <SectionDivider className="opacity-20" />

            {/* Enormous Watermark */}
            <div className="pt-8 opacity-[0.03] flex items-center justify-center">
              <span className="font-stamp text-[80px] font-bold text-white tracking-widest uppercase rotate-[90deg] origin-center translate-y-12">
                ARCHIVE
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
