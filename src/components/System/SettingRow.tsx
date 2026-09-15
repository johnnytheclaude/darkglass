import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface SettingsListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/** Settings List — karta, do které se skládají řádky nastavení. */
export function SettingsList({ children, className, ...rest }: SettingsListProps) {
  return (
    <div className={['dg-settings-list', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}

export interface SettingRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Název nastavení. */
  title: ReactNode
  /** Co nastavení znamená, nebo jeho současná hodnota. */
  description?: ReactNode
  /** Ovládání vpravo — přepínač, výběr, tlačítko. */
  control?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Set / Řádek nastavení — název s vysvětlením vlevo, ovládání vpravo. V úzkém
 * místě se ovládání zalomí pod text, takže se nikdy nezmáčkne na nulovou šířku.
 */
export function SettingRow({
  title,
  description,
  control,
  className,
  ...rest
}: SettingRowProps) {
  return (
    <div className={['dg-setting-row', className].filter(Boolean).join(' ')} {...rest}>
      <div className="dg-setting-row__text">
        <div className="dg-setting-row__title">{title}</div>
        {description != null ? (
          <div className="dg-setting-row__sub">{description}</div>
        ) : null}
      </div>
      {control != null ? <div className="dg-setting-row__control">{control}</div> : null}
    </div>
  )
}
