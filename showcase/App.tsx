import { useEffect, useState } from 'react'
import { sections } from './registry'

const THEMES = [
  { key: 'light', label: 'Světlý' },
  { key: 'dark', label: 'Tmavý' },
] as const

/** Akcent je white-label: firma si ho přepisuje. Ukázka tím ověřuje, že žádná
    komponenta nemá barvu natvrdo — po přepnutí se musí přebarvit všechno. */
const ACCENTS = [
  { key: 'modra', label: 'Modrá (návrh)', light: '#0071E3', dark: '#0A84FF' },
  { key: 'fialova', label: 'Fialová (druhá barva)', light: '#8E30BE', dark: '#BF5AF2' },
] as const

/** Poměry z artboardu 16 — velikost UI Pokladny. */
const SIZES = [
  { key: 'small', label: 'Menší' },
  { key: 'normal', label: 'Běžná' },
  { key: 'large', label: 'Větší' },
] as const

type ThemeKey = (typeof THEMES)[number]['key']
type AccentKey = (typeof ACCENTS)[number]['key']
type SizeKey = (typeof SIZES)[number]['key']

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly { key: T; label: string }[]
  onChange: (next: T) => void
}) {
  return (
    <div className="sc-control">
      <span className="sc-control__label">{label}</span>
      <div className="sc-segmented" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            className={
              option.key === value ? 'sc-segmented__item is-selected' : 'sc-segmented__item'
            }
            aria-pressed={option.key === value}
            onClick={() => onChange(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function pocetSekci(count: number) {
  if (count === 1) return '1 sekce'
  if (count >= 2 && count <= 4) return `${count} sekce`
  return `${count} sekcí`
}

export function App() {
  const [theme, setTheme] = useState<ThemeKey>('light')
  const [accent, setAccent] = useState<AccentKey>('modra')
  const [size, setSize] = useState<SizeKey>('normal')

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.dataset.size = size

    const preset = ACCENTS.find((item) => item.key === accent) ?? ACCENTS[0]
    const value = theme === 'dark' ? preset.dark : preset.light
    // Poměry stejné jako v tokenech: soft 10 % ve světlém a 18 % v tmavém,
    // focus ring 20 / 24 %.
    const softPercent = theme === 'dark' ? 18 : 10
    const ringPercent = theme === 'dark' ? 24 : 20
    root.style.setProperty('--accent', value)
    root.style.setProperty('--accent-soft', `color-mix(in srgb, ${value} ${softPercent}%, transparent)`)
    root.style.setProperty('--focus-ring', `color-mix(in srgb, ${value} ${ringPercent}%, transparent)`)
  }, [theme, accent, size])

  return (
    <div className="sc-app">
      <header className="sc-header">
        <div className="sc-header__title">
          <strong>darkglass</strong>
          <span>ukázka knihovny — {pocetSekci(sections.length)}</span>
        </div>
        <div className="sc-header__controls">
          <Segmented label="Motiv" value={theme} options={THEMES} onChange={setTheme} />
          <Segmented label="Akcent" value={accent} options={ACCENTS} onChange={setAccent} />
          <Segmented label="Velikost UI" value={size} options={SIZES} onChange={setSize} />
        </div>
      </header>

      <div className="sc-body">
        <nav className="sc-nav" aria-label="Sekce">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="sc-nav__item">
              {section.title}
            </a>
          ))}
        </nav>

        <main className="sc-main">
          {sections.length === 0 ? (
            <p className="sc-empty">
              Zatím tu není žádná sekce. Přidej soubor do <code>showcase/sections/</code>.
            </p>
          ) : null}

          {sections.map((section) => (
            <section key={section.id} id={section.id} className="sc-section">
              <h2 className="sc-section__title">{section.title}</h2>
              {section.note ? <p className="sc-section__note">{section.note}</p> : null}

              <div className="sc-demos">
                {section.demos.map((demo) => (
                  <article
                    key={demo.title}
                    className={demo.wide ? 'sc-demo is-wide' : 'sc-demo'}
                  >
                    <h3 className="sc-demo__title">{demo.title}</h3>
                    {demo.note ? <p className="sc-demo__note">{demo.note}</p> : null}
                    <div className={demo.stack ? 'sc-demo__stage is-stacked' : 'sc-demo__stage'}>
                      {demo.render()}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}
