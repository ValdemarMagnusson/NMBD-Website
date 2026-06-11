"use client";

import type { ReactNode } from "react";
import { imagePath } from "@/lib/images";

type PageHeroProps = {
  eyebrow: ReactNode;
  title: string;
  lede?: string;
  image?: string;
};

export function PageHero({
  eyebrow,
  title,
  lede,
  image = "hero-villa.jpg",
}: PageHeroProps) {
  return (
    <section
      className="hero-banner page-hero"
      style={{ backgroundImage: `url(${imagePath(image)})` }}
    >
      <div className="hero-banner-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lede ? <p className="subtitle">{lede}</p> : null}
      </div>
    </section>
  );
}
