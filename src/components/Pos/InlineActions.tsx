import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { Fragment } from 'react'

export interface InlineAction {
  key: string
  label: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export interface InlineActionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Textové akce oddělené tečkou. */
  actions: InlineAction[]
  ref?: Ref<HTMLDivElement>
}

/**
 * Řádek textových akcí — drobné akce pod obsahem (přejmenovat, rozdělit, sloučit).
 * Jsou to tlačítka, ne odkazy: nikam nevedou, něco dělají.
 */
export function InlineActions({ actions, className, ...rest }: InlineActionsProps) {
  return (
    <div className={['dg-inline-actions', className].filter(Boolean).join(' ')} {...rest}>
      {actions.map((action, index) => (
        <Fragment key={action.key}>
          {index > 0 ? (
            <span className="dg-inline-actions__sep" aria-hidden="true">
              ·
            </span>
          ) : null}
          <button
            type="button"
            className="dg-inline-actions__action"
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.label}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
