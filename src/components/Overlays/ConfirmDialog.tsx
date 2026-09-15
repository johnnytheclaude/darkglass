import { useId } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconX } from '../Icons/IconX'
import { useEscapeClose } from './useEscapeClose'

export type ConfirmDialogTone = 'danger' | 'accent' | 'warning' | 'success'

export interface ConfirmDialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Otázka v nadpisu — čte ji i odečítač jako jméno dialogu. */
  title: ReactNode
  /** Co se stane, co to znamená a co už nepůjde vrátit. */
  body?: ReactNode
  /** Ikona v dlaždici; barvu dlaždice řídí `tone`. */
  icon?: ReactNode
  tone?: ConfirmDialogTone
  onClose?: () => void
  closeLabel?: string
  /** Escape zavírá dialog (= odpověď „ne“). Vypni jen výjimečně. */
  closeOnEscape?: boolean
  /** Tlačítka vpravo dole (Zrušit / potvrzení) — u dvou akcí `DialogActions`. */
  footer?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Modal / Confirm — potvrzení nevratné akce. Dialog je neprůhledný (sklo přes
 * sklo se nedá číst) a text pod nadpisem nese následek, ne jen otázku.
 */
export function ConfirmDialog({
  title,
  body,
  icon,
  tone = 'danger',
  onClose,
  closeLabel = 'Zavřít dialog',
  closeOnEscape = true,
  footer,
  className,
  children,
  ...rest
}: ConfirmDialogProps) {
  const titleId = useId()
  useEscapeClose(onClose, closeOnEscape)

  return (
    <div
      className={['dg-confirm', `dg-confirm--${tone}`, className].filter(Boolean).join(' ')}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={titleId}
      {...rest}
    >
      <div className="dg-confirm__head">
        {icon ? (
          <span className="dg-confirm__tile" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <div className="dg-confirm__text">
          <span className="dg-confirm__title" id={titleId}>
            {title}
          </span>
          {body != null ? <span className="dg-confirm__body">{body}</span> : null}
        </div>
        {onClose ? (
          <button type="button" className="dg-confirm__close" onClick={onClose} aria-label={closeLabel}>
            <IconX size={15} />
          </button>
        ) : null}
      </div>
      {children}
      {footer != null ? <div className="dg-confirm__footer">{footer}</div> : null}
    </div>
  )
}
