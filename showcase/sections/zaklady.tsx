import type { CSSProperties } from 'react'
import type { ShowcaseSection } from '../registry'

/* § Základy návrhu nemá komponenty — jsou to tokeny. Bez téhle sekce nešlo
   na ukázce posoudit paletu, poloměry ani stíny, i když je celá knihovna
   staví. Hodnoty se nevypisují natvrdo: čtou se z proměnných, takže se
   sekce sama přepíná s motivem, akcentem i velikostí UI. */

type Vzorek = { token: string; popis: string }

const POVRCHY: Vzorek[] = [
  { token: '--bg', popis: 'Pozadí obrazovky' },
  { token: '--bg-tint-a', popis: 'Podklad A (přechod)' },
  { token: '--bg-tint-b', popis: 'Podklad B (přechod)' },
  { token: '--surface-solid', popis: 'Neprůhledná karta' },
  { token: '--surface', popis: 'Sklo karty' },
  { token: '--surface-05', popis: 'Nejtišší plocha' },
  { token: '--surface-15', popis: 'Plocha pod prvkem' },
  { token: '--surface-2', popis: 'Plocha nad kartou' },
  { token: '--surface-3', popis: 'Nejsilnější plocha' },
  { token: '--border', popis: 'Vlasový rámeček' },
  { token: '--border-strong', popis: 'Zdůrazněný rámeček' },
]

const TEXT: Vzorek[] = [
  { token: '--text-1', popis: 'Hlavní text' },
  { token: '--text-2', popis: 'Vedlejší text' },
  { token: '--text-3', popis: 'Popisky' },
  { token: '--text-muted', popis: 'Neaktivní text' },
  { token: '--chevron', popis: 'Šipka řádku' },
]

const VYZNAMOVE: Vzorek[] = [
  { token: '--accent', popis: 'Akcent (white-label)' },
  { token: '--success', popis: 'V pořádku' },
  { token: '--warning', popis: 'Varování' },
  { token: '--danger', popis: 'Chyba' },
  { token: '--purple', popis: 'Fialová' },
  { token: '--teal', popis: 'Modrozelená' },
  { token: '--pink', popis: 'Růžová' },
  { token: '--indigo', popis: 'Indigo' },
  { token: '--neutral', popis: 'Neutrální' },
  { token: '--contrast-fill', popis: 'Kontrastní plocha' },
]

const AVATARY: Vzorek[] = [
  { token: '--avatar-1', popis: '1' },
  { token: '--avatar-2', popis: '2' },
  { token: '--avatar-3', popis: '3' },
  { token: '--avatar-4', popis: '4' },
  { token: '--avatar-5', popis: '5' },
]

const POLOMERY = [
  { token: '--r-xs', popis: 'Drobné prvky' },
  { token: '--r-sm', popis: 'Pole a řádky' },
  { token: '--r-md', popis: 'Karty' },
  { token: '--r-lg', popis: 'Velké karty a dialogy' },
  { token: '--r-pill', popis: 'Pilulka (tlačítka, chipy)' },
]

const STINY = [
  { token: '--shadow', popis: 'Karta' },
  { token: '--shadow-soft', popis: 'Tichý stín' },
  { token: '--shadow-pill', popis: 'Tlačítko' },
]

const mrizka: CSSProperties = { display: 'grid', gap: 8, width: '100%' }
const radek: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '44px 1fr auto',
  alignItems: 'center',
  gap: 10,
  font: '400 13px/1.3 var(--font), system-ui, sans-serif',
  color: 'var(--text-2)',
}
const nazev: CSSProperties = { color: 'var(--text-1)', fontWeight: 600 }
const kod: CSSProperties = {
  font: '400 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace',
  color: 'var(--text-3)',
}

/** Čtvereček se vzorkem barvy — přes šachovnici, aby byla vidět průhlednost. */
function Chip({ token }: { token: string }) {
  return (
    <span
      style={{
        width: 44,
        height: 28,
        borderRadius: 'var(--r-xs)',
        border: '1px solid var(--border)',
        backgroundImage:
          'linear-gradient(45deg, #8888 25%, transparent 25%, transparent 75%, #8888 75%), linear-gradient(45deg, #8888 25%, transparent 25%, transparent 75%, #8888 75%)',
        backgroundSize: '10px 10px',
        backgroundPosition: '0 0, 5px 5px',
        backgroundBlendMode: 'normal',
        boxShadow: 'inset 0 0 0 999px var(' + token + ')',
      }}
    />
  )
}

function Barvy({ vzorky }: { vzorky: Vzorek[] }) {
  return (
    <div style={mrizka}>
      {vzorky.map((v) => (
        <div key={v.token} style={radek}>
          <Chip token={v.token} />
          <span style={nazev}>{v.popis}</span>
          <code style={kod}>{v.token}</code>
        </div>
      ))}
    </div>
  )
}

