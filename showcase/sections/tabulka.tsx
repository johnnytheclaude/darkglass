import { useState } from 'react'
import { Button } from '../../src/components/Buttons/Button'
import { Chip } from '../../src/components/Controls/Chip'
import { IconFile } from '../../src/components/Icons/IconFile'
import { DataTable, TableName, TableNumber } from '../../src/components/Table/DataTable'
import { Pagination } from '../../src/components/Table/Pagination'
import { TableSearch, TableToolbar } from '../../src/components/Table/TableToolbar'
import type { DataTableColumn, DataTableRow } from '../../src/components/Table/DataTable'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná — knihovna doménu nezná. */

const SLOUPCE: DataTableColumn[] = [
  { label: 'POLOŽKA' },
  { label: 'EXTERNÍ KÓD', width: 180, muted: true },
  { label: 'JEDN.', width: 70, muted: true },
  { label: 'MNOŽSTVÍ', width: 110, align: 'right', sortable: true },
  { label: 'REZERVOVÁNO', width: 100, align: 'right', muted: true },
  { label: 'JEDN. CENA', width: 140, align: 'right', muted: true },
  { label: 'HODNOTA', width: 130, align: 'right' },
]

const RADKY: DataTableRow[] = [
  {
    id: 'a230',
    cells: [
      <TableName>Položka A-230</TableName>,
      '765732344',
      'ks',
      <TableNumber>5</TableNumber>,
      '0',
      '2 399 Kč',
      '11 995 Kč',
    ],
  },
  {
    id: 'a240',
    cells: [
      <TableName>Položka A-240</TableName>,
      '765732345',
      'ks',
      <TableNumber>9</TableNumber>,
      '0',
      '2 399 Kč',
      '21 591 Kč',
    ],
  },
  {
    id: 'b500',
    tone: 'danger',
    cells: [
      <TableName>Položka B-500</TableName>,
      'S1-50',
      'ks',
      <TableNumber negative>−16</TableNumber>,
      '0',
      '3 999 Kč',
      '3 999 Kč',
    ],
  },
  {
    id: 'b510',
    cells: [
      <TableName>Položka B-510</TableName>,
      'S1-51',
      'ks',
      <TableNumber>0</TableNumber>,
      '18',
      'neznámá',
      '0 Kč',
    ],
  },
]

function UkazkaPanelu() {
  const [filtr, setFiltr] = useState('vse')

  return (
    <TableToolbar
      search={<TableSearch placeholder="Hledat položku nebo kód…" />}
      filters={
        <>
          <Chip selected={filtr === 'vse'} onClick={() => setFiltr('vse')}>
            Vše
          </Chip>
          <Chip selected={filtr === 'zaporne'} onClick={() => setFiltr('zaporne')}>
            Záporné
          </Chip>
          <Chip selected={filtr === 'proverit'} onClick={() => setFiltr('proverit')}>
            K prověření
          </Chip>
        </>
      }
      count="4 položky · celkem 37 585 Kč"
      actions={
        <Button variant="secondary" size="s" iconStart={<IconFile size={16} />}>
          Vytisknout
        </Button>
      }
    />
  )
}

function UkazkaTabulky() {
  const [vybrane, setVybrane] = useState<string[]>([])

  return (
    <DataTable
      columns={SLOUPCE}
      rows={RADKY.map((radek) => ({ ...radek, selected: vybrane.includes(radek.id) }))}
      selectable
      onSelectedChange={(id, selected) =>
        setVybrane((stav) => (selected ? [...stav, id] : stav.filter((x) => x !== id)))
      }
      onRowClick={() => {}}
    />
  )
}

function UkazkaStrankovani() {
  const [strana, setStrana] = useState(1)

  return (
    <Pagination
      page={strana}
      pageCount={9}
      info="Zobrazeno 1–4 ze 4"
      onPageChange={setStrana}
    />
  )
}

export const section: ShowcaseSection = {
  id: 'tabulka',
  title: '§ Tabulka',
  order: 60,
  note: 'Pro seznamy o stovkách řádků. Čísla vždy vpravo, záporné hodnoty červeně.',
  demos: [
    {
      title: 'Panel nad tabulkou',
      note: 'Na úzkém okně se panel zalomí na víc řádků; hledání ani tlačítko nepřetečou.',
      stack: true,
      wide: true,
      render: () => <UkazkaPanelu />,
    },
    {
      title: 'Tabulka',
      note: 'Sloupce mají pevné šířky, takže se čísla drží pod sebou; v úzkém okně se tabulka posouvá vodorovně místo přetékání. Řádek v mínusu má tichý červený podklad a hodnotu červeně.',
      stack: true,
      wide: true,
      render: () => <UkazkaTabulky />,
    },
    {
      title: 'Stránkování',
      note: 'Čísla se drží kolem aktuální stránky, zbytek je pod výpustkou.',
      stack: true,
      wide: true,
      render: () => <UkazkaStrankovani />,
    },
  ],
}
