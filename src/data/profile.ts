export type FeedKind = "experience" | "project" | "education" | "certification" | "about"

export type FeedItem = {
  id: string
  kind: FeedKind
  title: string
  subtitle: string
  period: string
  pinned?: boolean
  body: string[]
  tags: string[]
  href?: string
  hrefLabel?: string
}

export const profile = {
  siteName: "Upama's Coding House",
  name: "Upama Chowdhury",
  handle: "upamachy",
  role: ".NET Backend Engineer",
  tagline:
    "Building event-driven, serverless ASP.NET Core systems on .NET 8 and AWS. Healthcare, billing and program-monitoring platforms.",
  location: "Dhaka, Bangladesh",
  joined: "Coding since 2021",
  avatar: "upama.jpg",
  cv: "Upama-Chowdhury-CV.pdf",
  email: "upamachy360@gmail.com",
  phone: "+880 1819338505",
  github: "https://github.com/upamachy",
  linkedin: "https://linkedin.com/in/upamachowdhury",
  stats: [
    { label: "Years shipping", value: "3+" },
    { label: "Users served", value: "35k+" },
    { label: "Products", value: "5" },
  ],
}

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["C#", "SQL", "TypeScript", "JavaScript", "Python"],
  },
  {
    label: "Backend",
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
    label: "Frontend",
    items: ["Angular", "Angular Material", "React", "Bootstrap", "HTML", "CSS"],
  },
  { label: "Databases", items: ["SQL Server", "MongoDB"] },
  {
    label: "Cloud & DevOps",
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
    label: "Practices",
    items: [
      "Clean Architecture",
      "Microservices",
      "Event-driven",
      "Serverless",
      "Background jobs",
      "JWT auth",
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

export const certifications = [
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "Oct 2025",
    credential: "tzm34p6gd8c5",
  },
  {
    title: "ASP.NET Core MVC with Angular and EF Core",
    issuer: "PencilBox Training Institute",
    date: "Mar 2022",
    credential: "ASPMVC/008/012",
  },
  {
    title: "Professional Programming with C#",
    issuer: "Dev Skill",
    date: "Jun 2021",
    credential: null,
  },
]

export const feed: FeedItem[] = [
  {
    id: "about",
    kind: "about",
    title: "About me",
    subtitle: ".NET backend engineer",
    period: "Dhaka, Bangladesh",
    pinned: true,
    body: [
      "Three years building production ASP.NET Core services across healthcare, billing and program-monitoring platforms.",
      "I like the unglamorous parts: the claim that silently failed, the export that broke on one bad row, the sync that needed to become a pipeline. Backend work that people downstream actually feel.",
    ],
    tags: [".NET 8", "AWS", "MongoDB", "SQL Server"],
  },
  {
    id: "kaz",
    kind: "experience",
    title: "Associate Software Engineer",
    subtitle: "Kaz Software, Dhaka",
    period: "May 2025 — Present",
    body: [
      "Core contributor on ExpertEVV, a multi-service .NET 8 + AWS Lambda electronic visit verification platform on MongoDB serving 3-4k active users.",
      "Root-caused a production defect that was silently rejecting insurance claims, unblocking billing for affected agencies.",
      "Rebuilt HHAeXchange visit syncing into an async, event-driven pipeline on AWS Step Functions.",
      "Built an EDI 837P (ANSI X12) claim export with diagnosis coding and unit/charge calculation.",
      "Automated invoice generation and PDF/finance exports, replacing manual spreadsheet billing.",
    ],
    tags: [".NET 8", "AWS Lambda", "Step Functions", "MongoDB", "EDI 837P"],
  },
  {
    id: "gnb",
    kind: "project",
    title: "GNB MIS — Program-Monitoring API",
    subtitle: "Kaz Software",
    period: "2025",
    body: [
      "Built features on a .NET 6 Clean Architecture API serving 10k+ users.",
      "Fixed a data-integrity bug in completion reporting, scoping reports correctly and blocking duplicate submissions.",
      "Hardened the beneficiary Excel export to skip malformed records instead of failing the whole file.",
      "Added permission-based access control with JWT to sensitive reporting endpoints.",
    ],
    tags: [".NET 6", "Clean Architecture", "JWT", "SQL Server"],
  },
  {
    id: "coppanet",
    kind: "experience",
    title: "Software Engineer",
    subtitle: "Coppanet Ltd, Dhaka",
    period: "Nov 2023 — Apr 2025",
    body: [
      "Owned backend and admin-side delivery across two products, and led the team through final delivery on SoowGood.",
    ],
    tags: ["ASP.NET Core", "Angular", "EF Core", "SQL Server"],
  },
  {
    id: "soowgood",
    kind: "project",
    title: "SoowGood — Telemedicine Platform",
    subtitle: "Coppanet Ltd",
    period: "2023 — 2025",
    body: [
      "Independently built the Admin Module end-to-end in ASP.NET Core and Angular, as a separate app from the patient-facing site.",
      "Delivered authentication with ASP.NET Identity, appointment scheduling and video consultation on EF Core and SQL Server.",
      "Led the team through final delivery on a platform serving 20k+ registered users.",
    ],
    tags: ["ASP.NET Core", "Angular", "ASP.NET Identity", "EF Core"],
  },
  {
    id: "firststudy",
    kind: "project",
    title: "FirstStudy — Coaching & Student Management",
    subtitle: "Coppanet Ltd",
    period: "2024",
    body: [
      "Sole developer modernizing an inherited legacy system used by 10-12 institutes and 3,000+ students.",
      "Refactored unstable modules and optimized EF Core and LINQ queries while keeping the system live.",
    ],
    tags: ["EF Core", "LINQ", "Refactoring", "Legacy"],
  },
  {
    id: "quad",
    kind: "experience",
    title: "Intern Software Engineer",
    subtitle: "Quad Theory Ltd, Dhaka",
    period: "Apr 2023 — Jul 2023",
    body: [
      "Built a demo ASP.NET Web API covering frontend, backend and database.",
      "Added features to a live ASP.NET MVC and AngularJS product, working with stored procedures and T-SQL on MS SQL Server.",
    ],
    tags: ["ASP.NET Web API", "AngularJS", "T-SQL", "React"],
  },
  {
    id: "thesis",
    kind: "project",
    title: "Type-2 Diabetes Gene Detection using Explainable AI",
    subtitle: "Final-year thesis, East Delta University",
    period: "2023",
    body: [
      "Detected genes responsible for Type-2 diabetes and suggested personalized treatments using machine learning and LIME.",
      "Focused on identifying specific diabetes-causing genes to enable targeted, individualized solutions.",
    ],
    tags: ["Python", "Machine Learning", "LIME", "Explainable AI"],
  },
  {
    id: "edu",
    kind: "education",
    title: "B.Sc. in Computer Science & Engineering",
    subtitle: "East Delta University",
    period: "CGPA 3.67 / 4.00",
    body: [
      "Coordinator of the EDU Computer Club.",
      "Higher Secondary Certificate at CUET School and College, Chittagong, GPA 4.17 / 5.00.",
    ],
    tags: ["CSE", "Coordinator"],
  },
  {
    id: "cert-anthropic",
    kind: "certification",
    title: "AI Fluency: Framework & Foundations",
    subtitle: "Anthropic",
    period: "Oct 2025",
    body: ["Credential ID tzm34p6gd8c5."],
    tags: ["AI"],
  },
  {
    id: "cert-pencilbox",
    kind: "certification",
    title: "ASP.NET Core MVC with Angular and EF Core",
    subtitle: "PencilBox Training Institute",
    period: "Mar 2022",
    body: [
      "96-hour training program, Oct 2021 to Dec 2021. Credential ID ASPMVC/008/012, awarded with Excellence Award.",
    ],
    tags: ["ASP.NET Core", "Angular", "EF Core"],
    href: "cert-pencilbox.jpg",
    hrefLabel: "View certificate",
  },
  {
    id: "cert-devskill",
    kind: "certification",
    title: "Professional Programming with C#",
    subtitle: "Dev Skill",
    period: "Jun 2021",
    body: ["Professional training in C# fundamentals and object-oriented programming."],
    tags: ["C#"],
  },
]
