"use client";

import { useState } from "react";
import type { Service } from "@/data/serviceData";
import { usePageSeo } from "@/hooks/usePageSeo";
import colors from "@/lib/colors";
import ContactSection from "./ContactSection";
import ExpertiseSection from "./ExpertiseSection";
import Footer from "./Footer";
import Hero from "./Hero";
import ScrollNav from "./ScrollNav";
import Services from "./Services";
import "@/styles/nmbd/app.css";
import "@/styles/nmbd/responsive.css";

export default function NmbdHomePage() {
  usePageSeo();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const appStyle = {
    fontFamily: "var(--font-sans-stack)",
    color: colors.ink,
    backgroundColor: colors.paper,
    width: "100%",
    overflow: "hidden",
    maxWidth: "100vw",
    position: "relative" as const,
  };

  return (
    <div style={appStyle} className="nmbd-app">
      <ScrollNav />
      <Hero />
      <Services onServiceSelect={setSelectedService} />
      <ExpertiseSection />
      <ContactSection preselectedService={selectedService} />
      <Footer />
    </div>
  );
}
