import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface LabelPreviewProps extends HTMLAttributes<HTMLDivElement> {
  /** Název na štítku. */
  name?: ReactNode
  /** Varianta pod názvem (barva, velikost). */
  variant?: ReactNode
  /** Cena velkým řezem. */
  price?: ReactNode
  /** Kód (QR nebo čárový) — obrázek nebo prvek. Bez něj se kreslí jen místo. */
  code?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Card / QR — náhled štítku před tiskem (návrh 29 × 90 mm). Bílá plocha jako
 * papír, kód vpravo. Nepočítá nic: co se vytiskne, dodá aplikace.
 */
export function LabelPreview({
  name,
  variant,
  price,
  code,
  className,
  ...rest
}: LabelPreviewProps) {
  const classes = ['dg-label-preview', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div className="dg-label-preview__text">
        {name != null ? <span className="dg-label-preview__name">{name}</span> : null}
        {variant != null ? <span className="dg-label-preview__variant">{variant}</span> : null}
        {price != null ? <span className="dg-label-preview__price">{price}</span> : null}
      </div>
      <div className="dg-label-preview__code">{code}</div>
    </div>
  )
}
