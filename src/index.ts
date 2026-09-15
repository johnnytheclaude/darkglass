// Vstupní bod knihovny. Komponenty se doplňují po vrstvách podle návrhu;
// zdrojem pravdy je docs/navrh v repozitářích aplikací (PNG + HTML export z Penu).
// Co tu není, pro aplikace neexistuje — nová komponenta se sem přidá ručně.

export { Button } from './components/Buttons/Button'
export type { ButtonProps, ButtonSize, ButtonVariant } from './components/Buttons/Button'
export { IconButton } from './components/Buttons/IconButton'
export type { IconButtonProps } from './components/Buttons/IconButton'

export { AmountDisplay } from './components/Pos/AmountDisplay'
export type { AmountDisplayProps } from './components/Pos/AmountDisplay'
export { CartCard, CartLine } from './components/Pos/CartCard'
export type { CartCardProps, CartLineProps } from './components/Pos/CartCard'
export { CategoryChip } from './components/Pos/CategoryChip'
export type { CategoryChipProps } from './components/Pos/CategoryChip'
export { ChangeAndPay } from './components/Pos/ChangeAndPay'
export type { ChangeAndPayProps } from './components/Pos/ChangeAndPay'
export { CountedTotal } from './components/Pos/CountedTotal'
export type { CountedTotalProps } from './components/Pos/CountedTotal'
export { DenominationRow } from './components/Pos/DenominationRow'
export type { DenominationRowProps } from './components/Pos/DenominationRow'
export { Numpad } from './components/Pos/Numpad'
export type { NumpadProps, NumpadVariant } from './components/Pos/Numpad'
export { PaymentBreakdown } from './components/Pos/PaymentBreakdown'
export type {
  PaymentBreakdownProps,
  PaymentBreakdownLine,
  PaymentBreakdownTone,
} from './components/Pos/PaymentBreakdown'
export { PaymentTabs } from './components/Pos/PaymentTabs'
export type { PaymentTabsProps, PaymentTab } from './components/Pos/PaymentTabs'
export { PinDots } from './components/Pos/PinDots'
export type { PinDotsProps } from './components/Pos/PinDots'
export { PosSearch } from './components/Pos/PosSearch'
export type { PosSearchProps } from './components/Pos/PosSearch'
export { ProductTile } from './components/Pos/ProductTile'
export type { ProductTileProps } from './components/Pos/ProductTile'
export { StatusBar } from './components/Pos/StatusBar'
export type { StatusBarProps, StatusBadge, StatusTone, SandboxStrip } from './components/Pos/StatusBar'
export { TotalCard } from './components/Pos/TotalCard'
export type { TotalCardProps, TotalCardRow } from './components/Pos/TotalCard'
export { VariantRow } from './components/Pos/VariantRow'
export type { VariantRowProps } from './components/Pos/VariantRow'

export type { IconProps } from './components/Icons/IconProps'
export { IconPencil } from './components/Icons/IconPencil'
export { IconPlus } from './components/Icons/IconPlus'
export { IconSearch } from './components/Icons/IconSearch'
export { IconX } from './components/Icons/IconX'
