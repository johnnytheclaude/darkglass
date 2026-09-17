import { useEffect, useId, useRef, useState } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { FieldShell } from './FieldShell'
import { Popover } from '../Overlays/Popover'
import { TimePicker } from '../Calendar/TimePicker'
import { IconClock } from '../Icons/IconClock'
import { parseTime, timeOptions } from './dateText'

export interface TimeFieldProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children'> {
  label?: ReactNode
  required?: boolean
  help?: ReactNode
  error?: ReactNode
  disabled?: boolean
  /** Řízená hodnota „hh:mm". Bez ní si pole drží vlastní. */
  value?: string | null
  /** Výchozí hodnota neřízeného pole; její změna pole srovná (reset formuláře). */
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  /** Jméno pole — s ním se čas odesílá ve formuláři jako „hh:mm". */
  name?: string
  placeholder?: string
  /** Krok seznamu v popoveru v minutách (výchozí 15). */
  step?: number
  /** Od kdy a dokud seznam sahá — provozní doba, ne celý den. */
  from?: string
  to?: string
  /** Čas, který nejde vybrat (obsazený termín, zavřeno). */
  disabledOption?: (value: string) => boolean
  id?: string
  wrapperClassName?: string
  inputRef?: Ref<HTMLInputElement>
}

/**
 * Pole s časem — textové pole „08:30" a seznam časů v popoveru. Nahrazuje
 * nativní `<input type="time">` s kolečky prohlížeče.
 *
 * Čas jde napsat rukou včetně zkratek: „8" je 08:00, „830" i „8.30" je 08:30.
 * Seznam se otevře tlačítkem nebo šipkou dolů, zavře Escapem nebo výběrem.
 */
export function TimeField({
  label,
  required,
  help,
  error,
  disabled = false,
  value,
  defaultValue = null,
  onValueChange,
  name,
  placeholder = 'hh:mm',
  step = 15,
  from = '00:00',
  to = '23:59',
  disabledOption,
  id,
  className,
  wrapperClassName,
  inputRef,
  ...rest
}: TimeFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const note = error ?? help
  const noteId = note != null ? `${inputId}-note` : undefined

  const [ownValue, setOwnValue] = useState<string | null>(defaultValue)
  const lastDefault = useRef<string | null>(defaultValue ?? null)
  const current = value !== undefined ? value : ownValue

  /* Viz DateField: po doběhnutí server action se pole srovná podle serveru. */
  useEffect(() => {
    const next = defaultValue ?? null
    if (next === lastDefault.current) return
    lastDefault.current = next
    if (value === undefined) setOwnValue(next)
  }, [defaultValue, value])

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<string | null>(null)
  const input = useRef<HTMLInputElement | null>(null)

  const shownText = draft ?? current ?? ''

  function commit(next: string | null) {
    if (value === undefined) setOwnValue(next)
    onValueChange?.(next)
  }

  function commitText() {
    if (draft == null) return
    const trimmed = draft.trim()
    setDraft(null)
    if (trimmed === '') {
      if (current != null && current !== '') commit(null)
      return
    }
    const parsed = parseTime(trimmed)
    if (parsed != null) commit(parsed)
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
      className={['dg-field--popover', 'dg-timefield', wrapperClassName].filter(Boolean).join(' ')}
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
              commitText()
              setOpen(false)
              return
            }
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              if (!disabled) setOpen(true)
            }
          }}
        />
        <button
          type="button"
          className="dg-field__button"
          disabled={disabled}
          aria-label={open ? 'Zavřít seznam časů' : 'Otevřít seznam časů'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <IconClock size={18} />
        </button>
      </div>
      {name != null ? <input type="hidden" name={name} value={current ?? ''} /> : null}
      <Popover
        open={open}
        onClose={() => {
          setOpen(false)
          input.current?.focus()
        }}
        className="dg-timefield__popover"
      >
        <TimePicker
          options={timeOptions(step, from, to)}
          value={current ?? null}
          disabledOption={disabledOption}
          onChange={(next) => {
            setDraft(null)
            commit(next)
            setOpen(false)
            input.current?.focus()
          }}
        />
      </Popover>
    </FieldShell>
  )
}
