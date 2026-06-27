"use client";

import { useEffect, useState } from "react";
import colors from "@/lib/colors";
import { imagePath } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";

const PROJECTS = [
  { image: "project-altan.jpg", category: "Bygg", title: "Altan & trädäck" },
  { image: "project-entre.jpg", category: "Markarbete", title: "Stensatt entré" },
  { image: "project-tradgard.jpg", category: "Trädgårdsdesign", title: "Komplett trädgårdsdesign", tag: "Vision" },
  { image: "project-poolmiljo.jpg", category: "Design", title: "Poolmiljö & uteplats", tag: "Vision" },
] as const;

export default function ProjectsSection() {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const columns = isMobile ? 1 : 2;

  const styles = {
    section: {
      padding: isMobile ? "90px 0" : "150px 0",
      backgroundColor: colors.paper,
      fontFamily: "var(--font-sans-stack)",
      position: "relative" as const,
      overflow: "hidden",
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile ? "0 24px" : "0 40px",
    },
    header: {
      display: "flex",
      flexDirection: (isMobile ? "column" : "row") as "column" | "row",
      alignItems: isMobile ? "flex-start" : "flex-end",
      justifyContent: "space-between",
      gap: isMobile ? "20px" : "56px",
      marginBottom: isMobile ? "44px" : "64px",
    },
    headLeft: { maxWidth: "640px" },
    eyebrow: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      textTransform: "uppercase" as const,
      letterSpacing: "0.26em",
      fontSize: "0.72rem",
      fontWeight: 600,
      color: colors.accentGreen,
      marginBottom: "22px",
      fontFamily: "var(--font-sans-stack)",
    },
    eyebrowRule: {
      width: "28px",
      height: "1px",
      backgroundColor: colors.accentGreen,
      opacity: 0.55,
      flexShrink: 0,
    },
    heading: {
      fontFamily: "var(--font-display-stack)",
      fontSize: isMobile ? "2.8rem" : "4.2rem",
      fontWeight: 500,
      letterSpacing: "-0.005em",
      color: colors.ink,
      margin: 0,
      lineHeight: 1.05,
    },
    intro: {
      fontFamily: "var(--font-sans-stack)",
      fontSize: "1rem",
      lineHeight: 1.65,
      color: colors.inkSoft,
      maxWidth: "34ch",
      textAlign: (isMobile ? "left" : "right") as "left" | "right",
      margin: 0,
      paddingBottom: isMobile ? 0 : "8px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: isMobile ? "18px" : "24px",
    },
    card: {
      position: "relative" as const,
      borderRadius: "16px",
      overflow: "hidden",
      aspectRatio: "4 / 3",
      backgroundColor: colors.paperAlt,
      cursor: "default",
    },
    scrim: {
      position: "absolute" as const,
      inset: 0,
      background:
        "linear-gradient(to top, rgba(12,16,7,0.82) 0%, rgba(12,16,7,0.36) 36%, rgba(12,16,7,0) 62%)",
      pointerEvents: "none" as const,
    },
    ring: {
      position: "absolute" as const,
      inset: 0,
      borderRadius: "16px",
      boxShadow: "inset 0 0 0 1px rgba(12,16,7,0.06)",
      pointerEvents: "none" as const,
    },
    tag: {
      position: "absolute" as const,
      top: "16px",
      right: "16px",
      padding: "6px 12px",
      borderRadius: "999px",
      background: "rgba(247, 244, 236, 0.92)",
      color: colors.oliveDeep,
      fontSize: "0.62rem",
      fontWeight: 700,
      letterSpacing: "0.16em",
      textTransform: "uppercase" as const,
    },
    caption: {
      position: "absolute" as const,
      left: isMobile ? "20px" : "28px",
      right: isMobile ? "20px" : "28px",
      bottom: isMobile ? "20px" : "26px",
    },
    category: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: colors.sage,
      fontSize: "0.68rem",
      fontWeight: 600,
      letterSpacing: "0.2em",
      textTransform: "uppercase" as const,
      marginBottom: "10px",
    },
    categoryRule: {
      width: "20px",
      height: "1px",
      backgroundColor: colors.sage,
      opacity: 0.7,
      flexShrink: 0,
    },
    title: {
      fontFamily: "var(--font-display-stack)",
      fontSize: isMobile ? "1.7rem" : "2rem",
      fontWeight: 500,
      lineHeight: 1.08,
      color: colors.cream,
      margin: 0,
    },
  };

  return (
    <section style={styles.section} id="projects">
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headLeft}>
            <div style={styles.eyebrow}>
              <span style={styles.eyebrowRule} />
              {t("nmbd.projects.subtitle")}
            </div>
            <h2 style={styles.heading}>{t("nmbd.projects.title")}</h2>
          </div>
          <p style={styles.intro}>{t("nmbd.projects.intro")}</p>
        </div>

        <div style={styles.grid}>
          {PROJECTS.map((project) => (
            <article key={project.title} style={styles.card} className="project-card">
              <img
                src={imagePath(project.image)}
                alt={project.title}
                className="project-photo"
                loading="lazy"
              />
              <div style={styles.scrim} />
              {"tag" in project && project.tag ? (
                <span style={styles.tag}>{project.tag}</span>
              ) : null}
              <div style={styles.caption}>
                <div style={styles.category}>
                  <span style={styles.categoryRule} />
                  {project.category}
                </div>
                <h3 style={styles.title}>{project.title}</h3>
              </div>
              <div style={styles.ring} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
