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

## Konvence

Jak se v balíku píšou komponenty — struktura složek, CSS a tokeny, povinné
stavy, dotykové cíle a tři velikosti UI, přístupnost, ověřování proti návrhu
a verzování — je v Knowledge projektu CashRegister:
**Engineering / Konvence knihovny darkglass — jak se v balíku píšou komponenty**
(`konvence-knihovny-darkglass-jak-se-v-baliku-pisou-komponenty`).

Přečti ji dřív, než v balíku napíšeš první řádek. Co v ní chybí, se doplní
tam — ne jako vlastní konvence v jedné komponentě.

## Ukázka

`showcase/` — jedna stránka se všemi komponentami ve všech stavech, v obou
motivech a ve dvou akcentech. Slouží k posouzení knihovny **dřív**, než se
podle ní postaví obrazovky.

```
npm install
npm run showcase       # http://localhost:5199, běží jen lokálně
```

Nahoře jsou tři přepínače: **motiv** (světlý / tmavý), **akcent** (modrá
z návrhu / fialová Hochmana) a **velikost UI** (menší / běžná / větší, poměry
0,85 a 1,18 z artboardu 16). Musí se projevit na všech komponentách — komponenta,
která se po přepnutí nezmění, má barvu nebo rozměr natvrdo.

### Jak přidat komponentu do ukázky

Sekce se načítají samy ze složky `showcase/sections/`. Do kostry
(`App.tsx`, `registry.ts`) se kvůli nové komponentě **nesahá**.

1. Patří-li komponenta do skupiny, která už sekci má (např. `§ Tlačítka` =
   `sections/buttons.tsx`), přidej do jejího pole `demos` další položku
   `{ title, note?, stack?, render }`.
2. Je-li to nová skupina z návrhu, založ `showcase/sections/<skupina>.tsx`:

```tsx
import type { ShowcaseSection } from '../registry'

export const section: ShowcaseSection = {
  id: 'textova-pole',     // kotva v adrese a v rejstříku vlevo
  title: '§ Textová pole', // název sekce z návrhu
  order: 30,               // pořadí podle návrhu
  demos: [
    { title: 'Stavy', render: () => <>…</> },
  ],
}
```

Pravidlo obsahu: **každá komponenta ve všech svých stavech** — běžný, hover,
stisk, zaměření, vybraný, neaktivní, chyba, načítání, prázdný. Co se nedá
ukázat staticky (hover, stisk, fokus), popiš v `note`, ať to člověk vyzkouší.
