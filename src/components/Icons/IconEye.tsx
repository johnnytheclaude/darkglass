import type { IconProps } from './IconProps'

export interface IconEyeProps extends IconProps {
  /** Přeškrtnuté oko = heslo je právě vidět a klik ho schová. */
  off?: boolean
}

export function IconEye({ size = 18, off = false, ...rest }: IconEyeProps) {
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
      <path d="M1.9 10S5 4.75 10 4.75 18.1 10 18.1 10 15 15.25 10 15.25 1.9 10 1.9 10Z" />
      <circle cx="10" cy="10" r="2.5" />
      {off ? <path d="m3.5 3.5 13 13" /> : null}
    </svg>
  )
}
