import { useState } from 'react'
import type { DragEvent, InputHTMLAttributes, ReactNode, Ref } from 'react'
import { IconUpload } from '../Icons/IconUpload'

// `title` je i HTML atribut (bublina) — vlastní prop stejného jména se musí
// vyřadit, jinak tsc hlásí TS2430.
export interface DropzoneProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'title'> {
  /** Hlavní věta — co se sem přetáhne. */
  title?: ReactNode
  /** Druhý řádek: čím ještě jde soubor vybrat a co se přijímá. */
  hint?: ReactNode
  /** Ikona v kolečku; výchozí je šipka nahoru. */
  icon?: ReactNode
  /** Soubory z přetažení i z dialogu chodí sem. */
  onFiles?: (files: FileList) => void
  /** Třída obalu; `className` míří na skryté `input`. */
  wrapperClassName?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * Plocha pro nahrání souboru (dodací list, fotka zboží). Je to `label`
 * s vnořeným `input`, takže klik i klávesnice fungují bez vlastního
 * ošetření — čtečka řekne, co se vybírá.
 */
export function Dropzone({
  title = 'Přetáhněte sem soubor',
  hint = 'nebo klikněte a vyberte soubor',
  icon,
  onFiles,
  wrapperClassName,
  className,
  disabled,
  ...rest
}: DropzoneProps) {
  const [over, setOver] = useState(false)

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setOver(false)
    if (!disabled && event.dataTransfer?.files?.length) onFiles?.(event.dataTransfer.files)
  }

  const classes = [
    'dg-dropzone',
    over ? 'is-over' : null,
    disabled ? 'is-disabled' : null,
    wrapperClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label
      className={classes}
      onDragOver={(event) => {
        event.preventDefault()
        if (!disabled) setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className={['dg-dropzone__input', className].filter(Boolean).join(' ')}
        disabled={disabled}
        onChange={(event) => {
          if (event.target.files?.length) onFiles?.(event.target.files)
        }}
        {...rest}
      />
      <span className="dg-dropzone__icon" aria-hidden="true">
        {icon ?? <IconUpload size={23} />}
      </span>
      <span className="dg-dropzone__title">{title}</span>
      <span className="dg-dropzone__hint">{hint}</span>
    </label>
  )
}
