import { Card } from '../../src/components/Cards/Card'
import { KeyValueList, KeyValueRow } from '../../src/components/Cards/KeyValueList'
import { StatCard } from '../../src/components/Cards/StatCard'
import { IconButton } from '../../src/components/Buttons/IconButton'
import { IconPencil } from '../../src/components/Icons/IconPencil'
import { Avatar } from '../../src/components/Overview/Avatar'
import { AvatarStack } from '../../src/components/Overview/AvatarStack'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná — knihovna doménu nezná. */

const UDAJE = [
  { label: 'IČO', value: '19873212' },
  { label: 'Zasílat upozornění', value: 'Ano' },
  { label: 'Počet položek', value: '4' },
  { label: 'Poslední změna', value: '7. 9. 2026' },
]

export const section: ShowcaseSection = {
  id: 'karty-udaje',
  title: '§ Karty a údaje',
  order: 50,
  note: 'Skleněná karta je základní stavební kámen. Číslo je vždy větší než jeho popisek.',
  demos: [
    {
      title: 'Základní karta',
      note: 'Hlavička s nadpisem, podtitulem a jednou akcí; tělo je volné místo pro obsah.',
      stack: true,
      render: () => (
        <div style={{ width: 340, maxWidth: '100%' }}>
          <Card
            title="Název karty"
            sub="Doplňující popis"
            action={<IconButton label="Upravit" variant="ghost" icon={<IconPencil size={16} />} />}
            framed
          >
            <span style={{ color: 'var(--text-3)', fontSize: 13 }}>Místo pro obsah</span>
          </Card>
        </div>
      ),
    },
    {
      title: 'Velké číslo',
      note: 'Popisek nahoře, číslo dole — srovnání má vlastní šipku, ne jen barvu.',
      stack: true,
      render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ width: 260, maxWidth: '100%' }}>
            <StatCard
              label="Obrat dnes"
              value="42 580 Kč"
              delta="o 18 % víc než včera"
              deltaDirection="up"
            />
          </div>
          <div style={{ width: 260, maxWidth: '100%' }}>
            <StatCard
              label="Průměrná hodnota"
              value="8 018 Kč"
              delta="o 6 % méně než včera"
              deltaDirection="down"
            />
          </div>
          <div style={{ width: 260, maxWidth: '100%' }}>
            <StatCard label="Záznamy dnes" value="7" delta="bez srovnání s loňskem" />
          </div>
        </div>
      ),
    },
    {
      title: 'Avataři · čtyři velikosti',
      note: 'Iniciály rostou s kolečkem (28/36/44/56 px podle návrhu).',
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <Avatar initials="SH" size={28} />
          <Avatar initials="SH" size={36} />
          <Avatar initials="SH" size={44} />
          <Avatar initials="SH" size={56} />
        </div>
      ),
    },
    {
      title: 'Avatar se stavem a skupina',
      note: 'Tečka stavu má prstenec v barvě plochy; přebytek skupiny se sečte do „+N“.',
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <Avatar initials="SH" size={44} status="online" />
          <AvatarStack
            items={[
              { initials: 'SH', tone: 1 },
              { initials: 'JN', tone: 2 },
              { initials: 'PK', tone: 3 },
              { initials: 'ML', tone: 4 },
              { initials: 'TV', tone: 5 },
            ]}
          />
        </div>
      ),
    },
    {
      title: 'Seznam údajů',
      note: 'Popisky drží jeden sloupec, takže se hodnoty čtou shora dolů bez bloudění.',
      stack: true,
      render: () => (
        <div style={{ width: 420, maxWidth: '100%' }}>
          <KeyValueList>
            {UDAJE.map((udaj) => (
              <KeyValueRow key={udaj.label} label={udaj.label} value={udaj.value} />
            ))}
          </KeyValueList>
        </div>
      ),
    },
  ],
}
