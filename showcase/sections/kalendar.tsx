import { useState } from 'react'
import { Calendar } from '../../src/components/Calendar/Calendar'
import { DatePresets } from '../../src/components/Calendar/DatePresets'
import { TimePicker } from '../../src/components/Calendar/TimePicker'
import type { ShowcaseSection } from '../registry'

/* Pevné datum, ať ukázka vypadá stejně při každém načtení. */
const MONTH = new Date(2026, 8, 1)

function SingleDemo() {
  const [month, setMonth] = useState(MONTH)
  const [selected, setSelected] = useState<Date | null>(new Date(2026, 8, 14))
  return (
    <Calendar
      month={month}
      selected={selected}
      onSelectDay={setSelected}
      onPrevMonth={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
      onNextMonth={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
      style={{ maxWidth: 320 }}
    />
  )
}

function RangeDemo() {
  const [month, setMonth] = useState(MONTH)
  const [from, setFrom] = useState<Date | null>(new Date(2026, 8, 8))
  const [to, setTo] = useState<Date | null>(new Date(2026, 8, 17))

  function pick(day: Date) {
    if (from == null || to != null) {
      setFrom(day)
      setTo(null)
      return
    }
    if (day.getTime() < from.getTime()) {
      setTo(from)
      setFrom(day)
      return
    }
    setTo(day)
  }

  return (
    <Calendar
      mode="range"
      month={month}
      rangeFrom={from}
      rangeTo={to}
      onSelectDay={pick}
      onPrevMonth={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
      onNextMonth={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
      style={{ maxWidth: 320 }}
    />
  )
}

function TimeDemo() {
  const [value, setValue] = useState('09:00')
  return (
    <TimePicker
      options={['08:00', '08:30', '09:00', '09:30', '10:00', '10:30']}
      value={value}
      onChange={setValue}
      style={{ maxWidth: 150 }}
    />
  )
}

function PresetsDemo() {
  const [value, setValue] = useState('7d')
  return (
    <DatePresets
      value={value}
      onChange={setValue}
      options={[
        { key: 'dnes', label: 'Dnes' },
        { key: 'vcera', label: 'Včera' },
        { key: '7d', label: 'Posledních 7 dní' },
        { key: 'mesic', label: 'Tento měsíc' },
        { key: 'minuly', label: 'Minulý měsíc' },
        { key: 'vlastni', label: 'Vlastní…' },
      ]}
      style={{ maxWidth: 180 }}
    />
  )
}

export const section: ShowcaseSection = {
  id: 'kalendar-a-cas',
  title: '§ Kalendář a čas',
  order: 105,
  note: 'Výběr dne, rozsahu a času. Týden začíná pondělím.',
  demos: [
    {
      title: 'Jeden den',
      note: 'Vybraný den je plná pilulka; dny mimo měsíc jsou ztlumené.',
      render: () => <SingleDemo />,
    },
    {
      title: 'Rozsah dnů',
      note: 'Krajní dny plným akcentem, dny mezi nimi jemným podkladem.',
      render: () => <RangeDemo />,
    },
    {
      title: 'Čas',
      note: 'Svislý seznam časů, krok si volí aplikace.',
      render: () => <TimeDemo />,
    },
    {
      title: 'Rychlé volby období',
      note: 'Zvolená položka drží jemnou výplň — je to filtr, ne potvrzení.',
      render: () => <PresetsDemo />,
    },
  ],
}
