import type { ReactNode } from 'react'

/** Jedna ukázka uvnitř sekce — komponenta v jednom rozměru nebo stavu. */
export interface ShowcaseDemo {
  title: string
  /** Krátká věta, co má člověk na ukázce posoudit. */
  note?: string
  /** Svisle místo vedle sebe (hodí se u prvků na celou šířku). */
  stack?: boolean
  /** Přes celou šířku rejstříku — pro široké prvky (stavová lišta, košík),
      které by se do sloupce mřížky nevešly a přetekly by přes sousedy. */
  wide?: boolean
  render: () => ReactNode
}

/** Sekce = skupina komponent z návrhu (§ Tlačítka, § Textová pole, …). */
export interface ShowcaseSection {
  /** Kotva v adrese a v levém rejstříku, kebab-case. */
  id: string
  title: string
  /** Pořadí podle návrhu; bez něj se sekce řadí na konec podle názvu. */
  order?: number
  note?: string
  /** Velikosti UI se týkají jen Pokladny — u ostatních sekcí zůstává 1. */
  demos: ShowcaseDemo[]
}

type SectionModule = { section?: ShowcaseSection }

// Sekce se načítají samy ze složky sections/. Nová komponenta = nový soubor;
// do kostry (App.tsx, registry.ts) se kvůli ní nesahá.
const modules = import.meta.glob<SectionModule>('./sections/*.tsx', { eager: true })

export const sections: ShowcaseSection[] = Object.entries(modules)
  .map(([path, mod]) => {
    if (!mod.section) {
      throw new Error(`Soubor ${path} musí exportovat "section" typu ShowcaseSection.`)
    }
    return mod.section
  })
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title, 'cs'))
