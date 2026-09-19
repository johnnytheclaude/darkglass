/**
 * Průvodce příjemkou — jeden zdroj pravdy pro Admin i Pokladnu (task #853).
 *
 * Naskladnění se dělá dvěma cestami: v Adminu (Next.js, `sklad/prijemky/nova`)
 * a na Pokladně (Electron, obrazovka Naskladnění). Byly to dvě samostatné
 * implementace téhož průvodce a rozjely se — jiná jména kroků, jiné sloupce,
 * jiné výchozí sazby DPH. Stejná past už jednou sklapla u náhledu štítku
 * (#821), proto tenhle modul: **co je společné, žije tady a obě aplikace to
 * jen vykreslují**.
 *
 * Co tu je:
 * - kroky průvodce (jména i pořadí) včetně kroku Pípání, který má navíc
 *   Pokladna (u pultu je čtečka, v Adminu ne),
 * - sloupce tabulek kroků Kontrola vytěžení a Ceny (jména, pořadí, šířky,
 *   zarovnání),
 * - sazby DPH a pravidlo výchozí prodejní sazby (#823),
 * - peněžní matematika a formát částky s měnou (#834, #846, #848),
 * - texty hlášek, které si obě podoby musí říkat stejně.
 *
 * Co tu NENÍ a být nemůže: samotné vykreslení. Admin je server-rendered React
 * v Next.js nad jeho `DataTable` a server actions, Pokladna je Electron
 * renderer nad IPC do hlavního procesu a offline SQLite. Sdílí se proto
 * pravidla a tvar dat, ne komponenty — a že se obě podoby drží tohohle modulu,
 * hlídají testy v obou repozitářích (`prijemka-sdilena-pravidla-853`).
 *
 * Modul je schválně prosté JS bez Reactu: importuje ho i kód, který neběží
 * v prohlížeči (testy, hlavní proces Electronu). Typy jsou v index.d.ts.
 */

/* --- DPH ---------------------------------------------------------------- */

/** Výchozí PRODEJNÍ sazba DPH v ČR (task #823). */
export const DEFAULT_SALES_VAT_RATE = 21;

/** Sazby, které průvodce nabízí. Nula je volba, ne výchozí hodnota. */
export const SALES_VAT_RATES = [21, 12, 0];

/** Nabídka do selectu — nákupní i prodejní strana mají tutéž. */
export const VAT_RATE_OPTIONS = SALES_VAT_RATES.map((rate) => ({
  value: String(rate),
  label: rate + ' %',
}));

/**
 * Sazba DPH nově zakládaného zboží (task #823). Nezvolená sazba padá na 21 %,
 * zvolená — včetně nuly — se respektuje.
 *
 * Sazba na kartě zboží je PRODEJNÍ sazba. Se sazbou z dokladu dodavatele nemá
 * nic společného: zahraniční dodák jde bez daně (reverse charge) a ta nula
 * patří jen nákupní ceně. Tohle je táž funkce jako `newProductVatRate`
 * v API (`api/src/lib/vat.ts`) — obě strany musí dosadit totéž.
 */
export function newProductVatRate(chosen) {
  if (chosen === undefined || chosen === null || Number.isNaN(Number(chosen))) {
    return DEFAULT_SALES_VAT_RATE;
  }
  return Math.round(Number(chosen));
}

/* --- kroky průvodce ------------------------------------------------------ */

/** Kroky průvodce příjemkou v Adminu — zdroj pravdy pro jména i pořadí. */
export const RECEIVING_STEPS = ['Zdroj', 'Kontrola vytěžení', 'Párování', 'Ceny', 'Souhrn'];

/**
 * Krok navíc, který má jen Pokladna: pípání kusů proti dodáku a reklamační
 * protokol (task #545). Není to odchylka omylem — u pultu je čtečka, v Adminu
 * ne. Doslovné „1:1" by ho smazalo, proto stojí tady vedle společné řady.
 */
export const SCAN_STEP = 'Pípání';

