import { useState } from 'react'
import { Button } from '../../src/components/Buttons/Button'
import { TextField } from '../../src/components/Fields/TextField'
import { IconAlert } from '../../src/components/Icons/IconAlert'
import { IconCheck } from '../../src/components/Icons/IconCheck'
import { IconFile } from '../../src/components/Icons/IconFile'
import { IconPencil } from '../../src/components/Icons/IconPencil'
import { IconPlus } from '../../src/components/Icons/IconPlus'
import { IconUpload } from '../../src/components/Icons/IconUpload'
import { IconX } from '../../src/components/Icons/IconX'
import { ConfirmDialog } from '../../src/components/Overlays/ConfirmDialog'
import { DialogActions } from '../../src/components/Overlays/DialogActions'
import { Drawer, DrawerRow } from '../../src/components/Overlays/Drawer'
import { Menu, MenuItem, MenuSeparator } from '../../src/components/Overlays/Menu'
import { SectionHeader } from '../../src/components/Overlays/SectionHeader'
import { StatusModal, StatusModalLine } from '../../src/components/Pos/StatusModal'
import { FormDialog } from '../../src/components/System/FormDialog'
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

function UkazkaFormulare() {
  const [ptamSe, setPtamSe] = useState(false)

  if (ptamSe) {
    return (
      <ConfirmDialog
        title="Opravdu záznam odstranit?"
        body="Záznam ZÁZ-2026-000021 zmizí i z přehledů. Tuhle akci nejde vrátit zpět."
        icon={<IconAlert size={22} />}
        onClose={() => setPtamSe(false)}
        footer={
          <DialogActions>
            <Button variant="secondary" onClick={() => setPtamSe(false)}>
              Zrušit
            </Button>
            <Button variant="danger" onClick={() => setPtamSe(false)}>
              Odstranit
            </Button>
          </DialogActions>
        }
      />
    )
  }

  return (
    <FormDialog
      title="Upravit záznam"
      subtitle="Vyplňte povinná pole označená hvězdičkou."
      onClose={() => {}}
      footer={
        <DialogActions
          destructive={
            <Button variant="dangerSoft" onClick={() => setPtamSe(true)}>
              Odstranit
            </Button>
          }
        >
          <Button variant="secondary">Zrušit</Button>
          <Button variant="primary">Uložit</Button>
        </DialogActions>
      }
    >
      <TextField label="Název" required defaultValue="Zimní sako A-230" />
      <TextField label="Poznámka" placeholder="Nepovinný text…" />
    </FormDialog>
  )
}

function UkazkaStavu() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
      <StatusModal
        state="progress"
        title="Čekám na terminál"
        meta="GP tom · 1 890 Kč · přiložte kartu"
        hint="Platbu jde zrušit na terminálu i tady; účet zůstane rozdělaný."
        touch
        footer={
          <DialogActions
            touch
            destructive={<Button variant="dangerSoft">Zrušit platbu</Button>}
          >
            <Button variant="secondary">Zaplatit jinak</Button>
          </DialogActions>
        }
      />
      <StatusModal
        state="success"
        icon={<IconCheck size={22} />}
        title="Zaplaceno kartou"
        meta="GP tom · 1 890 Kč · Mastercard 7789 · autorizace 304163"
        touch
        onClose={() => {}}
        footer={
          <DialogActions touch>
            <Button variant="secondary">Vytisknout znovu</Button>
            <Button variant="primary">Hotovo</Button>
          </DialogActions>
        }
      />
      <StatusModal
        state="error"
        icon={<IconAlert size={22} />}
        title="3 doklady se nepodařilo odeslat"
        meta="InvoiceHub · poslední pokus 14:31 · odpověď 401 Unauthorized"
        hint="Klíč nejspíš vypršel. Opraví ho majitel v Nastavení → Integrace; fronta pak odejde sama."
        touch
        onClose={() => {}}
        footer={
          <DialogActions touch>
            <Button variant="secondary">Upozornit majitele</Button>
            <Button variant="primary">Zkusit znovu</Button>
          </DialogActions>
        }
      >
        <StatusModalLine label="P01-2026-000122 · 14:12 · 1 890 Kč" status="401" error />
        <StatusModalLine label="P01-2026-000123 · 14:20 · 16 872 Kč" status="401" error />
      </StatusModal>
      <StatusModal
        state="canceled"
        icon={<IconX size={22} />}
        title="Platba zrušena"
        meta="GP tom · zrušeno na terminálu ve 14:33"
        touch
        onClose={() => {}}
        footer={
          <DialogActions touch>
            <Button variant="primary">Zpět na účet</Button>
          </DialogActions>
        }
      />
    </div>
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
      title: 'Dialog s formulářem a nevratnou akcí',
      note: 'Odstranit stojí samo vlevo, Uložit vpravo — mezi nimi je Zrušit. Klik na Odstranit se ještě zeptá; Escape dialog zavře.',
      stack: true,
      wide: true,
      render: () => <UkazkaFormulare />,
    },
    {
      title: 'Stavový modál — čekání, hotovo, chyba, zrušení',
      note: 'Čekání na terminál drží kolečko a hlásí se čtečce; akce mají 52 px na prst. Z čekání se odchází akcí Zrušit platbu (dosažitelnou tabem), z ostatních stavů Escapem nebo křížkem.',
      stack: true,
      wide: true,
      render: () => <UkazkaStavu />,
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
