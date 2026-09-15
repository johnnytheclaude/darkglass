import { Button } from '../../src/components/Buttons/Button'
import { IconButton } from '../../src/components/Buttons/IconButton'
import { IconEllipsis } from '../../src/components/Icons/IconEllipsis'
import { IconPencil } from '../../src/components/Icons/IconPencil'
import { IconPlus } from '../../src/components/Icons/IconPlus'
import { IconSearch } from '../../src/components/Icons/IconSearch'
import { IconX } from '../../src/components/Icons/IconX'
import type { ShowcaseSection } from '../registry'

export const section: ShowcaseSection = {
  id: 'tlacitka',
  title: '§ Tlačítka',
  order: 20,
  note: 'Btn / * z návrhu. Výšky 34 / 42 / 52 px, rádius pill, popisek 14,5 px. Hover, stisk a zaměření jsou živé — najeď myší, klikni a projdi tabulátorem.',
  demos: [
    {
      title: 'Varianty',
      note: 'Primární nese akcent, takže se po přepnutí akcentu přebarví.',
      render: () => (
        <>
          <Button variant="primary">Uložit</Button>
          <Button variant="secondary">Upravit</Button>
          <Button variant="ghost">Zrušit</Button>
          <Button variant="outline">Exportovat</Button>
          <Button variant="contrast">Naskladnit</Button>
          <Button variant="danger">Odepsat</Button>
          <Button variant="dangerSoft">Smazat</Button>
          <Button variant="success">Potvrdit</Button>
        </>
      ),
    },
    {
      title: 'Velikosti',
      note: 'S 34, M 42, L 52 px podle návrhu; přepínač velikosti UI je ještě škáluje.',
      render: () => (
        <>
          <Button size="s">Malé</Button>
          <Button size="m">Běžné</Button>
          <Button size="l">Velké</Button>
          <Button variant="secondary" size="s">
            Malé
          </Button>
          <Button variant="secondary" size="m">
            Běžné
          </Button>
          <Button variant="secondary" size="l">
            Velké
          </Button>
        </>
      ),
    },
    {
      title: 'S ikonou',
      note: 'Ikona je inline SVG v currentColor, pro čtečku skrytá — popis nese text tlačítka.',
      render: () => (
        <>
          <Button iconStart={<IconPlus />}>Nová položka</Button>
          <Button variant="secondary" iconStart={<IconPencil />}>
            Upravit
          </Button>
          <Button variant="outline" iconStart={<IconSearch />} size="s">
            Hledat
          </Button>
          <Button variant="ghost" iconEnd={<IconX />}>
            Zavřít
          </Button>
        </>
      ),
    },
    {
      title: 'Stavy',
      note: 'Neaktivní je skutečný disabled (nejde doklepnout). Načítání obsah překryje, rozměr se nemění.',
      render: () => (
        <>
          <Button>Běžné</Button>
          <Button disabled>Neaktivní</Button>
          <Button loading>Ukládám</Button>
          <Button variant="secondary" disabled>
            Neaktivní
          </Button>
          <Button variant="secondary" loading>
            Načítám
          </Button>
          <Button variant="danger" loading>
            Odepisuji
          </Button>
        </>
      ),
    },
    {
      title: 'Na celou šířku',
      note: 'Btn / Primary Full — potvrzení v dialogu a na Pokladně.',
      stack: true,
      render: () => (
        <>
          <Button size="l" block>
            Zaplatit 1 240 Kč
          </Button>
          <Button variant="secondary" size="l" block>
            Odložit účet
          </Button>
          <Button variant="outline" block disabled>
            Nedostupné offline
          </Button>
        </>
      ),
    },
    {
      title: 'Ikonová tlačítka',
      note: 'Btn / Icon — čtverec 34 / 42 / 52 px. Popis je povinný prop label, vykreslí se jako aria-label.',
      render: () => (
        <>
          <IconButton icon={<IconSearch />} label="Hledat" size="s" />
          <IconButton icon={<IconSearch />} label="Hledat" />
          <IconButton icon={<IconSearch />} label="Hledat" size="l" />
          <IconButton icon={<IconPlus />} label="Přidat" variant="primary" />
          <IconButton icon={<IconPencil />} label="Upravit" variant="ghost" />
          <IconButton icon={<IconX />} label="Smazat" variant="dangerSoft" />
          <IconButton icon={<IconEllipsis />} label="Další akce" variant="ghost" />
        </>
      ),
    },
    {
      title: 'Ikonová tlačítka — stavy',
      render: () => (
        <>
          <IconButton icon={<IconPlus />} label="Přidat" variant="primary" disabled />
          <IconButton icon={<IconPlus />} label="Přidat" variant="primary" loading />
          <IconButton icon={<IconPencil />} label="Upravit" disabled />
          <IconButton icon={<IconPencil />} label="Upravit" loading />
        </>
      ),
    },
  ],
}
