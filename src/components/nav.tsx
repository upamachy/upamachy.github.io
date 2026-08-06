export type SectionId = "about" | "work" | "toolbox" | "schooling" | "contact"

export type SectionMeta = {
  id: SectionId
  label: string
  kicker: string
  title: string
  color: string
}

export const sectionList: SectionMeta[] = [
  {
    id: "about",
    label: "About",
    kicker: "Reel one",
    title: "Who's this bird?",
    color: "bg-marigold",
  },
  {
    id: "work",
    label: "Work",
    kicker: "Reel two",
    title: "The Work",
    color: "bg-teal",
  },
  {
    id: "toolbox",
    label: "Toolbox",
    kicker: "Reel three",
    title: "The Toolbox",
    color: "bg-tomato",
  },
  {
    id: "schooling",
    label: "Schooling",
    kicker: "Reel four",
    title: "Schooling & Badges",
    color: "bg-sky",
  },
  {
    id: "contact",
    label: "Contact",
    kicker: "That's all",
    title: "Say Hello",
    color: "bg-marigold",
  },
]

export const sectionMap = Object.fromEntries(
  sectionList.map((section) => [section.id, section])
) as Record<SectionId, SectionMeta>
