import { Section } from "@/components/section"
import { activities, education } from "@/data/profile"

export function EducationSection() {
  return (
    <Section id="education">
      <ol className="space-y-10">
        {education.map((item) => (
          <li key={item.id} className="grid gap-x-10 gap-y-3 border-t pt-8 sm:grid-cols-[10.5rem_1fr]">
            <div className="sm:pt-0.5">
              <p className="text-sm font-medium">{item.period}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold tracking-tight text-balance">{item.degree}</h3>
              <p className="mt-1 text-[0.9375rem] font-medium text-blue-700 dark:text-blue-400">
                {item.institution}
              </p>
              <p className="mt-2.5 inline-block rounded-md border bg-background px-2 py-1 text-xs font-medium">
                {item.grade}
              </p>

              {item.notes.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-muted-foreground/50">
                  {item.notes.map((note) => (
                    <li key={note} className="pl-1 text-muted-foreground">
                      {note}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14">
        <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Co-curricular activities
        </h3>

        <dl className="mt-5 space-y-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="grid gap-x-10 gap-y-1 border-t pt-5 sm:grid-cols-[10.5rem_1fr]"
            >
              <dt className="text-sm font-medium">{activity.role}</dt>
              <dd className="min-w-0">
                <p className="text-[0.9375rem] font-medium text-blue-700 dark:text-blue-400">
                  {activity.organization}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{activity.detail}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
