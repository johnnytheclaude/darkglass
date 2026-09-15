import { useState } from 'react'
import { Checkbox } from '../../src/components/Controls/Checkbox'
import { Chip, RemovableChip } from '../../src/components/Controls/Chip'
import { Radio } from '../../src/components/Controls/Radio'
import { SegmentedControl } from '../../src/components/Controls/SegmentedControl'
import { Slider } from '../../src/components/Controls/Slider'
import { Switch } from '../../src/components/Controls/Switch'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná — knihovna doménu nezná. */

const RADA = { display: 'flex', flexDirection: 'column', gap: 12 } as const

function UkazkaZaskrtavatek() {
  const [zasilat, setZasilat] = useState(true)
  return (
    <div style={RADA}>
      <Checkbox label="Zasílat upozornění" checked={false} onChange={() => {}} />
      <Checkbox
        label="Zasílat upozornění"
        checked={zasilat}
        onChange={(event) => setZasilat(event.target.checked)}
      />
      <Checkbox label="Zasílat upozornění" disabled />
    </div>
  )
}

function UkazkaPrepinacu() {
  const [volba, setVolba] = useState('a')
  return (
    <div style={RADA}>
      <Radio
        name="showcase-volba"
        label="Možnost A"
        value="a"
        checked={volba === 'a'}
        onChange={() => setVolba('a')}
      />
      <Radio
        name="showcase-volba"
        label="Možnost B"
        value="b"
        checked={volba === 'b'}
        onChange={() => setVolba('b')}
      />
      <Radio name="showcase-volba" label="Možnost C (neaktivní)" value="c" disabled />
    </div>
  )
}

function UkazkaVypinacu() {
  const [tisk, setTisk] = useState(true)
  return (
    <div style={RADA}>
      <Switch
        label="Vytisknout"
        checked={tisk}
        onChange={(event) => setTisk(event.target.checked)}
      />
      <Switch label="Vytisknout" checked={false} onChange={() => {}} />
      <Switch label="Vytisknout" defaultChecked disabled />
    </div>
  )
}

function UkazkaPosuvniku({ gradient = false }: { gradient?: boolean }) {
  const [hodnota, setHodnota] = useState(gradient ? 55 : 70)
  return (
    <Slider
      label="Intenzita"
      valueLabel={`${hodnota} %`}
      value={hodnota}
      onChange={setHodnota}
      gradient={gradient}
      style={{ maxWidth: 300 }}
    />
  )
}

function UkazkaSegmentovanych() {
  const [dve, setDve] = useState('souhrn')
  const [tri, setTri] = useState('dnes')
  const [ctyri, setCtyri] = useState('vse')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
      <SegmentedControl
        label="Zobrazení"
        options={[
          { value: 'souhrn', label: 'Souhrn' },
          { value: 'detail', label: 'Detail' },
        ]}
        value={dve}
        onChange={setDve}
      />
      <SegmentedControl
        label="Období"
        options={[
          { value: 'dnes', label: 'Dnes' },
          { value: 'tyden', label: 'Týden' },
          { value: 'mesic', label: 'Měsíc' },
        ]}
        value={tri}
        onChange={setTri}
      />
      <SegmentedControl
        label="Kategorie"
        options={[
          { value: 'vse', label: 'Vše' },
          { value: 'a', label: 'Kategorie A' },
          { value: 'b', label: 'Kategorie B' },
          { value: 'archiv', label: 'Archiv' },
        ]}
        value={ctyri}
        onChange={setCtyri}
      />
    </div>
  )
}

function UkazkaStitku() {
  const [jenAktivni, setJenAktivni] = useState(true)
  const [stitky, setStitky] = useState(['Kategorie A', 'Praha'])
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
      <Chip selected={jenAktivni} onClick={() => setJenAktivni((stav) => !stav)}>
        Jen aktivní
      </Chip>
      <Chip>Jen skladem</Chip>
      <Chip count={4}>Ve frontě</Chip>
      {stitky.map((stitek) => (
        <RemovableChip
          key={stitek}
          onRemove={() => setStitky((seznam) => seznam.filter((polozka) => polozka !== stitek))}
        >
          {stitek}
        </RemovableChip>
      ))}
    </div>
  )
}

export const section: ShowcaseSection = {
  id: 'prepinace-vyber',
  title: '§ Přepínače a výběr',
  order: 40,
  note: 'Zapnuto vždy poznáš barvou i polohou, ne jen barvou.',
  demos: [
    {
      title: 'Zaškrtávátka',
      note: 'Celý řádek včetně popisku je klikací; neaktivní na 45 % krytí.',
      stack: true,
      render: () => <UkazkaZaskrtavatek />,
    },
    {
      title: 'Přepínače volby',
      note: 'Zapnutá volba má akcentní kolečko s tečkou — ne jen jinou barvu.',
      stack: true,
      render: () => <UkazkaPrepinacu />,
    },
    {
      title: 'Vypínače',
      note: 'Knoflík se přesouvá, takže stav je vidět i na černobílém displeji.',
      stack: true,
      render: () => <UkazkaVypinacu />,
    },
    {
      title: 'Posuvník',
      note: 'Skutečné táhlo — myš, prst i šipky na klávesnici.',
      stack: true,
      render: () => <UkazkaPosuvniku />,
    },
    {
      title: 'Posuvník s přechodem',
      note: 'Stupnice sama nese význam, proto nemá jednobarevnou výplň.',
      stack: true,
      render: () => <UkazkaPosuvniku gradient />,
    },
    {
      title: 'Segmentované přepínače',
      note: 'Dvě až čtyři volby; delší popisky se nezalomí, pilulka se natáhne.',
      stack: true,
      wide: true,
      render: () => <UkazkaSegmentovanych />,
    },
    {
      title: 'Štítky a odznaky',
      note: 'Filtr, počítadlo a odstranitelný štítek — křížek je vlastní tlačítko.',
      stack: true,
      wide: true,
      render: () => <UkazkaStitku />,
    },
  ],
}
