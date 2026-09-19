/**
 * Typy sdíleného průvodce příjemkou (task #853). Implementace je v index.js —
 * schválně prosté JS, ať modul jde importovat i mimo prohlížeč.
 */

export interface ReceivingColumn {
  /** Stabilní klíč sloupce — podle něj se sloupec hledá v testech, ne podle pořadí. */
  key: string;
  /** Jméno v hlavičce tabulky. */
  label: string;
  /** Pevná šířka v px; bez ní sloupec bere zbytek místa. */
  width?: number;
  align?: 'left' | 'right';
  /** Zůstává v kartě řádku na telefonu. */
  mobileCard?: boolean;
}

export interface VatRateOption {
  value: string;
  label: string;
}

export const DEFAULT_SALES_VAT_RATE: number;
export const SALES_VAT_RATES: number[];
export const VAT_RATE_OPTIONS: VatRateOption[];
export function newProductVatRate(chosen?: number | null): number;

export const RECEIVING_STEPS: string[];
export const SCAN_STEP: string;
export const SCAN_STEP_AFTER: string;
export function receivingSteps(options?: { scanning?: boolean }): string[];

export const EXTRACTION_COLUMNS: ReceivingColumn[];
export const PRICE_COLUMNS: ReceivingColumn[];

export const NBSP: string;
export const DEFAULT_CURRENCY_UNIT: string;
export const EMPTY_VALUE: string;
export function round2(value: number): number;
export function netFromGross(gross: number, vatRate: number): number;
export function grossFromNet(net: number | null | undefined, vatRate: number): number | null;
export function recommendedPrice(costNet: number, idealMarginPercent: number, vatRate: number): number;
export function marginPercent(
  sellGross: number | null | undefined,
  costNet: number,
  vatRate: number,
): number | null;
export function formatPrice(value: number | null | undefined): string;
export function formatMoney(value: number | null | undefined, unit?: string): string;
export function formatPercent(value: number | null | undefined): string;

export const RECEIVING_TEXTS: {
  newProductsTitle: string;
  newProductsEmptyTitle: string;
  newProductsEmptyBody: string;
  pricesNote: string;
  extractionNote: string;
  costVatIsPurchase: string;
  missingCostMargin: string;
};

export const FIELD_LABELS: {
  category: string;
  costVatRate: string;
  salesVatRate: string;
  priceInclVat: string;
};
