import { Section } from "@/components/section"
import { skillGroups } from "@/data/profile"

const tints = ["bg-marigold", "bg-teal", "bg-tomato", "bg-sky", "bg-marigold"]

export function ToolboxSection() {
  return (
    <Section id="toolbox">
      <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <div
            key={group.label}
            className="rounded-xl border-4 border-ink bg-card p-5 shadow-[6px_6px_0_0_var(--ink)]"
          >
            <dt>
              <span
                className={`inline-block rounded-lg border-2 border-ink px-3 py-1 font-heading text-base tracking-wide text-ink ${tints[index % tints.length]}`}
              >
                {group.label}
              </span>
            </dt>
            <dd className="mt-4">
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border-2 border-ink bg-background px-2.5 py-1 text-xs font-bold"
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
