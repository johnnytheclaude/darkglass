# darkglass

Sdílená UI knihovna pro aplikace AppFactory. Vznikla z návrhu `darkglass`
(Pen, 14. 9. 2026) — nejdřív pro CashRegister (Admin + Pokladna), dál pro
InvoiceHub a další.

## Proč balík, a ne složka v aplikaci

Admin je Next.js, Pokladna Electron + Vite, InvoiceHub Next.js s Tailwindem.
Dokud komponenty žily v každé aplikaci zvlášť, vypadala stejná věc na každé
straně jinak. Balík je jedno místo, kde se komponenta opraví jednou.

## Co posílá

- **Zdrojové `.tsx`** — kompiluje se v aplikaci (Next `transpilePackages`, Vite
  nativně). Žádný build krok v knihovně.
- **Vlastní CSS + tokeny jako CSS proměnné.** Ne Tailwind třídy: CashRegister
  Tailwind nemá, InvoiceHub ano, a knihovna musí fungovat v obou.

## Tokeny

`src/tokens/tokens.css` — 67 proměnných, světlý i tmavý motiv v jednom systému
(`[data-theme="dark"]` i `prefers-color-scheme`). Generuje se z návrhu,
needituje se ručně; strojový zdroj je `tokens.json`.

**`--accent` je white-label** — firma si ho přepisuje (Hochman fialová, návrh
modrá). Komponenta nikdy nesmí mít barvu natvrdo.

## Pravidla

1. Co je v návrhu, je v knihovně. Co v knihovně není, se do ní doplní —
   nekreslí se to zvlášť v aplikaci.
2. Každá komponenta má všechny stavy z návrhu a funguje v obou motivech.
3. Dotykové cíle a tři velikosti UI kvůli Pokladně (obsluha míří prstem
   a čte ze dvou metrů).
4. Verze se pinují. Aplikace se povyšuje vědomě, ne plovoucí větví — jeden
   push do knihovny jinak mění tři produkty naráz.

## Ukázka

`showcase/` — jedna stránka se všemi komponentami ve všech stavech, v obou
motivech a ve dvou akcentech. Slouží k posouzení knihovny **dřív**, než se
podle ní postaví obrazovky.
