import { Card } from '../../src/components/Cards/Card'
import { KeyValueList, KeyValueRow } from '../../src/components/Cards/KeyValueList'
import { ProductCard } from '../../src/components/Cards/ProductCard'
import { StatCard } from '../../src/components/Cards/StatCard'
import { IconButton } from '../../src/components/Buttons/IconButton'
import { IconPencil } from '../../src/components/Icons/IconPencil'
import { Avatar } from '../../src/components/Overview/Avatar'
import { AvatarStack } from '../../src/components/Overview/AvatarStack'
import { QrCard } from '../../src/components/Cards/QrCard'
import { UkazkaQr } from '../ukazka-qr'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná — knihovna doménu nezná.
   Částky se píšou tak, jak je kreslí návrh: tisíce oddělené pevnou mezerou
   (U+00A0) a měna za číslem, taky po pevné mezeře — číslo se tím nikdy
   nezalomí mezi řádem a jednotkou ani mezi číslem a „Kč“. */

const UDAJE = [
  { label: 'IČO', value: '19873212' },
  { label: 'Zasílat upozornění', value: 'Ano' },
  { label: 'Počet položek', value: '4' },
  { label: 'Tržba za den', value: '42 580 Kč' },
  { label: 'Poslední změna', value: '7. 9. 2026' },
]

export const section: ShowcaseSection = {
  id: 'karty-udaje',
  title: '§ Karty a údaje',
  order: 50,
  note:
    'Skleněná karta je základní stavební kámen. Číslo je vždy větší než jeho popisek. ' +
    'Zbytek skupiny žije u svých obrazovek: Stat / Dvojice a Tile / Akce v § Přehled · doplňky, ' +
    'Karta / Součet v § Pokladna · prodej, Pill / Glass a Pill / Live v § Složené bloky, ' +
    'Settings List v § Systémové prvky.',
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
      title: 'Karta / Produkt',
      note:
        'Co se právě načetlo: název, cena a odkud údaj je. Hlavička pracovní ' +
        'obrazovky telefonu — cena je největší text, poznámka u ní nese akci ceny.',
      stack: true,
      render: () => (
        <div style={{ width: 350, maxWidth: '100%' }}>
          <ProductCard
            name="Sako CITY CLASSIC · modrá"
            price="4 990 Kč"
            priceNote="akce"
            meta="načteno kamerou · kód 2000000118"
          />
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
              value="42 580 Kč"
              delta="o 18 % víc než včera"
              deltaDirection="up"
            />
          </div>
          <div style={{ width: 260, maxWidth: '100%' }}>
            <StatCard
              label="Průměrná hodnota"
              value="8 018 Kč"
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
      title: 'Card / QR · účtenka na displeji',
      note:
        'Když nevyjede tisk, účtenka se ukáže jako kód na displeji. Plocha kódu zůstává bílá ' +
        'i v tmavém motivu a je velká v milimetrech, ne v pixelech: strana kódu má být aspoň ' +
        'desetina vzdálenosti čtení, tedy 50 mm na půl metru (velikost „m“); výchozí „l“ má 64 mm.',
      stack: true,
      render: () => (
        <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
          <QrCard
            title="Účtenka"
            amount="8 460 Kč"
            note="Namiřte na kód foťák telefonu."
            code={<UkazkaQr />}
          />
          <QrCard
            size="m"
            title="Účtenka"
            amount="8 460 Kč"
            note="Menší varianta — 50 mm, spodní mez pro čtení z půl metru."
            code={<UkazkaQr />}
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
    {
      title: 'Seznam údajů s hlavním údajem',
      note: 'Jeden řádek nese hlavní číslo seznamu (zůstatek poukazu, artboard 27) — hodnota je o stupeň větší a těžší, popisek zůstává stejný.',
      stack: true,
      render: () => (
        <div style={{ width: 420, maxWidth: '100%' }}>
          <KeyValueList>
            <KeyValueRow label="Původní hodnota" value="2 000 Kč" />
            <KeyValueRow label="Už vyčerpáno" value="− 640 Kč" />
            <KeyValueRow strong label="Zůstatek" value="1 360 Kč" />
            <KeyValueRow label="Platnost do" value="12. 9. 2028" />
          </KeyValueList>
        </div>
      ),
    },
  ],
}
