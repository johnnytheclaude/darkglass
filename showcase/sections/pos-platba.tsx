import { useState, useSyncExternalStore } from 'react'
import { AmountDisplay } from '../../src/components/Pos/AmountDisplay'
import { ChangeAndPay } from '../../src/components/Pos/ChangeAndPay'
import { CountedTotal } from '../../src/components/Pos/CountedTotal'
import { FactCard } from '../../src/components/Pos/FactCard'
import { DenominationRow } from '../../src/components/Pos/DenominationRow'
import { Numpad } from '../../src/components/Pos/Numpad'
import { PaymentBreakdown } from '../../src/components/Pos/PaymentBreakdown'
import { PaymentTabs } from '../../src/components/Pos/PaymentTabs'
import { PinDots } from '../../src/components/Pos/PinDots'
import { QuickCash } from '../../src/components/Pos/QuickCash'
import type { ShowcaseSection } from '../registry'

const castka = (hodnota: number) => `${hodnota.toLocaleString('cs-CZ')} Kč`

const pocet = (kolik: number, jedna: string, dve: string, pet: string) => {
  if (kolik === 1) return `${kolik} ${jedna}`
  if (kolik >= 2 && kolik <= 4) return `${kolik} ${dve}`
  return `${kolik} ${pet}`
}

/* Na obrazovce Pokladny poslouchá fyzickou klávesnici vždycky jen jeden numpad
   (platba, nebo PIN). V ukázce jsou vidět oba naráz, takže si mezi nimi poslech
   předávají tímhle přepínačem — jinak by jedna číslice dopadla do obou. */
type Poslech = 'platba' | 'pin'
let poslech: Poslech = 'platba'
const odberatele = new Set<() => void>()

function prepniPoslech(next: Poslech) {
  poslech = next
  odberatele.forEach((odber) => odber())
}

function usePoslech() {
  return useSyncExternalStore(
    (odber) => {
      odberatele.add(odber)
      return () => {
        odberatele.delete(odber)
      }
    },
    () => poslech,
  )
}

function PrepinacPoslechu({ moje }: { moje: Poslech }) {
  const aktivni = usePoslech() === moje

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
      <input
        type="checkbox"
        checked={aktivni}
        onChange={() => prepniPoslech(moje)}
        aria-label="Tahle klávesnice poslouchá fyzickou klávesnici"
      />
      Poslouchá fyzickou klávesnici (číslice, Backspace)
    </label>
  )
}

const CELKEM = 16872
const KARTOU = 10000
const ZBYVA = CELKEM - KARTOU

const BANKOVKY = [
  { key: '7000', label: castka(7000), hodnota: 7000 },
  { key: '8000', label: castka(8000), hodnota: 8000 },
  { key: '10000', label: castka(10000), hodnota: 10000 },
  { key: 'presne', label: `Přesně ${castka(ZBYVA)}`, hodnota: ZBYVA },
]

function Platba() {
  const [zadano, setZadano] = useState('7000')
  const [bankovka, setBankovka] = useState<string | null>('7000')
  const posloucha = usePoslech() === 'platba'

  const prijato = Number(zadano || '0')
  const vratit = Math.max(0, prijato - ZBYVA)

  const pridej = (cislice: string) => {
    setBankovka(null)
    setZadano((stav) => (stav === '0' ? cislice : (stav + cislice).slice(0, 9)))
  }

  const smaz = () => {
    setBankovka(null)
    setZadano((stav) => stav.slice(0, -1))
  }

  const vyber = (key: string) => {
    const volba = BANKOVKY.find((polozka) => polozka.key === key)
    if (!volba) return
    setBankovka(key)
    setZadano(String(volba.hodnota))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <PrepinacPoslechu moje="platba" />
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Numpad keyboard={posloucha} onDigit={pridej} onDelete={smaz} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            flex: '1 1 320px',
            maxWidth: 420,
          }}
        >
          <AmountDisplay label="Přijato hotově" value={castka(prijato)} />
          <QuickCash
            label="Rychlé bankovky"
            options={BANKOVKY.map(({ key, label }) => ({ key, label }))}
            selectedKey={bankovka}
            onSelect={vyber}
          />
          <ChangeAndPay change={castka(vratit)} payDisabled={prijato < ZBYVA} />
          <PaymentBreakdown
            label="K zaplacení"
            total={castka(CELKEM)}
            lines={[
              {
                key: 'karta',
                label: 'Kartou · schváleno',
                value: castka(KARTOU),
                tone: 'success',
              },
              { key: 'zaokrouhleni', label: 'Zaokrouhlení hotovosti', value: castka(0) },
              {
                key: 'zbyva',
                label: 'Zbývá zaplatit',
                value: castka(Math.max(0, ZBYVA - prijato)),
                strong: true,
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

function Pin() {
  const [pin, setPin] = useState('')
  const posloucha = usePoslech() === 'pin'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <PrepinacPoslechu moje="pin" />
      <PinDots filled={pin.length} />
      <Numpad
        variant="pin"
        keyboard={posloucha}
        onDigit={(cislice) => setPin((stav) => (stav.length < 4 ? stav + cislice : stav))}
        onDelete={() => setPin((stav) => stav.slice(0, -1))}
      />
    </div>
  )
}

const ZPUSOBY = [
  { key: 'hotove', label: 'Hotově' },
  { key: 'kartou', label: 'Kartou' },
  { key: 'prevodem', label: 'Převodem / faktura' },
  { key: 'voucher', label: 'Voucher', disabled: true },
]

function Zpusoby() {
  const [zpusob, setZpusob] = useState('hotove')

  return (
    <div style={{ width: '100%' }}>
      <PaymentTabs tabs={ZPUSOBY} value={zpusob} onChange={setZpusob} />
    </div>
  )
}

const NOMINALY = [5000, 2000, 1000, 500, 200, 100]
const MINCE = [50, 20, 10]

function Kasa() {
  const [pocty, setPocty] = useState<number[]>([2, 3, 4, 1, 5, 2, 4, 6, 3])
  const vsechny = [...NOMINALY, ...MINCE]
  const uprav = (index: number, o: number) =>
    setPocty((stav) => stav.map((ks, i) => (i === index ? Math.max(0, ks + o) : ks)))

  const celkem = vsechny.reduce((soucet, nominal, i) => soucet + nominal * pocty[i], 0)
  const bankovek = NOMINALY.reduce((soucet, _, i) => soucet + pocty[i], 0)
  const minci = MINCE.reduce((soucet, _, i) => soucet + pocty[NOMINALY.length + i], 0)

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          flex: '1 1 340px',
          maxWidth: 420,
        }}
      >
        {vsechny.map((nominal, i) => (
          <DenominationRow
            key={nominal}
            denomination={nominal.toLocaleString('cs-CZ')}
            count={pocty[i]}
            sum={(nominal * pocty[i]).toLocaleString('cs-CZ')}
            decreaseLabel={`Ubrat ${nominal} Kč`}
            increaseLabel={`Přidat ${nominal} Kč`}
            onDecrease={() => uprav(i, -1)}
            onIncrease={() => uprav(i, 1)}
          />
        ))}
      </div>
      <div style={{ flex: '0 1 340px' }}>
        <CountedTotal
          label="Spočítáno celkem"
          value={castka(celkem)}
          meta={`${pocet(bankovek, 'bankovka', 'bankovky', 'bankovek')} · ${pocet(minci, 'mince', 'mince', 'mincí')}`}
        />
      </div>
    </div>
  )
}

