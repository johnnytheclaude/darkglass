import { useState } from 'react'
import { SelectField } from '../../src/components/Fields/SelectField'
import { Autocomplete } from '../../src/components/Forms/Autocomplete'
import { FileList, FileRow } from '../../src/components/Forms/FileList'
import { MultiSelectField } from '../../src/components/Forms/MultiSelectField'
import { OtpField } from '../../src/components/Forms/OtpField'
import { PasswordField } from '../../src/components/Forms/PasswordField'
import { RangeSlider } from '../../src/components/Forms/RangeSlider'
import { Rating } from '../../src/components/Forms/Rating'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná — knihovna doménu nezná. */

const POLE = { maxWidth: 320, width: '100%' } as const

const FIRMY = [
  { value: 'alfa', label: 'Alfa a.s.' },
  { value: 'beta', label: 'Beta s.r.o.' },
  { value: 'gama', label: 'Gama group' },
  { value: 'delta', label: 'Delta partners' },
]

const STITKY = [
  { value: 'kategorie-a', label: 'Kategorie A' },
  { value: 'aktivni', label: 'Aktivní' },
  { value: 'praha', label: 'Praha' },
  { value: 'akce', label: 'V akci' },
]

const NAVRHY = [
  { value: 'a230', label: 'Položka A-230', thumb: <span /> },
  { value: 'a240', label: 'Položka A-240', thumb: <span /> },
  { value: 'b500', label: 'Položka B-500', thumb: <span /> },
]

function UkazkaRozbaleneho() {
  const [value, setValue] = useState('beta')
  const [open, setOpen] = useState(true)
  return (
    <SelectField
      label="Kategorie"
      required
      options={FIRMY}
      value={value}
      open={open}
      onOpenChange={setOpen}
      onValueChange={setValue}
      style={POLE}
    />
  )
}

function UkazkaVicenasobneho() {
  const [values, setValues] = useState(['kategorie-a', 'aktivni', 'praha'])
  return (
    <MultiSelectField
      label="Štítky"
      options={STITKY}
      values={values}
      onValuesChange={setValues}
      style={{ maxWidth: 340, width: '100%' }}
    />
  )
}

function UkazkaNaseptavace() {
  const [text, setText] = useState('pol')
  const nalezene = NAVRHY.filter((navrh) =>
    String(navrh.label).toLowerCase().includes(text.toLowerCase()),
  )
  return (
    <Autocomplete
      value={text}
      placeholder="Hledat položku…"
      options={nalezene}
      open={text.length > 0 && nalezene.length > 0}
      activeValue={nalezene[0]?.value}
      onChange={(event) => setText(event.target.value)}
      onSelectOption={(value) =>
        setText(String(NAVRHY.find((navrh) => navrh.value === value)?.label ?? value))
      }
      style={POLE}
    />
  )
}

function UkazkaHesla() {
  const [heslo, setHeslo] = useState('Prodejna26+')
  const sila = Math.min(4, Math.floor(heslo.length / 3))
  const slovy = ['', 'Slabé heslo', 'Průměrné heslo', 'Silné heslo', 'Silné heslo']
  return (
    <PasswordField
      label="Heslo"
      required
      value={heslo}
      onChange={(event) => setHeslo(event.target.value)}
      strength={sila}
      strengthLabel={slovy[sila]}
      style={{ maxWidth: 300, width: '100%' }}
    />
  )
}

function UkazkaKodu() {
  const [kod, setKod] = useState('492')
  const [parovaci, setParovaci] = useState('AB3')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <OtpField label="Kód z SMS" value={kod} onChange={setKod} />
      {/* Párovací kód pokladny má písmena i oddělovač — proto varianta alnum. */}
      <OtpField
        label="Párovací kód z Adminu"
        alphabet="alnum"
        length={8}
        separatorAfter={4}
        value={parovaci}
        onChange={setParovaci}
        help="Platí 15 minut a použije se jednou"
      />
    </div>
  )
}

function UkazkaHodnoceni() {
  const [hodnota, setHodnota] = useState(4)
  return <Rating value={hodnota} onChange={setHodnota} />
}

function UkazkaRozsahu() {
  const [rozsah, setRozsah] = useState<[number, number]>([2000, 8000])
  return (
    <RangeSlider
      label="Cena"
      min={0}
      max={10000}
      step={100}
      value={rozsah}
      onChange={setRozsah}
      valueLabel={`${rozsah[0].toLocaleString('cs-CZ')} – ${rozsah[1].toLocaleString('cs-CZ')} Kč`}
      style={{ maxWidth: 300, width: '100%' }}
    />
  )
}

function UkazkaSouboru() {
  const [soubory, setSoubory] = useState([
    { id: 'dodaci-list.pdf', size: '2,4 MB' as string | undefined, progress: undefined as number | undefined },
    { id: 'foto-zbozi.jpg', size: '60 %' as string | undefined, progress: 60 as number | undefined },
  ])

  return (
    <FileList style={{ maxWidth: 400, width: '100%' }}>
      {soubory.map((soubor) => (
        <FileRow
          key={soubor.id}
          name={soubor.id}
          size={soubor.size}
          progress={soubor.progress}
          onRemove={() => setSoubory((prev) => prev.filter((item) => item.id !== soubor.id))}
        />
      ))}
    </FileList>
  )
}

export const section: ShowcaseSection = {
  id: 'formulare-pokrocile',
  title: '§ Formuláře · pokročilé',
  order: 35,
  note: 'Rozbalené stavy, vícenásobný výběr, hesla a soubory.',
  demos: [
    {
      title: 'Rozbalený výběr',
      note: 'Nabídka je v toku pod polem, ne v překryvu — při odrolování zůstane u pole.',
      stack: true,
      render: () => <UkazkaRozbaleneho />,
    },
    {
      title: 'Vícenásobný výběr',
      note: 'Štítky se zalamují do dalšího řádku; pole se natáhne, nikdy nepřeteče.',
      stack: true,
      render: () => <UkazkaVicenasobneho />,
    },
    {
      title: 'Našeptávač',
      note: 'Filtruje aplikace, ne knihovna. Smažte text — nabídka zmizí.',
      stack: true,
      render: () => <UkazkaNaseptavace />,
    },
    {
      title: 'Heslo',
      note: 'Oko přepíná zobrazení; sílu počítá aplikace a posílá ji jako číslo 0–4.',
      stack: true,
      render: () => <UkazkaHesla />,
    },
    {
      title: 'Ověřovací kód',
      note: 'Píše se plynule, Backspace se vrací a vložení celého kódu ho rozepíše.',
      // Šest políček po 50 px se do sloupce rejstříku nevejde a zalomilo by se;
      // v aplikaci stojí kód na celé šířce formuláře, tak ho tak ukazuje i showcase.
      wide: true,
      render: () => <UkazkaKodu />,
    },
    {
      title: 'Hodnocení',
      render: () => <UkazkaHodnoceni />,
    },
    {
      title: 'Rozsah',
      note: 'Dvě skutečná táhla — myš, prst i šipky na klávesnici; přes sebe se nepřehodí.',
      stack: true,
      render: () => <UkazkaRozsahu />,
    },
    {
      title: 'Nahrané soubory',
      note: 'Dokud se soubor nahrává, je místo velikosti procento a pruh postupu.',
      stack: true,
      render: () => <UkazkaSouboru />,
    },
  ],
}
