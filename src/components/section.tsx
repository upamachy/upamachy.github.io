import { sectionMap, type SectionId } from "@/components/nav"
import { cn } from "@/lib/utils"

type SectionProps = {
  id: SectionId
  tinted?: boolean
  count?: number
  children: React.ReactNode
}

export function Section({ id, tinted, count, children }: SectionProps) {
  const meta = sectionMap[id]

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-14 border-b py-14 sm:py-20", tinted && "bg-muted/40")}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <header className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-xl ring-1",
                meta.accentTile,
                meta.accentRing
              )}
            >
              <meta.icon className="size-4.5" />
            </span>
            <span
              className={cn("text-xs font-semibold tracking-[0.16em] uppercase", meta.accentText)}
            >
              {meta.eyebrow}
              {count ? ` · ${count}` : ""}
            </span>
          </div>
          <h2
            id={`${id}-title`}
            className="mt-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl"
          >
            {meta.title}
          </h2>
          <p className="mt-2 max-w-2xl text-[0.9375rem] text-muted-foreground sm:text-base">
            {meta.description}
          </p>
        </header>
        {children}
      </div>
    </section>
  )
}
