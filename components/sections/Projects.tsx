"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { projects, Project } from "@/lib/data/projects";
import TacticalLabel from "@/components/ui/TacticalLabel";
import CaseNumber from "@/components/ui/CaseNumber";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cards = containerRef.current?.querySelectorAll(".mission-card");
      let triggerInstance: any = null;

      if (cards && cards.length > 0) {
        triggerInstance = gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      return () => {
        if (triggerInstance && triggerInstance.scrollTrigger) {
          triggerInstance.scrollTrigger.kill();
        }
      };
    }
  }, []);

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="missions"
      ref={containerRef}
      className="bg-void border-t border-border-dim py-20 relative"
    >
      <div className="container w-full flex flex-col space-y-8 text-left">
        
        {/* Section Label */}
        <div className="flex items-center">
          <TacticalLabel>MISSION FILES</TacticalLabel>
        </div>

        {/* Section Title */}
        <div className="max-w-[700px] w-full space-y-4">
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-widest uppercase">
            MISSION FILES
          </h2>
          <SectionDivider />
        </div>

        {/* Featured Mission Card */}
        <div className="mission-card w-full mt-4">
          <div className="relative border-l-3 border-l-red-raw border-y border-r border-border-dim bg-surface p-8 dossier-card transition-all duration-300 hover:border-l-red-bright hover:bg-elevated overflow-hidden group">
            
            {/* Dossier Corner bracket borders */}
            <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

            {/* Background watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden z-0">
              <span className="font-stamp text-[100px] sm:text-[140px] tracking-widest uppercase rotate-[-18deg] text-white">
                CLASSIFIED
              </span>
            </div>

            {/* Card Content */}
            <div className="relative z-10 flex flex-col space-y-4">
              
              {/* Header Info Strip */}
              <div className="flex items-center justify-between">
                <CaseNumber num={featuredProject.id.replace("CASE-", "")} />
                <span className="font-tactical text-[9px] text-red-bright border border-red-raw px-2 py-0.5 select-none bg-red-stain">
                  {featuredProject.status}
                </span>
              </div>

              {/* Title */}
              <div className="pt-2">
                <h3 className="font-display text-3xl sm:text-5xl text-white tracking-wide uppercase">
                  OPERATION: {featuredProject.title}
                </h3>
                <SectionDivider className="mt-2" />
              </div>

              {/* Objective & Description */}
              <div className="space-y-2 font-body text-xs sm:text-sm max-w-3xl">
                <div>
                  <span className="font-tactical text-accent mr-2 uppercase text-[11px] tracking-wider">[ OBJECTIVE ]</span>
                  <span className="text-primary font-light">{featuredProject.objective}</span>
                </div>
                <div>
                  <span className="font-tactical text-secondary mr-2 uppercase text-[11px] tracking-wider">[ TARGET ]</span>
                  <span className="text-secondary font-light">{featuredProject.description}</span>
                </div>
              </div>

              {/* Tech Deployed */}
              <div className="font-tactical text-[11px] text-[#8B9E6E] pt-2">
                TECH DEPLOYED: {featuredProject.stack.join(" // ")}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-6 pt-4">
                <a
                  href={featuredProject.github}
                  className="btn-primary text-center"
                  id="featured-open-file-btn"
                >
                  Open File
                </a>
                <a
                  href={featuredProject.live}
                  className="btn-secondary group text-center"
                  id="featured-field-report-btn"
                >
                  Field Report <span className="arrow transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Regular Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
          {regularProjects.map((project) => (
            <div
              key={project.id}
              className="mission-card relative bg-surface p-6 border border-border-dim dossier-card transition-all duration-300 hover:border-border-sharp overflow-hidden group"
            >
              {/* Dossier Corner bracket borders */}
              <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

              {/* Card content */}
              <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
                
                {/* Case & Status Header */}
                <div className="flex items-center justify-between">
                  <CaseNumber num={project.id.replace("CASE-", "")} />
                </div>

                {/* Operation Title */}
                <div className="pt-2">
                  <h4 className="font-display text-2xl text-white tracking-wide uppercase">
                    {project.title}
                  </h4>
                  <SectionDivider className="mt-1.5" />
                </div>

                {/* Short Description */}
                <p className="font-body text-xs text-secondary leading-relaxed font-light flex-grow">
                  {project.objective}
                </p>

                {/* Tags Strip */}
                <div className="font-tactical text-[10px] text-ghost tracking-wide pt-2">
                  {project.stack.join(" // ")}
                </div>

                {/* Action View Trigger */}
                <div className="pt-2">
                  <a
                    href={project.github}
                    className="font-tactical text-[11px] text-secondary hover:text-red-bright transition-colors duration-200 uppercase tracking-widest"
                  >
                    [ View ]
                  </a>
                </div>

              </div>

              {/* Completed Status ink stamp overlay */}
              {project.status === "COMPLETED" && (
                <div className="absolute bottom-4 right-4 pointer-events-none select-none opacity-15 overflow-hidden z-0">
                  <span className="font-stamp text-[14px] border border-red-raw px-2 py-0.5 rounded-xs uppercase tracking-widest text-red-bright inline-block rotate-[-12deg]">
                    COMPLETED
                  </span>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
