import type { IconProps } from './IconProps'

/** Lucide `brain` — AI vytěžení: klíč pro AI, vytěžený dodák. */
export function IconBrain({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M10 3.4V16.6" />
      <path d="M7.4 3.4a2.2 2.2 0 0 0-2.2 2.2 2.2 2.2 0 0 0-1.6 3.6 2.2 2.2 0 0 0 .5 3.5 2.2 2.2 0 0 0 2 2.7 2.2 2.2 0 0 0 3.9.6" />
      <path d="M12.6 3.4a2.2 2.2 0 0 1 2.2 2.2 2.2 2.2 0 0 1 1.6 3.6 2.2 2.2 0 0 1-.5 3.5 2.2 2.2 0 0 1-2 2.7 2.2 2.2 0 0 1-3.9.6" />
      <path d="M6.2 9.2h1.4" />
      <path d="M12.4 9.2h1.4" />
    </svg>
  )
}
