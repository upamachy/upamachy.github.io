export const profile = {
  siteName: "Upama's Coding House",
  name: "Upama Chowdhury",
  handle: "upamachy",
  role: ".NET Backend Engineer",
  headline: "Available for backend and full-stack engineering roles.",
  tagline:
    "Three years of production experience building ASP.NET Core services across healthcare, billing and program-monitoring platforms, with a current focus on event-driven, serverless systems on .NET 8 and AWS.",
  location: "Dhaka, Bangladesh",
  availability: "Available for new opportunities",
  avatar: "upama.jpg",
  cv: "Upama-Chowdhury-CV.pdf",
  email: "upamachy360@gmail.com",
  phone: "+880 1819338505",
  github: "https://github.com/upamachy",
  linkedin: "https://linkedin.com/in/upamachowdhury",
}

export const stats = [
  { value: "3+", label: "Years of experience" },
  { value: "35k+", label: "Users served" },
  { value: "5", label: "Products delivered" },
  { value: "3.67", label: "CGPA out of 4.00" },
]

export const about = [
  ".NET backend engineer based in Dhaka, Bangladesh, with three years of production experience across healthcare, billing and program-monitoring platforms. My work centres on service design: modelling the domain, enforcing data integrity, and keeping systems reliable when upstream inputs are inconsistent.",
  "Recent work has focused on migrating synchronous integrations to event-driven pipelines on AWS, implementing standards-based claim exports, and resolving production defects with direct financial impact for clients.",
]

export type Experience = {
  id: string
  role: string
  company: string
  location: string
  period: string
  current?: boolean
  highlights: string[]
  tags: string[]
}

export const experience: Experience[] = [
  {
    id: "kaz",
    role: "Associate Software Engineer",
    company: "Kaz Software",
    location: "Dhaka, Bangladesh",
    period: "May 2025 — Present",
    current: true,
    highlights: [
      "Core contributor to a multi-service .NET 8 and AWS Lambda platform on MongoDB serving 3,000–4,000 active users.",
      "Diagnosed and resolved a production defect that was silently rejecting insurance claims, restoring billing for affected agencies.",
      "Rebuilt HHAeXchange visit synchronization as an asynchronous, event-driven pipeline on AWS Step Functions.",
      "Delivered an EDI 837P (ANSI X12) claim export, plus automated invoice generation and PDF finance exports, replacing manual spreadsheet billing.",
    ],
    tags: [".NET 8", "AWS Lambda", "Step Functions", "MongoDB", "EDI 837P"],
  },
  {
    id: "coppanet",
    role: "Software Engineer",
    company: "Coppanet Ltd",
    location: "Dhaka, Bangladesh",
    period: "Nov 2023 — Apr 2025",
    highlights: [
      "Built the SoowGood administrative module end to end in ASP.NET Core and Angular, as an application separate from the patient-facing site.",
      "Delivered authentication with ASP.NET Identity, appointment scheduling and video consultation on EF Core and SQL Server.",
      "Led the team through final delivery of a platform serving 20,000+ registered users.",
      "Sole developer responsible for modernizing FirstStudy, an inherited legacy system used by 10–12 institutes and 3,000+ students.",
    ],
    tags: ["ASP.NET Core", "Angular", "ASP.NET Identity", "EF Core", "SQL Server"],
  },
  {
    id: "quad",
    role: "Intern Software Engineer",
    company: "Quad Theory Ltd",
    location: "Dhaka, Bangladesh",
    period: "Apr 2023 — Jul 2023",
    highlights: [
      "Built a demonstration ASP.NET Web API covering frontend, backend and database layers.",
      "Implemented features across the frontend and backend of a live ASP.NET MVC and AngularJS product.",
      "Worked with stored procedures and T-SQL on MS SQL Server, and wrote test cases for new functionality.",
    ],
    tags: ["ASP.NET Web API", "AngularJS", "React", "T-SQL"],
  },
]

export type Project = {
  id: string
  name: string
  kind: string
  org: string
  period: string
  blurb: string
  highlights: string[]
  tags: string[]
  href?: string
  hrefLabel?: string
}

