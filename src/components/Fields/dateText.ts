/**
 * Převody mezi textem a hodnotou u polí s datem a časem. Pole musí jít
 * **napsat rukou** (obsluha s klávesnicí je rychlejší než s kalendářem), takže
 * každé z nich potřebuje obojí směr: hodnotu na text a text zpátky na hodnotu.
 *
 * Jeden jazyk (čeština) záměrně: knihovna kreslí návrh darkglass, ne obecný
 * formátovač. `Intl` se tu nepoužívá, protože „14. 9. 2026" má v návrhu pevný
 * tvar a lokalizace prohlížeče by ho v Pokladně měnila podle stroje.
 */

/** „14. 9. 2026" — tvar z návrhu, § Kalendář a čas. */
export function formatCzDate(day: Date): string {
  return `${day.getDate()}. ${day.getMonth() + 1}. ${day.getFullYear()}`
}

/** Datum na `yyyy-mm-dd` v místním čase — tvar, kterým se posílá na server. */
export function toIsoDate(day: Date): string {
  const m = `${day.getMonth() + 1}`.padStart(2, '0')
  const d = `${day.getDate()}`.padStart(2, '0')
  return `${day.getFullYear()}-${m}-${d}`
}

function makeDay(year: number, month: number, day: number): Date | null {
  const made = new Date(year, month - 1, day)
  // Přetečení (31. 2.) si Date tiše srovná na 3. 3. — takové datum nebereme.
  if (made.getFullYear() !== year || made.getMonth() !== month - 1 || made.getDate() !== day) return null
  return made
}

/**
 * Text na datum. Bere „14.9.2026", „14. 9. 2026", „14.9." i „14.9" (doplní
 * zobrazený rok) a `yyyy-mm-dd` ze serveru. Co nesedí, vrací `null` — pole si
 * pak nechá původní hodnotu, nesmaže ji.
 */
export function parseCzDate(text: string, fallbackYear?: number): Date | null {
  const clean = text.replace(/\s/g, '')
  if (clean === '') return null

  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(clean)
  if (iso) return makeDay(Number(iso[1]), Number(iso[2]), Number(iso[3]))

  const cz = /^(\d{1,2})\.(\d{1,2})\.?(\d{2,4})?$/.exec(clean)
  if (!cz) return null
  const year =
    cz[3] == null
      ? (fallbackYear ?? new Date().getFullYear())
      : cz[3].length <= 2
        ? 2000 + Number(cz[3])
        : Number(cz[3])
  return makeDay(year, Number(cz[2]), Number(cz[1]))
}

/** Datum na začátek svého měsíce — kalendář se listuje po měsících. */
export function startOfMonth(day: Date): Date {
  return new Date(day.getFullYear(), day.getMonth(), 1)
}

/**
 * Text na čas „hh:mm". Bere „8", „8:5", „8.30", „830" i „0830"; hodinu a minutu
 * dorovná nulou. Neplatný čas vrací `null`.
 */
export function parseTime(text: string): string | null {
  const clean = text.replace(/\s/g, '')
  if (clean === '') return null

  let hours: number
  let minutes: number

  const split = /^(\d{1,2})[:.,](\d{1,2})$/.exec(clean)
  if (split) {
    hours = Number(split[1])
    minutes = Number(split[2].padEnd(2, '0'))
  } else if (/^\d{1,2}$/.test(clean)) {
    hours = Number(clean)
    minutes = 0
  } else if (/^\d{3,4}$/.test(clean)) {
    hours = Number(clean.slice(0, clean.length - 2))
    minutes = Number(clean.slice(-2))
  } else {
    return null
  }

  if (hours > 23 || minutes > 59) return null
  return `${`${hours}`.padStart(2, '0')}:${`${minutes}`.padStart(2, '0')}`
}

/**
 * Seznam časů pro popover — od `from` do `to` po `step` minutách. Krok si volí
 * aplikace (rozpis směn po 15 minutách, rezervace po 30).
 */
export function timeOptions(step = 15, from = '00:00', to = '23:59'): string[] {
  const start = parseTime(from) ?? '00:00'
  const end = parseTime(to) ?? '23:59'
  const toMinutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3, 5))
  const safeStep = step > 0 ? step : 15
  const out: string[] = []
  for (let m = toMinutes(start); m <= toMinutes(end); m += safeStep) {
    out.push(`${`${Math.floor(m / 60)}`.padStart(2, '0')}:${`${m % 60}`.padStart(2, '0')}`)
  }
  return out
}
