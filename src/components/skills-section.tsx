import { Section } from "@/components/section"
import { skillGroups } from "@/data/profile"

export function SkillsSection() {
  return (
    <Section id="skills" tinted>
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.label} className="border-t pt-5">
            <dt>
              <p className="text-sm font-semibold">{group.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{group.blurb}</p>
            </dt>
            <dd className="mt-3.5">
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border bg-background px-2 py-1 text-xs text-foreground/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
