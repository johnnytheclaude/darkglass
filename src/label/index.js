// Sazba cenovky — JEDEN ZDROJ PRAVDY pro tisk i pro náhledy (task #599, #821).
//
// Proč to leží v knihovně a ne v aplikaci: cenovku kreslí dvě různé aplikace.
// Pokladna ji rastruje pro termotiskárnu (canvas, 300 dpi, 1 bit), Admin ji
// ukazuje ve frontě štítků jako náhled v prohlížeči. Dokud měla každá svoje
// čísla, rozešly se: #599 přestavěl sazbu v Pokladně a náhled v Adminu zůstal
// na staré podobě, takže lhal o tom, co z tiskárny vyjede (#821).
//
// Tenhle modul je bez závislostí a bez Reactu — unese ho prohlížeč, Node
// i renderer Electronu. Neobsahuje kreslení: jen to, CO na cenovce je,
// V JAKÉM POŘADÍ, JAK VELKÝM PÍSMEM a JAKÝM TVAREM částky. Kreslení si každá
// aplikace dělá po svém (rastr × HTML), protože výstupy jsou jiné; shodu drží
// tahle čísla.
//
// PROČ JE TO .js A NE .ts: knihovna posílá zdroje bez build kroku a Node
// odmítá odstraňovat typy ze souborů pod `node_modules`
// (ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING). Modul, který mají testy obou
// aplikací importovat za běhu, tedy musí být čisté JS; typy nese `index.d.ts`
// vedle něj.
//
// Závazný podklad je `docs/navrh/stitky/README.md` v repu Pokladny (render
// z pen.dev souboru ownera). Když se návrh změní, přepiš čísla odtamtud —
// a jen tady. Testy na obou stranách (Admin i Pokladna) se o tenhle modul
// opírají, takže změna návrhu nemůže opravit jen jednu aplikaci.

/**
 * Míry návrhu #599 v bodech na ploše 413 × 495 (35,0 × 41,9 mm při 300 dpi).
 * Plocha je průnik obou cílových rolí (DK-22225 souvislá 38 mm a DK-11220
 * ražený štítek 39 × 48 mm), aby tatáž cenovka vyšla na obou.
 */
export const LABEL_DESIGN = Object.freeze({
  /** Šířka kreslicí plochy. */
  acrossDots: 413,
  /** Výška kreslicí plochy. */
  alongDots: 495,
  /** Okraj rámu dokola — 12 b = 1,0 mm. */
  paddingDots: 12,
  /** Bodů na milimetr při 300 dpi. */
  dotsPerMm: 300 / 25.4,
  /** Název produktu — láme se přes celou šířku, na střed. */
  name: Object.freeze({ dots: 30, weight: 500, lineHeight: 1.05, condensed: true, maxLines: 2 }),
  /** Velikost — po ceně druhý nejnápadnější prvek štítku. */
  variant: Object.freeze({ dots: 56, weight: 700, lineHeight: 1, condensed: true }),
  /** Barva — pod velikostí. */
  color: Object.freeze({ dots: 30, weight: 500, lineHeight: 1.05, condensed: true }),
  /** Strana QR symbolu bez klidové zóny: 126 b = 10,7 mm (21 modulů po 6 b). */
  qrDots: 126,
  /** Klidová zóna QR v modulech — svisle ji drží mezera `gaps.qr`. */
  qrQuietModules: 4,
  /** Číslo pod QR — jediný prvek v NEkondenzovaném řezu, s prostrkáním. */
  code: Object.freeze({
    dots: 30,
    weight: 500,
    lineHeight: 1.05,
    condensed: false,
    trackingDots: 0.5,
  }),
  /**
   * Cena v Kč — nejnápadnější prvek štítku. Od #952 má 67 b = 5,67 mm: po tisku
   * na skutečné roli si ji prodejna vyžádala o 20 % větší (dřív 56 b).
   */
  price: Object.freeze({ dots: 67, weight: 700, lineHeight: 1, condensed: true }),
  /** Informativní cena v cizí měně — volitelná, nejmenší. */
  secondary: Object.freeze({ dots: 30, weight: 600, lineHeight: 1.05, condensed: true }),
  gaps: Object.freeze({
    /** Mezi názvem a dvojicí velikost + barva. */
    nameVariant: 12,
    /** Mezi velikostí a barvou. */
    variantColor: 4,
    /** Nad QR i pod ním — je to zároveň klidová zóna kódu (4 moduly = 24 b). */
    qr: 24,
    /**
     * Mezi cenou v Kč a cenou v EUR. Od #952 čtyři body místo šesti: větší cena
     * v Kč spotřebovala celou svislou rezervu štítku (9 b) a další dva body se
     * musely vzít odtud. Klidová zóna QR (`qr`) se sáhnout nesmí a tahle mezera
     * je uvnitř jedné skupiny, takže štítek bez ceny v EUR zůstal beze změny.
     */
    priceSecondary: 4,
  }),
})

