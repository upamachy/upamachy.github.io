export const profile = {
  siteName: "Upama's Coding House",
  name: "Upama Chowdhury",
  handle: "upamachy",
  role: ".NET Backend Engineer",
  punchline: "I peck at backends until they behave.",
  tagline:
    "Three years building ASP.NET Core services for healthcare, billing and program-monitoring platforms. Lately: event-driven, serverless things on .NET 8 and AWS.",
  location: "Dhaka, Bangladesh",
  avatar: "upama.jpg",
  cv: "Upama-Chowdhury-CV.pdf",
  email: "upamachy360@gmail.com",
  phone: "+880 1819338505",
  github: "https://github.com/upamachy",
  linkedin: "https://linkedin.com/in/upamachowdhury",
}

export const stats = [
  { value: "3", unit: "yrs", label: "in production" },
  { value: "35k", unit: "+", label: "people on what I shipped" },
  { value: "4", unit: "", label: "platforms delivered" },
]

export const about = [
  "Three years in production across healthcare claims, agency billing and government program monitoring — systems where a quiet bug costs somebody real money.",
]

export type Bug = {
  id: string
  name: string
  where: string
  fix: string
}

export const bugs: Bug[] = [
  {
    id: "claims",
    name: "Claims vanishing in silence",
    where: "ExpertEVV · Kaz Software",
    fix: "Insurance claims were being rejected with no error surfaced. Traced it, fixed it, billing unblocked for every affected agency.",
  },
  {
    id: "sync",
    name: "A sync that kept falling over",
    where: "ExpertEVV · Kaz Software",
    fix: "Rebuilt HHAeXchange visit syncing as an event-driven pipeline on AWS Step Functions instead of one fragile synchronous call.",
  },
  {
    id: "export",
    name: "One bad row killed the whole file",
    where: "GNB MIS · Kaz Software",
    fix: "Hardened the beneficiary Excel export so malformed records are skipped instead of failing the entire export.",
  },
  {
    id: "duplicates",
    name: "Reports counted twice",
    where: "GNB MIS · Kaz Software",
    fix: "Data-integrity defect in completion reporting: corrected report scoping and blocked duplicate submissions at the source.",
  },
  {
    id: "spreadsheets",
    name: "Billing done by hand",
    where: "ExpertEVV · Kaz Software",
    fix: "Automated invoice generation and PDF finance exports, retiring a manual spreadsheet process.",
  },
]

export const traits = [
  {
    emoji: "🪵",
    title: "I go after the hard knot",
    body: "Found a defect that had been silently rejecting insurance claims and unblocked billing for every affected agency.",
  },
  {
    emoji: "⚡",
    title: "I like things asynchronous",
    body: "Turned a fragile synchronous visit sync into an event-driven pipeline on AWS Step Functions.",
  },
  {
    emoji: "🧱",
    title: "I build so it does not break twice",
    body: "Exports that skip one bad row instead of failing the whole file. Duplicate submissions blocked at the source.",
  },
]

export type WorkProject = {
  name: string
  kind: string
  blurb: string
  highlights: string[]
  tags: string[]
}

export type Job = {
  id: string
  company: string
  role: string
  period: string
  location: string
  current?: boolean
  summary: string
  projects: WorkProject[]
}

