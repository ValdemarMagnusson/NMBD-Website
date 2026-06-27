"use client";

import { useEffect, useState } from "react";
import colors from "@/lib/colors";
import { imagePath } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";

const TEAM = [
  { name: "Andreas", role: "Projektledare Västerort", image: "team-andreas.jpg" },
  { name: "Noa", role: "Projektledare Söderort", image: "team-noa.jpg" },
  { name: "Jimmy", role: "Projektledare Norrort", image: "team-jimmy.jpg" },
] as const;

export default function AboutSection() {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 992;
  const columns = isMobile ? 1 : isTablet ? 3 : 3;

  const styles = {
    section: {
      padding: isMobile ? "96px 0" : "160px 0",
      background: "linear-gradient(180deg, #0e1507 0%, #0b1206 100%)",
      borderTop: "1px solid rgba(169, 192, 123, 0.16)",
      borderBottom: "1px solid rgba(169, 192, 123, 0.16)",
      fontFamily: "var(--font-sans-stack)",
      position: "relative" as const,
      overflow: "hidden",
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile ? "0 24px" : "0 40px",
      position: "relative" as const,
    },
    header: {
      display: "flex",
      flexDirection: (isMobile ? "column" : "row") as "column" | "row",
      alignItems: isMobile ? "flex-start" : "flex-end",
      justifyContent: "space-between",
      gap: isMobile ? "20px" : "56px",
      marginBottom: isMobile ? "48px" : "76px",
    },
    headLeft: {
      maxWidth: "640px",
    },
    eyebrow: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      textTransform: "uppercase" as const,
      letterSpacing: "0.26em",
      fontSize: "0.72rem",
      fontWeight: 600,
      color: colors.sage,
      marginBottom: "22px",
      fontFamily: "var(--font-sans-stack)",
    },
    eyebrowRule: {
      width: "28px",
      height: "1px",
      backgroundColor: colors.sage,
      opacity: 0.55,
      flexShrink: 0,
    },
    heading: {
      fontFamily: "var(--font-display-stack)",
      fontSize: isMobile ? "2.8rem" : "4.2rem",
      fontWeight: 500,
      letterSpacing: "-0.005em",
      color: colors.cream,
      margin: 0,
      lineHeight: 1.05,
    },
    intro: {
      fontFamily: "var(--font-sans-stack)",
      fontSize: "1rem",
      lineHeight: 1.65,
      color: "rgba(247, 244, 236, 0.7)",
      maxWidth: "38ch",
      textAlign: (isMobile ? "left" : "right") as "left" | "right",
      margin: 0,
      paddingBottom: isMobile ? 0 : "8px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: isMobile ? "36px" : "32px",
    },
    card: {
      display: "flex",
      flexDirection: "column" as const,
    },
    imageWrap: {
      position: "relative" as const,
      width: "100%",
      aspectRatio: "4 / 5",
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "#10180a",
    },
    imageRing: {
      position: "absolute" as const,
      inset: 0,
      zIndex: 2,
      pointerEvents: "none" as const,
      borderRadius: "12px",
      boxShadow: "inset 0 0 0 1px rgba(247, 244, 236, 0.1)",
    },
    meta: {
      display: "flex",
      alignItems: "baseline",
      gap: "14px",
      marginTop: "22px",
      paddingTop: "18px",
      borderTop: "1px solid rgba(247, 244, 236, 0.16)",
    },
    index: {
      color: colors.sage,
      fontSize: "0.72rem",
      fontWeight: 600,
      letterSpacing: "0.18em",
      flexShrink: 0,
    },
    name: {
      fontFamily: "var(--font-display-stack)",
      fontSize: "1.6rem",
      fontWeight: 500,
      color: colors.cream,
      lineHeight: 1.1,
      margin: 0,
    },
    role: {
      display: "block",
      marginTop: "4px",
      fontSize: "0.74rem",
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase" as const,
      color: "rgba(247, 244, 236, 0.55)",
    },
  };

  return (
    <section style={styles.section} id="about">
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headLeft}>
            <div style={styles.eyebrow}>
              <span style={styles.eyebrowRule} />
              {t("nmbd.about.subtitle")}
            </div>
            <h2 style={styles.heading}>{t("nmbd.about.title")}</h2>
          </div>
          <p style={styles.intro}>{t("nmbd.about.intro")}</p>
        </div>

        <div style={styles.grid}>
          {TEAM.map((member, index) => (
            <article key={member.name} style={styles.card} className="team-card">
              <div style={styles.imageWrap}>
                <img
                  src={imagePath(member.image)}
                  alt={member.name}
                  className="team-photo"
                  loading="lazy"
                />
                <div style={styles.imageRing} />
              </div>
              <div style={styles.meta}>
                <span style={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 style={styles.name}>{member.name}</h3>
                  <span style={styles.role}>{member.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
