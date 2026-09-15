import { useState } from 'react'
import { Button } from '../../src/components/Buttons/Button'
import { CartCard, CartLine } from '../../src/components/Pos/CartCard'
import { CustomerBar } from '../../src/components/Pos/CustomerBar'
import { PayButton } from '../../src/components/Pos/PayButton'
import { CategoryChip } from '../../src/components/Pos/CategoryChip'
import { PosSearch } from '../../src/components/Pos/PosSearch'
import { ProductTile } from '../../src/components/Pos/ProductTile'
import { TotalCard } from '../../src/components/Pos/TotalCard'
import { VariantRow } from '../../src/components/Pos/VariantRow'
import { IconScanBarcode } from '../../src/components/Icons/IconScanBarcode'
import { IconSearch } from '../../src/components/Icons/IconSearch'
import { IconUserPlus } from '../../src/components/Icons/IconUserPlus'
import { EmptyState } from '../../src/components/Feedback/EmptyState'
import type { ShowcaseSection } from '../registry'

const KATEGORIE = ['Saka', 'Obleky', 'Košile', 'Kalhoty', 'Doplňky']

function UkazkaHledani() {
  const [posledni, setPosledni] = useState('zatím nic')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 520, width: '100%' }}>
      <PosSearch
        placeholder="Hledat název nebo kód…"
        shortcut="F3"
        icon={<IconSearch />}
        onScan={(kod) => setPosledni(`sken: ${kod}`)}
        onSubmitText={(text) => setPosledni(`hledání: ${text || '(prázdné)'}`)}
      />
      <span style={{ color: 'var(--text-3)', fontSize: 13 }}>Poslední vstup — {posledni}</span>
    </div>
  )
}

function Kategorie() {
  const [vybrana, setVybrana] = useState('Saka')

  return (
    <>
      {KATEGORIE.map((k) => (
        <CategoryChip key={k} selected={k === vybrana} onClick={() => setVybrana(k)}>
          {k}
        </CategoryChip>
      ))}
    </>
  )
}

function Kosik() {
  const [kusy, setKusy] = useState([1, 2, 1])
  const ceny = [4990, 1290, 890]
  const mezisoucet = kusy.reduce((soucet, ks, i) => soucet + ks * ceny[i], 0)
  const polozky = kusy.filter((ks) => ks > 0).length
  const celkemKusu = kusy.reduce((soucet, ks) => soucet + ks, 0)
  const nazvy = [
    'Sako CITY CLASSIC · vel. 50 · modrá',
    'Košile slim fit · vel. 41 · bílá',
    'Kravata hedvábí · vzor 77',
  ]
  const poznamky = ['kód 2000000118', '1 290 Kč / ks', 'kód 2000000342']
  const uprav = (i: number, o: number) =>
    setKusy((stav) => stav.map((ks, j) => (i === j ? Math.max(0, ks + o) : ks)))
  const castka = (hodnota: number) => `${hodnota.toLocaleString('cs-CZ')} Kč`

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ flex: '1 1 420px', maxWidth: 580, height: 380, display: 'flex' }}>
        <CartCard
          title="Košík"
          count={`${polozky} položky · ${celkemKusu} ks`}
          actionLabel="Zrušit účet"
        >
          {nazvy.map((nazev, i) => (
            <CartLine
              key={nazev}
              name={nazev}
              note={poznamky[i]}
              price={castka(kusy[i] * ceny[i])}
              quantity={kusy[i]}
              onDecrease={() => uprav(i, -1)}
              onIncrease={() => uprav(i, 1)}
            />
          ))}
        </CartCard>
      </div>
      <div style={{ flex: '0 1 380px' }}>
        <TotalCard
          rows={[
            { key: 'mezisoucet', label: 'Mezisoučet', value: castka(mezisoucet) },
            { key: 'sleva', label: 'Sleva', value: '0 Kč' },
          ]}
          totalLabel="Celkem"
          total={castka(mezisoucet)}
          note={`≈ ${Math.round(mezisoucet / 25.02).toLocaleString('cs-CZ')} € · kurz ČNB 25,02`}
        />
      </div>
    </div>
  )
}

