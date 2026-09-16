import type { ElementType, HTMLAttributes, ReactNode, Ref } from 'react'
import { IconCheck } from '../Icons/IconCheck'

export type StepPillState = 'done' | 'current' | 'todo' | 'skipped'

export interface StepPill {
  key: string
  label: ReactNode
  /** Stav kroku. Na rozdíl od průvodce nemusí být kroky hotové po pořadě. */
  state: StepPillState
  /** Cíl odkazu — pilulka se pak vykreslí jako `<a>`. Bez něj jen popisuje stav. */
  href?: string
}

export interface StepPillsProps extends HTMLAttributes<HTMLElement> {
  steps: StepPill[]
  /** Čím se vykreslí odkaz; aplikace s routerem sem předá svůj `Link`. */
  linkAs?: ElementType
  label?: string
  ref?: Ref<HTMLElement>
}

const STATE_LABEL: Record<StepPillState, string> = {
  done: 'hotovo',
  current: 'teď na řadě',
  todo: 'zbývá',
  skipped: 'přeskočeno',
}

/**
 * Nav / Kroky jako pilulky — § Navigace. Proti průvodci (`Stepper`) nejsou
 * kroky lineární: hotové mohou být v libovolném pořadí a krok jde přeskočit.
 * Hotový nese fajfku v barvě úspěchu, právě probíhající číslo na akcentu,
 * přeskočený pomlčku. Stav nikdy nesděluje jen barva — je u něj i tvar a
 * u odkazu skryté slovo pro čtečku.
 */
export function StepPills({
  steps,
  linkAs,
  label = 'Kroky',
  className,
  ...rest
}: StepPillsProps) {
  const Link = (linkAs ?? 'a') as ElementType

  return (
    <nav
      className={['dg-step-pills', className].filter(Boolean).join(' ')}
      aria-label={label}
      {...rest}
    >
      <ol className="dg-step-pills__list">
        {steps.map((step, index) => {
          const mark =
            step.state === 'done' ? (
              <IconCheck size={14} className="dg-step-pills__check" />
            ) : step.state === 'skipped' ? (
              <span className="dg-step-pills__num" aria-hidden="true">
                –
              </span>
            ) : (
              <span className="dg-step-pills__num" aria-hidden="true">
                {index + 1}
              </span>
            )

          const body = (
            <>
              {mark}
              <span className="dg-step-pills__label">{step.label}</span>
              <span className="dg-step-pills__state">{` — ${STATE_LABEL[step.state]}`}</span>
            </>
          )

          return (
            <li
              key={step.key}
              className={`dg-step-pills__step is-${step.state}`}
              aria-current={step.state === 'current' ? 'step' : undefined}
            >
              {step.href != null ? (
                <Link className="dg-step-pills__pill" href={step.href}>
                  {body}
                </Link>
              ) : (
                <span className="dg-step-pills__pill">{body}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
