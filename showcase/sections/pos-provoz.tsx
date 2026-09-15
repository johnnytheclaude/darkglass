import { useState } from 'react'
import { Button } from '../../src/components/Buttons/Button'
import { IconBell } from '../../src/components/Icons/IconBell'
import { IconChevronLeft } from '../../src/components/Icons/IconChevronLeft'
import { IconReceipt } from '../../src/components/Icons/IconReceipt'
import { GroupedList } from '../../src/components/Lists/GroupedList'
import { ListRow } from '../../src/components/Lists/ListRow'
import { AccentCard } from '../../src/components/Pos/AccentCard'
import { ActionPanel } from '../../src/components/Pos/ActionPanel'
import { CaptionButton } from '../../src/components/Pos/CaptionButton'
import { ChoiceCard } from '../../src/components/Pos/ChoiceCard'
import { ChoiceGroup } from '../../src/components/Pos/ChoiceGroup'
import { ConfirmSheet } from '../../src/components/Pos/ConfirmSheet'
import { CountRow } from '../../src/components/Pos/CountRow'
import { GroupCaption } from '../../src/components/Pos/GroupCaption'
import { GroupHeader } from '../../src/components/Pos/GroupHeader'
import { InlineActions } from '../../src/components/Pos/InlineActions'
import { InlineNotice } from '../../src/components/Pos/InlineNotice'
import { Ledger } from '../../src/components/Pos/Ledger'
import { MenuTile } from '../../src/components/Pos/MenuTile'
import { QuantityRow } from '../../src/components/Pos/QuantityRow'
import { RequestCard } from '../../src/components/Pos/RequestCard'
import { StatusList } from '../../src/components/Pos/StatusList'
import { StatusModal, StatusModalLine } from '../../src/components/Pos/StatusModal'
import { StepsCompact } from '../../src/components/Pos/StepsCompact'
import { TaskRow } from '../../src/components/Pos/TaskRow'
import type { ShowcaseSection } from '../registry'

/** Volba druhu vratky — ChoiceCard je řízená, výběr drží obrazovka. */
function UkazkaVolby() {
  const [volba, setVolba] = useState('penize')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      <ChoiceCard
        title="Výměna"
        description="přidat nové zboží, doplatek nebo rozdíl"
        selected={volba === 'vymena'}
        onClick={() => setVolba('vymena')}
      />
      <ChoiceCard
        title="Vrátit peníze"
        description="kartou přes terminál (zaplaceno kartou před 2 dny)"
        selected={volba === 'penize'}
        onClick={() => setVolba('penize')}
      />
      <ChoiceCard
        title="Vrátit na kartu"
        description="terminál je v ručním režimu — peníze musí vrátit obsluha"
        disabled
      />
    </div>
  )
}

/** Krokovač množství — hodnota patří účtu, komponenta ji jen ukazuje. */
function UkazkaMnozstvi() {
  const [kusu, setKusu] = useState(1)
  return (
    <QuantityRow
      name="Černé sako PREMIUM · vel. 54"
      note="po věrnostní slevě 5 %"
      price="12 340,50 Kč"
      quantity={kusu}
      onDecrease={() => setKusu((n) => Math.max(1, n - 1))}
      onIncrease={() => setKusu((n) => n + 1)}
    />
  )
}

/** Skupina voleb slevy — poslední volba otevírá vlastní částku. */
function UkazkaSkupinyVoleb() {
  const [sleva, setSleva] = useState<string | null>('20')
  return (
    <ChoiceGroup
      label="Sleva na košík"
      value={sleva}
      onChange={setSleva}
      options={[
        { value: '5', label: '5 %' },
        { value: '10', label: '10 %' },
        { value: '15', label: '15 %' },
        { value: '20', label: '20 %' },
        { value: 'vlastni', label: 'vlastní' },
      ]}
    />
  )
}

