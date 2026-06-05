"use client";

import { useEffect, useState } from "react";
import { FaArrowUp, FaEnvelope, FaInstagram, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import colors from "@/lib/colors";
import { imagePath } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";
import { site } from "@/site.config";

export default function Footer() {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const services = [1, 2, 3, 4, 5, 6].map((id) => ({
    id,
    title: t(`nmbd.services.items.${id}.title`),
  }));

  const styles = {
    footer: {
      backgroundColor: colors.oliveDeep,
      color: colors.cream,
      padding: isMobile ? "72px 0 36px" : "110px 0 44px",
      fontFamily: "var(--font-sans-stack)",
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile ? "0 24px" : "0 40px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1.7fr 1fr 1fr",
      gap: isMobile ? "44px" : "64px",
      paddingBottom: isMobile ? "48px" : "72px",
    },
    brandCol: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "flex-start",
      gap: "26px",
    },
    logo: {
      height: isMobile ? "84px" : "124px",
      width: "auto",
    },
    social: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "46px",
      height: "46px",
      borderRadius: "999px",
      border: "1px solid rgba(247, 244, 236, 0.28)",
      color: "rgba(247, 244, 236, 0.85)",
      textDecoration: "none",
      fontSize: "1.2rem",
      transition:
        "border-color 0.25s ease, color 0.25s ease, background-color 0.25s ease",
    },
    colHeading: {
      fontSize: "0.7rem",
      fontWeight: 600,
      textTransform: "uppercase" as const,
      letterSpacing: "0.22em",
      color: colors.sage,
      marginBottom: "26px",
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "16px",
      fontSize: "1rem",
      color: "rgba(247, 244, 236, 0.82)",
      textDecoration: "none",
      transition: "color 0.2s ease",
    },
    contactIcon: {
      flexShrink: 0,
      color: colors.sage,
      fontSize: "0.9rem",
    },
    servicesList: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column" as const,
      gap: "14px",
    },
    serviceLink: {
      background: "none",
      border: "none",
      padding: 0,
      textAlign: "left" as const,
      cursor: "pointer",
      fontSize: "1rem",
      fontFamily: "var(--font-sans-stack)",
      color: "rgba(247, 244, 236, 0.82)",
      transition: "color 0.2s ease",
    },
    bottomBar: {
      borderTop: "1px solid rgba(247, 244, 236, 0.16)",
      paddingTop: "30px",
      display: "flex",
      flexDirection: (isMobile ? "column" : "row") as "column" | "row",
      alignItems: isMobile ? "flex-start" : "center",
      justifyContent: "space-between",
      gap: "20px",
    },
    copyright: {
      fontSize: "0.85rem",
      color: "rgba(247, 244, 236, 0.55)",
      margin: 0,
      lineHeight: 1.6,
    },
    topButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      background: "none",
      border: "none",
      padding: 0,
      color: "rgba(247, 244, 236, 0.8)",
      fontSize: "0.72rem",
      fontWeight: 600,
      letterSpacing: "0.18em",
      textTransform: "uppercase" as const,
      cursor: "pointer",
      fontFamily: "var(--font-sans-stack)",
      transition: "color 0.2s ease",
    },
  };

  const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = colors.white;
  };
  const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = "rgba(247, 244, 236, 0.82)";
  };

  return (
    <footer style={styles.footer} className="footer">
      <div style={styles.container}>
        <div style={styles.grid}>
          <div style={styles.brandCol}>
            <img
              src={imagePath("logo2.png")}
              alt={t("nmbd.hero.logoAlt")}
              style={styles.logo}
            />
            <a
              href="https://www.instagram.com/nmbd.stockholm/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.social}
              className="footer-social"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>

          <div>
            <div style={styles.colHeading}>{t("nmbd.footer.contactHeading")}</div>
            <a href={`mailto:${site.email}`} style={styles.contactItem} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              <FaEnvelope style={styles.contactIcon} />
              <span>{site.email}</span>
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} style={styles.contactItem} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              <FaPhoneAlt style={styles.contactIcon} />
              <span>{site.phone}</span>
            </a>
            <div style={styles.contactItem}>
              <FaMapMarkerAlt style={styles.contactIcon} />
              <span>{site.location.address}</span>
            </div>
          </div>

          <div>
            <div style={styles.colHeading}>{t("nmbd.footer.servicesHeading")}</div>
            <ul style={styles.servicesList}>
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    style={styles.serviceLink}
                    onClick={scrollToContact}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={styles.bottomBar}>
          <p style={styles.copyright}>
            {t("nmbd.footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <button
            type="button"
            style={styles.topButton}
            onClick={scrollToTop}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(247, 244, 236, 0.8)";
            }}
          >
            {t("nmbd.footer.backToTop")}
            <FaArrowUp style={{ fontSize: "0.7rem" }} />
          </button>
        </div>
      </div>
    </footer>
  );
}
