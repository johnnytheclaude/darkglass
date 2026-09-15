import { useState } from 'react'
import { Accordion, AccordionSection } from '../../src/components/Navigation/Accordion'
import { BulkActionBar } from '../../src/components/Navigation/BulkActionBar'
import {
  CommandGroup,
  CommandItem,
  CommandPalette,
} from '../../src/components/Navigation/CommandPalette'
import { PageHeader } from '../../src/components/Navigation/PageHeader'
import { Sidebar, SidebarGroup, SidebarItem } from '../../src/components/Navigation/Sidebar'
import { TabsPill } from '../../src/components/Navigation/TabsPill'
import { TreeItem, TreeView } from '../../src/components/Navigation/TreeView'
import { Button } from '../../src/components/Buttons/Button'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná — knihovna doménu nezná. */

function SidebarDemo() {
  const [active, setActive] = useState('prehled')
  return (
    <Sidebar aria-label="Ukázka navigace" style={{ maxWidth: 260 }}>
      <SidebarGroup>Hlavní</SidebarGroup>
      <SidebarItem active={active === 'prehled'} onClick={() => setActive('prehled')}>
        Přehled
      </SidebarItem>
      <SidebarItem
        active={active === 'zaznamy'}
        badge={12}
        onClick={() => setActive('zaznamy')}
      >
        Záznamy
      </SidebarItem>
      <SidebarItem active={active === 'katalog'} onClick={() => setActive('katalog')}>
        Katalog
      </SidebarItem>
      <SidebarGroup>Tým</SidebarGroup>
      <SidebarItem active={active === 'lide'} onClick={() => setActive('lide')}>
        Lidé
      </SidebarItem>
      <SidebarItem active={active === 'role'} onClick={() => setActive('role')}>
        Role
      </SidebarItem>
      <SidebarGroup>Systém</SidebarGroup>
      <SidebarItem active={active === 'nastaveni'} onClick={() => setActive('nastaveni')}>
        Nastavení
      </SidebarItem>
      <SidebarItem
        active={active === 'integrace'}
        badge={2}
        onClick={() => setActive('integrace')}
      >
        Integrace
      </SidebarItem>
    </Sidebar>
  )
}

function TabsDemo() {
  const [tab, setTab] = useState('vse')
  return (
    <TabsPill
      label="Pohled na seznam"
      value={tab}
      onValueChange={setTab}
      items={[
        { key: 'vse', label: 'Vše' },
        { key: 'aktivni', label: 'Aktivní', count: 8 },
        { key: 'archiv', label: 'Archiv' },
        { key: 'koncepty', label: 'Koncepty', count: 3 },
        { key: 'smazane', label: 'Smazané', disabled: true },
      ]}
    />
  )
}

function AccordionDemo() {
  const [open, setOpen] = useState<string | null>('obecne')
  return (
    <Accordion style={{ maxWidth: 420 }}>
      <AccordionSection
        title="Obecné nastavení"
        open={open === 'obecne'}
        onToggle={(next) => setOpen(next ? 'obecne' : null)}
      >
        Tady jsou pole, která se zobrazí po rozbalení sekce. Sekce drží obsah schovaný, dokud ho
        uživatel nepotřebuje.
      </AccordionSection>
      <AccordionSection
        title="Oznámení"
        open={open === 'oznameni'}
        onToggle={(next) => setOpen(next ? 'oznameni' : null)}
      >
        Kdy a komu chodí upozornění.
      </AccordionSection>
      <AccordionSection
        title="Pokročilé"
        open={open === 'pokrocile'}
        onToggle={(next) => setOpen(next ? 'pokrocile' : null)}
      >
        Věci, které běžný provoz nepotřebuje.
      </AccordionSection>
    </Accordion>
  )
}