export const section: ShowcaseSection = {
  id: 'pokladna-provoz',
  title: '§ Pokladna · provoz a doklady',
  order: 200,
  note: 'Prvky doplněné podle původních návrhů: doklady, vratky, uzávěrka, inventura, naskladnění a menu. Řádky i tlačítka jsou dost velké na ovládání prstem i myší. Stavová lišta má vlastní sekci výš.',
  demos: [
    {
      title: 'Zpět',
      note: 'Návrat z agendy do prodeje — běžné tlačítko s šipkou, ne vlastní komponenta.',
      render: () => (
        <Button variant="secondary" size="l" iconStart={<IconChevronLeft />}>
          Prodej
        </Button>
      ),
    },
    {
      title: 'Kroky procesu',
      stack: true,
      wide: true,
      note: 'Nav / Steps Compact: hotové i právě probíhající kolečko na akcentu, další ztlumená. Na úzké obrazovce se kroky zalomí.',
      render: () => (
        <StepsCompact
          current={1}
          steps={[
            { key: 'uctenka', label: 'Účtenka' },
            { key: 'polozky', label: 'Položky' },
            { key: 'volba', label: 'Volba' },
            { key: 'potvrzeni', label: 'Potvrzení' },
          ]}
        />
      ),
    },
    {
      title: 'Volba · běžná a vybraná',
      stack: true,
      note: 'Choice Card je tlačítko: jde na něj tabulátorem a čtečka přečte, která volba je vybraná. Klikni si.',
      render: () => <UkazkaVolby />,
    },
    {
      title: 'Upozornění v řádku',
      stack: true,
      note: 'Notice / Inline ve třech laděních návrhu — limit, chyba, v pořádku. Tučná část říká co se stalo, zbytek co z toho plyne.',
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          <InlineNotice tone="warning" label="Nad limit obsluhy 1 000 Kč">
            · potvrzení vyžaduje PIN vedoucího
          </InlineNotice>
          <InlineNotice tone="danger" label="Nad toleranci 100 Kč">
            · poznámka je povinná
          </InlineNotice>
          <InlineNotice tone="success" label="V limitu obsluhy">
            · uplatní se rovnou, bez schválení
          </InlineNotice>
        </div>
      ),
    },
    {
      title: 'Řádky inventury',
      stack: true,
      wide: true,
      note: 'Table / Group Header nad skupinou a Row / Tint OK · Chyba · Info pod ní. Rozdíl se pozná podle podkladu i barvy čísla; dlouhý název se zkrátí výpustkou.',
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
          <GroupHeader label="Nepípnuté" count={4} />
          <CountRow
            tone="ok"
            name="Sako PREMIUM · vel. 48"
            expected="2"
            counted="2"
            difference="0"
          />
          <CountRow
            tone="error"
            name="Sako PREMIUM · vel. 52"
            expected="1"
            counted="0"
            difference="−1"
          />
          <CountRow
            tone="info"
            name="Sako PREMIUM · vel. 54"
            expected="0"
            counted="1"
            difference="+1"
          />
        </div>
      ),
    },
    {
      title: 'Řádek s množstvím',
      stack: true,
      wide: true,
      note: 'ListRow / Množství s krokovačem 44×44 px. Zkus ubrat pod jeden kus — tlačítko zešedne.',
      render: () => <UkazkaMnozstvi />,
    },
    {
      title: 'Rozpis se součtem',
      stack: true,
      note: 'Ledger / Rozpis z uzávěrky: položky, linka, součet. Čísla jsou tabulková, takže stojí pod sebou.',
      render: () => (
        <Ledger
          totalLabel="Očekáváno"
          totalValue="20 072 Kč"
          lines={[
            { key: 'pocatecni', label: 'Počáteční hotovost', value: '10 000' },
            { key: 'prodeje', label: 'Hotovostní prodeje', value: '+ 24 362' },
            { key: 'vklady', label: 'Vklady', value: '+ 2 000' },
            { key: 'vybery', label: 'Výběry', value: '− 15 000' },
            { key: 'vratky', label: 'Hotovostní vratky', value: '− 1 290' },
          ]}
        />
      ),
    },
    {
      title: 'Stavový řádek',
      stack: true,
      note: 'Row / Stav v menu pokladny. Stav je barevný, akce vedle něj modrá a kliknutelná.',
      render: () => (
        <StatusList
          lines={[
            {
              key: 'tiskarna',
              label: 'Tiskárna účtenek',
              value: 'dostupná',
              tone: 'ok',
              action: '· zkušební tisk',
              onAction: () => undefined,
            },
            {
              key: 'fronta',
              label: 'Fronta dokladů',
              value: '2 čekají',
              tone: 'warning',
              action: '· 1 chyba',
              onAction: () => undefined,
            },
            { key: 'terminal', label: 'Terminál GP tom', value: 'propojen', tone: 'ok' },
          ]}
        />
      ),
    },
    {
      title: 'Úloha se stavem',
      stack: true,
      note: 'Row / Úloha — dlouhá úloha (párování dodacího listu) se stavem v odznaku.',
      render: () => <TaskRow name="Řádky zboží · 14 z 22" badge="probíhá" tone="accent" />,
    },
    {
      title: 'Skupina',
      stack: true,
      note: 'Skupina — tichý popisek nad blokem řádků menu. Nemá výplň ani verzálky, jen pojmenuje, co pod ním následuje.',
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <GroupCaption>Peníze a směna</GroupCaption>
          <GroupedList>
            <ListRow icon={<IconReceipt />} title="Vklad a výběr hotovosti" sub="S důvodem z číselníku" chevron />
            <ListRow icon={<IconReceipt />} title="Uzávěrka směny" sub="Slepé počítání kasy, terminál, Z-report" chevron />
          </GroupedList>
        </div>
      ),
    },
    {
      title: 'Dlaždice menu',
      stack: true,
      note: 'Tile / Menu z menu Pokladny (F9). Popis nese stav agendy a barví se podle něj.',
      render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, width: '100%' }}>
          <div style={{ width: 290, maxWidth: '100%' }}>
            <MenuTile name="Doklady" description="2 čekají · 1 chyba" tone="warning" />
          </div>
          <div style={{ width: 290, maxWidth: '100%' }}>
            <MenuTile name="Inventura" description="probíhá od 8:40" tone="accent" />
          </div>
        </div>
      ),
    },
    {
      title: 'Tlačítko s podtitulkem',
      note: 'Btn / S popiskem — pod akcí stojí její cíl, ať je vidět, kam účtenka půjde.',
      render: () => <CaptionButton label="Poslat e-mailem" caption="marie.dvorakova@…" />,
    },
    {
      title: 'Zvýrazněná karta s akcí',
      stack: true,
      note: 'Card / Akcentová s akcí přes celou šířku — oznámení, na které má obsluha reagovat.',
      render: () => (
        <AccentCard
          title="Nová verze 1.0.4 je připravená"
          description="Nainstaluje se po zamknutí, ne během platby."
          action={<Button block>Instalovat</Button>}
        />
      ),
    },
    {
      title: 'Spodní potvrzovací panel',
      stack: true,
      wide: true,
      note: 'Sheet / Dolní u spodní hrany obrazovky. Volby se v úzkém místě zalomí pod sebe.',
      render: () => (
        <ConfirmSheet
          title="Obnovit účet z 14:12?"
          description="V košíku už jsou 3 položky za 16 872 Kč."
        >
          <Button variant="secondary" size="l">
            Přidat k košíku
          </Button>
          <Button variant="secondary" size="l">
            Nahradit košík
          </Button>
          <Button variant="ghost" size="l">
            Zpět
          </Button>
        </ConfirmSheet>
      ),
    },
    {
      title: 'Boční panel s akcí',
      stack: true,
      note: 'Panel / Akce z vratky: částka nahoře, hlavní akce dole u hrany panelu, pravidlo pod ní.',
      render: () => (
        <div style={{ width: 360, maxWidth: '100%', height: 380 }}>
          <ActionPanel
            caption="K vrácení zákazníkovi"
            amount="12 340,50 Kč"
            note="skutečně zaplacená částka po slevách"
            action={<Button block>Pokračovat</Button>}
            footer="Vratka bez účtenky · vždy PIN vedoucího"
          />
        </div>
      ),
    },
    {
      title: 'Skupina voleb',
      stack: true,
      note: 'Volby / Skupina — vybraná volba je kontrastní, ne jen orámovaná. Volby jsou 54 px vysoké kvůli prstu.',
      render: () => <UkazkaSkupinyVoleb />,
    },
    {
      title: 'Řádek textových akcí',
      stack: true,
      note: 'Drobné akce pod obsahem. Jsou to tlačítka, ne odkazy — nikam nevedou, něco dělají.',
      render: () => (
        <InlineActions
          actions={[
            { key: 'prejmenovat', label: 'Přejmenovat parametr' },
            { key: 'rozdelit', label: 'Rozdělit na dva produkty' },
            { key: 'sloucit', label: 'Sloučit s existujícím…' },
          ]}
        />
      ),
    },
    {
      title: 'Karta s ikonou a akcemi',
      stack: true,
      wide: true,
      note: 'Card / Žádost — čekající schválení vedoucím. Odznak odpočítává, akce jsou pod textem.',
      render: () => (
        <RequestCard
          icon={<IconBell size={20} />}
          title="Žádost odeslána Tomáši Novotnému"
          meta="14:33 · na telefon · sleva 20 % na 12 990 Kč"
          badge="čeká 0:42"
        >
          <Button variant="secondary">Zadat PIN vedoucího tady</Button>
          <Button variant="ghost">Zrušit žádost</Button>
        </RequestCard>
      ),
    },
    {
      title: 'Modál se stavovým pruhem',
      stack: true,
      wide: true,
      note: 'Modal / Stavový: co se stalo, co to znamená pro prodej (pruh), čeho se to týká (seznam) a co udělat dál.',
      render: () => (
        <div style={{ width: 520, maxWidth: '100%' }}>
          <StatusModal
            tone="danger"
            icon={<IconBell size={20} />}
            title="3 doklady se nepodařilo odeslat"
            meta="InvoiceHub · poslední pokus 14:31 · odpověď 401 Unauthorized"
            onClose={() => undefined}
            notice={
              <InlineNotice tone="warning" label="Prodej běží dál.">
                Doklady jsou lokálně uložené a číslované; do evidence půjdou, až se spojení opraví.
              </InlineNotice>
            }
            hint="Klíč InvoiceHubu nejspíš vypršel. Opraví ho majitel v Adminu → Nastavení → Integrace; pokladna pak frontu odešle sama."
            footer={
              <>
                <Button variant="secondary">Zavřít</Button>
                <Button variant="secondary">Upozornit majitele</Button>
                <Button>Zkusit znovu</Button>
              </>
            }
          >
            <StatusModalLine
              label="P01-2026-000122 · 14:12 · 1 890 Kč"
              status="401 · neplatný API klíč"
              error
            />
            <StatusModalLine
              label="P01-2026-000123 · 14:20 · 16 872 Kč"
              status="401 · neplatný API klíč"
              error
            />
            <StatusModalLine
              label="P01-2026-000124 · 14:31 · 3 480 Kč"
              status="401 · neplatný API klíč"
              error
            />
          </StatusModal>
        </div>
      ),
    },
  ],
}
