import { useEffect } from 'react'

/** Pořadí otevřených překryvů. Escape patří vždy tomu navrchu — jinak by se
    při dvou dialozích nad sebou zavřel ten spodní (nebo oba najednou). */
const stack: object[] = []

/**
 * Zavření překryvu klávesou Escape. Překryvy si samy nic neportálují ani
 * nezamykají pozadí — tohle je jediná klávesová věc, kterou knihovna dělá za
 * aplikaci, protože „z dialogu se dá odejít klávesnicí“ je vlastnost dialogu,
 * ne obrazovky. Bez `onClose` se posluchač vůbec nevěší.
 */
export function useEscapeClose(onClose?: () => void, enabled = true): void {
  useEffect(() => {
    if (!onClose || !enabled || typeof document === 'undefined') return

    const token = {}
    stack.push(token)

    const handle = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return
      if (stack[stack.length - 1] !== token) return
      event.preventDefault()
      onClose()
    }

    document.addEventListener('keydown', handle)
    return () => {
      document.removeEventListener('keydown', handle)
      const at = stack.indexOf(token)
      if (at !== -1) stack.splice(at, 1)
    }
  }, [onClose, enabled])
}
