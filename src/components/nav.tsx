import { BadgeCheck, Briefcase, FolderGit2, GraduationCap, Home } from "lucide-react"
import type { FeedKind } from "@/data/profile"

export type Section = "home" | FeedKind

export const sections: { value: Section; label: string; icon: React.ElementType }[] = [
  { value: "home", label: "Home", icon: Home },
  { value: "experience", label: "Experience", icon: Briefcase },
  { value: "project", label: "Projects", icon: FolderGit2 },
  { value: "education", label: "Education", icon: GraduationCap },
  { value: "certification", label: "Certificates", icon: BadgeCheck },
]
