"use client";

import { useEffect, useState } from "react";
import colors from "@/lib/colors";
import { imagePath } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";
import FadeContent from "./FadeContent";
import { NmbdLanguageSwitcher } from "./NmbdLanguageSwitcher";
import ProjectsCounter from "./ProjectsCounter";

export default function Hero() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const styles = {
    hero: {
      position: "relative" as const,
      minHeight: isMobile ? "92vh" : "100vh",
      display: "flex",
      flexDirection: "column" as const,
      color: colors.cream,
      overflow: "hidden",
    },
    backgroundImage: {
      position: "absolute" as const,
      inset: 0,
      backgroundImage: `url(${imagePath("hero-villa.jpg")})`,
      backgroundSize: "cover",
      backgroundPosition: "center 45%",
      backgroundRepeat: "no-repeat",
      filter: "brightness(0.7) saturate(0.97) contrast(1.03)",
      zIndex: 0,
    },
    scrim: {
      position: "absolute" as const,
      inset: 0,
      background: [
        // Soft radial pool of shade anchored on the centered copy, so the
        // headline + tagline always read regardless of what's behind them.
        "radial-gradient(120% 80% at 50% 78%, rgba(12,16,7,0.62) 0%, rgba(12,16,7,0.34) 38%, rgba(12,16,7,0) 72%)",
        // Even vertical wash: a touch at the top for the nav, deepening into
        // the base so the stats band sits on solid ground.
        "linear-gradient(180deg, rgba(12,16,7,0.42) 0%, rgba(12,16,7,0.14) 26%, rgba(12,16,7,0.24) 52%, rgba(12,16,7,0.6) 74%, rgba(12,16,7,0.92) 100%)",
      ].join(", "),
      zIndex: 1,
    },
    topBar: {
      position: "relative" as const,
      zIndex: 3,
      width: "100%",
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile ? "24px 24px 0" : "38px 40px 0",
      boxSizing: "border-box" as const,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
    },
    logo: {
      height: isMobile ? "34px" : "44px",
      width: "auto",
      display: "block",
      filter: "drop-shadow(0 4px 18px rgba(0, 0, 0, 0.4))",
    },
    nav: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "18px" : "32px",
    },
    navLink: {
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      fontFamily: "var(--font-sans-stack)",
      fontSize: isMobile ? "0.68rem" : "0.72rem",
      fontWeight: 500,
      letterSpacing: isMobile ? "0.18em" : "0.22em",
      textTransform: "uppercase" as const,
      color: "rgba(247, 244, 236, 0.85)",
      transition: "color 0.25s ease",
    },
    contentWrap: {
      position: "relative" as const,
      zIndex: 2,
      flex: 1,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      width: "100%",
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile ? "0 24px 56px" : "0 40px 92px",
      boxSizing: "border-box" as const,
    },
    content: {
      maxWidth: "880px",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      textAlign: "center" as const,
      gap: isMobile ? "20px" : "28px",
    },
    headline: {
      fontFamily: "var(--font-display-stack)",
      fontSize: isMobile ? "2.85rem" : "5.2rem",
      fontWeight: 500,
      lineHeight: 1.04,
      letterSpacing: "-0.005em",
      color: colors.cream,
      margin: 0,
      maxWidth: "16ch",
    },
    tagline: {
      fontFamily: "var(--font-sans-stack)",
      fontSize: isMobile ? "1rem" : "1.18rem",
      lineHeight: 1.6,
      fontWeight: 400,
      color: "rgba(247, 244, 236, 0.82)",
      maxWidth: "52ch",
      textWrap: "balance" as const,
      margin: 0,
    },
    counterBand: {
      position: "relative" as const,
      zIndex: 3,
      width: "100%",
    },
  };

  return (
    <div style={styles.hero} className="hero">
      <div style={styles.backgroundImage} />
      <div style={styles.scrim} />

      <div style={styles.topBar}>
        <img
          src={imagePath("logo2.png")}
          alt={t("nmbd.hero.logoAlt")}
          style={styles.logo}
        />
        <nav style={styles.nav}>
          <button
            type="button"
            style={styles.navLink}
            className="hero-nav-link"
            onClick={scrollToContact}
          >
            {t("nav.contact")}
          </button>
          <NmbdLanguageSwitcher />
        </nav>
      </div>

      <div style={styles.contentWrap}>
        <FadeContent duration={1100} easing="ease-out" initialOpacity={0} threshold={0.1}>
          <div style={styles.content}>
            <h1 style={styles.headline}>{t("nmbd.hero.headline")}</h1>
            <p style={styles.tagline}>{t("nmbd.hero.tagline")}</p>
          </div>
        </FadeContent>
      </div>

      <div style={styles.counterBand}>
        <ProjectsCounter isOverlay />
      </div>
    </div>
  );
}
