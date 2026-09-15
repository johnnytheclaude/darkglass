import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type QrCardSize = 'm' | 'l'

export interface QrCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Popisek nad kódem („Účtenka“). */
  title?: ReactNode
  /** Částka nebo jiný údaj pod popiskem — největší text karty. */
  amount?: ReactNode
  /** Věta pod kódem („Namiřte na kód foťák telefonu“). */
  note?: ReactNode
  /** Samotný kód — `img` nebo `svg`. Tmavé moduly na bílé ploše. */
  code: ReactNode
  /** `m` = 50 mm (dosah půl metru), `l` = 64 mm (výchozí, rezerva navíc). */
  size?: QrCardSize
  ref?: Ref<HTMLDivElement>
}

/**
 * Card / QR — kód na displeji, když nevyjede tisk. Plocha kódu je vždy bílá
 * s tmavými moduly, i v tmavém motivu: čtečka telefonu čte odraz, ne motiv
 * aplikace. Velikost je v milimetrech, protože rozhoduje fyzický rozměr na
 * skle — pravidlo je strana kódu aspoň desetina vzdálenosti čtení (půl metru
 * → 50 mm).
 */
export function QrCard({
  title,
  amount,
  note,
  code,
  size = 'l',
  className,
  ...rest
}: QrCardProps) {
  const classes = ['dg-qr-card', `dg-qr-card--${size}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {title != null || amount != null ? (
        <div className="dg-qr-card__head">
          {title != null ? <span className="dg-qr-card__title">{title}</span> : null}
          {amount != null ? <span className="dg-qr-card__amount">{amount}</span> : null}
        </div>
      ) : null}
      <div className="dg-qr-card__plate">{code}</div>
      {note != null ? <span className="dg-qr-card__note">{note}</span> : null}
    </div>
  )
}