export const section: ShowcaseSection = {
  id: 'pokladna-platba',
  title: '§ Pokladna · platba',
  order: 180,
  note: 'Numerické klávesnice, zadaná částka, způsoby platby, rozpis kombinované platby, rychlé bankovky, vrácení a počítání kasy po nominálech. Všechno je živé — piš prstem i fyzickou klávesnicí a přepínej motiv, akcent a velikost UI v hlavičce.',
  demos: [
    {
      title: 'Platební klávesnice a zadaná částka',
      stack: true,
      wide: true,
      note: 'Klikni do klávesnice nebo piš číslice a Backspace — stisk klávesnicí zvýrazní klávesu stejně jako prst. Rychlá bankovka částku přepíše, Vrátit i Zbývá zaplatit se dopočítají; Zaplatit je zamčené, dokud přijatá hotovost nestačí.',
      render: () => <Platba />,
    },
    {
      title: 'PIN a tečky',
      stack: true,
      note: 'Menší klávesnice (88 × 80 px) pro přihlášení. Tečky ukazují jen počet zadaných číslic, nikdy PIN; čtečka přečte „Zadáno 2 ze 4 číslic“.',
      render: () => <Pin />,
    },
    {
      title: 'Způsoby platby',
      stack: true,
      wide: true,
      note: 'Záložky si dělí šířku rovným dílem a mají 72 px kvůli prstu. Voucher je ztlumený jako nedostupný způsob (vypnutý modul).',
      render: () => <Zpusoby />,
    },
    {
      title: 'Rozpis platby — kombinovaná platba',
      stack: true,
      note: 'Zaplacená část účtu je zelená, zbytek k doplacení nese zvýrazněný popisek. Celková částka se u statisíců zmenší, místo aby přetekla.',
      render: () => (
        <div style={{ width: '100%', maxWidth: 420 }}>
          <PaymentBreakdown
            label="K zaplacení"
            total={castka(CELKEM)}
            lines={[
              { key: 'karta', label: 'Kartou · schváleno', value: castka(KARTOU), tone: 'success' },
              { key: 'voucher', label: 'Voucher V-2026-018', value: castka(500), tone: 'success' },
              { key: 'zaokrouhleni', label: 'Zaokrouhlení hotovosti', value: castka(0) },
              { key: 'zbyva', label: 'Zbývá zaplatit', value: castka(6372), strong: true },
            ]}
          />
        </div>
      ),
    },
    {
      title: 'Karta / Údaj — typ dokladu',
      stack: true,
      note: 'Tichý podklad pro údaj, který se za běhu mění, ale není to částka. Poznámka v akcentu říká, že se s tím dá něco udělat (doplnit odběratele).',
      render: () => (
        <div style={{ width: '100%', maxWidth: 420, display: 'grid', gap: 12 }}>
          <FactCard label="Typ dokladu" value="Zjednodušený daňový doklad" />
          <FactCard
            label="Typ dokladu"
            value="Daňový doklad"
            note="Na firmu · doplnit odběratele podle IČO"
            noteAccent
          />
        </div>
      ),
    },
    {
      title: 'Počítání kasy po nominálech',
      stack: true,
      wide: true,
      note: 'Slepé počítání: obsluha kliká plus a mínus a dívá se na peníze, ne na obrazovku — proto krokovač 48 px a počet velkým písmem. Součet se dopočítává, očekávaný stav se neukazuje.',
      render: () => <Kasa />,
    },
  ],
}
