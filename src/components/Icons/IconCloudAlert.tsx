import type { IconProps } from './IconProps'

/**
 * Lucide `cloud-alert` — odesílání do cizí služby se nepovedlo: data jsou
 * uložená, jen neodešla. Liší se od [[IconCloudOff]], které znamená „není
 * spojení": tady spojení je a protistrana odpověděla chybou.
 */
export function IconCloudAlert({ size = 18, ...rest }: IconProps) {
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
      <path d="M10 10v3.3" />
      <path d="M10 16.7h.01" />
      <path d="M14.2 15h.4a2.5 2.5 0 0 0 0-7.5h-1.5A5.8 5.8 0 1 0 5.8 14.8" />
    </svg>
  )
}
