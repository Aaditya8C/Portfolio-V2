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
          <TacticalLabel>DEPLOYMENT RECORD</TacticalLabel>
        </div>

        {/* Section Title */}
        <div className="max-w-[700px] w-full space-y-4">
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-widest uppercase">
            DEPLOYMENT RECORD
          </h2>
          <SectionDivider />
        </div>

        {/* Timeline Container */}
        <div className="relative pl-12 md:pl-20 max-w-[800px] w-full mt-6 space-y-12">
          
          {/* Ruled double red line representing notepad/file margins */}
          <div className="absolute left-[16px] md:left-[36px] top-0 bottom-0 w-[4px] border-l border-r border-red-raw opacity-40 timeline-line" />

          {/* Entries Loop */}
          {experience.map((entry) => (
            <div
              key={entry.id}
              className="experience-entry relative flex flex-col space-y-4"
            >
              
              {/* Timeline Status Node Point */}
              <div className="absolute -left-[56px] md:-left-[76px] top-1 flex items-center justify-center">
                {getStatusBadge(entry.status)}
              </div>

              {/* Dossier Card Container */}
              <div className="border border-border-dim bg-surface p-6 dossier-card flex flex-col space-y-3 group hover:border-border-sharp transition-colors duration-300">
                
                {/* Dossier Bracket Corners */}
                <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

                {/* Metadata Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-tactical text-[10px] text-ghost tracking-wider uppercase">
                    ID: {entry.id}
                  </span>
                  <span className="font-tactical text-[10px] text-secondary tracking-wider">
                    {entry.period} // {entry.location}
                  </span>
                </div>

                {/* Org & Role */}
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase group-hover:text-red-bright transition-colors duration-200">
                    {entry.org}
                  </h3>
                  <div className="font-tactical text-xs text-secondary tracking-wider mt-0.5">
                    {entry.role}
                  </div>
                  <SectionDivider className="mt-2" />
                </div>

                {/* Bullet Brief Descriptions */}
                <ul className="space-y-2 font-body text-xs sm:text-sm text-primary font-light">
                  {entry.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-raw font-bold mr-2 select-none">&#8250;</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
