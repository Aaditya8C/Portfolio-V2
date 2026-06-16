"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TacticalLabel from "@/components/ui/TacticalLabel";
import DossierCard from "@/components/ui/DossierCard";
import RedactText from "@/components/ui/RedactText";
import CaseNumber from "@/components/ui/CaseNumber";
import SectionDivider from "@/components/ui/SectionDivider";

import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import TechStack from "@/components/sections/TechStack";
import IntelNetwork from "@/components/sections/IntelNetwork";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="noisy min-h-screen flex flex-col justify-between bg-void">
      {/* HUD Fixed Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Placeholder verification sections to test scroll intersection */}
      <main className="flex-grow flex flex-col">
        
        {/* About Section */}
        <About />

        {/* Projects Section */}
        <Projects />

        {/* Experience Section */}
        <Experience />

        {/* Arsenal (Tech Stack) Section */}
        <TechStack />

        {/* Intel Network Section */}
        <IntelNetwork />

        {/* Journey (Field Intelligence) Section */}
        <Journey />

        {/* Contact (Initiate Contact) Section */}
        <Contact />

      </main>

      {/* Footer HUD */}
      <Footer />
    </div>
  );
}
