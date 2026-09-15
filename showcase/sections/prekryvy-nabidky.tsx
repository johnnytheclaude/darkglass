import { useState } from 'react'
import { Button } from '../../src/components/Buttons/Button'
import { IconAlert } from '../../src/components/Icons/IconAlert'
import { IconFile } from '../../src/components/Icons/IconFile'
import { IconPencil } from '../../src/components/Icons/IconPencil'
import { IconPlus } from '../../src/components/Icons/IconPlus'
import { IconUpload } from '../../src/components/Icons/IconUpload'
import { IconX } from '../../src/components/Icons/IconX'
import { ConfirmDialog } from '../../src/components/Overlays/ConfirmDialog'
import { Drawer, DrawerRow } from '../../src/components/Overlays/Drawer'
import { Menu, MenuItem, MenuSeparator } from '../../src/components/Overlays/Menu'
import { SectionHeader } from '../../src/components/Overlays/SectionHeader'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná — knihovna doménu nezná. */

const UDAJE = [
  { label: 'Externí kód', value: '765732344' },
  { label: 'Jednotka', value: 'ks' },
  { label: 'Katalogem', value: '5 ks' },
  { label: 'Rezervováno', value: '0 ks' },
  { label: 'Jednotková cena', value: '2 399 Kč' },
  { label: 'Celková hodnota', value: '11 995 Kč' },
]

function UkazkaDialogu() {
  return (
    <ConfirmDialog
      title="Opravdu odstranit položku?"
      body="Položka A-230 · odstraněním přijdete o 1 ks v hodnotě 2 399 Kč. Zůstanou 4 ks. Tuhle akci nejde vrátit zpět."
      icon={<IconAlert size={22} />}
      onClose={() => {}}
      footer={
        <>
          <Button variant="secondary">Zrušit</Button>
          <Button variant="danger" iconStart={<IconX size={16} />}>
            Odstranit
          </Button>
        </>
      }
    />
  )
}

function UkazkaPanelu() {
  return (
    <Drawer
      eyebrow="Položka"
      title="Položka A-230"
      onClose={() => {}}
      footer={
        <>
          <Button variant="secondary" iconStart={<IconFile size={16} />}>
            Vytisknout
          </Button>
          <Button iconStart={<IconPlus size={16} />}>Doplnit</Button>
        </>
      }
    >
      {UDAJE.map((udaj) => (
        <DrawerRow key={udaj.label} label={udaj.label} value={udaj.value} />
      ))}
    </Drawer>
  )
}

function UkazkaNabidky() {
  const [vybrano, setVybrano] = useState('upravit')
  return (
    <Menu label="Akce položky">
      <MenuItem
        icon={<IconPencil size={17} />}
        active={vybrano === 'upravit'}
        onClick={() => setVybrano('upravit')}
      >
        Upravit položku
      </MenuItem>
      <MenuItem
        icon={<IconFile size={17} />}
        active={vybrano === 'tisk'}
        onClick={() => setVybrano('tisk')}
      >
        Zařadit k tisku
      </MenuItem>
      <MenuItem
        icon={<IconPlus size={17} />}
        active={vybrano === 'duplikovat'}
        onClick={() => setVybrano('duplikovat')}
      >
        Duplikovat
      </MenuItem>
      <MenuSeparator />
      <MenuItem
        icon={<IconUpload size={17} />}
        active={vybrano === 'presunout'}
        onClick={() => setVybrano('presunout')}
      >
        Přesunout jinam
      </MenuItem>
      <MenuItem danger icon={<IconX size={17} />} onClick={() => setVybrano('odstranit')}>
        Odstranit položku
      </MenuItem>
    </Menu>
  )
}

export const section: ShowcaseSection = {
  id: 'prekryvy-nabidky',
  title: '§ Překryvy a nabídky',
  order: 108,
  note: 'Překryv je vždy neprůhledný — sklo přes sklo se nedá číst.',
  demos: [
    {
      title: 'Potvrzovací dialog',
      note: 'Text pod otázkou nese následek: co zmizí, co zůstane a že to nejde vrátit.',
      stack: true,
      wide: true,
      render: () => <UkazkaDialogu />,
    },
    {
      title: 'Boční panel s detailem',
      note: 'Hlavička i patička stojí, prostředek se roluje — tlačítka zůstanou vidět.',
      stack: true,
      wide: true,
      render: () => <UkazkaPanelu />,
    },
    {
      title: 'Rozbalovací nabídka',
      note: 'Nevratná akce je červená a stojí až pod linkou, ne mezi běžnými.',
      stack: true,
      render: () => <UkazkaNabidky />,
    },
    {
      title: 'Nadpis sekce s akcí',
      note: 'Na úzkém okně se akce zalomí pod nadpis, nikdy se neuřízne.',
      stack: true,
      wide: true,
      render: () => (
        <SectionHeader
          title="Poslední záznamy"
          subtitle="Za posledních 7 dní"
          action={<button type="button">Zobrazit vše ›</button>}
        />
      ),
    },
  ],
}
