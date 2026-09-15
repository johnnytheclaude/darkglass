import { ActivityHeatmap } from '../../src/components/Data/ActivityHeatmap'
import { FunnelChart } from '../../src/components/Data/FunnelChart'
import { KanbanCard, KanbanColumn } from '../../src/components/Data/KanbanColumn'
import { SegmentedProgress } from '../../src/components/Data/SegmentedProgress'
import { StatSparkCard } from '../../src/components/Data/StatSparkCard'
import { TableEmpty } from '../../src/components/Data/TableEmpty'
import { TableLoading } from '../../src/components/Data/TableLoading'
import { Timeline, TimelineEvent } from '../../src/components/Data/Timeline'
import { Avatar } from '../../src/components/Overview/Avatar'
import { IconSearch } from '../../src/components/Icons/IconSearch'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná — knihovna doménu nezná. */

const COLUMNS = [
  { label: 'Název' },
  { label: 'Stav', width: 120 },
  { label: 'Datum', width: 120 },
]

/** Mřížka aktivity je spočítaná, ne náhodná — aby snímky byly srovnatelné. */
const WEEKS = Array.from({ length: 14 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => (w * 7 + d * 3) % 5 === 0 ? 2 : (w + d) % 3 === 0 ? 1 : 0),
)

export const section: ShowcaseSection = {
  id: 'data-rozsireni',
  title: '§ Data · rozšíření',
  order: 115,
  note: 'Časová osa, nástěnka, mapa aktivity, podíly a chybějící stavy tabulky.',
  demos: [
    {
      title: 'Časová osa',
      note: 'Historie záznamu; barva kolečka říká, co se stalo. Poslední záznam už spojnici nemá.',
      render: () => (
        <Timeline style={{ maxWidth: 400 }}>
          <TimelineEvent tone="success" title="Záznam schválen" time="14:22" who="Jan Novák" />
          <TimelineEvent tone="accent" title="Odesláno ke kontrole" time="13:05" who="Jan Novák" />
          <TimelineEvent tone="warning" title="Upraveno 5 polí" time="11:40" who="Petr Kraus" />
          <TimelineEvent title="Vytvořeno" time="9:02" who="Systém" />
        </Timeline>
      ),
    },
    {
      title: 'Sloupec nástěnky',
      note: 'Jeden stav procesu s počtem a kartičkami.',
      render: () => (
        <KanbanColumn title="Rozpracováno" count={3} style={{ maxWidth: 300 }}>
          <KanbanCard
            title="Kontrola dodávky"
            status="Čeká"
            statusTone="warning"
            trailing={<Avatar initials="JN" />}
          />
          <KanbanCard
            title="Nacenění položek"
            status="Probíhá"
            statusTone="accent"
            trailing={<Avatar initials="PK" />}
          />
          <KanbanCard
            title="Doplnit fotky do katalogu"
            status="Čeká"
            statusTone="neutral"
            trailing={<Avatar initials="SH" />}
          />
        </KanbanColumn>
      ),
    },
    {
      title: 'Mapa aktivity',
      note: 'Sytost buňky = kolik se ten den dělo. Tři stupně, ať to jde rozeznat na dálku.',
      render: () => (
        <ActivityHeatmap
          title="Aktivita za 14 týdnů"
          weeks={WEEKS}
          style={{ maxWidth: 420 }}
          cellTitle={(week, day, level) => `${week + 1}. týden, ${day + 1}. den — stupeň ${level}`}
        />
      ),
    },
    {
      title: 'Trychtýř',
      note: 'Kolik lidí došlo dál. Pruh se zkracuje a zesvětluje, poslední krok zůstane čitelný.',
      render: () => (
        <FunnelChart
          title="Průchod procesem"
          style={{ maxWidth: 400 }}
          steps={[
            { label: 'Zobrazeno', value: 4820, display: '4 820 · 100 %' },
            { label: 'Otevřeno', value: 2140, display: '2 140 · 44 %' },
            { label: 'Vyplněno', value: 910, display: '910 · 19 %' },
            { label: 'Dokončeno', value: 612, display: '612 · 13 %' },
          ]}
        />
      ),
    },
    {
      title: 'Vícesegmentový pruh',
      note: 'Rozpad celku do částí s legendou; podíly se dopočítají.',
      render: () => (
        <SegmentedProgress
          style={{ maxWidth: 400 }}
          segments={[
            { label: 'Hotovo', value: 52, tone: 'success' },
            { label: 'Probíhá', value: 28, tone: 'warning' },
            { label: 'Chyba', value: 12, tone: 'danger' },
          ]}
          total={100}
        />
      ),
    },
    {
      title: 'Statistika s grafem',
      note: 'Číslo na první pohled a pod ním tvar posledních období.',
      render: () => (
        <StatSparkCard
          label="Aktivní uživatelé"
          value="1 284"
          bars={[13, 19, 16, 25, 22, 30, 27, 37, 34, 42]}
          style={{ maxWidth: 280 }}
        />
      ),
    },
    {
      title: 'Prázdná tabulka',
      note: 'Hlavička sloupců zůstane stát, aby bylo vidět, v čem se hledalo.',
      wide: true,
      render: () => (
        <TableEmpty
          columns={COLUMNS}
          icon={<IconSearch />}
          title="Nic neodpovídá filtru"
          description="Zkuste zrušit některý filtr nebo hledat jinak."
          style={{ maxWidth: 520 }}
        />
      ),
    },
    {
      title: 'Načítání tabulky',
      note: 'Zástupné pruhy v rozměru skutečných řádků — obsah po načtení neposkočí.',
      wide: true,
      render: () => <TableLoading columns={COLUMNS} rows={4} style={{ maxWidth: 520 }} />,
    },
  ],
}
