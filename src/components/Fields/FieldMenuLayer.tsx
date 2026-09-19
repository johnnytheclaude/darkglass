import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FieldMenu } from './FieldMenu'
import type { FieldMenuProps } from './FieldMenu'

/** Mezera mezi polem a nabídkou (v px, škálu řeší CSS uvnitř nabídky). */
const GAP = 6
/** Odstup nabídky od okraje okna, aby nikdy nelícovala s hranou. */
const MARGIN = 8
/** Pod tuhle výšku se nabídka nesmrskne ani v těsném místě — radši se roluje. */
const MIN_HEIGHT = 120

export interface FieldMenuLayerProps extends Omit<FieldMenuProps, 'ref'> {
  /** Pole, pod kterým nabídka visí — měří se podle něj a zavírá se s ním. */
  anchorRef: { current: HTMLElement | null }
  /** Klik mimo pole i nabídku, nebo odrolování pole z okna. */
  onDismiss?: () => void
}

interface Placement {
  top: number
  left: number
  width: number
  maxHeight: number
  above: boolean
}

function same(a: Placement | null, b: Placement) {
  return (
    a != null &&
    a.top === b.top &&
    a.left === b.left &&
    a.width === b.width &&
    a.maxHeight === b.maxHeight &&
    a.above === b.above
  )
}

/**
 * Rozbalená nabídka pole v překryvné vrstvě — portálem na `document.body`
 * (task #845).
 *
 * Proč portál: nabídka kreslená v toku dokumentu si v rozvržení bere místo,
 * takže obsah pod polem při rozbalení poskočí dolů (owner to viděl na kroku
 * Ceny nové příjemky, sloupec „DPH prodejní ceny“ — celá tabulka nadskočila).
 * Portál na `body` navíc obchází karty se sklem: prvek s `backdrop-filter` je
 * containing block pro `position: fixed` uvnitř a vlastní stacking context,
 * takže nabídka počítaná uvnitř karty by se měřila na kartu, ne na okno —
 * stejná past, kvůli které portálují dialogy Adminu (#623/#651).
 *
 * Co vrstva umí:
 *
 * - **Neodsouvá nic.** Je mimo tok, rozvržení stránky se otevřením nemění.
 * - **Otočí se nahoru**, když se pod polem nevejde a nad ním je víc místa,
 *   a u pravého okraje se zarovná tak, aby se do okna vešla celá.
 * - **Drží se pole při rolování.** Posluchač `scroll` v zachytávací fázi
 *   chytá i rolování uvnitř tabulky nebo dialogu, ne jen okna. Jakmile pole
 *   z okna úplně zmizí, nabídka se zavře — viset na prázdném místě nesmí.
 * - **Zavírá se klikem mimo.** V toku to obstarávala samotná struktura pole;
 *   portál je mimo něj, takže si posluchač musí držet sama.
 *
 * Nabídka zůstává `role="listbox"` ovládaná z pole (fokus je celou dobu na
 * spouštěči), takže klávesnice se přesunem nikam neztratila.
 */
export function FieldMenuLayer({ anchorRef, onDismiss, className, style, ...menu }: FieldMenuLayerProps) {
  const menuRef = useRef<HTMLUListElement | null>(null)
  const [placement, setPlacement] = useState<Placement | null>(null)
  /** Portál smí až po připojení — na serveru žádné `document` není. */
  const [mounted, setMounted] = useState(false)

  const dismissRef = useRef(onDismiss)
  dismissRef.current = onDismiss

  const place = useCallback(() => {
    const anchor = anchorRef.current
    if (!anchor || typeof window === 'undefined') return

    const rect = anchor.getBoundingClientRect()
    const vw = document.documentElement.clientWidth
    const vh = document.documentElement.clientHeight

    /* Pole odrolovalo z okna (uvnitř tabulky i celou stránkou) — nabídka nemá
       nad čím viset, tak se zavře. */
    if (rect.bottom <= 0 || rect.top >= vh || rect.right <= 0 || rect.left >= vw) {
      dismissRef.current?.()
      return
    }

    const menuEl = menuRef.current
    const needed = menuEl ? menuEl.scrollHeight : 0
    const measured = menuEl ? menuEl.getBoundingClientRect().width : rect.width

    const below = vh - rect.bottom - GAP - MARGIN
    const above = rect.top - GAP - MARGIN
    const flip = needed > below && above > below
    const maxHeight = Math.round(Math.max(MIN_HEIGHT, flip ? above : below))
    const height = Math.min(needed || maxHeight, maxHeight)

    const width = Math.min(Math.max(measured, rect.width), vw - 2 * MARGIN)
    let left = rect.left
    if (left + width > vw - MARGIN) left = vw - MARGIN - width
    if (left < MARGIN) left = MARGIN

    const next: Placement = {
      top: Math.round(flip ? Math.max(MARGIN, rect.top - GAP - height) : rect.bottom + GAP),
      left: Math.round(left),
      width: Math.round(rect.width),
      maxHeight,
      above: flip,
    }

    setPlacement((prev) => (same(prev, next) ? prev : next))
  }, [anchorRef])

  useEffect(() => {
    setMounted(true)
  }, [])

  /* Bez pole závislostí schválně: po každém překreslení se pozice dopočítá
     podle skutečně změřené nabídky. Shodný výsledek stav nemění, takže se to
     po druhém průchodu zastaví. */
  useLayoutEffect(() => {
    place()
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handle = () => place()
    // `true` = zachytávací fáze: chytí i rolování uvnitř tabulky nebo dialogu.
    window.addEventListener('scroll', handle, true)
    window.addEventListener('resize', handle)
    return () => {
      window.removeEventListener('scroll', handle, true)
      window.removeEventListener('resize', handle)
    }
  }, [place])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const handle = (event: Event) => {
      const target = event.target as Node | null
      if (target == null) return
      if (anchorRef.current?.contains(target)) return
      if (menuRef.current?.contains(target)) return
      dismissRef.current?.()
    }
    document.addEventListener('pointerdown', handle, true)
    return () => document.removeEventListener('pointerdown', handle, true)
  }, [anchorRef])

  if (!mounted || typeof document === 'undefined') return null

  return createPortal(
    <FieldMenu
      {...menu}
      ref={menuRef}
      className={['dg-fieldmenu--layer', className].filter(Boolean).join(' ')}
      data-placement={placement?.above ? 'above' : 'below'}
      style={{
        top: placement?.top ?? 0,
        left: placement?.left ?? 0,
        width: placement?.width,
        maxHeight: placement?.maxHeight,
        // Dokud není změřeno, nabídka se nekreslí — ať nebliká u levého kraje.
        visibility: placement == null ? 'hidden' : undefined,
        ...style,
      }}
    />,
    document.body,
  )
}
