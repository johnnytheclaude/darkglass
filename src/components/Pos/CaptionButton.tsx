import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'

export interface CaptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Popisek akce („Poslat e-mailem“). */
  label: ReactNode
  /** Podtitulek — na co se akce provede („marie.dvorakova@…“). */
  caption?: ReactNode
  /** Roztažení na šířku rodiče. */
  block?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * Btn / S popiskem — tlačítko, které pod popiskem nese cíl akce.
 * Obsluha tak před klepnutím vidí, kam se účtenka pošle.
 */
export function CaptionButton({
  label,
  caption,
  block = false,
  type = 'button',
  className,
  ...rest
}: CaptionButtonProps) {
  const classes = ['dg-caption-button', block ? 'dg-caption-button--block' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      <span className="dg-caption-button__label">{label}</span>
      {caption != null ? <span className="dg-caption-button__caption">{caption}</span> : null}
    </button>
  )
}
