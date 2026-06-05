"use client";

import { useEffect, useState, type FormEvent } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import type { Service } from "@/data/serviceData";
import { useLanguage } from "@/hooks/useLanguage";
import { getServiceTitle, useServiceTranslations } from "@/hooks/useServiceTranslations";
import colors from "@/lib/colors";
import { submitContactForm } from "@/lib/contact-api";
import { useTranslation } from "@/lib/i18n";
import { site } from "@/site.config";

type ContactSectionProps = {
  preselectedService?: Service | null;
};

export default function ContactSection({ preselectedService }: ContactSectionProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const services = useServiceTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceId: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    if (!preselectedService) return;

    const serviceTitle = getServiceTitle(preselectedService.id, t);
    setFormData((prev) => ({
      ...prev,
      serviceId: String(preselectedService.id),
      message: t("nmbd.contact.preselectedMessage", { service: serviceTitle }),
    }));
  }, [preselectedService, language, t]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    const serviceTitle = formData.serviceId
      ? getServiceTitle(Number(formData.serviceId), t)
      : "";

    setIsSubmitting(true);
    const result = await submitContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: serviceTitle,
      message: formData.message,
      lang: language,
    });
    setIsSubmitting(false);

    if (result.success) {
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceId: "",
        message: "",
      });
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
      return;
    }

    if (result.kind === "validation") {
      setSubmitError(result.error);
      return;
    }

    setSubmitError(
      result.kind === "network"
        ? t("nmbd.contact.errorNetwork")
        : t("nmbd.contact.errorGeneric"),
    );
  };

  const isMobile = windowWidth <= 768;

  const fieldBase = {
    padding: "11px 0",
    borderRadius: 0,
    border: "none",
    borderBottom: `1px solid ${colors.line}`,
    fontSize: "1rem",
    backgroundColor: "transparent",
    color: colors.ink,
    fontFamily: "var(--font-sans-stack)",
    transition: "border-color 0.3s ease",
    width: "100%",
    boxSizing: "border-box" as const,
  };

  const styles = {
    section: {
      padding: isMobile ? "84px 0 90px" : "150px 0 160px",
      backgroundColor: colors.paper,
      fontFamily: "var(--font-sans-stack)",
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile ? "0 24px" : "0 40px",
    },
    header: {
      paddingBottom: isMobile ? "40px" : "56px",
      borderBottom: `1px solid ${colors.line}`,
      marginBottom: isMobile ? "52px" : "72px",
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
      fontSize: isMobile ? "2.6rem" : "4rem",
      fontWeight: 500,
      letterSpacing: "-0.005em",
      margin: 0,
      color: colors.ink,
      lineHeight: 1.05,
    },
    formContainer: {
      display: "flex",
      flexDirection: (isMobile ? "column" : "row") as "column" | "row",
      gap: isMobile ? "52px" : "88px",
      width: "100%",
      alignItems: "flex-start",
    },
    formInfo: {
      flex: "1",
      width: isMobile ? "100%" : "auto",
    },
    formWrapper: {
      flex: "1",
      width: isMobile ? "100%" : "auto",
      boxSizing: "border-box" as const,
    },
    infoTitle: {
      fontFamily: "var(--font-display-stack)",
      fontSize: isMobile ? "1.9rem" : "2.3rem",
      fontWeight: 500,
      letterSpacing: "-0.005em",
      marginBottom: "20px",
      color: colors.ink,
      lineHeight: 1.1,
    },
    infoText: {
      fontSize: "1.05rem",
      lineHeight: "1.75",
      marginBottom: "36px",
      color: colors.inkSoft,
      maxWidth: "44ch",
    },
    contactInfo: {
      marginTop: "44px",
      borderTop: `1px solid ${colors.line}`,
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "18px 0",
      borderBottom: `1px solid ${colors.line}`,
      fontSize: "1rem",
      color: colors.ink,
    },
    contactIcon: {
      color: colors.accentGreen,
      fontSize: "0.92rem",
      flexShrink: 0,
    },
    mapContainer: {
      position: "relative" as const,
      marginTop: "16px",
      width: "100%",
      height: isMobile ? "200px" : "260px",
      borderRadius: "10px",
      overflow: "hidden",
    },
    mapRing: {
      position: "absolute" as const,
      inset: 0,
      zIndex: 1,
      pointerEvents: "none" as const,
      borderRadius: "10px",
      boxShadow: `inset 0 0 0 1px ${colors.line}`,
    },
    mapIframe: {
      width: "100%",
      height: "100%",
      border: "none",
    },
    mapTitle: {
      fontSize: "0.72rem",
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase" as const,
      marginBottom: "14px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: colors.inkSoft,
    },
    mapIcon: {
      color: colors.accentGreen,
      fontSize: "0.85rem",
      flexShrink: 0,
    },
    mapWrapper: {
      marginTop: "40px",
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "28px",
      width: "100%",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "8px",
      width: "100%",
    },
    label: {
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase" as const,
      color: colors.inkSoft,
    },
    input: fieldBase,
    select: fieldBase,
    selectHighlighted: {
      ...fieldBase,
      borderBottom: `1px solid ${colors.accentGreen}`,
    },
    textarea: {
      ...fieldBase,
      minHeight: windowWidth <= 480 ? "110px" : "130px",
      resize: "vertical" as const,
    },
    submitButton: {
      backgroundColor: colors.oliveGreen,
      color: colors.cream,
      border: "none",
      padding: "18px",
      fontSize: "0.8rem",
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase" as const,
      borderRadius: "999px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      width: "100%",
      marginTop: "8px",
    },
    successMessage: {
      backgroundColor: colors.oliveDeep,
      color: colors.cream,
      padding: "16px",
      borderRadius: "2px",
      textAlign: "center" as const,
      fontWeight: 500,
      marginTop: "8px",
    },
    errorMessage: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      padding: "16px",
      borderRadius: "2px",
      textAlign: "center" as const,
      fontWeight: 500,
      marginTop: "8px",
    },
  };

  return (
    <section id="contact" style={styles.section} className="section">
      <div style={styles.container} className="container">
        <div style={styles.header}>
          <div style={styles.eyebrow}>
            <span style={styles.eyebrowRule} />
            {t("nav.contact")}
          </div>
          <h2 style={styles.heading} className="heading">
            {t("nmbd.contact.heading")}
          </h2>
        </div>

        <div style={styles.formContainer} className="form-container">
          <div style={styles.formInfo} className="form-info">
            <h3 style={styles.infoTitle} className="info-title">
              {t("nmbd.contact.infoTitle")}
            </h3>
            <p style={styles.infoText} className="info-text">
              {t("nmbd.contact.infoText")}
            </p>

            <div style={styles.contactInfo} className="contact-info">
              <div style={styles.contactItem} className="contact-item">
                <FaEnvelope style={styles.contactIcon} />
                <span>{site.email}</span>
              </div>
              <div style={styles.contactItem} className="contact-item">
                <FaPhoneAlt style={styles.contactIcon} />
                <span>{site.phone}</span>
              </div>
              <div style={styles.contactItem} className="contact-item">
                <FaMapMarkerAlt style={styles.contactIcon} />
                <span>{site.location.address}</span>
              </div>

              <div style={styles.mapWrapper}>
                <div style={styles.mapTitle}>
                  <FaMapMarkerAlt style={styles.mapIcon} />
                  <span>{t("nmbd.contact.mapTitle")}</span>
                </div>
                <div style={styles.mapContainer} className="map-container">
                  <div style={styles.mapRing} />
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2001.8219584003144!2d18.237379677520937!3d59.318023991307186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f821a4619bc89%3A0xad2ffe733e520eb9!2zVsOkcm1kw7Z2w6RnZW4gNjQzLCAxMzIgNDEgU2FsdHNqw7YtQm9v!5e0!3m2!1sen!2sus!4v1737123456789!5m2!1sen!2sus&q=Värmdövägen+643,+132+41+Saltsjö-boo"
                    style={styles.mapIframe}
                    title={t("nmbd.contact.mapIframeTitle")}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>

          <div id="contact-form" style={styles.formWrapper} className="form-wrapper">
            <form style={styles.form} onSubmit={handleSubmit} className="form">
              <div style={styles.formGroup} className="form-group">
                <label style={styles.label} htmlFor="name">
                  {t("nmbd.contact.form.name")}
                </label>
                <input
                  style={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
              <div style={styles.formGroup} className="form-group">
                <label style={styles.label} htmlFor="email">
                  {t("nmbd.contact.form.email")}
                </label>
                <input
                  style={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
              <div style={styles.formGroup} className="form-group">
                <label style={styles.label} htmlFor="phone">
                  {t("nmbd.contact.form.phone")}
                </label>
                <input
                  style={styles.input}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div style={styles.formGroup} className="form-group">
                <label style={styles.label} htmlFor="service">
                  {t("nmbd.contact.form.service")}
                </label>
                <select
                  style={
                    preselectedService ? styles.selectHighlighted : styles.select
                  }
                  id="service"
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  required
                  className="select"
                >
                  <option value="">{t("nmbd.contact.form.servicePlaceholder")}</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup} className="form-group">
                <label style={styles.label} htmlFor="message">
                  {t("nmbd.contact.form.message")}
                </label>
                <textarea
                  style={styles.textarea}
                  className="textarea"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                id="contact-submit-button"
                style={styles.submitButton}
                className="submit-button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t("nmbd.contact.form.submitting")
                  : t("nmbd.contact.form.submit")}
              </button>

              {submitError && (
                <div style={styles.errorMessage} className="error-message">
                  {submitError}
                </div>
              )}

              {formSubmitted && (
                <div style={styles.successMessage} className="success-message">
                  {t("nmbd.contact.successMessage")}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
