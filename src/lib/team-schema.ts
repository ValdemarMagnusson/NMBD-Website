import { site } from "../site.config";
import { nap } from "./site-nap";

export type TeamMemberConfig = {
  id: string;
  localeKey: string;
  /** Optional image path (site-relative). Omit personal sameAs unless client approves. */
  image?: string;
};

/** Team entries — names and bios come from locale `team.members.{localeKey}.*`. */
export const TEAM_MEMBERS: readonly TeamMemberConfig[] = [
  {
    id: "lead",
    localeKey: "lead",
    image: "/og-image.svg",
  },
] as const;

export type TeamMemberData = {
  name: string;
  jobTitle: string;
  bio: string;
  image?: string;
};

export function buildTeamPersonNodes(
  members: TeamMemberData[],
  origin: string = site.origin,
): Record<string, unknown>[] {
  return members.map((member, index) => ({
    "@type": "Person",
    "@id": `${origin}/om#person-${index + 1}`,
    name: member.name,
    jobTitle: member.jobTitle,
    description: member.bio,
    ...(member.image ? { image: `${origin}${member.image}` } : {}),
    worksFor: { "@id": `${origin}/#organization` },
    url: `${origin}/om`,
  }));
}

export function linkTeamToOrganization(
  graph: Record<string, unknown>[],
  personCount: number,
  origin: string = site.origin,
): void {
  const org = graph.find(
    (node) => node["@type"] === "Organization",
  ) as Record<string, unknown> | undefined;

  if (!org || personCount === 0) return;

  org.employee = Array.from({ length: personCount }, (_, index) => ({
    "@id": `${origin}/om#person-${index + 1}`,
  }));
}

export const parentOrganizationRef = {
  "@id": `${nap.url}/#organization`,
};
