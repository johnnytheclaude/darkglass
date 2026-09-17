import { useEffect, useId, useRef, useState } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { FieldShell } from './FieldShell'
import { FieldMenu } from './FieldMenu'
import type { FieldMenuOption } from './FieldMenu'
import { useEscapeClose } from '../Overlays/useEscapeClose'
import { IconChevronDown } from '../Icons/IconChevronDown'

export interface SelectFieldProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect' | 'defaultValue'> {
  label?: ReactNode
  required?: boolean
  help?: ReactNode
  error?: ReactNode
  disabled?: boolean
  options: FieldMenuOption[]
  /** Vybraná hodnota; bez ní se ukáže `placeholder`. Řízený režim. */
  value?: string
  /** Výchozí hodnota neřízeného výběru; její změna výběr srovná. */
  defaultValue?: string
  /**
   * Jméno pole — s ním výběr odesílá hodnotu ve formuláři (skryté pole), takže
   * je to plná náhrada nativního `<select name>` i v serverové akci.
   */
  name?: string
  placeholder?: ReactNode
  onValueChange?: (value: string) => void
  /** Rozbalení zvenčí (ukázka, řízený formulář). Bez něj si ho drží sama. */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  ref?: Ref<HTMLDivElement>
}

/**
 * Rozbalovací výběr — zavřený je to pole se šipkou, rozbalený má pod sebou
 * nabídku. Nabídka je v toku dokumentu (ne v portálu), takže v ukázce i ve
 * formuláři sedí přesně pod polem a nikam neuteče při odrolování.
 *
 * Je to náhrada nativního `<select>` i tam, kde se formulář odesílá serverové
 * akci: s `name` vedle sebe drží skryté pole s hodnotou. Neřízený režim
 * (`defaultValue` bez `value`) navíc hodnotu srovná, jakmile se serverová
 * výchozí hodnota změní — React 19 po doběhnutí akce formulář resetuje a bez
 * tohohle by v poli zůstala stará volba (task #387).
 *
 * Klávesnice: Enter, mezera i šipky nabídku otevřou, šipky v ní chodí,
 * Enter vybere, Escape zavře.
 */
export function SelectField({
  label,
  required,
  help,
  error,
  disabled = false,
  options,
  value,
  defaultValue,
  name,
  placeholder = 'Vyberte…',
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  ...rest
}: SelectFieldProps) {
  const [ownOpen, setOwnOpen] = useState(defaultOpen)
  const isOpen = open ?? ownOpen
  const buttonId = useId()

  const [ownValue, setOwnValue] = useState(defaultValue ?? '')
  const lastDefault = useRef(defaultValue)
  const current = value !== undefined ? value : ownValue
  const selected = options.find((option) => option.value === current)

  useEffect(() => {
    if (defaultValue === lastDefault.current) return
    lastDefault.current = defaultValue
    if (value === undefined) setOwnValue(defaultValue ?? '')
  }, [defaultValue, value])

  const setOpen = (next: boolean) => {
    if (open === undefined) setOwnOpen(next)
    onOpenChange?.(next)
  }

  useEscapeClose(() => setOpen(false), isOpen)

  /** Položka pod klávesnicí. Zavřená nabídka aktivní položku nemá. */
  const [active, setActive] = useState<string | null>(null)
  const usable = options.filter((option) => !option.disabled)

  function openMenu() {
    setActive(current !== '' ? current : (usable[0]?.value ?? null))
    setOpen(true)
  }

  function choose(next: string) {
    if (value === undefined) setOwnValue(next)
    onValueChange?.(next)
    setOpen(false)
  }

  function move(delta: number) {
    if (usable.length === 0) return
    const at = usable.findIndex((option) => option.value === (active ?? current))
    const next = at === -1 ? 0 : Math.min(Math.max(at + delta, 0), usable.length - 1)
    setActive(usable[next]!.value)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        openMenu()
      }
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      move(1)
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      move(-1)
      return
    }
    if (event.key === 'Home') {
      event.preventDefault()
      if (usable[0]) setActive(usable[0].value)
      return
    }
    if (event.key === 'End') {
      event.preventDefault()
      const last = usable[usable.length - 1]
      if (last) setActive(last.value)
      return
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (active != null) choose(active)
      else setOpen(false)
      return
    }
    if (event.key === 'Tab') setOpen(false)
  }

  return (
    <FieldShell
      label={label}
      required={required}
      help={help}
      error={error}
      disabled={disabled}
      htmlFor={buttonId}
      className={['dg-select', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <button
        type="button"
        id={buttonId}
        className={[
          'dg-field__box',
          'dg-select__box',
          error != null ? 'dg-field__box--error' : null,
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={error != null ? true : undefined}
        onClick={() => (isOpen ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
      >
        <span className={selected ? 'dg-select__value' : 'dg-select__value is-placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="dg-field__trailing" aria-hidden="true">
          <IconChevronDown size={18} />
        </span>
      </button>
      {name != null ? <input type="hidden" name={name} value={current} /> : null}
      {isOpen ? (
        <FieldMenu
          options={options}
          value={current}
          activeValue={active ?? undefined}
          aria-labelledby={buttonId}
          onSelect={choose}
        />
      ) : null}
    </FieldShell>
  )
}
