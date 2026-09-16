import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export interface SegmentedFieldOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface SegmentedFieldProps
  extends Omit<InputHTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'size'> {
  /** Jméno pole ve formuláři — všechny volby ho sdílejí, jako u nativních přepínačů. */
  name: string
  /** Volby zleva doprava; návrh počítá se dvěma až čtyřmi. */
  options: SegmentedFieldOption[]
  /** Předvybraná hodnota. Prázdná = nevybráno. */
  defaultValue?: string | null
  /** Přes celou šířku — volby se rozdělí rovným dílem. */
  block?: boolean
  /** Popis skupiny pro čtečku („Zaokrouhlení hotovosti“). */
  label?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Segmentovaný přepínač jako pole formuláře — vypadá jako {@link SegmentedControl},
 * ale stojí na `input[type=radio]`, takže se odesílá se `<form>` a funguje
 * i bez JavaScriptu. To je rozdíl, kvůli kterému existuje: serverem vykreslené
 * nastavení nemá komu předat `onChange`.
 *
 * Hodnota se drží v DOM (neřízené pole). Má-li se přepínač po uložení srovnat
 * podle serveru, předá mu aplikace `key` s tou hodnotou — remount je jediné,
 * co React 19 u neřízeného pole spolehlivě přepíše.
 */
export function SegmentedField({
  name,
  options,
  defaultValue,
  block = false,
  label,
  className,
  ...rest
}: SegmentedFieldProps) {
  const classes = ['dg-segmented', 'dg-segmented-field', block && 'dg-segmented--block', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="radiogroup" aria-label={label} {...rest}>
      {options.map((option) => (
        <label key={option.value} className="dg-segmented-field__item">
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={option.value === defaultValue}
            disabled={option.disabled}
          />
          <span className="dg-segmented__item">{option.label}</span>
        </label>
      ))}
    </div>
  )
}
