import type { SVGProps } from 'react'

/** Společné props ikon. Ikona kreslí v currentColor a je pro čtečku skrytá —
    popis nese prvek, ve kterém ikona sedí (u IconButton povinný `label`). */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  /** Hrana ikony v px (výchozí 18 podle návrhu). */
  size?: number
}
