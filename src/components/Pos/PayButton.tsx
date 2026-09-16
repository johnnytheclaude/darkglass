import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'

/**
 * Hlavní akce prodejní obrazovky — „Zaplatit · F2" (§ Pokladna · prodej,
 * artboardy 01 a 02). Je to největší cíl na obrazovce: 88 px na výšku, aby
 * se trefil prstem i pohledem ze dvou metrů.
 *
 * Neaktivní stav není jen ztlumené tlačítko — návrh mu bere výplň akcentu,
 * takže prázdný účet nevypadá jako připravená platba.
 */
export interface PayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Popisek akce, typicky včetně zkratky („Zaplatit · F2"). */
  label: ReactNode
  /** Ikona před popiskem. */
  iconStart?: ReactNode
  /**
   * Nižší varianta 76 px s popiskem 20 px (artboard Pokladna 18 — vratka).
   * Obrazovka, kde hlavní akce stojí v kartě souhrnu vedle dvou vedlejších
   * tlačítek, ji má v návrhu o dvanáct pixelů nižší než prodejní „Zaplatit".
   */
  compact?: boolean
  ref?: Ref<HTMLButtonElement>
}

export function PayButton({
  label,
  iconStart,
  compact = false,
  type = 'button',
  className,
  ...rest
}: PayButtonProps) {
  return (
    <button
      type={type}
      className={['dg-pay-button', compact ? 'dg-pay-button--compact' : null, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {iconStart != null ? (
        <span className="dg-pay-button__icon" aria-hidden="true">
          {iconStart}
        </span>
      ) : null}
      <span className="dg-pay-button__label">{label}</span>
    </button>
  )
}
