"use client";

import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Trans } from "react-i18next";
import colors from "@/lib/colors";
import { imagePath } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";

export default function ExpertiseSection() {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isStacked = windowWidth <= 992;
  const isMobile = windowWidth <= 768;

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const styles = {
    section: {
      padding: isMobile ? "90px 0" : "150px 0",
      backgroundColor: colors.oliveDeep,
      fontFamily: "var(--font-sans-stack)",
      position: "relative" as const,
      overflow: "hidden",
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile ? "0 24px" : "0 40px",
      display: "flex",
      flexDirection: "column" as const,
    },
    header: {
      paddingBottom: isMobile ? "36px" : "48px",
      marginBottom: isMobile ? "44px" : "64px",
      borderBottom: "1px solid rgba(247, 244, 236, 0.16)",
    },
    subtitle: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      color: colors.sage,
      fontSize: "0.72rem",
      fontWeight: 600,
      marginBottom: "22px",
      textTransform: "uppercase" as const,
      letterSpacing: "0.26em",
    },
    subtitleRule: {
      width: "28px",
      height: "1px",
      backgroundColor: colors.sage,
      opacity: 0.55,
      flexShrink: 0,
    },
    title: {
      fontFamily: "var(--font-display-stack)",
      fontSize: isMobile ? "2.6rem" : "4rem",
      fontWeight: 500,
      letterSpacing: "-0.005em",
      margin: 0,
      color: colors.cream,
      lineHeight: 1.04,
      maxWidth: "20ch",
    },
    body: {
      display: "flex",
      flexDirection: (isStacked ? "column" : "row") as "column" | "row",
      gap: isStacked ? "44px" : "72px",
      alignItems: "stretch",
    },
    imageContainer: {
      flex: "1.05",
      display: "flex",
      order: isStacked ? 2 : 1,
    },
    imageWrapper: {
      position: "relative" as const,
      width: "100%",
      flex: "1 1 auto",
      minHeight: isStacked ? "auto" : "560px",
      aspectRatio: isStacked ? ("16 / 11" as const) : ("auto" as const),
      overflow: "hidden",
      borderRadius: "10px",
    },
    image: {
      position: "absolute" as const,
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      display: "block",
    },
    imageRing: {
      position: "absolute" as const,
      inset: 0,
      zIndex: 2,
      pointerEvents: "none" as const,
      borderRadius: "10px",
      boxShadow: "inset 0 0 0 1px rgba(247, 244, 236, 0.16)",
    },
    textContainer: {
      flex: "1",
      order: isStacked ? 1 : 2,
      display: "flex",
      flexDirection: "column" as const,
    },
    description: {
      fontSize: "1.08rem",
      lineHeight: 1.75,
      marginTop: 0,
      marginBottom: isMobile ? "36px" : "48px",
      color: "rgba(247, 244, 236, 0.74)",
      maxWidth: "48ch",
    },
    highlight: {
      fontWeight: 600,
      color: colors.cream,
    },
    servicesGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      columnGap: "44px",
      rowGap: 0,
    },
    serviceItem: {
      borderTop: "1px solid rgba(247, 244, 236, 0.16)",
      padding: "22px 0",
    },
    serviceNumber: {
      display: "block",
      color: colors.sage,
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.18em",
      marginBottom: "12px",
    },
    serviceTitle: {
      display: "block",
      fontWeight: 600,
      fontSize: "1.05rem",
      letterSpacing: "0.005em",
      color: colors.cream,
      marginBottom: "8px",
    },
    serviceBody: {
      display: "block",
      fontSize: "0.95rem",
      lineHeight: 1.6,
      color: "rgba(247, 244, 236, 0.66)",
    },
    ctaWrap: {
      marginTop: isMobile ? "32px" : "auto",
      paddingTop: isMobile ? 0 : "44px",
    },
    cta: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      borderRadius: "999px",
      padding: "13px 28px",
      background: colors.cream,
      color: colors.oliveDeep,
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-sans-stack)",
      fontSize: "0.72rem",
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase" as const,
      whiteSpace: "nowrap" as const,
      transition: "background-color 0.25s ease, color 0.25s ease",
    },
    ctaArrow: {
      fontSize: "0.7rem",
    },
  };

  const items = [1, 2, 3, 4].map((id) => ({
    id,
    title: t(`nmbd.expertise.items.${id}.title`),
    body: t(`nmbd.expertise.items.${id}.body`),
  }));

  return (
    <section style={styles.section} id="expertise">
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.subtitle}>
            <span style={styles.subtitleRule} />
            {t("nmbd.expertise.subtitle")}
          </div>
          <h2 style={styles.title}>{t("nmbd.expertise.title")}</h2>
        </div>

        <div style={styles.body}>
          <div style={styles.imageContainer}>
            <div style={styles.imageWrapper}>
              <img
                src={imagePath("Expertise1.jpg")}
                alt={t("nmbd.expertise.imageAlt")}
                loading="lazy"
                style={styles.image}
              />
              <div style={styles.imageRing} />
            </div>
          </div>

          <div style={styles.textContainer}>
            <p style={styles.description}>
              <Trans
                i18nKey="nmbd.expertise.description"
                components={[
                  <span style={styles.highlight} key="company" />,
                  <span style={styles.highlight} key="services" />,
                ]}
              />
            </p>

            <div style={styles.servicesGrid}>
              {items.map((item, index) => (
                <div key={item.id} style={styles.serviceItem}>
                  <span style={styles.serviceNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span style={styles.serviceTitle}>{item.title}</span>
                  <span style={styles.serviceBody}>{item.body}</span>
                </div>
              ))}
            </div>

            <div style={styles.ctaWrap}>
              <button
                type="button"
                style={styles.cta}
                className="scroll-nav-cta"
                onClick={scrollToContact}
              >
                {t("nmbd.hero.cta")}
                <FaArrowRight style={styles.ctaArrow} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
