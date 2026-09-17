import { useState } from 'react'
import { Calendar } from '../../src/components/Calendar/Calendar'
import { DatePresets } from '../../src/components/Calendar/DatePresets'
import { TimePicker } from '../../src/components/Calendar/TimePicker'
import { DateField } from '../../src/components/Fields/DateField'
import { DateRangeField } from '../../src/components/Fields/DateRangeField'
import type { DateRange } from '../../src/components/Fields/DateRangeField'
import { TimeField } from '../../src/components/Fields/TimeField'
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

function DateFieldDemo() {
  const [day, setDay] = useState<Date | null>(new Date(2026, 8, 14))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 260 }}>
      <DateField label="Den" value={day} onValueChange={setDay} help="Datum jde i napsat: 14.9." />
      <DateField label="Platí od" placeholder="d. m. rrrr" />
      <DateField label="Uzavřeno" defaultValue={new Date(2026, 8, 1)} disabled />
      <DateField label="Den" error="Vyberte den v otevřeném období." />
    </div>
  )
}

function TimeFieldDemo() {
  const [from, setFrom] = useState<string | null>('08:00')
  const [to, setTo] = useState<string | null>('16:30')
  return (
    <div style={{ display: 'flex', gap: 12, maxWidth: 320 }}>
      <TimeField label="Od" value={from} onValueChange={setFrom} step={30} from="06:00" to="22:00" />
      <TimeField label="Do" value={to} onValueChange={setTo} step={30} from="06:00" to="22:00" />
    </div>
  )
}

function DateRangeFieldDemo() {
  const [range, setRange] = useState<DateRange>({ from: new Date(2026, 8, 8), to: new Date(2026, 8, 17) })
  const [preset, setPreset] = useState<string | null>(null)

  /* Rozsah k rychlé volbě dopočítává aplikace — knihovna období produktu nezná. */
  function usePreset(key: string) {
    const today = new Date(2026, 8, 17)
    setPreset(key)
    if (key === 'dnes') setRange({ from: today, to: today })
    if (key === '7d') setRange({ from: new Date(2026, 8, 11), to: today })
    if (key === 'mesic') setRange({ from: new Date(2026, 8, 1), to: today })
  }

  return (
    <DateRangeField
      label="Období"
      value={range}
      onValueChange={(next) => {
        setPreset(null)
        setRange(next)
      }}
      presetValue={preset}
      onPresetChange={usePreset}
      presets={[
        { key: 'dnes', label: 'Dnes' },
        { key: '7d', label: 'Posledních 7 dní' },
        { key: 'mesic', label: 'Tento měsíc' },
      ]}
      style={{ maxWidth: 300 }}
    />
  )
}

export const section: ShowcaseSection = {
  id: 'kalendar-a-cas',
  title: '§ Kalendář a čas',
  order: 105,
  note: 'Výběr dne, rozsahu a času. Týden začíná pondělím. Pole s popoverem nahrazují nativní date/time inputy prohlížeče.',
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
    {
      title: 'Pole s datem',
      note: 'Hodnota „14. 9. 2026", kalendář v popoveru. Datum jde napsat rukou, Escape popover zavře.',
      stack: true,
      render: () => <DateFieldDemo />,
    },
    {
      title: 'Pole s časem',
      note: 'Píše se „8" i „830"; popover nabízí seznam po zadaném kroku.',
      stack: true,
      render: () => <TimeFieldDemo />,
    },
    {
      title: 'Pole s obdobím',
      note: 'Od–Do v jednom rámu, vlevo rychlé volby. Napsané datum pozpátku se prohodí.',
      stack: true,
      render: () => <DateRangeFieldDemo />,
    },
  ],
}