export const section: ShowcaseSection = {
  id: 'pokladna-prodej',
  title: '§ Pokladna · prodej',
  order: 190,
  note: 'Dlaždice zboží, kategorie, hledání, košík, součet a dostupnost variant. Kategorie i krokovač množství jsou živé — klikni si. Vše škáluje přepínačem velikosti UI.',
  demos: [
    {
      title: 'Dlaždice zboží',
      note: 'Běžná, vybraná (akcent), v akci a se zbožím ve variantách. Dlouhý název se láme do tří řádků a cena zůstává u dolní hrany.',
      render: () => (
        <>
          <ProductTile name="Sako tmavě modré slim" price="9 990 Kč" />
          <ProductTile name="Černé sako PREMIUM" price="12 990 Kč" selected />
          <ProductTile
            name="Sako vlněné hnědé"
            saleLabel="AKCE do 15. 9."
            oldPrice="10 990"
            price="8 990 Kč"
          />
          <ProductTile
            name="Oblek trojdílný CITY CLASSIC · vel. 52 · tmavě šedá melír"
            price="18 490 Kč"
          />
          <ProductTile name="Kravata hedvábí" price="890 Kč" disabled />
        </>
      ),
    },
    {
      title: 'Kategorie',
      note: 'Výška 48 px kvůli prstu; vybraná nese plný akcent, takže se po přepnutí akcentu přebarví.',
      render: () => <Kategorie />,
    },
    {
      title: 'Hledání zboží',
      stack: true,
      note: 'Zkratka F3 je vidět pořád. Pole je skutečný input — klikni a piš, zaostření obtáhne celý rámeček.',
      render: () => (
        <div style={{ width: '100%', maxWidth: 520 }}>
          <PosSearch placeholder="Hledat název nebo kód…" shortcut="F3" />
        </div>
      ),
    },
    {
      title: 'Hledání zboží · čtečka i člověk',
      stack: true,
      note: 'Do pole píše obojí. Znaky ze čtečky dorazí rychleji, než člověk stihne psát, a končí Enterem — pole je pozná a ohlásí jako sken (neřízené pole se samo vyprázdní na další pípnutí). Ruční dotaz potvrzený Enterem je hledání. Varianta s lupou je vlevo.',
      render: () => <UkazkaHledani />,
    },
    {
      title: 'Košík a součet',
      stack: true,
      wide: true,
      note: 'Krokovač mění množství i částky; při delším účtu rolují jen řádky, hlavička zůstává. Částka v součtu se u velkých čísel zmenší, místo aby přetekla.',
      render: () => <Kosik />,
    },
    {
      title: 'Dostupnost varianty',
      stack: true,
      note: 'Běžná varianta je ztlumená, právě pípnutá nese akcent a poznámku. Dlouhý název se ukončí výpustkou, počet zůstane čitelný.',
      render: () => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: '100%',
            maxWidth: 420,
          }}
        >
          <VariantRow variant="vel. 48" count="0 ks" />
          <VariantRow variant="vel. 50" note="právě pípnuto" count="2 ks" active />
          <VariantRow variant="vel. 52" count="5 ks" />
          <VariantRow
            variant="vel. 54 · tmavě modrá melír zimní kolekce"
            note="objednáno"
            count="12 ks"
          />
        </div>
      ),
    },
    {
      title: 'Zákazník na účtu',
      stack: true,
      note: 'Prázdný stav vyzývá se zkratkou, připnutý ukazuje jméno a pod ním úroveň se slevou. Vpravo se vejde druhá akce — odběratel.',
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 520 }}>
          <CustomerBar
            icon={<IconUserPlus size={20} />}
            label="Připnout zákazníka"
            shortcut="F7"
            onSelect={() => {}}
            action={<Button variant="secondary" size="s">Na firmu</Button>}
          />
          <CustomerBar
            pinned
            icon={<IconUserPlus size={20} />}
            label="Stanislav Hochman"
            meta="Zlatý · sleva 10 %"
            shortcut="F7"
            onSelect={() => {}}
            action={<Button variant="secondary" size="s">Hochman Móda s.r.o.</Button>}
          />
        </div>
      ),
    },
    {
      title: 'Hlavní akce účtu',
      stack: true,
      note: 'Zaplatit je největší cíl obrazovky (88 px). Nad prázdným účtem ztrácí výplň akcentu, aby nevypadalo jako připravená platba. Pod ním řada akcí ve velikosti xl (56 px).',
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 520 }}>
          <PayButton label="Zaplatit · F2" />
          <PayButton label="Zaplatit · F2" disabled />
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="secondary" size="xl" block>Sleva · F8</Button>
            <Button variant="secondary" size="xl" block>Odložit · F6</Button>
          </div>
        </div>
      ),
    },
    {
      title: 'Prázdný účet',
      stack: true,
      note: 'Plnohodnotný prázdný stav uvnitř košíku — ikona čtečky, výzva a druhá cesta ke zboží.',
      render: () => (
        <div style={{ width: '100%', maxWidth: 580, height: 320, display: 'flex' }}>
          <CartCard title="Košík" count="prázdný">
            <EmptyState
              icon={<IconScanBarcode size={28} />}
              title="Pípněte zboží"
              style={{ margin: 'auto' }}
            >
              Nebo ho najděte podle názvu a kódu — F3.
            </EmptyState>
          </CartCard>
        </div>
      ),
    },
  ],
}
