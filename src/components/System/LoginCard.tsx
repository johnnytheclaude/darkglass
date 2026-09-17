import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { Divider } from './Divider'

export interface LoginCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Nadpis karty („Přihlaste se“). */
  title: ReactNode
  /** Značka nad nadpisem — iniciála firmy nebo logo. */
  mark?: ReactNode
  /** Řádek nad nadpisem — čí je to přihlášení (název firmy). */
  eyebrow?: ReactNode
  /** Tichá věta pod obsahem karty — pravidlo, které má obsluha vědět předem. */
  hint?: ReactNode
  /** Pole formuláře (e-mail, heslo) — komponenty § Textová pole. */
  children?: ReactNode
  /** Hlavní tlačítko přes celou šířku. */
  submit?: ReactNode
  /** Druhá cesta dovnitř (firemní účet); vykreslí se pod oddělovačem. */
  alternative?: ReactNode
  /** Popisek oddělovače mezi tlačítky. */
  dividerLabel?: ReactNode
  /**
   * Zarovnání obsahu karty. `start` je výchozí (přihlášení s poli formuláře),
   * `center` kreslí kartu na střed — značka, nadpis i klávesnice pod sebou
   * na ose, jak to má zamčená obrazovka Pokladny.
   */
  align?: 'start' | 'center'
  ref?: Ref<HTMLDivElement>
}

/**
 * Login Card — přihlašovací karta. Hlavní cesta je vždy jedna a je nejvýš;
 * alternativa (SSO) stojí až pod oddělovačem, aby si ji nikdo nespletl.
 */
export function LoginCard({
  title,
  mark,
  eyebrow,
  hint,
  children,
  submit,
  alternative,
  dividerLabel = 'nebo',
  align = 'start',
  className,
  ...rest
}: LoginCardProps) {
  return (
    <div
      className={['dg-login-card', align === 'center' ? 'dg-login-card--center' : null, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {mark != null ? <span className="dg-login-card__mark">{mark}</span> : null}
      {eyebrow != null ? <span className="dg-login-card__eyebrow">{eyebrow}</span> : null}
      <div className="dg-login-card__title">{title}</div>
      {children != null ? <div className="dg-login-card__fields">{children}</div> : null}
      {submit != null ? <div className="dg-login-card__submit">{submit}</div> : null}
      {alternative != null ? (
        <>
          <Divider label={dividerLabel} />
          <div className="dg-login-card__alt">{alternative}</div>
        </>
      ) : null}
      {hint != null ? <span className="dg-login-card__hint">{hint}</span> : null}
    </div>
  )
}
