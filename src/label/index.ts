// Sazba cenovky — JEDEN ZDROJ PRAVDY pro tisk i pro náhledy (task #599, #821).
//
// Proč to leží v knihovně a ne v aplikaci: cenovku kreslí dvě různé aplikace.
// Pokladna ji rastruje pro termotiskárnu (canvas, 300 dpi, 1 bit), Admin ji
// ukazuje ve frontě štítků jako náhled v prohlížeči. Dokud měla každá svoje
// čísla, rozešly se: #599 přestavěl sazbu v Pokladně a náhled v Adminu zůstal
// na staré podobě, takže lhal o tom, co z tiskárny vyjede (#821).
//
// Tenhle modul je proto bez závislostí a bez Reactu — jde importovat
// z prohlížeče, z Node i z rendereru Electronu. Neobsahuje kreslení: jen to,
// CO na cenovce je, V JAKÉM POŘADÍ, JAK VELKÝM PÍSMEM a JAKÝM TVAREM částky.
// Kreslení si každá aplikace dělá po svém (rastr × HTML), protože výstupy
// jsou jiné; shodu drží tahle čísla.
//
// Závazný podklad je `docs/navrh/stitky/README.md` v repu Pokladny (render
// z pen.dev souboru ownera). Když se návrh změní, přepiš čísla odtamtud —
// a jen tady. Testy na obou stranách (Admin i Pokladna) se o tenhle modul
// opírají, takže změna návrhu nemůže opravit jen jednu aplikaci.

/** Řez písma, který návrh cenovce dává. */
export type LabelWeight = 500 | 600 | 700

/** Jeden textový prvek sazby — velikost v bodech tiskárny při 300 dpi. */
export interface LabelTextSpec {
  /** Velikost písma v bodech (413 b = 35 mm, tedy 1 bod = 0,0847 mm). */
  dots: number
  weight: LabelWeight
  lineHeight: number
  /** IBM Plex Sans Condensed; číslo pod QR je v běžném IBM Plex Sans. */
  condensed: boolean
  /** Prostrkání v bodech — návrh ho dává jen číslu pod QR (0,5 b). */
  trackingDots?: number
  /** Do kolika řádek se text smí zalomit, než se zkrátí. */
  maxLines?: number
}

/**
 * Míry návrhu #599 v bodech na ploše 413 × 495 (35,0 × 41,9 mm při 300 dpi).
 * Plocha je průnik obou cílových rolí (DK-22225 souvislá 38 mm a DK-11220
 * ražený štítek 39 × 48 mm), aby tatáž cenovka vyšla na obou.
 */
export const LABEL_DESIGN = {
  /** Šířka kreslicí plochy. */
  acrossDots: 413,
  /** Výška kreslicí plochy. */
  alongDots: 495,
  /** Okraj rámu dokola — 12 b = 1,0 mm. */
  paddingDots: 12,
  /** Bodů na milimetr při 300 dpi. */
  dotsPerMm: 300 / 25.4,
  name: { dots: 30, weight: 500, lineHeight: 1.05, condensed: true, maxLines: 3 },
  variant: { dots: 56, weight: 700, lineHeight: 1, condensed: true },
  color: { dots: 30, weight: 500, lineHeight: 1.05, condensed: true },
  /** Strana QR symbolu bez klidové zóny: 126 b = 10,7 mm (21 modulů po 6 b). */
  qrDots: 126,
  /** Klidová zóna QR v modulech — pod ním ji drží mezera `gaps.qr`. */
  qrQuietModules: 4,
  code: { dots: 30, weight: 500, lineHeight: 1.05, condensed: false, trackingDots: 0.5 },
  price: { dots: 56, weight: 700, lineHeight: 1, condensed: true },
  secondary: { dots: 30, weight: 600, lineHeight: 1.05, condensed: true },
  gaps: {
    /** Mezi názvem a dvojicí velikost + barva. */
    nameVariant: 12,
    /** Mezi velikostí a barvou. */
    variantColor: 4,
    /** Nad QR i pod ním — je to zároveň klidová zóna kódu (4 moduly = 24 b). */
    qr: 24,
    /** Mezi cenou v Kč a cenou v EUR. */
    priceSecondary: 6,
  },
} as const satisfies {
  acrossDots: number
  alongDots: number
  paddingDots: number
  dotsPerMm: number
  name: LabelTextSpec
  variant: LabelTextSpec
  color: LabelTextSpec
  qrDots: number
  qrQuietModules: number
  code: LabelTextSpec
  price: LabelTextSpec
  secondary: LabelTextSpec
  gaps: { nameVariant: number; variantColor: number; qr: number; priceSecondary: number }
}

/** Písma návrhu; kondenzovaný řez nese všechno kromě čísla pod QR. */
export const LABEL_FONT_CONDENSED = 'IBM Plex Sans Condensed'
export const LABEL_FONT_REGULAR = 'IBM Plex Sans'

/** Co je na cenovce; pořadí je pořadí shora dolů. */
export type LabelBlockKind = 'name' | 'variant' | 'color' | 'qr' | 'code' | 'price' | 'secondary'

export interface LabelBlock {
  kind: LabelBlockKind
  /** Text k vytištění; u QR obsah kódu. */
  text: string
}

