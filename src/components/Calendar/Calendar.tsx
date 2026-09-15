import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconChevronLeft } from '../Icons/IconChevronLeft'
import { IconChevronRight } from '../Icons/IconChevronRight'

export type CalendarMode = 'single' | 'range'

export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
  /** Kterýkoli den zobrazeného měsíce. */
  month: Date
  /** Vlastní popisek měsíce; bez něj se skládá česky z `month`. */
  monthLabel?: ReactNode
  /** Jeden den, nebo rozsah. */
  mode?: CalendarMode
  /** Vybraný den v režimu `single`. */
  selected?: Date | null
  /** Začátek rozsahu v režimu `range`. */
  rangeFrom?: Date | null
  /** Konec rozsahu v režimu `range`. */
  rangeTo?: Date | null
  onSelectDay?: (day: Date) => void
  onPrevMonth?: () => void
  onNextMonth?: () => void
  /** Den, který nejde vybrat (uzavřené období, budoucnost). */
  disabledDay?: (day: Date) => boolean
  /** Týden začíná pondělím — návrh jiný začátek nezná. */
  weekdayLabels?: string[]
  prevLabel?: string
  nextLabel?: string
  ref?: Ref<HTMLDivElement>
}

const WEEKDAYS = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function sameDay(a: Date | null | undefined, b: Date) {
  return a != null && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/** Mřížka od pondělí prvního týdne po nedělu posledního — vždy celé týdny. */
function buildWeeks(month: Date): Date[][] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const shift = (first.getDay() + 6) % 7
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - shift)
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0)
  const total = shift + last.getDate()
  const weekCount = Math.ceil(total / 7)
  const weeks: Date[][] = []
  for (let w = 0; w < weekCount; w += 1) {
    const week: Date[] = []
    for (let d = 0; d < 7; d += 1) {
      week.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d))
    }
    weeks.push(week)
  }
  return weeks
}

function czMonth(month: Date) {
  const label = month.toLocaleDateString('cs-CZ', { month: 'long', year: 'numeric' })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

/**
 * Calendar — výběr dne (`mode="single"`) nebo rozsahu (`mode="range"`).
 * Týden začíná pondělím, dny mimo zobrazený měsíc jsou ztlumené. Mřížka je
 * sedmisloupcová a drží se šířky rodiče, takže se vejde i do úzkého panelu.
 */
export function Calendar({
  month,
  monthLabel,
  mode = 'single',
  selected,
  rangeFrom,
  rangeTo,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
  disabledDay,
  weekdayLabels = WEEKDAYS,
  prevLabel = 'Předchozí měsíc',
  nextLabel = 'Další měsíc',
  className,
  ...rest
}: CalendarProps) {
  const weeks = buildWeeks(month)
  const from = rangeFrom ? startOfDay(rangeFrom) : null
  const to = rangeTo ? startOfDay(rangeTo) : null
  const classes = ['dg-calendar', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div className="dg-calendar__head">
        <span className="dg-calendar__month">{monthLabel ?? czMonth(month)}</span>
        <div className="dg-calendar__nav">
          <button
            type="button"
            className="dg-calendar__nav-btn"
            onClick={onPrevMonth}
            aria-label={prevLabel}
          >
            <IconChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="dg-calendar__nav-btn"
            onClick={onNextMonth}
            aria-label={nextLabel}
          >
            <IconChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="dg-calendar__weekdays" aria-hidden="true">
        {weekdayLabels.map((label) => (
          <span key={label} className="dg-calendar__weekday">
            {label}
          </span>
        ))}
      </div>
      <div className="dg-calendar__grid" role="grid">
        {weeks.map((week, wi) => (
          <div key={wi} className="dg-calendar__week" role="row">
            {week.map((day) => {
              const outside = day.getMonth() !== month.getMonth()
              const isEdge =
                mode === 'range' ? sameDay(from, day) || sameDay(to, day) : sameDay(selected, day)
              const inRange =
                mode === 'range' &&
                from != null &&
                to != null &&
                day.getTime() > from.getTime() &&
                day.getTime() < to.getTime()
              const disabled = disabledDay ? disabledDay(day) : false
              const cls = [
                'dg-calendar__day',
                outside && 'dg-calendar__day--outside',
                isEdge && 'dg-calendar__day--selected',
                inRange && 'dg-calendar__day--in-range',
              ]
                .filter(Boolean)
                .join(' ')
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  role="gridcell"
                  className={cls}
                  disabled={disabled}
                  aria-pressed={isEdge || inRange}
                  onClick={onSelectDay ? () => onSelectDay(day) : undefined}
                >
                  {day.getDate()}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
