import { certifications, education, profile, research, work } from "@/data/profile"

export const site = {
  url: "https://upamachy.github.io",
  title: "Upama's Coding House — Upama Chowdhury, .NET Backend Engineer",
  shortTitle: "Upama's Coding House",
  description:
    "Portfolio of Upama Chowdhury, a .NET backend engineer in Dhaka, Bangladesh with 3+ years building ASP.NET Core, .NET 8 and AWS serverless systems across healthcare, billing and program-monitoring platforms.",
  locale: "en_US",
  themeColor: "#0a0a0a",
}

const projects = work.flatMap((job) => job.projects)
const knowsAbout = projects.flatMap((project) => project.tags)

export function structuredData() {
  const person = {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: profile.name,
    alternateName: profile.handle,
    url: site.url,
    image: `${site.url}/upama.jpg`,
    jobTitle: profile.role,
    description: profile.tagline,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    knowsAbout,
    knowsLanguage: ["English", "Bengali"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: [profile.github, profile.linkedin],
    alumniOf: education.map((item) => ({
      "@type": item.id === "bsc" ? "CollegeOrUniversity" : "EducationalOrganization",
      name: item.institution,
      address: {
        "@type": "PostalAddress",
        addressLocality: item.location.split(",")[0],
        addressCountry: "BD",
      },
    })),
    worksFor: {
      "@type": "Organization",
      name: "Kaz Software",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
    },
    hasCredential: [
      ...education.map((item) => ({
        "@type": "EducationalOccupationalCredential",
        name: item.degree,
        credentialCategory: "degree",
        educationalLevel: item.id === "bsc" ? "Bachelor" : "Secondary",
        recognizedBy: { "@type": "EducationalOrganization", name: item.institution },
      })),
      ...certifications.map((certification) => ({
        "@type": "EducationalOccupationalCredential",
        name: certification.title,
        credentialCategory: "certificate",
        dateCreated: certification.date,
        recognizedBy: { "@type": "Organization", name: certification.issuer },
        ...(certification.credential ? { identifier: certification.credential } : {}),
      })),
    ],
    memberOf: {
      "@type": "Organization",
      name: "EDU Computer Club",
      description: "Coordinator",
    },
  }

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.shortTitle,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": `${site.url}/#person` },
  }

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${site.url}/#webpage`,
    url: site.url,
    name: site.title,
    description: site.description,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#person` },
    mainEntity: { "@id": `${site.url}/#person` },
    primaryImageOfPage: `${site.url}/og.png`,
    inLanguage: "en",
    hasPart: [
      ...projects.map((project) => ({
        "@type": "CreativeWork",
        name: `${project.name} — ${project.kind}`,
        description: project.blurb,
        author: { "@id": `${site.url}/#person` },
        keywords: project.tags.join(", "),
      })),
      {
        "@type": "ScholarlyArticle",
        name: research.title,
        description: research.blurb,
        author: { "@id": `${site.url}/#person` },
        keywords: research.tags.join(", "),
      },
    ],
  }

  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${site.url}/#breadcrumbs`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "About", item: `${site.url}/#about` },
      { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/#work` },
      { "@type": "ListItem", position: 3, name: "Toolbox", item: `${site.url}/#toolbox` },
      { "@type": "ListItem", position: 4, name: "Schooling", item: `${site.url}/#schooling` },
      { "@type": "ListItem", position: 5, name: "Contact", item: `${site.url}/#contact` },
    ],
  }

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, breadcrumbs],
  }
}
