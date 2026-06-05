"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import colors from "@/lib/colors";
import { imagePath } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";

const MENU_LINKS = [
  { key: "services", target: "services" },
  { key: "expertise", target: "expertise" },
  { key: "contact", target: "contact" },
] as const;

export default function ScrollNav() {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goTo = (target: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const nextLangLabel =
    language === "sv" ? t("lang.switchToEn") : t("lang.switchToSv");
  const langBadge = language === "sv" ? t("lang.currentEn") : t("lang.currentSv");

  const styles = {
    bar: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 900,
      height: isMobile ? "60px" : "68px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "0 20px" : "0 32px",
      background: "rgba(12, 16, 7, 0.9)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(247, 244, 236, 0.12)",
      transform: visible ? "translateY(0)" : "translateY(-100%)",
      opacity: visible ? 1 : 0,
      transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease",
      pointerEvents: visible ? ("auto" as const) : ("none" as const),
      boxSizing: "border-box" as const,
    },
    hamburger: {
      display: "inline-flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      gap: "5px",
      width: "30px",
      height: "30px",
      padding: 0,
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    hamburgerLine: {
      display: "block",
      width: "22px",
      height: "1.5px",
      background: colors.cream,
      transition: "opacity 0.2s ease",
    },
    logo: isMobile
      ? {
          position: "static" as const,
          height: "26px",
          width: "auto",
          maxWidth: "42vw",
          objectFit: "contain" as const,
          display: "block",
          flex: "0 1 auto",
        }
      : {
          position: "absolute" as const,
          left: "50%",
          transform: "translateX(-50%)",
          height: "30px",
          width: "auto",
          display: "block",
        },
    cta: {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "999px",
      padding: isMobile ? "9px 18px" : "11px 26px",
      background: colors.cream,
      color: colors.oliveDeep,
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-sans-stack)",
      fontSize: isMobile ? "0.66rem" : "0.72rem",
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase" as const,
      whiteSpace: "nowrap" as const,
      transition: "background-color 0.25s ease, color 0.25s ease",
    },
    overlay: {
      position: "fixed" as const,
      inset: 0,
      zIndex: 1000,
      background: colors.oliveDeep,
      display: "flex",
      flexDirection: "column" as const,
      padding: isMobile ? "20px 24px 40px" : "32px 40px 56px",
      opacity: menuOpen ? 1 : 0,
      visibility: menuOpen ? ("visible" as const) : ("hidden" as const),
      transition: "opacity 0.4s ease, visibility 0.4s ease",
      boxSizing: "border-box" as const,
    },
    overlayTop: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "auto",
    },
    overlayLogo: {
      height: isMobile ? "30px" : "36px",
      width: "auto",
    },
    close: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      borderRadius: "999px",
      padding: isMobile ? "9px 18px" : "11px 24px",
      background: colors.cream,
      color: colors.oliveDeep,
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-sans-stack)",
      fontSize: isMobile ? "0.66rem" : "0.72rem",
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase" as const,
      whiteSpace: "nowrap" as const,
      transition: "background-color 0.25s ease, color 0.25s ease",
    },
    closeGlyph: {
      fontSize: "1.05rem",
      lineHeight: 1,
      fontWeight: 400,
    },
    menuLinks: {
      display: "flex",
      flexDirection: "column" as const,
      gap: isMobile ? "10px" : "8px",
      margin: "auto 0",
    },
    menuLink: {
      background: "none",
      border: "none",
      padding: "6px 0",
      textAlign: "left" as const,
      cursor: "pointer",
      fontFamily: "var(--font-display-stack)",
      fontSize: isMobile ? "2.6rem" : "4.2rem",
      fontWeight: 500,
      lineHeight: 1.06,
      letterSpacing: "-0.01em",
      color: colors.cream,
      transition: "color 0.25s ease",
    },
    overlayBottom: {
      marginTop: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      paddingTop: "28px",
      borderTop: "1px solid rgba(247, 244, 236, 0.16)",
    },
    overlayMeta: {
      fontFamily: "var(--font-sans-stack)",
      fontSize: "0.8rem",
      letterSpacing: "0.04em",
      color: "rgba(247, 244, 236, 0.6)",
    },
    overlayLang: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "none",
      border: "1px solid rgba(247, 244, 236, 0.28)",
      borderRadius: "999px",
      padding: "9px 18px",
      cursor: "pointer",
      color: "rgba(247, 244, 236, 0.85)",
      fontFamily: "var(--font-sans-stack)",
      fontSize: "0.72rem",
      fontWeight: 500,
      letterSpacing: "0.18em",
      textTransform: "uppercase" as const,
      transition: "border-color 0.25s ease, color 0.25s ease",
    },
  };

  return (
    <>
      <header style={styles.bar} className="scroll-nav">
        <button
          type="button"
          style={styles.hamburger}
          className="scroll-nav-burger"
          aria-label={t("nav.menu")}
          onClick={() => setMenuOpen(true)}
        >
          <span style={styles.hamburgerLine} />
          <span style={styles.hamburgerLine} />
          <span style={styles.hamburgerLine} />
        </button>

        <img
          src={imagePath("logo2.png")}
          alt={t("nmbd.hero.logoAlt")}
          style={styles.logo}
        />

        <button
          type="button"
          style={styles.cta}
          className="scroll-nav-cta"
          onClick={() => goTo("contact")}
        >
          {t("nmbd.hero.cta")}
        </button>
      </header>

      <div style={styles.overlay} className="nav-menu" aria-hidden={!menuOpen}>
        <div style={styles.overlayTop}>
          <img
            src={imagePath("logo2.png")}
            alt={t("nmbd.hero.logoAlt")}
            style={styles.overlayLogo}
          />
          <button
            type="button"
            style={styles.close}
            className="scroll-nav-cta"
            aria-label={t("nav.closeMenu")}
            onClick={() => setMenuOpen(false)}
          >
            <span>{t("nav.closeMenu")}</span>
            <span style={styles.closeGlyph}>×</span>
          </button>
        </div>

        <nav style={styles.menuLinks}>
          {MENU_LINKS.map((link) => (
            <button
              key={link.key}
              type="button"
              style={styles.menuLink}
              className="nav-menu-link"
              onClick={() => goTo(link.target)}
            >
              {t(`nav.${link.key}`)}
            </button>
          ))}
        </nav>

        <div style={styles.overlayBottom}>
          <span style={styles.overlayMeta}>{t("nmbd.hero.logoAlt")}</span>
          <button
            type="button"
            style={styles.overlayLang}
            className="nav-menu-lang"
            onClick={toggleLanguage}
            aria-label={nextLangLabel}
            title={nextLangLabel}
          >
            {langBadge}
          </button>
        </div>
      </div>
    </>
  );
}
