import type { IconProps } from './IconProps'

/** Dvě protisměrné šipky — převod kusů mezi sklady (návrh mobilu, artboard 06). */
export function IconArrowRightLeft({ size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="m13.3 2.5 3.4 3.3-3.4 3.4" />
      <path d="M16.7 5.8H3.3" />
      <path d="m6.7 17.5-3.4-3.3 3.4-3.4" />
      <path d="M3.3 14.2h13.4" />
    </svg>
  )
}
