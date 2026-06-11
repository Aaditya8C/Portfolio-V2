"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gsap } from "@/lib/gsap";
import TacticalLabel from "@/components/ui/TacticalLabel";
import CaseNumber from "@/components/ui/CaseNumber";
import SectionDivider from "@/components/ui/SectionDivider";

// Form Validation Schema
const contactSchema = z.object({
  name: z.string().min(1, { message: "IDENTIFIER REQUIRED" }),
  email: z.string().email({ message: "SECURE CHANNEL INVALID" }),
  message: z.string().min(5, { message: "MISSION DETAILS INSUFFICIENT" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formContainerRef = useRef<HTMLDivElement>(null);
  const successContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const heading = sectionRef.current?.querySelector(".contact-heading");
      if (heading) {
        gsap.fromTo(
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
      }
    }
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate Resend transmission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Animate out form container using GSAP
    if (formContainerRef.current) {
      gsap.to(formContainerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setIsSubmitted(true);
          setIsSubmitting(false);
          reset();
          
          // Animate in success panel
          setTimeout(() => {
            if (successContainerRef.current) {
              gsap.fromTo(
                successContainerRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
              );
            }
          }, 50);
        },
      });
    } else {
      setIsSubmitted(true);
      setIsSubmitting(false);
      reset();
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-void border-t border-border-dim py-20 relative overflow-hidden"
    >
      {/* Background diagonal watermark stamp */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] overflow-hidden -z-10">
        <span className="font-stamp text-[140px] sm:text-[180px] tracking-widest uppercase rotate-[12deg] text-white">
          TRANSMIT
        </span>
      </div>

      <div className="container w-full flex flex-col space-y-8 text-left">
        
        {/* Section Label */}
        <div className="flex items-center justify-between">
          <TacticalLabel>CONTACT // DIRECT TRANSMISSION</TacticalLabel>
          <CaseNumber num="004" />
        </div>

        {/* Heading Panel & Red Divider */}
        <div className="contact-heading max-w-[700px] w-full space-y-4">
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-widest uppercase">
            INITIATE CONTACT
          </h2>
          <SectionDivider />
        </div>

        {/* Two-Column Dossier Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 w-full">
          
          {/* Left Column: Form / Success Card */}
          <div className="lg:col-span-7 flex flex-col w-full">
            
            {isSubmitted ? (
              /* Success Panel */
              <div
                ref={successContainerRef}
                className="border border-border-dim bg-surface p-8 dossier-card flex flex-col items-center justify-center text-center space-y-4 py-16"
              >
                {/* Dossier Corner brackets */}
                <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />
                
                <div className="flex items-center justify-center space-x-3 text-red-bright font-tactical text-md sm:text-lg tracking-widest uppercase">
                  <span>TRANSMISSION CONFIRMED</span>
                  <span className="status-dot" />
                </div>
                <p className="font-body text-xs text-secondary max-w-sm leading-relaxed">
                  All telemetry packets transmitted successfully. Security handshake completed. Expected operative callback within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-tactical text-[11px] text-red-bright hover:text-white transition-colors duration-200 mt-4 uppercase tracking-widest"
                >
                  [ Send Another Log ]
                </button>
              </div>
            ) : (
              /* Contact Form */
              <div
                ref={formContainerRef}
                className="border border-border-dim bg-surface p-8 dossier-card flex flex-col space-y-6 relative"
              >
                {/* Dossier Corner brackets */}
                <div className="absolute inset-0 dossier-card pointer-events-none border-none z-20" />

                {/* Concept Briefing text */}
                <div className="font-tactical">
                  <div className="text-[11px] text-accent tracking-widest uppercase font-bold">
                    MISSION BRIEF:
                  </div>
                  <p className="text-[11px] text-secondary mt-1 tracking-wider leading-relaxed">
                    ALL TRANSMISSIONS ARE ENCRYPTED END-TO-END. EXPECT RESPONSE WITHIN 24 HOURS. CURRENT STATUS: ACCEPTING MISSIONS.
                  </p>
                </div>

                <SectionDivider />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Field Name */}
                  <div className="flex flex-col space-y-1">
                    <label className="font-tactical text-[10px] text-secondary uppercase tracking-widest">
                      FIELD NAME *
                    </label>
                    <div className="relative flex items-center">
                      <span className="text-red-bright font-tactical text-[12px] select-none mr-2">▸</span>
                      <input
                        type="text"
                        placeholder="ENTER CODENAME OR IDENTIFIER"
                        className="bg-transparent border-none border-b border-border-mid text-primary font-tactical text-[13px] py-2 px-1 w-full outline-none transition-colors duration-200 focus:border-b-red-bright placeholder-ghost uppercase"
                        disabled={isSubmitting}
                        {...register("name")}
                      />
                    </div>
                    {errors.name && (
                      <span className="font-tactical text-[10px] text-red-bright mt-1">
                        [ ERR // {errors.name.message} ]
                      </span>
                    )}
                  </div>

                  {/* Secure Channel (Email) */}
                  <div className="flex flex-col space-y-1">
                    <label className="font-tactical text-[10px] text-secondary uppercase tracking-widest">
                      SECURE CHANNEL (EMAIL) *
                    </label>
                    <div className="relative flex items-center">
                      <span className="text-red-bright font-tactical text-[12px] select-none mr-2">▸</span>
                      <input
                        type="text"
                        placeholder="ENTER AUDITED TRANSMISSION EMAIL"
                        className="bg-transparent border-none border-b border-border-mid text-primary font-tactical text-[13px] py-2 px-1 w-full outline-none transition-colors duration-200 focus:border-b-red-bright placeholder-ghost uppercase"
                        disabled={isSubmitting}
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <span className="font-tactical text-[10px] text-red-bright mt-1">
                        [ ERR // {errors.email.message} ]
                      </span>
                    )}
                  </div>

                  {/* Mission Objective (Message) */}
                  <div className="flex flex-col space-y-1">
                    <label className="font-tactical text-[10px] text-secondary uppercase tracking-widest">
                      MISSION OBJECTIVE *
                    </label>
                    <div className="relative flex items-start">
                      <span className="text-red-bright font-tactical text-[12px] select-none mr-2 mt-2.5">▸</span>
                      <textarea
                        placeholder="DEFINE TARGET INSTRUCTIONS, TIMELINES AND DELIVERABLES..."
                        rows={4}
                        className="bg-transparent border-none border-b border-border-mid text-primary font-tactical text-[13px] py-2 px-1 w-full outline-none transition-colors duration-200 focus:border-b-red-bright placeholder-ghost uppercase resize-none"
                        disabled={isSubmitting}
                        {...register("message")}
                      />
                    </div>
                    {errors.message && (
                      <span className="font-tactical text-[10px] text-red-bright mt-1">
                        [ ERR // {errors.message.message} ]
                      </span>
                    )}
                  </div>

                  {/* Action submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full sm:w-auto relative"
                    >
                      {isSubmitting ? "TRANSMITTING..." : "TRANSMIT MISSION"}
                    </button>
                  </div>

                </form>

              </div>
            )}

          </div>

          {/* Right Column: Direct Channels & Status */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            
            {/* Direct Channels */}
            <div className="space-y-4">
              <h3 className="font-tactical text-xs text-secondary tracking-widest uppercase">
                DIRECT CHANNELS
              </h3>
              <SectionDivider />
              <div className="space-y-3 font-tactical text-[11px] uppercase tracking-wider">
                <div className="flex justify-between items-center py-1">
                  <span className="text-ghost">GITHUB</span>
                  <a
                    href="https://github.com/aadityakulkarni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-red-bright transition-colors duration-200"
                  >
                    github.com/aadityakulkarni
                  </a>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-ghost">LINKEDIN</span>
                  <a
                    href="https://linkedin.com/in/aadityakulkarni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-red-bright transition-colors duration-200"
                  >
                    linkedin.com/in/aadityakulkarni
                  </a>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-ghost">EMAIL</span>
                  <a
                    href="mailto:aadityakulkarni@vjti.ac.in"
                    className="text-primary hover:text-red-bright transition-colors duration-200"
                  >
                    aadityakulkarni@vjti.ac.in
                  </a>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-ghost">LOCATION</span>
                  <span className="text-primary">MUMBAI, INDIA</span>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="space-y-4">
              <h3 className="font-tactical text-xs text-secondary tracking-widest uppercase">
                CURRENT STATUS
              </h3>
              <SectionDivider />
              <ul className="space-y-3 font-tactical text-[11px] uppercase tracking-wider">
                <li className="flex items-center space-x-3">
                  <span className="text-red-bright select-none">●</span>
                  <span className="text-primary">OPEN TO REMOTE OPPORTUNITIES</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-ghost select-none">●</span>
                  <span className="text-primary">BUILDING SIDE VENTURES</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-red-bright select-none">●</span>
                  <span className="text-primary">AVAILABLE JAN 2025</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