/** Písma návrhu; kondenzovaný řez nese všechno kromě čísla pod QR. */
export const LABEL_FONT_CONDENSED = 'IBM Plex Sans Condensed'
export const LABEL_FONT_REGULAR = 'IBM Plex Sans'

/**
 * Pořadí, ve kterém prvky mizí, když se na médium nevejdou: nejdřív cena
 * v EUR, pak barva, pak velikost, nakonec název. QR, číslo pod ním a cena
 * v Kč ze štítku nezmizí nikdy.
 */
export const LABEL_DROP_ORDER = ['secondary', 'color', 'variant', 'name']

/** Co na štítku zůstane za všech okolností. */
export const LABEL_CORE_KINDS = ['qr', 'code', 'price']

/** Užší podíl kondenzovaného řezu; číslo pod QR je v běžném IBM Plex Sans. */
export const LABEL_CONDENSED_WIDTH_RATIO = 0.52
export const LABEL_REGULAR_WIDTH_RATIO = 0.6
/** Nejmenší písmo, které má na termotisku smysl tisknout (návrh sází 30 b). */
export const LABEL_MIN_TEXT_DOTS = 20

/**
 * Největší písmo do velikosti `preferred`, ve kterém se text vejde CELÝ na
 * šířku `room`; `null`, když se nevejde ani v nejmenším. Takhle se sází cena
 * a od tasku #872 i velikost: prvek, který se nevejde, se vypustí celý —
 * nikdy se nezkrátí na půlku, protože „38/3…" je jiná velikost než 38/34.
 *
 * @param {string} text
 * @param {number} preferred
 * @param {number} room
 * @param {number} [ratio]
 * @returns {number | null}
 */
export function labelFitDots(text, preferred, room, ratio = LABEL_CONDENSED_WIDTH_RATIO) {
  for (let dots = preferred; dots >= LABEL_MIN_TEXT_DOTS; dots -= 1) {
    if (text.length * dots * ratio <= room) return dots
  }
  return null
}

/**
 * Cena v korunách podle návrhu #599: 38000,00 Kč — desetinná čárka, vždy dvě
 * desetinná místa, bez oddělovače tisíců, mezera před měnou. Nedělitelná
 * mezera podle ČSN 01 6910 tady nemá co držet: každý řádek cenovky je jeden
 * vykreslený text, který se nemá kam zlomit.
 *
 * @param {number} value
 * @returns {string}
 */
export function formatLabelPrice(value) {
  const rounded = Math.round(value * 100) / 100
  const sign = rounded < 0 ? '-' : ''
  const whole = Math.floor(Math.abs(rounded))
  const cents = Math.round((Math.abs(rounded) - whole) * 100)
  return sign + String(whole) + ',' + String(cents).padStart(2, '0') + ' Kč'
}

/**
 * Informativní přepočet: kolik je cena v cizí měně.
 *
 * @param {number} priceCzk
 * @param {number} rate
 * @returns {number}
 */
export function secondaryAmount(priceCzk, rate) {
  if (!rate || rate <= 0) return 0
  return Math.round((priceCzk / rate) * 100) / 100
}

/**
 * Přepočet na cenovku: 1520 EUR — celé jednotky, bez desetin (návrh #599).
 *
 * @param {number} priceCzk
 * @param {{ currency: string, rate: number }} secondary
 * @returns {string}
 */
export function formatSecondary(priceCzk, secondary) {
  const amount = secondaryAmount(priceCzk, secondary.rate)
  return String(Math.round(amount)) + ' ' + secondary.currency
}

/**
 * Obsah štítku v pořadí, ve kterém se tiskne: název → velikost → barva → QR →
 * číslo pod QR → cena v Kč → cena v EUR. Prvek bez dat se vynechá a další se
 * posune — prázdné místo po něm nezůstává.
 *
 * **Velikost a barva se sem posílají zvlášť (`sizeName`, `colorName`) a sazba
 * je z ničeho neodvozuje** (task #887). Dřív se tu jmenovka varianty rozebírala
 * na lomítku a významy se přiřazovaly pozicí — první část velikost, druhá
 * barva. Katalog ale obsahuje obě pořadí zároveň („62 / Antracit" i „brillant
 * white / 37"), takže pozice význam nenese a na půlce zboží vycházela cenovka
 * obráceně. Kdo štítek zadává, ví z dat, co je velikost a co barva; sazba to
 * hádat nesmí.
 *
 * `variantName` zůstává jen jako celá jmenovka pro úlohy, které velikost zvlášť
 * nenesou (ruční dotisk, starší řádky fronty). Použije se **celá** jako velký
 * prvek — nikdy se nerozebírá.
 *
 * @param {import('./index.d.ts').LabelData} data
 * @param {{ showSecondaryCurrency?: boolean }} [options]
 * @returns {import('./index.d.ts').LabelBlock[]}
 */
