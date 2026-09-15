import { StatusBar } from '../../src/components/Pos/StatusBar'
import type { StatusBadge } from '../../src/components/Pos/StatusBar'
import type { ShowcaseSection } from '../registry'

const VSECHNY_STAVY: StatusBadge[] = [
  { key: 'spojeni', label: 'offline', tone: 'warning', title: 'Bez spojení se serverem' },
  { key: 'fronta', label: '3 čekají', tone: 'warning', title: 'Doklady čekají na odeslání' },
  { key: 'odeslani', label: '1 chyba', tone: 'danger', title: 'Doklad se nepodařilo odeslat' },
  { key: 'tiskarna', label: 'tiskárna', tone: 'danger', title: 'Tiskárna účtenek neodpovídá' },
  { key: 'terminal', label: 'ruční režim', tone: 'warning', title: 'Platební terminál v ručním režimu' },
  { key: 'stitky', label: '8 štítků', tone: 'neutral', title: 'Fronta tisku štítků' },
  { key: 'verze', label: 'nová verze', tone: 'accent', title: 'Je k dispozici aktualizace' },
]

export const section: ShowcaseSection = {
  id: 'pokladna-stavova-lista',
  title: '§ Pokladna · stavová lišta',
  order: 195,
  note: 'Nav / Stavová lišta stojí nad všemi obrazovkami Pokladny. Zbytek § Pokladna · provoz a doklady patří do vlastní skupiny knihovny.',
  demos: [
    {
      title: 'Běžný provoz',
      stack: true,
      wide: true,
      note: 'Obsluha, místo a směna vlevo, čas vpravo. Bez jediného stavu zůstane lišta prázdná — to je v pořádku.',
      render: () => (
        <StatusBar
          operator="Jana Nováková"
          place="Vodičkova · P01"
          shift="směna od 8:55"
          time="6:41"
        />
      ),
    },
    {
      title: 'Stavy podle návrhu',
      stack: true,
      wide: true,
      note: 'Čtyři pilulky z návrhu: spojení, fronta, chyba a aktualizace.',
      render: () => (
        <StatusBar
          operator="Jana Nováková"
          place="Vodičkova · P01"
          shift="směna od 8:55"
          time="6:41"
          badges={VSECHNY_STAVY.filter((s) =>
            ['spojeni', 'fronta', 'odeslani', 'verze'].includes(s.key),
          )}
        />
      ),
    },
    {
      title: 'Všechno najednou',
      stack: true,
      wide: true,
      note: 'Sedm stavů, dlouhé jméno obsluhy i dlouhý název prodejny. Identita vlevo se zkrátí výpustkou, pilulky se zalomí na druhý řádek — lišta nikdy nepřeteče. Odznaky jsou kliknutelné (otevírají detail stavu), projdi je tabulátorem.',
      render: () => (
        <StatusBar
          operator="Bc. Stanislav Hochman st."
          place="Hochman Masarykova náměstí · Pokladna 1"
          shift="směna od 8:02"
          time="10:14"
          badges={VSECHNY_STAVY.map((s) => ({ ...s, onClick: () => undefined }))}
        />
      ),
    },
    {
      title: 'Zkušební režim (Sandbox)',
      stack: true,
      wide: true,
      note: 'Pruh SANDBOX sedí nad lištou a nese akci zpět do ostrého režimu. Fialová je vyhrazená režimu, ne firmě — po přepnutí akcentu zůstane.',
      render: () => (
        <StatusBar
          operator="Stanislav Hochman"
          place="Hochman Masarykova · Pokladna 1"
          shift="směna od 8:02"
          time="10:14"
          badges={VSECHNY_STAVY.filter((s) => ['spojeni', 'fronta', 'terminal'].includes(s.key))}
          sandbox={{
            text: 'SANDBOX — neprodáváte naostro. Doklady se neodesílají a účtenky nesou TEST.',
            actionLabel: 'Přepnout do ostrého',
          }}
        />
      ),
    },
    {
      title: 'Úzký displej',
      stack: true,
      note: 'Táž lišta v 480 px — pořadí zůstává, jen se zalomí. Takhle se chová na nejmenší pokladně i při největší velikosti UI.',
      render: () => (
        <div style={{ width: '100%', maxWidth: 480 }}>
          <StatusBar
            operator="Bc. Stanislav Hochman st."
            place="Hochman Masarykova náměstí · Pokladna 1"
            shift="směna od 8:02"
            time="10:14"
            badges={VSECHNY_STAVY}
            sandbox={{
              text: 'SANDBOX — neprodáváte naostro.',
              actionLabel: 'Přepnout do ostrého',
            }}
          />
        </div>
      ),
    },
  ],
}
