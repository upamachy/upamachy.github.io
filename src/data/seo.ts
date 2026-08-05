import { certifications, profile, skillGroups } from "@/data/profile"

export const site = {
  url: "https://upamachy.github.io",
  title: "Upama's Coding House — Upama Chowdhury, .NET Backend Engineer",
  shortTitle: "Upama's Coding House",
  description:
    "Portfolio of Upama Chowdhury, a .NET backend engineer in Dhaka, Bangladesh with 3+ years building ASP.NET Core, .NET 8 and AWS serverless systems across healthcare, billing and program-monitoring platforms.",
  locale: "en_US",
  themeColor: "#0a0a0a",
}

export const keywords = [
  "Upama Chowdhury",
  "Upama's Coding House",
  "upamachy",
  ".NET backend engineer",
  "ASP.NET Core developer",
  ".NET 8 developer",
  "C# developer Bangladesh",
  "software engineer Dhaka",
  "AWS Lambda .NET",
  "EF Core",
  "MongoDB",
  "SQL Server",
  "Angular developer",
  "EDI 837P",
  "Clean Architecture",
  "serverless .NET",
  "backend portfolio",
]

const knowsAbout = skillGroups.flatMap((group) => group.items)

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
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "East Delta University",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chattogram",
        addressCountry: "BD",
      },
    },
    worksFor: {
      "@type": "Organization",
      name: "Kaz Software",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
    },
    hasCredential: certifications.map((certification) => ({
      "@type": "EducationalOccupationalCredential",
      name: certification.title,
      credentialCategory: "certificate",
      dateCreated: certification.date,
      recognizedBy: { "@type": "Organization", name: certification.issuer },
      ...(certification.credential ? { identifier: certification.credential } : {}),
    })),
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
  }

  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${site.url}/#breadcrumbs`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Experience", item: `${site.url}/#experience` },
      { "@type": "ListItem", position: 3, name: "Projects", item: `${site.url}/#projects` },
      { "@type": "ListItem", position: 4, name: "Certifications", item: `${site.url}/#certifications` },
    ],
  }

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, breadcrumbs],
  }
}