export function labelBlocks(data, options = {}) {
  /** @type {import('./index.d.ts').LabelBlock[]} */
  const blocks = []
  const variant = (data.sizeName ?? '').trim() || (data.variantName ?? '').trim()
  const color = (data.colorName ?? '').trim()

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
 *
 * @param {import('./index.d.ts').LabelBlock[]} blocks
 * @returns {import('./index.d.ts').LabelBlock[][]}
 */
export function labelGroups(blocks) {
  /** @param {import('./index.d.ts').LabelBlockKind[]} kinds */
  const pick = (...kinds) => blocks.filter((block) => kinds.includes(block.kind))
  return [pick('name', 'variant', 'color'), pick('qr', 'code'), pick('price', 'secondary')].filter(
    (group) => group.length > 0,
  )
}

/**
 * Sazba jednoho prvku i s mezerou nad ním — v bodech tiskárny. Náhled si tím
 * spočítá rozměry, aniž by opisoval čísla návrhu: mezeru nad prvkem určuje
 * návrh a mění se podle toho, co na štítku je (barva bez velikosti se váže
 * k názvu, ne k velikosti).
 *
 * @param {import('./index.d.ts').LabelBlock[]} blocks
 * @param {import('./index.d.ts').LabelBlockKind} kind
 * @returns {number}
 */
export function labelGapAbove(blocks, kind) {
  const has = (/** @type {import('./index.d.ts').LabelBlockKind} */ other) =>
    blocks.some((block) => block.kind === other)
  if (kind === 'variant') return has('name') ? LABEL_DESIGN.gaps.nameVariant : 0
  if (kind === 'color') {
    if (has('variant')) return LABEL_DESIGN.gaps.variantColor
    return has('name') ? LABEL_DESIGN.gaps.nameVariant : 0
  }
  // Klidovou zónu QR drží mezera nad symbolem i pod ním — bez ní čtečka kód
  // nenajde (task #243, AC5).
  if (kind === 'qr' || kind === 'code') return LABEL_DESIGN.gaps.qr
  if (kind === 'secondary') return has('price') ? LABEL_DESIGN.gaps.priceSecondary : 0
  return 0
}

/**
 * Zalomení názvu na šířku kresby — sdílené s rastrem Pokladny (task #956).
 *
 * Délka řádku se odhaduje týmž poměrem šířky písma jako u ceny a velikosti
 * (`LABEL_CONDENSED_WIDTH_RATIO`), takže náhled láme na stejných místech jako
 * tisk. Delší název, než se vejde na `LABEL_DESIGN.name.maxLines` řádek, se na
 * poslední řádce zkrátí třemi tečkami — víc řádek by na cenovce ubralo místo
 * QR kódu a ceny (task #955). Totéž platí pro jediné dlouhé slovo bez mezer:
 * seká se natvrdo, ale poslední řádka vždy skončí třemi tečkami, aby bylo
 * poznat, že název pokračuje.
 *
 * @param {string} text
 * @param {number} [room] šířka kresby bez okrajů v bodech
 * @param {number} [dots] velikost písma názvu
 * @param {number} [ratio]
 * @returns {string[]}
 */
export function labelNameLines(
  text,
  room = LABEL_DESIGN.acrossDots - 2 * LABEL_DESIGN.paddingDots,
  dots = LABEL_DESIGN.name.dots,
  ratio = LABEL_CONDENSED_WIDTH_RATIO,
) {
  const maxLines = LABEL_DESIGN.name.maxLines
  const max = Math.max(4, Math.floor(room / (dots * ratio)))
  /** @type {string[]} */
  const lines = []
  let line = ''
  for (const word of String(text).split(/\s+/).filter(Boolean)) {
    const candidate = line ? line + ' ' + word : word
    if (candidate.length <= max) {
      line = candidate
      continue
    }
    if (line) lines.push(line)
    // Slovo delší než řádek (dlouhý kód, složenina) se rozseká natvrdo.
    line = word
    while (line.length > max && lines.length < maxLines) {
      lines.push(line.slice(0, max))
      line = line.slice(max)
    }
  }
  if (line) lines.push(line)
  if (lines.length <= maxLines) return lines.length ? lines : ['']
  const kept = lines.slice(0, maxLines)
  const last = kept[maxLines - 1]
  kept[maxLines - 1] = last.length > max - 3 ? last.slice(0, Math.max(1, max - 3)) + '...' : last + '...'
  return kept
}

