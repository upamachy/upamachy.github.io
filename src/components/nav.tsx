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
  index: string
  label: string
  icon: React.ElementType
  title: string
  description: string
}

export const sectionList: SectionMeta[] = [
  {
    id: "about",
    index: "01",
    label: "About",
    icon: User,
    title: "Profile",
    description: "Background, focus areas and technical approach.",
  },
  {
    id: "experience",
    index: "02",
    label: "Experience",
    icon: Briefcase,
    title: "Professional experience",
    description:
      "Roles held, with responsibilities and delivered outcomes.",
  },
  {
    id: "projects",
    index: "03",
    label: "Projects",
    icon: FolderGit2,
    title: "Selected projects",
    description:
      "Production systems delivered across healthcare, billing, education and research.",
  },
  {
    id: "skills",
    index: "04",
    label: "Skills",
    icon: Layers,
    title: "Technical skills",
    description: "Languages, frameworks, platforms and practices used in production.",
  },
  {
    id: "education",
    index: "05",
    label: "Education",
    icon: GraduationCap,
    title: "Education",
    description: "Academic qualifications, results and co-curricular roles.",
  },
  {
    id: "certifications",
    index: "06",
    label: "Certifications",
    icon: BadgeCheck,
    title: "Certifications",
    description: "Professional training, with credential identifiers for verification.",
  },
  {
    id: "contact",
    index: "07",
    label: "Contact",
    icon: Mail,
    title: "Contact",
    description: "Available for backend and full-stack roles. Response within one business day.",
  },
]

export const sectionMap = Object.fromEntries(
  sectionList.map((section) => [section.id, section])
) as Record<SectionId, SectionMeta>
