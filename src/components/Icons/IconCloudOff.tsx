import type { IconProps } from './IconProps'

/** Lucide `cloud-off` — bez spojení: doklad čeká ve frontě, než se obnoví síť. */
export function IconCloudOff({ size = 18, ...rest }: IconProps) {
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
      <path d="M4.4 6.2a5 5 0 0 0 1 9.9h7.3a3.6 3.6 0 0 0 2.5-1" />
      <path d="M7.7 4.5a5 5 0 0 1 7.2 4.1 3.6 3.6 0 0 1 2.3 5.5" />
      <path d="M2.6 2.6l14.8 14.8" />
    </svg>
  )
}
