export function WoodpeckerMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden {...props}>
      <circle cx="32" cy="32" r="30" fill="var(--sky)" stroke="var(--ink)" strokeWidth="4" />
      <path
        d="M28 12c2 4 6 5 9 3-1 4-3 6-6 7 3 1 6 0 8-2-1 5-4 7-8 8"
        fill="var(--marigold)"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M40 30a14 13 0 1 1-24 9c0-8 6-14 13-14 5 0 9 2 11 5Z"
        fill="var(--teal)"
        stroke="var(--ink)"
        strokeWidth="3.5"
      />
      <path
        d="M18 36 4 40l14 5Z"
        fill="var(--tomato)"
        stroke="var(--ink)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <circle cx="27" cy="33" r="5.5" fill="#fffdf6" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="25.5" cy="33.5" r="2.4" fill="var(--ink)" />
    </svg>
  )
}
