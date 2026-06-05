"use client";

import { useEffect, useState } from "react";
import colors from "@/lib/colors";
import { useTranslation } from "@/lib/i18n";
import CountUp from "./CountUp";

type ProjectsCounterProps = {
  isOverlay?: boolean;
};

export default function ProjectsCounter({ isOverlay = false }: ProjectsCounterProps) {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  const counts = {
    projects: 350,
    clients: 280,
    years: 15,
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const counterItems = [
    { key: "projects", count: counts.projects, label: t("nmbd.counters.projects") },
    { key: "clients", count: counts.clients, label: t("nmbd.counters.clients") },
    { key: "years", count: counts.years, label: t("nmbd.counters.years") },
  ];

  const styles = {
    container: isOverlay
      ? {
          padding: isMobile ? "30px 0 34px" : "44px 0 44px",
          color: colors.cream,
        }
      : {
          backgroundColor: colors.oliveDeep,
          padding: isMobile ? "56px 0" : "72px 0",
          color: colors.cream,
        },
    countersWrapper: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
      gap: 0,
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile ? "0 24px" : "0 40px",
    },
    counterItem: {
      marginTop: 0,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      textAlign: "center" as const,
    },
    countRow: {
      display: "flex",
      alignItems: "flex-start",
      fontFamily: "var(--font-display-stack)",
      fontWeight: 500,
      lineHeight: 1,
      color: colors.cream,
    },
    count: {
      fontSize: isMobile ? "2.7rem" : "3.6rem",
      letterSpacing: "-0.01em",
    },
    plus: {
      fontSize: isMobile ? "1.2rem" : "1.5rem",
      color: "rgba(247, 244, 236, 0.5)",
      marginLeft: "4px",
      marginTop: isMobile ? "5px" : "8px",
      fontWeight: 400,
    },
    label: {
      marginTop: isMobile ? "14px" : "18px",
      fontSize: isMobile ? "0.66rem" : "0.74rem",
      fontFamily: "var(--font-sans-stack)",
      fontWeight: 500,
      textTransform: "uppercase" as const,
      letterSpacing: "0.16em",
      color: "rgba(247, 244, 236, 0.72)",
      lineHeight: 1.4,
    },
  };

  return (
    <div style={styles.container} className={isOverlay ? "counter-overlay" : ""}>
      <div style={styles.countersWrapper}>
        {counterItems.map((item, index) => {
          return (
            <div
              key={item.key}
              style={{
                ...styles.counterItem,
                ...(isMobile && index === 2 ? { gridColumn: "span 2", marginTop: "26px" } : {}),
              }}
            >
              <div style={styles.countRow}>
                <span style={styles.count}>
                  <CountUp
                    from={item.count - Math.round(item.count * 0.5)}
                    to={item.count}
                    duration={1}
                    separator=","
                    direction="up"
                  />
                </span>
                <span style={styles.plus}>+</span>
              </div>
              <div style={styles.label}>{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