export const work: Job[] = [
  {
    id: "kaz",
    company: "Kaz Software",
    role: "Associate Software Engineer",
    period: "May 2025 — Present",
    location: "Dhaka",
    current: true,
    summary:
      "Backend work on two products: a US home-care billing platform and a government program-monitoring API.",
    projects: [
      {
        name: "ExpertEVV",
        kind: "Electronic Visit Verification",
        blurb:
          "Multi-service .NET 8 platform on AWS that records home-care visits and turns them into payable insurance claims. Around 3,000–4,000 active users.",
        highlights: [
          "Diagnosed a production defect that was silently rejecting insurance claims, restoring billing for affected agencies.",
          "Rebuilt HHAeXchange visit synchronization as an event-driven pipeline on AWS Step Functions.",
          "Built the EDI 837P (ANSI X12) claim export, with diagnosis coding and unit and charge calculation.",
          "Automated invoice generation and PDF finance exports, retiring a manual spreadsheet process.",
        ],
        tags: [".NET 8", "AWS Lambda", "Step Functions", "MongoDB", "EDI 837P"],
      },
      {
        name: "GNB MIS",
        kind: "Program-Monitoring API",
        blurb:
          ".NET 6 Clean Architecture API serving 10,000+ users across field reporting and beneficiary management.",
        highlights: [
          "Resolved a data-integrity defect in completion reporting through correct scoping and duplicate-submission control.",
          "Hardened the beneficiary Excel export to skip malformed records rather than fail the whole file.",
          "Added permission-based JWT access control to sensitive reporting endpoints.",
        ],
        tags: [".NET 6", "Clean Architecture", "JWT", "SQL Server"],
      },
    ],
  },
  {
    id: "coppanet",
    company: "Coppanet Ltd",
    role: "Software Engineer",
    period: "Nov 2023 — Apr 2025",
    location: "Dhaka",
    summary:
      "Owned admin-side delivery on a telemedicine platform, then took sole ownership of a legacy education system.",
    projects: [
      {
        name: "SoowGood",
        kind: "Telemedicine Platform",
        blurb:
          "Telemedicine platform with 20,000+ registered users. I built and owned the entire administrative application.",
        highlights: [
          "Built the admin module end to end in ASP.NET Core and Angular, separate from the patient-facing site.",
          "Implemented ASP.NET Identity authentication, appointment scheduling and video consultation on EF Core.",
          "Led the team through final delivery and release.",
        ],
        tags: ["ASP.NET Core", "Angular", "ASP.NET Identity", "EF Core", "SQL Server"],
      },
      {
        name: "FirstStudy",
        kind: "Coaching & Student Management",
        blurb:
          "Inherited legacy system for 10–12 institutes and 3,000+ students. Sole developer, rebuilding it while it stayed live.",
        highlights: [
          "Refactored unstable modules incrementally, with no downtime for live institutes.",
          "Optimized EF Core and LINQ queries on the heaviest reporting paths.",
          "Consolidated teacher, student and payment management into one administrative interface.",
        ],
        tags: ["ASP.NET Core", "EF Core", "LINQ", "Refactoring"],
      },
    ],
  },
  {
    id: "quad",
    company: "Quad Theory Ltd",
    role: "Intern Software Engineer",
    period: "Apr 2023 — Jul 2023",
    location: "Dhaka",
    summary: "First taste of a production codebase, front and back.",
    projects: [
      {
        name: "Internship",
        kind: "ASP.NET MVC & Web API",
        blurb: "Built a demonstration Web API end to end and shipped features into a live product.",
        highlights: [
          "Built a demonstration ASP.NET Web API covering frontend, backend and database layers.",
          "Implemented features across a live ASP.NET MVC and AngularJS product.",
          "Worked with stored procedures and T-SQL on MS SQL Server, and wrote test cases for new functionality.",
        ],
        tags: ["ASP.NET Web API", "AngularJS", "React", "T-SQL"],
      },
    ],
  },
]

export const research = {
  title: "Type-2 Diabetes Gene Detection using Explainable AI",
  context: "Final-year thesis · East Delta University · 2023",
  blurb:
    "Machine learning research identifying genes associated with Type-2 diabetes, with LIME applied so the model's reasoning is inspectable rather than opaque — the goal being targeted, individualized treatment.",
  tags: ["Python", "Machine Learning", "LIME", "Explainable AI"],
}

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Core .NET",
    items: ["C#", "ASP.NET Core", ".NET 8", ".NET 6", "Web API", "MVC", "EF Core", "LINQ"],
  },
  {
    label: "AWS",
    items: ["Lambda", "Step Functions", "EventBridge", "SQS", "API Gateway", "S3", "Cognito"],
  },
  { label: "Data", items: ["SQL Server", "MongoDB", "T-SQL", "Stored procedures"] },
  {
    label: "Beyond the backend",
    items: ["Angular", "Angular Material", "React", "TypeScript", "Python"],
  },
  {
    label: "How I build",
    items: [
      "Clean Architecture",
      "Microservices",
      "Event-driven",
      "JWT & Cognito auth",
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
  "Step Functions",
  "EDI 837P",
]

export type Education = {
  id: string
  degree: string
  institution: string
  location: string
  period: string
  grade: string
  note?: string
}

export const education: Education[] = [
  {
    id: "bsc",
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "East Delta University",
    location: "Chattogram",
    period: "Graduated 2023",
    grade: "CGPA 3.67 / 4.00",
    note: "Coordinator, EDU Computer Club.",
  },
  {
    id: "hsc",
    degree: "Higher Secondary School Certificate",
    institution: "CUET School and College",
    location: "Chittagong",
    period: "2016 — 2018",
    grade: "GPA 4.17 / 5.00",
    note: "Science group.",
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate",
    institution: "CUET School and College",
    location: "Chittagong",
    period: "2015 — 2016",
    grade: "CGPA 5.00 / 5.00",
    note: "Science group.",
  },
]

export type Certification = {
  id: string
  title: string
  issuer: string
  date: string
  credential: string | null
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
  },
  {
    id: "cert-pencilbox",
    title: "ASP.NET Core MVC with Angular and EF Core",
    issuer: "PencilBox Training Institute",
    date: "Mar 2022",
    credential: "ASPMVC/008/012",
    href: "cert-pencilbox.jpg",
    hrefLabel: "See it",
  },
  {
    id: "cert-devskill",
    title: "Professional Programming with C#",
    issuer: "Dev Skill",
    date: "Jun 2021",
    credential: null,
  },
]
