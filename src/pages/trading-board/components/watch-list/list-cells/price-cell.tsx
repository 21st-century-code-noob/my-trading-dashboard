import type { BaseSymbolCellProps } from "./types";
import PriceText from "@/components/typography/price-text";

function PriceCell ({ symbol }: BaseSymbolCellProps) {
  return <PriceText symbol={symbol} />;
}

export default PriceCell;
