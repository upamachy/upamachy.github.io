import {
  BadgeCheck,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Layers,
  Mail,
  User,
} from "lucide-react"

export type SectionId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "certifications"
  | "contact"

export type SectionMeta = {
  id: SectionId
  label: string
  icon: React.ElementType
  eyebrow: string
  title: string
  description: string
  accentText: string
  accentTile: string
  accentRing: string
}

export const sectionList: SectionMeta[] = [
  {
    id: "about",
    label: "About",
    icon: User,
    eyebrow: "About",
    title: "Who you would be hiring",
    description: "A backend engineer who cares about what happens after the deploy.",
    accentText: "text-sky-700 dark:text-sky-300",
    accentTile: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    accentRing: "ring-sky-500/20",
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    eyebrow: "Experience",
    title: "Where I have worked",
    description: "Three years across healthcare, billing and program-monitoring platforms.",
    accentText: "text-violet-700 dark:text-violet-300",
    accentTile: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    accentRing: "ring-violet-500/20",
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderGit2,
    eyebrow: "Projects",
    title: "What I have built",
    description: "Production systems, not demos. Each one shipped to real users.",
    accentText: "text-emerald-700 dark:text-emerald-300",
    accentTile: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    accentRing: "ring-emerald-500/20",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Layers,
    eyebrow: "Skills",
    title: "The stack I work in",
    description: "Grouped by what I reach for, not by what looks impressive on a list.",
    accentText: "text-amber-800 dark:text-amber-300",
    accentTile: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    accentRing: "ring-amber-500/20",
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    eyebrow: "Education",
    title: "Where I studied",
    description: "Computer science at East Delta University, schooling at CUET School and College.",
    accentText: "text-rose-700 dark:text-rose-300",
    accentTile: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    accentRing: "ring-rose-500/20",
  },
  {
    id: "certifications",
    label: "Certificates",
    icon: BadgeCheck,
    eyebrow: "Certifications",
    title: "Verified training",
    description: "Credential IDs included so anything here can be checked.",
    accentText: "text-cyan-800 dark:text-cyan-300",
    accentTile: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    accentRing: "ring-cyan-500/20",
  },
  {
    id: "contact",
    label: "Contact",
    icon: Mail,
    eyebrow: "Contact",
    title: "Let us talk",
    description: "Open to backend and full-stack roles. I usually reply within a day.",
    accentText: "text-primary",
    accentTile: "bg-primary/10 text-primary",
    accentRing: "ring-primary/20",
  },
]

export const sectionMap = Object.fromEntries(
  sectionList.map((section) => [section.id, section])
) as Record<SectionId, SectionMeta>
