import type { IconProps } from './IconProps'

/** Papírová vlaštovka — hlavní akce „odeslat" v hlavičce obrazovky. */
export function IconSend({ size = 20, ...rest }: IconProps) {
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
      <path d="M17.5 2.5 9 11" />
      <path d="M17.5 2.5 12 17.5l-3-6.5-6.5-3z" />
    </svg>
  )
}
