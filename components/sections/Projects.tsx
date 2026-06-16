"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { projects, Project } from "@/lib/data/projects";
import TacticalLabel from "@/components/ui/TacticalLabel";
import CaseNumber from "@/components/ui/CaseNumber";
import SectionDivider from "@/components/ui/SectionDivider";
import { HardHat, BrainCircuit, GitBranch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic icon resolver for mental health classification, dev contribution analysis, and construction management
const ProjectIcon = ({ title, className }: { title: string; className?: string }) => {
  if (title.toLowerCase().includes("contrall")) {
    return <HardHat className={`${className} text-[#FF8C00]`} size={24} />;
  }
  if (title.toLowerCase().includes("depression")) {
    return <BrainCircuit className={`${className} text-red-bright`} size={24} />;
  }
  if (title.toLowerCase().includes("devtrace")) {
    return <GitBranch className={`${className} text-[#4ade80]`} size={24} />;
  }
  return null;
};

interface ProjectImageSliderProps {
  images: string[];
  title: string;
  featured?: boolean;
  onImageClick?: (index: number) => void;
}

const ProjectImageSlider = ({ images, title, featured = false, onImageClick }: ProjectImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scrolling effect
  useEffect(() => {
    if (images.length <= 1) return;

    const startAutoPlay = () => {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000); // 5 seconds interval
    };

    startAutoPlay();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, currentIndex]);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    resetTimer();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    resetTimer();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    resetTimer();
    setCurrentIndex(idx);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-void p-6 text-center border border-border-dim">
        <ProjectIcon title={title} />
        <span className="font-tactical text-[9px] text-secondary tracking-widest uppercase mt-4">
          IMAGE RECON UNAVAILABLE
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden border border-border-dim bg-void group/photo">
      {/* Slider Inner Container with Horizontal Slide Transition */}
      <div
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
      >
        {images.map((img, idx) => (
          <div
            key={img}
            className="w-full h-full shrink-0 relative cursor-pointer"
            onClick={() => onImageClick?.(currentIndex)}
          >
            <img
              src={img}
              alt={`${title} view ${idx + 1}`}
              className="object-cover w-full h-full group-hover/photo:scale-102 transition-transform duration-700 ease-out"
            />
          </div>
        ))}
      </div>

      {/* Watermark/stamp overlay */}
      <div className={`absolute bg-red-raw/10 border border-red-raw select-none opacity-25 pointer-events-none hidden md:block z-20 ${featured ? "px-2 py-0.5 bottom-4 right-4" : "px-1.5 py-0.5 bottom-3 right-3"}`}>
        <span className={`font-stamp text-red-bright tracking-widest uppercase rotate-[-12deg] inline-block ${featured ? "text-[11px]" : "text-[8px]"}`}>
          EVIDENCE ATTACHED
        </span>
      </div>



      {/* HUD-Style styled Indicators at the bottom (visible only if more than 1 image) */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-void/90 px-2.5 py-1 border border-border-sharp select-none">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => goToSlide(idx, e)}
              className={`w-1.5 h-1.5 border transition-all duration-300 focus:outline-none cursor-pointer ${
                idx === currentIndex
                  ? "bg-red-raw border-red-bright scale-110"
                  : "bg-transparent border-secondary/50 hover:border-secondary hover:bg-secondary/20"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Dynamic Slide Label Badge */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 z-20 bg-void/90 border border-border-sharp px-1.5 py-0.5 font-tactical text-[6.5px] tracking-widest text-secondary uppercase select-none">
          IMG 0{currentIndex + 1} // 0{images.length}
        </div>
      )}
    </div>
  );
};

interface ProjectLightboxProps {
  images: string[];
  title: string;
  startIndex: number;
  onClose: () => void;
}

const ProjectLightbox = ({ images, title, startIndex, onClose }: ProjectLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play scrolling loop (5 seconds)
  useEffect(() => {
    if (images.length <= 1) return;

    const startAutoPlay = () => {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, currentIndex]);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetTimer();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetTimer();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    resetTimer();
    setCurrentIndex(idx);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-void/95 flex flex-col justify-center items-center backdrop-blur-md p-4 sm:p-8 select-none"
      onClick={onClose}
    >
      {/* Lightbox Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header HUD */}
        <div className="flex items-center justify-between border-b border-border-dim pb-3">
          <div className="flex flex-col">
            <span className="font-tactical text-[10px] text-red-bright tracking-widest uppercase">
              // CLASSIFIED EXHIBIT VIEWER //
            </span>
            <h3 className="font-display text-lg sm:text-xl text-white tracking-wider uppercase mt-1">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="font-tactical text-[11px] text-secondary hover:text-red-bright border border-border-dim hover:border-red-bright px-3 py-1 bg-void/50 transition-colors duration-200 cursor-pointer"
          >
            [ CLOSE ESC ]
          </button>
        </div>

        {/* Large Image Slider Screen */}
        <div className="relative w-full aspect-[16/9] border border-border-sharp p-2 bg-void/50 shadow-2xl">
          {/* Tape Overlay */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-900/10 border-x border-amber-800/20 rotate-[0.5deg] z-30 mix-blend-multiply opacity-90 pointer-events-none" />

          {/* Inner Slider */}
          <div className="relative w-full h-full overflow-hidden border border-border-dim bg-void">
            <div
              className="flex w-full h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
            >
              {images.map((img, idx) => (
                <div key={img} className="w-full h-full shrink-0 relative">
                  <img
                    src={img}
                    alt={`${title} large view ${idx + 1}`}
                    className="object-contain w-full h-full bg-void/10"
                  />
                </div>
              ))}
            </div>

            {/* Dynamic Watermark Stamp */}
            <div className="absolute bottom-4 right-4 bg-red-raw/10 border border-red-raw px-2.5 py-0.5 select-none opacity-20 pointer-events-none z-20">
              <span className="font-stamp text-[12px] text-red-bright tracking-widest uppercase rotate-[-12deg] inline-block">
                SECURE ARCHIVE ATCH
              </span>
            </div>

            {/* Dynamic Slide Label Badge */}
            {images.length > 1 && (
              <div className="absolute top-3 right-3 z-20 bg-void/95 border border-border-sharp px-2 py-0.5 font-tactical text-[8px] tracking-widest text-secondary uppercase">
                EXHIBIT IMAGE 0{currentIndex + 1} // 0{images.length}
              </div>
            )}
          </div>

          {/* Large Chevron Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-void/90 hover:bg-red-raw border border-border-sharp text-white text-sm w-9 h-9 flex items-center justify-center transition-all duration-300 select-none cursor-pointer focus:outline-none"
                aria-label="Previous slide"
              >
                &larr;
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-void/90 hover:bg-red-raw border border-border-sharp text-white text-sm w-9 h-9 flex items-center justify-center transition-all duration-300 select-none cursor-pointer focus:outline-none"
                aria-label="Next slide"
              >
                &rarr;
              </button>
            </>
          )}

          {/* Indicators at the bottom */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center space-x-2.5 bg-void/95 px-3 py-1.5 border border-border-sharp select-none">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => goToSlide(idx, e)}
                  className={`w-2 h-2 border transition-all duration-300 focus:outline-none cursor-pointer ${
                    idx === currentIndex
                      ? "bg-red-raw border-red-bright scale-110"
                      : "bg-transparent border-secondary/50 hover:border-secondary hover:bg-secondary/20"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeLightbox, setActiveLightbox] = useState<{
    images: string[];
    title: string;
    startIndex: number;
  } | null>(null);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") as "dark" | "light";
    if (currentTheme) {
      setTheme(currentTheme);
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const newTheme = document.documentElement.getAttribute("data-theme") as "dark" | "light";
          if (newTheme) {
            setTheme(newTheme);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

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
          <div className="relative border-l-3 border-l-red-raw border-y border-r border-border-dim bg-surface p-6 sm:p-8 dossier-card transition-all duration-300 hover:border-l-red-bright hover:bg-elevated group">

            {/* Dossier Corner bracket borders */}
            <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

            {/* Background watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden z-0">
              <span className="font-stamp text-[100px] sm:text-[140px] tracking-widest uppercase rotate-[-18deg] text-white">
                CLASSIFIED
              </span>
            </div>

            {/* Card Content - Grid Split on large screens */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Column: Info */}
              <div className="lg:col-span-7 flex flex-col space-y-4 order-2 lg:order-1">

                {/* Header Info Strip */}
                <div className="flex items-center justify-between">
                  <CaseNumber num={featuredProject.id.replace("CASE-", "")} />
                  <span className="font-tactical text-[9px] text-red-bright border border-red-raw px-2 py-0.5 select-none bg-red-stain">
                    {featuredProject.status}
                  </span>
                </div>

                {/* Title & Role Info */}
                <div className="pt-2">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide uppercase">
                      OPERATION: {featuredProject.title.split("–")[0].split("-")[0].trim()}
                    </h3>
                    {featuredProject.period && (
                      <span className="font-tactical text-[10px] text-secondary tracking-widest uppercase shrink-0 bg-void border border-border-dim px-2 py-0.5 w-fit">
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
                <div className="font-tactical text-[11px] text-code pt-2">
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
                      Live Deployment <span className="arrow transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                    </a>
                  ) : (
                    <span className="font-tactical text-[11px] text-secondary/50 border border-border-dim px-3 py-2 select-none cursor-not-allowed uppercase tracking-wider">
                      [ OFFLINE / INTERNAL ]
                    </span>
                  )}
                </div>

              </div>

              {/* Right Column: Screenshot Visual Attachment */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center w-full order-1 lg:order-2 lg:translate-x-4 transition-transform duration-300">
                <div className="relative w-full border border-dashed border-border-sharp p-2.5 bg-void/30 shadow-2xl select-none">
                  {/* Tape/Staple Strip Overlay */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-900/10 border-x border-amber-800/20 rotate-[1.5deg] z-30 mix-blend-multiply opacity-80 hidden md:block pointer-events-none" />
                  
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <ProjectImageSlider
                      images={featuredProject.images || (featuredProject.logo ? [featuredProject.logo] : [])}
                      title={featuredProject.title}
                      featured={true}
                      onImageClick={(index) => setActiveLightbox({
                        images: featuredProject.images || (featuredProject.logo ? [featuredProject.logo] : []),
                        title: featuredProject.title,
                        startIndex: index
                      })}
                    />
                  </div>

                  {/* Exhibit Label Below Image Frame */}
                  <div className="mt-2 text-center select-none">
                    <span className="font-tactical text-[9px] tracking-wider text-code uppercase block">
                      [ EXHIBIT NO. 01 // SYSTEM RECORD ATCH ]
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Regular Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mt-8 w-full">
          {regularProjects.map((project) => (
            <div
              key={project.id}
              className="mission-card relative bg-surface border border-border-dim dossier-card transition-all duration-300 hover:border-border-sharp group flex flex-col justify-between"
            >
              {/* Dossier Corner bracket borders */}
              <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

              {/* Card content */}
              <div className="relative z-10 flex flex-col p-5 md:p-6 h-full justify-between space-y-3.5 flex-grow">

                {/* Header Block */}
                <div className="flex flex-col space-y-2">
                  {/* Case Header */}
                  <div className="flex items-center justify-between">
                    <CaseNumber num={project.id.replace("CASE-", "")} />
                    <span className="font-tactical text-[9px] text-ghost border border-border-dim px-1.5 py-0.2 select-none bg-void/10">
                      {project.status}
                    </span>
                  </div>

                  {/* Operation Title */}
                  <div className="pt-1">
                    <h4 className="font-display text-2xl text-white tracking-wide uppercase leading-tight">
                      {project.title.split("–")[0].split("-")[0].trim()}
                    </h4>
                    <SectionDivider className="mt-1" />
                  </div>
                </div>

                {/* Polaroid Evidence Frame - Full Width */}
                {(project.logo || (project.images && project.images.length > 0)) && (
                  <div className="relative w-full aspect-[16/10] border border-dashed border-border-sharp p-2 bg-void/30 shadow-md transition-transform duration-200 select-none">
                    {/* Tape/Staple Strip Overlay */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-amber-900/10 border-x border-amber-800/20 rotate-[1deg] z-30 mix-blend-multiply opacity-80 pointer-events-none" />
                    
                    <div className="absolute inset-2 overflow-hidden">
                      <ProjectImageSlider
                        images={project.images || (project.logo ? [project.logo] : [])}
                        title={project.title}
                        onImageClick={(index) => setActiveLightbox({
                          images: project.images || (project.logo ? [project.logo] : []),
                          title: project.title,
                          startIndex: index
                        })}
                      />
                    </div>
                    <div className="absolute -bottom-2 right-4 bg-void border border-border-dim px-2 py-0.5 font-tactical text-[7.5px] tracking-widest text-code uppercase z-20">
                      VISUAL RECORD ATCH
                    </div>
                  </div>
                )}

                {/* Short Description */}
                <p className="font-body text-xs sm:text-sm text-secondary leading-relaxed font-light flex-grow pt-1">
                  {project.objective}
                </p>

                {/* Tags Strip */}
                <div className="font-tactical text-[10px] text-code tracking-wide pt-1">
                  {project.stack.join(" // ")}
                </div>

                {/* Action View Trigger */}
                <div className="pt-1 flex items-center space-x-4">
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

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {activeLightbox && (
          <ProjectLightbox
            images={activeLightbox.images}
            title={activeLightbox.title}
            startIndex={activeLightbox.startIndex}
            onClose={() => setActiveLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

