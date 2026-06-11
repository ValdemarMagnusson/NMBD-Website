/**
 * Central NAP source — keep in sync with Google Business Profile and directory listings.
 */
export const nap = {
  legalName: "Nordiska Mark, Bygg & Design AB",
  displayName: "NMBD",
  orgNumber: "559331-3306",
  url: "https://nmbd.se",
  email: "info@nmbd.se",
  phone: "08-400 654 70",
  foundingDate: "2021-08-23",
  sameAs: [
    "https://nmbd.se",
    "https://www.instagram.com/nmbd.stockholm/",
  ] as const,
  address: {
    streetAddress: "Värmdövägen 643",
    postalCode: "132 41",
    addressLocality: "Saltsjö-Boo",
    addressRegion: "Stockholms län",
    addressCountry: "SE",
  },
} as const;

export const registeredAddressLine = `${nap.address.streetAddress}, ${nap.address.postalCode} ${nap.address.addressLocality}`;

export function formatOrgNumber(orgNumber: string): string {
  const digits = orgNumber.replace(/\D/g, "");
  if (digits.length !== 10) return orgNumber;
  return `${digits.slice(0, 6)}-${digits.slice(6)}`;
}
