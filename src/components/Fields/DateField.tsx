import { useEffect, useId, useRef, useState } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { FieldShell } from './FieldShell'
import { Popover } from '../Overlays/Popover'
import { Calendar } from '../Calendar/Calendar'
import { IconCalendar } from '../Icons/IconCalendar'
import { formatCzDate, parseCzDate, startOfMonth, toIsoDate } from './dateText'

export interface DateFieldProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children'> {
  label?: ReactNode
  required?: boolean
  help?: ReactNode
  error?: ReactNode
  disabled?: boolean
  /** Řízená hodnota. Bez ní si pole drží vlastní (viz `defaultValue`). */
  value?: Date | null
  /** Výchozí hodnota neřízeného pole; její změna pole srovná (reset formuláře). */
  defaultValue?: Date | null
  onValueChange?: (value: Date | null) => void
  /** Jméno skrytého pole — s ním se datum odesílá ve formuláři jako `yyyy-mm-dd`. */
  name?: string
  placeholder?: string
  /** Den, který nejde vybrat (uzavřené období, budoucnost). */
  disabledDay?: (day: Date) => boolean
  /** Id vstupu; popisek na něj ukazuje. */
  id?: string
  /** Třída obalu; `className` míří na samotný vstup. */
  wrapperClassName?: string
  inputRef?: Ref<HTMLInputElement>
}

/**
 * Pole s datem — textové pole s hodnotou „14. 9. 2026" a kalendářem
 * v popoveru. Nahrazuje nativní `<input type="date">`, který v každém
 * prohlížeči vypadá jinak a v návrhu darkglass neexistuje.
 *
 * Datum jde **napsat rukou** (obsluha to dělá rychleji než klikáním), takže
 * vstup není jen na čtení: co se do něj napíše, se při odchodu z pole nebo
 * Enterem převede na datum; nesmysl se zahodí a zůstane předchozí hodnota.
 * Kalendář se otevře tlačítkem, Enterem, mezerou i šipkou dolů z pole a zavře
 * Escapem nebo vybraným dnem.
 */
export function DateField({
  label,
  required,
  help,
  error,
  disabled = false,
  value,
  defaultValue = null,
  onValueChange,
  name,
  placeholder = 'd. m. rrrr',
  disabledDay,
  id,
  className,
  wrapperClassName,
  inputRef,
  ...rest
}: DateFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const note = error ?? help
  const noteId = note != null ? `${inputId}-note` : undefined

  const [ownValue, setOwnValue] = useState<Date | null>(defaultValue)
  const lastDefault = useRef<number | null>(defaultValue?.getTime() ?? null)
  const current = value !== undefined ? value : ownValue

  /* Změna serverové výchozí hodnoty srovná i neřízené pole — React 19 po
     doběhnutí server action formulář resetuje a bez tohohle by v poli zůstala
     stará hodnota (stejná past jako u selectu, task #387). */
  useEffect(() => {
    const next = defaultValue?.getTime() ?? null
    if (next === lastDefault.current) return
    lastDefault.current = next
    if (value === undefined) setOwnValue(defaultValue ?? null)
  }, [defaultValue, value])

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<string | null>(null)
  const [month, setMonth] = useState<Date | null>(null)
  const input = useRef<HTMLInputElement | null>(null)

  const shownMonth = month ?? startOfMonth(current ?? new Date())
  const shownText = draft ?? (current != null ? formatCzDate(current) : '')

  function commit(next: Date | null) {
    if (value === undefined) setOwnValue(next)
    onValueChange?.(next)
  }

  function commitText() {
    if (draft == null) return
    const trimmed = draft.trim()
    setDraft(null)
    if (trimmed === '') {
      if (current != null) commit(null)
      return
    }
    const parsed = parseCzDate(trimmed, shownMonth.getFullYear())
    if (parsed != null) {
      commit(parsed)
      setMonth(startOfMonth(parsed))
    }
  }

  function openPopover() {
    if (disabled) return
    setMonth(startOfMonth(current ?? new Date()))
    setOpen(true)
  }

  return (
    <FieldShell
      label={label}
      required={required}
      help={help}
      error={error}
      disabled={disabled}
      htmlFor={inputId}
      noteId={noteId}
      className={['dg-field--popover', 'dg-datefield', wrapperClassName].filter(Boolean).join(' ')}
      {...rest}
    >
      <div
        className={['dg-field__box', error != null ? 'dg-field__box--error' : null]
          .filter(Boolean)
          .join(' ')}
      >
        <input
          ref={(node) => {
            input.current = node
            if (typeof inputRef === 'function') inputRef(node)
            else if (inputRef != null && typeof inputRef === 'object') {
              ;(inputRef as { current: HTMLInputElement | null }).current = node
            }
          }}
          id={inputId}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className={['dg-textfield__input', className].filter(Boolean).join(' ')}
          value={shownText}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error != null ? true : undefined}
          aria-describedby={noteId}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitText}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              // Enter potvrzuje napsané datum, neodesílá formulář: hodnota se do
              // skrytého pole dostane až dalším vykreslením, takže odeslání ve
              // stejném stisku by poslalo tu předchozí (task #699).
              event.preventDefault()
              commitText()
              setOpen(false)
              return
            }
            if (event.key === 'ArrowDown' || (event.altKey && event.key === 'ArrowDown')) {
              event.preventDefault()
              openPopover()
            }
          }}
        />
        <button
          type="button"
          className="dg-field__button"
          disabled={disabled}
          aria-label={open ? 'Zavřít kalendář' : 'Otevřít kalendář'}
          aria-expanded={open}
          onClick={() => (open ? setOpen(false) : openPopover())}
        >
          <IconCalendar size={18} />
        </button>
      </div>
      {name != null ? (
        <input type="hidden" name={name} value={current != null ? toIsoDate(current) : ''} />
      ) : null}
      <Popover
        open={open}
        onClose={() => {
          setOpen(false)
          input.current?.focus()
        }}
      >
        <Calendar
          month={shownMonth}
          selected={current ?? null}
          disabledDay={disabledDay}
          onPrevMonth={() => setMonth(new Date(shownMonth.getFullYear(), shownMonth.getMonth() - 1, 1))}
          onNextMonth={() => setMonth(new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 1))}
          onSelectDay={(day) => {
            setDraft(null)
            commit(day)
            setMonth(startOfMonth(day))
            setOpen(false)
            input.current?.focus()
          }}
        />
      </Popover>
    </FieldShell>
  )
}
