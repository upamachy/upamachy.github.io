import { Section } from "@/components/section"
import { about, profile, traits } from "@/data/profile"
import { asset } from "@/lib/asset"

export function AboutSection() {
  return (
    <Section id="about">
      <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
        <figure className="w-40 -rotate-2 sm:w-52 lg:w-56">
          <img
            src={asset(profile.avatar)}
            alt={`Portrait of ${profile.name}`}
            width={224}
            height={280}
            className="aspect-4/5 w-full rounded-xl border-4 border-ink bg-muted object-cover object-top shadow-[8px_8px_0_0_var(--ink)]"
          />
        </figure>

        <div className="min-w-0 space-y-4">
          {about.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed font-medium sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-3">
        {traits.map((trait) => (
          <li
            key={trait.title}
            className="rounded-xl border-4 border-ink bg-card p-5 shadow-[6px_6px_0_0_var(--ink)]"
          >
            <span aria-hidden className="text-3xl">
              {trait.emoji}
            </span>
            <h3 className="mt-3 font-heading text-lg leading-tight tracking-wide">{trait.title}</h3>
            <p className="mt-2 text-sm leading-relaxed font-medium text-muted-foreground">
              {trait.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
