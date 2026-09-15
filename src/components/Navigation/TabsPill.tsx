import { useRef } from 'react'
import type { HTMLAttributes, KeyboardEvent, ReactNode, Ref } from 'react'

export interface TabsPillItem {
  key: string
  label: ReactNode
  /** Počet v kolečku za popiskem. */
  count?: ReactNode
  disabled?: boolean
}

export interface TabsPillProps extends HTMLAttributes<HTMLDivElement> {
  items: TabsPillItem[]
  /** Klíč vybrané záložky (řízená komponenta). */
  value: string
  onValueChange?: (key: string) => void
  /** Popis skupiny pro čtečku. */
  label?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Záložky · pilulky — § Navigace · rozšíření. Přepínač pohledů na jednom
 * seznamu; vybraná záložka je plná, ostatní jen text s počtem. Ovládá se
 * stejně jako segmentovaný přepínač: tabulátorem dovnitř, šipkami mezi
 * záložkami, Home/End na kraje.
 */
export function TabsPill({
  items,
  value,
  onValueChange,
  label,
  className,
  onKeyDown,
  ...rest
}: TabsPillProps) {
  const classes = ['dg-tabs-pill', className].filter(Boolean).join(' ')
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([])

  const enabled = items
    .map((item, index) => ({ item, index }))
    .filter((zaznam) => !zaznam.item.disabled)
  const selectedIndex = items.findIndex((item) => item.key === value)
  const stopIndex = selectedIndex >= 0 ? selectedIndex : (enabled[0]?.index ?? -1)

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event)
    if (event.defaultPrevented || enabled.length === 0) return

    const zde = enabled.findIndex((zaznam) => zaznam.item.key === value)
    const odkud = zde >= 0 ? zde : 0
    let cil: { item: TabsPillItem; index: number } | undefined

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        cil = enabled[(odkud + 1) % enabled.length]
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        cil = enabled[(odkud - 1 + enabled.length) % enabled.length]
        break
      case 'Home':
        cil = enabled[0]
        break
      case 'End':
        cil = enabled[enabled.length - 1]
        break
      default:
        return
    }

    if (!cil) return
    event.preventDefault()
    onValueChange?.(cil.item.key)
    tabsRef.current[cil.index]?.focus()
  }

  return (
    <div
      className={classes}
      role="tablist"
      aria-label={label}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {items.map((item, index) => {
        const selected = item.key === value
        return (
          <button
            className={selected ? 'dg-tabs-pill__tab is-selected' : 'dg-tabs-pill__tab'}
            key={item.key}
            ref={(el) => {
              tabsRef.current[index] = el
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={index === stopIndex ? 0 : -1}
            disabled={item.disabled}
            onClick={() => onValueChange?.(item.key)}
          >
            <span className="dg-tabs-pill__label">{item.label}</span>
            {item.count != null ? (
              <span className="dg-tabs-pill__count">{item.count}</span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
