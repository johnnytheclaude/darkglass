import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type StatusLineTone = 'ok' | 'warning' | 'danger' | 'neutral'

export interface StatusLine {
  key: string
  /** Co se hlásí („Tiskárna účtenek“). */
  label: ReactNode
  /** Stav („dostupná“, „2 čekají“). */
  value: ReactNode
  /** Barva stavu; výchozí je ztlumená. */
  tone?: StatusLineTone
  /** Text akce za stavem („zkušební tisk“). */
  action?: ReactNode
  /** Kliknutí na akci; bez něj se akce vykreslí jako text. */
  onAction?: () => void
}

export interface StatusListProps extends HTMLAttributes<HTMLDivElement> {
  /** Řádky stavu pokladny — tiskárna, fronta, terminál, spojení. */
  lines: StatusLine[]
  ref?: Ref<HTMLDivElement>
}

/**
 * Row / Stav — výpis stavu zařízení pokladny v menu nebo v nastavení.
 * Stav je barevný, akce vedle něj modrá; obojí zůstává na jednom řádku.
 */
export function StatusList({ lines, className, ...rest }: StatusListProps) {
  return (
    <div className={['dg-status-list', className].filter(Boolean).join(' ')} {...rest}>
      {lines.map((line) => (
        <div key={line.key} className="dg-status-list__row">
          <span className="dg-status-list__label">{line.label}</span>
          <span className={`dg-status-list__value dg-status-list__value--${line.tone ?? 'neutral'}`}>
            {line.value}
          </span>
          {line.action != null ? (
            line.onAction ? (
              <button type="button" className="dg-status-list__action" onClick={line.onAction}>
                {line.action}
              </button>
            ) : (
              <span className="dg-status-list__action-text">{line.action}</span>
            )
          ) : null}
        </div>
      ))}
    </div>
  )
}
