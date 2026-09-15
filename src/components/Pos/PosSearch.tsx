import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export interface PosSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Klávesová zkratka vpravo („F3“) — na Pokladně je vždy vidět. */
  shortcut?: ReactNode
  /** Ikona před polem (lupa, čtečka). */
  icon?: ReactNode
  /** Třída obalu; `className` míří na samotné pole. */
  wrapperClassName?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * POS Search — hledání zboží nad košíkem.
 * Vysoké 62 px kvůli obsluze prstem; zkratka zůstává čitelná i s dlouhým textem.
 */
export function PosSearch({ shortcut, icon, wrapperClassName, className, ...rest }: PosSearchProps) {
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
        {...rest}
      />
      {shortcut != null ? <kbd className="dg-pos-search__key">{shortcut}</kbd> : null}
    </div>
  )
}
