import { useRef } from 'react'
import type { InputHTMLAttributes, KeyboardEvent, ReactNode, Ref } from 'react'

export interface PosSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Klávesová zkratka vpravo („F3“) — na Pokladně je vždy vidět. */
  shortcut?: ReactNode
  /** Ikona před polem (lupa, čtečka). Návrh knihovny ji nemá, obrazovka prodeje ano. */
  icon?: ReactNode
  /**
   * Přišel kód ze čtečky — znaky dorazily rychleji, než stihne psát člověk,
   * a skončily Enterem. Aplikace na to reaguje přidáním zboží, ne hledáním.
   */
  onScan?: (code: string) => void
  /** Člověk dopsal dotaz a potvrdil ho Enterem. */
  onSubmitText?: (text: string) => void
  /** Nejdelší mezera mezi znaky, která se ještě považuje za čtečku (ms). */
  scanGapMs?: number
  /** Kratší kód než tohle se nikdy nepovažuje za sken. */
  scanMinLength?: number
  /** Třída obalu; `className` míří na samotné pole. */
  wrapperClassName?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * POS Search — hledání zboží nad košíkem. Vysoké 62 px kvůli obsluze prstem;
 * zkratka zůstává čitelná i s dlouhým textem.
 *
 * Píše do něj člověk i čtečka. Zaostřené pole sken **nepotlačuje tím, že by
 * ho zahodilo** — naopak: znaky ze čtečky jdou do pole a komponenta je od
 * psaní člověka odliší rychlostí (celá sekvence rychleji než `scanGapMs` na
 * znak a zakončená Enterem = `onScan`, jinak `onSubmitText`). Globální
 * odchytávač čtečky v aplikaci pozná zaostřené pole podle `data-dg-scan`
 * na prvku a nesmí si stejné znaky vzít podruhé.
 */
export function PosSearch({
  shortcut,
  icon,
  onScan,
  onSubmitText,
  scanGapMs = 40,
  scanMinLength = 4,
  wrapperClassName,
  className,
  onKeyDown,
  value,
  'aria-label': ariaLabel = 'Hledat',
  ...rest
}: PosSearchProps) {
  /** Kolik znaků v řadě dorazilo rychleji než práh, a kdy přišel poslední. */
  const rychle = useRef(0)
  const naposled = useRef(0)

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const ted = Date.now()

    if (event.key.length === 1) {
      rychle.current = ted - naposled.current <= scanGapMs ? rychle.current + 1 : 1
      naposled.current = ted
    } else if (event.key === 'Enter') {
      const pole = event.currentTarget
      const text = pole.value
      // Poslední znak před Enterem se počítá taky — proto stačí délka - 1 mezer.
      const zeCtecky =
        text.length >= scanMinLength &&
        rychle.current >= text.length &&
        ted - naposled.current <= scanGapMs

      rychle.current = 0
      naposled.current = 0

      if (zeCtecky && onScan) {
        event.preventDefault()
        onScan(text)
        // Řízené pole čistí aplikace; neřízené si uklidíme sami, ať je
        // pokladní hned připravená na další pípnutí.
        if (value === undefined) pole.value = ''
      } else if (onSubmitText) {
        event.preventDefault()
        onSubmitText(text)
      }
    } else if (event.key !== 'Shift') {
      rychle.current = 0
    }

    onKeyDown?.(event)
  }

  return (
    <div className={['dg-pos-search', wrapperClassName].filter(Boolean).join(' ')}>
      {icon ? (
        <span className="dg-pos-search__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <input
        type="search"
        className={['dg-pos-search__input', className].filter(Boolean).join(' ')}
        aria-label={ariaLabel}
        data-dg-scan="field"
        value={value}
        onKeyDown={handleKeyDown}
        {...rest}
      />
      {shortcut != null ? <kbd className="dg-pos-search__key">{shortcut}</kbd> : null}
    </div>
  )
}
