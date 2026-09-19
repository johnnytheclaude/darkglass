import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Button } from '../Buttons/Button'
import { ConfirmDialog } from './ConfirmDialog'
import { DialogActions } from './DialogActions'

/**
 * Zavírání dialogu s formulářem — rozepsaná práce, otázka „Zahodit rozepsaný
 * formulář?“ a úklid po úspěšném uložení. Jedno místo pro celou aplikaci
 * (task #828).
 *
 * Proč to je v knihovně a ne v aplikaci: dřív si příznak „formulář je
 * rozepsaný“ držel obal dialogu v Adminu a nikdo ho po uložení nemazal. Po
 * úspěšném uložení tak dialog zůstal otevřený a při zavírání se ptal, jestli
 * se má zahodit něco, co je dávno uložené. Kdyby se to látalo po dialozích,
 * příští nový dialog udělá tutéž chybu — proto to drží knihovna a formuláře
 * uvnitř dialogu úspěch jen ohlásí přes `useDialogSave()`.
 *
 * Co hook dělá:
 *
 * 1. **Sleduje rozepsanost.** Jakmile v překryvu padne `input`/`change`, je
 *    formulář rozepsaný. Dokud nepadne, zavření se na nic neptá.
 * 2. **Ptá se jen tehdy, když je co ztratit.** Otázka přijde výhradně při
 *    zavírání rozepsaného a NEULOŽENÉHO formuláře — tedy ne po uložení a ne
 *    nad dialogem, který člověk jen otevřel.
 * 3. **Po úspěšném uložení uklidí.** `markSaved()` shodí příznak rozepsanosti,
 *    zavře případnou otázku a (pokud si dialog nevyžádal opak) zavře dialog.
 *    Hlášku o úspěchu předá aplikaci ven přes `onSaved` — uvnitř zavřeného
 *    dialogu by ji nikdo nepřečetl.
 * 4. **Vrací zaostření** tam, odkud dialog vyšel; jinak skončí focus na
 *    `<body>` a další Tab začne od začátku stránky.
 */

/** Pole, na kterém dialog otevře zaostření, když v něm žádné pole není. */
const FOCUSABLE =
  'input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function firstFocusable(root: HTMLElement, skipSelector?: string): HTMLElement | null {
  for (const node of Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE))) {
    // Křížek „Zavřít dialog“ je poslední záchrana — zaostřit chceme první pole.
    if (skipSelector && node.closest(skipSelector)) continue
    return node
  }
  return root.querySelector<HTMLElement>(FOCUSABLE)
}

export interface DialogDismissOptions {
  /** Třída překryvu — vzhled překryvu kreslí aplikace, ne knihovna. */
  backdropClassName?: string
  /** Třída obalu otázky „Zahodit rozepsaný formulář?“. */
  confirmClassName?: string
  /** Prvky, které se při otevření dialogu nezaostřují (typicky hlavička s křížkem). */
  skipFocusSelector?: string
  /**
   * Dialog po úspěšném uložení zůstane otevřený. Jen pro dialogy, do kterých
   * se vědomě přidává víc položek za sebou — příznak rozepsanosti se shodí
   * i tak, takže se dialog při zavírání neptá na nic, co je uložené.
   */
  keepOpenOnSave?: boolean
  /**
   * Hláška o úspěchu pro aplikaci — vykreslí se MIMO dialog (plovoucí
   * oznámení), protože zavřený dialog nemá kam ji dát.
   */
  onSaved?: (message?: ReactNode) => void
  /** Popisky otázky, když se hodí jiné než výchozí. */
  labels?: {
    title?: string
    body?: ReactNode
    keep?: string
    discard?: string
  }
}

export interface DialogSave {
  /** Formulář uvnitř dialogu tím říká „uloženo“ — o zbytek se postará dialog. */
  markSaved: (message?: ReactNode) => void
  /** Dialog po uložení vědomě zůstává otevřený (vícenásobné přidávání). */
  keepOpen: boolean
}

