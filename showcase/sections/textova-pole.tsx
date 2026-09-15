import { useState } from 'react'
import { Dropzone } from '../../src/components/Fields/Dropzone'
import { NumberStepper } from '../../src/components/Fields/NumberStepper'
import { SelectField } from '../../src/components/Fields/SelectField'
import { TextArea } from '../../src/components/Fields/TextArea'
import { TextField } from '../../src/components/Fields/TextField'
import { IconCalendar } from '../../src/components/Icons/IconCalendar'
import { IconChevronDown } from '../../src/components/Icons/IconChevronDown'
import { IconSearch } from '../../src/components/Icons/IconSearch'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná — knihovna doménu nezná. Šířka 320 je z návrhu. */

const POLE = { maxWidth: 320, width: '100%' } as const
const SIROKE = { maxWidth: 420, width: '100%' } as const

const KATEGORIE = [
  { value: 'alfa', label: 'Alfa a.s.' },
  { value: 'beta', label: 'Beta s.r.o.' },
  { value: 'gama', label: 'Gama group' },
  { value: 'delta', label: 'Delta partners' },
]

function UkazkaVyberu() {
  const [value, setValue] = useState('beta')
  return (
    <SelectField
      label="Kategorie"
      options={KATEGORIE}
      value={value}
      onValueChange={setValue}
      style={POLE}
    />
  )
}

function UkazkaPocitadla() {
  const [pocet, setPocet] = useState(16)
  return <NumberStepper label="Počet kusů" value={pocet} onChange={setPocet} min={0} max={999} />
}

function UkazkaNahrani() {
  const [jmeno, setJmeno] = useState<string | null>(null)
  return (
    <Dropzone
      accept=".pdf,image/*"
      hint={jmeno ?? 'nebo klikněte a vyberte soubor · PDF, fotka, Excel'}
      onFiles={(files) => setJmeno(files[0]?.name ?? null)}
      wrapperClassName={undefined}
      style={SIROKE}
    />
  )
}

export const section: ShowcaseSection = {
  id: 'textova-pole',
  title: '§ Textová pole',
  order: 30,
  note: 'Popisek vždy nad polem — pro netechnické uživatele je plovoucí popisek past.',
  demos: [
    {
      title: 'Prázdné',
      note: 'Výzva je tlumená a lehčím řezem, ať se nesplete s vyplněnou hodnotou.',
      render: () => <TextField label="Název" placeholder="Zadejte název…" style={POLE} />,
    },
    {
      title: 'Vyplněné',
      render: () => <TextField label="Název" defaultValue="Položka A-230" style={POLE} />,
    },
    {
      title: 'Aktivní',
      note: 'Klikněte do pole — zaostření kreslí kroužek 4 px v akcentu, bez posunu obsahu.',
      render: () => <TextField label="Název" defaultValue="Položka A-230" style={POLE} />,
    },
    {
      title: 'Chyba',
      note: 'Hláška říká, co je špatně a co s tím; pole má červený rámeček a aria-invalid.',
      render: () => (
        <TextField label="IČO" defaultValue="1987" error="IČO musí mít 8 číslic." style={POLE} />
      ),
    },
    {
      title: 'Neaktivní',
      note: 'Ztlumené celé pole i s popiskem a nápovědou, ne jen text uvnitř.',
      render: () => (
        <TextField
          label="Externí kód"
          defaultValue="S1-50"
          help="Kód přiřazuje příjemka."
          disabled
          style={POLE}
        />
      ),
    },
    {
      title: 'S ikonou',
      render: () => (
        <TextField
          label="Hledat"
          placeholder="Hledat položku nebo kód…"
          icon={<IconSearch size={18} />}
          style={POLE}
        />
      ),
    },
    {
      title: 'S jednotkou',
      note: 'Jednotka je text, ne tlačítko — nejde na ni kliknout ani se na ni nedá zaostřit.',
      render: () => <TextField label="Cena" defaultValue="5 806" suffix="Kč" style={POLE} />,
    },
    {
      title: 'S nápovědou',
      render: () => (
        <TextField
          label="Externí kód"
          defaultValue="765732344"
          help="Používá se pro párování s externím systémem."
          style={POLE}
        />
      ),
    },
    {
      title: 'Datum',
      note: 'Datum je textové pole s kalendářem vlevo a šipkou vpravo; výběr dne dělá Calendar.',
      render: () => (
        <TextField
          label="Datum"
          defaultValue="7. 9. 2026"
          icon={<IconCalendar size={18} />}
          trailing={<IconChevronDown size={18} />}
          style={POLE}
        />
      ),
    },
    {
      title: 'Rozbalovací',
      note: 'Zavřený výběr; rozbalený stav je v § Formuláře · pokročilé.',
      render: () => <UkazkaVyberu />,
    },
    {
      title: 'Víceřádkové',
      note: 'Táhne se jen svisle — vodorovné tažení by rozbilo šířku formuláře.',
      stack: true,
      render: () => (
        <TextArea
          label="Poznámka"
          defaultValue="Poškozeno při přepravě."
          rows={3}
          style={SIROKE}
        />
      ),
    },
    {
      title: 'Počítadlo',
      note: 'Dotykové cíle 40 px; hodnota se zadává tlačítky, aby nevyskakovala klávesnice.',
      render: () => <UkazkaPocitadla />,
    },
    {
      title: 'Nahrání souboru',
      note: 'Přijímá přetažení i klik; po výběru ukáže jméno souboru.',
      stack: true,
      render: () => <UkazkaNahrani />,
    },
  ],
}
