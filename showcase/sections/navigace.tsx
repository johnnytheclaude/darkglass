import { useState } from 'react'
import { Breadcrumbs } from '../../src/components/Navigation/Breadcrumbs'
import { StepPills } from '../../src/components/Navigation/StepPills'
import { Stepper } from '../../src/components/Navigation/Stepper'
import { TabsUnderline } from '../../src/components/Navigation/TabsUnderline'
import { ToolRail } from '../../src/components/Navigation/ToolRail'
import { TopBar } from '../../src/components/Navigation/TopBar'
import { IconPlus } from '../../src/components/Icons/IconPlus'
import { IconSearch } from '../../src/components/Icons/IconSearch'
import { IconBell } from '../../src/components/Icons/IconBell'
import { IconSettings } from '../../src/components/Icons/IconSettings'
import { IconPencil } from '../../src/components/Icons/IconPencil'
import type { ShowcaseSection } from '../registry'

const ZALOZKY = [
  { key: 'prehled', label: 'Přehled' },
  { key: 'doklady', label: 'Záznamy' },
  { key: 'katalog', label: 'Katalog' },
  { key: 'lide', label: 'Lidé' },
  { key: 'reporty', label: 'Reporty' },
]

function HorniLista() {
  const [aktivni, setAktivni] = useState('prehled')

  return (
    <TopBar
      company="Acme s.r.o."
      store="Pobočka Praha"
      mark="A"
      tabs={ZALOZKY}
      activeTab={aktivni}
      onTabSelect={setAktivni}
      day="pondělí 14. září"
      meta="9:00–18:00"
      user={{ initials: 'SH', name: 'Jan' }}
    />
  )
}

function Panel() {
  const [nastroj, setNastroj] = useState('hledat')

  return (
    <ToolRail
      activeKey={nastroj}
      items={[
        { key: 'novy', label: 'Nový', icon: <IconPlus size={20} />, primary: true },
        { key: 'hledat', label: 'Hledat', icon: <IconSearch size={20} /> },
        { key: 'upozorneni', label: 'Upozornění', icon: <IconBell size={20} />, badge: true },
        { key: 'pomoc', label: 'Pomoc', icon: <IconPencil size={20} /> },
        { key: 'nastaveni', label: 'Nastavení', icon: <IconSettings size={20} /> },
      ].map((n) => ({ ...n, onClick: () => setNastroj(n.key) }))}
    />
  )
}

function Zalozky() {
  const [zalozka, setZalozka] = useState('prehled')

  return (
    <TabsUnderline
      value={zalozka}
      onChange={setZalozka}
      tabs={[
        { key: 'prehled', label: 'Přehled' },
        { key: 'historie', label: 'Historie' },
        { key: 'hotovo', label: 'Hotovo' },
        { key: 'nastaveni', label: 'Nastavení' },
      ]}
    />
  )
}

function Pruvodce() {
  const [krok, setKrok] = useState(2)
  const kroky = [
    { key: 'zdroj', label: 'Zdroj' },
    { key: 'kontrola', label: 'Kontrola' },
    { key: 'udaje', label: 'Údaje' },
    { key: 'souhrn', label: 'Souhrn' },
    { key: 'hotovo', label: 'Hotovo' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      <Stepper steps={kroky} current={krok} onStepSelect={(_, i) => setKrok(i)} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={() => setKrok((k) => Math.max(0, k - 1))}>
          Zpět
        </button>
        <button
          type="button"
          onClick={() => setKrok((k) => Math.min(kroky.length - 1, k + 1))}
        >
          Další krok
        </button>
      </div>
    </div>
  )
}

export const section: ShowcaseSection = {
  id: 'navigace',
  title: '§ Navigace',
  order: 90,
  note: 'Horní lišta říká kam jdu, boční panel co dělám. Nikdy obojí na stejném místě.',
  demos: [
    {
      title: 'Horní lišta',
      note: 'Vybraná záložka je tmavá pilulka; dlouhý název firmy se zkracuje, lišta nepřeteče.',
      wide: true,
      render: () => <HorniLista />,
    },
    {
      title: 'Boční panel nástrojů',
      note: 'Jediná barevná je hlavní akce; odznak nepřečteného sedí na hraně tlačítka.',
      render: () => <Panel />,
    },
    {
      title: 'Drobečková navigace',
      note: 'Poslední drobeček je tučný a neproklikává se — stojím na něm.',
      stack: true,
      render: () => (
        <Breadcrumbs
          items={[
            { key: 'katalog', label: 'Katalog', onClick: () => {} },
            { key: 'polozky', label: 'Položky', onClick: () => {} },
            { key: 'a230', label: 'Položka A-230' },
          ]}
        />
      ),
    },
    {
      title: 'Záložky s podtržením',
      note: 'Přepínají obsah uvnitř obrazovky, ne obrazovky aplikace. V úzkém místě se pruh posouvá do strany.',
      wide: true,
      render: () => <Zalozky />,
    },
    {
      title: 'Průvodce · kroky',
      note: 'Hotové kroky nesou fajfku a dá se do nich vrátit; zbývající jsou ztlumené.',
      wide: true,
      render: () => <Pruvodce />,
    },
    {
      title: 'Kroky jako pilulky',
      note: 'Checklist, kde kroky nejsou lineární: hotový nese fajfku, přeskočený pomlčku, právě probíhající sedí na akcentu.',
      wide: true,
      render: () => (
        <StepPills
          steps={[
            { key: 'firma', label: 'Firma', state: 'done', href: '#firma' },
            { key: 'prodejna', label: 'Prodejna a pokladna', state: 'done', href: '#prodejna' },
            { key: 'tiskarny', label: 'Tiskárny', state: 'current', href: '#tiskarny' },
            { key: 'kategorie', label: 'Kategorie a marže', state: 'todo', href: '#kategorie' },
            { key: 'dodak', label: 'První dodák', state: 'skipped', href: '#dodak' },
            { key: 'stitky', label: 'Štítky', state: 'todo' },
          ]}
        />
      ),
    },
  ],
}