function TreeDemo() {
  const [selected, setSelected] = useState('a-230')
  const [openKatalog, setOpenKatalog] = useState(true)
  return (
    <TreeView label="Katalog" style={{ maxWidth: 300 }}>
      <TreeItem
        expandable
        expanded={openKatalog}
        onToggle={setOpenKatalog}
        selected={selected === 'katalog'}
      >
        Katalog
      </TreeItem>
      {openKatalog ? (
        <>
          <TreeItem level={1} selected={selected === 'kat-a'} onClick={() => setSelected('kat-a')}>
            Kategorie A
          </TreeItem>
          <TreeItem level={2} selected={selected === 'a-230'} onClick={() => setSelected('a-230')}>
            Položka A-230
          </TreeItem>
          <TreeItem level={2} selected={selected === 'a-240'} onClick={() => setSelected('a-240')}>
            Položka A-240
          </TreeItem>
          <TreeItem level={1} selected={selected === 'kat-b'} onClick={() => setSelected('kat-b')}>
            Kategorie B
          </TreeItem>
        </>
      ) : null}
      <TreeItem selected={selected === 'archiv'} onClick={() => setSelected('archiv')}>
        Archiv
      </TreeItem>
    </TreeView>
  )
}

function PaletteDemo() {
  const [value, setValue] = useState('nov')
  return (
    <CommandPalette
      value={value}
      onValueChange={setValue}
      placeholder="Co chcete udělat?"
      style={{ maxWidth: 460 }}
    >
      <CommandGroup>Akce</CommandGroup>
      <CommandItem active shortcut="N">
        Nový záznam
      </CommandItem>
      <CommandItem>Nová položka v katalogu</CommandItem>
      <CommandItem>Nový uživatel</CommandItem>
    </CommandPalette>
  )
}

export const section: ShowcaseSection = {
  id: 'navigace-rozsireni',
  title: '§ Navigace · rozšíření',
  order: 120,
  note: 'Boční menu, záložky, rozbalovací sekce, strom, paleta a hlavička stránky.',
  demos: [
    {
      title: 'Boční menu',
      note: 'Skupiny a položky s počty; aktivní položka nese i aria-current, ne jen barvu.',
      render: () => <SidebarDemo />,
    },
    {
      title: 'Záložky · pilulky',
      note: 'Přepínač pohledů na jeden seznam — myší i šipkami; vybraná záložka je plná, neaktivní se přeskočí.',
      wide: true,
      render: () => <TabsDemo />,
    },
    {
      title: 'Rozbalovací sekce',
      note: 'Obsah se vykreslí až po rozbalení; šipka se otočí.',
      render: () => <AccordionDemo />,
    },
    {
      title: 'Stromová struktura',
      note: 'Zanoření po 18 px, vybraný uzel v akcentu. Kořen jde sbalit.',
      render: () => <TreeDemo />,
    },
    {
      title: 'Vyhledávací paleta',
      note: 'Pole nahoře, pod ním nabídnuté akce se zkratkou.',
      render: () => <PaletteDemo />,
    },
    {
      title: 'Hlavička stránky',
      note: 'Šipka zpět, nadpis s popiskem, akce vpravo. Na úzké šířce se akce zalomí.',
      wide: true,
      render: () => (
        <PageHeader
          onBack={() => undefined}
          title="Položka A-230"
          subtitle="Katalog · upraveno před 2 hodinami"
          style={{ maxWidth: 560 }}
          actions={
            <>
              <Button variant="secondary">Upravit</Button>
              <Button variant="primary">Uložit</Button>
            </>
          }
        />
      ),
    },
    {
      title: 'Lišta hromadných akcí',
      note: 'Objeví se, jakmile je něco vybrané. Akce se na úzké šířce zalomí pod otázku.',
      wide: true,
      render: () => (
        <BulkActionBar count="3 vybrané" hint="Co s nimi?" style={{ maxWidth: 620 }}>
          {/* Návrh má na liště jemně vyplněná tlačítka; plná bílá (secondary) by
              na bílém pruhu zmizela, proto outline a danger-soft. */}
          <Button variant="outline">Exportovat</Button>
          <Button variant="outline">Archivovat</Button>
          <Button variant="dangerSoft">Smazat</Button>
        </BulkActionBar>
      ),
    },
  ],
}
