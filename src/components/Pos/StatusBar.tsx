import type { HTMLAttributes, ReactNode, Ref } from 'react'

/** Barevný tón odznaku stavu — mapuje se na tokeny, ne na barvu natvrdo. */
export type StatusTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

export interface StatusBadge {
  /** Stabilní klíč stavu (`offline`, `fronta`, `tiskarna`, `terminal`, `verze`…). */
  key: string
  label: ReactNode
  tone?: StatusTone
  /** Popis pro čtečku a bublinu, když je popisek jen zkratka („3 čekají“). */
  title?: string
  /** Kliknutelný odznak otevírá detail stavu (modály „stav: tiskárna“ a spol.). */
  onClick?: () => void
}

import { SandboxBar } from '../System/SandboxBar'

export interface SandboxStrip {
  text: ReactNode
  actionLabel?: ReactNode
  onAction?: () => void
}

export interface StatusBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Přihlášená obsluha. */
  operator?: ReactNode
  /** Prodejna a pokladna („Vodičkova · P01“). */
  place?: ReactNode
  /** Směna („směna od 8:55“). */
  shift?: ReactNode
  /** Čas vpravo; aplikace si ho tiká sama. */
  time?: ReactNode
  /** Stavy vpravo. Lišta je unese všechny najednou — přeteče do dalšího řádku. */
  badges?: StatusBadge[]
  /** Pruh SANDBOX nad lištou (zkušební režim). */
  sandbox?: SandboxStrip
  /**
   * Klepnutí do identity vlevo. Pokladna tím otevírá menu — odznaky si přitom
   * dál otevírají vlastní detail, proto to nesmí být klik na celou lištu.
   */
  onIdentityClick?: () => void
  /** Popis identity pro čtečku, když je z ní tlačítko („otevřít menu“). */
  identityLabel?: string
  /**
   * Lišta ztichne — obsah zprůhlední, místo zůstane. Používá se, když přes
   * lištu leží hlášení (toast) a text by se s ním křížil.
   */
  quiet?: boolean
  ref?: Ref<HTMLDivElement>
}

const TONE_CLASS: Record<StatusTone, string> = {
  neutral: 'dg-status-bar__badge--neutral',
  accent: 'dg-status-bar__badge--accent',
  success: 'dg-status-bar__badge--success',
  warning: 'dg-status-bar__badge--warning',
  danger: 'dg-status-bar__badge--danger',
}

/**
 * Nav / Stavová lišta — pruh nad všemi obrazovkami Pokladny.
 * Nese obsluhu, místo, směnu, čas a libovolný počet stavů (spojení, fronta,
 * tiskárny, terminál, aktualizace). Stavů může nastat pět naráz, proto se
 * identita vlevo zkracuje a odznaky se zalomí na další řádek — nikdy nepřetečou.
 */
export function StatusBar({
  operator,
  place,
  shift,
  time,
  badges = [],
  sandbox,
  onIdentityClick,
  identityLabel,
  quiet = false,
  className,
  children,
  ...rest
}: StatusBarProps) {
  const identityContent = (
    <>
      {operator != null ? <span className="dg-status-bar__operator">{operator}</span> : null}
      {place != null ? <span className="dg-status-bar__meta">{place}</span> : null}
      {shift != null ? <span className="dg-status-bar__meta">{shift}</span> : null}
    </>
  )

  const bar = (
    <div
      className={['dg-status-bar', quiet ? 'is-quiet' : null, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {onIdentityClick ? (
        <button
          type="button"
          className="dg-status-bar__identity dg-status-bar__identity--action"
          onClick={onIdentityClick}
          aria-label={identityLabel}
        >
          {identityContent}
        </button>
      ) : (
        <div className="dg-status-bar__identity">{identityContent}</div>
      )}
      {badges.length > 0 ? (
        <div className="dg-status-bar__badges">
          {badges.map((badge) => {
            const classes = [
              'dg-status-bar__badge',
              TONE_CLASS[badge.tone ?? 'neutral'],
              badge.onClick ? 'dg-status-bar__badge--action' : null,
            ]
              .filter(Boolean)
              .join(' ')

            return badge.onClick ? (
              <button
                key={badge.key}
                type="button"
                className={classes}
                title={badge.title}
                onClick={badge.onClick}
              >
                {badge.label}
              </button>
            ) : (
              <span key={badge.key} className={classes} title={badge.title}>
                {badge.label}
              </span>
            )
          })}
        </div>
      ) : null}
      {children}
      {time != null ? <span className="dg-status-bar__time">{time}</span> : null}
    </div>
  )

  if (!sandbox) return bar

  return (
    <div className="dg-status-bar-stack">
      <SandboxBar text={sandbox.text} actionLabel={sandbox.actionLabel} onAction={sandbox.onAction} />
      {bar}
    </div>
  )
}
