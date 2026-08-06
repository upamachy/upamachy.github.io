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
      className={cn(
        "scroll-mt-16 border-t-4 border-ink py-14 sm:py-20",
        tinted &&
          "bg-[radial-gradient(color-mix(in_oklch,var(--ink)_18%,transparent)_1px,transparent_1px)] bg-[size:18px_18px]"
      )}
    >
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <header className="mb-9 sm:mb-12">
          <div className="inline-block -rotate-1">
            <p className="mb-1 text-xs font-black tracking-[0.22em] text-muted-foreground uppercase">
              {meta.kicker}
            </p>
            <h2
              id={`${id}-title`}
              className={cn(
                "inline-block rounded-xl border-4 border-ink px-4 py-2 text-2xl text-ink shadow-[6px_6px_0_0_var(--ink)] sm:px-6 sm:py-2.5 sm:text-4xl",
                meta.color
              )}
            >
              {meta.title}
            </h2>
          </div>
        </header>

        {children}
      </div>
    </section>
  )
}