function Tichy({ token, popis }: { token: string; popis: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        padding: '10px 12px',
        borderRadius: 'var(--r-sm)',
        backgroundColor: `var(${token}-soft)`,
        color: `var(${token}-text, var(${token}))`,
        font: '600 13px/1.2 var(--font), system-ui, sans-serif',
      }}
    >
      <span>{popis}</span>
      <code style={{ ...kod, color: 'inherit', opacity: 0.8 }}>{token}-soft</code>
    </div>
  )
}

export const section: ShowcaseSection = {
  id: 'zaklady',
  title: '§ Základy',
  order: 0,
  note:
    'Tokeny, na kterých stojí všechny ostatní sekce. Hodnoty se čtou z proměnných — ' +
    'přepnutím motivu nebo akcentu nahoře se přebarví i tahle sekce.',
  demos: [
    {
      title: 'Povrchy',
      note: 'Pozadí, skleněné plochy a rámečky. Šachovnice pod vzorkem ukazuje průhlednost.',
      stack: true,
      render: () => <Barvy vzorky={POVRCHY} />,
    },
    {
      title: 'Text',
      note: 'Tři úrovně textu plus neaktivní a šipka řádku.',
      stack: true,
      render: () => (
        <div style={{ ...mrizka, gap: 12 }}>
          <Barvy vzorky={TEXT} />
          <div style={{ display: 'grid', gap: 4 }}>
            <span style={{ color: 'var(--text-1)', font: '600 17px/1.3 var(--font), system-ui' }}>
              Hlavní text · Inter 17 px
            </span>
            <span style={{ color: 'var(--text-2)', font: '400 15px/1.35 var(--font), system-ui' }}>
              Vedlejší text · Inter 15 px
            </span>
            <span style={{ color: 'var(--text-3)', font: '400 13px/1.35 var(--font), system-ui' }}>
              Popisek · Inter 13 px
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Významové barvy',
      note: 'Akcent je white-label — firma si ho přepisuje, ostatní ladění zůstávají.',
      stack: true,
      render: () => <Barvy vzorky={VYZNAMOVE} />,
    },
    {
      title: 'Tiché podklady',
      note: 'Text na svém tintu drží aspoň 4,5 : 1 v obou motivech.',
      stack: true,
      render: () => (
        <div style={{ ...mrizka, gap: 6 }}>
          <Tichy token="--accent" popis="Akcent" />
          <Tichy token="--success" popis="V pořádku" />
          <Tichy token="--warning" popis="Varování" />
          <Tichy token="--danger" popis="Chyba" />
          <Tichy token="--neutral" popis="Neutrální" />
        </div>
      ),
    },
    {
      title: 'Barvy avatarů',
      note: 'Pět odstínů, které se přiřazují podle jména — nezávisí na akcentu.',
      stack: true,
      render: () => (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {AVATARY.map((a) => (
            <span
              key={a.token}
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--r-pill)',
                backgroundColor: `var(${a.token}-fill)`,
                color: 'var(--text-on-color)',
                display: 'grid',
                placeItems: 'center',
                font: '600 15px/1 var(--font), system-ui',
              }}
            >
              {a.popis}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'Poloměry',
      note: 'Pět kroků z návrhu; pilulka je 999 px.',
      stack: true,
      render: () => (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {POLOMERY.map((p) => (
            <div key={p.token} style={{ display: 'grid', gap: 6, justifyItems: 'center' }}>
              <span
                style={{
                  width: 84,
                  height: 56,
                  borderRadius: `var(${p.token})`,
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                }}
              />
              <code style={kod}>{p.token}</code>
              <span style={{ ...radek, display: 'block', color: 'var(--text-3)', fontSize: 12 }}>
                {p.popis}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Stíny',
      note: 'V tmavém motivu jsou stíny hlubší — jsou to samostatné tokeny, ne průhlednost.',
      stack: true,
      render: () => (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: 4 }}>
          {STINY.map((s) => (
            <div key={s.token} style={{ display: 'grid', gap: 6, justifyItems: 'center' }}>
              <span
                style={{
                  width: 120,
                  height: 56,
                  borderRadius: 'var(--r-md)',
                  backgroundColor: 'var(--surface-solid)',
                  boxShadow: `0 8px 24px var(${s.token})`,
                }}
              />
              <code style={kod}>{s.token}</code>
              <span style={{ color: 'var(--text-3)', font: '400 12px/1.2 var(--font), system-ui' }}>
                {s.popis}
              </span>
            </div>
          ))}
        </div>
      ),
    },
  ],
}
