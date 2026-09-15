import { useCallback, useEffect, useRef, useState } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type NumpadVariant = 'payment' | 'pin'

export interface NumpadProps extends HTMLAttributes<HTMLDivElement> {
  /** `payment` = klávesy 120 px se `00`, `pin` = 88 px s prázdným místem. */
  variant?: NumpadVariant
  /** Stisk číslice (i z fyzické klávesnice). */
  onDigit?: (digit: string) => void
  /** Mazání poslední číslice (klávesa Smazat, Backspace i Delete). */
  onDelete?: () => void
  /** Popisek mazací klávesy; návrh má „Smazat“. */
  deleteLabel?: ReactNode
  /**
   * Poslouchat fyzickou klávesnici. Obsluha píše na pokladně častěji
   * klávesnicí než prstem, takže je to zapnuté; vypni to, když je na
   * obrazovce numpadů víc a psát má jen jeden.
   */
  keyboard?: boolean
  disabled?: boolean
  ref?: Ref<HTMLDivElement>
}

const DELETE = 'delete'
const EMPTY = 'empty'

const ROWS: Record<NumpadVariant, string[][]> = {
  payment: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['00', '0', DELETE],
  ],
  pin: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    [EMPTY, '0', DELETE],
  ],
}

/** Pole, do kterého se píše text — tomu patří i číslice z fyzické klávesnice. */
const PSACI_TYPY = [
  'text',
  'search',
  'number',
  'tel',
  'password',
  'email',
  'url',
  'date',
  'time',
]

function jePoleProPsani(target: EventTarget | null) {
  const prvek = target as HTMLElement | null
  if (!prvek) return false
  if (prvek.isContentEditable) return true
  if (prvek.tagName === 'TEXTAREA' || prvek.tagName === 'SELECT') return true
  if (prvek.tagName !== 'INPUT') return false

  const typ = (prvek as HTMLInputElement).type
  return PSACI_TYPY.includes(typ)
}

/**
 * Numerická klávesnice — § Pokladna · platba.
 * Ovládá se prstem i fyzickou klávesnickou: číslice píšou, Backspace a Delete
 * mažou. Zmáčknutá klávesa se na okamžik zvýrazní i při psaní klávesnicí, aby
 * obsluha viděla, že pokladna stisk přijala. Klávesy mají 120 px (platba),
 * resp. 88 × 80 px (PIN) — dotykový cíl je tedy nad konvenčními 44 px.
 */
export function Numpad({
  variant = 'payment',
  onDigit,
  onDelete,
  deleteLabel = 'Smazat',
  keyboard = true,
  disabled = false,
  className,
  ...rest
}: NumpadProps) {
  const [pressed, setPressed] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flash = useCallback((key: string) => {
    setPressed(key)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setPressed(null), 120)
  }, [])

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  useEffect(() => {
    if (!keyboard || disabled) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return

      // Píše-li obsluha do pole (hledání zboží, poznámka), klávesnice patří jemu.
      // Zaškrtávátko ani tlačítko pole není — z těch číslice do numpadu patří.
      if (jePoleProPsani(event.target)) return

      if (event.key >= '0' && event.key <= '9') {
        flash(event.key)
        onDigit?.(event.key)
        event.preventDefault()
      } else if (event.key === 'Backspace' || event.key === 'Delete') {
        flash(DELETE)
        onDelete?.()
        event.preventDefault()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [keyboard, disabled, flash, onDigit, onDelete])

  const classes = ['dg-numpad', `dg-numpad--${variant}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {ROWS[variant].map((row, index) => (
        <div key={index} className="dg-numpad__row">
          {row.map((key) => {
            if (key === EMPTY) {
              return <span key={key} className="dg-numpad__key dg-numpad__key--empty" aria-hidden="true" />
            }

            const isDelete = key === DELETE
            const keyClasses = [
              'dg-numpad__key',
              isDelete ? 'dg-numpad__key--delete' : null,
              pressed === key ? 'is-pressed' : null,
            ]
              .filter(Boolean)
              .join(' ')

            const onClick = () => {
              flash(key)
              if (isDelete) onDelete?.()
              else onDigit?.(key)
            }

            return (
              <button
                key={key}
                type="button"
                className={keyClasses}
                disabled={disabled}
                onClick={onClick}
              >
                {isDelete ? deleteLabel : key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
