// Typy ke sdílené sazbě cenovky (`index.js`). Modul je schválně čisté JS —
// Node odmítá odstraňovat typy ze souborů pod node_modules, takže testy obou
// aplikací by TS zdroj neuvezly. Popis a čísla najdeš v `index.js`.

/** Řez písma, který návrh cenovce dává. */
export type LabelWeight = 500 | 600 | 700

/** Jeden textový prvek sazby — velikost v bodech tiskárny při 300 dpi. */
export interface LabelTextSpec {
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

export interface LabelDesign {
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

export declare const LABEL_DESIGN: LabelDesign
export declare const LABEL_FONT_CONDENSED: string
export declare const LABEL_FONT_REGULAR: string

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
  /**
   * Velikost — na cenovce největším písmem. Bere se ze struktury dat (parametr
   * „velikost"), nikdy z rozpadu jmenovky varianty (task #887).
   */
  sizeName?: string | null
  /** Barva — drobně pod velikostí; ze struktury dat (parametr „barva"). */
  colorName?: string | null
  /**
   * Celá jmenovka varianty pro úlohy, které velikost zvlášť nenesou. Sází se
   * CELÁ jako velký prvek, nikdy se nerozebírá (task #887).
   */
  variantName?: string | null
  /** Kód varianty (EAN, nebo vlastní) — obsah QR i číslo pod ním. */
  code?: string | null
  /** Cena VČETNĚ DPH; jinou na cenovku nesmí. */
  priceInclVat?: number | null
  /** Informativní přepočet: měna a kurz podle nastavení firmy (task #671). */
  secondary?: { currency: string; rate: number } | null
}

export interface LabelContentOptions {
  showSecondaryCurrency?: boolean
}

export declare const LABEL_DROP_ORDER: LabelBlockKind[]
export declare const LABEL_CORE_KINDS: LabelBlockKind[]
export declare const LABEL_CONDENSED_WIDTH_RATIO: number
export declare const LABEL_REGULAR_WIDTH_RATIO: number
export declare const LABEL_MIN_TEXT_DOTS: number
export declare function labelFitDots(
  text: string,
  preferred: number,
  room: number,
  ratio?: number,
): number | null

export declare function formatLabelPrice(value: number): string
export declare function secondaryAmount(priceCzk: number, rate: number): number
export declare function formatSecondary(
  priceCzk: number,
  secondary: { currency: string; rate: number },
): string
export declare function labelBlocks(
  data: LabelData,
  options?: LabelContentOptions,
): LabelBlock[]
export declare function labelGroups(blocks: LabelBlock[]): LabelBlock[][]
export declare function labelGapAbove(blocks: LabelBlock[], kind: LabelBlockKind): number
