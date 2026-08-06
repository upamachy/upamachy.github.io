import { useEffect, useState } from "react"

export function useScrollSpy(ids: string[], offset = 96) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const scrolled = window.scrollY + offset
      let current: string | null = null

      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) continue
        if (element.offsetTop <= scrolled) current = id
      }

      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = ids[ids.length - 1] ?? current
      }

      setActive(current)
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [ids, offset])

  return active
}