export const projects: Project[] = [
  {
    id: "expertevv",
    name: "ExpertEVV",
    kind: "Electronic Visit Verification",
    org: "Kaz Software",
    period: "2025 — Present",
    blurb:
      "Multi-service .NET 8 platform on AWS that records home-care visits and converts them into payable insurance claims.",
    highlights: [
      "Event-driven visit synchronization on Step Functions, replacing an unreliable synchronous integration.",
      "EDI 837P (ANSI X12) claim export with diagnosis coding and unit and charge calculation.",
      "Automated invoicing and PDF finance exports for agency billing teams.",
    ],
    tags: [".NET 8", "AWS Lambda", "MongoDB", "Step Functions", "EventBridge"],
  },
  {
    id: "gnb",
    name: "GNB MIS",
    kind: "Program-Monitoring API",
    org: "Kaz Software",
    period: "2025",
    blurb:
      ".NET 6 Clean Architecture API serving 10,000+ users across field reporting and beneficiary management.",
    highlights: [
      "Resolved a data-integrity defect in completion reporting through correct report scoping and duplicate-submission control.",
      "Hardened the beneficiary Excel export to skip malformed records rather than fail the entire file.",
      "Added permission-based JWT access control to sensitive reporting endpoints.",
    ],
    tags: [".NET 6", "Clean Architecture", "JWT", "SQL Server"],
  },
  {
    id: "soowgood",
    name: "SoowGood",
    kind: "Telemedicine Platform",
    org: "Coppanet Ltd",
    period: "2023 — 2025",
    blurb:
      "Telemedicine platform serving 20,000+ registered users. Sole owner of the administrative application.",
    highlights: [
      "Built the administrative module end to end in ASP.NET Core and Angular as a standalone application.",
      "Implemented authentication via ASP.NET Identity, appointment scheduling and video consultation on EF Core.",
      "Led the team through final delivery and release.",
    ],
    tags: ["ASP.NET Core", "Angular", "Angular Material", "EF Core", "SQL Server"],
  },
  {
    id: "firststudy",
    name: "FirstStudy",
    kind: "Coaching & Student Management",
    org: "Coppanet Ltd",
    period: "2024",
    blurb:
      "Inherited legacy system serving 10–12 institutes and 3,000+ students, modernized while remaining in production.",
    highlights: [
      "Refactored unstable modules incrementally, without downtime for live institutes.",
      "Optimized EF Core and LINQ queries on the heaviest reporting paths.",
      "Consolidated teacher, student and payment management into a single administrative interface.",
    ],
    tags: ["ASP.NET Core", "EF Core", "LINQ", "Refactoring"],
  },
  {
    id: "thesis",
    name: "Type-2 Diabetes Gene Detection",
    kind: "Final-Year Thesis, Explainable AI",
    org: "East Delta University",
    period: "2023",
    blurb:
      "Machine learning research identifying genes associated with Type-2 diabetes, with interpretable model output.",
    highlights: [
      "Applied LIME to make model predictions interpretable rather than opaque.",
      "Identified causative genes to support targeted, individualized treatment.",
    ],
    tags: ["Python", "Machine Learning", "LIME", "Explainable AI"],
  },
]

export type Education = {
  id: string
  degree: string
  institution: string
  location: string
  period: string
  grade: string
  notes: string[]
}

export const education: Education[] = [
  {
    id: "bsc",
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "East Delta University",
    location: "Chattogram, Bangladesh",
    period: "Graduated 2023",
    grade: "CGPA 3.67 / 4.00",
    notes: ["Final-year thesis on Type-2 diabetes gene detection using explainable AI."],
  },
  {
    id: "hsc",
    degree: "Higher Secondary School Certificate (HSC)",
    institution: "CUET School and College",
    location: "Chittagong, Bangladesh",
    period: "2016 — 2018",
    grade: "GPA 4.17 / 5.00",
    notes: ["Science group."],
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate (SSC)",
    institution: "CUET School and College",
    location: "Chittagong, Bangladesh",
    period: "2015 — 2016",
    grade: "CGPA 5.00 / 5.00",
    notes: ["Science group."],
  },
]

export type Activity = {
  id: string
  role: string
  organization: string
  detail: string
}

export const activities: Activity[] = [
  {
    id: "edu-computer-club",
    role: "Coordinator",
    organization: "EDU Computer Club",
    detail: "Coordinated club activities and technical events at East Delta University.",
  },
]

export const skillGroups: { label: string; blurb: string; items: string[] }[] = [
  {
    label: "Languages",
    blurb: "Primary programming languages",
    items: ["C#", "SQL", "TypeScript", "JavaScript", "Python"],
  },
  {
    label: "Backend",
    blurb: "Frameworks and libraries",
    items: [
      "ASP.NET Core",
      ".NET 8",
      ".NET 6",
      "Web API",
      "MVC",
      "EF Core",
      "LINQ",
      "ASP.NET Identity",
      "REST",
      "async/await",
    ],
  },
  {
    label: "Cloud & DevOps",
    blurb: "Platforms and tooling",
    items: [
      "AWS Lambda",
      "API Gateway",
      "Step Functions",
      "EventBridge",
      "SQS",
      "S3",
      "Cognito",
      "Git",
      "GitHub",
    ],
  },
  {
    label: "Databases",
    blurb: "Data stores and query languages",
    items: ["SQL Server", "MongoDB", "T-SQL", "Stored procedures"],
  },
  {
    label: "Frontend",
    blurb: "Client-side frameworks",
    items: ["Angular", "Angular Material", "React", "Bootstrap", "HTML", "CSS"],
  },
  {
    label: "Practices",
    blurb: "Architecture and methodology",
    items: [
      "Clean Architecture",
      "Microservices",
      "Event-driven",
      "Serverless",
      "Background jobs",
      "JWT / Cognito auth",
      "EDI 837P",
      "Automated testing",
    ],
  },
]

export const topSkills = [
  "ASP.NET Core",
  ".NET 8",
  "AWS Lambda",
  "MongoDB",
  "SQL Server",
  "EF Core",
  "Step Functions",
  "Angular",
  "Clean Architecture",
  "EDI 837P",
]

export type Certification = {
  id: string
  title: string
  issuer: string
  date: string
  credential: string | null
  detail: string
  href?: string
  hrefLabel?: string
}

export const certifications: Certification[] = [
  {
    id: "cert-anthropic",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "Oct 2025",
    credential: "tzm34p6gd8c5",
    detail: "Framework for working effectively and responsibly with AI systems.",
  },
  {
    id: "cert-pencilbox",
    title: "ASP.NET Core MVC with Angular and EF Core",
    issuer: "PencilBox Training Institute",
    date: "Mar 2022",
    credential: "ASPMVC/008/012",
    detail: "96-hour training programme completed October to December 2021. Awarded the Excellence Award.",
    href: "cert-pencilbox.jpg",
    hrefLabel: "View certificate",
  },
  {
    id: "cert-devskill",
    title: "Professional Programming with C#",
    issuer: "Dev Skill",
    date: "Jun 2021",
    credential: null,
    detail: "Professional training in C# fundamentals and object-oriented programming.",
  },
]
