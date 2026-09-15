import { useState } from 'react'
import { ActionTile } from '../../src/components/Overview/ActionTile'
import { BadgeCard } from '../../src/components/Overview/BadgeCard'
import { DailyBarsChart } from '../../src/components/Overview/DailyBarsChart'
import { HeaderActionCard, ProgressRow } from '../../src/components/Overview/HeaderActionCard'
import { PeriodTabs } from '../../src/components/Overview/PeriodTabs'
import { PersonRow } from '../../src/components/Overview/PersonRow'
import { QuickActionsCard } from '../../src/components/Overview/QuickActionsCard'
import { ScreenBackground } from '../../src/components/Overview/ScreenBackground'
import { SectionBox } from '../../src/components/Overview/SectionBox'
import { StatPair } from '../../src/components/Overview/StatPair'
import { FloatingPill } from '../../src/components/Cards/FloatingPill'
import { NotificationItem, NotificationsPanel } from '../../src/components/Cards/NotificationsPanel'
import { IconAlert } from '../../src/components/Icons/IconAlert'
import { IconPlus } from '../../src/components/Icons/IconPlus'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná; prvky si vyžádala obrazovka Přehled. */

const DAYS = [
  { label: '9', value: 50 },
  { label: '10', value: 95 },
  { label: '11', value: 143 },
  { label: '12', value: 16 },
  { label: '13', value: 121 },
  { label: '14', value: 275, highlight: true },
  { label: '15', value: 160 },
  { label: '16', value: 264, highlight: true },
  { label: '17', value: 110 },
  { label: '18', value: 14 },
]

function DailyDemo() {
  const [period, setPeriod] = useState('dnes')
  return (
    <DailyBarsChart
      bars={DAYS}
      max={275}
      style={{ maxWidth: 740 }}
      header={
        <>
          <FloatingPill variant="live">Živě</FloatingPill>
          <FloatingPill>7 prodejů</FloatingPill>
          <FloatingPill>21 % kartou</FloatingPill>
          <FloatingPill>Online</FloatingPill>
        </>
      }
      footer={
        <PeriodTabs
          value={period}
          onChange={setPeriod}
          tabs={[
            { key: 'dnes', label: 'Dnes' },
            { key: 'vcera', label: 'Včera' },
            { key: 'tyden', label: 'Tento týden' },
          ]}
        />
      }
    />
  )
}

export const section: ShowcaseSection = {
  id: 'prehled-doplnky',
  title: '§ Přehled · doplňky',
  order: 98,
  note: 'Prvky, které si vyžádala obrazovka Přehled a v knihovně chyběly.',
  demos: [
    {
      title: 'Dlaždice akce',
      note: 'Dotykový cíl 74 px; hlavní akce je v akcentu, jen jedna na kartu.',
      render: () => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ActionTile icon={<IconPlus size={20} />}>Nový produkt</ActionTile>
          <ActionTile variant="primary" icon={<IconPlus size={20} />}>
            Nová příjemka
          </ActionTile>
        </div>
      ),
    },
    {
      title: 'Karta rychlých akcí',
      note: 'Dlaždice se dělí o šířku karty a na úzké obrazovce se zalomí.',
      render: () => (
        <QuickActionsCard title="Rychlé akce" style={{ maxWidth: 330 }}>
          <ActionTile variant="primary" icon={<IconPlus size={20} />}>
            Nová příjemka
          </ActionTile>
          <ActionTile icon={<IconPlus size={20} />}>Nový produkt</ActionTile>
          <ActionTile icon={<IconPlus size={20} />}>Tisk štítků</ActionTile>
        </QuickActionsCard>
      ),
    },
    {
      title: 'Dvojice údajů s předělem',
      note: 'Na úzké obrazovce se zalomí a předěl zmizí.',
      render: () => (
        <StatPair
          items={[
            { label: 'Otevřeno v', value: '8:02' },
            { label: 'Trvá', value: '6 h 12 min' },
          ]}
          style={{ maxWidth: 260 }}
        />
      ),
    },
    {
      title: 'Karta s akcí v hlavičce',
      note: 'Akce je hned v hlavičce; pruhy nesou ladění podle stavu.',
      render: () => (
        <HeaderActionCard
          title="Odesílání do účetnictví"
          actionLabel="Odeslat teď"
          style={{ maxWidth: 330 }}
        >
          <ProgressRow label="Odesláno" value="5 ze 7" percent={71} tone="success" />
          <ProgressRow label="Čeká ve frontě" value="2 doklady" percent={29} tone="warning" />
        </HeaderActionCard>
      ),
    },
    {
      title: 'Karta se stavovým odznakem',
      note: 'Hlavička nese stav; obsahem je řádek osoby a dvojice údajů.',
      render: () => (
        <BadgeCard title="Kdo je na směně" badgeLabel="Otevřená" style={{ maxWidth: 330 }}>
          <PersonRow initials="SH" name="Stanislav Hochman" note="Majitel · sám na prodejně" />
          <StatPair
            items={[
              { label: 'Otevřeno v', value: '8:02' },
              { label: 'Trvá', value: '6 h 12 min' },
            ]}
          />
        </BadgeCard>
      ),
    },
    {
      title: 'Pozadí obrazovky',
      note: 'Dva jemné odstíny nad podkladem motivu — nic jiného pozadí nemá.',
      render: () => <ScreenBackground rounded style={{ maxWidth: 440, height: 280 }} />,
    },
    {
      title: 'Obal hlavní sekce',
      note: 'Drží karty pohromadě a odděluje je od pozadí.',
      wide: true,
      render: () => (
        <SectionBox style={{ maxWidth: 560 }}>
          <QuickActionsCard title="Rychlé akce" style={{ maxWidth: 240 }}>
            <ActionTile icon={<IconPlus size={20} />}>Nový produkt</ActionTile>
          </QuickActionsCard>
          <BadgeCard title="Kdo je na směně" badgeLabel="Otevřená" style={{ maxWidth: 260 }}>
            <PersonRow initials="SH" name="Stanislav Hochman" note="Majitel" />
          </BadgeCard>
        </SectionBox>
      ),
    },
    {
      title: 'Denní sloupce bez osy',
      note: 'Čte se z popisků dnů a vyzdviženého sloupce; období se přepíná pod grafem.',
      wide: true,
      render: () => <DailyDemo />,
    },
    {
      title: 'Panel upozornění · 8 položek',
      note: 'Stejný panel jako v § Složené bloky, jen s delším seznamem.',
      wide: true,
      render: () => (
        <NotificationsPanel title="Potřebuje pozornost" count="8 věcí" style={{ maxWidth: 342 }}>
          {Array.from({ length: 8 }, (_, i) => (
            <NotificationItem
              key={i}
              tone={i % 3 === 0 ? 'danger' : 'warning'}
              icon={<IconAlert size={20} />}
              title={`Věc k vyřešení ${i + 1}`}
              subtitle="Podrobnost položky"
              date="13. 9."
            />
          ))}
        </NotificationsPanel>
      ),
    },
  ],
}
