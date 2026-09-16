import { useRef } from 'react'
import type { HTMLAttributes, KeyboardEvent, ReactNode, Ref } from 'react'

export interface SegmentedOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Volby zleva doprava; návrh počítá se dvěma až čtyřmi. */
  options: SegmentedOption[]
  value: string
  onChange?: (value: string) => void
  /** Přes celou šířku — volby se rozdělí rovným dílem. */
  block?: boolean
  /**
   * `touch` zvedne volbu na 44 px — přepínač na telefonu se mačká prstem
   * a 34 px z návrhu desktopu je pod dotykovým minimem.
   */
  size?: 'm' | 'touch'
  /** Popis skupiny pro čtečku („Období“). */
  label?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Segmentovaný přepínač (Souhrn/Detail, Dnes/Týden/Měsíc…). Nahrazuje většinu
 * nativních selectů, takže se musí ovládat i klávesnicí: je to skupina voleb
 * (`radiogroup`), do které se vstoupí jedním tabulátorem a pak se prochází
 * šipkami — vlevo/vpravo i nahoru/dolů, Home/End na kraje. Výběr jde za
 * ostřením jako u nativních přepínačů; neaktivní volby se přeskakují.
 */
export function SegmentedControl({
  options,
  value,
  onChange,
  block = false,
  size = 'm',
  label,
  className,
  onKeyDown,
  ...rest
}: SegmentedControlProps) {
  const itemsRef = useRef<Array<HTMLButtonElement | null>>([])

  const enabled = options
    .map((option, index) => ({ option, index }))
    .filter((item) => !item.option.disabled)

  const selectedIndex = options.findIndex((option) => option.value === value)
  /** Kam vede tabulátor, když žádná volba není vybraná — na první použitelnou. */
  const stopIndex = selectedIndex >= 0 ? selectedIndex : (enabled[0]?.index ?? -1)

  function prepni(cil: { option: SegmentedOption; index: number }) {
    onChange?.(cil.option.value)
    itemsRef.current[cil.index]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event)
    if (event.defaultPrevented || enabled.length === 0) return

    const zde = enabled.findIndex((item) => item.option.value === value)
    const odkud = zde >= 0 ? zde : 0
    let cil: { option: SegmentedOption; index: number } | undefined

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        cil = enabled[(odkud + 1) % enabled.length]
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        cil = enabled[(odkud - 1 + enabled.length) % enabled.length]
        break
      case 'Home':
        cil = enabled[0]
        break
      case 'End':
        cil = enabled[enabled.length - 1]
        break
      default:
        return
    }

    if (!cil) return
    event.preventDefault()
    prepni(cil)
  }

  return (
    <div
      className={[
        'dg-segmented',
        block ? 'dg-segmented--block' : null,
        size === 'touch' ? 'dg-segmented--touch' : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {options.map((option, index) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            ref={(el) => {
              itemsRef.current[index] = el
            }}
            type="button"
            className={['dg-segmented__item', selected ? 'is-selected' : null]
              .filter(Boolean)
              .join(' ')}
            role="radio"
            aria-checked={selected}
            tabIndex={index === stopIndex ? 0 : -1}
            disabled={option.disabled}
            onClick={() => onChange?.(option.value)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
