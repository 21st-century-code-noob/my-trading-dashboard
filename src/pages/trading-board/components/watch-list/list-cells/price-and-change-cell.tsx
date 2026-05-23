import PriceChangeText from "@/components/typography/price-change-text";
import type { BaseSymbolCellProps } from "./types";
import PriceText from "@/components/typography/price-text";

function PriceAndChangeCell ({ symbol }: BaseSymbolCellProps) {
  return (
    <div className="inline-flex flex-col items-end">
      <PriceText symbol={symbol} />
      <PriceChangeText symbol={symbol} className="text-sm" />
    </div>
  );
}

export default PriceAndChangeCell;
