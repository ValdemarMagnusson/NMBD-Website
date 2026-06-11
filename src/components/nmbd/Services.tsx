"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import type { Service } from "@/data/serviceData";
import colors from "@/lib/colors";
import { imagePath } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";
import { useServiceTranslations } from "@/hooks/useServiceTranslations";
import { getServiceById, siteRoutes } from "@/lib/services-config";

type ServicesProps = {
  onServiceSelect?: (service: Service) => void;
};

export default function Services({ onServiceSelect }: ServicesProps) {
  const { t } = useTranslation();
  const services = useServiceTranslations();
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const getGridColumns = () => {
    if (windowWidth <= 640) return "repeat(1, 1fr)";
    if (windowWidth <= 1000) return "repeat(2, 1fr)";
    return "repeat(3, 1fr)";
  };

  const styles = {
    section: {
      padding: isMobile ? "60px 0 90px" : "110px 0 160px",
      backgroundColor: colors.paper,
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
      paddingBottom: isMobile ? "36px" : "44px",
      borderBottom: `1px solid ${colors.line}`,
      marginBottom: isMobile ? "48px" : "64px",
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
    headRight: {
      fontFamily: "var(--font-sans-stack)",
      fontSize: "1rem",
      lineHeight: 1.65,
      color: colors.inkSoft,
      maxWidth: "32ch",
      textAlign: (isMobile ? "left" : "right") as "left" | "right",
      margin: 0,
      paddingBottom: isMobile ? 0 : "8px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: getGridColumns(),
      columnGap: isMobile ? "0" : "32px",
      rowGap: isMobile ? "28px" : "36px",
    },
    card: {
      cursor: "pointer",
      display: "flex",
      flexDirection: "column" as const,
      background: colors.white,
      border: "none",
      textAlign: "left" as const,
      padding: 0,
      borderRadius: "10px",
      overflow: "hidden",
    },
    media: {
      position: "relative" as const,
      width: "100%",
      aspectRatio: "4 / 3",
      overflow: "hidden",
      backgroundColor: colors.paperAlt,
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      display: "block",
    },
    mediaScrim: {
      position: "absolute" as const,
      inset: 0,
      background:
        "linear-gradient(180deg, rgba(13,16,9,0) 36%, rgba(13,16,9,0.18) 56%, rgba(13,16,9,0.74) 100%)",
      zIndex: 1,
    },
    mediaRing: {
      position: "absolute" as const,
      inset: 0,
      zIndex: 2,
      pointerEvents: "none" as const,
      boxShadow: "inset 0 0 0 1px rgba(247, 244, 236, 0.16)",
    },
    caption: {
      position: "absolute" as const,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 3,
      padding: "0 22px 20px",
      display: "flex",
      alignItems: "baseline",
      gap: "14px",
    },
    number: {
      fontFamily: "var(--font-sans-stack)",
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.16em",
      color: "rgba(247, 244, 236, 0.7)",
      lineHeight: 1,
      flexShrink: 0,
    },
    title: {
      fontFamily: "var(--font-display-stack)",
      fontSize: isMobile ? "1.5rem" : "1.6rem",
      fontWeight: 500,
      letterSpacing: "-0.005em",
      color: colors.cream,
      margin: 0,
      lineHeight: 1.08,
    },
    arrow: {
      marginLeft: "auto",
      alignSelf: "center",
      fontSize: "0.8rem",
      color: "rgba(247, 244, 236, 0.85)",
      flexShrink: 0,
    },
    body: {
      padding: isMobile ? "20px 22px 22px" : "22px 22px 24px",
      background: colors.white,
    },
    description: {
      fontFamily: "var(--font-sans-stack)",
      fontSize: "0.93rem",
      lineHeight: 1.65,
      color: colors.inkSoft,
      margin: 0,
    },
  };

  const handleCardClick = (service: Service) => {
    onServiceSelect?.(service);
    setTimeout(() => {
      const anchor =
        document.querySelector("#contact .heading") ||
        document.getElementById("contact");
      if (anchor) {
        const top = anchor.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section style={styles.section} className="section" id="services">
      <div style={styles.container} className="container">
        <div style={styles.header}>
          <div style={styles.headLeft}>
            <div style={styles.eyebrow}>
              <span style={styles.eyebrowRule} />
              {t("nmbd.services.eyebrow")}
            </div>
            <h2 style={styles.heading} className="heading">
              {t("nmbd.services.heading")}
            </h2>
          </div>
          <p style={styles.headRight}>{t("nmbd.services.intro")}</p>
        </div>

        <div style={styles.grid} className="services-grid">
          {services.map((service, index) => {
            const serviceRoute = getServiceById(service.id);
            const cardInner = (
              <>
                <div style={styles.media} className="service-media">
                  <img
                    src={imagePath(service.backgroundImage)}
                    alt={service.title}
                    style={styles.img}
                    className="service-img"
                    loading="lazy"
                  />
                  <div style={styles.mediaScrim} />
                  <div style={styles.mediaRing} />
                  <div style={styles.caption}>
                    <span style={styles.number}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 style={styles.title} className="service-title">
                      {service.title}
                    </h3>
                    <FaArrowRight
                      className="service-cta-arrow"
                      style={styles.arrow}
                      aria-hidden
                    />
                  </div>
                </div>
                <div style={styles.body}>
                  <p style={styles.description}>{service.description}</p>
                </div>
              </>
            );

            if (serviceRoute) {
              return (
                <Link
                  key={service.id}
                  href={siteRoutes.service(serviceRoute.slug)}
                  style={{ ...styles.card, textDecoration: "none", color: "inherit" }}
                  className="service-card"
                >
                  {cardInner}
                </Link>
              );
            }

            return (
              <article
                key={service.id}
                style={styles.card}
                className="service-card"
                onClick={() => handleCardClick(service)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleCardClick(service);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {cardInner}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