/** Krok, ZA který se Pípání zařazuje. */
export const SCAN_STEP_AFTER = 'Párování';

/**
 * Kroky pro konkrétní podobu průvodce. Bez čtečky (Admin) je to přesně
 * `RECEIVING_STEPS`; se čtečkou (Pokladna) tatáž řada s Pípáním za Párováním.
 */
export function receivingSteps(options) {
  const scanning = Boolean(options && options.scanning);
  if (!scanning) return RECEIVING_STEPS.slice();
  const steps = RECEIVING_STEPS.slice();
  steps.splice(steps.indexOf(SCAN_STEP_AFTER) + 1, 0, SCAN_STEP);
  return steps;
}

/* --- sloupce tabulek ----------------------------------------------------- */

/**
 * Krok Kontrola vytěžení — řádky dodacího listu tak, jak je vytěžila šablona
 * nebo AI. Pokladna tu dřív měla vlastní jména („Kód dodavatele · ZBOŽÍ · KS ·
 * NÁKUPKA BEZ DPH") a chyběla jí sazba DPH nákupní ceny.
 */
export const EXTRACTION_COLUMNS = [
  { key: 'supplierCode', label: 'Kód dodavatele', width: 150 },
  { key: 'name', label: 'Název' },
  { key: 'quantity', label: 'Množství', width: 110, align: 'right' },
  { key: 'costNet', label: 'Nákupka bez DPH', width: 140, align: 'right' },
  { key: 'costVatRate', label: 'DPH', width: 110 },
];

/**
 * Krok Ceny, tabulka „Nové produkty". Pořadí sloupců je ownerovo (task #834):
 * nákupní strana celá pohromadě, teprve za ní sazba a částka prodejní ceny,
 * na konci kontrolní marže (#848).
 *
 * Šířky jsou změřené v prohlížeči, ne odhadnuté: sazba potřebuje 108 px, aby
 * se „21 %" v selectu nezkrátilo na „2…", a osm sloupců se pak na 1440 px
 * vejde do karty i se sloupcem Produkt na jeho spodní hranici 190 px (#789).
 * `mobileCard: true` říká, které údaje zůstanou na telefonu v kartě řádku.
 */
export const PRICE_COLUMNS = [
  { key: 'product', label: 'Produkt' },
  { key: 'category', label: 'Kategorie', width: 180, align: 'left', mobileCard: true },
  { key: 'costNet', label: 'Nákupní cena bez DPH', width: 92, align: 'right', mobileCard: true },
  { key: 'costVatRate', label: 'DPH nákupní ceny', width: 108, align: 'left' },
  { key: 'costGross', label: 'Nákupní cena s DPH', width: 92, align: 'right' },
  { key: 'salesVatRate', label: 'DPH prodejní ceny', width: 108, align: 'left', mobileCard: true },
  { key: 'priceInclVat', label: 'Prodejní cena s DPH', width: 118, align: 'right', mobileCard: true },
  { key: 'margin', label: 'Marže', width: 62, align: 'right', mobileCard: true },
];

/* --- peníze -------------------------------------------------------------- */

/** Nedělitelná mezera před jednotkou (ČSN 01 6910) — částka se nezlomí na konci řádku. */
export const NBSP = ' ';

/** Výchozí měna dokladu; cizí měna se u částky píše taky, jinak není poznat, v čem je (#820). */
export const DEFAULT_CURRENCY_UNIT = 'Kč';

