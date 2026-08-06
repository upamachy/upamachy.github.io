import { sectionMap, type SectionId } from "@/components/nav"
import { cn } from "@/lib/utils"

type SectionProps = {
  id: SectionId
  tinted?: boolean
  children: React.ReactNode
}

export function Section({ id, tinted, children }: SectionProps) {
  const meta = sectionMap[id]

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-16 border-b py-14 sm:py-20", tinted && "bg-muted/40")}
    >
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <header className="mb-9 max-w-3xl sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">
              {meta.index}
            </span>
            <span aria-hidden className="h-px w-8 bg-blue-700/40 dark:bg-blue-400/40" />
            <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {meta.label}
            </span>
          </div>

          <h2
            id={`${id}-title`}
            className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          >
            {meta.title}
          </h2>

          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
            {meta.description}
          </p>
        </header>

        {children}
      </div>
    </section>
  )
}
