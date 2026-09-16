import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface NoteRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Popisek vlevo („Jiné sklady“) — drží pevnou šířku, aby řádky lícovaly. */
  label: ReactNode
  /** Text poznámky. */
  children?: ReactNode
  /** Užší popisek a menší písmo — varianta z artboardu mobilu (Formát). */
  compact?: boolean
  /** Akce vpravo (např. „Rezervovat“); bez ní řádek jen informuje. */
  action?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Row / Poznámka — tichý řádek pod seznamem: popisek vlevo a věta k němu.
 * Používá se tam, kde údaj nemá vlastní řádek seznamu (jiné sklady, důvod,
 * stav spojení). Text je běžný obsah, ne dekorace — nezesvětluje se průhledností.
 */
export function NoteRow({ label, children, action, compact, className, ...rest }: NoteRowProps) {
  return (
    <div
      className={['dg-note-row', compact ? 'dg-note-row--compact' : null, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className="dg-note-row__label">{label}</span>
      <span className="dg-note-row__text">{children}</span>
      {action != null ? <span className="dg-note-row__action">{action}</span> : null}
    </div>
  )
}