export function round2(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

/** Cena bez DPH z ceny s DPH — katalogové ceny jsou vždy koncové. */
export function netFromGross(gross, vatRate) {
  return round2(Number(gross) / (1 + Number(vatRate) / 100));
}

/** Cena s DPH z ceny bez DPH — sloupec „Nákupní cena s DPH" v kroku Ceny. */
export function grossFromNet(net, vatRate) {
  if (net === null || net === undefined || !Number.isFinite(Number(net))) return null;
  return round2(Number(net) * (1 + Number(vatRate) / 100));
}

/**
 * Doporučená koncová cena podle ideální marže kategorie — v celých korunách
 * (haléře na cenovku nepatří).
 */
export function recommendedPrice(costNet, idealMarginPercent, vatRate) {
  return Math.round(Number(costNet) * (1 + Number(idealMarginPercent) / 100) * (1 + Number(vatRate) / 100));
}

/**
 * Marže řádku v procentech nákupní ceny bez DPH (task #848) — obrácení
 * `recommendedPrice`, tedy TÁŽ metoda, jakou se počítá marže kategorie
 * („Košile 300 %"). Účetní marže z prodejní ceny je jiná věc a se štítkem
 * kategorie by nešla porovnat. Bez nákupky se marže spočítat nedá → null.
 */
export function marginPercent(sellGross, costNet, vatRate) {
  if (!Number.isFinite(Number(costNet)) || Number(costNet) <= 0) return null;
  if (sellGross === null || sellGross === undefined || !Number.isFinite(Number(sellGross))) return null;
  const sellNet = netFromGross(sellGross, vatRate);
  return round2(((sellNet - Number(costNet)) / Number(costNet)) * 100);
}

/** České formátování ceny do pole: „1 215,51", „1 225". */
export function formatPrice(value) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return '';
  return Number(value).toLocaleString('cs-CZ', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

/**
 * Částka s měnou pro krok Ceny (task #846): „1 803,31 Kč", „849 Kč", „98 €".
 * Holé číslo v tabulce nestačí — dodavatel může být ze zahraničí a bez měny
 * u čísla není poznat, v čem je. Haléře jen tam, kde jsou, a pak vždy dvě
 * místa jako jinde v aplikaci.
 */
export function formatMoney(value, unit) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return EMPTY_VALUE;
  const rounded = Math.round(Number(value) * 100) / 100;
  const digits = Number.isInteger(rounded) ? 0 : 2;
  const text = rounded.toLocaleString('cs-CZ', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  return text + NBSP + (unit || DEFAULT_CURRENCY_UNIT);
}

/** Procento do tabulky — „300 %" s nedělitelnou mezerou, bez hodnoty pomlčka. */
export function formatPercent(value) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return EMPTY_VALUE;
  const rounded = Math.round(Number(value) * 100) / 100;
  const digits = Number.isInteger(rounded) ? 0 : 2;
  return rounded.toLocaleString('cs-CZ', { minimumFractionDigits: digits, maximumFractionDigits: digits }) + NBSP + '%';
}

/** Co se píše místo chybějící hodnoty — ne nula, ne nekonečno, ne prázdno. */
export const EMPTY_VALUE = '—';

/* --- texty --------------------------------------------------------------- */

/**
 * Hlášky, které si obě podoby průvodce musí říkat stejně. Text je součást
 * chování: „Žádné nové produkty" v Adminu a „Žádné nové položky" na Pokladně
 * byla táž situace popsaná dvakrát jinak.
 */
export const RECEIVING_TEXTS = {
  newProductsTitle: 'Nové produkty',
  newProductsEmptyTitle: 'Žádné nové produkty',
  newProductsEmptyBody: 'Celý dodák se spároval s katalogem.',
  pricesNote:
    'Ceny jsou za produkt; varianta může mít odchylku. Prodejní cena se zadává s DPH — to je cena, kterou zákazník platí.',
  extractionNote: 'Zkontrolujte množství a nákupní cenu bez DPH. Podbarvené řádky si AI nebyla jistá.',
  costVatIsPurchase: 'Sazba DPH nákupní ceny je sazba z dokladu dodavatele; prodejní sazba zboží je vedle ní.',
  missingCostMargin: 'Bez nákupní ceny se marže spočítat nedá.',
};

/** Popisky kroků průvodce pro `aria-label` polí — ať se testy chytají téhož. */
export const FIELD_LABELS = {
  category: 'Kategorie',
  costVatRate: 'Sazba DPH nákupní ceny',
  salesVatRate: 'Sazba DPH prodejní ceny',
  priceInclVat: 'Prodejní cena s DPH',
};
