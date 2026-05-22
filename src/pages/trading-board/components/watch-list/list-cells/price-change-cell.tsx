import type { BaseSymbolCellProps } from "./types";
import PriceChangeText from "@/components/typography/price-change-text";

function PriceChangeCell({ symbol }: BaseSymbolCellProps) {
  return <PriceChangeText symbol={symbol} />;
}

export default PriceChangeCell;
