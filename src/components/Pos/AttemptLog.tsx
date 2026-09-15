import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type AttemptLogTone = 'danger' | 'warning' | 'success' | 'quiet'

export interface AttemptLogItem {
  key: string
  /** Co se dělo — „Pokus 1 · 16:02 · 8 460 Kč“, „P01-2026-000122 · 14:12“. */
  label: ReactNode
  /** Jak to dopadlo — „DECLINED · nedostatek prostředků“, „401 · neplatný klíč“. */
  result: ReactNode
  /** Ladění výsledku; bez něj je řádek chybový, protože tak výpis nejčastěji vzniká. */
  tone?: AttemptLogTone
}

export interface AttemptLogProps extends HTMLAttributes<HTMLDivElement> {
  /** Řádky v pořadí, v jakém se staly — nejstarší nahoře. */
  items: AttemptLogItem[]
  ref?: Ref<HTMLDivElement>
}

/**
 * Attempt log / Výpis pokusů — historie uvnitř chybového dialogu: co se dělo
 * vlevo, jak to dopadlo vpravo, mezi řádky vlasová linka.
 *
 * Návrh ho kreslí u zamítnuté karty (artboard 37) i u neodeslaných dokladů
 * (artboard 38). Smysl je pokaždé stejný: z poslední hlášky se nepozná, že
 * pokus nebyl první ani že všechny dopadly stejně — a právě podle toho se
 * obsluha rozhoduje, jestli zkoušet dál, nebo to vzít jinudy.
 *
 * Od [[StatusList]] se liší tím, co ukazuje: StatusList je stav zařízení
 * teď (tiskárna dostupná), tohle je historie, která se už nezmění.
 */
export function AttemptLog({ items, className, ...rest }: AttemptLogProps) {
  return (
    <div className={['dg-attempt-log', className].filter(Boolean).join(' ')} {...rest}>
      {items.map((item) => (
        <div className="dg-attempt-log__row" key={item.key}>
          <span className="dg-attempt-log__label">{item.label}</span>
          <span className={`dg-attempt-log__result dg-attempt-log__result--${item.tone ?? 'danger'}`}>
            {item.result}
          </span>
        </div>
      ))}
    </div>
  )
}
