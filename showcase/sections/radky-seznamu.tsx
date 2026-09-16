import { Button } from '../../src/components/Buttons/Button'
import { Badge } from '../../src/components/Feedback/Badge'
import { IconAlert } from '../../src/components/Icons/IconAlert'
import { IconBell } from '../../src/components/Icons/IconBell'
import { IconCheck } from '../../src/components/Icons/IconCheck'
import { IconFile } from '../../src/components/Icons/IconFile'
import { IconX } from '../../src/components/Icons/IconX'
import { GroupedList } from '../../src/components/Lists/GroupedList'
import { ListRow } from '../../src/components/Lists/ListRow'
import { MetaRow } from '../../src/components/Lists/MetaRow'
import { IconReceipt } from '../../src/components/Icons/IconReceipt'
import { Avatar } from '../../src/components/Overview/Avatar'
import { Switch } from '../../src/components/Controls/Switch'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná — knihovna doménu nezná. */

function SirkaRadku({ children }: { children: React.ReactNode }) {
  return <div style={{ width: 520, maxWidth: '100%' }}>{children}</div>
}

export const section: ShowcaseSection = {
  id: 'radky-seznamu',
  title: '§ Řádky seznamů',
  order: 55,
  note: 'Nejpoužívanější prvek aplikace. Vysoký 74 px, aby se dal pohodlně trefit i prstem. Řádek s množstvím (ListRow / Množství) je řádek košíku — má vlastní ukázku v § Pokladna · prodej, časová osa je v § Data · rozšíření.',
  demos: [
    {
      title: 'Údaj se stavem',
      note: 'Řádek do karty: dvouřádkový text vlevo, barevný stav vpravo. Vlastní plochu nemá.',
      stack: true,
      render: () => (
        <SirkaRadku>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <MetaRow title="Jaro 2026 · JARO10" sub="10 % · 37 / 120 uplatněno" status="aktivní" tone="ok" />
            <MetaRow title="Vánoce 2025 · XMAS15" sub="15 % · 88 / 100 uplatněno" status="skončila" />
            <MetaRow title="Otevření e-shopu" sub="200 Kč · připraveno" status="naplánováno" tone="warning" />
          </div>
        </SirkaRadku>
      ),
    },
    {
      title: 'S ikonou a šipkou',
      note: 'Dlouhý nadpis se ořízne třemi tečkami — datum ani šipka se nikdy neuříznou.',
      stack: true,
      wide: true,
      render: () => (
        <SirkaRadku>
          <ListRow
            icon={<IconX size={19} />}
            tone="danger"
            title="Záznam se nepodařilo odeslat"
            sub="ZÁZ-2026-000021 · účetní ho nevidí"
            date="13. 9."
            onClick={() => {}}
          />
        </SirkaRadku>
      ),
    },
    {
      title: 'Užší řádek telefonu',
      note: 'Varianta z artboardu mobilu (Můj rozpis): 62 px a menší písmo, aby se na displej telefonu vešel celý týden. Jinak se chová stejně — odznak i akcentovaný výběr platí dál.',
      stack: true,
      wide: true,
      render: () => (
        <SirkaRadku>
          <ListRow compact title="Úterý 15. 9." sub="8:00 – 18:00 · 10 h" />
          <ListRow compact active title="Středa 16. 9." sub="8:00 – 18:00 · 10 h" badge={<Badge tone="info">dnes</Badge>} />
          <ListRow compact disabled title="Neděle 20. 9." sub="volno" />
        </SirkaRadku>
      ),
    },
    {
      title: 'Vybraný řádek',
      note: 'Seznam s detailem vedle sebe (doklady, odložené účty): vybraný řádek drží akcentovou výplň a obrys, aby byl poznat i ze dvou metrů. Nesouvisí se zaškrtávátkem hromadného výběru.',
      stack: true,
      wide: true,
      render: () => (
        <SirkaRadku>
          <ListRow
            icon={<IconReceipt size={19} />}
            title="P01-2026-000042"
            sub="hotově · 8 460 Kč · 10:18"
            active
            onClick={() => {}}
          />
          <ListRow
            icon={<IconReceipt size={19} />}
            title="P01-2026-000041"
            sub="kartou · 2 480 Kč · 9:41"
            onClick={() => {}}
          />
        </SirkaRadku>
      ),
    },
    {
      title: 'Jako odkaz',
      note: 'S `href` je řádek `<a>` — rozcestník vykreslený na serveru funguje i bez JavaScriptu a jde otevřít na novou kartu. Nedostupný řádek odkaz nekreslí.',
      stack: true,
      wide: true,
      render: () => (
        <SirkaRadku>
          <ListRow
            icon={<IconFile size={19} />}
            title="Skener a dostupnost"
            sub="Načtěte kód kamerou, uvidíte velikosti"
            href="#radky-seznamu"
          />
          <ListRow
            icon={<IconFile size={19} />}
            title="Přehled majitele"
            sub="Jen pro majitele"
            href="#radky-seznamu"
            disabled
          />
        </SirkaRadku>
      ),
    },
    {
      title: 'S akčním tlačítkem',
      note: 'Akce na řádku je nejvýš jedna a nikdy nezakryje text.',
      stack: true,
      wide: true,
      render: () => (
        <SirkaRadku>
          <ListRow
            icon={<IconAlert size={19} />}
            tone="warning"
            title="Záporná hodnota u položky"
            sub="Položka B-500 · chybí 16 ks"
            action={<Button size="s">Doplnit</Button>}
            onClick={() => {}}
          />
        </SirkaRadku>
      ),
    },
    {
      title: 'S částkou a stavem',
      note: 'Částka i odznak drží jeden řádek; při zúžení se ořízne text, ne čísla.',
      stack: true,
      wide: true,
      render: () => (
        <SirkaRadku>
          <ListRow
            icon={<IconFile size={19} />}
            title="ZÁZ-2026-000023"
            sub="včera 14:18 · kartou"
            amount="19 356 Kč"
            badge={
              <Badge tone="success" icon={<IconCheck size={12} />}>
                Odesláno
              </Badge>
            }
            onClick={() => {}}
          />
        </SirkaRadku>
      ),
    },
    {
      title: 'S miniaturou zboží',
      note: 'Miniatura 44 px; když obrázek chybí, zůstane tiché místo, ne prázdná díra.',
      stack: true,
      wide: true,
      render: () => (
        <SirkaRadku>
          <ListRow
            thumb
            title="Položka A-230"
            sub="765732344 · skladem 5 ks"
            amount="5 806 Kč"
            onClick={() => {}}
          />
        </SirkaRadku>
      ),
    },
    {
      title: 'S osobou',
      note: 'Avatar místo dlaždice; barva kolečka se odvodí z iniciál.',
      stack: true,
      wide: true,
      render: () => (
        <SirkaRadku>
          <ListRow
            avatar={<Avatar initials="JN" size={40} />}
            title="Jan Novák"
            sub="Správce · aktivní od 8:02"
            badge={
              <Badge tone="success" icon={<IconCheck size={12} />}>
                Na směně
              </Badge>
            }
            onClick={() => {}}
          />
        </SirkaRadku>
      ),
    },
    {
      title: 'S vypínačem',
      note: 'Vypínač na řádku nevede na detail — řádek proto nemá šipku.',
      stack: true,
      wide: true,
      render: () => (
        <SirkaRadku>
          <ListRow
            icon={<IconBell size={19} />}
            tone="purple"
            title="Upozornění e-mailem"
            sub="Při každé změně stavu"
            action={<Switch checked onChange={() => {}} label="Upozornění e-mailem" />}
          />
        </SirkaRadku>
      ),
    },
    {
      title: 'S výběrem',
      note: 'Zaškrtávátko pro hromadné akce — vybraný řádek pozná i tvar, nejen barva.',
      stack: true,
      wide: true,
      render: () => (
        <SirkaRadku>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ListRow
              selectable
              thumb
              title="Položka B-500"
              sub="S1-50 · skladem −16 ks"
              amount="9 678 Kč"
            />
            <ListRow
              selectable
              selected
              thumb
              title="Položka B-510"
              sub="S1-51 · skladem 0 ks"
              amount="9 678 Kč"
            />
          </div>
        </SirkaRadku>
      ),
    },
    {
      title: 'Seskupený seznam · celý blok',
      note: 'Výplň a rádius nese blok; linka mezi řádky začíná až za dlaždicí.',
      stack: true,
      wide: true,
      render: () => (
        <div style={{ width: 560, maxWidth: '100%' }}>
          <GroupedList>
            <ListRow
              icon={<IconX size={19} />}
              tone="danger"
              title="Záznam se nepodařilo odeslat"
              sub="ZÁZ-2026-000021"
              date="13. 9."
              onClick={() => {}}
            />
            <ListRow
              icon={<IconAlert size={19} />}
              tone="warning"
              title="2 záznamy čekají na odeslání"
              sub="Odejdou samy"
              date="13. 9."
              onClick={() => {}}
            />
            <ListRow
              icon={<IconAlert size={19} />}
              tone="warning"
              title="Záporná hodnota u položky"
              sub="Položka B-500 · chybí 16 ks"
              date="13. 9."
              onClick={() => {}}
            />
            <ListRow
              icon={<IconFile size={19} />}
              tone="info"
              title="Položka bez ceny"
              sub="Položka B-510"
              date="12. 9."
              onClick={() => {}}
            />
          </GroupedList>
        </div>
      ),
    },
  ],
}
