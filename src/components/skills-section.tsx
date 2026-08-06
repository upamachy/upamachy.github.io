import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Section } from "@/components/section"
import { skillGroups } from "@/data/profile"

export function SkillsSection() {
  return (
    <Section id="skills" tinted count={skillGroups.length}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <Card key={group.label} className="gap-4 rounded-2xl">
            <CardHeader className="gap-1">
              <CardTitle className="text-base font-semibold">{group.label}</CardTitle>
              <CardDescription>{group.blurb}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Badge
                  key={item}
                  variant="outline"
                  className="rounded-full bg-background text-foreground/80"
                >
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
