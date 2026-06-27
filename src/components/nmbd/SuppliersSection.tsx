"use client";

import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import colors from "@/lib/colors";
import { imagePath } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";

const SUPPLIERS = [
  { name: "Molnsätra Gård", url: "https://molnsatra.se/", logo: "logo-molnsatra.svg" },
  { name: "Stenbolaget", url: "https://stenbolaget.se/", logo: "logo-stenbolaget.png" },
  { name: "Flisby", url: "https://www.flisby.se/", logo: "logo-flisby.svg" },
  { name: "Bauhaus", url: "https://www.bauhaus.se/", logo: "logo-bauhaus.svg" },
  { name: "Beijer Byggmaterial", url: "https://www.beijerbygg.se/privat", logo: "logo-beijer.svg" },
  { name: "Kakelspecialisten", url: "https://www.kakelspecialisten.se/", logo: "logo-kakelspecialisten.png" },
] as const;

export default function SuppliersSection() {
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
  const columns = isMobile ? 2 : isTablet ? 2 : 3;

  const styles = {
    section: {
      padding: isMobile ? "96px 0" : "160px 0",
      background:
        "radial-gradient(95% 72% at 50% 42%, #1c2b0e 0%, #101908 56%, #0a1005 100%)",
      borderTop: "1px solid rgba(169, 192, 123, 0.16)",
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
      marginBottom: isMobile ? "44px" : "72px",
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
      maxWidth: "34ch",
      textAlign: (isMobile ? "left" : "right") as "left" | "right",
      margin: 0,
      paddingBottom: isMobile ? 0 : "8px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: isMobile ? "14px" : "20px",
    },
    card: {
      position: "relative" as const,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: isMobile ? "120px" : "180px",
      padding: isMobile ? "24px" : "36px",
      background: colors.cream,
      borderRadius: isMobile ? "14px" : "18px",
      border: "1px solid rgba(247, 244, 236, 0.06)",
      boxSizing: "border-box" as const,
      overflow: "hidden",
    },
    arrow: {
      position: "absolute" as const,
      top: isMobile ? "12px" : "18px",
      right: isMobile ? "12px" : "18px",
      fontSize: isMobile ? "1rem" : "1.15rem",
      color: colors.inkSoft,
      pointerEvents: "none" as const,
    },
    logo: {
      maxHeight: isMobile ? "32px" : "52px",
      maxWidth: isMobile ? "120px" : "170px",
      width: "auto",
      height: "auto",
      objectFit: "contain" as const,
      display: "block",
    },
  };

  return (
    <section style={styles.section} id="suppliers">
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headLeft}>
            <div style={styles.eyebrow}>
              <span style={styles.eyebrowRule} />
              {t("nmbd.suppliers.subtitle")}
            </div>
            <h2 style={styles.heading}>{t("nmbd.suppliers.title")}</h2>
          </div>
          <p style={styles.intro}>{t("nmbd.suppliers.intro")}</p>
        </div>

        <div style={styles.grid}>
          {SUPPLIERS.map((supplier) => (
            <a
              key={supplier.name}
              href={supplier.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.card}
              className="supplier-card"
              aria-label={supplier.name}
              title={supplier.name}
            >
              <FiArrowUpRight style={styles.arrow} className="supplier-arrow" aria-hidden />
              <img
                src={imagePath(supplier.logo)}
                alt={`${supplier.name} logotyp`}
                style={styles.logo}
                className="supplier-logo"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
