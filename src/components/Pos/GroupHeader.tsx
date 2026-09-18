import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconChevronRight } from '../Icons/IconChevronRight'

export interface GroupHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Název skupiny („NEPÍPNUTÉ“) — vykreslí se verzálkami. */
  label: ReactNode
  /** Počet položek ve skupině; zobrazí se v závorce. */
  count?: number
  /**
   * Rozbalitelná skupina: `true` rozbalená, `false` sbalená. Bez hodnoty je
   * hlavička jen mezitulek a nic nerozbaluje.
   */
  expanded?: boolean
  /**
   * Klik (i Enter/mezerník) na hlavičce — dostane stav, do kterého se skupina
   * překlápí. S ním je hlavička tlačítko, takže jde obsloužit klávesnicí.
   */
  onExpandedChange?: (expanded: boolean) => void
  /**
   * Ladění hlavičky — skupina, ve které je nedodělek (`warn`) nebo chyba
   * (`danger`). Sbalená skupina jinak svoje varování schová a obsluha ho
   * nenajde; podklad nese jen zvýraznění, co se děje musí říct i `note`.
   */
  tone?: 'warn' | 'danger' | 'info'
  /** Doplněk na pravé straně — čím se skupina liší (počet kusů, varování). */
  note?: ReactNode
  ref?: Ref<HTMLElement>
}

/**
 * Table / Group Header — mezitulek uvnitř dlouhého seznamu nebo tabulky.
 * Nemá rádius: navazuje na řádky pod sebou a odděluje je bez další linky.
 * S `onExpandedChange` je z něj přepínač, kterým se skupina rozbaluje a sbaluje.
 */
export function GroupHeader({
  label,
  count,
  expanded,
  onExpandedChange,
  tone,
  note,
  className,
  ref,
  ...rest
}: GroupHeaderProps) {
  const open = expanded === true
  const classes = [
    'dg-group-header',
    tone ? `dg-group-header--${tone}` : null,
    onExpandedChange ? 'dg-group-header--toggle' : null,
    onExpandedChange && open ? 'is-expanded' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const body = (
    <>
      {onExpandedChange ? <IconChevronRight size={14} className="dg-group-header__chevron" /> : null}
      <span className="dg-group-header__label">{label}</span>
      {count != null ? <span className="dg-group-header__count">({count})</span> : null}
      {note != null ? <span className="dg-group-header__note">{note}</span> : null}
    </>
  )

  if (!onExpandedChange) {
    return (
      <div className={classes} ref={ref as Ref<HTMLDivElement> | undefined} {...rest}>
        {body}
      </div>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      aria-expanded={open}
      onClick={() => onExpandedChange(!open)}
      ref={ref as Ref<HTMLButtonElement> | undefined}
      {...rest}
    >
      {body}
    </button>
  )
}
