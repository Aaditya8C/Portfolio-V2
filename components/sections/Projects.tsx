"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { projects, Project } from "@/lib/data/projects";
import TacticalLabel from "@/components/ui/TacticalLabel";
import CaseNumber from "@/components/ui/CaseNumber";
import SectionDivider from "@/components/ui/SectionDivider";
import { HardHat, BrainCircuit } from "lucide-react";

// Dynamic icon resolver for mental health classification and construction management
const ProjectIcon = ({ title, className }: { title: string; className?: string }) => {
  if (title.toLowerCase().includes("contrall")) {
    return <HardHat className={`${className} text-[#FF8C00]`} size={24} />;
  }
  if (title.toLowerCase().includes("depression")) {
    return <BrainCircuit className={`${className} text-red-bright`} size={24} />;
  }
  return null;
};

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
          <TacticalLabel>CHAPTER 2</TacticalLabel>
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
                <div className="flex items-center space-x-3">
                  <CaseNumber num={featuredProject.id.replace("CASE-", "")} />
                  {featuredProject.logo ? (
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-void border border-border-dim p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={featuredProject.logo}
                        alt={`${featuredProject.title} logo`}
                        className="object-contain max-w-full max-h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-void border border-border-dim flex items-center justify-center shrink-0">
                      <ProjectIcon title={featuredProject.title} />
                    </div>
                  )}
                </div>
                <span className="font-tactical text-[9px] text-red-bright border border-red-raw px-2 py-0.5 select-none bg-red-stain">
                  {featuredProject.status}
                </span>
              </div>

              {/* Title & Role Info */}
              <div className="pt-2">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide uppercase">
                    OPERATION: {featuredProject.title}
                  </h3>
                  {featuredProject.period && (
                    <span className="font-tactical text-[10px] text-secondary tracking-widest uppercase shrink-0 bg-void border border-border-dim px-2 py-0.5">
                      {featuredProject.role} // {featuredProject.period}
                    </span>
                  )}
                </div>
                <SectionDivider className="mt-2" />
              </div>

              {/* Objective & Description / Bullets */}
              <div className="space-y-4 font-body text-xs sm:text-sm max-w-3xl">
                <div>
                  <span className="font-tactical text-accent mr-2 uppercase text-[11px] tracking-wider">[ OBJECTIVE ]</span>
                  <span className="text-primary font-light">{featuredProject.objective}</span>
                </div>
                {featuredProject.bullets ? (
                  <div className="space-y-2 pt-1">
                    <span className="font-tactical text-secondary block uppercase text-[11px] tracking-wider mb-2">[ REQUISITION REPORT / HIGHLIGHTS ]</span>
                    <ul className="space-y-2 font-body text-xs sm:text-sm text-primary font-light pl-1">
                      {featuredProject.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-raw font-bold mr-2 select-none">&#8250;</span>
                          <span className="text-secondary leading-relaxed font-light">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <span className="font-tactical text-secondary mr-2 uppercase text-[11px] tracking-wider">[ TARGET ]</span>
                    <span className="text-secondary font-light">{featuredProject.description}</span>
                  </div>
                )}
              </div>

              {/* Tech Deployed */}
              <div className="font-tactical text-[11px] text-[#8B9E6E] pt-2">
                TECH DEPLOYED: {featuredProject.stack.join(" // ")}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {featuredProject.github && featuredProject.github !== "#" ? (
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-center"
                    id="featured-open-file-btn"
                  >
                    Open File
                  </a>
                ) : (
                  <span className="font-tactical text-[11px] text-red-raw border border-red-raw/40 px-3 py-2 bg-red-stain/10 select-none cursor-not-allowed uppercase tracking-wider">
                    [ SOURCE CLASSIFIED ]
                  </span>
                )}

                {featuredProject.live && featuredProject.live !== "#" ? (
                  <a
                    href={featuredProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary group text-center"
                    id="featured-field-report-btn"
                  >
                    Field Report <span className="arrow transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                  </a>
                ) : (
                  <span className="font-tactical text-[11px] text-secondary/50 border border-border-dim px-3 py-2 select-none cursor-not-allowed uppercase tracking-wider">
                    [ OFFLINE / INTERNAL ]
                  </span>
                )}
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
                  {project.logo ? (
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-void border border-border-dim p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={project.logo}
                        alt={`${project.title} logo`}
                        className="object-contain max-w-full max-h-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-void border border-border-dim flex items-center justify-center shrink-0">
                      <ProjectIcon title={project.title} />
                    </div>
                  )}
                </div>

                {/* Operation Title */}
                <div className="pt-2">
                  <h4 className="font-display text-2xl text-white tracking-wide uppercase">
                    {project.title.split("–")[0].split("-")[0].trim()}
                  </h4>
                  <SectionDivider className="mt-1.5" />
                </div>

                {/* Short Description */}
                <p className="font-body text-sm text-secondary leading-relaxed font-light flex-grow">
                  {project.objective}
                </p>

                {/* Tags Strip */}
                <div className="font-tactical text-[10px] text-[#8B9E6E] tracking-wide pt-2 ">
                  {project.stack.join(" // ")}
                </div>

                {/* Action View Trigger */}
                <div className="pt-2 flex items-center space-x-4">
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-tactical text-[11px] text-secondary hover:text-red-bright transition-colors duration-200 uppercase tracking-widest"
                    >
                      [ Git ]
                    </a>
                  )}
                  {project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-tactical text-[11px] text-secondary hover:text-red-bright transition-colors duration-200 uppercase tracking-widest"
                    >
                      [ Live ]
                    </a>
                  )}
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