export interface DialogDismiss {
  /** Překryv dialogu — klik vedle dialogu zavírá stejnou cestou jako Escape. */
  backdropProps: {
    ref: (node: HTMLDivElement | null) => void
    className: string
    role: 'presentation'
    onClick: () => void
  }
  /** Zavření se zeptá, jen když je formulář rozepsaný a neuložený. */
  requestClose: () => void
  /** Otázka „Zahodit rozepsaný formulář?“ — vykresli ji uvnitř překryvu. */
  discardPrompt: ReactNode
  /** Ohlášení úspěšného uložení: shodí rozepsanost, vyplaví hlášku, zavře dialog. */
  markSaved: (message?: ReactNode) => void
  /** Hodnota pro `DialogSaveProvider`, ať formuláře uvnitř úspěch jen ohlásí. */
  save: DialogSave
}

const DialogSaveContext = createContext<DialogSave | null>(null)

/** Obal obsahu dialogu — formuláře uvnitř díky němu umí ohlásit úspěch. */
export function DialogSaveProvider({ value, children }: { value: DialogSave; children: ReactNode }) {
  return <DialogSaveContext.Provider value={value}>{children}</DialogSaveContext.Provider>
}

/**
 * Ohlášení úspěšného uložení dialogu. Mimo dialog vrací `null` — formulář na
 * stránce si hlášku vykreslí sám u sebe, tam má kam naskočit.
 */
export function useDialogSave(): DialogSave | null {
  return useContext(DialogSaveContext)
}

export function useDialogDismiss(
  onClose: () => void,
  options: DialogDismissOptions = {},
): DialogDismiss {
  const {
    backdropClassName = 'dg-dialog-backdrop',
    confirmClassName,
    skipFocusSelector = '.dg-form-dialog__head',
    keepOpenOnSave = false,
    onSaved,
    labels,
  } = options

  // Překryv drží stav, ne ref: dialog v portálu se do DOM dostane až druhým
  // renderem, a efekt s prázdnými závislostmi by si z prvního renderu odnesl
  // `null` a už se nikdy nespustil.
  const [backdrop, setBackdrop] = useState<HTMLDivElement | null>(null)
  const dirtyRef = useRef(false)
  const [asking, setAsking] = useState(false)

  useEffect(() => {
    // Zaostření se sbírá dřív, než ho dialog přebere sobě.
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    return () => {
      // Prvek, ze kterého se dialog otevřel, po zavření obrazovky existovat nemusí.
      if (opener?.isConnected) opener.focus()
    }
  }, [])

  useEffect(() => {
    if (!backdrop) return

    if (!backdrop.contains(document.activeElement)) {
      firstFocusable(backdrop, skipFocusSelector)?.focus()
    }

    const mark = () => {
      dirtyRef.current = true
    }
    backdrop.addEventListener('input', mark)
    backdrop.addEventListener('change', mark)
    return () => {
      backdrop.removeEventListener('input', mark)
      backdrop.removeEventListener('change', mark)
    }
  }, [backdrop, skipFocusSelector])

  const requestClose = useCallback(() => {
    if (dirtyRef.current) {
      setAsking(true)
      return
    }
    onClose()
  }, [onClose])

  const keepEditing = useCallback(() => setAsking(false), [])

  const markSaved = useCallback(
    (message?: ReactNode) => {
      // Uložené se nemá co zahazovat — příznak padá dřív, než se cokoli zavře.
      dirtyRef.current = false
      setAsking(false)
      onSaved?.(message)
      if (!keepOpenOnSave) onClose()
    },
    [keepOpenOnSave, onClose, onSaved],
  )

  const save = useMemo<DialogSave>(
    () => ({ markSaved, keepOpen: keepOpenOnSave }),
    [markSaved, keepOpenOnSave],
  )

  const discardPrompt = asking ? (
    <div
      className={confirmClassName}
      role="presentation"
      onClick={(event) => event.stopPropagation()}
    >
      <ConfirmDialog
        title={labels?.title ?? 'Zahodit rozepsaný formulář?'}
        body={labels?.body ?? 'Co jste v dialogu napsali, se neuloží.'}
        tone="warning"
        onClose={keepEditing}
        footer={
          <DialogActions>
            <Button variant="secondary" onClick={keepEditing}>
              {labels?.keep ?? 'Pokračovat v úpravách'}
            </Button>
            <Button variant="danger" onClick={onClose}>
              {labels?.discard ?? 'Zahodit změny'}
            </Button>
          </DialogActions>
        }
      />
    </div>
  ) : null

  return {
    backdropProps: {
      ref: setBackdrop,
      className: backdropClassName,
      role: 'presentation' as const,
      onClick: requestClose,
    },
    requestClose,
    discardPrompt,
    markSaved,
    save,
  }
}
