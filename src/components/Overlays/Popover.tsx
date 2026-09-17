import { useEffect, useRef } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { useEscapeClose } from './useEscapeClose'

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  /** Otevřeno — zavřený popover se nevykresluje vůbec. */
  open: boolean
  /** Zavření: Escape a kliknutí mimo pole. Bez něj se posluchače nevěší. */
  onClose?: () => void
  /** Zarovnání k ovládacímu prvku: začátkem (výchozí), nebo koncem. */
  align?: 'start' | 'end'
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Plovoucí panel nad ovládacím prvkem — nese kalendář u pole s datem, seznam
 * času u pole s časem a rychlé volby u období. Je v toku dokumentu (ne
 * v portálu), stejně jako nabídka rozbalovacího výběru: sedí přesně pod polem
 * a při odrolování nikam neuteče.
 *
 * Zavírá se klávesou Escape (vždy ten navrchu, viz `useEscapeClose`) a kliknutím
 * mimo. „Mimo" znamená mimo panel **i mimo jeho rodiče** — rodičem je rám pole,
 * ve kterém je i tlačítko, které popover otevírá. Bez té druhé podmínky by
 * kliknutí na tlačítko popover nejdřív zavřelo a vzápětí znovu otevřelo.
 */
export function Popover({ open, onClose, align = 'start', className, children, ...rest }: PopoverProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEscapeClose(onClose, open)

  useEffect(() => {
    if (!open || !onClose || typeof document === 'undefined') return

    const handle = (event: MouseEvent | TouchEvent) => {
      const panel = panelRef.current
      const target = event.target as Node | null
      if (!panel || !target) return
      if (panel.contains(target)) return
      if (panel.parentElement?.contains(target)) return
      onClose()
    }

    document.addEventListener('mousedown', handle)
    document.addEventListener('touchstart', handle)
    return () => {
      document.removeEventListener('mousedown', handle)
      document.removeEventListener('touchstart', handle)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={panelRef}
      className={['dg-popover', align === 'end' ? 'dg-popover--end' : null, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
