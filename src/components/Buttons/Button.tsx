import type { ButtonHTMLAttributes, ElementType, ReactNode, Ref } from 'react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'contrast'
  | 'danger'
  | 'dangerSoft'
  | 'warning'
  | 'success'
  | 'back'

export type ButtonSize = 's' | 'm' | 'l' | 'xl'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Varianta z návrhu (§ Tlačítka). */
  variant?: ButtonVariant
  /** Výška podle návrhu: s 34, m 42, l 52, xl 56 px (škáluje se přes --scale).
      Varianta `back` má vlastní geometrii z návrhu a velikost neřeší. */
  size?: ButtonSize
  /** Ikona před popiskem — komponenta z components/Icons. */
  iconStart?: ReactNode
  /** Ikona za popiskem. */
  iconEnd?: ReactNode
  /** Načítání: tlačítko je neaktivní, obsah se překryje a rozměr se nemění. */
  loading?: boolean
  /** Roztažení na šířku rodiče (Btn / Primary Full). */
  block?: boolean
  /**
   * Tlačítko, které někam vede (stažení souboru, odkaz na stránku), se kreslí
   * jako odkaz — `<button>` v `<a>` je neplatné HTML a čtečka z něj přečte
   * obojí. Vzhled se nemění.
   */
  href?: string
  /** Komponenta odkazu (např. `Link` z Next.js); bez ní obyčejné `<a>`. */
  linkAs?: ElementType
  /** Stažení místo otevření — platí jen s `href`. */
  download?: boolean
  ref?: Ref<HTMLButtonElement>
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'dg-button--primary',
  secondary: 'dg-button--secondary',
  ghost: 'dg-button--ghost',
  outline: 'dg-button--outline',
  contrast: 'dg-button--contrast',
  danger: 'dg-button--danger',
  dangerSoft: 'dg-button--danger-soft',
  warning: 'dg-button--warning',
  success: 'dg-button--success',
  back: 'dg-button--back',
}

export function Button({
  variant = 'primary',
  size = 'm',
  iconStart,
  iconEnd,
  loading = false,
  block = false,
  type = 'button',
  href,
  linkAs,
  download,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = [
    'dg-button',
    VARIANT_CLASS[variant],
    `dg-button--${size}`,
    block ? 'dg-button--block' : null,
    loading ? 'is-loading' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const Tag = (href ? (linkAs ?? 'a') : 'button') as ElementType
  const tagProps = href
    ? { href, download, 'aria-disabled': disabled || loading || undefined }
    : { type, disabled: disabled || loading }

  return (
    <Tag
      className={classes}
      aria-busy={loading || undefined}
      {...tagProps}
      {...rest}
    >
      <span className="dg-button__content">
        {iconStart ? (
          <span className="dg-button__icon" aria-hidden="true">
            {iconStart}
          </span>
        ) : null}
        {children != null ? <span className="dg-button__label">{children}</span> : null}
        {iconEnd ? (
          <span className="dg-button__icon" aria-hidden="true">
            {iconEnd}
          </span>
        ) : null}
      </span>
      {loading ? <span className="dg-button__spinner" aria-hidden="true" /> : null}
    </Tag>
  )
}
