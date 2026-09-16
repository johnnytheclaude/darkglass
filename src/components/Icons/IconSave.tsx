import type { IconProps } from './IconProps'

/** Disketa — uložení rozdělané práce (koncept průvodce). */
export function IconSave({ size = 20, ...rest }: IconProps) {
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
      <path d="M3.5 5.5A2 2 0 0 1 5.5 3.5h7L16.5 7.5v7a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2z" />
      <path d="M6.5 3.5v4h6v-4" />
      <path d="M6.5 16.5v-4.5h7v4.5" />
    </svg>
  )
}
