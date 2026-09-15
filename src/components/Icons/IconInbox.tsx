import type { IconProps } from './IconProps'

/** Schránka — výchozí ikona prázdného stavu z § Stavy a zpětná vazba. */
export function IconInbox({ size = 20, ...rest }: IconProps) {
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
      <path d="M2.5 11.5h4l1.2 2h4.6l1.2-2h4" />
      <path d="M4.6 3.5h10.8l2.1 8v3.5a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5V11.5z" />
    </svg>
  )
}
