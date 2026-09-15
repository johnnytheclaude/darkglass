import type { IconProps } from './IconProps'

export function IconFolderTree({ size = 18, ...rest }: IconProps) {
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
      <path d="M9.4 3.2h2.4l1.2 1.6h4.2v3.6H9.4Z" />
      <path d="M9.4 11.6h2.4l1.2 1.6h4.2v3.6H9.4Z" />
      <path d="M2.6 2.6v11.2a1.6 1.6 0 0 0 1.6 1.6h1.6" />
      <path d="M2.6 6.6h3.2" />
    </svg>
  )
}