export interface LabelData {
  /** Název položky — snímek k okamžiku zařazení do fronty. */
  name: string
  /** Velikost (varianta); u zboží bez parametrů prázdná. */
  variantName?: string | null
  /** Barva; když ji aplikace neposílá zvlášť, vezme se ze zbytku jmenovky. */
  colorName?: string | null
  /** Kód varianty (EAN, nebo vlastní) — obsah QR i číslo pod ním. */
  code?: string | null
  /** Cena VČETNĚ DPH; jinou na cenovku nesmí (§ 13 zák. 526/1990 Sb.). */
  priceInclVat?: number | null
  /** Informativní přepočet: měna a kurz podle nastavení firmy (task #671). */
  secondary?: { currency: string; rate: number } | null
}

export interface LabelContentOptions {
  /** Informativní cena v cizí měně pod korunovou — zapíná ji nastavení firmy. */
  showSecondaryCurrency?: boolean
}

/**
 * Pořadí, ve kterém prvky mizí, když se na médium nevejdou: nejdřív cena
 * v EUR, pak barva, pak velikost, nakonec název. QR, číslo pod ním a cena
 * v Kč ze štítku nezmizí nikdy.
 */
export const LABEL_DROP_ORDER: LabelBlockKind[] = ['secondary', 'color', 'variant', 'name']

/** Co na štítku zůstane za všech okolností. */
export const LABEL_CORE_KINDS: LabelBlockKind[] = ['qr', 'code', 'price']

/**
 * Cena v korunách podle návrhu #599: 38000,00 Kč — desetinná čárka, vždy dvě
 * desetinná místa, bez oddělovače tisíců, mezera před měnou. Nedělitelná
 * mezera podle ČSN 01 6910 tady nemá co držet: každý řádek cenovky je jeden
 * vykreslený text, který se nemá kam zlomit.
 */
export function formatLabelPrice(value: number): string {
  const rounded = Math.round(value * 100) / 100
  const sign = rounded < 0 ? '-' : ''
  const whole = Math.floor(Math.abs(rounded))
  const cents = Math.round((Math.abs(rounded) - whole) * 100)
  return sign + String(whole) + ',' + String(cents).padStart(2, '0') + ' Kč'
}

/** Informativní přepočet: kolik je cena v cizí měně. */
export function secondaryAmount(priceCzk: number, rate: number): number {
  if (!rate || rate <= 0) return 0
  return Math.round((priceCzk / rate) * 100) / 100
}

/** Přepočet na cenovku: 1520 EUR — celé jednotky, bez desetin (návrh #599). */
export function formatSecondary(
  priceCzk: number,
  secondary: { currency: string; rate: number },
): string {
  const amount = secondaryAmount(priceCzk, secondary.rate)
  return String(Math.round(amount)) + ' ' + secondary.currency
}

/**
 * Rozdělení jmenovky varianty na velikost a barvu. Admin skládá jmenovku
 * z hodnot parametrů oddělených lomítkem (52 / Brillant White); návrh kreslí
 * první hodnotu velkým písmem (velikost) a zbytek pod ní menším (barva).
 * Barvu poslanou zvlášť to nepřebíjí.
 */
export function splitVariantName(variantName?: string | null): {
  variant: string | null
  color: string | null
} {
  const trimmed = (variantName ?? '').trim()
  if (!trimmed) return { variant: null, color: null }
  const parts = trimmed
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean)
  if (parts.length <= 1) return { variant: trimmed, color: null }
  return { variant: parts[0], color: parts.slice(1).join(' ') }
}

/**
 * Obsah štítku v pořadí, ve kterém se tiskne: název → velikost → barva → QR →
 * číslo pod QR → cena v Kč → cena v EUR. Prvek bez dat se vynechá a další se
 * posune — prázdné místo po něm nezůstává.
 */
export function labelBlocks(data: LabelData, options: LabelContentOptions = {}): LabelBlock[] {
  const blocks: LabelBlock[] = []
  const split = splitVariantName(data.variantName)
  const variant = split.variant
  const color = (data.colorName ?? '').trim() || split.color

  if (data.name) blocks.push({ kind: 'name', text: data.name })
  if (variant) blocks.push({ kind: 'variant', text: variant })
  if (color) blocks.push({ kind: 'color', text: color })
  if (data.code) {
    blocks.push({ kind: 'qr', text: data.code })
    blocks.push({ kind: 'code', text: data.code })
  }
  if (data.priceInclVat !== null && data.priceInclVat !== undefined) {
    blocks.push({ kind: 'price', text: formatLabelPrice(data.priceInclVat) })
    if (options.showSecondaryCurrency && data.secondary) {
      blocks.push({ kind: 'secondary', text: formatSecondary(data.priceInclVat, data.secondary) })
    }
  }
  return blocks
}

/**
 * Tři bloky návrhu shora dolů; výšku mezi nimi rozdává space_between.
 * Blok bez jediného prvku se vynechá (zboží bez kódu nemá prostřední blok).
 */
export function labelGroups(blocks: LabelBlock[]): LabelBlock[][] {
  const pick = (...kinds: LabelBlockKind[]) => blocks.filter((block) => kinds.includes(block.kind))
  return [pick('name', 'variant', 'color'), pick('qr', 'code'), pick('price', 'secondary')].filter(
    (group) => group.length > 0,
  )
}
