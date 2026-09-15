import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type InlineNoticeTone = 'warning' | 'danger' | 'success' | 'accent' | 'quiet'

export interface InlineNoticeProps extends HTMLAttributes<HTMLDivElement> {
  /** Ladění podle závažnosti; návrh má limit (warning), chybu a „v pořádku“. */
  tone?: InlineNoticeTone
  /** Tučná část — co se stalo („Nad limit obsluhy 1 000 Kč“). */
  label: ReactNode
  /** Zbytek věty — co z toho plyne. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Notice / Inline — jednořádkové upozornění uvnitř formuláře nebo panelu.
 * Barvu nese celý pruh, takže se pozná i koutkem oka; text zůstává čitelný.
 */
export function InlineNotice({
  tone = 'warning',
  label,
  children,
  className,
  role,
  ...rest
}: InlineNoticeProps) {
  const classes = ['dg-inline-notice', `dg-inline-notice--${tone}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role={role ?? (tone === 'danger' ? 'alert' : 'status')} {...rest}>
      <span className="dg-inline-notice__label">{label}</span>
      {children != null ? <span className="dg-inline-notice__text">{children}</span> : null}
    </div>
  )
}
