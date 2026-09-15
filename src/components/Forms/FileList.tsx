import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconFile } from '../Icons/IconFile'
import { IconX } from '../Icons/IconX'

export interface FileListProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode
  ref?: Ref<HTMLUListElement>
}

/** Seznam nahraných souborů — nese jen rozestupy, obsah jsou řádky `FileRow`. */
export function FileList({ className, children, ...rest }: FileListProps) {
  return (
    <ul className={['dg-filelist', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </ul>
  )
}

export interface FileRowProps extends HTMLAttributes<HTMLLIElement> {
  name: ReactNode
  /** Velikost hotového souboru („2,4 MB“). U nahrávání se místo ní ukazuje procento. */
  size?: ReactNode
  /** 0–100 = soubor se ještě nahrává a řádek má pod názvem pruh. */
  progress?: number
  icon?: ReactNode
  onRemove?: () => void
  removeLabel?: string
  ref?: Ref<HTMLLIElement>
}

/**
 * Řádek nahraného souboru. Dokud se soubor nahrává, je místo velikosti vidět
 * procento a pruh postupu — stav se tak pozná bez čekání na konec.
 */
export function FileRow({
  name,
  size,
  progress,
  icon,
  onRemove,
  removeLabel = 'Odebrat soubor',
  className,
  ...rest
}: FileRowProps) {
  const uploading = typeof progress === 'number'

  return (
    <li className={['dg-filerow', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dg-filerow__tile" aria-hidden="true">
        {icon ?? <IconFile size={18} />}
      </span>
      <span className="dg-filerow__text">
        <span className="dg-filerow__top">
          <span className="dg-filerow__name">{name}</span>
          {size != null ? <span className="dg-filerow__size">{size}</span> : null}
        </span>
        {uploading ? (
          <span
            className="dg-filerow__bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <span
              className="dg-filerow__bar-fill"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </span>
        ) : null}
      </span>
      {onRemove ? (
        <button
          type="button"
          className="dg-filerow__remove"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <IconX size={14} />
        </button>
      ) : null}
    </li>
  )
}
