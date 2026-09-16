import { BarChartHorizontal } from '../../src/components/Charts/BarChartHorizontal'
import { BarChartVertical } from '../../src/components/Charts/BarChartVertical'
import { DonutChart } from '../../src/components/Charts/DonutChart'
import { MiniBars } from '../../src/components/Charts/MiniBars'
import { Sparkbars } from '../../src/components/Charts/Sparkbars'
import { StackedBarChart } from '../../src/components/Charts/StackedBarChart'
import type { ShowcaseSection } from '../registry'

/* Data jsou zástupná — knihovna žádná nemá a mít nesmí. Čísla jsou z návrhu,
   ať jde poměr sloupců porovnat s předlohou. */

export const section: ShowcaseSection = {
  id: 'grafy',
  title: '§ Grafy',
  order: 100,
  note: 'Jen sloupce a prstence — spolehlivě se vykreslí a čtou se bez legendy.',
  demos: [
    {
      title: 'Nízké sloupce do karty',
      note: 'Hodnota nad sloupcem, prázdné pásmo zůstává vidět jako tenká stopa.',
      wide: true,
      render: () => (
        <div style={{ maxWidth: 420 }}>
          <MiniBars
            bars={[
              { label: '0–6 měs.', value: 1360, valueLabel: '1 360 Kč' },
              { label: '6–12 měs.', value: 0, valueLabel: '0 Kč' },
              { label: '12–24 měs.', value: 0, valueLabel: '0 Kč' },
              { label: '24+ měs.', value: 0, valueLabel: '0 Kč' },
            ]}
          />
        </div>
      ),
    },
    {
      title: 'Svislé sloupce s osou',
      note: 'Osa drží vlevo, vyzdvižený sloupec má nad sebou hodnotu.',
      wide: true,
      render: () => (
        <BarChartVertical
          title="Vývoj v čase"
          subtitle="Celkem (Kč)"
          style={{ maxWidth: 440 }}
          ticks={['60k', '45k', '30k', '15k', '0']}
          max={60000}
          bars={[
            { label: 'Kvě', value: 33430 },
            { label: 'Čvn', value: 45010 },
            { label: 'Čvc', value: 40720 },
            { label: 'Srp', value: 50580 },
            { label: 'Zář', value: 56130, valueLabel: '56 130', highlight: true },
          ]}
        />
      ),
    },
    {
      title: 'Vodorovné sloupce · žebříček',
      note: 'Název i hodnota nad pruhem, takže se nekrátí ani v úzké kartě.',
      wide: true,
      render: () => (
        <BarChartHorizontal
          title="Nejčastější položky"
          subtitle="Za posledních 7 dní"
          style={{ maxWidth: 420 }}
          rows={[
            { name: 'Položka A-230', value: 23210, valueLabel: '23 210 Kč', highlight: true },
            { name: 'Položka B-500', value: 19356, valueLabel: '19 356 Kč' },
            { name: 'Položka A-240', value: 9678, valueLabel: '9 678 Kč' },
            { name: 'Položka B-510', value: 3886, valueLabel: '3 886 Kč' },
          ]}
        />
      ),
    },
    {
      title: 'Prstenec s legendou',
      note: 'Legenda se v úzkém místě zalomí pod prstenec.',
      wide: true,
      render: () => (
        <DonutChart
          title="Rozdělení podle typu"
          subtitle="Podíl na celku"
          centerValue="56 130"
          centerUnit="Kč celkem"
          style={{ maxWidth: 400 }}
          segments={[
            { label: 'Možnost A', value: 62, valueLabel: '62 %' },
            { label: 'Možnost B', value: 21, valueLabel: '21 %' },
            { label: 'Možnost C', value: 17, valueLabel: '17 %' },
          ]}
        />
      ),
    },
    {
      title: 'Skládané sloupce',
      note: 'Dvě kategorie v jednom sloupci; krajní segmenty mají zaoblení.',
      wide: true,
      render: () => (
        <StackedBarChart
          title="Rozdělení po dnech"
          subtitle="Dvě kategorie"
          style={{ maxWidth: 440 }}
          groups={[
            { label: 'Po', segments: [{ value: 25, label: 'Kategorie A' }, { value: 40, label: 'Kategorie B' }] },
            { label: 'Út', segments: [{ value: 30, label: 'Kategorie A' }, { value: 70, label: 'Kategorie B' }] },
            { label: 'St', segments: [{ value: 20, label: 'Kategorie A' }, { value: 55, label: 'Kategorie B' }] },
            { label: 'Čt', segments: [{ value: 45, label: 'Kategorie A' }, { value: 90, label: 'Kategorie B' }] },
            { label: 'Pá', segments: [{ value: 35, label: 'Kategorie A' }, { value: 65, label: 'Kategorie B' }] },
          ]}
        />
      ),
    },
    {
      title: 'Malý graf s osou (telefon)',
      note: 'Popisků je pár a rozprostřou se po šířce — u dvaceti čtyř sloupců by se slily.',
      wide: true,
      render: () => (
        <Sparkbars
          title="Průběh"
          subtitle="Dnes"
          style={{ maxWidth: 330 }}
          axis={['0', '8', '15', '23']}
          bars={Array.from({ length: 24 }, (_, hour) => ({
            value: hour >= 8 && hour <= 18 ? 10 + ((hour * 37) % 60) : 0,
            label: `${hour}:00`,
            highlight: hour >= 8 && hour <= 18,
          }))}
        />
      ),
    },
    {
      title: 'Malý graf v kartě',
      note: 'Bez osy a bez legendy — ukazuje jen tvar dne.',
      wide: true,
      render: () => (
        <Sparkbars
          title="Aktivita po hodinách"
          subtitle="Dnes"
          style={{ maxWidth: 300 }}
          bars={[
            { value: 2, label: '8:00' },
            { value: 31, label: '9:00' },
            { value: 63, label: '10:00' },
            { value: 2, label: '11:00' },
            { value: 46, label: '12:00' },
            { value: 100, label: '13:00', highlight: true },
            { value: 63, label: '14:00' },
            { value: 100, label: '15:00', highlight: true },
            { value: 57, label: '16:00' },
            { value: 2, label: '17:00' },
          ]}
        />
      ),
    },
  ],
}
