import { useState } from 'react'
import type { ReactNode } from 'react'
import { AccountMenu } from '../../src/components/System/AccountMenu'
import { Banner } from '../../src/components/System/Banner'
import { Divider } from '../../src/components/System/Divider'
import { ErrorPage } from '../../src/components/System/ErrorPage'
import { FormDialog } from '../../src/components/System/FormDialog'
import { Kbd } from '../../src/components/System/Kbd'
import { LoginCard } from '../../src/components/System/LoginCard'
import { SettingRow, SettingsList } from '../../src/components/System/SettingRow'
import { Spinner } from '../../src/components/System/Spinner'
import { Button } from '../../src/components/Buttons/Button'
import { IconAlert } from '../../src/components/Icons/IconAlert'
import { IconLogout } from '../../src/components/Icons/IconLogout'
import { IconMoon } from '../../src/components/Icons/IconMoon'
import { IconSettings } from '../../src/components/Icons/IconSettings'
import { IconUser } from '../../src/components/Icons/IconUser'
import type { ShowcaseSection } from '../registry'

/* Pole a přepínače jsou zástupné jen pro ukázku — skutečné komponenty
   § Textová pole a § Přepínače a výběr dělají tasky #480 a #481. Dialog,
   přihlášení a řádky nastavení jsou rámy, do kterých se vloží. */

function DemoField({ label, value, placeholder }: { label: string; value?: string; placeholder?: string }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 7, width: '100%' }}>
      <span style={{ color: 'var(--text-2)', fontSize: 13, fontWeight: 600 }}>{label}</span>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          height: 46,
          padding: '0 14px',
          borderRadius: 13,
          backgroundColor: 'var(--surface-05)',
          color: value ? 'var(--text-1)' : 'var(--text-3)',
          fontSize: 14.5,
        }}
      >
        {value ?? placeholder}
      </span>
    </label>
  )
}

function DemoToggle({ on = true }: { on?: boolean }) {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: on ? 'flex-end' : 'flex-start',
        boxSizing: 'border-box',
        width: 50,
        height: 29,
        padding: '0 3px',
        borderRadius: 999,
        backgroundColor: on ? 'var(--accent)' : 'var(--track-off)',
      }}
    >
      <span
        style={{ width: 23, height: 23, borderRadius: '50%', backgroundColor: 'var(--surface-2)' }}
      />
    </span>
  )
}

function DemoSelect({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        height: 38,
        padding: '0 12px',
        borderRadius: 11,
        backgroundColor: 'var(--surface-15)',
        color: 'var(--text-1)',
        fontSize: 13.5,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  )
}

function Pruhy() {
  const [videt, setVidet] = useState(true)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      {videt ? (
        <Banner actionLabel="Prodloužit" onAction={() => {}} onClose={() => setVidet(false)}>
          Zkušební období končí za 5 dní. Po vypršení se účet uzamkne.
        </Banner>
      ) : (
        <Button variant="secondary" size="s" onClick={() => setVidet(true)}>
          Vrátit pruh
        </Button>
      )}
      <Banner tone="danger" actionLabel="Zkusit znovu" onAction={() => {}}>
        Doklady se nepodařilo odeslat do účetnictví.
      </Banner>
      <Banner tone="success">Katalog je srovnaný s Adminem.</Banner>
    </div>
  )
}

function Dialog() {
  return (
    <FormDialog
      title="Nový záznam"
      subtitle="Vyplňte povinná pole označená hvězdičkou."
      onClose={() => {}}
      footer={
        <>
          <Button variant="secondary">Zrušit</Button>
          <Button variant="primary">Vytvořit</Button>
        </>
      }
    >
      <DemoField label="Název *" placeholder="Zadejte název…" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, width: '100%' }}>
        <div style={{ flex: '1 1 140px', minWidth: 0 }}>
          <DemoField label="Kategorie" value="Kategorie A" />
        </div>
        <div style={{ flex: '1 1 140px', minWidth: 0 }}>
          <DemoField label="Datum" value="14. 9. 2026" />
        </div>
      </div>
      <DemoField label="Poznámka" placeholder="Nepovinný text…" />
    </FormDialog>
  )
}

