import { FloatingPill } from '../../src/components/Cards/FloatingPill'
import { GaugeCard } from '../../src/components/Cards/GaugeCard'
import { LabelPreview } from '../../src/components/Cards/LabelPreview'
import { MediaCard } from '../../src/components/Cards/MediaCard'
import { NotificationItem, NotificationsPanel } from '../../src/components/Cards/NotificationsPanel'
import { IconAlert } from '../../src/components/Icons/IconAlert'
import { IconBell } from '../../src/components/Icons/IconBell'
import type { ShowcaseSection } from '../registry'

/* Hotové bloky složené ze základních prvků. Data jsou zástupná. */

export const section: ShowcaseSection = {
  id: 'slozene-bloky',
  title: '§ Složené bloky',
  order: 110,
  note: 'Hotové bloky složené ze základních prvků.',
  demos: [
    {
      title: 'Karta s kruhovým ukazatelem',
      note: 'Ukazatel je SVG; údaje pod ním se v úzkém místě zalomí.',
      render: () => (
        <GaugeCard
          title="Obrat dnes"
          statusLabel="Online"
          subtitle="Pobočka Praha · cíl 50 000 Kč"
          value="42 580"
          unit="Kč dnes"
          percent={85}
          stats={[
            { label: 'Cíl dne', value: '50 000 Kč' },
            { label: 'Zbývá', value: '7 420 Kč' },
          ]}
          style={{ maxWidth: 330 }}
        />
      ),
    },
    {
      title: 'Náhled štítku · 29 × 90 mm',
      note: 'Tiskové barvy, ne motiv aplikace — papír je vždy bílý.',
      render: () => (
        <LabelPreview
          name="Položka A-230"
          variant="varianta · modrá"
          price="5 806 Kč"
          style={{ maxWidth: 300 }}
        />
      ),
    },
    {
      title: 'Karta produktu s fotkou',
      note: 'Fotka vyplní, co zbude; pilulka s údajem zůstane celá.',
      render: () => (
        <MediaCard
          title="Položka A-230"
          subtitle="Nejčastější položka"
          statLabel="Dnes"
          statValue="4 ks"
          style={{ maxWidth: 250, height: 400 }}
        />
      ),
    },
    {
      title: 'Plovoucí pilulka',
      note: 'Jeden krátký údaj nad obsahem.',
      render: () => <FloatingPill>7 prodejů</FloatingPill>,
    },
    {
      title: 'Živě',
      note: 'Červená tečka drží vlevo, popisek silnějším řezem.',
      render: () => <FloatingPill variant="live">Živě</FloatingPill>,
    },
    {
      title: 'Panel Potřebuje pozornost',
      note: 'Linka mezi položkami je odsazená pod ikonou.',
      wide: true,
      render: () => (
        <NotificationsPanel title="Potřebuje pozornost" count="4 věci" style={{ maxWidth: 350 }}>
          <NotificationItem
            tone="danger"
            icon={<IconAlert size={20} />}
            title="Záznam se neodeslal"
            subtitle="ZÁZ-2026-000021"
            date="13. 9."
          />
          <NotificationItem
            tone="warning"
            icon={<IconBell size={20} />}
            title="2 doklady čekají"
            subtitle="Odejdou samy"
            date="13. 9."
          />
          <NotificationItem
            tone="warning"
            icon={<IconAlert size={20} />}
            title="Záporná hodnota"
            subtitle="Položka B-500"
            date="13. 9."
          />
          <NotificationItem
            tone="danger"
            icon={<IconAlert size={20} />}
            title="Relace zůstala otevřená"
            subtitle="Zařízení 1 · od 17:29"
            date="13. 9."
          />
        </NotificationsPanel>
      ),
    },
  ],
}
