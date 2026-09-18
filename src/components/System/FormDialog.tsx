import { useId } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconX } from '../Icons/IconX'
import { useEscapeClose } from '../Overlays/useEscapeClose'

/** Šířky rámu z exportu návrhu; `wide` je zkratka pro 620 px. */
export type FormDialogWidth = 460 | 480 | 520 | 560 | 620 | 660 | 760

export interface FormDialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Nadpis dialogu — čte ho i odečítač jako jméno dialogu. */
  title: ReactNode
  /** Věta pod nadpisem: co se po člověku chce. */
  subtitle?: ReactNode
  /** Údaj vpravo v hlavičce (cena zboží) — vedle nadpisu, před křížkem. */
  aside?: ReactNode
  /** Širší rám (620 px podle Panel / Dostupnost) pro dialog se seznamem. */
  wide?: boolean
  /** Šířka rámu podle návrhu — výchozí 480 px; přebíjí `wide`. */
  width?: FormDialogWidth
  /** Zavření; bez handleru se křížek nevykreslí. */
  onClose?: () => void
  closeLabel?: string
  /** Escape zavírá dialog — rozdělaný formulář zahodí aplikace, ne knihovna. */
  closeOnEscape?: boolean
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
  aside,
  wide = false,
  width,
  onClose,
  closeLabel = 'Zavřít dialog',
  closeOnEscape = true,
  children,
  footer,
  className,
  ...rest
}: FormDialogProps) {
  const titleId = useId()
  useEscapeClose(onClose, closeOnEscape)

  return (
    <div
      className={[
        'dg-form-dialog',
        width != null
          ? width === 480
            ? null
            : width === 620
              ? 'dg-form-dialog--wide'
              : `dg-form-dialog--w${width}`
          : wide
            ? 'dg-form-dialog--wide'
            : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
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
        {aside != null ? <div className="dg-form-dialog__aside">{aside}</div> : null}
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
