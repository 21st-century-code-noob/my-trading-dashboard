import { usePriceData } from "@/hooks/usePriceData";
import type { BaseSymbolCellProps } from "./types";
import PriceChangeText from "@/components/typography/price-change-text";

function PriceChangeCell({ symbol }: BaseSymbolCellProps) {
  const { getPriceBySymbol } = usePriceData();
  const priceData = getPriceBySymbol(symbol);

  return (
    <PriceChangeText priceChange={priceData?.priceChange} />
  );

}

export default PriceChangeCell;
