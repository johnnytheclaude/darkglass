import { useId } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconX } from '../Icons/IconX'

export interface FormDialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Nadpis dialogu — čte ho i odečítač jako jméno dialogu. */
  title: ReactNode
  /** Věta pod nadpisem: co se po člověku chce. */
  subtitle?: ReactNode
  /** Zavření; bez handleru se křížek nevykreslí. */
  onClose?: () => void
  closeLabel?: string
  /** Pole formuláře — komponenty § Textová pole, dialog je jen jejich rám. */
  children?: ReactNode
  /** Tlačítka vpravo dole (Zrušit / Vytvořit). */
  footer?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Modal / Form — dialog s formulářem. Nese nadpis, pole a tlačítka vpravo dole;
 * pole si dodává aplikace, dialog jim jen drží šířku, odsazení a rozestupy.
 */
export function FormDialog({
  title,
  subtitle,
  onClose,
  closeLabel = 'Zavřít dialog',
  children,
  footer,
  className,
  ...rest
}: FormDialogProps) {
  const titleId = useId()

  return (
    <div
      className={['dg-form-dialog', className].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      {...rest}
    >
      <div className="dg-form-dialog__head">
        <div className="dg-form-dialog__titles">
          <div className="dg-form-dialog__title" id={titleId}>
            {title}
          </div>
          {subtitle != null ? <div className="dg-form-dialog__sub">{subtitle}</div> : null}
        </div>
        {onClose ? (
          <button
            type="button"
            className="dg-form-dialog__close"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <IconX size={15} />
          </button>
        ) : null}
      </div>
      {children != null ? <div className="dg-form-dialog__fields">{children}</div> : null}
      {footer != null ? <div className="dg-form-dialog__footer">{footer}</div> : null}
    </div>
  )
}
