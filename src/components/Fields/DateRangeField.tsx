import { useId, useRef, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { FieldShell } from './FieldShell'
import { Popover } from '../Overlays/Popover'
import { Calendar } from '../Calendar/Calendar'
import { DatePresets } from '../Calendar/DatePresets'
import type { DatePresetOption } from '../Calendar/DatePresets'
import { IconCalendar } from '../Icons/IconCalendar'
import { formatCzDate, parseCzDate, startOfMonth, toIsoDate } from './dateText'

export interface DateRange {
  from: Date | null
  to: Date | null
}

export interface DateRangeFieldProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children'> {
  label?: ReactNode
  required?: boolean
  help?: ReactNode
  error?: ReactNode
  disabled?: boolean
  /** Rozsah Od–Do; `null` znamená „neomezeno". */
  value: DateRange
  onValueChange?: (value: DateRange) => void
  /** Jména skrytých polí — s nimi se rozsah odesílá jako `yyyy-mm-dd`. */
  fromName?: string
  toName?: string
  /** Rychlé volby vlevo v popoveru (Dnes, Posledních 7 dní…). */
  presets?: DatePresetOption[]
  /** Klíč zvolené rychlé volby. */
  presetValue?: string | null
  /** Rozsah k volbě dopočítá aplikace — knihovna nezná období produktu. */
  onPresetChange?: (key: string) => void
  disabledDay?: (day: Date) => boolean
  placeholderFrom?: string
  placeholderTo?: string
  wrapperClassName?: string
}

/**
 * Pole s obdobím Od–Do — dva textové vstupy v jednom rámu a popover
 * s rychlými volbami a kalendářem v režimu rozsahu. Používají ho Reporty,
 * Doklady, Vouchery a vyúčtování komise, které do té doby měly dva nativní
 * `<input type="date">` vedle sebe.
 *
 * Rozsah je vždy řízený: kdo ho drží (adresa, filtr, formulář), ten ho i
 * mění — tohle pole nemá vlastní stav hodnoty, jen otevřenost popoveru.
 * Rychlé volby počítá aplikace: „Posledních 7 dní" je otázka provozního dne
 * a uzávěrky, ne kreslení.
 */
export function DateRangeField({
  label,
  required,
  help,
  error,
  disabled = false,
  value,
  onValueChange,
  fromName,
  toName,
  presets,
  presetValue,
  onPresetChange,
  disabledDay,
  placeholderFrom = 'od',
  placeholderTo = 'do',
  className,
  wrapperClassName,
  ...rest
}: DateRangeFieldProps) {
  const groupId = useId()
  const note = error ?? help
  const noteId = note != null ? `${groupId}-note` : undefined

  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState<Date | null>(null)
  const [draft, setDraft] = useState<{ side: 'from' | 'to'; text: string } | null>(null)
  const firstInput = useRef<HTMLInputElement | null>(null)

  const shownMonth = month ?? startOfMonth(value.from ?? value.to ?? new Date())

  function text(side: 'from' | 'to') {
    if (draft?.side === side) return draft.text
    const day = side === 'from' ? value.from : value.to
    return day != null ? formatCzDate(day) : ''
  }

  function commitText(side: 'from' | 'to') {
    if (draft?.side !== side) return
    const trimmed = draft.text.trim()
    setDraft(null)
    if (trimmed === '') {
      onValueChange?.({ ...value, [side]: null })
      return
    }
    const parsed = parseCzDate(trimmed, shownMonth.getFullYear())
    if (parsed == null) return
    const next: DateRange = { ...value, [side]: parsed }
    // Napsané „od" po „do" (nebo naopak) rozsah prohodí, ať nikdy nevznikne
    // období pozpátku, ze kterého report spočítá nulu.
    if (next.from != null && next.to != null && next.from.getTime() > next.to.getTime()) {
      onValueChange?.({ from: next.to, to: next.from })
      return
    }
    onValueChange?.(next)
    setMonth(startOfMonth(parsed))
  }

  function pickDay(day: Date) {
    if (value.from == null || value.to != null) {
      onValueChange?.({ from: day, to: null })
      return
    }
    if (day.getTime() < value.from.getTime()) {
      onValueChange?.({ from: day, to: value.from })
      setOpen(false)
      return
    }
    onValueChange?.({ from: value.from, to: day })
    setOpen(false)
  }

  const inputClass = ['dg-daterange__input', className].filter(Boolean).join(' ')

  return (
    <FieldShell
      label={label}
      required={required}
      help={help}
      error={error}
      disabled={disabled}
      labelId={`${groupId}-label`}
      noteId={noteId}
      className={['dg-field--popover', 'dg-daterange', wrapperClassName].filter(Boolean).join(' ')}
      {...rest}
    >
      <div
        className={['dg-field__box', error != null ? 'dg-field__box--error' : null]
          .filter(Boolean)
          .join(' ')}
        role="group"
        aria-labelledby={label != null ? `${groupId}-label` : undefined}
        aria-describedby={noteId}
      >
        <input
          ref={firstInput}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className={inputClass}
          value={text('from')}
          placeholder={placeholderFrom}
          disabled={disabled}
          aria-label="Od"
          onChange={(event) => setDraft({ side: 'from', text: event.target.value })}
          onBlur={() => commitText('from')}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              commitText('from')
              setOpen(false)
            }
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              if (!disabled) setOpen(true)
            }
          }}
        />
        <span className="dg-daterange__dash" aria-hidden="true">
          –
        </span>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className={inputClass}
          value={text('to')}
          placeholder={placeholderTo}
          disabled={disabled}
          aria-label="Do"
          onChange={(event) => setDraft({ side: 'to', text: event.target.value })}
          onBlur={() => commitText('to')}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              commitText('to')
              setOpen(false)
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
          aria-label={open ? 'Zavřít kalendář' : 'Otevřít kalendář'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <IconCalendar size={18} />
        </button>
      </div>
      {fromName != null ? (
        <input type="hidden" name={fromName} value={value.from != null ? toIsoDate(value.from) : ''} />
      ) : null}
      {toName != null ? (
        <input type="hidden" name={toName} value={value.to != null ? toIsoDate(value.to) : ''} />
      ) : null}
      <Popover
        open={open}
        onClose={() => {
          setOpen(false)
          firstInput.current?.focus()
        }}
        className="dg-daterange__popover"
      >
        {presets != null && presets.length > 0 ? (
          <DatePresets
            options={presets}
            value={presetValue ?? null}
            onChange={(key) => {
              onPresetChange?.(key)
              setOpen(false)
              firstInput.current?.focus()
            }}
            className="dg-daterange__presets"
          />
        ) : null}
        <Calendar
          mode="range"
          month={shownMonth}
          rangeFrom={value.from ?? null}
          rangeTo={value.to ?? null}
          disabledDay={disabledDay}
          onPrevMonth={() => setMonth(new Date(shownMonth.getFullYear(), shownMonth.getMonth() - 1, 1))}
          onNextMonth={() => setMonth(new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 1))}
          onSelectDay={pickDay}
        />
      </Popover>
    </FieldShell>
  )
}