export const section: ShowcaseSection = {
  id: 'systemove-prvky',
  title: '§ Systémové prvky',
  order: 95,
  note: 'Načítání, oznámení přes celou šířku, dialogy s formulářem a chybové stránky.',
  demos: [
    {
      title: 'Načítání',
      note: 'Tři hrany podle návrhu (36 / 52 / 72). Stopa je ztlumená, oblouk v akcentu.',
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Spinner size="s" label="Načítám katalog" />
          <Spinner size="m" label="Načítám katalog" />
          <Spinner size="l" label="Načítám katalog" />
        </div>
      ),
    },
    {
      title: 'Oddělovače',
      note: 'Linka je vlasová v obou motivech; popisek ji přeruší uprostřed.',
      stack: true,
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: 360, maxWidth: '100%' }}>
          <Divider />
          <Divider label="nebo" />
        </div>
      ),
    },
    {
      title: 'Klávesová zkratka',
      note: 'Každá klávesa je vlastní dlaždice — je vidět, kolik se jich mačká.',
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Kbd keys={['⌘', 'K']} />
          <Kbd keys={['F9']} />
          <Kbd keys={['Ctrl', 'Shift', 'P']} />
        </div>
      ),
    },
    {
      title: 'Pruh přes celou šířku',
      note: 'Akce i zavření na jedné straně; v úzkém místě se tlačítko zalomí pod text.',
      wide: true,
      render: () => <Pruhy />,
    },
    {
      title: 'Dialog s formulářem',
      note: 'Nadpis říká co vzniká, tlačítka jsou vpravo dole a hlavní je poslední.',
      wide: true,
      render: () => <Dialog />,
    },
    {
      title: 'Nabídka účtu',
      note: 'Hlavička říká, kdo je přihlášený; odhlášení je oddělené linkou a červené.',
      render: () => (
        <AccountMenu
          name="Jan Novák"
          email="jan@acme.cz"
          initials="JN"
          items={[
            { key: 'profil', label: 'Můj profil', icon: <IconUser size={17} /> },
            { key: 'nastaveni', label: 'Nastavení', icon: <IconSettings size={17} /> },
            { key: 'tmavy', label: 'Tmavý režim', icon: <IconMoon size={17} /> },
            {
              key: 'odhlasit',
              label: 'Odhlásit se',
              icon: <IconLogout size={17} />,
              danger: true,
              separated: true,
            },
          ]}
        />
      ),
    },
    {
      title: 'Chybová stránka',
      note: 'Jedna cesta zpět, žádné technické detaily. Text je vystředěný.',
      wide: true,
      render: () => (
        <ErrorPage
          code="404"
          title="Tahle stránka neexistuje"
          icon={<IconAlert size={30} />}
          action={<Button variant="primary">Zpět na úvod</Button>}
        >
          Odkaz je nejspíš zastaralý nebo jste se překlepli v adrese.
        </ErrorPage>
      ),
    },
    {
      title: 'Přihlášení',
      note: 'Hlavní tlačítko je přes celou šířku, firemní účet stojí až pod oddělovačem.',
      render: () => (
        <LoginCard title="Přihlaste se" mark="A" submit={<Button variant="primary" size="l" block>Pokračovat</Button>} alternative={<Button variant="outline" size="l" block>Přihlásit přes firemní účet</Button>}>
          <DemoField label="E-mail" value="jan@acme.cz" />
          <DemoField label="Heslo" value="••••••••" />
        </LoginCard>
      ),
    },
    {
      title: 'Řádky nastavení',
      note: 'Ovládání vpravo, vysvětlení pod názvem; na úzké obrazovce se ovládání zalomí.',
      wide: true,
      render: () => (
        <SettingsList>
          <SettingRow
            title="Dvoufázové ověření"
            description="Vyžadovat kód z aplikace při každém přihlášení"
            control={<DemoToggle />}
          />
          <SettingRow
            title="Jazyk rozhraní"
            description="Čeština"
            control={<DemoSelect>Čeština</DemoSelect>}
          />
          <SettingRow
            title="Automatické zálohy"
            description="Každý den ve 3:00"
            control={<DemoToggle />}
          />
        </SettingsList>
      ),
    },
  ],
}
