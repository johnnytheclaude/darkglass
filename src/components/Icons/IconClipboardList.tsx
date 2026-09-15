import type { IconProps } from './IconProps'

export function IconClipboardList({ size = 18, ...rest }: IconProps) {
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
      <path d="M7.4 3.9H5.8c-.8 0-1.4.6-1.4 1.4v10.3c0 .8.6 1.4 1.4 1.4h8.4c.8 0 1.4-.6 1.4-1.4V5.3c0-.8-.6-1.4-1.4-1.4h-1.6" />
      <rect x="7.4" y="2.6" width="5.2" height="2.6" rx="0.9" />
      <path d="M7.6 9.2h4.8M7.6 12.4h4.8" />
    </svg>
  )
}
