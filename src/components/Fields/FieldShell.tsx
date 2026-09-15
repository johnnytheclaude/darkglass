import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconAlert } from '../Icons/IconAlert'

export interface FieldShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Popisek vždy NAD polem — plovoucí popisek je pro netechnické uživatele past. */
  label?: ReactNode
  /** Hvězdička za popiskem; povinnost pole hlídá aplikace, knihovna ji jen ukazuje. */
  required?: boolean
  /** Nápověda pod polem. Chybová hláška (`error`) ji přebije. */
  help?: ReactNode
  /** Text chyby — vykreslí se červeně s ikonou a vyhraje nad `help`. */
  error?: ReactNode
  /** Ztlumí celé pole; zakázání samotného ovládacího prvku patří na něj. */
  disabled?: boolean
  /** Id prvku, na který popisek ukazuje. */
  htmlFor?: string
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Společný rám pole z § Textová pole: popisek nad polem, rámeček a pod ním
 * nápověda nebo chyba. Používají ho všechna pole knihovny, aby měla stejné
 * rozestupy — samostatně se z balíku neexportuje.
 */
export function FieldShell({
  label,
  required = false,
  help,
  error,
  disabled = false,
  htmlFor,
  className,
  children,
  ...rest
}: FieldShellProps) {
  const classes = ['dg-field', disabled ? 'is-disabled' : null, className].filter(Boolean).join(' ')
  const note = error ?? help

  return (
    <div className={classes} {...rest}>
      {label != null ? (
        <label className="dg-field__label" htmlFor={htmlFor}>
          <span className="dg-field__label-text">{label}</span>
          {required ? (
            <span className="dg-field__req" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      {children}
      {note != null ? (
        <p className={error != null ? 'dg-field__help dg-field__help--error' : 'dg-field__help'}>
          {error != null ? <IconAlert size={14} className="dg-field__help-icon" /> : null}
          <span>{note}</span>
        </p>
      ) : null}
    </div>
  )
}
