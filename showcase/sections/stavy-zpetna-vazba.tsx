import { Alert } from '../../src/components/Feedback/Alert'
import { EmptyState } from '../../src/components/Feedback/EmptyState'
import { ProgressBar } from '../../src/components/Feedback/ProgressBar'
import { ProgressRing } from '../../src/components/Feedback/ProgressRing'
import { SkeletonList } from '../../src/components/Feedback/Skeleton'
import { Badge } from '../../src/components/Feedback/Badge'
import { Toast } from '../../src/components/Feedback/Toast'
import { Tooltip } from '../../src/components/Feedback/Tooltip'
import { IconAlert } from '../../src/components/Icons/IconAlert'
import { IconCheck } from '../../src/components/Icons/IconCheck'
import { IconFile } from '../../src/components/Icons/IconFile'
import { IconPlus } from '../../src/components/Icons/IconPlus'
import { IconX } from '../../src/components/Icons/IconX'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná — knihovna doménu nezná. */

function Odznaky() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Badge tone="success" icon={<IconCheck size={13} />}>
        Odesláno
      </Badge>
      <Badge tone="warning" icon={<IconAlert size={13} />}>
        Čeká
      </Badge>
      <Badge tone="danger" icon={<IconX size={13} />}>
        Chyba
      </Badge>
      <Badge tone="neutral" icon={<IconX size={13} />}>
        Stornováno
      </Badge>
      <Badge tone="info" icon={<IconPlus size={13} />}>
        Nové
      </Badge>
      <Badge tone="purple" icon={<IconFile size={13} />}>
        Rozpracováno
      </Badge>
      <Badge tone="success" dot>
        Online
      </Badge>
      <Badge tone="plain">Koncept</Badge>
    </div>
  )
}

export const section: ShowcaseSection = {
  id: 'stavy-zpetna-vazba',
  title: '§ Stavy a zpětná vazba',
  order: 45,
  note: 'Stav nikdy nesděluje jen barva — vždy barva + tvar + slovo.',
  demos: [
    {
      title: 'Odznaky stavu',
      note: 'Osm ladění návrhu. Vedle barvy stojí ikona nebo tečka, takže stav pozná i člověk, který barvy nerozliší.',
      stack: true,
      wide: true,
      render: () => <Odznaky />,
    },
    {
      title: 'Upozornění · informace',
      note: 'Nadpis říká, co se stalo; tělo, co z toho plyne. Akce je nejvýš jedna.',
      stack: true,
      render: () => (
        <Alert
          tone="info"
          title="Záznamy se odesílají samy"
          actionLabel="Odeslat nyní"
          onClose={() => {}}
        >
          Tímhle je odešlete hned — hodí se po výpadku sítě.
        </Alert>
      ),
    },
    {
      title: 'Upozornění · v pořádku',
      note: 'Potvrzení bez akce: jen říká, co se povedlo.',
      stack: true,
      render: () => (
        <Alert tone="success" title="Změny byly uloženy" onClose={() => {}}>
          Uloženo 18 položek do katalogu.
        </Alert>
      ),
    },
    {
      title: 'Upozornění · varování',
      note: 'Oranžová má vlastní ikonu, ne jen barvu.',
      stack: true,
      render: () => (
        <Alert tone="warning" title="Zboží je skladem v mínusu" actionLabel="Doplnit" onClose={() => {}}>
          Položka B-500 · chybí 16 ks oproti evidenci.
        </Alert>
      ),
    },
    {
      title: 'Upozornění · chyba',
      note: 'Červené upozornění hlásí čtečce role="alert", aby ho přečetla hned.',
      stack: true,
      render: () => (
        <Alert tone="danger" title="Záznam se nepodařilo odeslat" actionLabel="Odeslat znovu" onClose={() => {}}>
          Příjemce ho zatím nevidí. Zkuste to znovu.
        </Alert>
      ),
    },
    {
      title: 'Plovoucí oznámení',
      note: 'Bublina nad obsahem s jedinou akcí. Dlouhý název se ořízne, bublina se neroztáhne.',
      stack: true,
      render: () => (
        <Toast title="Odesláno k tisku" sub="4 úlohy · Zařízení 1" actionLabel="Zpět" />
      ),
    },
    {
      title: 'Ukazatel průběhu',
      note: 'Nad pruhem je slovy, co se počítá — samotný pruh neřekne nic.',
      stack: true,
      render: () => (
        <div style={{ width: 300, maxWidth: '100%' }}>
          <ProgressBar label="Odesláno" valueLabel="5 ze 7" value={5} max={7} />
        </div>
      ),
    },
    {
      title: 'Kroužek',
      note: 'Průběh v kroužku pro dlaždice a karty; číslo uprostřed dodává aplikace.',
      render: () => <ProgressRing value={71}>71 %</ProgressRing>,
    },
    {
      title: 'Prázdný stav',
      note: 'Říká, čím se místo zaplní, a nabízí jednu akci — ne pouhé „nic tu není“.',
      stack: true,
      render: () => (
        <EmptyState
          icon={<IconFile size={28} />}
          title="Zatím žádný záznam"
          actionLabel="Vytvořit ukázkový"
          actionIcon={<IconPlus size={16} />}
        >
          Jakmile vznikne první záznam, objeví se tady.
        </EmptyState>
      ),
    },
    {
      title: 'Načítání',
      note: 'Tvar odpovídá řádku seznamu, takže stránka po načtení neposkočí.',
      stack: true,
      render: () => <SkeletonList rows={3} />,
    },
    {
      title: 'Bublina',
      note: 'Hodnota nad grafem (tučně) a tichý popisek prvku — dvě varianty téže bubliny.',
      render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Tooltip>56 130 Kč</Tooltip>
          <Tooltip variant="label">Jednotková cena</Tooltip>
        </div>
      ),
    },
  ],
}
