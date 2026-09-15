import type { IconProps } from './IconProps'

export function IconBoxes({ size = 18, ...rest }: IconProps) {
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
      <path d="M10 2.4 14.4 4.8v4.4L10 11.6 5.6 9.2V4.8Z" />
      <path d="M5.6 4.8 10 7.2l4.4-2.4" />
      <path d="M10 7.2v4.4" />
      <path d="M5.2 11.2 8.8 13.2v3.4l-3.6 2-3.6-2v-3.4Z" />
      <path d="M11.2 11.2l3.6 2v3.4l3.6-2v-3.4Z" />
    </svg>
  )
}
