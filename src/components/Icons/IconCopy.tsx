import type { IconProps } from './IconProps'

/** Kopie záznamu — „Kopírovat týden" v rozpisu směn (návrh admin 19). */
export function IconCopy({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 5.75A1.75 1.75 0 0 0 13.25 4H6a2 2 0 0 0-2 2v7.25A1.75 1.75 0 0 0 5.75 15" />
    </svg>
  )
}
